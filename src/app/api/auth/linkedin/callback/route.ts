import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSession } from '@/lib/require-session';
import {
  linkedinDb,
  exchangeLinkedinCode,
  fetchAdministeredOrganization,
} from '@/lib/linkedin';

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.redirect('https://webmodernseo.co/login');
  }

  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const expectedState = cookies().get('wms_linkedin_state')?.value;

  if (!code || !state || !expectedState || state !== expectedState) {
    return NextResponse.redirect('https://webmodernseo.co/dashboard?linkedin=error');
  }

  const creds = await linkedinDb.getCredentials();
  if (!creds?.clientId || !creds.clientSecret) {
    return NextResponse.redirect('https://webmodernseo.co/dashboard?linkedin=missing_credentials');
  }

  try {
    const token = await exchangeLinkedinCode(code, creds.clientId, creds.clientSecret);
    const org = await fetchAdministeredOrganization(token.access_token);

    await linkedinDb.saveCredentials({
      clientId: creds.clientId,
      clientSecret: creds.clientSecret,
      accessToken: token.access_token,
      refreshToken: token.refresh_token,
      expiresAt: new Date(Date.now() + token.expires_in * 1000).toISOString(),
      organizationUrn: org?.urn,
      organizationName: org?.name,
    });

    const response = NextResponse.redirect('https://webmodernseo.co/dashboard?linkedin=connected');
    response.cookies.delete('wms_linkedin_state');
    return response;
  } catch (err) {
    console.error('LinkedIn OAuth callback error:', err);
    return NextResponse.redirect('https://webmodernseo.co/dashboard?linkedin=error');
  }
}
