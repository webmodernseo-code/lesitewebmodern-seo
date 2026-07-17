import type { MetadataRoute } from 'next';
import { dbService } from '@/lib/supabase-db';

const BASE_URL = 'https://webmodernseo.co';

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1 },
  { url: `${BASE_URL}/apropos`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/portfolio`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/services/creation-web`, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/services/referencement-seo`, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/services/acquisition-clients`, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/blog`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/contact`, changeFrequency: 'yearly', priority: 0.6 },
  { url: `${BASE_URL}/reservation`, changeFrequency: 'yearly', priority: 0.6 },
  { url: `${BASE_URL}/politique/mentions-legales`, changeFrequency: 'yearly', priority: 0.2 },
  { url: `${BASE_URL}/politique/politique-de-confidentialite`, changeFrequency: 'yearly', priority: 0.2 },
  { url: `${BASE_URL}/politique/conditions-d-utilisation`, changeFrequency: 'yearly', priority: 0.2 },
  { url: `${BASE_URL}/politique/gestion-des-cookies`, changeFrequency: 'yearly', priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const allItems = await dbService.getContentItems();
    const blogPosts = allItems.filter(item => item.type === 'blog');
    blogRoutes = blogPosts.map(post => ({
      url: `${BASE_URL}/blog/${slugify(post.title)}`,
      lastModified: post.published_at || post.created_at || undefined,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (err) {
    console.error("Error building blog sitemap entries:", err);
  }

  return [...STATIC_ROUTES, ...blogRoutes];
}
