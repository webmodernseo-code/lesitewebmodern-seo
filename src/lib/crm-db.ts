import { sql } from './neon';

export type DealStage = 'lead' | 'contact' | 'proposal' | 'negotiation' | 'won' | 'lost';

export interface Deal {
  id: string;
  name: string;
  company: string;
  value: number;
  stage: DealStage;
  email?: string;
  phone?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export const crmDb = {
  async list(): Promise<Deal[]> {
    const rows = await sql`SELECT * FROM deals ORDER BY created_at DESC`;
    return rows as Deal[];
  },

  async create(deal: Partial<Deal>): Promise<Deal> {
    const rows = await sql`
      INSERT INTO deals (name, company, value, stage, email, phone, notes)
      VALUES (
        ${deal.name}, ${deal.company}, ${deal.value || 0}, ${deal.stage || 'lead'},
        ${deal.email || null}, ${deal.phone || null}, ${deal.notes || null}
      )
      RETURNING *
    `;
    return rows[0] as Deal;
  },

  async updateStage(id: string, stage: DealStage): Promise<Deal> {
    const rows = await sql`
      UPDATE deals SET stage = ${stage}, updated_at = now() WHERE id = ${id}
      RETURNING *
    `;
    return rows[0] as Deal;
  },

  async remove(id: string): Promise<void> {
    await sql`DELETE FROM deals WHERE id = ${id}`;
  },
};
