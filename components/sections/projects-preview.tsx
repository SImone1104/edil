// components/sections/projects-preview.tsx
// Server Component.

import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { ButtonLink } from '@/components/ui/button';
import { ProjectCard } from '@/components/projects/project-card';
import { getFeaturedProjects } from '@/lib/content-access';

export function ProjectsPreview() {
  const projects = getFeaturedProjects(3);

  return (
    <Section id="cantieri" tone="calce">
      <Container size="wide">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Cantieri"
            title="Tre interventi, tre modi di lavorare."
            description="Un palazzo settecentesco vincolato, una cascina lombarda recuperata, una nuova costruzione a standard NZEB."
          />

          <Reveal delay={0.15}>
            <ButtonLink href="/progetti" variant="ghost" withArrow>
              Tutti i cantieri
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.08} y={24}>
              <ProjectCard project={project} index={index + 1} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
