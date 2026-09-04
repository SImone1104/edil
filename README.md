# Ferrante Costruzioni — sito vetrina

Sito vetrina per un'impresa edile: costruzioni civili, ristrutturazioni di pregio
e restauro conservativo.

> **Progetto dimostrativo.** L'impresa non esiste: nome, indirizzo, recapiti,
> committenti, importi e certificazioni sono inventati, per quanto verosimili.
> Le fotografie provengono da Unsplash e la ripresa aerea da Pexels. Nessun dato
> reale di terzi è contenuto nel repository.

---

## Stack

| | |
|---|---|
| Framework | Next.js 16.3 · App Router |
| Libreria UI | React 19.2 |
| Linguaggio | TypeScript 5 in modalità `strict`, nessun `any` |
| Stile | Tailwind CSS v4 — token dichiarati in `@theme`, nessun `tailwind.config` |
| Animazioni | Motion 13 (ex Framer Motion) |
| Icone | lucide-react |
| Font | Sora (titoli) e Inter (testo), serviti da `next/font` |

**Nessun backend.** I contenuti sono file TypeScript letti in fase di build; non
c'è database, né API, né form. I contatti sono link nativi `tel:` e `mailto:`.

### Requisiti

- **Node.js 20.9 o superiore** (sviluppato su 24.16)
- npm

---

## Avvio

Installazione delle dipendenze, una volta sola:

```bash
npm install
```

### Sviluppo

```bash
npm run dev
```

Ricompilazione a caldo a ogni salvataggio. Il sito risponde su
<http://localhost:3000>.

### Produzione

È il modo corretto per giudicare le prestazioni: in sviluppo Next ricompila a
ogni richiesta e i tempi non sono indicativi.

```bash
npm run build
```

```bash
npm start
```

### Controlli

```bash
npx tsc --noEmit
```

```bash
npx eslint .
```

Entrambi devono uscire senza errori prima di un commit.

---

## Chiusura

Nel terminale in cui gira: **`Ctrl + C`**.

Su Windows `Ctrl + C` termina `npm` ma **lascia vivo il processo Node figlio**:
se la porta risulta ancora occupata non è un errore tuo. Per trovarlo e chiuderlo
— l'ultima colonna è il PID:

```bash
netstat -ano | findstr :3000
```

```bash
taskkill /PID <numero> /F
```

Oppure, da PowerShell, senza cercare il numero a mano:

```powershell
Get-NetTCPConnection -LocalPort 3000 -State Listen | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

---

## Prova da smartphone

All'avvio Next stampa anche un indirizzo di rete, tipo `http://192.168.1.11:3000`.
Perché sia raggiungibile da un telefono sulla stessa Wi-Fi servono due condizioni
lato Windows, entrambe da un **PowerShell aperto come amministratore**:

```powershell
Set-NetConnectionProfile -Name "<nome della tua rete>" -NetworkCategory Private
```

```powershell
New-NetFirewallRule -DisplayName "Next dev 3000" -Direction Inbound -Protocol TCP -LocalPort 3000 -Action Allow -Profile Private
```

Windows blocca quasi tutto il traffico in ingresso sulle reti classificate come
*pubbliche*, ed è così che etichetta per default anche il Wi-Fi di casa. La
regola apre la porta 3000 **solo** sul profilo privato. Per rimuoverla:

```powershell
Remove-NetFirewallRule -DisplayName "Next dev 3000"
```

Due avvertenze: il telefono dev'essere sulla stessa rete (non su dati mobili né
su una rete "ospiti", che spesso isola i dispositivi), e Safari tiene l'HTML in
cache con ostinazione — per vedere davvero l'ultima versione usa una scheda
privata o aggiungi una query, es. `?v=2`.

---

## Struttura

```
app/                    il router: ogni cartella è una rotta
├─ page.tsx             home
├─ progetti/            archivio cantieri + schede
├─ servizi/             indice servizi + schede
├─ chi-siamo/ contatti/
├─ sitemap.ts robots.ts icon.svg
└─ globals.css          design token in @theme

components/
├─ ui/                  primitive: Container, Section, Button, Reveal…
├─ layout/              header, menu mobile, footer
├─ sections/            blocchi di pagina (hero, griglie, fasce)
├─ projects/            card, filtri, galleria, prima/dopo, timeline
└─ seo/                 dati strutturati JSON-LD

content/                i DATI: cantieri, servizi, azienda
lib/                    accesso ai contenuti, tassonomie, SEO, utility
types/project.ts        modello di dominio, file di soli tipi
public/video/           riprese drone (desktop e mobile)
```

