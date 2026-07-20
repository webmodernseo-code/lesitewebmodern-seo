import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/login/', '/api/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot'],
        allow: ['/', '/llms.txt'],
        disallow: ['/dashboard/', '/login/', '/api/'],
      },
    ],
    sitemap: 'https://webmodernseo.co/sitemap.xml',
  };
}
