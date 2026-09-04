'use client';

// components/sections/hero-video.tsx
// -----------------------------------------------------------------------------
// Livello video dell'hero, sovrapposto al poster.
//
// Il video NON è mai nel markup iniziale. Il browser vede prima solo il poster
// (immagine ottimizzata da next/image, elemento LCP della pagina) e soltanto
// dopo, se le condizioni lo consentono, questo componente aggancia il file e lo
// fa comparire in dissolvenza.
//
// Le condizioni per cui il video NON parte, tutte volute:
//   1. l'utente ha chiesto meno animazioni al sistema operativo;
//   2. lo schermo è stretto — su mobile un file da diversi MB si scarica spesso
//      sotto rete cellulare, e l'hero funziona benissimo come fotografia;
//   3. il browser dichiara `saveData`, cioè risparmio dati attivo.
//
// In tutti e tre i casi resta il poster: nessun fallback rotto, nessun buco.
// -----------------------------------------------------------------------------

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useReducedMotion } from 'motion/react';

import { cn } from '@/lib/utils';

type HeroVideoProps = {
  src: string;
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

const WIDE_SCREEN_QUERY = '(min-width: 768px)';

/**
 * Si iscrive ai cambi della media query. `useSyncExternalStore` chiama questa
 * funzione una sola volta e usa il callback per sapere quando rileggere.
 */
function subscribeToViewport(onStoreChange: () => void): () => void {
  const mediaQuery = window.matchMedia(WIDE_SCREEN_QUERY);
  mediaQuery.addEventListener('change', onStoreChange);
  return () => mediaQuery.removeEventListener('change', onStoreChange);
}

/** Valore letto nel browser: schermo abbastanza largo e nessun risparmio dati. */
function getViewportSnapshot(): boolean {
  const connection = (navigator as Navigator & { connection?: NetworkInformation })
    .connection;
  if (connection?.saveData === true) return false;

  return window.matchMedia(WIDE_SCREEN_QUERY).matches;
}

/**
 * Valore usato durante il render sul server, dove `window` non esiste.
 * `false` significa "non caricare il video": l'HTML generato contiene sempre
 * e solo il poster, e il video viene eventualmente aggiunto dopo l'idratazione.
 * Restituire `true` qui causerebbe un mismatch di idratazione.
 */
function getServerSnapshot(): boolean {
  return false;
}

export function HeroVideo({ src, description }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  /**
   * `useSyncExternalStore` è l'API pensata esattamente per leggere una fonte
   * esterna al mondo React (qui: matchMedia) in modo sicuro rispetto a SSR e
   * idratazione. È preferibile a un `useEffect` che chiama `setState`, che
   * provocherebbe un render a cascata — ed è ciò che ESLint segnala con la
   * regola react-hooks/set-state-in-effect.
   */
  const isViewportSuitable = useSyncExternalStore(
    subscribeToViewport,
    getViewportSnapshot,
    getServerSnapshot,
  );

  const shouldLoad = isViewportSuitable && !shouldReduceMotion;

  // La dissolvenza parte solo quando ci sono abbastanza fotogrammi pronti da
  // riprodurre senza scatti.
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    const handleReady = (): void => {
      setIsVisible(true);
      // `play()` restituisce una Promise che può essere rifiutata (politiche di
      // autoplay del browser). Il catch vuoto è deliberato: se il browser
      // rifiuta, resta il poster ed è esattamente il comportamento voluto.
      void video.play().catch(() => undefined);
    };

    video.addEventListener('canplay', handleReady);
    return () => video.removeEventListener('canplay', handleReady);
  }, [shouldLoad]);

  if (!shouldLoad) return null;

  return (
    <video
      ref={videoRef}
      src={src}
      aria-label={description}
      muted
      loop
      playsInline
      preload="auto"
      // Il video è puramente decorativo: niente controlli e fuori dall'ordine
      // di tabulazione, ma con un'etichetta che ne descrive la scena.
      tabIndex={-1}
      className={cn(
        'absolute inset-0 size-full object-cover transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]',
        isVisible ? 'opacity-100' : 'opacity-0',
      )}
    />
  );
}
