// components/sections/stats-strip.tsx
// -----------------------------------------------------------------------------
// Server Component che ospita quattro isole client minuscole.
//
// Solo il NUMERO è un Client Component (Counter): l'etichetta accanto, la
// griglia e il contenitore restano HTML statico. È la granularità giusta —
// rendere client l'intera fascia per far salire quattro cifre sarebbe uno
// spreco di bundle.
// -----------------------------------------------------------------------------

import { Container } from '@/components/ui/container';
import { Counter } from '@/components/ui/counter';
import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { companyStats } from '@/content/company';

export function StatsStrip() {
  return (
    <Section tone="antracite" size="compact">
      <Container size="wide">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {companyStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08} y={16}>
              <div className="border-t border-white/15 pt-6">
                <p className="font-display text-4xl font-semibold tracking-tight text-calce lg:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix ?? ''} />
                </p>
                <p className="mt-3 text-sm text-cemento">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
