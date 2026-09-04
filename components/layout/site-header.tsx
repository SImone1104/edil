// components/layout/site-header.tsx
// -----------------------------------------------------------------------------
// SERVER COMPONENT. Nota che non c'è 'use client' in cima.
//
// Il logo, le voci di menu e il numero di telefono sono HTML statico: non c'è
// motivo di spedire al browser il codice che li genera. Le uniche due parti
// interattive — il cambio di aspetto allo scroll e il menu mobile — sono
// isolate in due Client Component separati.
// -----------------------------------------------------------------------------

import Link from 'next/link';
import { Phone } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { siteConfig } from '@/lib/site-config';

import { HeaderShell } from './header-shell';
import { MobileNav } from './mobile-nav';

export function SiteHeader() {
  return (
    <HeaderShell>
      <Container size="wide">
        <div className="flex items-center justify-between gap-8">
          <Link
            href="/"
            className="group flex items-baseline gap-2.5"
            aria-label={`${siteConfig.name} — vai alla home`}
          >
            <span className="font-display text-lg font-semibold tracking-tight text-calce">
              {siteConfig.name.split(' ')[0]}
            </span>
            <span className="font-display text-lg font-light tracking-tight text-cemento transition-colors duration-300 group-hover:text-ruggine-bright">
              {siteConfig.name.split(' ').slice(1).join(' ')}
            </span>
          </Link>

          <nav className="hidden items-center gap-10 lg:flex" aria-label="Navigazione principale">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                // Il sottolineato che cresce da sinistra è fatto con uno
                // pseudo-elemento in CSS puro: nessun JavaScript coinvolto.
                className="group relative py-1 text-sm font-medium text-cemento-light transition-colors duration-300 hover:text-calce"
              >
                {item.label}
                <span
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-ruggine-bright transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  aria-hidden
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${siteConfig.contacts.phoneHref}`}
              className="hidden items-center gap-2.5 border border-white/20 px-5 py-2.5 text-sm font-medium text-calce transition-colors duration-300 hover:border-ruggine hover:bg-ruggine lg:inline-flex"
            >
              <Phone className="size-4" strokeWidth={1.5} aria-hidden />
              {siteConfig.contacts.phone}
            </a>

            <MobileNav />
          </div>
        </div>
      </Container>
    </HeaderShell>
  );
}
