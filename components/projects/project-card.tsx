// components/projects/project-card.tsx
// -----------------------------------------------------------------------------
// SERVER COMPONENT — e questo è il punto interessante.
//
// La card ha diversi effetti al passaggio del mouse: l'immagine si ingrandisce
// lentamente, il titolo cambia colore, la freccia scorre. Nessuno di questi
// richiede JavaScript: sono transizioni CSS attivate da `group-hover`, dove
// `group` è la classe messa sul contenitore e `group-hover:` la variante che
// Tailwind applica ai figli quando il contenitore è sotto il mouse.
//
// Morale: "animato" non implica "Client Component". Se l'effetto dipende solo
// dal puntatore, il CSS basta e la pagina resta a zero JavaScript.
// -----------------------------------------------------------------------------

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { CATEGORY_LABELS, formatLocation, formatYearRange } from '@/lib/taxonomy';
import { cn } from '@/lib/utils';
import type { ProjectSummary } from '@/types/project';

type ProjectCardProps = {
  project: ProjectSummary;
  /** La prima card di una griglia può occupare due colonne. */
  featured?: boolean;
  /** Numero progressivo mostrato in sovrimpressione, es. "01". */
  index?: number;
};

export function ProjectCard({ project, featured = false, index }: ProjectCardProps) {
  const isOngoing = project.status !== 'completato';

  return (
    <Link
      href={`/progetti/${project.slug}`}
      className={cn('group block', featured && 'sm:col-span-2')}
    >
      <article>
        <div className="relative overflow-hidden bg-antracite">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            // `sizes` evita di scaricare un'immagine da 1600px per una card
            // che su desktop ne occupa 500. Senza, il browser assume 100vw.
            sizes={
              featured
                ? '(min-width: 1024px) 66vw, 100vw'
                : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
            }
            className={cn(
              'w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
              'group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100',
              featured ? 'aspect-[16/10]' : 'aspect-[4/3]',
            )}
          />

          {/* Velatura che si schiarisce all'hover: dà profondità senza muovere nulla. */}
          <div
            className="absolute inset-0 bg-antracite/25 transition-opacity duration-700 group-hover:opacity-0"
            aria-hidden
          />

          {index !== undefined && (
            <span className="absolute left-5 top-5 font-display text-xs font-medium tracking-widest text-calce/70">
              {String(index).padStart(2, '0')}
            </span>
          )}

          {isOngoing && (
            <span className="absolute right-5 top-5 flex items-center gap-2 bg-ruggine px-3 py-1.5 text-[0.6875rem] font-medium uppercase tracking-wider text-calce">
              <span className="size-1.5 animate-pulse rounded-full bg-calce motion-reduce:animate-none" />
              In corso
            </span>
          )}
        </div>

        <div className="mt-5">
          <p className="eyebrow text-cemento">{CATEGORY_LABELS[project.category]}</p>

          <h3 className="mt-2.5 flex items-start gap-2 font-display text-xl font-medium tracking-tight text-antracite transition-colors duration-300 group-hover:text-ruggine">
            {project.title}
            <ArrowUpRight
              className="mt-1 size-4 shrink-0 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:opacity-100"
              strokeWidth={1.5}
              aria-hidden
            />
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ardesia-mid">
            {project.summary}
          </p>

          <p className="mt-3 text-xs text-cemento">
            {formatLocation(project.location)} · {formatYearRange(project)}
          </p>
        </div>
      </article>
    </Link>
  );
}
