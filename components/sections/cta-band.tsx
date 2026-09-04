// components/sections/cta-band.tsx
// Server Component.

import { Phone, Mail } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { siteConfig } from '@/lib/site-config';

export function CtaBand() {
  return (
    <Section tone="bianco" size="large">
      <Container size="wide">
        <div className="border-t border-cemento/40 pt-16">
          <div className="flex flex-wrap items-end justify-between gap-12">
            <Reveal>
              <div className="max-w-xl">
                <p className="eyebrow mb-5 text-ruggine">Parliamone</p>
                <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-antracite sm:text-4xl">
                  Ha un immobile da ristrutturare o un cantiere da avviare?
                </h2>
                <p className="mt-5 text-base leading-relaxed text-ardesia-mid">
                  Il primo sopralluogo è gratuito e senza impegno. Se l’intervento non
                  rientra nelle nostre competenze, lo diciamo subito.
                </p>
              </div>
            </Reveal>

            {/* Nessun form: senza backend, i recapiti diretti convertono di più
                di un modulo che finisce in un servizio di terze parti. */}
            <Reveal delay={0.12} className="w-full lg:w-auto">
              <div className="flex w-full flex-col gap-4">
                <a
                  href={`tel:${siteConfig.contacts.phoneHref}`}
                  className="group flex items-center gap-4 border border-cemento px-7 py-5 transition-colors duration-300 hover:border-antracite hover:bg-antracite"
                >
                  <Phone
                    className="size-5 text-ruggine transition-colors group-hover:text-ruggine-bright"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span>
                    <span className="block text-xs text-pietra">Telefono</span>
                    <span className="block font-display text-lg font-medium tracking-tight text-antracite transition-colors group-hover:text-calce">
                      {siteConfig.contacts.phone}
                    </span>
                  </span>
                </a>

                <a
                  href={`mailto:${siteConfig.contacts.email}`}
                  className="group flex items-center gap-4 border border-cemento px-7 py-5 transition-colors duration-300 hover:border-antracite hover:bg-antracite"
                >
                  <Mail
                    className="size-5 text-ruggine transition-colors group-hover:text-ruggine-bright"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span className="min-w-0">
                    <span className="block text-xs text-pietra">Email</span>
                    <span className="block break-all font-display text-base font-medium tracking-tight text-antracite transition-colors group-hover:text-calce sm:text-lg">
                      {siteConfig.contacts.email}
                    </span>
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
