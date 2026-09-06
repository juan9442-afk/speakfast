import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // La app y el funnel privado no aportan a búsqueda y no deben indexarse.
      disallow: ['/app', '/api', '/auth', '/entrar', '/paywall'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
