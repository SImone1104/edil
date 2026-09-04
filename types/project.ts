// types/project.ts
// -----------------------------------------------------------------------------
// Modello di dominio dell'impresa edile: schede cantiere (Project) e servizi
// (Service). File di soli tipi: non esporta alcun valore, quindi TypeScript lo
// cancella in fase di build e non pesa un byte sul bundle spedito al browser.
// Le etichette leggibili derivate da questi tipi stanno in lib/taxonomy.ts.
// -----------------------------------------------------------------------------

/* -------------------------------------------------------------------------- */
/* Identificatori                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Slug dei servizi. È un'unione chiusa di stringhe letterali, non `string`:
 * così un refuso in un collegamento fra progetto e servizio diventa un errore
 * di compilazione, invece di un link rotto scoperto in produzione.
 */
export type ServiceSlug =
  | 'costruzioni-civili'
  | 'ristrutturazioni-di-pregio'
  | 'restauro-conservativo'
  | 'consolidamento-strutturale'
  | 'efficientamento-energetico'
  | 'opere-esterne';

/** Slug delle schede cantiere pubblicate. */
export type ProjectSlug =
  | 'palazzo-corio-restauro-facciate'
  | 'cascina-bregonda'
  | 'residenza-ortles-12'
  | 'villa-sul-lario'
  | 'ex-filanda-vittadini'
  | 'scuola-falcone-efficientamento';

/**
 * Le categorie di cantiere coincidono con i servizi offerti: l'impresa
 * classifica i lavori esattamente con le prestazioni che vende. Un alias, al
 * posto di una seconda unione duplicata, impedisce che le due liste divergano.
 */
export type ProjectCategory = ServiceSlug;

/* -------------------------------------------------------------------------- */
/* Primitive condivise                                                        */
/* -------------------------------------------------------------------------- */

/** Anno a quattro cifre. */
export type Year = number;

/**
 * Asset immagine pensato per `next/image`.
 * `width` e `height` sono obbligatori: servono a Next per riservare lo spazio
 * in layout ed evitare il Cumulative Layout Shift senza ricorrere a `fill`.
 */
export interface ImageAsset {
  readonly src: string;
  /** Testo alternativo descrittivo. Mai vuoto, mai "immagine di...". */
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  /** Credito fotografico, mostrato in overlay nella gallery. */
  readonly credit?: string;
}

/**
 * Sorgente dell'hero: fotografia oppure ripresa aerea con drone.
 *
 * È un'unione discriminata sul campo `kind`: dentro un `if (media.kind ===
 * 'video')` TypeScript sa che esistono `src` e `poster`, e segnala un errore
 * se dimentichiamo di gestire uno dei due casi. È l'equivalente tipizzato del
 * pattern che in Angular risolveresti con un `ngSwitch` su un campo `type`.
 */
export type HeroMedia =
  | { readonly kind: 'image'; readonly image: ImageAsset }
  | {
      readonly kind: 'video';
      /** MP4 / H.264: il formato con la compatibilità più ampia. */
      readonly src: string;
      /** Sorgente WebM opzionale, più leggera dove è supportata. */
      readonly srcWebm?: string;
      /**
       * Fotogramma mostrato immediatamente, prima che il video sia pronto.
       * È l'elemento LCP della home: dev'essere un'immagine ottimizzata da
       * next/image, non un frame estratto dal video a runtime.
       */
      readonly poster: ImageAsset;
      /** Durata in secondi: serve a decidere se vale la pena precaricarlo. */
      readonly durationSeconds: number;
      /** Descrizione della ripresa, letta dagli screen reader. */
      readonly description: string;
    };

/** Coordinate geografiche, usate anche nel JSON-LD. */
export interface GeoPoint {
  readonly lat: number;
  readonly lng: number;
}

/** Localizzazione del cantiere. */
export interface Location {
  readonly city: string;
  /** Sigla della provincia italiana, es. "MB". */
  readonly province: string;
  readonly region: string;
  readonly country: 'IT';
  readonly coordinates?: GeoPoint;
}

/**
 * Nomi delle icone lucide-react ammesse nel progetto.
 * Unione chiusa e non `string`: permette di costruire una mappa statica
 * nome → componente, senza import dinamici e senza `any`.
 */
export type IconName =
  | 'HardHat'
  | 'Ruler'
  | 'Building2'
  | 'Hammer'
  | 'Landmark'
  | 'Layers'
  | 'PencilRuler'
  | 'ShieldCheck'
  | 'Wrench'
  | 'Trees'
  | 'Thermometer'
  | 'Compass';

/* -------------------------------------------------------------------------- */
/* Scheda cantiere                                                            */
/* -------------------------------------------------------------------------- */

/** Riga della tabella delle specifiche tecniche. */
export interface ProjectSpec {
  readonly label: string;
  readonly value: string;
  /** Unità separata dal valore, per poterla rendere con stile diverso. */
  readonly unit?: string;
}

/** Fase della commessa, per la timeline verticale della scheda. */
export interface ProjectPhase {
  readonly title: string;
  readonly description: string;
  /** Formato ISO "YYYY-MM": compatto e ordinabile lessicograficamente. */
  readonly period: string;
  readonly completed: boolean;
}

/** Professionista o partner coinvolto nella commessa. */
export interface ProjectCredit {
  readonly role: string;
  readonly name: string;
  readonly url?: string;
}

/**
 * Metriche del cantiere. `budgetLabel` è volutamente una stringa già
 * formattata: molti importi non sono divulgabili e la forma in cui si possono
 * comunicare dipende dagli accordi col committente.
 */
export interface ProjectMetrics {
  readonly surfaceSqm?: number;
  readonly durationMonths?: number;
  readonly floors?: number;
  readonly budgetLabel?: string;
}

