import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyPendingToken, PENDING_COOKIE_NAME } from '@/lib/session';
import { hashPassword } from '@/lib/password';
import { otpDb } from '@/lib/otp-db';
import { sendOtpEmail } from '@/lib/mailer';

function generateOtpCode(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export async function POST() {
  const pendingToken = cookies().get(PENDING_COOKIE_NAME)?.value;
  const pending = pendingToken ? await verifyPendingToken(pendingToken) : null;
  if (!pending) {
    return NextResponse.json(
      { error: 'Session de connexion expirée. Reconnectez-vous.' },
      { status: 401 }
    );
  }

  const code = generateOtpCode();
  const codeHash = await hashPassword(code);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  await otpDb.create(pending.email, codeHash, expiresAt);

  try {
    await sendOtpEmail(pending.email, code);
  } catch (err) {
    console.error('Failed to resend OTP email:', err);
    return NextResponse.json({ error: "L'envoi a échoué." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
