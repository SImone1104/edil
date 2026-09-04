// components/ui/icon.tsx
// -----------------------------------------------------------------------------
// Mappa statica IconName → componente lucide-react.
//
// Perché una mappa e non un import dinamico: `IconName` è un'unione chiusa
// (types/project.ts), quindi possiamo elencare qui tutte le icone effettivamente
// usate. Il bundler include solo queste dodici, non l'intera libreria, e
// `satisfies Record<IconName, LucideIcon>` garantisce che aggiungendo un nome
// all'unione senza registrarlo qui il progetto non compili.
// -----------------------------------------------------------------------------

import {
  Building2,
  Compass,
  Hammer,
  HardHat,
  Landmark,
  Layers,
  PencilRuler,
  Ruler,
  ShieldCheck,
  Thermometer,
  Trees,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

import type { IconName } from '@/types/project';

const ICONS = {
  Building2,
  Compass,
  Hammer,
  HardHat,
  Landmark,
  Layers,
  PencilRuler,
  Ruler,
  ShieldCheck,
  Thermometer,
  Trees,
  Wrench,
} satisfies Record<IconName, LucideIcon>;

type IconProps = {
  name: IconName;
  className?: string;
};

/** Rende l'icona corrispondente al nome, senza `any` e senza import dinamici. */
export function Icon({ name, className }: IconProps) {
  const Component = ICONS[name];
  return <Component className={className} aria-hidden strokeWidth={1.5} />;
}
