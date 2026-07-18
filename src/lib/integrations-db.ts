import { sql } from './neon';
import { encryptSecret, decryptSecret, maskSecret } from './crypto';

export type IntegrationProvider = 'claude' | 'openai';

export interface IntegrationConnection {
  provider: IntegrationProvider;
  masked_key: string;
  status: string;
  connected_at: string;
}

export const integrationsDb = {
  async list(): Promise<IntegrationConnection[]> {
    const rows = await sql`
      SELECT provider, masked_key, status, connected_at FROM integration_connections
    `;
    return rows as IntegrationConnection[];
  },

  async save(provider: IntegrationProvider, apiKey: string): Promise<IntegrationConnection> {
    const encrypted = encryptSecret(apiKey);
    const masked = maskSecret(apiKey);
    const rows = await sql`
      INSERT INTO integration_connections (provider, encrypted_key, masked_key, status)
      VALUES (${provider}, ${encrypted}, ${masked}, 'connected')
      ON CONFLICT (provider) DO UPDATE SET
        encrypted_key = EXCLUDED.encrypted_key,
        masked_key = EXCLUDED.masked_key,
        status = 'connected',
        updated_at = now()
      RETURNING provider, masked_key, status, connected_at
    `;
    return rows[0] as IntegrationConnection;
  },

  async getKey(provider: IntegrationProvider): Promise<string | null> {
    const rows = await sql`
      SELECT encrypted_key FROM integration_connections WHERE provider = ${provider}
    `;
    if (!rows[0]) return null;
    return decryptSecret(rows[0].encrypted_key as string);
  },

  async remove(provider: IntegrationProvider): Promise<void> {
    await sql`DELETE FROM integration_connections WHERE provider = ${provider}`;
  },
};
