# Modello Attuale AppSheet — ALCOSAFE (BAC)

Fonte: esportazione PDF delle tabelle AppSheet dell'utente.

---

## 1. Tabella principale di registro (`input`)

Ogni riga rappresenta una registrazione di consumo alcolico con i seguenti campi:

### Anagrafica e contesto
- `id_input` (es. `1961cb16`)
- `Data`, `Ora` (e `Ora (formato orario)`)
- `Genere` (`UOMO` / `DONNA`)
- `Nome`
- `Stomaco` (`PIENO` / `VUOTO`)
- `Peso Corporeo`, `Peso Corporeo UOMO`, `Peso Corporeo DONNA`

### Quantità assunte (in cc) e tasso alcolemico parziale per ciascuna delle 15 bevande
1. `Birra Analcolica 0,5%` → `Tasso Alcolemico Birra Analcolica 0,5%`
2. `Birra Leggera 3,5%` → `Tasso Alcolemico Birra Leggera 3,5%`
3. `Birra Normale 5%` → `Tasso Alcolemico Birra Normale 5%`
4. `Birra speciale 8%` → `Tasso Alcolemico Birra speciale 8%`
5. `Birra Doppio Malto 10%` → `Tasso Alcolemico Birra Doppio Malto 10%`
6. `Vino 12%` → `Tasso Alcolemico Vino 12%`
7. `Vino Liquoroso / Aperitivo 18%` → `Tasso Alcolemico Vino Liquoroso / Aperitivo 18%`
8. `Digestivo 25%` → `Tasso Alcolemico Digestivo 25%`
9. `Digestivo 30%` → `Tasso Alcolemico Digestivo 30%`
10. `Superalcolico 35%` → `Tasso Alcolemico Superalcolico 35%`
11. `Superalcolico 45%` → `Tasso Alcolemico Superalcolico 45%`
12. `Superalcolico 60%` → `Tasso Alcolemico Superalcolico 60%`
13. `Champagne / Spumante 11%` → `Tasso Alcolemico Champagne / Spumante 11%`
14. `Ready to Drink 2,8%` → `Tasso Alcolemico Ready to Drink 2,8%`
15. `Ready to Drink 5%` → `Tasso Alcolemico Ready to Drink 5%`

> Nota dai dati: il tasso alcolemico parziale è scalato proporzionalmente rispetto all'unità di riferimento (es. `250 cc` di Vino 12% = `2 × 0,11 = 0,22` per uomo 90 kg a stomaco pieno).

### Calcoli istantanei, decadimento e statistiche
- `Stima Tasso Alcolemico Totale`
- `Allerta` (`Verde`, `Giallo`, `Arancio`, `Rosso`)
- `Ore Decadimento a 0,50 mg./lt.` / `Ore Decadimento a 0,0 mg./lt.`
- `Tasso Alcolemico attuale (-0,15/h)` (smaltimento stimato a `-0,15 g/L` per ora)
- `Data Ultima Stima`, `Ora Ultima Stima`
- `Grammi di Alcol Assunto`
- `Alcol Attuale (mg./lt.)`
- `Ore Decadimento a 0,5 mg./lt. (totali)` / `Ore Decadimento a 0,0 mg./lt. (totali)`
- `Dal`, `Al` (finestra temporale settimanale)
- `Unità Alcoliche` (1 UA ≈ 12 g di alcol puro nei dati: es. `23,70 g → 1,975 UA`)
- `Unità Alcoliche Giornaliere`
- `Anno`, `Settimana`, `Unità Alcoliche Settimanali`
- `Mese`, `Unità Alcolemico/Unità Alcoliche Mensili`
- `Media Giorni "Zero Alcol" (settimana)`
- `Media Giorni "Zero Alcol" (mese)`

---

## 2. Tabelle di lookup (Pagine 2–7)

- **Tabelle alcolemia (Pagine 2–5):** matrici per Uomo Pieno, Uomo Vuoto, Donna Vuoto, Donna Pieno sulle 15 bevande e sulle 6 fasce di peso.
- **Tabella Pesi (`id_pesi`, Pagina 6):**
  - `uomo`: `55, 65, 70, 75, 80, 90`
  - `donna`: `45, 55, 60, 65, 75, 80`
