import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/session';
import { usersDb } from '@/lib/users-db';

export async function DELETE(request: Request, { params }: { params: { email: string } }) {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session || session.role !== 'super_admin') {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 403 });
  }

  const targetEmail = decodeURIComponent(params.email);
  const target = await usersDb.findByEmail(targetEmail);

  if (!target) {
    return NextResponse.json({ error: 'Utilisateur introuvable.' }, { status: 404 });
  }

  if (target.role === 'super_admin') {
    return NextResponse.json(
      { error: 'Le compte Super Administrateur ne peut pas être supprimé.' },
      { status: 400 }
    );
  }

  await usersDb.remove(targetEmail);
  return NextResponse.json({ success: true });
}