/** Confronto prima/dopo: decisivo nel restauro e nelle ristrutturazioni. */
export interface BeforeAfterPair {
  readonly before: ImageAsset;
  readonly after: ImageAsset;
  readonly caption: string;
}

/** Testimonianza del committente, sempre riferita a una commessa. */
export interface ProjectTestimonial {
  readonly quote: string;
  readonly author: string;
  readonly role?: string;
}

export type ProjectStatus = 'in-progettazione' | 'in-corso' | 'completato';

/** Determina obblighi documentali e taglio comunicativo della scheda. */
export type ClientType = 'privato' | 'pubblico' | 'impresa' | 'ente-religioso';

/** Destinazione d'uso dell'immobile. */
export type BuildingUse =
  | 'residenziale'
  | 'commerciale'
  | 'direzionale'
  | 'industriale'
  | 'ricettivo'
  | 'pubblico'
  | 'culto';

/** Scheda cantiere completa. */
export interface Project {
  readonly slug: ProjectSlug;
  /** Titolo breve, usato in card e breadcrumb. */
  readonly title: string;
  /** Una riga: che cosa è stato fatto, senza aggettivi. */
  readonly summary: string;
  /** Descrizione estesa. Array di paragrafi, per non mettere HTML nei dati. */
  readonly description: readonly string[];

  readonly category: ProjectCategory;
  readonly status: ProjectStatus;
  readonly use: BuildingUse;
  readonly clientType: ClientType;
  /** Omesso quando è coperto da riservatezza. */
  readonly client?: string;

  readonly location: Location;
  readonly yearStart: Year;
  /** Assente finché la commessa non è conclusa. */
  readonly yearEnd?: Year;

  readonly metrics: ProjectMetrics;
  readonly specs: readonly ProjectSpec[];
  readonly phases?: readonly ProjectPhase[];
  readonly credits?: readonly ProjectCredit[];
  readonly testimonial?: ProjectTestimonial;

  /** Immagine di apertura: card, hero della scheda e anteprima OpenGraph. */
  readonly cover: ImageAsset;
  readonly gallery: readonly ImageAsset[];
  readonly beforeAfter?: readonly BeforeAfterPair[];

  /** Tecniche e materiali impiegati; alimenta anche i filtri secondari. */
  readonly techniques: readonly string[];
  /** Servizi impiegati: collega la scheda alle pagine servizio. */
  readonly relatedServices: readonly ServiceSlug[];

  /** In evidenza in home. */
  readonly featured: boolean;
  /** Ordine manuale crescente; a parità, si ordina per anno decrescente. */
  readonly order?: number;
  readonly seo?: SeoOverrides;
}

/**
 * Proiezione leggera per card e liste.
 * Le card ricevono solo ciò che mostrano: gallery, fasi e crediti non finiscono
 * nel payload delle pagine che mostrano soltanto anteprime.
 */
export type ProjectSummary = Pick<
  Project,
  | 'slug'
  | 'title'
  | 'summary'
  | 'category'
  | 'status'
  | 'location'
  | 'yearStart'
  | 'yearEnd'
  | 'cover'
>;

/* -------------------------------------------------------------------------- */
/* Servizi                                                                    */
/* -------------------------------------------------------------------------- */

/** Punto elencato nella pagina servizio: che cosa comprende la prestazione. */
export interface ServiceFeature {
  readonly title: string;
  readonly description: string;
  readonly icon?: IconName;
}

export interface ServiceFaq {
  readonly question: string;
  readonly answer: string;
}

/** Step del metodo di lavoro, riusato nella process timeline. */
export interface ServiceStep {
  readonly title: string;
  readonly description: string;
}

export interface Service {
  readonly slug: ServiceSlug;
  readonly title: string;
  /** Claim di una riga per la card in griglia. */
  readonly tagline: string;
  readonly description: readonly string[];
  readonly icon: IconName;

  readonly features: readonly ServiceFeature[];
  readonly process?: readonly ServiceStep[];
  readonly faq?: readonly ServiceFaq[];

  readonly image: ImageAsset;
  /** Categorie da cui pescare i cantieri correlati. */
  readonly relatedCategories: readonly ProjectCategory[];

  readonly featured: boolean;
  readonly order: number;
  readonly seo?: SeoOverrides;
}

export type ServiceSummary = Pick<
  Service,
  'slug' | 'title' | 'tagline' | 'icon' | 'order'
>;

/* -------------------------------------------------------------------------- */
/* Azienda e SEO                                                              */
/* -------------------------------------------------------------------------- */

/** Certificazione o attestazione: SOA, ISO, albo dei restauratori. */
export interface Certification {
  readonly code: string;
  readonly title: string;
  readonly issuer: string;
  readonly issuedAt: Year;
  readonly expiresAt?: Year;
}

/** Numero istituzionale della fascia statistiche. */
export interface CompanyStat {
  readonly value: number;
  readonly suffix?: string;
  readonly label: string;
}

/** Membro del team mostrato in "Chi siamo". */
export interface TeamMember {
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  readonly photo?: ImageAsset;
}

/** Override dei metadati generati da lib/seo.ts. */
export interface SeoOverrides {
  readonly title?: string;
  readonly description?: string;
  readonly ogImage?: ImageAsset;
  readonly noIndex?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Filtri archivio                                                            */
/* -------------------------------------------------------------------------- */

/** Stato dei filtri dell'archivio, letto dai searchParams dell'URL. */
export interface ProjectFilters {
  readonly category?: ProjectCategory;
  readonly status?: ProjectStatus;
  readonly use?: BuildingUse;
  readonly query?: string;
}

export type ProjectSortKey = 'recenti' | 'meno-recenti' | 'alfabetico';
