# Specifica Consolidata di Calcolo — ALCOSAFE

> **Scelta progettuale confermata:**
> - **Solo Tabelle Ministeriali** per le bevande (nessuna bevanda o gradazione personalizzata dall'utente). Per i *MIX / cocktail*, come indicato dal Ministero, si sommano i componenti (es. 1 superalcolico).
> - **Gestione flessibile del Peso Corporeo** (non limitata ai soli 6 pesi fissi di tabella, con logica prudenziale).
> - **Conto alla rovescia / Smaltimento** fino a soglia legale (`0,50 g/L` oppure `0,00 g/L` per neopatentati / under 21) e fino a `0,00 g/L` totale.
> - **Salvataggio 100% locale sul dispositivo** (zero server, zero raccolta dati).

---

## 1. Profilo Utente

| Parametro | Valori ammessi | Note |
| --- | --- | --- |
| **Genere** | `UOMO` / `DONNA` | Seleziona la tabella ministeriale di riferimento e il tasso di smaltimento |
| **Peso Corporeo** | Valore numerico in `kg` (es. `40–150 kg`) | Adattato rispetto alle 6 fasce della tabella (vedi §3) |
| **Stato Stomaco** | `PIENO` / `VUOTO` | Seleziona la sotto-tabella (stomaco pieno o a digiuno) |
| **Neopatentato / Under 21** | `Sì` / `No` | Se `Sì`, il limite legale di guida è **0,00 g/L** (altrimenti **0,50 g/L**) |

---

## 2. Catalogo Bevande (15 voci ufficiali + Unità di riferimento)

L'utente sceglie la bevanda e la quantità (in `cc/ml` oppure tramite bottoni rapidi multipli dell'unità di riferimento: *½ unità, 1 unità, 2 unità*, ecc.):

| # | Bevanda | Gradazione (Vol. %) | Unità di riferimento (cc) | Fattore proporzionale |
| ---: | --- | ---: | ---: | --- |
| 1 | Birra Analcolica | 0,5% | 330 | `quantità_cc / 330` |
| 2 | Birra Leggera | 3,5% | 330 | `quantità_cc / 330` |
| 3 | Birra Normale | 5,0% | 330 | `quantità_cc / 330` |
| 4 | Birra Speciale | 8,0% | 330 | `quantità_cc / 330` |
| 5 | Birra Doppio Malto | 10,0% | 330 | `quantità_cc / 330` |
| 6 | Vino | 12,0% | 125 | `quantità_cc / 125` |
| 7 | Vino Liquoroso / Aperitivo | 18,0% | 80 | `quantità_cc / 80` |
| 8 | Digestivo 25° | 25,0% | 40 | `quantità_cc / 40` |
| 9 | Digestivo 30° | 30,0% | 40 | `quantità_cc / 40` |
| 10 | Superalcolico 35° | 35,0% | 40 | `quantità_cc / 40` |
| 11 | Superalcolico 45° | 45,0% | 40 | `quantità_cc / 40` |
| 12 | Superalcolico 60° | 60,0% | 40 | `quantità_cc / 40` |
| 13 | Champagne / Spumante | 11,0% | 100 | `quantità_cc / 100` |
| 14 | Ready to Drink 2,8° | 2,8% | 150 | `quantità_cc / 150` |
| 15 | Ready to Drink 5° | 5,0% | 150 | `quantità_cc / 150` |

> **Formula per singola bevanda:**
> `Alcolemia_bevanda = Valore_Tabella(Genere, Stomaco, Peso, Bevanda) × (quantità_cc / Unità_riferimento_cc)`
>
> **Alcolemia totale di sessione:** somma dei contributi di tutte le bevande consumate.

---

## 3. Gestione del Peso Corporeo (oltre i 6 valori fissi)

Le tabelle ministeriali coprono:
- **UOMO:** `55, 65, 70, 75, 80, 90` kg
- **DONNA:** `45, 55, 60, 65, 75, 80` kg

Per pesi intermedi o fuori scala si adotta la regola **ibrida prudenziale**:
1. **Peso compreso tra due colonne** (es. uomo `72 kg` tra `70` e `75`):
   - **Interpolazione lineare** tra i due valori adiacenti (oppure, in modalità *massima prudenza*, si usa direttamente la colonna inferiore `70 kg`).
2. **Peso inferiore al minimo di tabella** (es. donna `< 45 kg` o uomo `< 55 kg`):
   - Scaling inversamente proporzionale al peso rispetto alla colonna minima: `Valore_min × (Peso_min / Peso_utente)` (in quanto a peso minore corrisponde alcolemia *maggiore*).
3. **Peso superiore al massimo di tabella** (es. donna `> 80 kg` o uomo `> 90 kg`):
   - Per prudenza, **non** si scende sotto il valore dell'ultima colonna (`80 kg` donna / `90 kg` uomo) oppure si scala con tetto prudenziale, perché oltre un certo peso la massa grassa (che non assorbe alcol come i tessuti magri) rende meno lineare la riduzione dell'alcolemia.

---

## 4. Calcolo dello Smaltimento e Conto alla Rovescia

- **Tasso di eliminazione orario ($\beta$):**
  - Approccio standard / AppSheet: `0,15 g/L/ora` (oppure differenziato Widmark: `0,15 g/L/ora` uomo, `0,17 g/L/ora` donna — si consiglia **`0,15 g/L/ora` per tutti** come scelta prudenziale unica).
- **Alcolemia attuale stimata** al tempo $t$ (in ore trascorse dall'assunzione):
  $$\text{BAC}(t) = \max\left(0,\ \text{BAC}_{\text{iniziale}} - 0{,}15 \cdot t\right)$$
- **Ore di attesa per rientrare nel limite legale** ($\text{Soglia} = 0{,}50\text{ g/L}$ standard, oppure $0{,}00\text{ g/L}$ se Neopatentato/Under 21):
  $$\text{Ore}_{\text{limite}} = \max\left(0,\ \frac{\text{BAC}(t) - \text{Soglia}}{0{,}15}\right)$$
- **Ore di attesa per smaltimento completo** ($\text{0,00 g/L}$):
  $$\text{Ore}_{\text{zero}} = \max\left(0,\ \frac{\text{BAC}(t)}{0{,}15}\right)$$

---

## 5. Livelli di Allerta e Sintomi

- **Modalità Standard (limite 0,50 g/L):**
  - **Verde** (`< 0,50 g/L`): entro il limite legale (con avvertenza che *nessun livello è sicuro al 100%*).
  - **Giallo** (`0,50 – 0,80 g/L`): divieto di guida — sanzione amministrativa `543 – 2.170 €`, sospensione patente `3 – 6 mesi`.
  - **Arancio** (`0,81 – 1,50 g/L`): divieto di guida — ammenda `800 – 3.200 €`, arresto fino a `6 mesi`, sospensione patente `6 mesi – 1 anno`.
  - **Rosso** (`> 1,50 g/L`): divieto di guida — ammenda `1.500 – 6.000 €`, arresto `6 mesi – 1 anno`, sospensione patente `1 – 2 anni`, confisca veicolo.
- **Modalità Neopatentato / Under 21 (limite 0,00 g/L):**
  - Qualsiasi valore `> 0,00 g/L` attiva subito l'allerta **NON PUOI GUIDARE** fino al completo azzeramento.
- **Sintomi associati:** mostrati dinamicamente in base alla fascia (`0`, `0.1–0.2`, `0.3–0.4`, `0.5–0.8`, `0.9–1.5`, `1.6–3.0`, `3.1–4.0`, `> 4`) dalla tabella CNESPS / NIAAA.
