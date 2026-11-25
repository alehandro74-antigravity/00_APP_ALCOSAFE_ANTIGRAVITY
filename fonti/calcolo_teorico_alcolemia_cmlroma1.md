# Il calcolo teorico dell'alcolemia (CML Roma 1 - Adesso Basta)

- **Fonte:** https://www.cmlroma1-adessobasta.it/come-funziona/il-calcolo-teorico-dellalcolemia/
- **Aggiornato il:** 18 Febbraio 2021

## Contesto normativo e scientifico

In quasi tutti gli ordinamenti legali dei paesi civilizzati, per una questione di sicurezza, sono state poste restrizioni alla conduzione di autoveicoli in stato di ebbrezza.

I sintomi dell'ebbrezza alcolica si manifestano quando nel sangue è presente una certa quantità di alcol: per questo l'alcolemia è utilizzata come unità di misura nella valutazione scientifica dell'ebbrezza alcolica, spesso in ambito medico-legale. La parola "alcolemia" significa alcolicità del sangue, quantità di alcol presente nel sangue (*Blood Alcohol Content*, BAC).

Nel 2007 il Ministero della Salute (in rispetto del D.L. 106/07, art. 6, c. 4 / D.L. 3 agosto 2007 n. 117 conv. in L. 160/2007) ha messo a disposizione una tabella che fornisce indicazioni sulla stima dell'alcolemia in base alla quantità di alcolici consumati.

La tabella è costruita intorno alle nozioni della comunità scientifica sull'alcolemia, sviluppate a partire dagli studi dello scienziato svedese **Erik Widmark** (1932, *Die theoretischen Grundlagen und die praktische Verwendbarkeit der gerichtlich-medizinischen Alkoholbestimmung*).

---

## L'equazione di Widmark

> **Nota bene:** L'alcol è un composto chimico puro, propriamente detto alcol etilico o etanolo. La quantità di etanolo nel sangue è di norma misurata in **peso/volume**. Una misurazione in volume/volume non è utile a stabilire la quantità di etanolo nel sangue, perché non tiene conto della differenza di peso specifico tra etanolo e sangue, rispettivamente **0,789** e **1,055** rispetto al peso/volume dell'acqua distillata a 0 °C.

### Variabili e costanti dell'equazione

L'equazione si compone di **cinque variabili** e **due costanti**:

- **Peso corporeo** ($\text{kg}$)
- **Coefficiente di diffusione** ($\text{L/kg}$):
  - Uomini: `0,68`
  - Donne: `0,55`
- **Alcolemia** ($\text{kg/L}$, oppure espressa in $\text{g/L}$)
- **Tasso di eliminazione dell'etanolo** ($\text{kg/L/ora}$):
  - Uomini: `0,00015` (equivale a `0,15 g/L/ora`)
  - Donne: `0,00017` (equivale a `0,17 g/L/ora`)
- **Tempo trascorso dall'assunzione** ($\text{ore}$)
- **Numero di bevande consumate** ($\text{numero}$)
- **Volume di etanolo nella bevanda** ($\text{L}$)

La logica dell'equazione mette in relazione quantità di etanolo assunta e modalità di assunzione con quantità di sangue nel corpo e modalità di assorbimento: per conoscere una delle cinque variabili è necessario conoscere le altre quattro.

---

## Limiti del calcolo teorico dell'alcolemia

- **Variabilità individuale:** Ogni persona reagisce in maniera diversa all'etanolo in base a condizioni di salute, età, corporatura, abitudine al consumo e altri fattori psicofisici.
- **Stomaco pieno / stomaco vuoto:** I dati riportati nella tabella proposta dal Ministero considerano un'ulteriore variabile oltre a quelle dell'equazione di Widmark: l'assunzione a stomaco pieno o a stomaco vuoto. La digestione rallenta l'assorbimento dell'alcol ma non influisce sulla quantità totale assorbita. La tabella ministeriale si riferisce a un'assunzione avvenuta nell'arco di circa **60–100 minuti**. I calcoli basati sull'equazione di Widmark pura non prevedono variabili legate alla digestione.
- **Tempo trascorso dall'assunzione:** L'equazione di Widmark utilizza le **ore** come unità di misura. L'etanolo inizia a entrare in circolo nell'arco di minuti, ma i sintomi dell'ebbrezza si manifestano in maniera graduale.

---

## Esempi applicativi (casi d'uso dell'equazione)

1. **Quanto alcol posso assumere prima di raggiungere una certa alcolemia?**
   - Ricerca: volume di etanolo assunto.
   - Dati esempio: peso corporeo = `80 kg`; coefficiente di diffusione = `0,68 L/kg`; alcolemia = `0,00049 kg/L` (`0,49 g/L`); tasso di eliminazione = `0,00015 kg/L/ora`; tempo = `1 ora`; numero di bevande = `1`.

2. **Quanto sarà la mia alcolemia se ho bevuto una certa quantità di alcol?**
   - Ricerca: alcolemia.
   - Dati esempio: peso corporeo = `80 kg`; coefficiente di diffusione = `0,68 L/kg`; tasso di eliminazione = `0,00015 kg/L/ora`; tempo = `1 ora`; numero di bevande = `1`; volume di etanolo = `0,035 L`.

3. **Quanto devo aspettare perché la mia alcolemia scenda sotto un certo livello, se ho bevuto una certa quantità di alcol?**
   - Ricerca: tempo trascorso dall'assunzione.
   - Dati esempio: peso corporeo = `80 kg`; coefficiente di diffusione = `0,68 L/kg`; alcolemia = `0,00049 kg/L` (`0,49 g/L`); tasso di eliminazione = `0,00015 kg/L/ora`; numero di bevande = `1`; volume di etanolo = `0,072 L`.

4. **Quanto alcol riesco a smaltire in un dato periodo di tempo, se ho una certa alcolemia?**
   - Variante dell'esempio 1 per la completa eliminazione (`alcolemia = 0 kg/L`).
   - Dati esempio: peso corporeo = `80 kg`; coefficiente di diffusione = `0,68 L/kg`; alcolemia = `0 kg/L`; tasso di eliminazione = `0,00015 kg/L/ora`; tempo = `5 ore`; numero di bevande = `1`.

5. **Quanto alcol ho bevuto se ho una certa alcolemia?**
   - Variante dell'esempio 1 per stimare la quantità assunta nota l'alcolemia.
   - Dati esempio: peso corporeo = `80 kg`; coefficiente di diffusione = `0,68 L/kg`; alcolemia = `0,002 kg/L` (`2 g/L`); tasso di eliminazione = `0,00015 kg/L/ora`; tempo = `1 ora`; numero di bevande = `1`.
