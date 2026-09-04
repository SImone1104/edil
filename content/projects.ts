// content/projects.ts
// -----------------------------------------------------------------------------
// Schede cantiere. Contenuti fittizi ma verosimili, costruiti su tipologie di
// intervento reali del mercato edile lombardo: nomi, committenti e importi sono
// inventati a scopo di demo.
//
// Le immagini provengono da Unsplash tramite l'helper `unsplash()`: nessun asset
// locale è necessario per far girare il progetto.
// -----------------------------------------------------------------------------

import { unsplash } from '@/lib/media';
import type { Project } from '@/types/project';

export const projects = [
  /* ------------------------------------------------------------------ */
  {
    slug: 'palazzo-corio-restauro-facciate',
    title: 'Palazzo Corio',
    summary:
      'Restauro conservativo delle facciate e del cortile d’onore di un palazzo settecentesco vincolato.',
    description: [
      'L’intervento ha riguardato le tre facciate su strada e il cortile d’onore di un palazzo del XVIII secolo nel centro storico di Milano, sottoposto a tutela ai sensi del Codice dei beni culturali. Lo stato di conservazione presentava intonaci decoesi su circa il quaranta per cento della superficie, lacune diffuse nelle cornici marcapiano e croste nere di deposito sulle porzioni riparate dal dilavamento.',
      'La campagna diagnostica preliminare ha compreso saggi stratigrafici sulle tinteggiature, che hanno restituito la coloritura settecentesca originale in terra d’ombra naturale, e prove di aderenza sugli intonaci. Sulla base dei risultati la Soprintendenza ha autorizzato la conservazione degli intonaci storici con consolidamento corticale, escludendo il rifacimento integrale inizialmente ipotizzato dalla proprietà.',
      'Le puliture sono state eseguite per gradi, con impacchi di carbonato di ammonio sulle superfici lapidee e nebulizzazione controllata di acqua deionizzata sugli intonaci. Le lacune sono state integrate con malta a calce naturale NHL 3.5 e inerti selezionati per granulometria e colore sul campione originale. La tinteggiatura finale è ai silicati di potassio, applicata a velature successive.',
      'Il cantiere si è svolto con il palazzo interamente abitato: il ponteggio è stato dotato di teli antipolvere e le lavorazioni rumorose concentrate nella fascia oraria concordata con l’amministratore condominiale.',
    ],
    category: 'restauro-conservativo',
    status: 'completato',
    use: 'residenziale',
    clientType: 'privato',
    client: 'Condominio Palazzo Corio',
    location: {
      city: 'Milano',
      province: 'MI',
      region: 'Lombardia',
      country: 'IT',
      coordinates: { lat: 45.4668, lng: 9.1905 },
    },
    yearStart: 2022,
    yearEnd: 2024,
    metrics: {
      surfaceSqm: 1850,
      durationMonths: 19,
      floors: 4,
      budgetLabel: '€ 1,4 mln',
    },
    specs: [
      { label: 'Superficie di facciata', value: '1.850', unit: 'm²' },
      { label: 'Durata dei lavori', value: '19', unit: 'mesi' },
      { label: 'Intonaci consolidati', value: '62', unit: '%' },
      { label: 'Legante', value: 'Calce idraulica naturale NHL 3.5' },
      { label: 'Tinteggiatura', value: 'Silicati di potassio, tre velature' },
      { label: 'Vincolo', value: 'D.lgs. 42/2004, art. 10' },
    ],
    phases: [
      {
        title: 'Indagini e saggi stratigrafici',
        description:
          'Mappatura del degrado, saggi sulle tinteggiature e prove di aderenza degli intonaci.',
        period: '2022-09',
        completed: true,
      },
      {
        title: 'Autorizzazione della Soprintendenza',
        description:
          'Presentazione del progetto di restauro e approvazione delle campionature di pulitura.',
        period: '2023-01',
        completed: true,
      },
      {
        title: 'Puliture e consolidamenti',
        description:
          'Rimozione dei depositi coerenti, consolidamento corticale e stuccatura delle lacune.',
        period: '2023-04',
        completed: true,
      },
      {
        title: 'Tinteggiatura e smontaggio',
        description:
          'Velature ai silicati, revisione dei serramenti e smontaggio del ponteggio.',
        period: '2024-03',
        completed: true,
      },
    ],
    credits: [
      { role: 'Progetto di restauro', name: 'Studio Ronchetti Architetti' },
      { role: 'Direzione lavori', name: 'arch. Elena Vitali' },
      { role: 'Restauro superfici decorate', name: 'Laboratorio Tavella' },
    ],
    testimonial: {
      quote:
        'Il cantiere è durato diciannove mesi in un palazzo abitato da ventisei famiglie e non abbiamo ricevuto una sola lamentela formale. Per noi questo vale quanto il risultato estetico.',
      author: 'Marco Bassi',
      role: 'Amministratore del condominio',
    },
    cover: unsplash(
      'photo-1517581177682-a085bb7ffb15',
      'Interno di un edificio storico durante i lavori di restauro, con ponteggi di servizio',
      'cover',
    ),
    gallery: [
      unsplash(
        'photo-1531834685032-c34bf0d84c77',
        'Ponteggio montato sulla facciata principale durante le lavorazioni',
        'gallery',
      ),
      unsplash(
        'photo-1487958449943-2429e8be8625',
        'Dettaglio delle cornici e della partitura di facciata dopo il restauro',
        'gallery',
      ),
      unsplash(
        'photo-1503387762-592deb58ef4e',
        'Tavole di progetto e strumenti di rilievo sul tavolo di cantiere',
        'gallery',
      ),
    ],
    beforeAfter: [
      {
        before: unsplash(
          'photo-1531834685032-c34bf0d84c77',
          'La facciata prima dell’intervento, con intonaci decoesi e depositi',
          'gallery',
        ),
        after: unsplash(
          'photo-1541976590-713941681591',
          'La facciata restituita dopo il restauro e la tinteggiatura ai silicati',
          'gallery',
        ),
        caption: 'Facciata su corte: stato di fatto e restituzione finale.',
      },
    ],
    techniques: [
      'Calce idraulica naturale',
      'Impacchi di carbonato di ammonio',
      'Consolidamento corticale',
      'Tinteggiatura ai silicati',
      'Saggi stratigrafici',
    ],
    relatedServices: ['restauro-conservativo', 'consolidamento-strutturale'],
    featured: true,
    order: 1,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'cascina-bregonda',
    title: 'Cascina Bregonda',
    summary:
      'Recupero di una cascina lombarda a corte e trasformazione in quattro unità abitative indipendenti.',
    description: [
      'La cascina, disposta su tre lati attorno a una corte acciottolata, era in stato di abbandono da oltre vent’anni. Il corpo residenziale conservava la struttura muraria originale in mattoni pieni, mentre il fienile aveva perso gran parte della copertura e presentava un quadro fessurativo attivo sul lato est.',
      'Il progetto ha previsto il mantenimento dell’impianto tipologico a corte e delle aperture originali sui fronti, con l’inserimento delle nuove bucature esclusivamente sul fronte interno, meno percepibile dal paesaggio agricolo circostante. Le quattro unità ricavate hanno tagli fra i novanta e i centosessanta metri quadri.',
      'Sul fienile si è intervenuti con una nuova copertura in legno lamellare, cordolo sommitale in acciaio e catene di contrasto per i meccanismi di ribaltamento. Il tavolato ligneo originale recuperabile è stato smontato, trattato e riposato a vista negli ambienti al primo piano.',
      'L’involucro raggiunge oggi la classe energetica A2 grazie all’isolamento in intercapedine, alla coibentazione della copertura e a un impianto centralizzato a pompa di calore con distribuzione a pavimento.',
    ],
    category: 'ristrutturazioni-di-pregio',
    status: 'completato',
    use: 'residenziale',
    clientType: 'privato',
    client: 'Famiglia Bregonda',
    location: {
      city: 'Vimercate',
      province: 'MB',
      region: 'Lombardia',
      country: 'IT',
      coordinates: { lat: 45.6167, lng: 9.3667 },
    },
    yearStart: 2021,
    yearEnd: 2023,
    metrics: {
      surfaceSqm: 940,
      durationMonths: 24,
      floors: 2,
      budgetLabel: '€ 1,1 mln',
    },
    specs: [
      { label: 'Superficie recuperata', value: '940', unit: 'm²' },
      { label: 'Unità abitative', value: '4' },
      { label: 'Durata dei lavori', value: '24', unit: 'mesi' },
      { label: 'Classe energetica', value: 'A2' },
      { label: 'Copertura', value: 'Legno lamellare di abete, manto in coppi di recupero' },
      { label: 'Impianto', value: 'Pompa di calore centralizzata, pavimento radiante' },
    ],
    phases: [
      {
        title: 'Messa in sicurezza',
        description:
          'Puntellamento del fienile, rimozione delle porzioni di copertura pericolanti e bonifica dell’amianto.',
        period: '2021-05',
        completed: true,
      },
      {
        title: 'Consolidamento murature',
        description:
          'Scuci e cuci sul fronte est, cordolo sommitale e inserimento delle catene di contrasto.',
        period: '2021-11',
        completed: true,
      },
      {
        title: 'Nuova copertura e involucro',
        description:
          'Struttura in lamellare, coibentazione e posa del manto in coppi di recupero.',
        period: '2022-04',
        completed: true,
      },
      {
        title: 'Impianti e finiture',
        description:
          'Pavimento radiante, serramenti in rovere e finiture in calce rasata.',
        period: '2022-10',
        completed: true,
      },
    ],
    credits: [
      { role: 'Progetto architettonico', name: 'Studio Terzi e Associati' },
      { role: 'Strutture', name: 'ing. Paolo Meregalli' },
    ],
    testimonial: {
      quote:
        'Avevamo paura di perdere il carattere della cascina. Il risultato è che chi passa dalla strada non si accorge che è stata ristrutturata: è esattamente quello che volevamo.',
      author: 'Anna Bregonda',
      role: 'Committente',
    },
    cover: unsplash(
      'photo-1600585154340-be6161a56a0c',
      'Vista esterna della residenza recuperata al tramonto',
      'cover',
    ),
    gallery: [
      unsplash(
        'photo-1600210492486-724fe5c67fb0',
        'Soggiorno con travi a vista e finiture in calce rasata',
        'gallery',
      ),
      unsplash(
        'photo-1600566753086-00f18fb6b3ea',
        'Ambiente a doppia altezza con scala interna e ampie vetrate',
        'gallery',
      ),
      unsplash(
        'photo-1502005229762-cf1b2da7c5d6',
        'Scala interna in muratura tinteggiata di bianco',
        'gallery',
      ),
    ],
    beforeAfter: [
      {
        before: unsplash(
          'photo-1517581177682-a085bb7ffb15',
          'Il corpo del fienile allo stato grezzo, prima delle finiture',
          'gallery',
        ),
        after: unsplash(
          'photo-1600210492486-724fe5c67fb0',
          'Lo stesso ambiente a lavori conclusi, adibito a soggiorno',
          'gallery',
        ),
        caption: 'Fienile: dallo stato grezzo al soggiorno dell’unità principale.',
      },
    ],
    techniques: [
      'Scuci e cuci',
      'Cordolo sommitale in acciaio',
      'Legno lamellare',
      'Coppi di recupero',
      'Calce rasata',
    ],
    relatedServices: ['ristrutturazioni-di-pregio', 'efficientamento-energetico'],
    featured: true,
    order: 2,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'residenza-ortles-12',
    title: 'Residenza Ortles 12',
    summary:
      'Nuova costruzione di diciotto appartamenti a standard NZEB su un lotto di ricucitura urbana.',
    description: [
      'L’edificio sorge su un lotto interstiziale precedentemente occupato da un’autorimessa dismessa, in un tessuto urbano consolidato a sud di Milano. Il progetto risolve un fronte strada rimasto incompleto per decenni, allineandosi alle altezze di gronda degli edifici confinanti.',
      'La struttura è in cemento armato gettato in opera, con solai a piastra e nucleo scale-ascensore che assolve la funzione di controvento. Le fondazioni sono su platea, con paratia di micropali sul confine per consentire lo scavo in aderenza agli edifici esistenti.',
      'L’involucro è progettato secondo criteri NZEB: cappotto in lana di roccia da sedici centimetri, serramenti in alluminio a taglio termico con triplo vetro e ventilazione meccanica controllata con recupero di calore in ogni unità. La copertura ospita un impianto fotovoltaico da quarantotto kilowatt di picco.',
      'Al momento il cantiere è in fase di finitura: sono completate strutture, involucro e impianti, e sono in corso le opere di finitura interna e le sistemazioni esterne.',
    ],
    category: 'costruzioni-civili',
    status: 'in-corso',
    use: 'residenziale',
    clientType: 'impresa',
    client: 'Ortles Sviluppo S.r.l.',
    location: {
      city: 'Milano',
      province: 'MI',
      region: 'Lombardia',
      country: 'IT',
      coordinates: { lat: 45.4408, lng: 9.1893 },
    },
    yearStart: 2024,
    metrics: {
      surfaceSqm: 2400,
      durationMonths: 26,
      floors: 6,
      budgetLabel: '€ 4,8 mln',
    },
    specs: [
      { label: 'Superficie lorda', value: '2.400', unit: 'm²' },
      { label: 'Unità immobiliari', value: '18' },
      { label: 'Piani fuori terra', value: '6' },
      { label: 'Struttura', value: 'Cemento armato gettato in opera' },
      { label: 'Fotovoltaico', value: '48', unit: 'kWp' },
      { label: 'Standard', value: 'NZEB, classe energetica A4' },
    ],
    phases: [
      {
        title: 'Demolizione e scavi',
        description:
          'Demolizione dell’autorimessa esistente, paratia di micropali e scavo in aderenza.',
        period: '2024-03',
        completed: true,
      },
      {
        title: 'Strutture',
        description:
          'Platea di fondazione, elevazioni in cemento armato e nucleo di controvento.',
        period: '2024-09',
        completed: true,
      },
      {
        title: 'Involucro e impianti',
        description:
          'Cappotto, serramenti, VMC e predisposizione del fotovoltaico in copertura.',
        period: '2025-06',
        completed: true,
      },
      {
        title: 'Finiture e sistemazioni esterne',
        description:
          'Finiture interne delle unità, parti comuni e pavimentazioni della corte.',
        period: '2026-02',
        completed: false,
      },
    ],
    credits: [
      { role: 'Progetto architettonico', name: 'Ferraris Architetture' },
      { role: 'Strutture', name: 'ing. Sara Colombo' },
      { role: 'Impianti', name: 'Studio Tecnico Marelli' },
    ],
    cover: unsplash(
      'photo-1429497419816-9ca5cfb4571a',
      'Gru di cantiere sopra la struttura in elevazione di un nuovo edificio',
      'cover',
    ),
    gallery: [
      unsplash(
        'photo-1504307651254-35680f356dfd',
        'Squadra al lavoro sui ponteggi durante la realizzazione dell’involucro',
        'gallery',
      ),
      unsplash(
        'photo-1517089152318-42ec560349c0',
        'Fase di scavo con mezzi movimento terra sul lotto',
        'gallery',
      ),
      unsplash(
        'photo-1621905251189-08b45d6a269e',
        'Operaio con dispositivi di protezione durante le lavorazioni',
        'gallery',
      ),
    ],
    techniques: [
      'Paratia di micropali',
      'Platea di fondazione',
      'Cappotto in lana di roccia',
      'Ventilazione meccanica controllata',
      'Fotovoltaico integrato',
    ],
    relatedServices: ['costruzioni-civili', 'efficientamento-energetico'],
    featured: true,
    order: 3,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'villa-sul-lario',
    title: 'Villa sul Lario',
    summary:
      'Ristrutturazione integrale di una villa anni Sessanta affacciata sul lago di Como.',
    description: [
      'La villa, costruita nel 1963 su un terreno terrazzato a forte pendenza, presentava una distribuzione interna frammentata e un involucro privo di isolamento. Il valore dell’immobile era interamente affidato alla posizione e alla vista sul ramo di Como.',
      'Il progetto ha riorganizzato il piano di ingresso in un unico ambiente continuo affacciato sul lago, sostituendo tre setti portanti con un telaio in acciaio calcolato per riprendere i carichi dei livelli superiori. L’intervento strutturale è stato eseguito per fasi, con puntellamenti provvisori e monitoraggio delle deformazioni.',
      'Le finiture privilegiano materiali locali: pavimenti in pietra di Moltrasio a spacco naturale negli ambienti di rappresentanza, intonaci a calce e serramenti a scomparsa in alluminio bronzato. La piscina esistente è stata rifatta con bordo a sfioro sul fronte lago.',
      'Le sistemazioni esterne hanno richiesto il rifacimento di due muri di sostegno in pietra a secco e la revisione completa della regimazione delle acque meteoriche, all’origine di infiltrazioni ricorrenti nel piano interrato.',
    ],
    category: 'ristrutturazioni-di-pregio',
    status: 'completato',
    use: 'residenziale',
    clientType: 'privato',
    location: {
      city: 'Blevio',
      province: 'CO',
      region: 'Lombardia',
      country: 'IT',
      coordinates: { lat: 45.8281, lng: 9.1017 },
    },
    yearStart: 2022,
    yearEnd: 2023,
    metrics: {
      surfaceSqm: 420,
      durationMonths: 16,
      floors: 3,
      budgetLabel: 'Riservato',
    },
    specs: [
      { label: 'Superficie', value: '420', unit: 'm²' },
      { label: 'Durata dei lavori', value: '16', unit: 'mesi' },
      { label: 'Struttura di rinforzo', value: 'Telaio in acciaio S275' },
      { label: 'Pavimenti', value: 'Pietra di Moltrasio a spacco' },
      { label: 'Serramenti', value: 'Alluminio bronzato a scomparsa' },
      { label: 'Muri di sostegno', value: '2 rifatti in pietra a secco' },
    ],
    credits: [
      { role: 'Progetto architettonico', name: 'Studio Lariano Progetti' },
      { role: 'Strutture', name: 'ing. Andrea Fumagalli' },
      { role: 'Paesaggio', name: 'Verde & Terrazzi' },
    ],
    testimonial: {
      quote:
        'La parte più delicata è stata togliere i muri portanti del piano di ingresso con la casa ancora in piedi. È andata esattamente come ce l’avevano spiegata, senza sorprese.',
      author: 'Committente privato',
    },
    cover: unsplash(
      'photo-1613490493576-7fde63acd811',
      'Villa contemporanea con piscina a sfioro affacciata sul lago',
      'cover',
    ),
    gallery: [
      unsplash(
        'photo-1600573472550-8090b5e0745e',
        'Ambiente interno con vetrata continua affacciata sull’esterno',
        'gallery',
      ),
      unsplash(
        'photo-1565182999561-18d7dc61c393',
        'Zona giorno con scala e finiture chiare',
        'gallery',
      ),
      unsplash(
        'photo-1584622650111-993a426fbf0a',
        'Bagno padronale con rivestimenti in pietra chiara',
        'gallery',
      ),
    ],
    techniques: [
      'Telaio in acciaio',
      'Puntellamento provvisorio',
      'Pietra a secco',
      'Piscina a sfioro',
      'Intonaci a calce',
    ],
    relatedServices: [
      'ristrutturazioni-di-pregio',
      'consolidamento-strutturale',
      'opere-esterne',
    ],
    featured: true,
    order: 4,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'ex-filanda-vittadini',
    title: 'Ex Filanda Vittadini',
    summary:
      'Consolidamento strutturale e recupero di un opificio ottocentesco destinato a spazi direzionali.',
    description: [
      'L’edificio, costruito nel 1878 come filanda da seta, conserva la struttura in muratura portante con orizzontamenti a volterrane su travi in ferro. Dismesso negli anni Ottanta, presentava un quadro fessurativo diffuso e cedimenti differenziali sul lato prospiciente il torrente.',
      'La campagna diagnostica ha compreso prove con martinetto piatto singolo e doppio, endoscopie sulle murature e carotaggi sulle fondazioni. I risultati hanno evidenziato fondazioni a sacco di profondità insufficiente sul fronte nord, all’origine dei cedimenti.',
      'Il consolidamento ha previsto sottofondazioni con micropali e cordolo di collegamento, iniezioni di miscele a base di calce nelle murature, e il rinforzo dei solai voltati con intonaco armato in fibra di vetro sull’estradosso. Le capriate metalliche originali sono state sabbiate, trattate contro la corrosione e lasciate a vista.',
      'Il progetto di riuso destina i due livelli principali a spazi direzionali open space, mantenendo leggibile la sequenza delle campate e la partitura delle aperture originali.',
    ],
    category: 'consolidamento-strutturale',
    status: 'in-corso',
    use: 'direzionale',
    clientType: 'impresa',
    client: 'Vittadini Real Estate S.p.A.',
    location: {
      city: 'Bergamo',
      province: 'BG',
      region: 'Lombardia',
      country: 'IT',
      coordinates: { lat: 45.6983, lng: 9.6773 },
    },
    yearStart: 2024,
    metrics: {
      surfaceSqm: 3100,
      durationMonths: 30,
      floors: 3,
      budgetLabel: '€ 5,2 mln',
    },
    specs: [
      { label: 'Superficie', value: '3.100', unit: 'm²' },
      { label: 'Anno di costruzione', value: '1878' },
      { label: 'Micropali', value: '146' },
      { label: 'Solai', value: 'Volterrane su travi in ferro, estradosso rinforzato' },
      { label: 'Rinforzi', value: 'Intonaco armato FRCM in fibra di vetro' },
      { label: 'Destinazione', value: 'Direzionale open space' },
    ],
    phases: [
      {
        title: 'Diagnostica strutturale',
        description:
          'Martinetti piatti, endoscopie e carotaggi per il raggiungimento del livello di conoscenza LC2.',
        period: '2024-02',
        completed: true,
      },
      {
        title: 'Sottofondazioni',
        description:
          'Micropali sul fronte nord e cordolo di collegamento in cemento armato.',
        period: '2024-07',
        completed: true,
      },
      {
        title: 'Consolidamento murature e solai',
        description:
          'Iniezioni a base di calce e rinforzo all’estradosso delle volterrane.',
        period: '2025-03',
        completed: false,
      },
      {
        title: 'Recupero e finiture',
        description:
          'Trattamento delle capriate metalliche, involucro e allestimento degli spazi direzionali.',
        period: '2026-05',
        completed: false,
      },
    ],
    credits: [
      { role: 'Progetto di recupero', name: 'Atelier Industriale' },
      { role: 'Strutture', name: 'ing. Giulio Ravasi' },
    ],
    cover: unsplash(
      'photo-1497366811353-6870744d04b2',
      'Spazio direzionale ricavato in un edificio industriale con vetrate metalliche',
      'cover',
    ),
    gallery: [
      unsplash(
        'photo-1497366216548-37526070297c',
        'Ambiente open space con superfici in cemento a vista',
        'gallery',
      ),
      unsplash(
        'photo-1460317442991-0ec209397118',
        'Fronte dell’edificio con la partitura originale delle aperture',
        'gallery',
      ),
      unsplash(
        'photo-1449824913935-59a10b8d2000',
        'Il contesto urbano in cui si inserisce l’ex opificio',
        'gallery',
      ),
    ],
    techniques: [
      'Micropali',
      'Martinetti piatti',
      'Iniezioni di calce',
      'Intonaco armato FRCM',
      'Recupero capriate metalliche',
    ],
    relatedServices: ['consolidamento-strutturale', 'restauro-conservativo'],
    featured: false,
    order: 5,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'scuola-falcone-efficientamento',
    title: 'Scuola primaria Falcone',
    summary:
      'Efficientamento energetico e miglioramento sismico di un edificio scolastico degli anni Settanta.',
    description: [
      'L’intervento ha interessato un edificio scolastico realizzato nel 1974 con struttura a telaio in cemento armato e tamponamenti in laterizio a cassa vuota, privi di isolamento. I consumi per riscaldamento superavano i centoventi chilowattora per metro quadro all’anno.',
      'Il miglioramento sismico è stato ottenuto con incamiciature in FRP sui nodi trave-pilastro del piano terra e con l’inserimento di controventi dissipativi in acciaio in due campate per direzione, soluzione scelta perché eseguibile dall’esterno senza interferire con le aule.',
      'Sul fronte energetico sono stati realizzati il cappotto esterno in EPS con grafite da quattordici centimetri, la sostituzione integrale dei serramenti con infissi in alluminio a taglio termico e la coibentazione della copertura piana. La centrale termica a gasolio è stata sostituita da due pompe di calore aria-acqua.',
      'I lavori sono stati eseguiti in due estati consecutive per non interrompere l’attività didattica, con le lavorazioni più invasive concentrate nel periodo di chiusura estiva e le opere esterne proseguite durante l’anno scolastico con percorsi protetti.',
    ],
    category: 'efficientamento-energetico',
    status: 'completato',
    use: 'pubblico',
    clientType: 'pubblico',
    client: 'Comune di Seregno',
    location: {
      city: 'Seregno',
      province: 'MB',
      region: 'Lombardia',
      country: 'IT',
      coordinates: { lat: 45.6503, lng: 9.2039 },
    },
    yearStart: 2023,
    yearEnd: 2024,
    metrics: {
      surfaceSqm: 2750,
      durationMonths: 14,
      floors: 3,
      budgetLabel: '€ 2,3 mln',
    },
    specs: [
      { label: 'Superficie', value: '2.750', unit: 'm²' },
      { label: 'Consumo ante intervento', value: '124', unit: 'kWh/m² anno' },
      { label: 'Consumo post intervento', value: '38', unit: 'kWh/m² anno' },
      { label: 'Cappotto', value: 'EPS con grafite, 14 cm' },
      { label: 'Generatori', value: '2 pompe di calore aria-acqua' },
      { label: 'Miglioramento sismico', value: 'Controventi dissipativi + FRP sui nodi' },
    ],
    phases: [
      {
        title: 'Diagnosi e progetto',
        description:
          'Termografia, verifica sismica dello stato di fatto e progetto definitivo per il bando.',
        period: '2023-01',
        completed: true,
      },
      {
        title: 'Prima fase estiva',
        description:
          'Controventi dissipativi, incamiciature FRP e sostituzione dei serramenti.',
        period: '2023-06',
        completed: true,
      },
      {
        title: 'Seconda fase estiva',
        description:
          'Cappotto esterno, coibentazione della copertura e nuova centrale termica.',
        period: '2024-06',
        completed: true,
      },
      {
        title: 'Collaudo e verifica',
        description:
          'Collaudo statico, nuova termografia e aggiornamento dell’APE.',
        period: '2024-10',
        completed: true,
      },
    ],
    credits: [
      { role: 'Progetto e direzione lavori', name: 'Ufficio Tecnico Comunale' },
      { role: 'Verifica sismica', name: 'ing. Chiara Pozzi' },
    ],
    testimonial: {
      quote:
        'Due estati di lavori senza perdere un giorno di lezione. La bolletta del riscaldamento del primo inverno è scesa del sessantotto per cento.',
      author: 'Dirigenza scolastica',
      role: 'Istituto comprensivo',
    },
    cover: unsplash(
      'photo-1541976590-713941681591',
      'Facciata di un edificio pubblico dopo l’intervento di efficientamento',
      'cover',
    ),
    gallery: [
      unsplash(
        'photo-1486406146926-c627a92ad1ab',
        'Vista dal basso della struttura dell’edificio scolastico',
        'gallery',
      ),
      unsplash(
        'photo-1512917774080-9991f1c4c750',
        'Fronte esterno con il nuovo rivestimento a cappotto',
        'gallery',
      ),
      unsplash(
        'photo-1600880292203-757bb62b4baf',
        'Momento di confronto tecnico con la committenza in cantiere',
        'gallery',
      ),
    ],
    techniques: [
      'Controventi dissipativi',
      'Incamiciatura FRP',
      'Cappotto EPS con grafite',
      'Pompe di calore aria-acqua',
      'Blower door test',
    ],
    relatedServices: ['efficientamento-energetico', 'consolidamento-strutturale'],
    featured: false,
    order: 6,
  },
] satisfies readonly Project[];
