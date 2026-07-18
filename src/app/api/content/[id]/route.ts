import { NextResponse } from 'next/server';
import { getSession } from '@/lib/require-session';
import { dbService } from '@/lib/supabase-db';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const item = await dbService.updateContentItem(parseInt(params.id, 10), payload);
    return NextResponse.json({ item });
  } catch (err) {
    console.error('Update content item error:', err);
    return NextResponse.json({ error: 'Une erreur est survenue.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
  }

  await dbService.deleteContentItem(parseInt(params.id, 10));
  return NextResponse.json({ success: true });
}
