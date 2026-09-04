// app/progetti/loading.tsx
// -----------------------------------------------------------------------------
// Stato di caricamento dell'archivio.
//
// /progetti è l'unica rotta dinamica del sito: viene renderizzata a ogni
// richiesta perché legge i searchParams. Questo file viene mostrato mentre il
// server prepara la risposta, così cambiando filtro la pagina non resta ferma
// senza dare segnale.
//
// Basta creare il file: Next lo avvolge automaticamente in un <Suspense>
// attorno al segmento di rotta.
// -----------------------------------------------------------------------------

import { Container } from '@/components/ui/container';

/** Rettangolo grigio pulsante, usato come segnaposto. */
function Skeleton({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse bg-cemento/30 motion-reduce:animate-none ${className}`}
    />
  );
}

export default function LoadingProgetti() {
  return (
    <>
      <section className="bg-antracite pt-sotto-header pb-16 sm:pb-20">
        <Container size="wide">
          <div className="h-3 w-40 animate-pulse bg-white/10 motion-reduce:animate-none" />
          <div className="mt-10 h-12 w-full max-w-2xl animate-pulse bg-white/10 motion-reduce:animate-none" />
          <div className="mt-4 h-12 w-full max-w-md animate-pulse bg-white/10 motion-reduce:animate-none" />
        </Container>
      </section>

      <section className="bg-calce-warm py-20 sm:py-28">
        <Container size="wide">
          {/* `aria-busy` e il testo per soli screen reader comunicano lo stato
              a chi non vede i segnaposto animati. */}
          <div aria-busy="true" aria-live="polite">
            <span className="sr-only">Caricamento dei cantieri in corso</span>

            <div className="flex flex-wrap gap-2 border-b border-cemento/40 pb-10">
              {Array.from({ length: 7 }, (_, index) => (
                <Skeleton key={index} className="h-9 w-32" />
              ))}
            </div>

            <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, index) => (
                <div key={index}>
                  <Skeleton className="aspect-[4/3] w-full" />
                  <Skeleton className="mt-5 h-3 w-24" />
                  <Skeleton className="mt-3 h-5 w-48" />
                  <Skeleton className="mt-3 h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
