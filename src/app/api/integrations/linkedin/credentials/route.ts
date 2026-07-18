import { NextResponse } from 'next/server';
import { getSession } from '@/lib/require-session';
import { linkedinDb } from '@/lib/linkedin';

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
  }

  const { clientId, clientSecret } = await request.json();
  if (!clientId?.trim() || !clientSecret?.trim()) {
    return NextResponse.json({ error: 'Client ID et Client Secret requis.' }, { status: 400 });
  }

  await linkedinDb.saveCredentials({
    clientId: clientId.trim(),
    clientSecret: clientSecret.trim(),
  });

  return NextResponse.json({ success: true });
}
