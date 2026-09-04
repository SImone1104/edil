'use client';

// components/sections/hero-video.tsx
// -----------------------------------------------------------------------------
// Livello video dell'hero, sovrapposto al poster.
//
// Il video NON è mai nel markup iniziale. Il browser vede prima solo il poster
// (immagine ottimizzata da next/image, elemento LCP della pagina) e soltanto
// dopo questo componente aggancia il file e lo fa comparire in dissolvenza.
//
// POLITICA DI CARICAMENTO
// Il video parte su tutti i dispositivi, ma con file diversi:
//   - schermi larghi  → 1280x720, 12 MB
//   - schermi stretti → 640x360, 2,4 MB
// Su un telefono la versione ridotta è visivamente indistinguibile — è un
// fondale sotto una velatura scura — ma pesa un quinto. Scaricare il file da
// 12 MB su rete cellulare significherebbe, nei fatti, non mostrare il video a
// nessuno: arriverebbe dopo che l'utente ha già scrollato.
//
// Restano due casi in cui il video non viene proprio caricato, ed è giusto:
//   1. l'utente ha chiesto meno animazioni al sistema operativo;
//   2. il browser dichiara `saveData`, cioè risparmio dati attivo.
// In entrambi resta il poster: nessun fallback rotto, nessun buco.
// -----------------------------------------------------------------------------

import { useCallback, useState, useSyncExternalStore } from 'react';
import { useReducedMotion } from 'motion/react';

import { cn } from '@/lib/utils';

type HeroVideoProps = {
  /** Sorgente per schermi larghi. */
  src: string;
  /** Sorgente leggera per schermi stretti; se assente si usa `src`. */
  srcMobile?: string;
  /** Descrizione della ripresa: il video è decorativo ma va comunque etichettato. */
  description: string;
};

/**
 * `navigator.connection` non è nei tipi standard del DOM perché è ancora una
 * proposta. Lo dichiariamo noi invece di ricorrere ad `any`, che il progetto
 * vieta: così l'accesso resta controllato dal compilatore.
 */
type NetworkInformation = {
  readonly saveData?: boolean;
};

/** Quale sorgente servire, oppure nessuna. */
type VideoVariant = 'none' | 'mobile' | 'desktop';

const WIDE_SCREEN_QUERY = '(min-width: 768px)';

function subscribeToViewport(onStoreChange: () => void): () => void {
  const mediaQuery = window.matchMedia(WIDE_SCREEN_QUERY);
  mediaQuery.addEventListener('change', onStoreChange);
  return () => mediaQuery.removeEventListener('change', onStoreChange);
}

function getVariantSnapshot(): VideoVariant {
  const connection = (navigator as Navigator & { connection?: NetworkInformation })
    .connection;
  if (connection?.saveData === true) return 'none';

  return window.matchMedia(WIDE_SCREEN_QUERY).matches ? 'desktop' : 'mobile';
}

/**
 * Valore usato durante il render sul server, dove `window` non esiste.
 * 'none' significa che l'HTML generato contiene sempre e solo il poster: il
 * video viene aggiunto dopo l'idratazione. Restituire qualcos'altro qui
 * causerebbe un mismatch di idratazione.
 */
function getServerSnapshot(): VideoVariant {
  return 'none';
}

export function HeroVideo({ src, srcMobile, description }: HeroVideoProps) {
  const shouldReduceMotion = useReducedMotion();

  /**
   * `useSyncExternalStore` è l'API pensata per leggere una fonte esterna al
   * mondo React (qui: matchMedia) in modo sicuro rispetto a SSR e idratazione.
   * È preferibile a un `useEffect` che chiama `setState`, che provocherebbe un
   * render a cascata — quello che ESLint segnala con react-hooks/
   * set-state-in-effect.
   */
  const viewportVariant = useSyncExternalStore(
    subscribeToViewport,
    getVariantSnapshot,
    getServerSnapshot,
  );

  const variant: VideoVariant = shouldReduceMotion ? 'none' : viewportVariant;
  const source = variant === 'mobile' ? (srcMobile ?? src) : src;

  /**
   * Il video compare solo quando sta EFFETTIVAMENTE riproducendo, non appena
   * è pronto.
   *
   * La differenza conta su iPhone: in Risparmio energetico iOS blocca del
   * tutto la riproduzione automatica. Rivelando il video su `canplay` si
   * otterrebbe un fotogramma congelato al posto del poster — peggio del
   * poster. Aspettando l'evento `playing`, se iOS rifiuta non succede nulla e
   * resta la fotografia, che è il comportamento voluto.
   */
  const [isPlaying, setIsPlaying] = useState(false);

  const requestPlay = useCallback((video: HTMLVideoElement): void => {
    // `play()` restituisce una Promise che può essere rifiutata (politiche di
    // autoplay). Il catch vuoto è deliberato: se il browser rifiuta, resta il
    // poster.
    void video.play().catch(() => undefined);
  }, []);

  /**
   * Ref callback invece di useEffect, per chiudere una corsa reale.
   *
   * Con un file piccolo e già in cache, `canplay` può scattare PRIMA che il
   * componente abbia agganciato il proprio ascoltatore: l'evento è già
   * passato, il gestore non parte mai e il video resta invisibile per sempre.
   * Qui interroghiamo direttamente `readyState` nel momento in cui l'elemento
   * entra nel DOM, quindi non dipendiamo dall'essere arrivati in tempo.
   *
   * È anche una ref callback e non un effect, quindi niente `setState` dentro
   * `useEffect` e niente render a cascata.
   */
  const attachVideo = useCallback(
    (video: HTMLVideoElement | null): void => {
      if (!video) return;
      // HAVE_FUTURE_DATA: ci sono abbastanza dati per iniziare.
      if (video.readyState >= 3) requestPlay(video);
    },
    [requestPlay],
  );

  if (variant === 'none') return null;

  return (
    <video
      // `key` legata alla sorgente: passando da mobile a desktop (rotazione,
      // finestra ridimensionata) React sostituisce l'elemento invece di
      // cambiargli `src` sotto i piedi, e il nuovo file riparte pulito.
      key={source}
      ref={attachVideo}
      src={source}
      aria-label={description}
      // `autoPlay` come attributo, oltre alla chiamata a play(): su iOS
      // l'attributo è la via che Safari onora in modo più affidabile, e
      // insieme a `muted` e `playsInline` è la terna richiesta per la
      // riproduzione automatica in linea. Senza `playsInline`, iPhone
      // aprirebbe il video a schermo intero.
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onCanPlay={(event) => requestPlay(event.currentTarget)}
      // Una volta partito resta visibile. Deliberatamente NON reagiamo a
      // `pause`: i browser sospendono i video nelle schede in secondo piano, e
      // nasconderlo in quel caso lascerebbe il poster anche al ritorno
      // dell'utente. Il caso che ci interessa — iOS in Risparmio energetico —
      // è già coperto: lì la riproduzione non parte mai, `playing` non scatta
      // e il poster resta al suo posto.
      onPlaying={() => setIsPlaying(true)}
      // Il video è puramente decorativo: niente controlli e fuori dall'ordine
      // di tabulazione, ma con un'etichetta che ne descrive la scena.
      tabIndex={-1}
      className={cn(
        'absolute inset-0 size-full object-cover transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]',
        isPlaying ? 'opacity-100' : 'opacity-0',
      )}
    />
  );
}
