import { SignJWT, jwtVerify } from 'jose';

const AUTH_SECRET = process.env.AUTH_SECRET || '';

if (!AUTH_SECRET) {
  console.warn('⚠️ AUTH_SECRET non configuré. Les sessions ne peuvent pas être signées de façon sécurisée.');
}

const secretKey = new TextEncoder().encode(AUTH_SECRET || 'dev-only-insecure-secret-change-me');

export const SESSION_COOKIE_NAME = 'wms_session';
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 jours

export interface SessionPayload {
  sub: string;
  email: string;
  role: string;
  permissions: string[];
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(secretKey);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: SESSION_DURATION_SECONDS,
};
