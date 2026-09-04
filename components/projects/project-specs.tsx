// components/projects/project-specs.tsx
// Server Component.

import type { ProjectSpec } from '@/types/project';

type ProjectSpecsProps = {
  specs: readonly ProjectSpec[];
};

/**
 * Tabella delle specifiche tecniche.
 *
 * È marcata come <dl> (lista di definizioni) e non come <table>: i dati sono
 * coppie etichetta/valore, non una griglia con righe e colonne correlate. Uno
 * screen reader annuncia così "Superficie di facciata, 1.850 metri quadri",
 * cioè la relazione reale fra i due campi.
 */
export function ProjectSpecs({ specs }: ProjectSpecsProps) {
  return (
    <dl className="divide-y divide-cemento/40 border-y border-cemento/40">
      {specs.map((spec) => (
        <div key={spec.label} className="flex flex-wrap justify-between gap-4 py-4">
          <dt className="text-sm text-ardesia-mid">{spec.label}</dt>
          <dd className="text-right text-sm font-medium text-antracite">
            {spec.value}
            {spec.unit && <span className="ml-1 text-pietra">{spec.unit}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
