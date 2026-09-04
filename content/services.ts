// content/services.ts
// -----------------------------------------------------------------------------
// I servizi dell'impresa. Dati fittizi ma verosimili, pensati per una demo.
//
// `satisfies readonly Service[]` invece di `: readonly Service[]`:
// il compilatore verifica che ogni voce rispetti il tipo, ma NON allarga il tipo
// dell'array. Così `services[0].slug` resta la stringa letterale
// 'costruzioni-civili' e non il generico ServiceSlug: utile per i controlli
// esaustivi e per generateStaticParams.
// -----------------------------------------------------------------------------

import { unsplash } from '@/lib/media';
import type { Service } from '@/types/project';

export const services = [
  {
    slug: 'costruzioni-civili',
    title: 'Costruzioni civili',
    tagline: 'Edifici residenziali e direzionali realizzati chiavi in mano.',
    description: [
      'Realizziamo edifici residenziali, direzionali e commerciali seguendo la commessa dallo scavo alla consegna delle chiavi. Operiamo come impresa generale: un unico interlocutore risponde della qualità, dei tempi e del rispetto del quadro economico concordato.',
      'Ogni cantiere è gestito con un cronoprogramma aggiornato settimanalmente e condiviso con la committenza. Le lavorazioni specialistiche sono affidate a squadre consolidate, che collaborano con noi da anni e lavorano sotto la nostra direzione tecnica.',
    ],
    icon: 'Building2',
    image: unsplash(
      'photo-1504307651254-35680f356dfd',
      'Operai al lavoro su un ponteggio in un cantiere di nuova costruzione',
      'service',
    ),
    features: [
      {
        title: 'Impresa generale',
        description:
          'Un solo contratto e un solo responsabile di commessa per tutte le lavorazioni, dalle fondazioni alle finiture.',
        icon: 'HardHat',
      },
      {
        title: 'Strutture in c.a. e acciaio',
        description:
          'Getti in opera, prefabbricati e carpenteria metallica, con controlli sui materiali secondo le NTC 2018.',
        icon: 'Layers',
      },
      {
        title: 'Cronoprogramma verificabile',
        description:
          'Diagramma di Gantt aggiornato ogni settimana, con scostamenti dichiarati e non nascosti.',
        icon: 'Ruler',
      },
      {
        title: 'Cantiere pulito e sicuro',
        description:
          'Piano operativo di sicurezza redatto internamente e verificato dal nostro RSPP a ogni fase.',
        icon: 'ShieldCheck',
      },
    ],
    process: [
      {
        title: 'Analisi di fattibilità',
        description:
          'Verifichiamo vincoli urbanistici, accessibilità del lotto e sostenibilità economica prima di formulare l’offerta.',
      },
      {
        title: 'Computo e contratto',
        description:
          'Computo metrico estimativo voce per voce, senza forfait opachi. Le varianti si approvano per iscritto.',
      },
      {
        title: 'Esecuzione',
        description:
          'Direzione di cantiere quotidiana, verbali settimanali e report fotografico a disposizione della committenza.',
      },
      {
        title: 'Collaudo e consegna',
        description:
          'Prove sui materiali, collaudo impianti, fascicolo del fabbricato e dodici mesi di assistenza post consegna.',
      },
    ],
    faq: [
      {
        question: 'Lavorate anche su progetto di altri professionisti?',
        answer:
          'Sì. Nella maggior parte delle commesse il progetto architettonico è di uno studio esterno: noi ci occupiamo dell’esecuzione e della direzione di cantiere, coordinandoci con il progettista e con il direttore dei lavori nominato dalla committenza.',
      },
      {
        question: 'Quanto tempo richiede un edificio residenziale di media dimensione?',
        answer:
          'Per una palazzina di quattro piani in area già urbanizzata i tempi tipici sono di venti-ventotto mesi dallo scavo alla consegna, esclusi i tempi autorizzativi che dipendono dall’amministrazione comunale.',
      },
    ],
    relatedCategories: ['costruzioni-civili'],
    featured: true,
    order: 1,
  },
  {
    slug: 'ristrutturazioni-di-pregio',
    title: 'Ristrutturazioni di pregio',
    tagline: 'Interventi su immobili di valore, con finiture su misura.',
    description: [
      'Interveniamo su appartamenti signorili, ville e immobili storici dove il livello di finitura richiesto non ammette approssimazione. Ogni dettaglio viene campionato e approvato prima della posa definitiva.',
      'Lavoriamo con artigiani selezionati per stucchi, serramenti su misura, parquet posati in opera e superfici in resina o calce. La committenza vede e tocca i campioni prima che una sola lavorazione venga eseguita in via definitiva.',
    ],
    icon: 'Hammer',
    image: unsplash(
      'photo-1600607687939-ce8a6c25118c',
      'Interno residenziale contemporaneo con rivestimenti in legno e grandi vetrate',
      'service',
    ),
    features: [
      {
        title: 'Campionature preventive',
        description:
          'Nessuna finitura viene posata senza un campione approvato dal committente e dal progettista.',
        icon: 'PencilRuler',
      },
      {
        title: 'Artigiani selezionati',
        description:
          'Stuccatori, ebanisti e posatori con cui collaboriamo stabilmente e di cui conosciamo il livello.',
        icon: 'Wrench',
      },
      {
        title: 'Cantieri in edifici abitati',
        description:
          'Orari concordati, protezioni delle parti comuni e pulizia quotidiana quando si lavora in condominio.',
        icon: 'ShieldCheck',
      },
      {
        title: 'Impianti integrati',
        description:
          'Domotica, climatizzazione e illuminotecnica coordinate con le finiture fin dalla fase di tracciamento.',
        icon: 'Layers',
      },
    ],
    process: [
      {
        title: 'Sopralluogo e rilievo',
        description:
          'Rilievo strumentale dello stato di fatto e verifica di impianti, solai e umidità di risalita.',
      },
      {
        title: 'Campionature',
        description:
          'Selezione di materiali e finiture con campioni fisici, prima della stesura del computo definitivo.',
      },
      {
        title: 'Esecuzione per fasi',
        description:
          'Demolizioni, impianti, finiture: ogni fase si chiude con una verifica congiunta prima di aprire la successiva.',
      },
      {
        title: 'Consegna',
        description:
          'Pulizia di fine cantiere, manuale delle manutenzioni e ritocchi entro sessanta giorni dalla consegna.',
      },
    ],
    faq: [
      {
        question: 'È possibile abitare l’immobile durante i lavori?',
        answer:
          'Su interventi parziali sì, organizzando il cantiere per zone e con separazioni antipolvere. Su ristrutturazioni integrali lo sconsigliamo: rallenta i tempi e peggiora il risultato.',
      },
      {
        question: 'Come gestite le varianti in corso d’opera?',
        answer:
          'Ogni variante viene quantificata per iscritto e approvata prima dell’esecuzione. Non emettiamo addebiti per lavorazioni non autorizzate preventivamente.',
      },
    ],
    relatedCategories: ['ristrutturazioni-di-pregio', 'restauro-conservativo'],
    featured: true,
    order: 2,
  },
  {
    slug: 'restauro-conservativo',
    title: 'Restauro conservativo',
    tagline: 'Edifici storici e vincolati, nel rispetto della materia originale.',
    description: [
      'Operiamo su immobili tutelati ai sensi del Codice dei beni culturali, in accordo con le Soprintendenze territorialmente competenti. Il principio guida è la conservazione della materia originale: si consolida e si integra, si sostituisce solo dove il degrado lo impone.',
      'Le nostre squadre di restauro impiegano malte a base di calce naturale, tecniche di pulitura calibrate sul supporto e integrazioni sempre riconoscibili a distanza ravvicinata, secondo il principio della distinguibilità.',
    ],
    icon: 'Landmark',
    image: unsplash(
      'photo-1531834685032-c34bf0d84c77',
      'Ponteggio di servizio montato sulla facciata di un edificio storico in restauro',
      'service',
    ),
    features: [
      {
        title: 'Rapporto con la Soprintendenza',
        description:
          'Curiamo la documentazione tecnica e le relazioni periodiche richieste dall’ente di tutela.',
        icon: 'Landmark',
      },
      {
        title: 'Puliture calibrate',
        description:
          'Impacchi, nebulizzazione e microsabbiatura scelti dopo prove su campioni delimitati.',
        icon: 'Wrench',
      },
      {
        title: 'Malte a calce naturale',
        description:
          'Intonaci e stuccature con leganti compatibili con il supporto storico, senza cemento.',
        icon: 'Layers',
      },
      {
        title: 'Documentazione dell’intervento',
        description:
          'Mappatura del degrado, schede di lavorazione e archivio fotografico consegnati a fine opera.',
        icon: 'PencilRuler',
      },
    ],
    process: [
      {
        title: 'Indagine preliminare',
        description:
          'Mappatura dei degradi, analisi delle malte e saggi stratigrafici sulle tinteggiature.',
      },
      {
        title: 'Prove di pulitura',
        description:
          'Campionature su porzioni ridotte, sottoposte all’approvazione della Soprintendenza.',
      },
      {
        title: 'Consolidamento e integrazione',
        description:
          'Consolidamento degli intonaci decoesi, stuccatura delle lacune e integrazione pittorica reversibile.',
      },
      {
        title: 'Protezione finale',
        description:
          'Applicazione di protettivi traspiranti e piano di manutenzione programmata.',
      },
    ],
    faq: [
      {
        question: 'Servono autorizzazioni particolari?',
        answer:
          'Su immobili vincolati è necessaria l’autorizzazione della Soprintendenza prima dell’avvio. I tempi istruttori variano, in genere da sessanta a centoventi giorni: vanno messi in conto nel cronoprogramma.',
      },
      {
        question: 'Le integrazioni si notano?',
        answer:
          'Devono notarsi da vicino e sparire da lontano. Il restauro non falsifica: l’integrazione è riconoscibile a distanza ravvicinata, ma non disturba la lettura d’insieme della facciata.',
      },
    ],
    relatedCategories: ['restauro-conservativo', 'consolidamento-strutturale'],
    featured: true,
    order: 3,
  },
  {
    slug: 'consolidamento-strutturale',
    title: 'Consolidamento strutturale',
    tagline: 'Miglioramento sismico e rinforzo di strutture esistenti.',
    description: [
      'Progettiamo ed eseguiamo interventi di miglioramento e adeguamento sismico su edifici esistenti in muratura, cemento armato e struttura mista, secondo le Norme Tecniche per le Costruzioni.',
      'Prima di intervenire eseguiamo indagini diagnostiche: prove con martinetto piatto, endoscopie, pacometriche e carotaggi. Rinforzare senza conoscere lo stato di fatto significa spendere male.',
    ],
    icon: 'ShieldCheck',
    image: unsplash(
      'photo-1517089152318-42ec560349c0',
      'Area di cantiere con mezzi movimento terra durante gli scavi di fondazione',
      'service',
    ),
    features: [
      {
        title: 'Diagnostica strutturale',
        description:
          'Prove in situ e in laboratorio per definire la reale capacità della struttura esistente.',
        icon: 'Compass',
      },
      {
        title: 'Rinforzi in FRP e FRCM',
        description:
          'Fasciature in fibra di carbonio e intonaci armati per muratura, a bassa invasività.',
        icon: 'Layers',
      },
      {
        title: 'Sottofondazioni',
        description:
          'Micropali, cordoli e allargamento delle fondazioni esistenti su edifici in esercizio.',
        icon: 'HardHat',
      },
      {
        title: 'Cerchiature e catene',
        description:
          'Presidi metallici per il contrasto dei meccanismi di ribaltamento nelle murature storiche.',
        icon: 'Wrench',
      },
    ],
    process: [
      {
        title: 'Rilievo geometrico e strutturale',
        description:
          'Restituzione dello stato di fatto e individuazione dei dissesti in corso.',
      },
      {
        title: 'Indagini diagnostiche',
        description:
          'Campagna di prove concordata con lo strutturista per raggiungere il livello di conoscenza richiesto.',
      },
      {
        title: 'Esecuzione dei rinforzi',
        description:
          'Interventi eseguiti per fasi, mantenendo l’edificio in sicurezza durante tutta la lavorazione.',
      },
      {
        title: 'Collaudo',
        description:
          'Prove di accettazione dei materiali e relazione finale a corredo del collaudo statico.',
      },
    ],
    faq: [
      {
        question: 'Qual è la differenza fra miglioramento e adeguamento sismico?',
        answer:
          'Il miglioramento aumenta la sicurezza senza raggiungere necessariamente i livelli richiesti per una nuova costruzione; l’adeguamento li raggiunge. Su edifici storici il miglioramento è spesso l’unica strada compatibile con la tutela.',
      },
    ],
    relatedCategories: ['consolidamento-strutturale', 'restauro-conservativo'],
    featured: false,
    order: 4,
  },
  {
    slug: 'efficientamento-energetico',
    title: 'Efficientamento energetico',
    tagline: 'Involucro, impianti e diagnosi per ridurre i consumi reali.',
    description: [
      'Interveniamo su involucro e impianti per ridurre il fabbisogno energetico degli edifici esistenti: isolamento a cappotto, sostituzione dei serramenti, coibentazione delle coperture e sistemi a pompa di calore.',
      'Partiamo sempre da una diagnosi energetica con termografia e blower door test. Un cappotto posato su un edificio con ponti termici non risolti produce muffa, non risparmio.',
    ],
    icon: 'Thermometer',
    image: unsplash(
      'photo-1494526585095-c41746248156',
      'Edificio residenziale contemporaneo fotografato al crepuscolo con luci accese',
      'service',
    ),
    features: [
      {
        title: 'Diagnosi energetica',
        description:
          'Termografia, blower door test e modellazione dei consumi prima di scegliere l’intervento.',
        icon: 'Thermometer',
      },
      {
        title: 'Isolamento a cappotto',
        description:
          'Sistemi certificati ETICS con risoluzione puntuale dei ponti termici in corrispondenza dei fori.',
        icon: 'Layers',
      },
      {
        title: 'Serramenti ad alte prestazioni',
        description:
          'Posa in opera qualificata secondo UNI 11673, con nastri e controtelai a tenuta.',
        icon: 'Ruler',
      },
      {
        title: 'Impianti a pompa di calore',
        description:
          'Sostituzione dei generatori a combustibile fossile e integrazione con il fotovoltaico.',
        icon: 'Wrench',
      },
    ],
    process: [
      {
        title: 'Diagnosi',
        description:
          'Analisi dei consumi storici, termografia dell’involucro e verifica della tenuta all’aria.',
      },
      {
        title: 'Scenari di intervento',
        description:
          'Confronto fra due o tre pacchetti, con costi, risparmio atteso e tempo di ritorno.',
      },
      {
        title: 'Realizzazione',
        description:
          'Esecuzione delle opere con controllo in corso d’opera sui punti critici dell’involucro.',
      },
      {
        title: 'Verifica post intervento',
        description:
          'Nuova termografia e aggiornamento dell’Attestato di Prestazione Energetica.',
      },
    ],
    faq: [
      {
        question: 'Vi occupate delle pratiche per gli incentivi?',
        answer:
          'Predisponiamo la documentazione tecnica di nostra competenza e ci coordiniamo con il tecnico asseveratore incaricato dalla committenza. La pratica fiscale resta in capo al professionista abilitato.',
      },
    ],
    relatedCategories: ['efficientamento-energetico', 'costruzioni-civili'],
    featured: false,
    order: 5,
  },
  {
    slug: 'opere-esterne',
    title: 'Opere esterne e sistemazioni',
    tagline: 'Pavimentazioni, muri di sostegno e spazi aperti.',
    description: [
      'Completiamo l’intervento edilizio con le sistemazioni esterne: pavimentazioni drenanti, muri di sostegno, recinzioni, reti di smaltimento delle acque e predisposizioni per il verde.',
      'Curiamo in particolare le pendenze e la regimazione delle acque meteoriche, che sono la causa più frequente di ammaloramento precoce delle superfici esterne.',
    ],
    icon: 'Trees',
    image: unsplash(
      'photo-1580587771525-78b9dba3b914',
      'Villa contemporanea con piscina e sistemazioni esterne in pietra',
      'service',
    ),
    features: [
      {
        title: 'Pavimentazioni drenanti',
        description:
          'Pietra naturale, calcestruzzo architettonico e autobloccanti su massetti correttamente pendenzati.',
        icon: 'Layers',
      },
      {
        title: 'Muri di sostegno',
        description:
          'Opere in c.a. e in pietra a secco, dimensionate con verifica geotecnica del terreno.',
        icon: 'ShieldCheck',
      },
      {
        title: 'Regimazione delle acque',
        description:
          'Caditoie, canalette e pozzi perdenti dimensionati sugli eventi di pioggia locali.',
        icon: 'Compass',
      },
      {
        title: 'Predisposizioni per il verde',
        description:
          'Sottofondi, impianto di irrigazione e illuminazione esterna posati prima delle finiture.',
        icon: 'Trees',
      },
    ],
    relatedCategories: ['opere-esterne', 'costruzioni-civili'],
    featured: false,
    order: 6,
  },
] satisfies readonly Service[];
