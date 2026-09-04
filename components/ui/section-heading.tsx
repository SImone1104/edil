// components/ui/section-heading.tsx
// Server Component.

import { cn } from '@/lib/utils';

import { Reveal } from './reveal';

type SectionHeadingProps = {
  /** Occhiello sopra il titolo, es. "01 — Servizi". */
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'scuro' | 'chiaro';
  className?: string;
};

/** Testata di sezione: occhiello, titolo, sommario. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'scuro',
  className,
}: SectionHeadingProps) {
  const isDark = tone === 'scuro';

  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <p
            className={cn(
              'eyebrow mb-5 flex items-center gap-3',
              align === 'center' && 'justify-center',
              isDark ? 'text-ruggine' : 'text-cemento',
            )}
          >
            <span className="inline-block h-px w-8 bg-current opacity-60" aria-hidden />
            {eyebrow}
          </p>
        </Reveal>
      )}

      <Reveal delay={0.06}>
        <h2
          className={cn(
            'font-display text-3xl leading-[1.12] font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]',
            isDark ? 'text-antracite' : 'text-calce',
          )}
        >
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              'mt-5 text-base leading-relaxed sm:text-lg',
              isDark ? 'text-ardesia-mid' : 'text-cemento',
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
