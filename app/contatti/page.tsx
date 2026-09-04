// app/contatti/page.tsx
// -----------------------------------------------------------------------------
// Server Component statico.
//
// NESSUN FORM, ed è una scelta esplicita del progetto: il sito non ha backend,
// quindi un modulo dovrebbe appoggiarsi a un servizio di terze parti. Per
// un'impresa edile i recapiti diretti convertono meglio: chi ha un cantiere da
// far partire telefona. Ogni recapito è un link nativo (tel:, mailto:), quindi
// funziona anche senza JavaScript e apre l'app giusta su mobile.
// -----------------------------------------------------------------------------

import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Contatti',
  description:
    'Ferrante Costruzioni, via dell’Artigianato 14, Monza. Telefono, email e orari. Il primo sopralluogo è gratuito e senza impegno.',
};

/** Cosa succede dopo il primo contatto: toglie l'ansia di "e adesso?". */
const NEXT_STEPS = [
  {
    title: 'Prima chiamata',
    description:
      'Dieci minuti per capire di che intervento si tratta e se rientra nelle nostre competenze. Se non lo è, lo diciamo subito.',
  },
  {
    title: 'Sopralluogo',
    description:
      'Gratuito e senza impegno. Veniamo con un tecnico e rileviamo lo stato di fatto.',
  },
  {
    title: 'Preventivo',
    description:
      'Computo metrico voce per voce, entro dieci giorni lavorativi dal sopralluogo. Nessun forfait opaco.',
  },
] as const;

export default function ContattiPage() {
  const { contacts, legal } = siteConfig;
  const { address } = contacts;

  // Query per aprire l'indirizzo nell'app mappe del dispositivo.
  const mapsQuery = encodeURIComponent(
    `${address.street}, ${address.zip} ${address.city} ${address.province}`,
  );

  return (
    <>
      <PageHeader
        eyebrow="Contatti"
        title="Ci parli del suo intervento."
        description="Il primo sopralluogo è gratuito e senza impegno. Rispondiamo entro la giornata lavorativa."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Contatti' }]}
      />

      <Section tone="bianco">
        <Container size="wide">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Recapiti.
                `min-w-0`: una colonna di griglia ha per default
                `min-width: auto`, cioè non si restringe sotto la larghezza del
                proprio contenuto. Con dentro un'email lunga e non spezzabile,
                la colonna allarga la pagina e provoca lo scorrimento
                orizzontale. È la causa più frequente di overflow su mobile. */}
            <div className="min-w-0">
              <Reveal>
                <p className="eyebrow mb-8 text-pietra">Recapiti diretti</p>
              </Reveal>

              <div className="space-y-4">
                <Reveal delay={0.04}>
                  <a
                    href={`tel:${contacts.phoneHref}`}
                    className="group flex items-center gap-5 border border-cemento px-7 py-6 transition-colors duration-300 hover:border-antracite hover:bg-antracite"
                  >
                    <Phone
                      className="size-5 shrink-0 text-ruggine transition-colors group-hover:text-ruggine-bright"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <span>
                      <span className="block text-xs text-pietra">Telefono</span>
                      <span className="block font-display text-xl font-medium tracking-tight text-antracite transition-colors group-hover:text-calce">
                        {contacts.phone}
                      </span>
                    </span>
                  </a>
                </Reveal>

                <Reveal delay={0.1}>
                  <a
                    href={`mailto:${contacts.email}`}
                    className="group flex items-center gap-5 border border-cemento px-7 py-6 transition-colors duration-300 hover:border-antracite hover:bg-antracite"
                  >
                    <Mail
                      className="size-5 shrink-0 text-ruggine transition-colors group-hover:text-ruggine-bright"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <span className="min-w-0">
                      <span className="block text-xs text-pietra">Email</span>
                      {/* `break-all` invece di `truncate`: un indirizzo email
                          troncato con i puntini è inutile: meglio mandarlo a
                          capo, anche a costo di spezzarlo. */}
                      <span className="block break-all font-display text-lg font-medium tracking-tight text-antracite transition-colors group-hover:text-calce sm:text-xl">
                        {contacts.email}
                      </span>
                    </span>
                  </a>
                </Reveal>
              </div>

              <Reveal delay={0.16}>
                <div className="mt-10 space-y-6 border-t border-cemento/40 pt-8">
                  <div className="flex items-start gap-4">
                    <MapPin
                      className="mt-0.5 size-5 shrink-0 text-pietra"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-pietra">
                        Sede operativa
                      </p>
                      <address className="mt-2 text-sm not-italic leading-relaxed text-ardesia">
                        {address.street}
                        <br />
                        {address.zip} {address.city} ({address.province})
                        <br />
                        {address.country}
                      </address>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                        target="_blank"
                        // `noopener` impedisce alla pagina aperta di manipolare
                        // la nostra tramite window.opener: va sempre messo sui
                        // link esterni con target="_blank".
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-xs font-medium text-ruggine transition-colors duration-300 hover:text-antracite"
                      >
                        Apri nelle mappe →
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock
                      className="mt-0.5 size-5 shrink-0 text-pietra"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-pietra">
                        Orari
                      </p>
                      <p className="mt-2 text-sm text-ardesia">{contacts.openingHours}</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-10 border-t border-cemento/40 pt-8 text-xs leading-relaxed text-pietra">
                  <p>{siteConfig.legalName}</p>
                  <p className="mt-1">
                    {legal.vat} · {legal.ren}
                  </p>
                  <p className="mt-1">{legal.capital}</p>
                </div>
              </Reveal>
            </div>

            {/* Cosa succede dopo */}
            <div className="min-w-0">
              <Reveal delay={0.08}>
                <p className="eyebrow mb-8 text-pietra">Come procediamo</p>
              </Reveal>

              <ol className="space-y-10">
                {NEXT_STEPS.map((step, index) => (
                  <Reveal key={step.title} delay={0.12 + index * 0.07} y={18}>
                    <li className="flex gap-6 border-t border-cemento/40 pt-6">
                      <span className="font-display text-2xl font-light text-ruggine">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h2 className="font-display text-lg font-medium tracking-tight text-antracite">
                          {step.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-ardesia-mid">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>

              <Reveal delay={0.34}>
                <div className="mt-12 bg-calce p-8">
                  <p className="text-sm leading-relaxed text-ardesia">
                    Per gare d’appalto e richieste di qualificazione scriva a{' '}
                    <a
                      href={`mailto:${contacts.email}`}
                      className="font-medium break-all text-ruggine underline underline-offset-4 transition-colors hover:text-antracite"
                    >
                      {contacts.email}
                    </a>{' '}
                    allegando la documentazione di gara: le attestazioni SOA e il
                    fascicolo aziendale sono pronti all’invio.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="antracite" size="compact">
        <Container size="wide">
          <SectionHeading
            eyebrow="Area operativa"
            title="Dove lavoriamo."
            description="Milano, Monza e Brianza, Como e Bergamo. Fuori da quest’area accettiamo commesse solo quando la dimensione dell’intervento giustifica un capocantiere stabile sul posto: la sorveglianza a distanza non funziona."
            tone="chiaro"
          />
        </Container>
      </Section>
    </>
  );
}
