// app/page.tsx
// -----------------------------------------------------------------------------
// Home. SERVER COMPONENT: nessun 'use client'.
//
// Questa pagina non spedisce al browser una sola riga del proprio codice.
// Il JavaScript che arriva all'utente è soltanto quello delle isole client
// dichiarate più in basso nell'albero: Reveal, Counter, HeroVideo, HeaderShell
// e MobileNav. Tutto il resto è HTML generato in fase di build.
// -----------------------------------------------------------------------------

import { Hero } from '@/components/sections/hero';
import { ServicesGrid } from '@/components/sections/services-grid';
import { StatsStrip } from '@/components/sections/stats-strip';
import { ProjectsPreview } from '@/components/sections/projects-preview';
import { CtaBand } from '@/components/sections/cta-band';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <StatsStrip />
      <ProjectsPreview />
      <CtaBand />
    </>
  );
}
