// Entry point de FitNovato v2.
// Arquitectura modular con Vite. Estética Apple Health.

import "./styles.css";
import { loadAuth, saveAuth, loadState, saveState, currentUser, userStateKey, defaultState } from "./state/store.js";
import { apiRequest, getApiBase } from "./api/client.js";
import { renderTopBar, renderMobileTabs, bindNav } from "./components/nav.js";
import { toast } from "./components/toast.js";

import * as authView from "./views/auth.js";
import * as homeView from "./views/home.js";
import * as profileView from "./views/profile.js";
import * as caloriesView from "./views/calories.js";
import * as foodView from "./views/food.js";
import * as plateView from "./views/plate.js";
import * as recipesView from "./views/recipes.js";
import * as marketView from "./views/market.js";
import * as routineView from "./views/routine.js";
import * as workoutView from "./views/workout.js";
import * as exercisesView from "./views/exercises.js";
import * as cardioView from "./views/cardio.js";
import * as progressView from "./views/progress.js";
import * as adjustmentsView from "./views/adjustments.js";
import * as learnView from "./views/learn.js";
import * as configView from "./views/config.js";

const ROUTES = {
  inicio: homeView,
  perfil: profileView,
  calorias: caloriesView,
  alimentacion: foodView,
  plato: plateView,
  recetas: recipesView,
  mercado: marketView,
  rutina: routineView,
  entrenamiento: workoutView,
  ejercicios: exercisesView,
  cardio: cardioView,
  progreso: progressView,
  ajustes: adjustmentsView,
  aprende: learnView,
  config: configView
};

// --- Estado global ---
let auth = loadAuth();
let state = auth.currentEmail ? loadState(auth.currentEmail) : structuredClone(defaultState);

// --- API pública para las vistas ---
const ctx = {
  get auth() { return auth; },
  get state() { return state; },
  set state(v) { state = v; },
  get defaultState() { return defaultState; },
  currentUser: () => currentUser(auth),
  userStateKey: () => userStateKey(auth.currentEmail),
  save: () => saveState(auth, state),
  saveAuth: () => saveAuth(auth),
  apiRequest,
  render: renderApp,
  logout: () => {
    auth.currentEmail = "";
    auth.token = "";
    auth.user = null;
    saveAuth(auth);
    state = structuredClone(defaultState);
    toast.info("Sesión cerrada");
    renderApp();
  }
};

// --- Renderizado principal ---
function renderApp() {
  const app = document.querySelector("#app");
  const user = currentUser(auth);

  if (!user) {
    app.innerHTML = authView.render();
    authView.bind({
      auth,
      api: { apiRequest, saveAuth },
      defaultState,
      onSuccess: async (overrideState) => {
        if (overrideState && typeof overrideState === "object") {
          state = { ...structuredClone(defaultState), ...overrideState };
        } else {
          state = loadState(auth.currentEmail);
        }
        // Guardar estado localmente también (para modo backend)
        if (getApiBase() && auth.currentEmail) {
          localStorage.setItem(userStateKey(auth.currentEmail), JSON.stringify(state));
        }
        saveAuth(auth);
        renderApp();
      }
    });
    return;
  }

  // Layout con top bar (desktop) + mobile tabs
  app.innerHTML = `
    <div class="app-layout">
      ${renderTopBar(user, state.active)}
      <main class="app-main" id="view" aria-live="polite"></main>
      ${renderMobileTabs(state.active)}
    </div>`;

  bindNav(navigate, ctx.logout);

  const view = document.querySelector("#view");
  const routeHandler = ROUTES[state.active] || homeView;
  view.innerHTML = routeHandler.render(state, user);
  // Bind global (data-goto, etc.) + bind específico de la vista
  bindGlobalNav();
  if (routeHandler.bind) routeHandler.bind(ctx);
}

function navigate(viewId) {
  if (!ROUTES[viewId]) viewId = "inicio";
  state.active = viewId;
  saveState(auth, state);
  renderApp();
  // Scroll to top
  document.querySelector("#view")?.scrollTo({ top: 0, behavior: "smooth" });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindGlobalNav() {
  document.querySelectorAll("[data-goto]").forEach(btn => {
    btn.addEventListener("click", () => navigate(btn.dataset.goto));
  });
}

// --- Boot ---
renderApp();
