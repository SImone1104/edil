// app/progetti/[slug]/page.tsx
// -----------------------------------------------------------------------------
// Scheda cantiere. SERVER COMPONENT.
//
// Tre meccanismi di Next da mettere a fuoco:
//
// 1. generateStaticParams — dice a Next quali slug esistono, così le sei schede
//    vengono generate in fase di build e servite come HTML statico. È il
//    contrario dell'archivio, che dipende dai searchParams ed è dinamico.
//
// 2. generateMetadata — title, description e anteprima social calcolati dal
//    contenuto della scheda. Sostituisce la manipolazione manuale del <head>.
//
// 3. notFound() — interrompe il render e mostra la pagina 404. Lo slug arriva
//    dall'URL, quindi può essere qualunque cosa: va sempre verificato.
// -----------------------------------------------------------------------------

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Quote } from 'lucide-react';

import { BeforeAfter } from '@/components/projects/before-after';
import { PhaseTimeline } from '@/components/projects/phase-timeline';
import { ProjectCard } from '@/components/projects/project-card';
import { ProjectGallery } from '@/components/projects/project-gallery';
import { ProjectSpecs } from '@/components/projects/project-specs';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import {
  getAllProjectSlugs,
  getProjectBySlug,
  getRelatedProjects,
} from '@/lib/content-access';
import {
  CATEGORY_LABELS,
  CLIENT_TYPE_LABELS,
  STATUS_LABELS,
  USE_LABELS,
  formatLocation,
  formatYearRange,
} from '@/lib/taxonomy';
import { services } from '@/content/services';

/** Genera le sei rotte statiche in fase di build. */
export function generateStaticParams(): Array<{ slug: string }> {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/progetti/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: 'Cantiere non trovato' };
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.cover.src, alt: project.cover.alt }],
    },
  };
}

