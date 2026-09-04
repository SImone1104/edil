// components/sections/services-grid.tsx
// Server Component: legge i servizi in fase di build e produce HTML.

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { getAllServices } from '@/lib/content-access';

export function ServicesGrid() {
  const services = getAllServices();

  return (
    <Section id="servizi" tone="bianco">
      <Container size="wide">
        <SectionHeading
          eyebrow="Cosa facciamo"
          title="Sei competenze, un'unica direzione di cantiere."
          description="Dalla nuova costruzione al restauro di un immobile vincolato. Quando un intervento ne richiede più di una, resta comunque un solo responsabile di commessa."
        />

        <div className="mt-16 grid gap-px border-t border-l bg-cemento/40 hairline sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            // Ogni scheda entra 60 ms dopo la precedente: lo sfalsamento
            // rende leggibile la griglia invece di farla apparire di colpo.
            <Reveal key={service.slug} delay={index * 0.06} y={16}>
              <Link
                href={`/servizi/${service.slug}`}
                className="group flex h-full flex-col bg-white p-8 transition-colors duration-500 hover:bg-calce lg:p-10"
              >
                <Icon
                  name={service.icon}
                  className="size-7 text-ruggine transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 motion-reduce:group-hover:translate-y-0"
                />

                <h3 className="mt-7 font-display text-lg font-medium tracking-tight text-antracite">
                  {service.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-ardesia-mid">
                  {service.tagline}
                </p>

                <span className="mt-7 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-pietra transition-colors duration-300 group-hover:text-ruggine">
                  Approfondisci
                  <ArrowRight
                    className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
