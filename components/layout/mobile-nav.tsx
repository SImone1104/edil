'use client';

// components/layout/mobile-nav.tsx
// -----------------------------------------------------------------------------
// Menu a scomparsa per schermi piccoli. Client Component: apre, chiude, blocca
// lo scroll e reagisce al tasto Esc.
// -----------------------------------------------------------------------------

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();

  /**
   * Invece di un booleano `isOpen` più un effect che lo azzera quando cambia
   * rotta, memorizziamo la rotta su cui il menu è stato aperto e la
   * confrontiamo durante il render.
   *
   * Il risultato è che alla navigazione il menu si chiude da solo, senza
   * effect e senza il render a cascata che un `setState` dentro `useEffect`
   * provocherebbe. È il principio di "derivare lo stato invece di
   * sincronizzarlo": la stessa ragione per cui in Angular un `computed()` è
   * preferibile a un campo aggiornato a mano in ngOnChanges.
   */
  const [openedOnPath, setOpenedOnPath] = useState<string | null>(null);
  const isOpen = openedOnPath === pathname;

  const close = (): void => setOpenedOnPath(null);

  /**
   * Rileva se siamo nel browser, per poter usare createPortal.
   * `useSyncExternalStore` con una sottoscrizione vuota è il modo pulito di
   * farlo: restituisce false durante il render sul server e true dopo
   * l'idratazione, senza il `setState` dentro `useEffect` che provocherebbe un
   * render a cascata.
   */
  const isMounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  // Blocca lo scroll della pagina sottostante e gestisce Esc mentre è aperto.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setOpenedOnPath(null);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpenedOnPath(pathname)}
        className="p-2 text-calce transition-colors hover:text-ruggine-bright lg:hidden"
        aria-label="Apri il menu di navigazione"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
      >
        <Menu className="size-6" strokeWidth={1.5} aria-hidden />
      </button>

      {/* PORTAL — non è un vezzo, risolve un bug preciso.
          Questo componente vive dentro l'<header>, che quando la pagina è
          scrollata riceve `backdrop-blur`. Un `backdrop-filter` su un antenato
          crea un nuovo blocco contenitore per i discendenti `position: fixed`:
          da quel momento `inset-0` non si riferisce più alla finestra ma alla
          scatola dell'header, alta una sessantina di pixel. Il pannello finiva
          schiacciato lì dentro, apparendo trasparente e non cliccabile.
          Stessa cosa farebbero `filter`, `transform` e `will-change`.
          Montandolo su document.body il pannello esce da quel contesto.

          AnimatePresence permette di animare anche l'USCITA di un elemento:
          senza, React rimuoverebbe il nodo dal DOM istantaneamente e
          l'animazione di chiusura non si vedrebbe. */}
      {isMounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
          <motion.div
            id="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menu di navigazione"
            className="fixed inset-0 z-[60] bg-antracite lg:hidden"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Con viewport-fit=cover la pagina si estende sotto il notch e
                sotto la barra gesti: senza questi margini di sicurezza il
                titolo finirebbe dietro il notch e i recapiti in fondo dietro
                la barra home dell'iPhone. `max()` tiene comunque un margine
                minimo sui dispositivi che non hanno aree riservate. */}
            <div
              className="flex h-full flex-col px-6"
              style={{
                paddingTop: 'max(1.5rem, env(safe-area-inset-top))',
                paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-semibold tracking-tight text-calce">
                  {siteConfig.name}
                </span>
                <button
                  type="button"
                  onClick={close}
                  className="p-2 text-calce transition-colors hover:text-ruggine-bright"
                  aria-label="Chiudi il menu"
                >
                  <X className="size-6" strokeWidth={1.5} aria-hidden />
                </button>
              </div>

              <nav className="mt-16 flex flex-col">
                {siteConfig.nav.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      // Ogni voce entra leggermente dopo la precedente.
                      delay: shouldReduceMotion ? 0 : 0.08 + index * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'block border-b border-white/10 py-5 font-display text-3xl font-medium tracking-tight',
                        'text-calce transition-colors hover:text-ruggine-bright',
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-1 text-sm text-cemento">
                <a
                  href={`tel:${siteConfig.contacts.phoneHref}`}
                  className="block transition-colors hover:text-calce"
                >
                  {siteConfig.contacts.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.contacts.email}`}
                  className="block transition-colors hover:text-calce"
                >
                  {siteConfig.contacts.email}
                </a>
              </div>
            </div>
          </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
