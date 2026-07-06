import { input, select, sectionTitle } from "../components/ui.js";
import { escapeHtml } from "../utils/format.js";
import { groupBy } from "../utils/calc.js";
import { exercises } from "../data/exercises.js";

export function render() {
  const muscles = [...new Set(exercises.map(e => e.muscle))];
  return `
    <div class="view-stack">
      ${sectionTitle("Guia de ejercicios", "Textual, simple y local. Filtra por busqueda, musculo o equipo.")}
      <section class="card">
        <div class="card-body form-grid form-grid-3">
          ${input("exerciseSearch", "Buscar", "", "search", { placeholder: "press, remo, pierna..." })}
          ${select("muscleFilter", "Musculo", ["Todos", ...muscles], "Todos")}
          ${select("placeFilter", "Lugar", ["Todos", "gym", "ambos"], "Todos")}
        </div>
      </section>
      <div id="exerciseList">${renderExerciseGroups(exercises)}</div>
    </div>`;
}

function renderExerciseGroups(list) {
  const grouped = groupBy(list, e => e.muscle);
  return `<div class="grid grid-3">
    ${Object.entries(grouped).map(([muscle, items]) => `
      <article class="card">
        <header class="card-head"><h2>${escapeHtml(muscle)}</h2></header>
        <div class="card-body">
          ${items.map(e => `
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
  </div>`;
}

export function bind() {
  const search = document.querySelector("[name='exerciseSearch']");
  const muscle = document.querySelector("[name='muscleFilter']");
  const place = document.querySelector("[name='placeFilter']");
  const list = document.querySelector("#exerciseList");
  const apply = () => {
    const q = String(search.value || "").toLowerCase();
    const filtered = exercises.filter(e => {
      const matchesText = !q || [e.name, e.muscle, e.equipment, e.description].some(x => String(x).toLowerCase().includes(q));
      const matchesMuscle = muscle.value === "Todos" || e.muscle === muscle.value;
      const matchesPlace = place.value === "Todos" || e.place === place.value;
      return matchesText && matchesMuscle && matchesPlace;
    });
    list.innerHTML = filtered.length ? renderExerciseGroups(filtered) : `<div class="empty-state"><p>No hay ejercicios con esos filtros.</p></div>`;
  };
  [search, muscle, place].forEach(el => el?.addEventListener("input", apply));
  [muscle, place].forEach(el => el?.addEventListener("change", apply));
}
