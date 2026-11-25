import { DRINKS } from './data.js';
import {
  calculateDrinkContribution,
  calculateSessionState,
  formatDuration,
  formatClockTime
} from './calculator.js';

const STORAGE_KEYS = {
  PROFILE: 'alcosafe_profile_v1',
  SESSION: 'alcosafe_session_v1',
  HISTORY: 'alcosafe_history_v1',
  DISCLAIMER: 'alcosafe_disclaimer_v1'
};

const DEFAULT_PROFILE = {
  gender: 'UOMO',
  weight: 75,
  stomach: 'PIENO',
  isNovice: false
};

let profile = loadJson(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
let sessionEntries = loadJson(STORAGE_KEYS.SESSION, []);
let historyRecords = loadJson(STORAGE_KEYS.HISTORY, []);
let activeDrinkId = null;

// --- DOM Refs ---
const statusCard = document.getElementById('status-card');
const alertBadge = document.getElementById('alert-badge');
const limitPill = document.getElementById('limit-pill');
const bacNumber = document.getElementById('bac-number');
const alertTitle = document.getElementById('alert-title');
const cdLimitLabel = document.getElementById('cd-limit-label');
const cdLimitTime = document.getElementById('cd-limit-time');
const cdLimitClock = document.getElementById('cd-limit-clock');
const cdZeroTime = document.getElementById('cd-zero-time');
const cdZeroClock = document.getElementById('cd-zero-clock');
const totalGramsEl = document.getElementById('total-grams');
const totalUnitsEl = document.getElementById('total-units');
const alertMessageEl = document.getElementById('alert-message');
const alertPenaltiesEl = document.getElementById('alert-penalties');

const symptomsCard = document.getElementById('symptoms-card');
const symptomsRange = document.getElementById('symptoms-range');
const symptomsSensations = document.getElementById('symptoms-sensations');
const symptomsEffects = document.getElementById('symptoms-effects');

const inputWeight = document.getElementById('input-weight');
const inputNovice = document.getElementById('input-novice');
const profileSummary = document.getElementById('profile-summary');
const drinkCategoriesEl = document.getElementById('drink-categories');
const sessionListEl = document.getElementById('session-list');
const btnSaveSession = document.getElementById('btn-save-session');
const btnClearSession = document.getElementById('btn-clear-session');

const historyListEl = document.getElementById('history-list');
const statToday = document.getElementById('stat-today');
const statWeek = document.getElementById('stat-week');
const statMonth = document.getElementById('stat-month');
const statZeroDays = document.getElementById('stat-zero-days');

const drinkModal = document.getElementById('drink-modal');
const modalDrinkTitle = document.getElementById('modal-drink-title');
const modalDrinkSubtitle = document.getElementById('modal-drink-subtitle');
const modalCc = document.getElementById('modal-cc');
const modalTime = document.getElementById('modal-time');
const modalPreviewBac = document.getElementById('modal-preview-bac');

const disclaimerModal = document.getElementById('disclaimer-modal');

// --- Init ---
function init() {
  registerServiceWorker();
  bindProfileControls();
  renderDrinkCategories();
  bindNavigation();
  bindModals();
  bindSessionActions();
  bindHistoryActions();

  syncProfileUI();
  renderAll();

  if (!localStorage.getItem(STORAGE_KEYS.DISCLAIMER)) {
    disclaimerModal.classList.remove('hidden');
  }

  // Aggiorna automaticamente ogni 30 secondi per il conto alla rovescia live
  setInterval(renderDashboard, 30000);
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
}

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function formatItNumber(num, decimals = 2) {
  return num.toFixed(decimals).replace('.', ',');
}

// --- Profile ---
function bindProfileControls() {
  document.querySelectorAll('#seg-gender .seg-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      profile.gender = btn.dataset.value;
      saveJson(STORAGE_KEYS.PROFILE, profile);
      syncProfileUI();
      renderAll();
    });
  });

  document.querySelectorAll('#seg-stomach .seg-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      profile.stomach = btn.dataset.value;
      saveJson(STORAGE_KEYS.PROFILE, profile);
      syncProfileUI();
      renderAll();
    });
  });

  inputWeight.addEventListener('input', () => {
    const val = parseFloat(inputWeight.value);
    if (!Number.isNaN(val) && val >= 30 && val <= 250) {
      profile.weight = val;
      saveJson(STORAGE_KEYS.PROFILE, profile);
      syncProfileUI();
      renderAll();
    }
  });

  inputNovice.addEventListener('change', () => {
    profile.isNovice = inputNovice.checked;
    saveJson(STORAGE_KEYS.PROFILE, profile);
    syncProfileUI();
    renderAll();
  });
}

