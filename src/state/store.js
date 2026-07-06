// Store de estado de la app.
// Combina localStorage (persistencia local) con sync al backend (cuando hay URL configurada).

import { getApiBase, apiRequest } from "../api/client.js";

const STORE_KEY = "fitnovato-v1";
const AUTH_KEY = "fitnovato-auth-v1";

export const defaultState = {
  active: "inicio",
  onboarded: false,
  onboardingStep: 0,
  profile: {
    name: "", age: "", sex: "", weight: "", height: "",
    experience: "", goal: "", days: "", minutes: "", place: "",
    limitations: "", activity: "", meals: "", avoid: "",
    preferences: "", budget: "", targetWeight: "", deficit: ""
  },
  diary: [],
  plates: [],
  recipes: [],
  workoutLogs: [],
  cardio: [],
  progress: []
};

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
  const merged = { ...structuredClone(defaultState), ...rawState };
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
