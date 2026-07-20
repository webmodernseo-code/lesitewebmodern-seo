import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/dashboard/', '/login', '/login/', '/api/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot'],
        allow: ['/', '/llms.txt'],
        disallow: ['/dashboard', '/dashboard/', '/login', '/login/', '/api/'],
      },
    ],
    sitemap: 'https://webmodernseo.co/sitemap.xml',
  };
}