export default async function ProgettoPage({ params }: PageProps<'/progetti/[slug]'>) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  // Senza questo controllo, uno slug inventato manderebbe la pagina in errore
  // invece che in 404. `notFound()` interrompe qui l'esecuzione.
  if (!project) notFound();

  const related = getRelatedProjects(project);
  const usedServices = services.filter((service) =>
    project.relatedServices.includes(service.slug),
  );

  return (
    <>
      {/* Testata con la copertina a tutta larghezza */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-antracite">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-antracite via-antracite/70 to-antracite/40"
          aria-hidden
        />

        <Container size="wide" className="relative z-10 pb-16 pt-32">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Cantieri', href: '/progetti' },
              { label: project.title },
            ]}
          />

          <div className="mt-10 max-w-4xl">
            <Reveal y={10}>
              <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="eyebrow text-ruggine-bright">
                  {CATEGORY_LABELS[project.category]}
                </span>
                <span className="text-cemento/50" aria-hidden>
                  ·
                </span>
                <span className="eyebrow text-cemento">
                  {STATUS_LABELS[project.status]}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="font-display text-4xl leading-[1.06] font-semibold tracking-tight text-calce sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-cemento-light sm:text-lg">
                {project.summary}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-6 text-sm text-cemento">
                <span>{formatLocation(project.location)}</span>
                <span>{formatYearRange(project)}</span>
                <span>{USE_LABELS[project.use]}</span>
                <span>{CLIENT_TYPE_LABELS[project.clientType]}</span>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Descrizione + specifiche */}
      <Section tone="bianco">
        <Container size="wide">
          <div className="grid gap-16 lg:grid-cols-[1.7fr_1fr]">
            <div>
              <Reveal>
                <p className="eyebrow mb-8 text-cemento">L’intervento</p>
              </Reveal>

              <div className="space-y-6">
                {project.description.map((paragraph, index) => (
                  <Reveal key={paragraph.slice(0, 40)} delay={index * 0.05} y={16}>
                    <p className="text-base leading-[1.75] text-ardesia sm:text-[1.0625rem]">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>

              {project.techniques.length > 0 && (
                <Reveal delay={0.1}>
                  <div className="mt-12 border-t border-cemento/40 pt-8">
                    <p className="eyebrow mb-5 text-cemento">Tecniche e materiali</p>
                    <ul className="flex flex-wrap gap-2">
                      {project.techniques.map((technique) => (
                        <li
                          key={technique}
                          className="border border-cemento/60 px-3.5 py-1.5 text-xs text-ardesia"
                        >
                          {technique}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
            </div>

            <aside>
              <Reveal delay={0.08}>
                <p className="eyebrow mb-6 text-cemento">Scheda tecnica</p>
                <ProjectSpecs specs={project.specs} />

                {project.client && (
                  <div className="mt-8">
                    <p className="eyebrow mb-2 text-cemento">Committente</p>
                    <p className="text-sm text-antracite">{project.client}</p>
                  </div>
                )}

                {project.credits && project.credits.length > 0 && (
                  <div className="mt-8">
                    <p className="eyebrow mb-3 text-cemento">Progetto e collaboratori</p>
                    <ul className="space-y-2.5">
                      {project.credits.map((credit) => (
                        <li key={credit.name} className="text-sm">
                          <span className="block text-xs text-cemento">
                            {credit.role}
                          </span>
                          <span className="text-antracite">{credit.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {usedServices.length > 0 && (
                  <div className="mt-8 border-t border-cemento/40 pt-8">
                    <p className="eyebrow mb-3 text-cemento">Servizi impiegati</p>
                    <ul className="space-y-2">
                      {usedServices.map((service) => (
                        <li key={service.slug}>
                          <Link
                            href={`/servizi/${service.slug}`}
                            className="text-sm text-ruggine transition-colors duration-300 hover:text-antracite"
                          >
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Confronto prima / dopo */}
      {project.beforeAfter && project.beforeAfter.length > 0 && (
        <Section tone="calce">
          <Container size="wide">
            <SectionHeading
              eyebrow="Prima e dopo"
              title="Lo stato di fatto e il risultato."
              description="Trascina il cursore, oppure spostalo con le frecce della tastiera."
            />
            <div className="mt-14 grid gap-12 lg:grid-cols-2">
              {project.beforeAfter.map((pair) => (
                <Reveal key={pair.caption}>
                  <BeforeAfter pair={pair} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Galleria */}
      {project.gallery.length > 0 && (
        <Section tone="bianco">
          <Container size="wide">
            <SectionHeading eyebrow="Immagini" title="Il cantiere." />
            <div className="mt-14">
              <ProjectGallery images={project.gallery} />
            </div>
          </Container>
        </Section>
      )}

      {/* Fasi */}
      {project.phases && project.phases.length > 0 && (
        <Section tone="calce">
          <Container size="wide">
            <SectionHeading
              eyebrow="Avanzamento"
              title="Come si è svolta la commessa."
            />
            <div className="mt-14 max-w-3xl">
              <PhaseTimeline phases={project.phases} />
            </div>
          </Container>
        </Section>
      )}

      {/* Testimonianza */}
      {project.testimonial && (
        <Section tone="antracite" size="compact">
          <Container size="wide">
            <Reveal>
              <figure className="mx-auto max-w-3xl text-center">
                <Quote
                  className="mx-auto mb-8 size-8 text-ruggine-bright"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <blockquote className="font-display text-xl leading-relaxed font-light text-calce sm:text-2xl">
                  «{project.testimonial.quote}»
                </blockquote>
                <figcaption className="mt-8 text-sm text-cemento">
                  <span className="text-calce">{project.testimonial.author}</span>
                  {project.testimonial.role && <span> · {project.testimonial.role}</span>}
                </figcaption>
              </figure>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* Cantieri correlati */}
      {related.length > 0 && (
        <Section tone="bianco">
          <Container size="wide">
            <div className="flex flex-wrap items-end justify-between gap-8">
              <SectionHeading
                eyebrow="Continua"
                title="Altri interventi della stessa categoria."
              />
              <Reveal delay={0.1}>
                <ButtonLink href="/progetti" variant="ghost" withArrow>
                  Tutti i cantieri
                </ButtonLink>
              </Reveal>
            </div>

            <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.08}>
                  <ProjectCard project={item} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section tone="calce" size="compact">
        <Container size="wide">
          <Link
            href="/progetti"
            className="group inline-flex items-center gap-3 text-sm font-medium text-ardesia transition-colors duration-300 hover:text-ruggine"
          >
            <ArrowLeft
              className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
              aria-hidden
            />
            Torna all’archivio cantieri
          </Link>
        </Container>
      </Section>
    </>
  );
}
