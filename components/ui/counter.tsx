'use client';

// components/ui/counter.tsx
// -----------------------------------------------------------------------------
// Numero che sale da zero quando entra nel viewport.
//
// È Client Component per due ragioni inevitabili: osserva la posizione nello
// scroll e mantiene uno stato che cambia nel tempo. Entrambe cose che esistono
// solo nel browser.
//
// Nota sull'accessibilità: il valore finale è sempre presente nel DOM iniziale
// (`useState(shouldReduceMotion ? value : 0)` parte comunque da un numero
// valido) e l'elemento non è nascosto, quindi gli screen reader annunciano un
// numero sensato anche se l'animazione non parte mai.
// -----------------------------------------------------------------------------

import { useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

type CounterProps = {
  value: number;
  suffix?: string;
  /** Durata dell'animazione in millisecondi. */
  duration?: number;
};

export function Counter({ value, suffix = '', duration = 1400 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const shouldReduceMotion = useReducedMotion();

  const [display, setDisplay] = useState<number>(shouldReduceMotion ? value : 0);

  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;

    let frame = 0;
    const start = performance.now();

    // easeOutExpo: parte veloce e si assesta, evitando l'effetto "slot machine".
    const ease = (t: number): number => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const tick = (now: number): void => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(ease(progress) * value));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    // Cleanup: senza questo, uscendo dalla pagina a metà animazione il
    // requestAnimationFrame continuerebbe a chiamare setState su un componente
    // smontato. È l'equivalente dell'unsubscribe in ngOnDestroy.
    return () => cancelAnimationFrame(frame);
  }, [isInView, shouldReduceMotion, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}
