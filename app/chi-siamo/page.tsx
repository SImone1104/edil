// app/chi-siamo/page.tsx
// Server Component statico.

import type { Metadata } from 'next';
import Image from 'next/image';
import { BadgeCheck } from 'lucide-react';

import { StatsStrip } from '@/components/sections/stats-strip';
import { CtaBand } from '@/components/sections/cta-band';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { certifications, companyStory, team } from '@/content/company';
import { unsplash } from '@/lib/media';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'L’impresa',
  description:
    'Ferrante Costruzioni: dal 1978 fra Milano, Monza e Brianza. Sessantadue persone, squadre in organico, attestazioni SOA per costruzioni e restauro.',
};

/** Immagine di reparto, mostrata accanto alla storia dell'impresa. */
const storyImage = unsplash(
  'photo-1504307651254-35680f356dfd',
  'Maestranze al lavoro su un ponteggio durante una giornata di cantiere',
  'cover',
);

export default function ChiSiamoPage() {
  return (
    <>
      <PageHeader
        eyebrow="L’impresa"
        title="Squadre nostre, in cantiere tutti i giorni."
        description={`Fondata a Monza nel ${siteConfig.foundedYear}. Oggi sessantadue persone, di cui cinquantuno maestranze dirette: è la ragione per cui la qualità non cambia da un cantiere all’altro.`}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'L’impresa' }]}
      />

      {/* Storia */}
      <Section tone="bianco">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <Reveal>
              <Image
                src={storyImage.src}
                alt={storyImage.alt}
                width={storyImage.width}
                height={storyImage.height}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="aspect-[4/5] w-full object-cover"
              />
            </Reveal>

            <div>
              <Reveal>
                <p className="eyebrow mb-8 text-pietra">Dal 1978</p>
              </Reveal>

              <div className="space-y-6">
                {companyStory.map((paragraph, index) => (
                  <Reveal key={paragraph.slice(0, 40)} delay={index * 0.05} y={16}>
                    <p className="text-base leading-[1.75] text-ardesia sm:text-[1.0625rem]">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* La fascia numeri è la stessa della home: un componente, due pagine. */}
      <StatsStrip />

      {/* Squadra */}
      <Section tone="calce">
        <Container size="wide">
          <SectionHeading
            eyebrow="Referenti"
            title="Chi risponde quando chiama."
            description="Ogni commessa ha un responsabile unico. Non passerà da un centralino a un ufficio a un capocantiere per sapere a che punto sono i lavori."
          />

          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.07} y={20}>
                <article>
                  {member.photo ? (
                    <Image
                      src={member.photo.src}
                      alt={member.photo.alt}
                      width={member.photo.width}
                      height={member.photo.height}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="aspect-[4/5] w-full object-cover"
                    />
                  ) : (
                    // Segnaposto tipografico invece di una foto stock generica:
                    // meglio un'assenza dichiarata che un volto che non c'entra.
                    <div
                      className="flex aspect-[4/5] w-full items-center justify-center border border-cemento/50 bg-white"
                      aria-hidden
                    >
                      <span className="font-display text-4xl font-light text-pietra">
                        {member.name
                          .split(' ')
                          .map((part) => part.charAt(0))
                          .join('')}
                      </span>
                    </div>
                  )}

                  <h3 className="mt-5 font-display text-lg font-medium tracking-tight text-antracite">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-ruggine">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ardesia-mid">
                    {member.bio}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Certificazioni */}
      <Section tone="bianco">
        <Container size="wide">
          <SectionHeading
            eyebrow="Attestazioni"
            title="Qualificazioni e certificazioni."
            description="Le attestazioni SOA definiscono le categorie e gli importi per cui possiamo concorrere agli appalti pubblici."
          />

          <div className="mt-14 grid gap-px border-t border-l bg-cemento/40 hairline sm:grid-cols-2">
            {certifications.map((certification, index) => (
              <Reveal key={certification.code} delay={index * 0.06} y={16}>
                <div className="flex h-full items-start gap-5 bg-white p-8">
                  <BadgeCheck
                    className="mt-0.5 size-6 shrink-0 text-ruggine"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <div>
                    <p className="font-display text-base font-medium tracking-tight text-antracite">
                      {certification.code}
                    </p>
                    <p className="mt-1 text-sm text-ardesia-mid">
                      {certification.title}
                    </p>
                    <p className="mt-3 text-xs text-pietra">
                      {certification.issuer} · rilasciata nel {certification.issuedAt}
                      {certification.expiresAt !== undefined &&
                        `, valida fino al ${certification.expiresAt}`}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
