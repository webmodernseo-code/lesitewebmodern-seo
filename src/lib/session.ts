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

// Jeton temporaire emis apres verification du mot de passe, en attente
// de la saisie du code recu par email (2eme facteur).
export const PENDING_COOKIE_NAME = 'wms_pending';
const PENDING_DURATION_SECONDS = 60 * 10; // 10 minutes

export interface PendingPayload {
  email: string;
}

export async function createPendingToken(email: string): Promise<string> {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${PENDING_DURATION_SECONDS}s`)
    .sign(secretKey);
}

export async function verifyPendingToken(token: string): Promise<PendingPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as PendingPayload;
  } catch {
    return null;
  }
}

export const pendingCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: PENDING_DURATION_SECONDS,
};
