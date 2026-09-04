// app/robots.ts
// Servito da Next su /robots.txt.

import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /_next contiene i file di build: indicizzarli non ha senso e sporca
      // i risultati.
      disallow: ['/_next/'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
