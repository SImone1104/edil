'use client';

// components/layout/header-shell.tsx
// -----------------------------------------------------------------------------
// Involucro client dell'header: osserva lo scroll e cambia aspetto.
//
// PATTERN DA CAPIRE — "children as slot".
// Questo componente è client, ma i link del menu NON lo sono: arrivano già
// renderizzati dal Server Component padre e vengono passati come `children`.
// React li tratta come contenuto opaco da inserire nel buco, senza doverne
// spedire il codice al browser.
//
// Se invece avessimo messo 'use client' su site-header.tsx, tutto l'albero
// sottostante — link, logo, configurazione — sarebbe finito nel bundle. La
// regola pratica: rendi client il pezzo più piccolo che ha davvero bisogno del
// browser, e fagli ricevere il resto come children.
// -----------------------------------------------------------------------------

import { useEffect, useState, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

type HeaderShellProps = {
  children: ReactNode;
};

export function HeaderShell({ children }: HeaderShellProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 24);
    };

    // Chiamata immediata: al reload a metà pagina lo stato dev'essere già
    // corretto, senza aspettare il primo evento di scroll.
    handleScroll();

    // `passive: true` dice al browser che non chiameremo preventDefault:
    // gli permette di non bloccare lo scroll in attesa del nostro handler.
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      /* La pagina si estende sotto il notch (viewport-fit=cover in
         app/layout.tsx): senza questo margine il logo finirebbe nascosto
         dietro la barra di stato dell'iPhone.

         Il padding superiore è calcolato, non impostato: `calc()` SOMMA
         l'area riservata alla spaziatura di design. Scriverlo come semplice
         `paddingTop: env(...)` azzererebbe la spaziatura, perché lo stile
         inline ha la precedenza sulla classe Tailwind. Su un dispositivo
         senza notch `env()` vale 0 e resta solo la spaziatura di design. */
      style={{
        paddingTop: `calc(env(safe-area-inset-top) + ${isScrolled ? '0.75rem' : '1.5rem'})`,
      }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        isScrolled
          ? 'border-b border-white/10 bg-antracite/90 pb-3 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent pb-6',
      )}
    >
      {children}
    </header>
  );
}
