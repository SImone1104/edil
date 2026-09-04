// lib/content-access.ts
// -----------------------------------------------------------------------------
// Unico punto di accesso ai contenuti.
//
// È il corrispettivo dei tuoi @Injectable service Angular, ma senza Dependency
// Injection: sono funzioni pure che si importano dove servono. Nessuna di esse
// fa I/O — i dati sono array in memoria letti in fase di build — quindi sono
// sincrone e chiamabili direttamente dentro un Server Component.
//
// Il giorno in cui i contenuti arriveranno da un CMS, si riscrive SOLO questo
// file (rendendo async le funzioni): nessun componente cambia firma.
// -----------------------------------------------------------------------------

import { projects } from '@/content/projects';
import { services } from '@/content/services';
import type {
  Project,
  ProjectFilters,
  ProjectSlug,
  ProjectSortKey,
  ProjectSummary,
  Service,
  ServiceSlug,
} from '@/types/project';

/* -------------------------------------------------------------------------- */
/* Progetti                                                                   */
/* -------------------------------------------------------------------------- */

/** Confronto per l'ordinamento di default: `order` manuale, poi anno decrescente. */
function byDefaultOrder(a: Project, b: Project): number {
  const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
  const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
  if (orderA !== orderB) return orderA - orderB;

  // Un cantiere aperto è "più recente" di uno chiuso: usiamo l'anno corrente
  // come chiave sostitutiva quando yearEnd manca.
  const yearA = a.yearEnd ?? new Date().getFullYear();
  const yearB = b.yearEnd ?? new Date().getFullYear();
  return yearB - yearA;
}

export function getAllProjects(): readonly Project[] {
  return [...projects].sort(byDefaultOrder);
}

/** Ritorna `undefined` se lo slug non esiste: la pagina risponderà con notFound(). */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Slug di tutte le schede: alimenta generateStaticParams. */
export function getAllProjectSlugs(): readonly ProjectSlug[] {
  return projects.map((project) => project.slug);
}

/**
 * Riduce una scheda completa alla sua proiezione da card.
 * Serve a non spedire gallery, fasi e crediti alle pagine che mostrano
 * soltanto anteprime.
 */
export function toProjectSummary(project: Project): ProjectSummary {
  return {
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    category: project.category,
    status: project.status,
    location: project.location,
    yearStart: project.yearStart,
    ...(project.yearEnd === undefined ? {} : { yearEnd: project.yearEnd }),
    cover: project.cover,
  };
}

/** Cantieri in evidenza per la home. */
export function getFeaturedProjects(limit = 3): readonly ProjectSummary[] {
  return getAllProjects()
    .filter((project) => project.featured)
    .slice(0, limit)
    .map(toProjectSummary);
}

/**
 * Applica i filtri dell'archivio.
 * I filtri assenti non restringono nulla, così la stessa funzione serve sia
 * l'archivio completo sia quello filtrato dai searchParams.
 */
export function filterProjects(
  filters: ProjectFilters,
  sort: ProjectSortKey = 'recenti',
): readonly ProjectSummary[] {
  const needle = filters.query?.trim().toLowerCase() ?? '';

  const filtered = getAllProjects().filter((project) => {
    if (filters.category !== undefined && project.category !== filters.category) return false;
    if (filters.status !== undefined && project.status !== filters.status) return false;
    if (filters.use !== undefined && project.use !== filters.use) return false;

    if (needle.length > 0) {
      const haystack = [
        project.title,
        project.summary,
        project.location.city,
        ...project.techniques,
      ]
        .join(' ')
        .toLowerCase();

      if (!haystack.includes(needle)) return false;
    }

    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'meno-recenti':
        return a.yearStart - b.yearStart;
      case 'alfabetico':
        return a.title.localeCompare(b.title, 'it');
      case 'recenti':
        return b.yearStart - a.yearStart;
    }
  });

  return sorted.map(toProjectSummary);
}

/** Altri cantieri della stessa categoria, escluso quello corrente. */
export function getRelatedProjects(
  project: Project,
  limit = 2,
): readonly ProjectSummary[] {
  return getAllProjects()
    .filter((other) => other.slug !== project.slug && other.category === project.category)
    .slice(0, limit)
    .map(toProjectSummary);
}

/* -------------------------------------------------------------------------- */
/* Servizi                                                                    */
/* -------------------------------------------------------------------------- */

export function getAllServices(): readonly Service[] {
  return [...services].sort((a, b) => a.order - b.order);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): readonly ServiceSlug[] {
  return services.map((service) => service.slug);
}

export function getFeaturedServices(): readonly Service[] {
  return getAllServices().filter((service) => service.featured);
}

/** Cantieri correlati a un servizio, pescati dalle categorie che dichiara. */
export function getProjectsForService(
  service: Service,
  limit = 3,
): readonly ProjectSummary[] {
  return getAllProjects()
    .filter((project) => service.relatedCategories.includes(project.category))
    .slice(0, limit)
    .map(toProjectSummary);
}
