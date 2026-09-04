// components/ui/button.tsx
// Server Component: gli effetti di hover sono CSS, non serve JavaScript.

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'inverse';
  /** Mostra la freccia che scorre a destra al passaggio del mouse. */
  withArrow?: boolean;
  className?: string;
};

const VARIANTS = {
  primary:
    'bg-antracite text-calce hover:bg-ruggine border border-transparent',
  ghost:
    'bg-transparent text-antracite border border-cemento hover:border-antracite hover:bg-antracite hover:text-calce',
  inverse:
    'bg-calce text-antracite border border-transparent hover:bg-ruggine hover:text-calce',
} as const;

/**
 * Collegamento con aspetto da pulsante.
 *
 * `next/link` sostituisce routerLink: fa il prefetch della rotta quando il
 * link entra nel viewport, quindi la navigazione è immediata.
 */
export function ButtonLink({
  href,
  children,
  variant = 'primary',
  withArrow = false,
  className,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-medium',
        'transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        VARIANTS[variant],
        className,
      )}
    >
      {children}
      {withArrow && (
        <ArrowRight
          className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
          aria-hidden
        />
      )}
    </Link>
  );
}
