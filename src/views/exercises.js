// Vista de guía de ejercicios (catálogo agrupado por músculo).
import { sectionTitle } from "../components/ui.js";
import { escapeHtml } from "../utils/format.js";
import { groupBy } from "../utils/calc.js";
import { exercises } from "../data/exercises.js";

export function render() {
  const grouped = groupBy(exercises, e => e.muscle);
  return `
    <div class="view-stack">
      ${sectionTitle("Guía de ejercicios", "Textual, simple y local. Incluye alternativas para cambiar solo hoy o siempre en tu rutina.")}
      <div class="grid grid-3">
        ${Object.entries(grouped).map(([muscle, list]) => `
          <article class="card">
            <header class="card-head"><h2>${escapeHtml(muscle)}</h2></header>
            <div class="card-body">
              ${list.map(e => `
                <details class="exercise-detail">
                  <summary><strong>${escapeHtml(e.name)}</strong> · ${escapeHtml(e.equipment)}</summary>
                  <p>${escapeHtml(e.description)}</p>
                  <ol>${e.steps.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ol>
                  <p class="form-msg"><strong>Errores:</strong> ${e.mistakes.map(escapeHtml).join(", ")}.</p>
                  <p class="form-msg"><strong>Alternativas:</strong> ${e.alternatives.map(escapeHtml).join(", ")}.</p>
                  <p class="form-msg subtle">${escapeHtml(e.safety)}</p>
                </details>`).join("")}
            </div>
          </article>`).join("")}
      </div>
    </div>`;
}