function syncProfileUI() {
  document.querySelectorAll('#seg-gender .seg-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.value === profile.gender);
  });
  document.querySelectorAll('#seg-stomach .seg-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.value === profile.stomach);
  });
  inputWeight.value = profile.weight;
  inputNovice.checked = Boolean(profile.isNovice);

  const gLabel = profile.gender === 'DONNA' ? 'Donna' : 'Uomo';
  const sLabel = profile.stomach === 'VUOTO' ? 'Stomaco vuoto' : 'Stomaco pieno';
  profileSummary.textContent = `${gLabel} · ${profile.weight} kg · ${sLabel}`;
}

// --- Drinks Catalog ---
function renderDrinkCategories() {
  const categories = [...new Set(DRINKS.map((d) => d.category))];
  drinkCategoriesEl.innerHTML = '';

  for (const cat of categories) {
    const group = document.createElement('div');
    const title = document.createElement('h3');
    title.className = 'cat-title';
    title.textContent = cat;
    group.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'drink-grid';

    DRINKS.filter((d) => d.category === cat).forEach((drink) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'drink-btn';
      btn.innerHTML = `
        <span class="drink-icon">${drink.icon}</span>
        <span class="drink-info">
          <strong>${drink.name}</strong>
          <small>${formatItNumber(drink.abv, 1)}% · std ${drink.refCc} cc</small>
        </span>
      `;
      btn.addEventListener('click', () => openDrinkModal(drink));
      grid.appendChild(btn);
    });

    group.appendChild(grid);
    drinkCategoriesEl.appendChild(group);
  }
}

// --- Drink Modal ---
function openDrinkModal(drink) {
  activeDrinkId = drink.id;
  modalDrinkTitle.textContent = `${drink.icon} ${drink.name}`;
  modalDrinkSubtitle.textContent = `Gradazione ${formatItNumber(drink.abv, 1)}% · 1 unità standard = ${drink.refCc} cc`;

  modalCc.value = drink.refCc;
  const now = new Date();
  modalTime.value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  document.querySelectorAll('#dose-presets .preset-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.mult === '1');
  });

  updateModalPreview();
  drinkModal.classList.remove('hidden');
}

function updateModalPreview() {
  if (!activeDrinkId) return;
  const cc = parseFloat(modalCc.value) || 0;
  const contrib = calculateDrinkContribution(profile, activeDrinkId, cc);
  modalPreviewBac.textContent = `+${formatItNumber(contrib.bac, 2)} g/L`;
}

function bindModals() {
  document.querySelectorAll('#dose-presets .preset-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const drink = DRINKS.find((d) => d.id === activeDrinkId);
      if (!drink) return;
      document.querySelectorAll('#dose-presets .preset-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      modalCc.value = Math.round(drink.refCc * parseFloat(btn.dataset.mult));
      updateModalPreview();
    });
  });

  modalCc.addEventListener('input', updateModalPreview);

  document.getElementById('btn-close-drink-modal').addEventListener('click', () => {
    drinkModal.classList.add('hidden');
  });
  drinkModal.querySelector('.modal-backdrop').addEventListener('click', () => {
    drinkModal.classList.add('hidden');
  });

  document.getElementById('btn-confirm-drink').addEventListener('click', () => {
    const cc = parseFloat(modalCc.value);
    if (!activeDrinkId || Number.isNaN(cc) || cc <= 0) return;

    const ts = parseTimeToTimestamp(modalTime.value);
    sessionEntries.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      drinkId: activeDrinkId,
      cc,
      timestamp: ts
    });

    saveJson(STORAGE_KEYS.SESSION, sessionEntries);
    drinkModal.classList.add('hidden');
    renderAll();
  });

  document.getElementById('btn-open-disclaimer').addEventListener('click', () => {
    disclaimerModal.classList.remove('hidden');
  });
  document.getElementById('btn-accept-disclaimer').addEventListener('click', () => {
    localStorage.setItem(STORAGE_KEYS.DISCLAIMER, 'accepted');
    disclaimerModal.classList.add('hidden');
  });
}

