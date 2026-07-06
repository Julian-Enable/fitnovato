// Wizard de onboarding: 4 pasos para llenar el perfil inicial.
// No se puede saltar. Al finalizar, lanza el tour guiado por todas las vistas.

import { input, select, textarea } from "../components/ui.js";
import { toast } from "../components/toast.js";
import { hasBodyProfile } from "../utils/calc.js";

const STEPS = [
  { id: "personal", title: "Datos personales", subtitle: "Empecemos por lo básico para calcular tu metabolismo." },
  { id: "goal", title: "Tu objetivo", subtitle: "¿Qué quieres lograr con FitNovato?" },
  { id: "training", title: "Entrenamiento", subtitle: "Cómo, cuándo y dónde vas a entrenar." },
  { id: "lifestyle", title: "Estilo de vida", subtitle: "Últimos datos para personalizar tu plan." }
];

export function render(state) {
  const step = state.onboardingStep || 0;
  const p = state.profile;
  const progress = ((step + 1) / STEPS.length) * 100;

  return `
    <div class="onboarding-screen">
      <div class="onboarding-container">
        <header class="onboarding-header">
          <div class="brand-mark brand-mark-lg">FN</div>
          <h1>Configura tu perfil</h1>
          <p>Paso ${step + 1} de ${STEPS.length}: ${STEPS[step].title}</p>
          <div class="onboarding-progress">
            <div class="onboarding-progress-bar" style="width: ${progress}%"></div>
          </div>
        </header>

        <p class="onboarding-subtitle">${STEPS[step].subtitle}</p>

        <form id="onboardingForm" class="onboarding-form">
          ${renderStep(step, p)}
          <div class="onboarding-actions">
            ${step > 0 ? `<button type="button" class="btn btn-ghost" data-prev>Atrás</button>` : ""}
            <button type="submit" class="btn btn-primary">${step === STEPS.length - 1 ? "Finalizar y empezar a usar FitNovato" : "Continuar"}</button>
          </div>
        </form>
      </div>
    </div>`;
}

function renderStep(step, p) {
  switch (step) {
    case 0: return `
      <div class="form-stack">
        ${input("name", "¿Cómo te llamas?", p.name, "text", { placeholder: "Tu nombre" })}
        <div class="form-grid form-grid-3">
          ${input("age", "Edad", p.age, "number", { min: 12, max: 100 })}
          ${select("sex", "Sexo", ["mujer", "hombre"], p.sex)}
          ${input("height", "Estatura (cm)", p.height, "number", { min: 120, max: 230 })}
        </div>
        <div class="form-grid form-grid-2">
          ${input("weight", "Peso actual (kg)", p.weight, "number", { min: 30, max: 250, step: 0.1 })}
          ${input("targetWeight", "Peso objetivo (kg)", p.targetWeight, "number", { min: 30, max: 250, step: 0.1 })}
        </div>
      </div>`;

    case 1: return `
      <div class="form-stack">
        ${select("experience", "¿Cuál es tu experiencia con entrenamiento?", ["principiante", "intermedio", "avanzado"], p.experience)}
        ${select("goal", "¿Cuál es tu objetivo principal?", ["perder grasa", "ganar masa muscular", "mantener peso", "recomposición corporal"], p.goal)}
        ${select("deficit", "¿Qué tan estricto quieres ser?", ["suave", "moderado", "alto controlado"], p.deficit)}
      </div>`;

    case 2: return `
      <div class="form-stack">
        <div class="form-grid form-grid-3">
          ${input("days", "¿Cuántos días por semana?", p.days, "number", { min: 1, max: 7 })}
          ${input("minutes", "¿Cuántos minutos por sesión?", p.minutes, "number", { min: 15, max: 180 })}
          ${select("place", "¿Dónde entrenas?", ["gimnasio completo", "gimnasio básico", "casa"], p.place)}
        </div>
        ${textarea("limitations", "¿Tienes lesiones o molestias? (opcional)", p.limitations, { rows: 2 })}
      </div>`;

    case 3: return `
      <div class="form-stack">
        <div class="form-grid form-grid-3">
          ${select("activity", "¿Qué tan activo eres en el día?", ["sedentaria", "ligera", "moderada", "alta"], p.activity)}
          ${input("meals", "¿Cuántas comidas al día?", p.meals, "number", { min: 2, max: 8 })}
          ${input("budget", "Presupuesto (opcional)", p.budget)}
        </div>
        ${textarea("avoid", "¿Qué alimentos no consumes? (opcional)", p.avoid, { rows: 2 })}
        ${textarea("preferences", "¿Preferencias alimentarias? (opcional)", p.preferences, { rows: 2 })}
      </div>`;
    default: return "";
  }
}

export function bind(ctx) {
  const form = document.querySelector("#onboardingForm");
  if (!form) return;
  const step = ctx.state.onboardingStep || 0;

  // Botón atrás
  form.querySelector("[data-prev]")?.addEventListener("click", () => {
    saveCurrentStep(form, ctx, step);
    ctx.state.onboardingStep = Math.max(0, step - 1);
    ctx.render();
  });

  // Submit (siguiente o finalizar)
  form.addEventListener("submit", e => {
    e.preventDefault();
    saveCurrentStep(form, ctx, step);

    // Validación por paso
    const error = validateStep(step, ctx.state.profile);
    if (error) {
      toast.error(error);
      return;
    }

    if (step < STEPS.length - 1) {
      ctx.state.onboardingStep = step + 1;
      ctx.render();
    } else {
      // Finalizar
      ctx.state.onboardingStep = 0;
      ctx.state.onboarded = true;
      ctx.save();
      toast.success("¡Perfil completo! Ahora te mostramos cómo usar FitNovato.");
      ctx.onOnboardingComplete();
    }
  });
}

function saveCurrentStep(form, ctx, step) {
  const data = Object.fromEntries(new FormData(form));
  ["age", "weight", "height", "days", "minutes", "meals", "targetWeight"].forEach(k => {
    if (data[k] !== undefined) data[k] = Number(data[k]);
  });
  Object.assign(ctx.state.profile, data);
}

function validateStep(step, p) {
  switch (step) {
    case 0:
      if (!p.name?.trim()) return "Cuéntanos tu nombre";
      if (!p.age || p.age < 12 || p.age > 100) return "Edad debe estar entre 12 y 100";
      if (!p.sex) return "Selecciona tu sexo";
      if (!p.height || p.height < 120 || p.height > 230) return "Estatura debe estar entre 120 y 230 cm";
      if (!p.weight || p.weight < 30 || p.weight > 250) return "Peso debe estar entre 30 y 250 kg";
      return null;
    case 1:
      if (!p.experience) return "Selecciona tu experiencia";
      if (!p.goal) return "Selecciona tu objetivo";
      if (!p.deficit) return "Selecciona qué tan estricto quieres ser";
      return null;
    case 2:
      if (!p.days || p.days < 1 || p.days > 7) return "Días debe estar entre 1 y 7";
      if (!p.minutes || p.minutes < 15 || p.minutes > 180) return "Minutos debe estar entre 15 y 180";
      if (!p.place) return "Selecciona dónde entrenas";
      return null;
    case 3:
      if (!p.activity) return "Selecciona tu nivel de actividad";
      if (!p.meals || p.meals < 2 || p.meals > 8) return "Comidas debe estar entre 2 y 8";
      return null;
    default: return null;
  }
}
