// components/projects/project-filters.tsx
// -----------------------------------------------------------------------------
// SERVER COMPONENT — ed è il punto del modulo.
//
// Un filtro si fa istintivamente con `useState` e un gestore di click. Qui non
// serve niente di tutto ciò: ogni filtro è un normale <Link> verso lo stesso
// percorso con una query string diversa. Il server rilegge i searchParams e
// rimanda la lista già filtrata.
//
// Cosa si guadagna rispetto a useState:
//   - l'URL filtrato è condivisibile e si può mettere nei preferiti;
//   - il tasto Indietro funziona senza scriverne la logica;
//   - i filtri sono link veri, quindi navigabili da tastiera e indicizzabili;
//   - zero JavaScript spedito al browser per farli funzionare;
//   - lo stato non può desincronizzarsi dall'URL, perché è l'URL.
//
// In Angular l'equivalente sarebbe leggere ActivatedRoute.queryParams invece di
// tenere un campo nel componente — stessa idea, qui però è anche gratis in
// termini di bundle.
// -----------------------------------------------------------------------------

import Link from 'next/link';
import { X } from 'lucide-react';

import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  STATUS_LABELS,
  STATUS_ORDER,
} from '@/lib/taxonomy';
import { buildFilterHref, countActiveFilters } from '@/lib/search-params';
import { cn } from '@/lib/utils';
import type { ProjectFilters as Filters } from '@/types/project';

type ProjectFiltersProps = {
  filters: Filters;
  /** Numero di risultati, mostrato accanto ai filtri. */
  resultCount: number;
};

/** Stile condiviso da tutte le pastiglie di filtro. */
function chipClass(isActive: boolean): string {
  return cn(
    'inline-flex items-center border px-4 py-2 text-xs font-medium transition-colors duration-300',
    isActive
      ? 'border-antracite bg-antracite text-calce'
      : 'border-cemento/70 text-ardesia hover:border-antracite hover:text-antracite',
  );
}

export function ProjectFilters({ filters, resultCount }: ProjectFiltersProps) {
  const activeCount = countActiveFilters(filters);

  return (
    <div className="border-b border-cemento/40 pb-10">
      <div className="flex flex-wrap items-start gap-x-12 gap-y-8">
        <div>
          <p className="eyebrow mb-4 text-cemento">Tipo di intervento</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={buildFilterHref(filters, { category: null })}
              className={chipClass(filters.category === undefined)}
            >
              Tutti
            </Link>

            {CATEGORY_ORDER.map((category) => {
              const isActive = filters.category === category;

              return (
                <Link
                  key={category}
                  // Cliccando il filtro già attivo lo si toglie: passiamo null.
                  href={buildFilterHref(filters, {
                    category: isActive ? null : category,
                  })}
                  className={chipClass(isActive)}
                >
                  {CATEGORY_LABELS[category]}
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <p className="eyebrow mb-4 text-cemento">Stato</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={buildFilterHref(filters, { status: null })}
              className={chipClass(filters.status === undefined)}
            >
              Tutti
            </Link>

            {STATUS_ORDER.map((status) => {
              const isActive = filters.status === status;

              return (
                <Link
                  key={status}
                  href={buildFilterHref(filters, { status: isActive ? null : status })}
                  className={chipClass(isActive)}
                >
                  {STATUS_LABELS[status]}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-ardesia-mid">
          {resultCount === 1 ? '1 cantiere' : `${resultCount} cantieri`}
          {activeCount > 0 && ' con i filtri attivi'}
        </p>

        {activeCount > 0 && (
          <Link
            href="/progetti"
            className="inline-flex items-center gap-2 text-xs font-medium text-ruggine transition-colors duration-300 hover:text-antracite"
          >
            <X className="size-3.5" aria-hidden />
            Azzera i filtri
          </Link>
        )}
      </div>
    </div>
  );
}
