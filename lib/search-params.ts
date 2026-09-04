// lib/search-params.ts
// -----------------------------------------------------------------------------
// Lettura e scrittura dei filtri dell'archivio nell'URL.
//
// I searchParams sono la fonte di verità dei filtri. Il vantaggio rispetto a
// uno stato interno al componente: l'URL filtrato è condivisibile, sopravvive
// al ricaricamento, funziona con il tasto Indietro del browser e resta
// leggibile a un motore di ricerca.
//
// Il problema da risolvere qui è che un searchParam è `string | string[] |
// undefined`: qualunque cosa l'utente scriva a mano nella barra degli
// indirizzi. Queste funzioni lo restringono ai valori legali del dominio senza
// usare `as` e senza `any`, con veri type guard.
// -----------------------------------------------------------------------------

import { CATEGORY_ORDER, STATUS_ORDER } from '@/lib/taxonomy';
import type { ProjectCategory, ProjectFilters, ProjectStatus } from '@/types/project';

/** Forma grezza dei searchParams consegnati da Next a una pagina. */
export type RawSearchParams = Record<string, string | string[] | undefined>;

/**
 * Un parametro ripetuto (?category=a&category=b) arriva come array.
 * Teniamo il primo valore: i nostri filtri sono a selezione singola.
 */
function firstValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

/**
 * Type guard: restringe `string` a `ProjectCategory`.
 * Il predicato `value is ProjectCategory` è ciò che permette al compilatore di
 * fidarsi del controllo a runtime, invece di costringerci a un cast.
 */
function isProjectCategory(value: string): value is ProjectCategory {
  return (CATEGORY_ORDER as readonly string[]).includes(value);
}

function isProjectStatus(value: string): value is ProjectStatus {
  return (STATUS_ORDER as readonly string[]).includes(value);
}

/** Converte i searchParams grezzi in filtri validati. Ignora ciò che non riconosce. */
export function parseProjectFilters(searchParams: RawSearchParams): ProjectFilters {
  const category = firstValue(searchParams['categoria']);
  const status = firstValue(searchParams['stato']);
  const query = firstValue(searchParams['q'])?.trim();

  return {
    ...(category !== undefined && isProjectCategory(category) ? { category } : {}),
    ...(status !== undefined && isProjectStatus(status) ? { status } : {}),
    ...(query !== undefined && query.length > 0 ? { query } : {}),
  };
}

/**
 * Costruisce l'href di un filtro a partire da quelli attivi.
 *
 * Due comportamenti voluti:
 *  - passando `null` si rimuove quel filtro (serve alla voce "Tutti");
 *  - ricliccare il filtro già attivo lo disattiva, gestito da chi chiama.
 */
export function buildFilterHref(
  current: ProjectFilters,
  patch: {
    category?: ProjectCategory | null;
    status?: ProjectStatus | null;
    query?: string | null;
  },
): string {
  const params = new URLSearchParams();

  const nextCategory = patch.category === undefined ? current.category : patch.category;
  const nextStatus = patch.status === undefined ? current.status : patch.status;
  const nextQuery = patch.query === undefined ? current.query : patch.query;

  if (nextCategory) params.set('categoria', nextCategory);
  if (nextStatus) params.set('stato', nextStatus);
  if (nextQuery) params.set('q', nextQuery);

  const queryString = params.toString();
  return queryString.length > 0 ? `/progetti?${queryString}` : '/progetti';
}

/** Numero di filtri attivi: serve a decidere se mostrare "Azzera i filtri". */
export function countActiveFilters(filters: ProjectFilters): number {
  return [filters.category, filters.status, filters.query].filter(
    (value) => value !== undefined,
  ).length;
}
