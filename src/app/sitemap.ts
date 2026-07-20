import type { MetadataRoute } from 'next';
import { dbService } from '@/lib/supabase-db';

const BASE_URL = 'https://webmodernseo.co';
const LAST_UPDATED = new Date('2026-07-20').toISOString();

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: `${BASE_URL}/`, lastModified: LAST_UPDATED, changeFrequency: 'weekly', priority: 1 },
  { url: `${BASE_URL}/apropos`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/portfolio`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/services/creation-web`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/services/referencement-seo`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/services/acquisition-clients`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/services/publicite-meta-ads`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/services/creation-site-ecommerce`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/blog`, lastModified: LAST_UPDATED, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/contact`, lastModified: LAST_UPDATED, changeFrequency: 'yearly', priority: 0.6 },
  { url: `${BASE_URL}/reservation`, lastModified: LAST_UPDATED, changeFrequency: 'yearly', priority: 0.6 },
  { url: `${BASE_URL}/grenoble`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/paris`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/lyon`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.75 },
  { url: `${BASE_URL}/saint-etienne`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/politique/mentions-legales`, lastModified: LAST_UPDATED, changeFrequency: 'yearly', priority: 0.2 },
  { url: `${BASE_URL}/politique/politique-de-confidentialite`, lastModified: LAST_UPDATED, changeFrequency: 'yearly', priority: 0.2 },
  { url: `${BASE_URL}/politique/conditions-d-utilisation`, lastModified: LAST_UPDATED, changeFrequency: 'yearly', priority: 0.2 },
  { url: `${BASE_URL}/politique/gestion-des-cookies`, lastModified: LAST_UPDATED, changeFrequency: 'yearly', priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const allItems = await dbService.getContentItems();
    const blogPosts = allItems.filter(item => item.type === 'blog' && item.status === 'published');
    blogRoutes = blogPosts.map(post => ({
      url: `${BASE_URL}/blog/${post.slug || slugify(post.title)}`,
      lastModified: post.updated_at || post.published_at || post.created_at || undefined,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (err) {
    console.error("Error building blog sitemap entries:", err);
  }

  return [...STATIC_ROUTES, ...blogRoutes];
}
