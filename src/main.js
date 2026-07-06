// Entry point de FitNovato v2.
// Arquitectura modular con Vite. Estética Apple Health.

import "./styles.css";
import { loadAuth, saveAuth, loadState, saveState, currentUser, userStateKey, defaultState } from "./state/store.js";
import { apiRequest, getApiBase } from "./api/client.js";
import { renderTopBar, renderMobileTabs, bindNav } from "./components/nav.js";
import { toast } from "./components/toast.js";
import { startTour, stopTour, isTourActive } from "./components/tour.js";
import { tourSteps, fullTourOrder, tourClosing } from "./data/tour-steps.js";

import * as authView from "./views/auth.js";
import * as onboardingView from "./views/onboarding.js";
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
let tourActive = false;
let tourQueue = [];

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
  onOnboardingComplete: startFullTour,
  logout: () => {
    if (tourActive) { stopTour(); tourActive = false; }
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

  // No hay usuario → pantalla de auth
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

  // Usuario nuevo sin onboarding → wizard
  if (!state.onboarded) {
    app.innerHTML = onboardingView.render(state);
    onboardingView.bind(ctx);
    return;
  }

  // Layout normal con top bar (desktop) + mobile tabs
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
  bindGlobalNav();
  if (routeHandler.bind) routeHandler.bind(ctx);

  // Si hay un tour en progreso y cambiamos de vista, continuar con el siguiente paso del tour
  if (tourActive && tourQueue.length > 0) {
    // Esperar a que el DOM se estabilice
    setTimeout(() => continueTour(), 400);
  }
}

function navigate(viewId) {
  if (!ROUTES[viewId]) viewId = "inicio";
  // Si hay tour activo, cancelar navegación manual
  if (tourActive) {
    toast.info("Termina el tutorial primero para navegar libremente");
    return;
  }
  state.active = viewId;
  saveState(auth, state);
  renderApp();
  document.querySelector("#view")?.scrollTo({ top: 0, behavior: "smooth" });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindGlobalNav() {
  document.querySelectorAll("[data-goto]").forEach(btn => {
    btn.addEventListener("click", () => navigate(btn.dataset.goto));
  });
}

// --- Tour completo ---
function startFullTour() {
  tourActive = true;
  tourQueue = [...fullTourOrder];
  // Iniciar en home
  state.active = "inicio";
  saveState(auth, state);
  renderApp();
  // Empezar con bienvenida
  setTimeout(() => {
    startTour(tourSteps.welcome, {
      allowSkip: false,
      onComplete: () => runNextTourStep()
    });
  }, 400);
}

function runNextTourStep() {
  if (tourQueue.length === 0) {
    // Cerrar tour
    tourActive = false;
    setTimeout(() => {
      startTour(tourClosing, {
        allowSkip: false,
        onComplete: () => {
          state.active = "inicio";
          saveState(auth, state);
          renderApp();
          toast.success("¡Tutorial completado! Ya puedes usar FitNovato libremente.");
        }
      });
    }, 200);
    return;
  }
  const viewId = tourQueue.shift();
  state.active = viewId;
  saveState(auth, state);
  renderApp();
  // Esperar a que el DOM de la nueva vista esté listo
  setTimeout(() => continueTour(), 500);
}

function continueTour() {
  const steps = tourSteps[state.active];
  if (!steps || !steps.length) {
    runNextTourStep();
    return;
  }
  startTour(steps, {
    allowSkip: false,
    onComplete: () => runNextTourStep()
  });
}

// --- Boot ---
renderApp();
