// content/company.ts
// -----------------------------------------------------------------------------
// Contenuti istituzionali: hero della home, numeri, certificazioni, squadra.
// Dati fittizi, coerenti con il profilo di un'impresa edile lombarda di
// medie dimensioni.
// -----------------------------------------------------------------------------

import { unsplash } from '@/lib/media';
import type {
  Certification,
  CompanyStat,
  HeroMedia,
  TeamMember,
} from '@/types/project';

/**
 * Media dell'hero della home: ripresa aerea con drone.
 *
 * Il file è servito dalla cartella `public/`, non da un CDN esterno: un video
 * hotlinkato da un servizio terzo può essere spostato, limitato o rimosso, e
 * l'hero è l'elemento su cui non ci si può permettere un buco.
 *
 * `poster` è ciò che l'utente vede nei primi istanti ed è quindi l'elemento
 * LCP della pagina: viene servito da next/image e deve essere leggero.
 * In produzione, sostituirlo con un fotogramma reale estratto dal video:
 *   ffmpeg -i public/video/cantiere-drone.mp4 -vf "select=eq(n\,0)" -q:v 3 \
 *          public/images/hero-poster.jpg
 *
 * Due file per due contesti: 1280x720 su desktop, 640x360 su schermi stretti.
 * Su un telefono la seconda è indistinguibile dalla prima, ma pesa un quinto.
 */
export const heroMedia: HeroMedia = {
  kind: 'video',
  src: '/video/cantiere-drone.mp4',
  srcMobile: '/video/cantiere-drone-mobile.mp4',
  poster: unsplash(
    'photo-1517089152318-42ec560349c0',
    'Veduta dall’alto di un cantiere con mezzi movimento terra al lavoro',
    'wide',
  ),
  durationSeconds: 21,
  description:
    'Ripresa aerea di un cantiere edile: gru a torre, solai in costruzione e mezzi al lavoro.',
};

/** Numeri istituzionali della fascia statistiche in home. */
export const companyStats: readonly CompanyStat[] = [
  { value: 47, suffix: '', label: 'Anni di attività' },
  { value: 310, suffix: '+', label: 'Cantieri consegnati' },
  { value: 62, suffix: '', label: 'Persone in organico' },
  { value: 98, suffix: '%', label: 'Consegne nei tempi contrattuali' },
];

/** Attestazioni e certificazioni dell'impresa. */
export const certifications: readonly Certification[] = [
  {
    code: 'SOA OG1 – IV bis',
    title: 'Edifici civili e industriali',
    issuer: 'Attestazione SOA',
    issuedAt: 2022,
    expiresAt: 2027,
  },
  {
    code: 'SOA OG2 – III',
    title: 'Restauro e manutenzione di beni tutelati',
    issuer: 'Attestazione SOA',
    issuedAt: 2022,
    expiresAt: 2027,
  },
  {
    code: 'ISO 9001:2015',
    title: 'Sistema di gestione per la qualità',
    issuer: 'Ente di certificazione accreditato',
    issuedAt: 2019,
    expiresAt: 2028,
  },
  {
    code: 'ISO 45001:2018',
    title: 'Salute e sicurezza sul lavoro',
    issuer: 'Ente di certificazione accreditato',
    issuedAt: 2021,
    expiresAt: 2027,
  },
];

/** Paragrafi della pagina "Impresa". */
export const companyStory: readonly string[] = [
  'Ferrante Costruzioni nasce a Monza nel 1978 come impresa di opere murarie. Nei primi vent’anni cresce lavorando come subappaltatore per imprese generali del milanese; dal 1999, con il passaggio alla seconda generazione, assume direttamente il ruolo di impresa generale e struttura un ufficio tecnico interno.',
  'Oggi contiamo sessantadue persone, di cui undici tecnici e cinquantuno maestranze dirette. La scelta di mantenere le squadre in organico, invece di affidarsi interamente al subappalto, è quello che ci permette di garantire continuità di qualità fra un cantiere e l’altro.',
  'Lavoriamo prevalentemente fra Milano, Monza e Brianza, Como e Bergamo. Accettiamo commesse fuori da quest’area soltanto quando la dimensione dell’intervento giustifica il presidio stabile di un capocantiere sul posto: la sorveglianza a distanza non funziona.',
];

/** Referenti mostrati nella pagina "Impresa". */
export const team: readonly TeamMember[] = [
  {
    name: 'Giulia Ferrante',
    role: 'Amministratore delegato',
    bio: 'Terza generazione in azienda, si occupa di sviluppo commerciale e rapporti con la committenza pubblica.',
    photo: unsplash(
      'photo-1600880292203-757bb62b4baf',
      'Ritratto informale durante un confronto tecnico in cantiere',
      'portrait',
    ),
  },
  {
    name: 'Stefano Brambilla',
    role: 'Direttore tecnico',
    bio: 'Ingegnere strutturista, in impresa dal 2005. Coordina l’ufficio tecnico e le commesse di consolidamento.',
  },
  {
    name: 'Nadia Currò',
    role: 'Responsabile restauro',
    bio: 'Restauratrice iscritta all’elenco ministeriale, segue le commesse su immobili tutelati e i rapporti con le Soprintendenze.',
  },
  {
    name: 'Luca Ferrante',
    role: 'Responsabile di cantiere',
    bio: 'Trent’anni di cantiere, presidia l’avanzamento quotidiano e la sicurezza operativa.',
  },
];
