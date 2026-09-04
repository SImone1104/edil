// lib/media.ts
// -----------------------------------------------------------------------------
// Costruttori di asset multimediali.
//
// Perché un helper invece di scrivere gli URL a mano nei file di contenuto:
//   1. l'URL Unsplash ha cinque parametri che devono restare coerenti su tutto
//      il sito (formato, ritaglio, qualità); centralizzarli evita derive;
//   2. `width`/`height` dell'ImageAsset devono corrispondere al ritaglio
//      richiesto nell'URL, altrimenti next/image riserva uno spazio con le
//      proporzioni sbagliate e la pagina "salta" al caricamento;
//   3. il giorno in cui le foto reali dell'impresa sostituiranno Unsplash si
//      cambia solo questo file.
// -----------------------------------------------------------------------------

import type { ImageAsset } from '@/types/project';

/** Proporzioni standard usate nel sito, per non inventare un formato per volta. */
export const ASPECT = {
  /** Copertine schede cantiere e card progetto. */
  cover: { width: 1600, height: 1100 },
  /** Scatti di galleria. */
  gallery: { width: 1400, height: 1000 },
  /** Immagini di testata delle pagine servizio. */
  service: { width: 1200, height: 900 },
  /** Fotogramma a piena larghezza / poster video. */
  wide: { width: 2400, height: 1350 },
  /** Ritratti del team. */
  portrait: { width: 800, height: 1000 },
} as const satisfies Record<string, { width: number; height: number }>;

export type AspectName = keyof typeof ASPECT;

/**
 * Costruisce un ImageAsset a partire dall'id della foto Unsplash.
 *
 * L'id è la parte finale dell'URL della foto, es. "photo-1517581177682-a085bb7ffb15".
 * I parametri applicati:
 *   auto=format → Unsplash serve WebP/AVIF ai browser che li supportano
 *   fit=crop    → ritaglia invece di deformare
 *   w / h       → fissano il ritaglio, così le proporzioni sono deterministiche
 *   q=80        → compromesso qualità/peso adatto a fotografia di architettura
 *
 * Nota: next/image ri-ottimizza comunque l'immagine; questi parametri servono a
 * non scaricare dall'origine un file da 5000px quando ce ne servono 1600.
 */
export function unsplash(
  id: string,
  alt: string,
  aspect: AspectName = 'cover',
  credit?: string,
): ImageAsset {
  const { width, height } = ASPECT[aspect];

  return {
    src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80`,
    alt,
    width,
    height,
    ...(credit === undefined ? {} : { credit }),
  };
}
