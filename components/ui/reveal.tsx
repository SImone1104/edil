'use client';

// components/ui/reveal.tsx
// -----------------------------------------------------------------------------
// L'UNICA isola client dedicata alle animazioni di ingresso.
//
// Perché è importante che sia una sola: Framer Motion pesa circa 40 kB
// compressi. Se ogni sezione fosse un Client Component per poter animare,
// tutto il loro contenuto finirebbe nel bundle del browser. Così invece le
// sezioni restano Server Component e passano il proprio markup già renderizzato
// come `children`: React lo consegna a questo wrapper senza serializzarne la
// logica. Il browser scarica Motion una volta sola e riceve il resto come HTML.
//
// È lo stesso motivo per cui in Angular useresti un attribute directive
// riutilizzabile invece di duplicare la logica di animazione in ogni componente.
// -----------------------------------------------------------------------------

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Ritardo in secondi: serve a scalare gli elementi di una stessa fascia. */
  delay?: number;
  /** Spostamento verticale iniziale in pixel. */
  y?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, y = 20, className }: RevealProps) {
  // Rispetta l'impostazione di sistema "riduci animazioni". Chi soffre di
  // disturbi vestibolari la attiva davvero: ignorarla non è un dettaglio.
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      // `once: true` anima una sola volta: rianimare a ogni scroll è
      // esattamente il tipo di effetto che rende un sito corporate stucchevole.
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
