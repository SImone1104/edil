// components/ui/breadcrumb.tsx
// Server Component.

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type Crumb = {
  label: string;
  /** Assente sull'ultimo elemento: la pagina corrente non è un link. */
  href?: string;
};

type BreadcrumbProps = {
  items: readonly Crumb[];
};

/**
 * Percorso di navigazione.
 *
 * `aria-label` sul <nav> e `aria-current="page"` sull'ultima voce sono ciò che
 * permette a uno screen reader di annunciarlo come percorso e di dire all'utente
 * dove si trova. Senza, sarebbe una fila di link senza significato.
 */
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Percorso di navigazione">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-cemento">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors duration-300 hover:text-calce"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-calce/80">
                  {item.label}
                </span>
              )}

              {!isLast && <ChevronRight className="size-3 opacity-50" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
