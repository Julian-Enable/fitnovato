import { input, select, sectionTitle } from "../components/ui.js";
import { escapeHtml } from "../utils/format.js";
import { hasBodyProfile, weeklyAdjustment } from "../utils/calc.js";
import { toast } from "../components/toast.js";

export function render(state) {
  if (!hasBodyProfile(state.profile)) return completeProfilePrompt();
  return `
    <div class="view-stack">
      ${sectionTitle("Ajustar plan", "Revision semanal con reglas internas. Sin IA, sin servicios externos.")}
      <form id="adjustForm" class="card form-grid form-grid-3">
        ${input("weight", "Peso actual", state.profile.weight, "number", { min: 30, max: 250, step: 0.1 })}
        ${select("food", "Cumpliste alimentacion?", ["si", "mas o menos", "no"], "si")}
        ${select("training", "Cumpliste entrenamientos?", ["si", "mas o menos", "no"], "si")}
        ${select("hunger", "Tuviste mucha hambre?", ["no", "normal", "si"], "normal")}
        ${select("energy", "Tuviste energia?", ["si", "normal", "no"], "normal")}
        ${select("pain", "Sentiste dolor?", ["no", "molestia leve", "si"], "no")}
        ${select("difficulty", "El plan fue facil o dificil?", ["facil", "normal", "dificil"], "normal")}
        <div class="form-actions form-actions-span2"><button class="btn btn-primary" type="submit">Ver recomendacion</button></div>
      </form>
      <div id="adjustResult" class="notice notice-info">${renderRecommendations(weeklyAdjustment({}, state.progress, state.profile.goal))}</div>
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
    const result = weeklyAdjustment(normalizeAnswers(data), ctx.state.progress, ctx.state.profile.goal);
    document.querySelector("#adjustResult").innerHTML = renderRecommendations(result);
    toast.info("Recomendacion actualizada");
  });
}

function normalizeAnswers(data) {
  return {
    ...data,
    food: data.food === "si" ? "sí" : data.food,
    training: data.training === "si" ? "sí" : data.training,
    hunger: data.hunger === "si" ? "sí" : data.hunger,
    energy: data.energy === "si" ? "sí" : data.energy,
    pain: data.pain === "si" ? "sí" : data.pain
  };
}

function renderRecommendations(result) {
  const list = Array.isArray(result) ? result : [result];
  return `<ul class="check-list">${list.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}
