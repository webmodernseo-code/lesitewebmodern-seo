import { NextResponse } from 'next/server';
import { getSession } from '@/lib/require-session';
import { integrationsDb } from '@/lib/integrations-db';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
  }

  const connections = await integrationsDb.list();
  return NextResponse.json({ connections });
}
