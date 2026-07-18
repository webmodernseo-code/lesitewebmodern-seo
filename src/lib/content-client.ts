import { ContentItem } from '@/types';

export const dbService = {
  async getContentItems(): Promise<ContentItem[]> {
    const res = await fetch('/api/content');
    if (!res.ok) return [];
    const data = await res.json();
    return data.items || [];
  },

  async createContentItem(item: Partial<ContentItem>): Promise<ContentItem> {
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    const data = await res.json();
    return data.item;
  },

  async updateContentItem(id: number, item: Partial<ContentItem>): Promise<ContentItem> {
    const res = await fetch(`/api/content/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    const data = await res.json();
    return data.item;
  },

  async deleteContentItem(id: number): Promise<void> {
    await fetch(`/api/content/${id}`, { method: 'DELETE' });
  },
};