### Rotte e modalità di rendering

| Rotta | Rendering |
|---|---|
| `/` `/servizi` `/chi-siamo` `/contatti` | statica |
| `/progetti/[slug]` · `/servizi/[slug]` | prerenderizzata (`generateStaticParams`) |
| `/progetti` | **dinamica** — legge i `searchParams` dei filtri |

`/progetti` è l'unica rotta dinamica: di conseguenza il progetto **richiede un
host Node** e non è esportabile come HTML statico puro.

---

## Scelte da conoscere prima di modificare

**Server e Client Component.** Tutto è Server Component per default. Le uniche
isole client sono cinque, ognuna ridotta al minimo: `Reveal`, `HeaderShell`,
`MobileNav`, `Counter`, `HeroVideo`. Gli effetti al passaggio del mouse sono CSS
puro: *animato* non implica *Client Component*.

**Filtri senza stato locale.** I filtri dell'archivio sono normali `<Link>` verso
query string diverse, non `useState`. L'URL filtrato è condivisibile, il tasto
Indietro funziona da solo e non costano un byte di JavaScript.

**Slug tipizzati.** `ProjectSlug` e `ServiceSlug` sono unioni chiuse di stringhe
letterali: un collegamento errato fra cantiere e servizio è un errore di
compilazione, non un link rotto scoperto in produzione.

**Menu mobile in un portal.** È montato su `document.body`, non dentro l'header.
L'header riceve `backdrop-blur` quando la pagina è scrollata, e un
`backdrop-filter` su un antenato crea un blocco contenitore per i discendenti
`position: fixed`. Spostarlo dentro l'header lo rompe di nuovo.

**Colori del testo.** `cemento` è per testo su fondo **scuro** (8,2:1 contro
l'antracite); `pietra` è per testo su fondo **chiaro** (4,85:1 sul bianco).
Scambiarli porta a 2,1:1, sotto il minimo WCAG AA.

**Altezze delle testate.** Le utility `.h-hero*` dichiarano `vh` e poi `svh`:
su iOS `100vh` è la finestra con le barre del browser nascoste e il contenuto
sfora sotto il bordo.

---

## Design token

Definiti in `app/globals.css` dentro `@theme`; ogni variabile genera le utility
Tailwind corrispondenti.

| Token | Valore | Uso |
|---|---|---|
| `antracite` | `#131619` | fondi scuri, titoli |
| `ardesia` / `ardesia-mid` | `#343b42` / `#5b646d` | testo corrente |
| `cemento` | `#b3aea6` | testo secondario su fondo scuro |
| `pietra` | `#74716c` | testo secondario su fondo chiaro |
| `calce` / `calce-warm` | `#f4f3f0` / `#faf9f7` | fondi chiari |
| `ruggine` / `ruggine-bright` | `#a94e2b` / `#c9603a` | accento, un solo colore |

---

## Accessibilità

Rispettati: contrasto AA sul testo, `prefers-reduced-motion` su tutte le
animazioni, focus visibile, link "salta al contenuto", `<details>` nativi per le
FAQ, cursore di confronto prima/dopo realizzato con un `<input type="range">`
così da funzionare da tastiera.

**Manca il focus trap** in ingranditore e menu mobile: hanno `aria-modal`, la
chiusura con Esc e il blocco dello scroll, ma con Tab si può ancora uscire dal
pannello aperto.

---

## Limiti noti

1. Il video desktop pesa 12 MB, va compresso sotto i 3–4 MB prima di un uso reale.
2. Il poster dell'hero non è un fotogramma del video: va estratto con `ffmpeg`
   (comando nei commenti di `content/company.ts`).
3. Su iPhone in verticale il video subisce un forte ingrandimento per via del
   ritaglio: servirebbe un montaggio verticale 9:16 dedicato.
4. I bordi `cemento` su fondo chiaro rendono 2,2:1, sotto i 3:1 del criterio
   WCAG 1.4.11. Scelta consapevole: lo stato dei filtri è comunicato anche da
   riempimento e colore del testo.

---

## Crediti

Fotografie: [Unsplash](https://unsplash.com). Ripresa aerea:
[Pexels](https://www.pexels.com). Entrambe con licenza d'uso libero, inclusa
quella commerciale.
