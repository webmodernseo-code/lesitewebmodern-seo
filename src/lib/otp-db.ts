import { sql } from './neon';

export interface LoginOtp {
  id: string;
  email: string;
  code_hash: string;
  attempts: number;
  expires_at: string;
  created_at: string;
}

export const otpDb = {
  async create(email: string, codeHash: string, expiresAt: Date): Promise<void> {
    const normalized = email.toLowerCase();
    await sql`DELETE FROM login_otps WHERE email = ${normalized}`;
    await sql`
      INSERT INTO login_otps (email, code_hash, expires_at)
      VALUES (${normalized}, ${codeHash}, ${expiresAt.toISOString()})
    `;
  },

  async findLatest(email: string): Promise<LoginOtp | null> {
    const rows = await sql`
      SELECT * FROM login_otps WHERE email = ${email.toLowerCase()} ORDER BY created_at DESC LIMIT 1
    `;
    return (rows[0] as LoginOtp) || null;
  },

  async incrementAttempts(id: string): Promise<void> {
    await sql`UPDATE login_otps SET attempts = attempts + 1 WHERE id = ${id}`;
  },

  async remove(email: string): Promise<void> {
    await sql`DELETE FROM login_otps WHERE email = ${email.toLowerCase()}`;
  },
};
