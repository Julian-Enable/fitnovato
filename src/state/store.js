// Store de estado de la app.
// Combina localStorage (persistencia local) con sync al backend (cuando hay URL configurada).

import { getApiBase, apiRequest } from "../api/client.js";

const STORE_KEY = "fitnovato-v1";
const AUTH_KEY = "fitnovato-auth-v1";

export const defaultState = {
  active: "inicio",
  onboarded: false,
  onboardingStep: 0,
  selectedDiaryDate: todayISO(),
  selectedWorkoutDay: 1,
  profile: {
    name: "", age: "", sex: "", weight: "", height: "",
    experience: "", goal: "", days: "", minutes: "", place: "",
    limitations: "", activity: "", meals: "", avoid: "",
    preferences: "", budget: "", targetWeight: "", deficit: ""
  },
  diary: [],
  plates: [],
  recipes: [],
  customFoods: [],
  workoutLogs: [],
  cardio: [],
  progress: []
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// --- Auth ---
export function loadAuth() {
  try {
    return {
      users: {}, currentEmail: "", token: "", user: null,
      ...JSON.parse(localStorage.getItem(AUTH_KEY))
    };
  } catch {
    return { users: {}, currentEmail: "", token: "", user: null };
  }
}

export function saveAuth(auth) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
}

export function userStateKey(email = "") {
  return `${STORE_KEY}:user:${email}`;
}

// --- State ---
export function loadState(email = "") {
  try {
    return normalizeState(JSON.parse(localStorage.getItem(userStateKey(email))));
  } catch {
    return structuredClone(defaultState);
  }
}

export function normalizeState(rawState = {}) {
  const source = rawState && typeof rawState === "object" ? rawState : {};
  const merged = { ...structuredClone(defaultState), ...source };
  merged.profile = { ...structuredClone(defaultState.profile), ...(source.profile || {}) };
  merged.selectedDiaryDate = source.selectedDiaryDate || todayISO();
  merged.selectedWorkoutDay = Number(source.selectedWorkoutDay) || 1;
  merged.diary = Array.isArray(source.diary) ? source.diary.map(normalizeDatedEntry) : [];
  merged.cardio = Array.isArray(source.cardio) ? source.cardio.map(normalizeDatedEntry) : [];
  merged.workoutLogs = Array.isArray(source.workoutLogs) ? source.workoutLogs.map(normalizeDatedEntry) : [];
  merged.progress = Array.isArray(source.progress) ? source.progress.map(normalizeIdEntry) : [];
  merged.plates = Array.isArray(source.plates) ? source.plates.map(normalizeIdEntry) : [];
  merged.recipes = Array.isArray(source.recipes) ? source.recipes.map(normalizeIdEntry) : [];
  merged.customFoods = Array.isArray(source.customFoods) ? source.customFoods : [];
  const profile = merged.profile || {};
  // Limpieza de perfil demo heredado
  const looksLikeDemoProfile =
    profile.name === "Valentina" &&
    Number(profile.age) === 28 &&
    Number(profile.weight) === 78 &&
    Number(profile.height) === 165;
  if (looksLikeDemoProfile) {
    merged.profile = structuredClone(defaultState.profile);
    merged.progress = [];
  }
  return merged;
}

function normalizeDatedEntry(entry) {
  const normalized = { ...entry, id: entry.id || crypto.randomUUID() };
  normalized.dateISO = entry.dateISO || parseDateToISO(entry.date) || todayISO();
  return normalized;
}

function normalizeIdEntry(entry) {
  return { ...entry, id: entry.id || crypto.randomUUID() };
}

function parseDateToISO(dateText) {
  if (!dateText) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateText)) return dateText;
  const parts = String(dateText).match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!parts) return "";
  return `${parts[3]}-${parts[2].padStart(2, "0")}-${parts[1].padStart(2, "0")}`;
}

let remoteSaveTimer = null;

export function saveState(auth, state) {
  if (!auth.currentEmail) return;
  localStorage.setItem(userStateKey(auth.currentEmail), JSON.stringify(state));
  scheduleRemoteSave(auth, state);
}

function scheduleRemoteSave(auth, state) {
  if (!getApiBase() || !auth.token) return;
  clearTimeout(remoteSaveTimer);
  remoteSaveTimer = setTimeout(async () => {
    try {
      await apiRequest("/me/state", {
        method: "PUT",
        body: JSON.stringify({ state })
      }, auth.token);
    } catch (error) {
      console.warn("No se pudo sincronizar con el backend", error);
    }
  }, 600);
}

export function currentUser(auth) {
  if (auth.token && auth.user) return auth.user;
  return auth.currentEmail ? auth.users[auth.currentEmail] : null;
}
