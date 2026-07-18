export type { Deal, DealStage } from '@/lib/crm-db';
import type { Deal, DealStage } from '@/lib/crm-db';

export const crmService = {
  async getDeals(): Promise<Deal[]> {
    const res = await fetch('/api/deals');
    if (!res.ok) return [];
    const data = await res.json();
    return data.deals || [];
  },

  async createDeal(payload: Partial<Deal>): Promise<Deal> {
    const res = await fetch('/api/deals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'La création a échoué.');
    }
    const data = await res.json();
    return data.deal;
  },

  async updateDealStage(id: string, stage: DealStage): Promise<Deal> {
    const res = await fetch(`/api/deals/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage }),
    });
    const data = await res.json();
    return data.deal;
  },

  async deleteDeal(id: string): Promise<void> {
    await fetch(`/api/deals/${id}`, { method: 'DELETE' });
  },
};
