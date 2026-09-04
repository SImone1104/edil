// app/page.tsx
// -----------------------------------------------------------------------------
// PAGINA DI VERIFICA TEMPORANEA.
// Serve solo a dimostrare che lo strato dati e la configurazione di next/image
// funzionano. Verrà sostituita dalla home vera nel prossimo modulo.
//
// È un Server Component: non c'è 'use client' in cima al file. Le funzioni di
// lib/content-access vengono eseguite in fase di build e al browser arriva solo
// l'HTML risultante — zero JavaScript per questa pagina.
// -----------------------------------------------------------------------------

import Image from 'next/image';

import { heroMedia } from '@/content/company';
import { getAllServices, getFeaturedProjects } from '@/lib/content-access';
import { CATEGORY_LABELS, formatLocation, formatYearRange } from '@/lib/taxonomy';
import { siteConfig } from '@/lib/site-config';

export default function VerificaPage() {
  const featured = getFeaturedProjects(3);
  const services = getAllServices();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
        Verifica strato dati
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{siteConfig.name}</h1>
      <p className="mt-1 text-neutral-600">{siteConfig.claim}</p>

      {/* Poster dell'hero: immagine remota Unsplash servita da next/image. */}
      <section className="mt-10">
        <h2 className="mb-3 text-sm font-medium text-neutral-500">
          Poster hero ({heroMedia.kind})
        </h2>
        {heroMedia.kind === 'video' ? (
          <Image
            src={heroMedia.poster.src}
            alt={heroMedia.poster.alt}
            width={heroMedia.poster.width}
            height={heroMedia.poster.height}
            className="w-full rounded"
            priority
          />
        ) : (
          <Image
            src={heroMedia.image.src}
            alt={heroMedia.image.alt}
            width={heroMedia.image.width}
            height={heroMedia.image.height}
            className="w-full rounded"
            priority
          />
        )}
      </section>

      {/* Video drone servito dalla cartella public/. */}
      {heroMedia.kind === 'video' && (
        <section className="mt-10">
          <h2 className="mb-3 text-sm font-medium text-neutral-500">Video drone</h2>
          <video
            src={heroMedia.src}
            poster={heroMedia.poster.src}
            autoPlay
            muted
            loop
            playsInline
            className="w-full rounded"
          />
        </section>
      )}

      <section className="mt-12">
        <h2 className="mb-4 text-sm font-medium text-neutral-500">
          Cantieri in evidenza ({featured.length})
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {featured.map((project) => (
            <article key={project.slug}>
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                width={project.cover.width}
                height={project.cover.height}
                className="aspect-[4/3] w-full rounded object-cover"
              />
              <h3 className="mt-3 font-medium">{project.title}</h3>
              <p className="text-sm text-neutral-500">
                {CATEGORY_LABELS[project.category]} · {formatLocation(project.location)} ·{' '}
                {formatYearRange(project)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-sm font-medium text-neutral-500">
          Servizi ({services.length})
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug} className="text-sm">
              <span className="font-medium">{service.title}</span>
              <span className="text-neutral-500"> — {service.tagline}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
