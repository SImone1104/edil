// app/not-found.tsx
// -----------------------------------------------------------------------------
// Pagina 404. Server Component.
//
// Sfondo antracite per la stessa ragione delle pagine interne: l'header è fixed
// e trasparente, su fondo chiaro il menu sarebbe illeggibile.
//
// Una 404 utile offre una via d'uscita. Qui: i quattro percorsi principali,
// invece del solito vicolo cieco con scritto "pagina non trovata".
// -----------------------------------------------------------------------------

import Link from 'next/link';

import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { siteConfig } from '@/lib/site-config';

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-antracite py-32">
      <Container size="wide">
        <p className="eyebrow flex items-center gap-3 text-ruggine-bright">
          <span className="inline-block h-px w-10 bg-current" aria-hidden />
          Errore 404
        </p>

        <h1 className="mt-8 max-w-3xl font-display text-4xl leading-[1.08] font-semibold tracking-tight text-calce sm:text-5xl lg:text-6xl">
          Questa pagina non esiste.
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-cemento">
          Può darsi che l’indirizzo sia stato digitato male, o che la scheda sia stata
          spostata. Da qui può ripartire:
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/" variant="inverse" withArrow>
            Torna alla home
          </ButtonLink>
          <ButtonLink
            href="/progetti"
            variant="ghost"
            className="border-white/25 text-calce hover:border-calce hover:bg-calce hover:text-antracite"
          >
            Vedi i cantieri
          </ButtonLink>
        </div>

        <nav className="mt-16 border-t border-white/15 pt-8" aria-label="Collegamenti utili">
          <ul className="flex flex-wrap gap-x-10 gap-y-3 text-sm text-cemento">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors duration-300 hover:text-calce"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`tel:${siteConfig.contacts.phoneHref}`}
                className="transition-colors duration-300 hover:text-calce"
              >
                {siteConfig.contacts.phone}
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </section>
  );
}
