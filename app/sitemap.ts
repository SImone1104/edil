// app/sitemap.ts
// -----------------------------------------------------------------------------
// Sitemap generata in fase di build a partire dai contenuti: aggiungendo un
// cantiere a content/projects.ts la sua URL compare qui da sola, senza che
// nessuno debba ricordarsene. È il motivo per cui non si scrive a mano.
//
// Next serve il risultato su /sitemap.xml.
// -----------------------------------------------------------------------------

import type { MetadataRoute } from 'next';

import { getAllProjects, getAllServices } from '@/lib/content-access';
import { siteConfig } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    {
      url: `${siteConfig.url}/servizi`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/progetti`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/chi-siamo`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/contatti`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = getAllServices().map((service) => ({
    url: `${siteConfig.url}/servizi/${service.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${siteConfig.url}/progetti/${project.slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    // I cantieri aperti cambiano ancora: hanno priorità leggermente maggiore.
    priority: project.status === 'in-corso' ? 0.8 : 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