function parseTimeToTimestamp(timeStr) {
  const now = new Date();
  if (!timeStr || !timeStr.includes(':')) return now.getTime();
  const [hh, mm] = timeStr.split(':').map(Number);
  const target = new Date(now);
  target.setHours(hh, mm, 0, 0);
  // Se l'orario inserito è oltre 2 ore nel futuro, si assume sia della sera precedente
  if (target.getTime() - now.getTime() > 2 * 3600000) {
    target.setDate(target.getDate() - 1);
  }
  return target.getTime();
}

// --- Render Dashboard & Session ---
function renderAll() {
  renderDashboard();
  renderSessionList();
  renderHistory();
}

function renderDashboard() {
  const state = calculateSessionState(profile, sessionEntries, Date.now());

  statusCard.className = `card status-card status-${state.alert.level.toLowerCase()}`;
  alertBadge.textContent = state.alert.level;
  limitPill.textContent = `Limite: ${formatItNumber(state.legalLimit, 2)} g/L`;
  bacNumber.textContent = formatItNumber(state.currentBac, 2);
  alertTitle.textContent = state.alert.title;
  alertMessageEl.textContent = state.alert.message;

  alertPenaltiesEl.innerHTML = '';
  state.alert.penalties.forEach((p) => {
    const li = document.createElement('li');
    li.textContent = p;
    alertPenaltiesEl.appendChild(li);
  });

  cdLimitLabel.textContent = profile.isNovice
    ? 'Rientro a 0,00 g/L'
    : 'Rientro sotto 0,50 g/L';

  if (state.hoursToLimit <= 0) {
    cdLimitTime.textContent = 'Pronto';
    cdLimitClock.textContent = 'Entro il limite stimato';
  } else {
    cdLimitTime.textContent = formatDuration(state.hoursToLimit);
    cdLimitClock.textContent = `Dalle ore ${formatClockTime(state.readyAtLimitMs)} circa`;
  }

  if (state.hoursToZero <= 0) {
    cdZeroTime.textContent = '0 min';
    cdZeroClock.textContent = 'Alcol smaltito';
  } else {
    cdZeroTime.textContent = formatDuration(state.hoursToZero);
    cdZeroClock.textContent = `Alle ore ${formatClockTime(state.readyAtZeroMs)} circa`;
  }

  totalGramsEl.textContent = `${formatItNumber(state.totalGrams, 1)} g`;
  totalUnitsEl.textContent = `${formatItNumber(state.totalUnits, 2)} UA`;

  if (state.currentBac >= 0.05) {
    symptomsCard.classList.remove('hidden');
    symptomsRange.textContent = state.symptoms.label;
    symptomsSensations.textContent = state.symptoms.sensations;
    symptomsEffects.textContent = state.symptoms.effects;
  } else {
    symptomsCard.classList.add('hidden');
  }
}

function renderSessionList() {
  const hasItems = sessionEntries.length > 0;
  btnSaveSession.disabled = !hasItems;
  btnClearSession.disabled = !hasItems;

  if (!hasItems) {
    sessionListEl.innerHTML = '<p class="empty-state">Nessuna bevanda inserita. Tocca una bevanda qui sopra per iniziare.</p>';
    return;
  }

  sessionListEl.innerHTML = '';
  const sorted = [...sessionEntries].sort((a, b) => b.timestamp - a.timestamp);

  for (const entry of sorted) {
    const contrib = calculateDrinkContribution(profile, entry.drinkId, entry.cc);
    if (!contrib.drink) continue;

    const row = document.createElement('div');
    row.className = 'session-item';
    row.innerHTML = `
      <div>
        <strong>${contrib.drink.icon} ${contrib.drink.name}</strong>
        <div class="muted-small">${entry.cc} cc · ore ${formatClockTime(entry.timestamp)} · +${formatItNumber(contrib.bac, 2)} g/L</div>
      </div>
      <button type="button" class="btn-danger" aria-label="Rimuovi">✕</button>
    `;
    row.querySelector('button').addEventListener('click', () => {
      sessionEntries = sessionEntries.filter((e) => e.id !== entry.id);
      saveJson(STORAGE_KEYS.SESSION, sessionEntries);
      renderAll();
    });
    sessionListEl.appendChild(row);
  }
}

