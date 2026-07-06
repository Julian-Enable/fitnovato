import { input, select, sectionTitle, emptyState } from "../components/ui.js";
import { escapeHtml } from "../utils/format.js";
import { buildRoutine, hasBodyProfile, progressionAdvice, todayISO } from "../utils/calc.js";
import { exercises as allExercises } from "../data/exercises.js";
import { toast } from "../components/toast.js";

export function render(state) {
  if (!hasBodyProfile(state.profile)) return completeProfilePrompt();
  const routine = buildRoutine(state.profile, allExercises);
  const selectedDay = Math.min(Math.max(Number(state.selectedWorkoutDay) || 1, 1), routine.days.length);
  const day = routine.days[selectedDay - 1];

  return `
    <div class="view-stack">
      ${sectionTitle("Mi entrenamiento", "Registra series, repeticiones, peso y sensacion. La recomendacion usa doble progresion.")}

      <section class="card">
        <div class="card-body form-row">
          ${select("workoutDay", "Dia de rutina", routine.days.map(d => `Dia ${d.day}: ${d.focus}`), `Dia ${day.day}: ${day.focus}`)}
          ${input("workoutDate", "Fecha", todayISO(), "date")}
        </div>
      </section>

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
                ${input(`reps-${idx}`, "Reps por serie", e.reps)}
                ${input(`sets-${idx}`, "Series completadas", e.sets, "number", { min: 1, max: 10 })}
                ${select(`feeling-${idx}`, "Sensacion", ["Muy facil", "Bien", "Dificil", "Muy dificil", "Senti dolor"], "Bien")}
              </div>
              ${input(`note-${idx}`, "Nota personal", "")}
            </div>
          </article>`).join("")}

        <section class="card">
          <div class="card-body">
            <div class="grid grid-2">
              ${input("duration", "Duracion (min)", state.profile.minutes, "number", { min: 5, max: 240 })}
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
            ? `<table class="data-table"><thead><tr><th>Fecha</th><th>Resumen</th><th>Recomendacion</th><th></th></tr></thead><tbody>${state.workoutLogs.slice(-8).reverse().map(log => `<tr><td>${escapeHtml(log.dateISO || log.date)}</td><td>${escapeHtml(log.summary)}</td><td>${escapeHtml(log.recommendation)}</td><td><button class="btn btn-ghost btn-sm" data-delete-workout="${escapeHtml(log.id)}">Eliminar</button></td></tr>`).join("")}</tbody></table>`
            : emptyState("Cuando finalices un entrenamiento veras aqui el resumen.")}
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

  document.querySelector("[name='workoutDay']")?.addEventListener("change", e => {
    const dayNumber = Number(String(e.target.value).match(/\d+/)?.[0]) || 1;
    ctx.state.selectedWorkoutDay = dayNumber;
    ctx.save();
    ctx.render();
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const fullRoutine = buildRoutine(ctx.state.profile, allExercises);
    const selectedDay = Math.min(Math.max(Number(ctx.state.selectedWorkoutDay) || 1, 1), fullRoutine.days.length);
    const routine = fullRoutine.days[selectedDay - 1];
    const workoutDate = document.querySelector("[name='workoutDate']")?.value || todayISO();
    const entries = routine.exercises.map((ex, idx) => ({
      exercise: ex.name,
      targetReps: ex.reps,
      weight: Number(form.elements[`weight-${idx}`].value),
      reps: form.elements[`reps-${idx}`].value,
      sets: Number(form.elements[`sets-${idx}`].value),
      feeling: form.elements[`feeling-${idx}`].value,
      note: form.elements[`note-${idx}`].value
    }));
    const totalSets = entries.reduce((s, entry) => s + entry.sets, 0);
    const totalReps = entries.reduce((s, entry) => s + String(entry.reps).split(/[,\-]/).map(Number).filter(Number.isFinite).reduce((a, b) => a + (b || 0), 0), 0);
    const recommendation = progressionAdvice(entries);
    ctx.state.workoutLogs.push({
      id: crypto.randomUUID(),
      dateISO: workoutDate,
      date: new Date(`${workoutDate}T00:00:00`).toLocaleDateString("es-CO"),
      routineDay: selectedDay,
      entries,
      recommendation,
      summary: `Dia ${selectedDay}: ${entries.length} ejercicios, ${totalSets} series, ${totalReps} repeticiones, ${form.elements.cardio.value}.`
    });
    ctx.save();
    toast.success("Entrenamiento guardado");
    ctx.render();
  });

  document.querySelectorAll("[data-delete-workout]").forEach(btn => {
    btn.addEventListener("click", () => {
      ctx.state.workoutLogs = ctx.state.workoutLogs.filter(item => item.id !== btn.dataset.deleteWorkout);
      ctx.save();
      toast.info("Entrenamiento eliminado");
      ctx.render();
    });
  });
}
