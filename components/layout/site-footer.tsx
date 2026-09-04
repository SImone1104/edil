// components/layout/site-footer.tsx
// Server Component.

import Link from 'next/link';

import { Container } from '@/components/ui/container';
import { certifications } from '@/content/company';
import { siteConfig } from '@/lib/site-config';

export function SiteFooter() {
  const { address } = siteConfig.contacts;

  return (
    <footer className="bg-antracite text-cemento">
      <Container size="wide" className="py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-semibold tracking-tight text-calce">
              {siteConfig.name}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">{siteConfig.description}</p>
          </div>

          <nav aria-label="Navigazione a piè di pagina">
            <p className="eyebrow mb-5 text-cemento/60">Naviga</p>
            <ul className="space-y-3 text-sm">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors duration-300 hover:text-calce"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-5 text-cemento/60">Sede</p>
            <address className="space-y-1 text-sm not-italic leading-relaxed">
              <span className="block">{address.street}</span>
              <span className="block">
                {address.zip} {address.city} ({address.province})
              </span>
              <a
                href={`tel:${siteConfig.contacts.phoneHref}`}
                className="mt-3 block transition-colors duration-300 hover:text-calce"
              >
                {siteConfig.contacts.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contacts.email}`}
                className="block transition-colors duration-300 hover:text-calce"
              >
                {siteConfig.contacts.email}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-cemento/70">
            {certifications.map((certification) => (
              <li key={certification.code}>
                <span className="text-calce/90">{certification.code}</span>{' '}
                — {certification.title}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap justify-between gap-4 text-xs text-cemento/60">
            <p>
              © {new Date().getFullYear()} {siteConfig.legalName} · P.IVA{' '}
              {siteConfig.legal.vat}
            </p>
            <p>Sito dimostrativo — contenuti e riferimenti sono fittizi.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
