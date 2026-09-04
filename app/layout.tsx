// app/layout.tsx
// -----------------------------------------------------------------------------
// Layout radice: è l'equivalente combinato di index.html e AppComponent.
// Avvolge ogni pagina, non viene rimontato durante la navigazione, ed è il
// posto giusto per header, footer e metadati di base.
// -----------------------------------------------------------------------------

import type { Metadata } from 'next';

import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { JsonLdScript } from '@/components/seo/json-ld';
import { fontBody, fontDisplay } from '@/lib/fonts';
import { buildLocalBusinessJsonLd } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';

import './globals.css';

/**
 * L'oggetto `metadata` sostituisce la manipolazione manuale del <head>:
 * Next genera title, description e tag OpenGraph in fase di build.
 * `title.template` fa sì che ogni pagina figlia scriva solo il proprio titolo
 * e riceva automaticamente il suffisso con il nome dell'impresa.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Impresa edile a Monza e Milano`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="it"
      className={`${fontDisplay.variable} ${fontBody.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Dati strutturati dell'impresa: presenti su ogni pagina, sono ciò che
            Google usa per il pannello locale (indirizzo, telefono, area servita). */}
        <JsonLdScript data={buildLocalBusinessJsonLd()} />

        {/* Salto al contenuto: primo elemento focalizzabile della pagina, resta
            invisibile finché non riceve il focus da tastiera. Senza, chi naviga
            con il Tab deve attraversare tutto il menu a ogni pagina. */}
        <a
          href="#contenuto"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:bg-calce focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-antracite"
        >
          Salta al contenuto
        </a>

        <SiteHeader />
        {/* L'header è `fixed`: il main non ha padding-top perché l'hero è
            volutamente a tutto schermo e scorre sotto la barra trasparente.
            Le pagine interne aprono con la propria fascia scura. */}
        <main id="contenuto" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
