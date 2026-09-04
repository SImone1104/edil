// lib/taxonomy.ts
// -----------------------------------------------------------------------------
// Etichette leggibili e formattatori derivati dai tipi di dominio.
//
// Stanno qui e non in types/project.ts perché sono VALORI: types/ resta un file
// cancellato in compilazione, questo invece finisce nel bundle (server) ed è
// giusto che sia separato.
//
// Il `satisfies Record<Tipo, string>` è il punto chiave: se domani aggiungiamo
// un valore all'unione ProjectStatus e dimentichiamo l'etichetta, il progetto
// non compila. È il controllo di esaustività che in Angular otterresti solo con
// un test.
// -----------------------------------------------------------------------------

import type {
  BuildingUse,
  ClientType,
  Location,
  Project,
  ProjectCategory,
  ProjectStatus,
} from '@/types/project';

/* -------------------------------------------------------------------------- */
/* Etichette                                                                  */
/* -------------------------------------------------------------------------- */

export const CATEGORY_LABELS = {
  'costruzioni-civili': 'Costruzioni civili',
  'ristrutturazioni-di-pregio': 'Ristrutturazioni di pregio',
  'restauro-conservativo': 'Restauro conservativo',
  'consolidamento-strutturale': 'Consolidamento strutturale',
  'efficientamento-energetico': 'Efficientamento energetico',
  'opere-esterne': 'Opere esterne',
} satisfies Record<ProjectCategory, string>;

export const STATUS_LABELS = {
  'in-progettazione': 'In progettazione',
  'in-corso': 'Cantiere in corso',
  completato: 'Completato',
} satisfies Record<ProjectStatus, string>;

export const USE_LABELS = {
  residenziale: 'Residenziale',
  commerciale: 'Commerciale',
  direzionale: 'Direzionale',
  industriale: 'Industriale',
  ricettivo: 'Ricettivo',
  pubblico: 'Pubblico',
  culto: 'Edificio di culto',
} satisfies Record<BuildingUse, string>;

export const CLIENT_TYPE_LABELS = {
  privato: 'Committenza privata',
  pubblico: 'Committenza pubblica',
  impresa: 'Committenza d’impresa',
  'ente-religioso': 'Ente religioso',
} satisfies Record<ClientType, string>;

/**
 * Ordine con cui le categorie compaiono nei filtri.
 * Un array esplicito evita di dipendere dall'ordine delle chiavi di un oggetto.
 */
export const CATEGORY_ORDER: readonly ProjectCategory[] = [
  'costruzioni-civili',
  'ristrutturazioni-di-pregio',
  'restauro-conservativo',
  'consolidamento-strutturale',
  'efficientamento-energetico',
  'opere-esterne',
];

/** Ordine con cui gli stati compaiono nei filtri. */
export const STATUS_ORDER: readonly ProjectStatus[] = [
  'in-corso',
  'completato',
  'in-progettazione',
];

/* -------------------------------------------------------------------------- */
/* Formattatori                                                               */
/* -------------------------------------------------------------------------- */

/** "Monza (MB)" — forma compatta usata nelle card. */
export function formatLocation(location: Location): string {
  return `${location.city} (${location.province})`;
}

/**
 * Intervallo temporale della commessa.
 * Un cantiere ancora aperto si scrive "2024 — in corso", non "2024 — undefined".
 */
export function formatYearRange(project: Pick<Project, 'yearStart' | 'yearEnd'>): string {
  if (project.yearEnd === undefined) {
    return `${project.yearStart} — in corso`;
  }

  if (project.yearEnd === project.yearStart) {
    return String(project.yearStart);
  }

  return `${project.yearStart} — ${project.yearEnd}`;
}

/** Numeri con separatore delle migliaia all'italiana: 1.850 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('it-IT').format(value);
}

/** "1.850 m²", oppure stringa vuota se la metrica non è disponibile. */
export function formatSurface(surfaceSqm: number | undefined): string {
  return surfaceSqm === undefined ? '' : `${formatNumber(surfaceSqm)} m²`;
}

/** "24 mesi" / "1 mese". */
export function formatDuration(months: number | undefined): string {
  if (months === undefined) return '';
  return months === 1 ? '1 mese' : `${months} mesi`;
}
