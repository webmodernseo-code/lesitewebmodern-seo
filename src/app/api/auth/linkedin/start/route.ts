import { NextResponse } from 'next/server';
import { getSession } from '@/lib/require-session';
import { linkedinDb, buildLinkedinAuthorizeUrl } from '@/lib/linkedin';
import crypto from 'crypto';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.redirect('https://webmodernseo.co/login');
  }

  const creds = await linkedinDb.getCredentials();
  if (!creds?.clientId) {
    return NextResponse.redirect('https://webmodernseo.co/dashboard?linkedin=missing_credentials');
  }

  const state = crypto.randomBytes(16).toString('hex');
  const authorizeUrl = buildLinkedinAuthorizeUrl(creds.clientId, state);

  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set('wms_linkedin_state', state, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 600,
    path: '/',
  });
  return response;
}
