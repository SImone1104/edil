// components/ui/container.tsx
// Server Component. Nessuno stato, nessun evento: non serve 'use client'.

import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type ContainerProps = {
  children: ReactNode;
  /** `wide` per le griglie di immagini, `narrow` per i testi lunghi. */
  size?: 'narrow' | 'default' | 'wide';
  className?: string;
};

const SIZES = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-[88rem]',
} as const;

/**
 * Larghezza massima e margini laterali coerenti su tutto il sito.
 *
 * `children` è la prop speciale di React: corrisponde a <ng-content> di
 * Angular. La differenza è che qui è un valore normale, quindi puoi averne
 * più d'uno passandoli come props separate.
 */
export function Container({ children, size = 'default', className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-6 sm:px-8 lg:px-12', SIZES[size], className)}>
      {children}
    </div>
  );
}
