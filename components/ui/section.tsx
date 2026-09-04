// components/ui/section.tsx
// Server Component.

import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type SectionProps = {
  children: ReactNode;
  /** Ancora per i link interni, es. #servizi. */
  id?: string;
  /** Fondo della sezione: alterna il ritmo verticale della pagina. */
  tone?: 'calce' | 'bianco' | 'antracite';
  size?: 'compact' | 'default' | 'large';
  className?: string;
};

const TONES = {
  calce: 'bg-calce-warm text-antracite',
  bianco: 'bg-white text-antracite',
  antracite: 'bg-antracite text-calce',
} as const;

const SIZES = {
  compact: 'py-16 sm:py-20',
  default: 'py-20 sm:py-28',
  large: 'py-24 sm:py-36',
} as const;

/** Spaziatura verticale e fondo di una fascia di pagina. */
export function Section({
  children,
  id,
  tone = 'calce',
  size = 'default',
  className,
}: SectionProps) {
  return (
    <section id={id} className={cn(TONES[tone], SIZES[size], className)}>
      {children}
    </section>
  );
}
