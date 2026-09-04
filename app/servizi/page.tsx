// app/servizi/page.tsx
// Server Component statico: non dipende da params né da searchParams.

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { PageHeader } from '@/components/ui/page-header';
import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { getAllServices } from '@/lib/content-access';

export const metadata: Metadata = {
  title: 'Servizi',
  description:
    'Costruzioni civili, ristrutturazioni di pregio, restauro conservativo, consolidamento strutturale, efficientamento energetico e opere esterne.',
};

export default function ServiziPage() {
  const services = getAllServices();

  return (
    <>
      <PageHeader
        eyebrow="Competenze"
        title="Sei servizi, una sola direzione di cantiere."
        description="Quando un intervento ne richiede più di uno, resta comunque un unico responsabile di commessa: non dovrà coordinare lei le imprese fra loro."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Servizi' }]}
      />

      <Section tone="calce">
        <Container size="wide">
          <div className="space-y-20">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={0.04} y={24}>
                <article
                  className={
                    // Le righe si alternano: immagine a destra sulle dispari.
                    // `lg:[&>*:first-child]:order-2` sposta l'immagine dopo il
                    // testo solo da desktop in su, senza duplicare il markup.
                    index % 2 === 1
                      ? 'grid items-center gap-10 lg:grid-cols-2 lg:gap-16 lg:[&>*:first-child]:order-2'
                      : 'grid items-center gap-10 lg:grid-cols-2 lg:gap-16'
                  }
                >
                  <Link
                    href={`/servizi/${service.slug}`}
                    className="group block overflow-hidden bg-antracite"
                    tabIndex={-1}
                    aria-hidden
                  >
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      width={service.image.width}
                      height={service.image.height}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                    />
                  </Link>

                  <div>
                    <div className="flex items-center gap-4">
                      <Icon name={service.icon} className="size-7 text-ruggine" />
                      <span className="eyebrow text-cemento">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-antracite sm:text-3xl">
                      <Link
                        href={`/servizi/${service.slug}`}
                        className="transition-colors duration-300 hover:text-ruggine"
                      >
                        {service.title}
                      </Link>
                    </h2>

                    <p className="mt-4 text-base leading-relaxed text-ardesia-mid">
                      {service.description[0]}
                    </p>

                    <ul className="mt-7 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature.title}
                          className="flex items-start gap-2 text-sm text-ardesia"
                        >
                          <span
                            className="mt-2 size-1 shrink-0 rounded-full bg-ruggine"
                            aria-hidden
                          />
                          {feature.title}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/servizi/${service.slug}`}
                      className="group mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-antracite transition-colors duration-300 hover:text-ruggine"
                    >
                      Vedi il servizio
                      <ArrowRight
                        className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden
                      />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
