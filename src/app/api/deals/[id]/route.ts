import { NextResponse } from 'next/server';
import { getSession } from '@/lib/require-session';
import { crmDb } from '@/lib/crm-db';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
  }

  try {
    const { stage } = await request.json();
    if (!stage) {
      return NextResponse.json({ error: 'Étape requise.' }, { status: 400 });
    }
    const deal = await crmDb.updateStage(params.id, stage);
    return NextResponse.json({ deal });
  } catch (err) {
    console.error('Update deal error:', err);
    return NextResponse.json({ error: 'Une erreur est survenue.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
  }

  await crmDb.remove(params.id);
  return NextResponse.json({ success: true });
}
