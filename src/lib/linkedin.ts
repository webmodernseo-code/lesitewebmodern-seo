import { sql } from './neon';
import { encryptSecret, decryptSecret } from './crypto';

// URL exacte enregistrée dans l'app LinkedIn Developers (onglet "Auth").
export const LINKEDIN_REDIRECT_URI = 'https://webmodernseo.co/api/auth/linkedin/callback';

// NOTE : LinkedIn fait évoluer régulièrement les scopes et la version de son API REST.
// Les valeurs ci-dessous reflètent le contrat documenté au moment de l'implémentation ;
// un premier test réel après connexion permettra de confirmer/ajuster si besoin.
const LINKEDIN_SCOPES = 'w_organization_social r_organization_social rw_organization_admin';
const LINKEDIN_API_VERSION = '202401';

export interface LinkedinCredentials {
  clientId: string;
  clientSecret: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string; // ISO
  organizationUrn?: string;
  organizationName?: string;
}

export const linkedinDb = {
  async getCredentials(): Promise<LinkedinCredentials | null> {
    const rows = await sql`
      SELECT encrypted_key FROM integration_connections WHERE provider = 'linkedin'
    `;
    if (!rows[0]) return null;
    const json = decryptSecret(rows[0].encrypted_key as string);
    return JSON.parse(json) as LinkedinCredentials;
  },

  async saveCredentials(creds: LinkedinCredentials): Promise<void> {
    const encrypted = encryptSecret(JSON.stringify(creds));
    const masked = creds.organizationName
      ? `Page connectée : ${creds.organizationName}`
      : 'App configurée · autorisation en attente';
    const status = creds.accessToken ? 'connected' : 'pending';

    await sql`
      INSERT INTO integration_connections (provider, encrypted_key, masked_key, status)
      VALUES ('linkedin', ${encrypted}, ${masked}, ${status})
      ON CONFLICT (provider) DO UPDATE SET
        encrypted_key = EXCLUDED.encrypted_key,
        masked_key = EXCLUDED.masked_key,
        status = EXCLUDED.status,
        updated_at = now()
    `;
  },

  async remove(): Promise<void> {
    await sql`DELETE FROM integration_connections WHERE provider = 'linkedin'`;
  },
};

export function buildLinkedinAuthorizeUrl(clientId: string, state: string): string {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: LINKEDIN_REDIRECT_URI,
    scope: LINKEDIN_SCOPES,
    state,
  });
  return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
}

interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
}

export async function exchangeLinkedinCode(
  code: string,
  clientId: string,
  clientSecret: string
): Promise<TokenResponse> {
  const res = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: LINKEDIN_REDIRECT_URI,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`LinkedIn token exchange error (${res.status}): ${errBody}`);
  }

  return res.json();
}

export async function fetchAdministeredOrganization(
  accessToken: string
): Promise<{ urn: string; name: string } | null> {
  const res = await fetch(
    'https://api.linkedin.com/v2/organizationAcls?q=roleAssignee&role=ADMINISTRATOR&projection=(elements*(organization~(localizedName),organizationalTarget))',
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`LinkedIn organization lookup error (${res.status}): ${errBody}`);
  }

  const data = await res.json();
  const first = data.elements?.[0];
  if (!first) return null;

  return {
    urn: first.organizationalTarget,
    name: first['organization~']?.localizedName || 'Page LinkedIn',
  };
}

export async function publishToLinkedinPage(text: string): Promise<void> {
  const creds = await linkedinDb.getCredentials();
  if (!creds?.accessToken || !creds.organizationUrn) {
    throw new Error('LinkedIn non connecté. Rendez-vous dans Réglages.');
  }

  const res = await fetch('https://api.linkedin.com/rest/posts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${creds.accessToken}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
      'LinkedIn-Version': LINKEDIN_API_VERSION,
    },
    body: JSON.stringify({
      author: creds.organizationUrn,
      commentary: text,
      visibility: 'PUBLIC',
      distribution: {
        feedDistribution: 'MAIN_FEED',
        targetEntities: [],
        thirdPartyDistributionChannels: [],
      },
      lifecycleState: 'PUBLISHED',
      isReshareDisabledByAuthor: false,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`LinkedIn publish error (${res.status}): ${errBody}`);
  }
}
