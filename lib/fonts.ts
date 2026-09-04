// lib/fonts.ts
// -----------------------------------------------------------------------------
// Caricamento dei font tramite next/font.
//
// next/font scarica i file in fase di build e li serve dal nostro dominio:
// niente richiesta a fonts.googleapis.com a runtime, quindi un round trip in
// meno sul percorso critico e nessun problema di privacy verso terzi.
// `display: 'swap'` evita il testo invisibile durante il caricamento.
//
// Le due variabili CSS prodotte qui vengono agganciate ai token
// --font-display e --font-body dichiarati in app/globals.css.
// -----------------------------------------------------------------------------

import { Sora, Inter } from 'next/font/google';

/** Titoli: geometrico, con caratteri ampi e chiusure nette. */
export const fontDisplay = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

/** Testo corrente: neutro e molto leggibile ai corpi piccoli. */
export const fontBody = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});
