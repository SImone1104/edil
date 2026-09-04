'use client';

// components/projects/before-after.tsx
// -----------------------------------------------------------------------------
// Confronto prima/dopo con cursore trascinabile.
//
// SCELTA DI ACCESSIBILITÀ da notare: il cursore è un <input type="range"> vero,
// reso invisibile e steso sopra le immagini. Molte implementazioni usano un div
// con eventi di puntatore, e il risultato è un controllo inutilizzabile da
// tastiera. Con un range nativo otteniamo gratis: frecce direzionali, Home e
// Fine, focus, annuncio corretto agli screen reader e supporto touch.
//
// L'unico stato è la posizione in percentuale, aggiornata da onChange.
// -----------------------------------------------------------------------------

import Image from 'next/image';
import { useState } from 'react';

import type { BeforeAfterPair } from '@/types/project';

type BeforeAfterProps = {
  pair: BeforeAfterPair;
};

export function BeforeAfter({ pair }: BeforeAfterProps) {
  const [position, setPosition] = useState(50);

  return (
    <figure>
      <div className="relative select-none overflow-hidden bg-antracite">
        {/* Immagine "dopo": sta sotto e definisce l'altezza del contenitore. */}
        <Image
          src={pair.after.src}
          alt={pair.after.alt}
          width={pair.after.width}
          height={pair.after.height}
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="aspect-[16/10] w-full object-cover"
        />

        {/* Immagine "prima": ritagliata a destra dalla posizione del cursore.
            `clip-path` è la tecnica giusta qui perché non ridimensiona nulla:
            le due immagini restano allineate pixel su pixel. */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          aria-hidden
        >
          <Image
            src={pair.before.src}
            alt=""
            width={pair.before.width}
            height={pair.before.height}
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="aspect-[16/10] w-full object-cover"
          />
        </div>

        {/* Linea di separazione e maniglia visiva. */}
        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-calce"
          style={{ left: `${position}%` }}
          aria-hidden
        >
          <span className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-calce/70 bg-antracite/70 backdrop-blur-sm">
            <span className="text-[0.625rem] font-medium tracking-wider text-calce">
              ↔
            </span>
          </span>
        </div>

        <span className="pointer-events-none absolute left-4 top-4 bg-antracite/80 px-3 py-1.5 text-[0.625rem] font-medium uppercase tracking-wider text-calce">
          Prima
        </span>
        <span className="pointer-events-none absolute right-4 top-4 bg-ruggine/90 px-3 py-1.5 text-[0.625rem] font-medium uppercase tracking-wider text-calce">
          Dopo
        </span>

        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="absolute inset-0 size-full cursor-ew-resize opacity-0"
          aria-label={`Confronto prima e dopo: ${pair.caption}. Usa le frecce per spostare il cursore.`}
        />
      </div>

      <figcaption className="mt-4 text-sm text-ardesia-mid">{pair.caption}</figcaption>
    </figure>
  );
}
