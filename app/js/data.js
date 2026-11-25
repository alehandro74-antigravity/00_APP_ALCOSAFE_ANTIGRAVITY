// Dati ufficiali: Osservatorio Nazionale Alcol CNESPS / Ministero della Salute (D.L. 117/2007 conv. L. 160/2007)
// Sanzioni aggiornate: Art. 186 Codice della Strada (aggiornamento 2024)

export const DRINKS = [
  { id: 'birra_analcolica', name: 'Birra Analcolica', abv: 0.5, refCc: 330, category: 'Birre', icon: '🍺' },
  { id: 'birra_leggera', name: 'Birra Leggera', abv: 3.5, refCc: 330, category: 'Birre', icon: '🍺' },
  { id: 'birra_normale', name: 'Birra Normale', abv: 5.0, refCc: 330, category: 'Birre', icon: '🍺' },
  { id: 'birra_speciale', name: 'Birra Speciale', abv: 8.0, refCc: 330, category: 'Birre', icon: '🍻' },
  { id: 'birra_doppio_malto', name: 'Birra Doppio Malto', abv: 10.0, refCc: 330, category: 'Birre', icon: '🍻' },
  { id: 'vino', name: 'Vino', abv: 12.0, refCc: 125, category: 'Vini & Bollicine', icon: '🍷' },
  { id: 'champagne_spumante', name: 'Champagne / Spumante', abv: 11.0, refCc: 100, category: 'Vini & Bollicine', icon: '🥂' },
  { id: 'vino_liquoroso', name: 'Vino Liquoroso / Aperitivo', abv: 18.0, refCc: 80, category: 'Vini & Bollicine', icon: '🍹' },
  { id: 'ready_to_drink_2_8', name: 'Ready to Drink 2,8°', abv: 2.8, refCc: 150, category: 'Ready to Drink', icon: '🥤' },
  { id: 'ready_to_drink_5', name: 'Ready to Drink 5°', abv: 5.0, refCc: 150, category: 'Ready to Drink', icon: '🥤' },
  { id: 'digestivo_25', name: 'Digestivo 25°', abv: 25.0, refCc: 40, category: 'Digestivi & Superalcolici', icon: '🥃' },
  { id: 'digestivo_30', name: 'Digestivo 30°', abv: 30.0, refCc: 40, category: 'Digestivi & Superalcolici', icon: '🥃' },
  { id: 'superalcolico_35', name: 'Superalcolico 35°', abv: 35.0, refCc: 40, category: 'Digestivi & Superalcolici', icon: '🍸' },
  { id: 'superalcolico_45', name: 'Superalcolico 45°', abv: 45.0, refCc: 40, category: 'Digestivi & Superalcolici', icon: '🍸' },
  { id: 'superalcolico_60', name: 'Superalcolico 60°', abv: 60.0, refCc: 40, category: 'Digestivi & Superalcolici', icon: '🔥' }
];

export const WEIGHT_BRACKETS = {
  UOMO: [55, 65, 70, 75, 80, 90],
  DONNA: [45, 55, 60, 65, 75, 80]
};

