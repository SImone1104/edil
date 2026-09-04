// components/projects/phase-timeline.tsx
// Server Component.

import { Check } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';
import type { ProjectPhase } from '@/types/project';

type PhaseTimelineProps = {
  phases: readonly ProjectPhase[];
};

/** Trasforma "2023-04" in "Aprile 2023". */
function formatPeriod(period: string): string {
  const [year, month] = period.split('-');
  if (year === undefined || month === undefined) return period;

  const date = new Date(Number(year), Number(month) - 1, 1);
  const formatted = new Intl.DateTimeFormat('it-IT', {
    month: 'long',
    year: 'numeric',
  }).format(date);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/** Avanzamento della commessa, fase per fase. */
export function PhaseTimeline({ phases }: PhaseTimelineProps) {
  return (
    <ol className="relative">
      {phases.map((phase, index) => {
        const isLast = index === phases.length - 1;

        return (
          <li key={phase.title} className="relative pb-10 pl-12 last:pb-0">
            {/* Linea verticale che collega i pallini, assente sull'ultimo. */}
            {!isLast && (
              <span
                className="absolute left-[0.6875rem] top-6 h-full w-px bg-cemento/50"
                aria-hidden
              />
            )}

            <span
              className={cn(
                'absolute left-0 top-1 flex size-6 items-center justify-center rounded-full border',
                phase.completed
                  ? 'border-ruggine bg-ruggine text-calce'
                  : 'border-cemento bg-calce-warm text-pietra',
              )}
              aria-hidden
            >
              {phase.completed ? (
                <Check className="size-3.5" strokeWidth={2.5} />
              ) : (
                <span className="size-1.5 rounded-full bg-current" />
              )}
            </span>

            <Reveal delay={index * 0.06} y={14}>
              <p className="eyebrow text-pietra">{formatPeriod(phase.period)}</p>
              <h3 className="mt-2 font-display text-lg font-medium tracking-tight text-antracite">
                {phase.title}
                {/* Il testo fra parentesi non è decorativo: senza, lo stato
                    "non completata" sarebbe comunicato solo dal colore. */}
                {!phase.completed && (
                  <span className="ml-2 text-xs font-normal text-ruggine">
                    (in programma)
                  </span>
                )}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ardesia-mid">
                {phase.description}
              </p>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
