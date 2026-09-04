'use client';

// app/error.tsx
// -----------------------------------------------------------------------------
// Confine di errore dell'App Router.
//
// DEVE essere un Client Component: React cattura l'errore durante il render e
// deve poter ritentare nel browser. È il corrispettivo di un ErrorHandler
// Angular, ma circoscritto a questo ramo dell'albero invece che globale.
//
// `reset()` ritenta il render del segmento fallito senza ricaricare la pagina.
// -----------------------------------------------------------------------------

import { useEffect } from 'react';
import Link from 'next/link';

import { Container } from '@/components/ui/container';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // In produzione qui andrebbe l'invio a un servizio di monitoraggio.
    // La console resta il minimo indispensabile per non perdere l'errore.
    console.error(error);
  }, [error]);

  return (
    <section className="flex h-hero-xs items-center bg-antracite py-32">
      <Container size="wide">
        <p className="eyebrow flex items-center gap-3 text-ruggine-bright">
          <span className="inline-block h-px w-10 bg-current" aria-hidden />
          Errore imprevisto
        </p>

        <h1 className="mt-8 max-w-3xl font-display text-4xl leading-[1.08] font-semibold tracking-tight text-calce sm:text-5xl">
          Qualcosa non ha funzionato.
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-cemento">
          Può riprovare subito. Se il problema si ripete, ci scriva o ci telefoni: il
          contenuto che cercava esiste, il guasto è nostro.
        </p>

        {/* Il digest è l'identificativo che Next assegna all'errore lato
            server: è l'unico dato utile da comunicare, e non espone lo stack. */}
        {error.digest && (
          <p className="mt-4 text-xs text-cemento/60">
            Codice di riferimento: <span className="tabular-nums">{error.digest}</span>
          </p>
        )}

        <div className="mt-10 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2.5 bg-calce px-6 py-3.5 text-sm font-medium text-antracite transition-colors duration-300 hover:bg-ruggine hover:text-calce"
          >
            Riprova
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2.5 border border-white/25 px-6 py-3.5 text-sm font-medium text-calce transition-colors duration-300 hover:border-calce hover:bg-calce hover:text-antracite"
          >
            Torna alla home
          </Link>
        </div>
      </Container>
    </section>
  );
}