// Valori in g/L per 1 unità alcolica di riferimento
export const MINISTERIAL_TABLES = {
  DONNA: {
    VUOTO: {
      birra_analcolica:   [0.06, 0.05, 0.04, 0.04, 0.03, 0.03],
      birra_leggera:      [0.39, 0.32, 0.29, 0.27, 0.24, 0.22],
      birra_normale:      [0.56, 0.46, 0.42, 0.39, 0.34, 0.32],
      birra_speciale:     [0.90, 0.73, 0.67, 0.62, 0.54, 0.50],
      birra_doppio_malto: [1.12, 0.92, 0.84, 0.78, 0.67, 0.63],
      vino:               [0.51, 0.42, 0.38, 0.35, 0.31, 0.29],
      vino_liquoroso:     [0.49, 0.40, 0.37, 0.34, 0.29, 0.28],
      digestivo_25:       [0.32, 0.26, 0.24, 0.22, 0.19, 0.18],
      digestivo_30:       [0.39, 0.32, 0.29, 0.27, 0.23, 0.22],
      superalcolico_35:   [0.45, 0.37, 0.34, 0.31, 0.27, 0.25],
      superalcolico_45:   [0.58, 0.47, 0.43, 0.40, 0.35, 0.33],
      superalcolico_60:   [0.77, 0.63, 0.58, 0.53, 0.46, 0.43],
      champagne_spumante: [0.37, 0.31, 0.28, 0.26, 0.22, 0.21],
      ready_to_drink_2_8: [0.12, 0.10, 0.09, 0.08, 0.07, 0.07],
      ready_to_drink_5:   [0.24, 0.20, 0.18, 0.17, 0.17, 0.14]
    },
    PIENO: {
      birra_analcolica:   [0.03, 0.03, 0.02, 0.02, 0.02, 0.02],
      birra_leggera:      [0.23, 0.19, 0.17, 0.16, 0.14, 0.13],
      birra_normale:      [0.32, 0.26, 0.24, 0.22, 0.19, 0.18],
      birra_speciale:     [0.52, 0.42, 0.39, 0.36, 0.31, 0.29],
      birra_doppio_malto: [0.65, 0.53, 0.48, 0.45, 0.39, 0.36],
      vino:               [0.29, 0.24, 0.22, 0.20, 0.18, 0.17],
      vino_liquoroso:     [0.28, 0.23, 0.21, 0.20, 0.17, 0.16],
      digestivo_25:       [0.20, 0.16, 0.15, 0.14, 0.12, 0.11],
      digestivo_30:       [0.24, 0.19, 0.18, 0.16, 0.14, 0.13],
      superalcolico_35:   [0.27, 0.22, 0.21, 0.19, 0.16, 0.15],
      superalcolico_45:   [0.35, 0.29, 0.26, 0.24, 0.21, 0.20],
      superalcolico_60:   [0.47, 0.38, 0.35, 0.33, 0.28, 0.26],
      champagne_spumante: [0.22, 0.18, 0.16, 0.15, 0.13, 0.12],
      ready_to_drink_2_8: [0.07, 0.06, 0.06, 0.05, 0.04, 0.04],
      ready_to_drink_5:   [0.15, 0.12, 0.11, 0.10, 0.09, 0.08]
    }
  },
  UOMO: {
    VUOTO: {
      birra_analcolica:   [0.04, 0.03, 0.03, 0.01, 0.01, 0.01],
      birra_leggera:      [0.25, 0.21, 0.19, 0.18, 0.17, 0.15],
      birra_normale:      [0.35, 0.30, 0.28, 0.26, 0.24, 0.22],
      birra_speciale:     [0.56, 0.48, 0.44, 0.41, 0.39, 0.35],
      birra_doppio_malto: [0.71, 0.60, 0.55, 0.52, 0.49, 0.43],
      vino:               [0.32, 0.27, 0.25, 0.24, 0.22, 0.20],
      vino_liquoroso:     [0.31, 0.26, 0.24, 0.23, 0.21, 0.19],
      digestivo_25:       [0.20, 0.17, 0.16, 0.15, 0.15, 0.12],
      digestivo_30:       [0.24, 0.21, 0.19, 0.18, 0.18, 0.15],
      superalcolico_35:   [0.28, 0.24, 0.22, 0.21, 0.19, 0.17],
      superalcolico_45:   [0.36, 0.31, 0.29, 0.27, 0.25, 0.22],
      superalcolico_60:   [0.48, 0.41, 0.38, 0.36, 0.33, 0.30],
      champagne_spumante: [0.24, 0.19, 0.18, 0.17, 0.16, 0.14],
      ready_to_drink_2_8: [0.08, 0.06, 0.06, 0.06, 0.05, 0.05],
      ready_to_drink_5:   [0.15, 0.13, 0.12, 0.11, 0.10, 0.09]
    },
    PIENO: {
      birra_analcolica:   [0.02, 0.02, 0.02, 0.01, 0.01, 0.01],
      birra_leggera:      [0.14, 0.12, 0.11, 0.10, 0.10, 0.09],
      birra_normale:      [0.20, 0.17, 0.16, 0.15, 0.14, 0.12],
      birra_speciale:     [0.33, 0.28, 0.26, 0.24, 0.22, 0.20],
      birra_doppio_malto: [0.41, 0.34, 0.32, 0.30, 0.28, 0.25],
      vino:               [0.18, 0.16, 0.15, 0.14, 0.13, 0.11],
      vino_liquoroso:     [0.18, 0.15, 0.14, 0.13, 0.12, 0.11],
      digestivo_25:       [0.12, 0.10, 0.10, 0.09, 0.08, 0.08],
      digestivo_30:       [0.15, 0.13, 0.12, 0.11, 0.10, 0.09],
      superalcolico_35:   [0.17, 0.15, 0.14, 0.13, 0.12, 0.11],
      superalcolico_45:   [0.22, 0.19, 0.17, 0.16, 0.15, 0.14],
      superalcolico_60:   [0.30, 0.25, 0.23, 0.22, 0.20, 0.18],
      champagne_spumante: [0.14, 0.11, 0.11, 0.10, 0.09, 0.08],
      ready_to_drink_2_8: [0.05, 0.04, 0.04, 0.03, 0.03, 0.03],
      ready_to_drink_5:   [0.09, 0.08, 0.07, 0.07, 0.06, 0.06]
    }
  }
};