function bindSessionActions() {
  btnClearSession.addEventListener('click', () => {
    if (!confirm('Vuoi svuotare le bevande della sessione corrente?')) return;
    sessionEntries = [];
    saveJson(STORAGE_KEYS.SESSION, sessionEntries);
    renderAll();
  });

  btnSaveSession.addEventListener('click', () => {
    if (sessionEntries.length === 0) return;
    const state = calculateSessionState(profile, sessionEntries, Date.now());
    const firstTs = Math.min(...sessionEntries.map((e) => e.timestamp));

    historyRecords.unshift({
      id: `hist-${Date.now()}`,
      timestamp: firstTs,
      dateKey: toDateKey(firstTs),
      peakBac: Number(state.peakBac.toFixed(3)),
      totalGrams: Number(state.totalGrams.toFixed(2)),
      totalUnits: Number(state.totalUnits.toFixed(2)),
      drinksCount: sessionEntries.length,
      alertLevel: state.alert.level
    });

    saveJson(STORAGE_KEYS.HISTORY, historyRecords);
    sessionEntries = [];
    saveJson(STORAGE_KEYS.SESSION, sessionEntries);
    renderAll();
    document.querySelector('.nav-btn[data-tab="tab-storico"]').click();
  });
}

// --- History & Statistics ---
function toDateKey(ms) {
  const d = new Date(ms);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function renderHistory() {
  const now = Date.now();
  const todayKey = toDateKey(now);
  const weekAgo = now - 7 * 86400000;
  const monthAgo = now - 30 * 86400000;

  let uaToday = 0;
  let uaWeek = 0;
  let uaMonth = 0;
  const activeDaysLast30 = new Set();

  for (const r of historyRecords) {
    if (r.dateKey === todayKey) uaToday += r.totalUnits;
    if (r.timestamp >= weekAgo) uaWeek += r.totalUnits;
    if (r.timestamp >= monthAgo) {
      uaMonth += r.totalUnits;
      activeDaysLast30.add(r.dateKey);
    }
  }

  statToday.textContent = `${formatItNumber(uaToday, 1)} UA`;
  statWeek.textContent = `${formatItNumber(uaWeek, 1)} UA`;
  statMonth.textContent = `${formatItNumber(uaMonth, 1)} UA`;
  statZeroDays.textContent = `${Math.max(0, 30 - activeDaysLast30.size)}`;

  if (historyRecords.length === 0) {
    historyListEl.innerHTML = '<p class="empty-state">Nessuna sessione salvata nello storico.</p>';
    return;
  }

  historyListEl.innerHTML = '';
  for (const rec of historyRecords) {
    const d = new Date(rec.timestamp);
    const dateLabel = d.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeLabel = formatClockTime(rec.timestamp);

    const row = document.createElement('div');
    row.className = 'history-item';
    row.innerHTML = `
      <div>
        <strong>${dateLabel} · ${timeLabel}</strong>
        <div class="muted-small">Picco ${formatItNumber(rec.peakBac, 2)} g/L · ${formatItNumber(rec.totalUnits, 2)} UA · ${rec.drinksCount} bevande (${rec.alertLevel})</div>
      </div>
      <button type="button" class="btn-danger" aria-label="Elimina">✕</button>
    `;
    row.querySelector('button').addEventListener('click', () => {
      historyRecords = historyRecords.filter((h) => h.id !== rec.id);
      saveJson(STORAGE_KEYS.HISTORY, historyRecords);
      renderHistory();
    });
    historyListEl.appendChild(row);
  }
}

function bindHistoryActions() {
  document.getElementById('btn-clear-history').addEventListener('click', () => {
    if (historyRecords.length === 0) return;
    if (!confirm('Vuoi eliminare tutto lo storico salvato su questo dispositivo?')) return;
    historyRecords = [];
    saveJson(STORAGE_KEYS.HISTORY, historyRecords);
    renderHistory();
  });

  document.getElementById('btn-export-csv').addEventListener('click', () => {
    if (historyRecords.length === 0) {
      alert('Nessun dato da esportare.');
      return;
    }
    const header = 'Data,Ora,Picco_g_L,Grammi_Alcol,Unita_Alcoliche,Bevande,Allerta\n';
    const rows = historyRecords.map((r) => {
      const d = new Date(r.timestamp);
      return `${d.toLocaleDateString('it-IT')},${formatClockTime(r.timestamp)},${r.peakBac},${r.totalGrams},${r.totalUnits},${r.drinksCount},${r.alertLevel}`;
    });
    const blob = new Blob([header + rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alcosafe-storico-${toDateKey(Date.now())}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  });
}

// --- Navigation ---
function bindNavigation() {
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.tab;
      document.querySelectorAll('.nav-btn').forEach((b) => b.classList.toggle('active', b === btn));
      document.querySelectorAll('.tab-panel').forEach((p) => p.classList.toggle('active', p.id === targetId));
    });
  });
}

init();
