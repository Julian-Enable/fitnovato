// Vista de progreso: seguimiento semanal.
import { input, select, sectionTitle } from "../components/ui.js";
import { escapeHtml, one } from "../utils/format.js";
import { hasBodyProfile, progressMessage } from "../utils/calc.js";
import { toast } from "../components/toast.js";

export function render(state) {
  if (!hasBodyProfile(state.profile)) return completeProfilePrompt();
  return `
    <div class="view-stack">
      ${sectionTitle("Mi progreso", "Seguimiento semanal de peso, hábitos, energía, hambre, sueño, agua y ánimo.")}
      <form id="progressForm" class="card form-grid form-grid-4">
        ${input("weight", "Peso actual (kg)", state.profile.weight, "number", { min: 30, max: 250, step: 0.1 })}
        ${select("food", "Alimentación", ["bien", "regular", "difícil"], "bien")}
        ${select("training", "Entrenamientos", ["bien", "regular", "difícil"], "bien")}
        ${select("energy", "Energía", ["alta", "normal", "baja"], "normal")}
        ${select("hunger", "Hambre", ["baja", "normal", "mucha"], "normal")}
        ${input("sleep", "Sueño", "7 h")}
        ${input("water", "Agua", "6 vasos")}
        ${input("mood", "Ánimo", "estable")}
        ${select("difficulty", "Dificultad del plan", ["fácil", "normal", "difícil"], "normal")}
        <div class="form-actions form-actions-span2"><button class="btn btn-primary" type="submit">Registrar semana</button></div>
      </form>

      <div class="notice notice-info">${escapeHtml(progressMessage(state.progress, state.profile.goal))}</div>

      ${state.progress.length ? `
        <section class="card">
          <header class="card-head"><h2>Historial</h2></header>
          <div class="card-body">
            <table class="data-table">
              <thead><tr><th>Semana</th><th>Peso</th><th>Comida</th><th>Entreno</th><th>Notas</th></tr></thead>
              <tbody>
                ${state.progress.map(p => `<tr><td>${p.week}</td><td>${one(p.weight)} kg</td><td>${escapeHtml(p.food)}</td><td>${escapeHtml(p.training)}</td><td>Energía ${escapeHtml(p.energy)}, hambre ${escapeHtml(p.hunger)}, sueño ${escapeHtml(p.sleep)}</td></tr>`).join("")}
              </tbody>
            </table>
          </div>
        </section>` : ""}
    </div>`;
}

function completeProfilePrompt() {
  return `<div class="view-stack">${sectionTitle("Completa tu perfil", "Ve a Mi perfil para registrar tus datos corporales.")}<button class="btn btn-primary" data-goto="perfil">Completar perfil</button></div>`;
}

export function bind(ctx) {
  const form = document.querySelector("#progressForm");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    data.weight = Number(data.weight);
    data.week = ctx.state.progress.length + 1;
    ctx.state.progress.push(data);
    ctx.state.profile.weight = data.weight;
    ctx.save();
    toast.success("Semana registrada");
    ctx.render();
  });
}
