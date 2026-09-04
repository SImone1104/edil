// components/sections/hero.tsx
// -----------------------------------------------------------------------------
// SERVER COMPONENT.
//
// Struttura a livelli sovrapposti:
//   1. poster (next/image, priority)  → è l'elemento LCP: deve arrivare subito
//   2. video drone (client, opzionale) → compare in dissolvenza quando pronto
//   3. velatura scura                  → garantisce il contrasto del testo
//   4. contenuto                       → titolo, sommario, azioni
//
// Il testo è sopra a un'immagine fotografica: senza la velatura del livello 3
// il contrasto cambierebbe da fotogramma a fotogramma e il titolo diventerebbe
// illeggibile in alcuni momenti del video.
// -----------------------------------------------------------------------------

import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { ButtonLink } from '@/components/ui/button';
import { heroMedia } from '@/content/company';
import { siteConfig } from '@/lib/site-config';

import { HeroVideo } from './hero-video';

export function Hero() {
  const poster = heroMedia.kind === 'video' ? heroMedia.poster : heroMedia.image;

  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-antracite">
      {/* 1 — Poster */}
      <Image
        src={poster.src}
        alt={poster.alt}
        fill
        // `priority` toglie il lazy loading e alza la priorità di rete: su
        // un'immagine LCP è la differenza fra un hero istantaneo e uno che
        // compare dopo mezzo secondo di vuoto.
        priority
        // `sizes` dice al browser quanto sarà larga l'immagine, così sceglie
        // la variante giusta dal srcset. Qui occupa sempre tutta la finestra.
        sizes="100vw"
        className="object-cover"
      />

      {/* 2 — Video drone, montato dal client solo se ha senso */}
      {heroMedia.kind === 'video' && (
        <HeroVideo
          src={heroMedia.src}
          srcMobile={heroMedia.srcMobile}
          description={heroMedia.description}
        />
      )}

      {/* 3 — Velatura: doppio gradiente, più denso in basso dove sta il testo */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-antracite via-antracite/55 to-antracite/25"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-antracite/70 to-transparent"
        aria-hidden
      />

      {/* 4 — Contenuto */}
      <Container size="wide" className="relative z-10 pb-20 pt-40 sm:pb-28">
        <div className="max-w-4xl">
          <Reveal y={12}>
            <p className="eyebrow mb-8 flex items-center gap-3 text-ruggine-bright">
              <span className="inline-block h-px w-10 bg-current" aria-hidden />
              Impresa edile dal {siteConfig.foundedYear} · Milano e Brianza
            </p>
          </Reveal>

          {/* Il titolo entra riga per riga: ogni Reveal ha un ritardo crescente.
              È l'unica animazione "vistosa" del sito, e dura meno di un secondo. */}
          <h1 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight text-calce sm:text-6xl lg:text-7xl">
            <Reveal delay={0.05}>
              <span className="block">Costruire con precisione,</span>
            </Reveal>
            <Reveal delay={0.15}>
              <span className="block text-cemento">conservare con rispetto.</span>
            </Reveal>
          </h1>

          <Reveal delay={0.28}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-cemento-light sm:text-lg">
              Costruzioni civili, ristrutturazioni di pregio e restauro conservativo.
              Quarantasette anni di cantieri consegnati nei tempi, con squadre nostre.
            </p>
          </Reveal>

          <Reveal delay={0.38}>
            <div className="mt-11 flex flex-wrap items-center gap-4">
              <ButtonLink href="/progetti" variant="inverse" withArrow>
                Guarda i cantieri
              </ButtonLink>
              <ButtonLink
                href="/contatti"
                variant="ghost"
                className="border-white/25 text-calce hover:border-calce hover:bg-calce hover:text-antracite"
              >
                Parlaci del tuo progetto
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Indicatore di scorrimento: animazione CSS, nessun JavaScript.
          `motion-reduce:animate-none` è la variante Tailwind che la disattiva
          per chi ha chiesto meno animazioni. */}
      <div
        className="absolute bottom-8 right-8 hidden lg:block"
        aria-hidden
      >
        <ArrowDown className="size-5 animate-bounce text-cemento motion-reduce:animate-none" />
      </div>
    </section>
  );
}
