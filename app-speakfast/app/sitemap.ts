import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // Solo las páginas públicas indexables (la landing + legales).
  return ['/', '/terminos', '/privacidad', '/reembolsos', '/aviso-ia'].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.4,
  }));
}
