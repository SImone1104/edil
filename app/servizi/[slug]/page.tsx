// app/servizi/[slug]/page.tsx
// Server Component, generato staticamente per ciascuno dei sei servizi.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronDown } from 'lucide-react';

import { ProjectCard } from '@/components/projects/project-card';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import {
  getAllServiceSlugs,
  getProjectsForService,
  getServiceBySlug,
} from '@/lib/content-access';

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/servizi/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return { title: 'Servizio non trovato' };

  return {
    title: service.title,
    description: service.tagline,
    openGraph: {
      title: service.title,
      description: service.tagline,
      images: [{ url: service.image.src, alt: service.image.alt }],
    },
  };
}

export default async function ServizioPage({ params }: PageProps<'/servizi/[slug]'>) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const projects = getProjectsForService(service);

  return (
    <>
      <section className="relative flex h-hero-sm items-end overflow-hidden bg-antracite">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-antracite via-antracite/75 to-antracite/45"
          aria-hidden
        />

        <Container size="wide" className="relative z-10 pb-14 pt-32">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Servizi', href: '/servizi' },
              { label: service.title },
            ]}
          />

          <div className="mt-10 max-w-3xl">
            <Reveal y={10}>
              <Icon name={service.icon} className="mb-6 size-9 text-ruggine-bright" />
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-display text-4xl leading-[1.08] font-semibold tracking-tight text-calce sm:text-5xl lg:text-6xl">
                {service.title}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 text-base leading-relaxed text-cemento-light sm:text-lg">
                {service.tagline}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section tone="bianco">
        <Container size="wide">
          <div className="grid gap-16 lg:grid-cols-[1.7fr_1fr]">
            <div className="space-y-6">
              {service.description.map((paragraph, index) => (
                <Reveal key={paragraph.slice(0, 40)} delay={index * 0.05} y={16}>
                  <p className="text-base leading-[1.75] text-ardesia sm:text-[1.0625rem]">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <aside>
              <Reveal delay={0.08}>
                <div className="border-l border-cemento/50 pl-8">
                  <p className="eyebrow mb-4 text-cemento">Un solo referente</p>
                  <p className="text-sm leading-relaxed text-ardesia-mid">
                    Ogni commessa ha un responsabile unico che risponde di qualità,
                    tempi e quadro economico. Il primo sopralluogo è gratuito.
                  </p>
                  <div className="mt-7">
                    <ButtonLink href="/contatti" variant="ghost" withArrow>
                      Richiedi un sopralluogo
                    </ButtonLink>
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Cosa comprende */}
      <Section tone="calce">
        <Container size="wide">
          <SectionHeading eyebrow="Cosa comprende" title="Le lavorazioni incluse." />

          <div className="mt-14 grid gap-px border-t border-l bg-cemento/40 hairline sm:grid-cols-2">
            {service.features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 0.05} y={16}>
                <div className="h-full bg-calce-warm p-8 lg:p-10">
                  {feature.icon && (
                    <Icon name={feature.icon} className="mb-6 size-6 text-ruggine" />
                  )}
                  <h3 className="font-display text-lg font-medium tracking-tight text-antracite">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ardesia-mid">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Metodo di lavoro */}
      {service.process && service.process.length > 0 && (
        <Section tone="antracite">
          <Container size="wide">
            <SectionHeading
              eyebrow="Metodo"
              title="Come procediamo."
              tone="chiaro"
            />

            <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.07} y={18}>
                  <li className="border-t border-white/20 pt-6">
                    <span className="font-display text-3xl font-light text-ruggine-bright">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-4 font-display text-base font-medium tracking-tight text-calce">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-cemento">
                      {step.description}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </Container>
        </Section>
      )}

      {/* Domande frequenti */}
      {service.faq && service.faq.length > 0 && (
        <Section tone="bianco">
          <Container size="wide">
            <SectionHeading eyebrow="Domande frequenti" title="Quello che ci chiedono." />

            {/* <details>/<summary> nativi: apertura e chiusura, gestione da
                tastiera e annuncio dello stato sono già nel browser. Un
                accordion scritto a mano richiederebbe JavaScript e attributi
                ARIA per ottenere lo stesso risultato, spesso peggio. */}
            <div className="mt-12 max-w-3xl divide-y divide-cemento/40 border-y border-cemento/40">
              {service.faq.map((item) => (
                <details key={item.question} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-lg font-medium tracking-tight text-antracite transition-colors duration-300 hover:text-ruggine">
                    {item.question}
                    <ChevronDown
                      className="mt-1 size-5 shrink-0 text-cemento transition-transform duration-300 group-open:rotate-180"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </summary>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ardesia-mid">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Cantieri correlati */}
      {projects.length > 0 && (
        <Section tone="calce">
          <Container size="wide">
            <SectionHeading
              eyebrow="Cantieri"
              title="Dove lo abbiamo applicato."
            />
            <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <Reveal key={project.slug} delay={index * 0.08}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section tone="bianco" size="compact">
        <Container size="wide">
          <Link
            href="/servizi"
            className="group inline-flex items-center gap-3 text-sm font-medium text-ardesia transition-colors duration-300 hover:text-ruggine"
          >
            <ArrowLeft
              className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
              aria-hidden
            />
            Tutti i servizi
          </Link>
        </Container>
      </Section>
    </>
  );
}