- **Unità di riferimento (`id_unità_riferimento`, Pagina 7):**
  - Birra: `330 cc`
  - Vino: `125 cc`
  - Vini Liquorosi/Aperitivi: `80 cc`
  - Digestivi: `40 cc`
  - Superalcolici: `40 cc`
  - Champagne/Spumante: `100 cc`
  - Ready to Drink: `150 cc`

---

## 3. Messaggi di Allerta (Art. 186 CdS — Aggiornamento 2024)

| Livello | Soglia | Testo e Sanzioni |
| --- | --- | --- |
| **Verde** (`id_alert_verde`) | `< 0,5 g/L` | LA STIMA DEL TUO LIVELLO DI ALCOL NEL SANGUE (STANDO AI DATI DA TE INSERITI E ALLE TABELLE MINISTERIALI) TI CONSENTE DI METTERTI ALLA GUIDA. |
| **Giallo** (`id_alert_giallo`) | `0,5 – 0,8 g/L` | NON TI CONSENTE DI METTERTI ALLA GUIDA! Sanzione amministrativa: Multa da 543 a 2.170 euro. Sospensione della patente: Da 3 a 6 mesi. |
| **Arancio** (`id_alert_arancio`) | `0,8 – 1,5 g/L` | NON TI CONSENTE DI METTERTI ALLA GUIDA! Ammenda: Da 800 a 3.200 euro. Arresto: Fino a 6 mesi. Sospensione della patente: Da 6 mesi a 1 anno. |
| **Rosso** (`id_alert_rosso`) | `> 1,5 g/L` | NON TI CONSENTE DI METTERTI ALLA GUIDA! Ammenda: Da 1.500 a 6.000 euro. Arresto: Da 6 mesi a 1 anno. Sospensione della patente: Da 1 a 2 anni. Confisca del veicolo: Se il veicolo non appartiene al conducente, viene confiscato. |

---

## 4. Disclaimer (`id_disclaimer`)

- **ACCETTAZIONE IMPLICITA:** La chiusura di questa pagina o la navigazione all'interno dell'app implica l'accettazione integrale e senza riserve del presente disclaimer e delle condizioni in esso riportate. Se non si accettano i termini sopra descritti, si è invitati a non utilizzare l'applicazione.
- **DISCLAIMER sull'Utilizzo dell'APP:** L'applicazione 'BAC - Blood Alcohol Content' fornisce una stima indicativa del tasso alcolemico nel sangue basandosi esclusivamente sui dati inseriti dall'utente e sulle tabelle ufficiali pubblicate nella Gazzetta Ufficiale (8 settembre 2008, Serie Generale n. 210).
- **Limiti della Stima:** La stima è puramente indicativa e può variare rispetto al tasso alcolemico effettivo, che dipende da numerosi fattori individuali (ad esempio, metabolismo, stato di salute, assunzione di farmaci, ecc.). L'app non tiene conto di variabili aggiuntive che potrebbero influenzare il risultato.
- **Responsabilità dell'Utente:** L'utente è l'unico responsabile dell'accuratezza dei dati inseriti e dell'interpretazione dei risultati forniti dall'app. L'app non sostituisce in alcun modo l'utilizzo di strumenti certificati per la misurazione dell'alcolemia (ad esempio, etilometro) né l'esecuzione di test clinici.
- **Avvertenza:** La guida sotto l'effetto dell'alcol è severamente vietata dalla legge e costituisce un reato. L'app non costituisce un'autorizzazione né un incoraggiamento a mettersi alla guida. Il risultato fornito dall'app non ha valore legale e non può essere utilizzato per contestare eventuali controlli effettuati dalle autorità competenti.
- **Esclusione di Responsabilità:** L'uso dell'app è a esclusivo rischio dell'utente. Gli sviluppatori declinano ogni responsabilità per danni diretti o indiretti derivanti dall'uso dell'applicazione o dall'affidamento ai risultati da essa forniti.
