// Vista de entrenamiento: registrar series, reps, peso, sensación.
import { input, select, sectionTitle, emptyState } from "../components/ui.js";
import { escapeHtml } from "../utils/format.js";
import { buildRoutine, hasBodyProfile, progressionAdvice } from "../utils/calc.js";
import { exercises as allExercises } from "../data/exercises.js";
import { toast } from "../components/toast.js";

export function render(state) {
  if (!hasBodyProfile(state.profile)) return completeProfilePrompt();
  const routine = buildRoutine(state.profile, allExercises);
  const day = routine.days[0];

  return `
    <div class="view-stack">
      ${sectionTitle("Mi entrenamiento", "Registra series, repeticiones, peso y sensación. La recomendación sale de reglas de doble progresión.")}

      <form id="workoutForm" class="view-stack">
        ${day.exercises.map((e, idx) => `
          <article class="card">
            <header class="card-head">
              <h2>${escapeHtml(e.name)}</h2>
              <p class="card-sub">${e.sets} series · ${escapeHtml(e.reps)} reps · descanso ${escapeHtml(e.rest)}</p>
            </header>
            <div class="card-body">
              <div class="grid grid-4">
                ${input(`weight-${idx}`, "Peso usado (kg)", 0, "number", { min: 0, max: 500, step: 0.5 })}
                ${input(`reps-${idx}`, "Reps por serie", "12,12,10")}
                ${input(`sets-${idx}`, "Series completadas", e.sets, "number", { min: 1, max: 10 })}
                ${select(`feeling-${idx}`, "Sensación", ["Muy fácil", "Bien", "Difícil", "Muy difícil", "Sentí dolor"], "Bien")}
              </div>
              ${input(`note-${idx}`, "Nota personal", "")}
            </div>
          </article>`).join("")}

        <section class="card">
          <div class="card-body">
            <div class="grid grid-2">
              ${input("duration", "Duración (min)", state.profile.minutes, "number", { min: 5, max: 240 })}
              ${input("cardio", "Cardio realizado", "15 min caminadora")}
            </div>
            <div class="form-actions">
              <button class="btn btn-primary btn-block" type="submit">Finalizar entrenamiento</button>
            </div>
          </div>
        </section>
      </form>

      <section class="card">
        <header class="card-head"><h2>Historial reciente</h2></header>
        <div class="card-body">
          ${state.workoutLogs.length
            ? `<table class="data-table"><thead><tr><th>Fecha</th><th>Resumen</th><th>Recomendación</th></tr></thead><tbody>${state.workoutLogs.slice(-5).reverse().map(log => `<tr><td>${escapeHtml(log.date)}</td><td>${escapeHtml(log.summary)}</td><td>${escapeHtml(log.recommendation)}</td></tr>`).join("")}</tbody></table>`
            : emptyState("Cuando finalices un entrenamiento verás aquí el resumen.")}
        </div>
      </section>
    </div>`;
}

function completeProfilePrompt() {
  return `<div class="view-stack">${sectionTitle("Completa tu perfil", "Ve a Mi perfil para registrar tus datos corporales.")}<button class="btn btn-primary" data-goto="perfil">Completar perfil</button></div>`;
}

export function bind(ctx) {
  const form = document.querySelector("#workoutForm");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const routine = buildRoutine(ctx.state.profile, allExercises).days[0];
    const entries = routine.exercises.map((e, idx) => ({
      exercise: e.name,
      weight: Number(form.elements[`weight-${idx}`].value),
      reps: form.elements[`reps-${idx}`].value,
      sets: Number(form.elements[`sets-${idx}`].value),
      feeling: form.elements[`feeling-${idx}`].value,
      note: form.elements[`note-${idx}`].value
    }));
    const totalSets = entries.reduce((s, e) => s + e.sets, 0);
    const totalReps = entries.reduce((s, e) => s + String(e.reps).split(/[,\-]/).map(Number).filter(Number.isFinite).reduce((a, b) => a + (b || 0), 0), 0);
    const recommendation = progressionAdvice(entries);
    ctx.state.workoutLogs.push({
      date: new Date().toLocaleDateString("es-CO"),
      entries, recommendation,
      summary: `${entries.length} ejercicios, ${totalSets} series, ${totalReps} repeticiones, ${form.elements.cardio.value}.`
    });
    ctx.save();
    toast.success("Entrenamiento guardado");
    ctx.render();
  });
}
