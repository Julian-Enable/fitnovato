// Vista de ajuste semanal del plan.
import { input, select, sectionTitle } from "../components/ui.js";
import { escapeHtml } from "../utils/format.js";
import { hasBodyProfile, weeklyAdjustment } from "../utils/calc.js";
import { toast } from "../components/toast.js";

export function render(state) {
  if (!hasBodyProfile(state.profile)) return completeProfilePrompt();
  return `
    <div class="view-stack">
      ${sectionTitle("Ajustar plan", "Revisión semanal con reglas internas. Sin IA, sin servicios externos.")}
      <form id="adjustForm" class="card form-grid form-grid-3">
        ${input("weight", "Peso actual", state.profile.weight, "number", { min: 30, max: 250, step: 0.1 })}
        ${select("food", "¿Cumpliste alimentación?", ["sí", "más o menos", "no"], "sí")}
        ${select("training", "¿Cumpliste entrenamientos?", ["sí", "más o menos", "no"], "sí")}
        ${select("hunger", "¿Tuviste mucha hambre?", ["no", "normal", "sí"], "normal")}
        ${select("energy", "¿Tuviste energía?", ["sí", "normal", "no"], "normal")}
        ${select("pain", "¿Sentiste dolor?", ["no", "molestia leve", "sí"], "no")}
        ${select("difficulty", "¿El plan fue fácil o difícil?", ["fácil", "normal", "difícil"], "normal")}
        <div class="form-actions form-actions-span2"><button class="btn btn-primary" type="submit">Ver recomendación</button></div>
      </form>
      <div id="adjustResult" class="notice notice-info">${escapeHtml(weeklyAdjustment({}, state.progress, state.profile.goal))}</div>
    </div>`;
}

function completeProfilePrompt() {
  return `<div class="view-stack">${sectionTitle("Completa tu perfil", "Ve a Mi perfil para registrar tus datos corporales.")}<button class="btn btn-primary" data-goto="perfil">Completar perfil</button></div>`;
}

export function bind(ctx) {
  const form = document.querySelector("#adjustForm");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const result = weeklyAdjustment(data, ctx.state.progress, ctx.state.profile.goal);
    document.querySelector("#adjustResult").textContent = result;
    toast.info("Recomendación actualizada");
  });
}
