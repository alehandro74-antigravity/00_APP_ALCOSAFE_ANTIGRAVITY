import { DRINKS, WEIGHT_BRACKETS, MINISTERIAL_TABLES, SYMPTOMS_TABLE, ALERTS } from './data.js';

export const ELIMINATION_RATE_PER_HOUR = 0.15; // g/L per ora (approccio prudenziale)
export const ETHANOL_DENSITY = 0.789; // g/mL
export const GRAMS_PER_UNIT = 12; // 1 Unità Alcolica = 12 g di etanolo puro

/**
 * Restituisce il tasso alcolemico (g/L) per 1 unità alcolica di riferimento
 * usando le tabelle ministeriali con gestione prudenziale del peso corporeo.
 */
export function getTableBacPerUnit(gender, stomach, weightKg, drinkId) {
  const safeGender = gender === 'DONNA' ? 'DONNA' : 'UOMO';
  const safeStomach = stomach === 'VUOTO' ? 'VUOTO' : 'PIENO';
  const brackets = WEIGHT_BRACKETS[safeGender];
  const values = MINISTERIAL_TABLES[safeGender][safeStomach][drinkId];

  if (!values) return 0;

  const w = Math.max(30, Number(weightKg) || brackets[0]);

  // Sotto il peso minimo di tabella: scaling inversamente proporzionale (prudenziale)
  if (w <= brackets[0]) {
    return values[0] * (brackets[0] / w);
  }

  // Sopra il peso massimo di tabella: tetto prudenziale all'ultima colonna
  const lastIdx = brackets.length - 1;
  if (w >= brackets[lastIdx]) {
    return values[lastIdx];
  }

  // Interpolazione lineare tra le due fasce di peso adiacenti
  for (let i = 0; i < lastIdx; i++) {
    const wLow = brackets[i];
    const wHigh = brackets[i + 1];
    if (w >= wLow && w <= wHigh) {
      const ratio = (w - wLow) / (wHigh - wLow);
      return values[i] + ratio * (values[i + 1] - values[i]);
    }
  }

  return values[0];
}

/**
 * Calcola il contributo di una singola bevanda (alcolemia teorica, grammi, unità alcoliche).
 */
export function calculateDrinkContribution(profile, drinkId, cc) {
  const drink = DRINKS.find((d) => d.id === drinkId);
  if (!drink || cc <= 0) {
    return { bac: 0, grams: 0, units: 0, drink: null };
  }

  const bacPerUnit = getTableBacPerUnit(profile.gender, profile.stomach, profile.weight, drinkId);
  const bac = bacPerUnit * (cc / drink.refCc);
  const grams = cc * (drink.abv / 100) * ETHANOL_DENSITY;
  const units = grams / GRAMS_PER_UNIT;

  return { bac, grams, units, drink };
}

/**
 * Simula l'andamento cronologico dell'alcolemia nella serata corrente,
 * tenendo conto dello smaltimento tra una bevanda e l'altra.
 */
export function calculateSessionState(profile, entries, nowMs = Date.now()) {
  if (!entries || entries.length === 0) {
    return {
      currentBac: 0,
      peakBac: 0,
      totalGrams: 0,
      totalUnits: 0,
      legalLimit: profile.isNovice ? 0 : 0.5,
      hoursToLimit: 0,
      hoursToZero: 0,
      readyAtLimitMs: nowMs,
      readyAtZeroMs: nowMs,
      alert: ALERTS.VERDE,
      symptoms: SYMPTOMS_TABLE[0]
    };
  }

  const sorted = [...entries].sort((a, b) => a.timestamp - b.timestamp);

  let bac = 0;
  let peakBac = 0;
  let totalGrams = 0;
  let totalUnits = 0;
  let prevTs = sorted[0].timestamp;

  for (const item of sorted) {
    const contrib = calculateDrinkContribution(profile, item.drinkId, item.cc);
    const elapsedHours = Math.max(0, (item.timestamp - prevTs) / 3600000);
    bac = Math.max(0, bac - ELIMINATION_RATE_PER_HOUR * elapsedHours);
    bac += contrib.bac;
    if (bac > peakBac) peakBac = bac;

    totalGrams += contrib.grams;
    totalUnits += contrib.units;
    prevTs = item.timestamp;
  }

  // Smaltimento dall'ultima bevanda fino ad adesso
  const elapsedSinceLast = Math.max(0, (nowMs - prevTs) / 3600000);
  const currentBac = Math.max(0, bac - ELIMINATION_RATE_PER_HOUR * elapsedSinceLast);

  const legalLimit = profile.isNovice ? 0 : 0.5;
  const hoursToLimit = currentBac > legalLimit ? (currentBac - legalLimit) / ELIMINATION_RATE_PER_HOUR : 0;
  const hoursToZero = currentBac > 0 ? currentBac / ELIMINATION_RATE_PER_HOUR : 0;

  const readyAtLimitMs = nowMs + hoursToLimit * 3600000;
  const readyAtZeroMs = nowMs + hoursToZero * 3600000;

  const alert = resolveAlert(currentBac, profile.isNovice);
  const symptoms = resolveSymptoms(currentBac);

  return {
    currentBac,
    peakBac,
    totalGrams,
    totalUnits,
    legalLimit,
    hoursToLimit,
    hoursToZero,
    readyAtLimitMs,
    readyAtZeroMs,
    alert,
    symptoms
  };
}

export function resolveAlert(bac, isNovice) {
  if (isNovice && bac > 0.005) {
    return ALERTS.NEOPATENTATO;
  }
  if (bac < 0.5) return ALERTS.VERDE;
  if (bac <= 0.8) return ALERTS.GIALLO;
  if (bac <= 1.5) return ALERTS.ARANCIO;
  return ALERTS.ROSSO;
}

export function resolveSymptoms(bac) {
  if (bac < 0.1) return SYMPTOMS_TABLE[0];
  if (bac < 0.3) return SYMPTOMS_TABLE[1];
  if (bac < 0.5) return SYMPTOMS_TABLE[2];
  if (bac <= 0.89) return SYMPTOMS_TABLE[3];
  if (bac <= 1.59) return SYMPTOMS_TABLE[4];
  if (bac <= 3.09) return SYMPTOMS_TABLE[5];
  if (bac <= 4.0) return SYMPTOMS_TABLE[6];
  return SYMPTOMS_TABLE[7];
}

export function formatDuration(hours) {
  if (hours <= 0) return '0 min';
  const totalMinutes = Math.ceil(hours * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} h`;
  return `${h} h ${m} min`;
}

export function formatClockTime(ms) {
  const d = new Date(ms);
  return d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
}
