// app/progetti/page.tsx
// -----------------------------------------------------------------------------
// Archivio cantieri. SERVER COMPONENT asincrono.
//
// Due cose nuove rispetto alla home:
//
// 1. La funzione è `async` e fa `await searchParams`. In Next 16 params e
//    searchParams sono Promise: il framework può così cominciare a renderizzare
//    la parte di pagina che non dipende dall'URL prima di conoscerlo.
//
// 2. Leggere searchParams rende la pagina DINAMICA: viene renderizzata a ogni
//    richiesta invece che una volta sola in fase di build. È il prezzo del
//    filtro server-side, ed è il compromesso giusto qui — in cambio i filtri
//    non costano un byte di JavaScript e l'URL filtrato è indicizzabile.
// -----------------------------------------------------------------------------

import type { Metadata } from 'next';

import { ProjectCard } from '@/components/projects/project-card';
import { ProjectFilters } from '@/components/projects/project-filters';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { ButtonLink } from '@/components/ui/button';
import { filterProjects } from '@/lib/content-access';
import { parseProjectFilters } from '@/lib/search-params';

export const metadata: Metadata = {
  title: 'Cantieri',
  description:
    'Restauri conservativi, ristrutturazioni di pregio e nuove costruzioni realizzate fra Milano, Monza e Brianza, Como e Bergamo.',
};

export default async function ProgettiPage({ searchParams }: PageProps<'/progetti'>) {
  const filters = parseProjectFilters(await searchParams);
  const projects = filterProjects(filters);

  return (
    <>
      <PageHeader
        eyebrow="Archivio"
        title="I cantieri consegnati e quelli aperti."
        description="Ogni scheda riporta le lavorazioni effettivamente eseguite, i tempi reali e le tecniche impiegate. Nessun rendering: solo cantieri."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Cantieri' }]}
      />

      <Section tone="calce">
        <Container size="wide">
          <ProjectFilters filters={filters} resultCount={projects.length} />

          {projects.length > 0 ? (
            <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <Reveal key={project.slug} delay={Math.min(index, 5) * 0.06} y={24}>
                  <ProjectCard project={project} index={index + 1} />
                </Reveal>
              ))}
            </div>
          ) : (
            // Stato vuoto: mai lasciare una griglia filtrata semplicemente
            // vuota, senza spiegare cosa è successo e come uscirne.
            <div className="mt-20 border border-cemento/50 px-8 py-20 text-center">
              <p className="font-display text-xl font-medium text-antracite">
                Nessun cantiere con questi filtri.
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ardesia-mid">
                Prova ad allargare la ricerca: potremmo aver eseguito un intervento
                simile in una categoria vicina.
              </p>
              <div className="mt-8">
                <ButtonLink href="/progetti" variant="ghost">
                  Mostra tutti i cantieri
                </ButtonLink>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