export const SYMPTOMS_TABLE = [
  {
    min: 0,
    max: 0.09,
    label: '0 g/L',
    sensations: 'Nessuna alterazione rilevante.',
    effects: 'Nessuna compromissione.'
  },
  {
    min: 0.1,
    max: 0.29,
    label: '0,1 – 0,2 g/L',
    sensations: 'Iniziale sensazione di ebbrezza. Iniziale riduzione delle inibizioni e del controllo.',
    effects: 'Affievolimento della vigilanza, attenzione e controllo. Iniziale riduzione del coordinamento motorio e della visione laterale. Possibile nausea.'
  },
  {
    min: 0.3,
    max: 0.49,
    label: '0,3 – 0,4 g/L',
    sensations: 'Sensazione di ebbrezza. Riduzione delle inibizioni, del controllo e della percezione del rischio.',
    effects: 'Riduzione delle capacità di vigilanza, attenzione, controllo, coordinamento motorio, riflessi e visione laterale. Possibile vomito.'
  },
  {
    min: 0.5,
    max: 0.89,
    label: '0,5 – 0,8 g/L · Oltre limite legale',
    sensations: 'Cambiamenti dell’umore, nausea, sonnolenza, stato di eccitazione emotiva.',
    effects: 'Riduzione della capacità di giudizio e di individuare oggetti in movimento; riflessi alterati; reazione alterata a stimoli sonori e luminosi.'
  },
  {
    min: 0.9,
    max: 1.59,
    label: '0,9 – 1,5 g/L',
    sensations: 'Alterazione dell’umore (rabbia, tristezza), confusione mentale e disorientamento.',
    effects: 'Compromissione di giudizio e autocontrollo, linguaggio mal articolato, perdita di equilibrio e alterazione della percezione visiva.'
  },
  {
    min: 1.6,
    max: 3.09,
    label: '1,6 – 3,0 g/L',
    sensations: 'Stordimento, aggressività, stato depressivo, apatia, letargia.',
    effects: 'Compromissione grave dello stato psicofisico, difficoltà marcata a stare in piedi o camminare, inerzia generale, ipotermia.'
  },
  {
    min: 3.1,
    max: 4.0,
    label: '3,1 – 4,0 g/L',
    sensations: 'Stato di incoscienza.',
    effects: 'Allucinazioni, cessazione dei riflessi, incontinenza, rischio coma e soffocamento.'
  },
  {
    min: 4.01,
    max: Infinity,
    label: 'Oltre 4,0 g/L',
    sensations: 'Difficoltà respiratoria, sensazione di soffocamento.',
    effects: 'Battito cardiaco rallentato, coma, rischio morte per arresto respiratorio.'
  }
];

export const ALERTS = {
  VERDE: {
    level: 'VERDE',
    title: 'Entro il limite legale stimato',
    message: 'La stima del tuo livello di alcol nel sangue (stando ai dati inseriti e alle tabelle ministeriali) rientra sotto il limite legale. Ricorda comunque che non esistono livelli di consumo alcolico sicuri al 100% alla guida.',
    penalties: []
  },
  NEOPATENTATO: {
    level: 'ROSSO',
    title: 'DIVIETO DI GUIDA (Neopatentato / Under 21 — Limite 0,0 g/L)',
    message: 'Per neopatentati (primi 3 anni) e minori di 21 anni il limite legale è ZERO (0,0 g/L). Non puoi metterti alla guida finché il tasso stimato non torna a zero.',
    penalties: [
      'Tolleranza zero: qualsiasi valore superiore a 0,0 g/L comporta sanzioni aggravate secondo l’Art. 186-bis CdS.'
    ]
  },
  GIALLO: {
    level: 'GIALLO',
    title: 'NON METTERTI ALLA GUIDA! (0,5 – 0,8 g/L)',
    message: 'La stima supera il limite legale di 0,5 g/L. Attendi lo smaltimento prima di guidare o usa un’alternativa sicura.',
    penalties: [
      'Art. 186 CdS — Sanzione amministrativa: multa da 543 a 2.170 euro',
      'Sospensione della patente: da 3 a 6 mesi'
    ]
  },
  ARANCIO: {
    level: 'ARANCIO',
    title: 'NON METTERTI ALLA GUIDA! (0,8 – 1,5 g/L)',
    message: 'Stato di ebbrezza con rilevanza penale. Non metterti assolutamente alla guida.',
    penalties: [
      'Art. 186 CdS — Ammenda: da 800 a 3.200 euro',
      'Arresto: fino a 6 mesi',
      'Sospensione della patente: da 6 mesi a 1 anno'
    ]
  },
  ROSSO: {
    level: 'ROSSO',
    title: 'PERICOLO GRAVE — NON GUIDARE! (> 1,5 g/L)',
    message: 'Livello alcolemico molto elevato. Non guidare in alcun caso e presta attenzione alle tue condizioni fisiche.',
    penalties: [
      'Art. 186 CdS — Ammenda: da 1.500 a 6.000 euro',
      'Arresto: da 6 mesi a 1 anno',
      'Sospensione della patente: da 1 a 2 anni',
      'Confisca del veicolo (se di proprietà del conducente)'
    ]
  }
};
