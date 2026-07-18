import { NextResponse } from 'next/server';
import { getSession } from '@/lib/require-session';
import { crmDb } from '@/lib/crm-db';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
  }

  const deals = await crmDb.list();
  return NextResponse.json({ deals });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
  }

  try {
    const payload = await request.json();
    if (!payload.name || !payload.company) {
      return NextResponse.json({ error: 'Nom et entreprise requis.' }, { status: 400 });
    }
    const deal = await crmDb.create(payload);
    return NextResponse.json({ deal }, { status: 201 });
  } catch (err) {
    console.error('Create deal error:', err);
    return NextResponse.json({ error: 'Une erreur est survenue.' }, { status: 500 });
  }
}
