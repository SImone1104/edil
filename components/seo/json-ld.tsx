// components/seo/json-ld.tsx
// Server Component.

import type { JsonLd } from '@/lib/seo';

type JsonLdScriptProps = {
  data: JsonLd;
};

/**
 * Inserisce un blocco di dati strutturati nella pagina.
 *
 * `dangerouslySetInnerHTML` è necessario perché il contenuto dev'essere JSON
 * grezzo dentro il tag <script>, e React altrimenti lo scriverebbe come testo
 * con i caratteri già convertiti in entità HTML, rendendolo illeggibile ai
 * crawler. Il nome dell'attributo è volutamente allarmante: qui è sicuro
 * perché serializziamo noi un oggetto costruito in casa, mai input dell'utente.
 *
 * La sostituzione di "<" impedisce che una stringa contenente "</script>"
 * chiuda il tag in anticipo.
 */
export function JsonLdScript({ data }: JsonLdScriptProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
