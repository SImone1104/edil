// lib/seo.ts
// -----------------------------------------------------------------------------
// Costruzione dei dati strutturati JSON-LD.
//
// A che servono: sono i metadati che Google legge per mostrare l'impresa nel
// pannello locale (indirizzo, telefono, orari) e per capire che una scheda
// cantiere è un'opera realizzata, non un articolo qualsiasi. Per un sito
// vetrina che vive di ricerche tipo "impresa edile Monza" contano parecchio.
//
// Tipizzazione: `Record<string, unknown>` invece di `any`. Lo schema di
// schema.org è troppo vasto per essere modellato per intero, ma `unknown`
// mantiene il valore opaco e impedisce di usarlo per sbaglio come se fosse
// altro — cosa che `any` permetterebbe.
// -----------------------------------------------------------------------------

import { siteConfig } from '@/lib/site-config';
import { CATEGORY_LABELS } from '@/lib/taxonomy';
import type { Project } from '@/types/project';

export type JsonLd = Record<string, unknown>;

/** Scheda dell'impresa: indirizzo, contatti, area servita. */
export function buildLocalBusinessJsonLd(): JsonLd {
  const { contacts } = siteConfig;

  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${siteConfig.url}/#impresa`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: contacts.phone,
    email: contacts.email,
    foundingDate: String(siteConfig.foundedYear),
    vatID: siteConfig.legal.vat,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contacts.address.street,
      postalCode: contacts.address.zip,
      addressLocality: contacts.address.city,
      addressRegion: contacts.address.province,
      addressCountry: 'IT',
    },
    areaServed: ['Milano', 'Monza e Brianza', 'Como', 'Bergamo'].map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
    knowsAbout: Object.values(CATEGORY_LABELS),
  };
}

/** Scheda di un singolo cantiere. */
export function buildProjectJsonLd(project: Project): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    url: `${siteConfig.url}/progetti/${project.slug}`,
    image: project.cover.src,
    dateCreated: String(project.yearStart),
    ...(project.yearEnd === undefined ? {} : { datePublished: String(project.yearEnd) }),
    genre: CATEGORY_LABELS[project.category],
    creator: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    contentLocation: {
      '@type': 'Place',
      name: `${project.location.city} (${project.location.province})`,
      ...(project.location.coordinates === undefined
        ? {}
        : {
            geo: {
              '@type': 'GeoCoordinates',
              latitude: project.location.coordinates.lat,
              longitude: project.location.coordinates.lng,
            },
          }),
    },
  };
}

/** Percorso di navigazione, per le briciole nei risultati di ricerca. */
export function buildBreadcrumbJsonLd(
  items: readonly { name: string; path: string }[],
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
