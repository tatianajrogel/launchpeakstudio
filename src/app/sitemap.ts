import type { MetadataRoute } from 'next';
import { WORK } from '@/data/studio';

const SITE_URL = 'https://launchpeakstudio.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...WORK.map((w) => ({
      url: `${SITE_URL}/work/${w.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
