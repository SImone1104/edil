// app/layout.tsx
// -----------------------------------------------------------------------------
// Layout radice: è l'equivalente combinato di index.html e AppComponent.
// Avvolge ogni pagina, non viene rimontato durante la navigazione, ed è il
// posto giusto per header, footer e metadati di base.
// -----------------------------------------------------------------------------

import type { Metadata } from 'next';

import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { fontBody, fontDisplay } from '@/lib/fonts';
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
        <SiteHeader />
        {/* L'header è `fixed`: il main non ha padding-top perché l'hero è
            volutamente a tutto schermo e scorre sotto la barra trasparente.
            Le pagine interne aggiungeranno il proprio spazio in testa. */}
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
