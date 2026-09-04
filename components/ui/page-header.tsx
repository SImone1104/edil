// components/ui/page-header.tsx
// -----------------------------------------------------------------------------
// Testata delle pagine interne. Server Component.
//
// PERCHÉ È SEMPRE SCURA — non è una scelta puramente estetica.
// L'header del sito è `fixed` e in cima alla pagina è trasparente, con logo e
// voci di menu in colore chiaro: è pensato per stare sopra l'hero fotografico
// della home. Su una pagina interna con fondo chiaro quel testo sarebbe
// invisibile fino al primo scroll.
//
// Aprire ogni pagina interna con una fascia antracite risolve il problema alla
// radice, dà al menu un fondo su cui stagliarsi e crea un ritmo riconoscibile:
// ogni pagina comincia allo stesso modo.
// -----------------------------------------------------------------------------

import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';

import { Breadcrumb, type Crumb } from './breadcrumb';

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb: readonly Crumb[];
};

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumb,
}: PageHeaderProps) {
  return (
    <section className="bg-antracite pt-sotto-header pb-16 sm:pb-20">
      <Container size="wide">
        <Breadcrumb items={breadcrumb} />

        <div className="mt-10 max-w-3xl">
          {eyebrow && (
            <Reveal y={10}>
              <p className="eyebrow mb-5 flex items-center gap-3 text-ruggine-bright">
                <span className="inline-block h-px w-8 bg-current" aria-hidden />
                {eyebrow}
              </p>
            </Reveal>
          )}

          <Reveal delay={0.05}>
            <h1 className="font-display text-4xl leading-[1.08] font-semibold tracking-tight text-calce sm:text-5xl lg:text-6xl">
              {title}
            </h1>
          </Reveal>

          {description && (
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-cemento sm:text-lg">
                {description}
              </p>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
