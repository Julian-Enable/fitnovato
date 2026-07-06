// Vista de rutina: muestra la rutina generada por reglas.
import { sectionTitle } from "../components/ui.js";
import { escapeHtml } from "../utils/format.js";
import { buildRoutine, hasBodyProfile } from "../utils/calc.js";
import { exercises as allExercises } from "../data/exercises.js";

export function render(state) {
  if (!hasBodyProfile(state.profile)) return completeProfilePrompt();
  const routine = buildRoutine(state.profile, allExercises);
  return `
    <div class="view-stack">
      ${sectionTitle("Mi rutina", "Generada por reglas según objetivo, nivel, días, tiempo, lugar y limitaciones.", `<span class="badge badge-accent">${escapeHtml(routine.name)}</span>`)}

      <div class="grid ${routine.days.length > 2 ? "grid-3" : "grid-2"}">
        ${routine.days.map(day => `
          <article class="card routine-day">
            <header class="card-head">
              <span class="badge badge-warn">Día ${day.day}</span>
              <h2>${escapeHtml(day.focus)}</h2>
              <p class="card-sub">${escapeHtml(day.note)}</p>
            </header>
            <div class="card-body">
              <table class="data-table">
                <tbody>
                  ${day.exercises.map(e => `<tr><th>${escapeHtml(e.name)}</th><td>${e.sets} × ${escapeHtml(e.reps)}<br><small>${escapeHtml(e.rest)}</small></td></tr>`).join("")}
                </tbody>
              </table>
              <p class="form-msg"><strong>Cardio:</strong> ${escapeHtml(day.cardio)}</p>
            </div>
          </article>`).join("")}
      </div>
    </div>`;
}

function completeProfilePrompt() {
  return `<div class="view-stack">${sectionTitle("Completa tu perfil", "Ve a Mi perfil para registrar tus datos corporales.")}<button class="btn btn-primary" data-goto="perfil">Completar perfil</button></div>`;
}
