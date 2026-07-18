import { NextResponse } from 'next/server';
import { usersDb } from '@/lib/users-db';
import { verifyPassword, hashPassword } from '@/lib/password';
import { createPendingToken, PENDING_COOKIE_NAME, pendingCookieOptions } from '@/lib/session';
import { otpDb } from '@/lib/otp-db';
import { sendOtpEmail } from '@/lib/mailer';

function generateOtpCode(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email et mot de passe requis.' }, { status: 400 });
    }

    const user = await usersDb.findByEmail(email);
    if (!user) {
      return NextResponse.json({ error: 'Identifiant ou mot de passe incorrect.' }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ error: 'Identifiant ou mot de passe incorrect.' }, { status: 401 });
    }

    const code = generateOtpCode();
    const codeHash = await hashPassword(code);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await otpDb.create(user.email, codeHash, expiresAt);

    try {
      await sendOtpEmail(user.email, code);
    } catch (mailErr) {
      console.error('Failed to send OTP email:', mailErr);
      return NextResponse.json(
        { error: "L'envoi du code de vérification a échoué. Réessayez." },
        { status: 500 }
      );
    }

    const pendingToken = await createPendingToken(user.email);
    const response = NextResponse.json({ otpRequired: true, email: user.email });
    response.cookies.set(PENDING_COOKIE_NAME, pendingToken, pendingCookieOptions);
    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Une erreur est survenue.' }, { status: 500 });
  }
}
