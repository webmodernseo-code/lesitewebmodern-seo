export type { Lead } from '@/lib/supabase-db';
import type { Lead } from '@/lib/supabase-db';

export const dbService = {
  async getLeads(): Promise<Lead[]> {
    const res = await fetch('/api/leads');
    if (!res.ok) return [];
    const data = await res.json();
    return data.leads || [];
  },

  async updateLeadStatus(id: number, status: 'new' | 'contacted' | 'closed'): Promise<Lead> {
    const res = await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    return data.lead;
  },
};
