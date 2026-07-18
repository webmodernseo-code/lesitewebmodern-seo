import { sql, isNeonConfigured } from './neon';

export interface AppUser {
  id: string;
  email: string;
  password_hash: string;
  role: string;
  permissions: string[];
  created_at: string;
  updated_at: string;
}

export const usersDb = {
  async findByEmail(email: string): Promise<AppUser | null> {
    if (!isNeonConfigured) return null;
    const rows = await sql`SELECT * FROM users WHERE email = ${email.toLowerCase()}`;
    return (rows[0] as AppUser) || null;
  },

  async findAll(): Promise<AppUser[]> {
    if (!isNeonConfigured) return [];
    const rows = await sql`SELECT id, email, password_hash, role, permissions, created_at, updated_at FROM users ORDER BY created_at ASC`;
    return rows as AppUser[];
  },

  async create(user: { email: string; password_hash: string; role: string; permissions: string[] }): Promise<AppUser> {
    const rows = await sql`
      INSERT INTO users (email, password_hash, role, permissions)
      VALUES (${user.email.toLowerCase()}, ${user.password_hash}, ${user.role}, ${user.permissions})
      RETURNING *;
    `;
    return rows[0] as AppUser;
  },

  async updatePassword(email: string, password_hash: string): Promise<void> {
    await sql`UPDATE users SET password_hash = ${password_hash}, updated_at = now() WHERE email = ${email.toLowerCase()}`;
  },

  async remove(email: string): Promise<void> {
    await sql`DELETE FROM users WHERE email = ${email.toLowerCase()}`;
  },
};
