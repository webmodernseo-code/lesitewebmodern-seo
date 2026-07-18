import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';

function getKey(): Buffer {
  const secret = process.env.INTEGRATIONS_ENCRYPTION_KEY;
  if (!secret) {
    throw new Error('INTEGRATIONS_ENCRYPTION_KEY is not configured.');
  }
  return crypto.createHash('sha256').update(secret).digest();
}

export function encryptSecret(plainText: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return [iv.toString('base64'), authTag.toString('base64'), encrypted.toString('base64')].join('.');
}

export function decryptSecret(payload: string): string {
  const [ivB64, tagB64, dataB64] = payload.split('.');
  const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), Buffer.from(ivB64, 'base64'));
  decipher.setAuthTag(Buffer.from(tagB64, 'base64'));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(dataB64, 'base64')), decipher.final()]);
  return decrypted.toString('utf8');
}

export function maskSecret(plainText: string): string {
  if (plainText.length <= 10) return '••••••••';
  return `${plainText.slice(0, 6)}••••••${plainText.slice(-4)}`;
}
