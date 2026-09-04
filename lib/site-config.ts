// lib/site-config.ts
// -----------------------------------------------------------------------------
// Identità del sito e dati di contatto. È l'unico punto da toccare per
// cambiare nome dell'impresa, recapiti o voci di menu.
//
// Nota: nome, indirizzo e recapiti sono FITTIZI, essendo questa una demo.
// -----------------------------------------------------------------------------

export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export const siteConfig = {
  name: 'Ferrante Costruzioni',
  legalName: 'Ferrante Costruzioni S.r.l.',
  /** Claim mostrato in hero e nei metadati. */
  claim: 'Costruire con precisione, conservare con rispetto.',
  description:
    'Impresa edile lombarda specializzata in costruzioni civili, ristrutturazioni di pregio e restauro conservativo. Attiva dal 1978 fra Milano, Monza e Brianza.',
  /** URL canonico: serve a sitemap, robots e metadati OpenGraph. */
  url: 'https://www.ferrantecostruzioni.example',
  foundedYear: 1978,

  contacts: {
    phone: '+39 039 555 0142',
    /** Versione senza spazi per l'attributo href="tel:". */
    phoneHref: '+390395550142',
    email: 'info@ferrantecostruzioni.example',
    whatsapp: '+390000000000',
    address: {
      street: 'Via dell’Artigianato 14',
      zip: '20900',
      city: 'Monza',
      province: 'MB',
      country: 'Italia',
    },
    /** Orari mostrati nel footer e nella pagina contatti. */
    openingHours: 'Lunedì – Venerdì, 8:00 – 18:00',
  },

  /** Voci del menu principale, nell'ordine in cui compaiono. */
  nav: [
    { label: 'Servizi', href: '/servizi' },
    { label: 'Cantieri', href: '/progetti' },
    { label: 'Impresa', href: '/chi-siamo' },
    { label: 'Contatti', href: '/contatti' },
  ] satisfies readonly NavItem[],

  /** Dati societari mostrati nel footer. */
  legal: {
    vat: 'IT 01234567890',
    ren: 'REA MB-1234567',
    capital: 'Capitale sociale € 250.000 i.v.',
  },
} as const;

export type SiteConfig = typeof siteConfig;
