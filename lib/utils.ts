// lib/utils.ts

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Compone classi CSS condizionali.
 *
 * `clsx` risolve condizioni e array (`cn('p-4', isActive && 'bg-slate-900')`),
 * `twMerge` risolve i conflitti fra utility Tailwind tenendo l'ultima: senza di
 * lui `cn('p-2', 'p-8')` lascerebbe entrambe le classi nel markup e il risultato
 * dipenderebbe dall'ordine nel foglio di stile generato.
 *
 * È l'equivalente di [ngClass] di Angular, ma calcolato in JavaScript e quindi
 * utilizzabile anche nei Server Component.
 */
export function cn(...inputs: readonly ClassValue[]): string {
  return twMerge(clsx(inputs));
}
