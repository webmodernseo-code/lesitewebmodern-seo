import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  verifyPendingToken,
  PENDING_COOKIE_NAME,
  createSessionToken,
  SESSION_COOKIE_NAME,
  sessionCookieOptions,
} from '@/lib/session';
import { verifyPassword } from '@/lib/password';
import { otpDb } from '@/lib/otp-db';
import { usersDb } from '@/lib/users-db';

const MAX_ATTEMPTS = 5;

export async function POST(request: Request) {
  try {
    const pendingToken = cookies().get(PENDING_COOKIE_NAME)?.value;
    const pending = pendingToken ? await verifyPendingToken(pendingToken) : null;
    if (!pending) {
      return NextResponse.json(
        { error: 'Session de connexion expirée. Reconnectez-vous.' },
        { status: 401 }
      );
    }

    const { code } = await request.json();
    if (!code) {
      return NextResponse.json({ error: 'Code requis.' }, { status: 400 });
    }

    const otpRow = await otpDb.findLatest(pending.email);
    if (!otpRow || new Date(otpRow.expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'Code expiré. Demandez un nouveau code.' },
        { status: 400 }
      );
    }

    if (otpRow.attempts >= MAX_ATTEMPTS) {
      await otpDb.remove(pending.email);
      return NextResponse.json(
        { error: 'Trop de tentatives incorrectes. Reconnectez-vous.' },
        { status: 429 }
      );
    }

    const valid = await verifyPassword(code, otpRow.code_hash);
    if (!valid) {
      await otpDb.incrementAttempts(otpRow.id);
      return NextResponse.json({ error: 'Code incorrect.' }, { status: 401 });
    }

    const user = await usersDb.findByEmail(pending.email);
    if (!user) {
      return NextResponse.json({ error: 'Utilisateur introuvable.' }, { status: 404 });
    }

    await otpDb.remove(pending.email);

    const sessionToken = await createSessionToken({
      sub: user.id,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    });

    const response = NextResponse.json({
      user: { email: user.email, role: user.role, permissions: user.permissions },
    });
    response.cookies.set(SESSION_COOKIE_NAME, sessionToken, sessionCookieOptions);
    response.cookies.delete(PENDING_COOKIE_NAME);
    return response;
  } catch (err) {
    console.error('Verify OTP error:', err);
    return NextResponse.json({ error: 'Une erreur est survenue.' }, { status: 500 });
  }
}
