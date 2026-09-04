'use client';

// components/projects/project-gallery.tsx
// -----------------------------------------------------------------------------
// Galleria con ingranditore (lightbox). Client Component: apre, chiude, naviga
// da tastiera e blocca lo scroll.
//
// Le miniature restano <button> veri e non <div onClick>: così ricevono il
// focus da tastiera, rispondono a Invio e Spazio e vengono annunciate come
// pulsanti. È la differenza fra "sembra cliccabile" e "è cliccabile".
// -----------------------------------------------------------------------------

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import type { ImageAsset } from '@/types/project';

type ProjectGalleryProps = {
  images: readonly ImageAsset[];
};

export function ProjectGallery({ images }: ProjectGalleryProps) {
  // `null` significa lightbox chiusa; un numero è l'indice dell'immagine aperta.
  // Un solo stato invece di due (isOpen + index) rende impossibile lo stato
  // incoerente "aperta ma senza immagine".
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const close = useCallback((): void => setOpenIndex(null), []);

  const goTo = useCallback(
    (direction: 1 | -1): void => {
      setOpenIndex((current) => {
        if (current === null) return null;
        // Il resto della divisione fa girare la galleria in tondo:
        // dall'ultima si torna alla prima e viceversa.
        return (current + direction + images.length) % images.length;
      });
    },
    [images.length],
  );

  useEffect(() => {
    if (openIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') goTo(1);
      if (event.key === 'ArrowLeft') goTo(-1);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openIndex, close, goTo]);

  const openImage = openIndex === null ? undefined : images[openIndex];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="group relative block overflow-hidden bg-antracite"
            aria-label={`Ingrandisci: ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
            />
            <span
              className="absolute inset-0 bg-antracite/20 transition-opacity duration-500 group-hover:opacity-0"
              aria-hidden
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {openImage && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={openImage.alt}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-antracite/97 p-4 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            // Clic sullo sfondo per chiudere. Il clic sull'immagine non si
            // propaga fin qui grazie allo stopPropagation più sotto.
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-5 top-5 p-2 text-calce transition-colors hover:text-ruggine-bright"
              aria-label="Chiudi l'ingranditore"
            >
              <X className="size-6" strokeWidth={1.5} aria-hidden />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    goTo(-1);
                  }}
                  className="absolute left-3 p-3 text-calce transition-colors hover:text-ruggine-bright sm:left-6"
                  aria-label="Immagine precedente"
                >
                  <ChevronLeft className="size-7" strokeWidth={1.5} aria-hidden />
                </button>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    goTo(1);
                  }}
                  className="absolute right-3 p-3 text-calce transition-colors hover:text-ruggine-bright sm:right-6"
                  aria-label="Immagine successiva"
                >
                  <ChevronRight className="size-7" strokeWidth={1.5} aria-hidden />
                </button>
              </>
            )}

            <motion.figure
              className="max-w-5xl"
              onClick={(event) => event.stopPropagation()}
              initial={shouldReduceMotion ? false : { scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={openImage.src}
                alt={openImage.alt}
                width={openImage.width}
                height={openImage.height}
                sizes="90vw"
                className="max-h-[80vh] w-auto object-contain"
              />
              <figcaption className="mt-4 flex items-center justify-between gap-6 text-xs text-cemento">
                <span>{openImage.alt}</span>
                <span className="shrink-0 tabular-nums">
                  {(openIndex ?? 0) + 1} / {images.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
