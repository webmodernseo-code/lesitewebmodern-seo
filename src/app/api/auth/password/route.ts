import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/session';
import { hashPassword } from '@/lib/password';
import { usersDb } from '@/lib/users-db';

export async function POST(request: Request) {
  try {
    const token = cookies().get(SESSION_COOKIE_NAME)?.value;
    const session = token ? await verifySessionToken(token) : null;
    if (!session) {
      return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
    }

    const { password } = await request.json();
    if (!password || password.length < 8) {
      return NextResponse.json({ error: 'Le mot de passe doit contenir au moins 8 caractères.' }, { status: 400 });
    }

    const hash = await hashPassword(password);
    await usersDb.updatePassword(session.email, hash);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Password update error:', err);
    return NextResponse.json({ error: 'Une erreur est survenue.' }, { status: 500 });
  }
}
