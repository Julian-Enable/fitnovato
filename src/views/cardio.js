// Vista de cardio: registrar sesiones.
import { input, select, sectionTitle, emptyState } from "../components/ui.js";
import { escapeHtml } from "../utils/format.js";
import { toast } from "../components/toast.js";

export function render(state) {
  return `
    <div class="view-stack">
      ${sectionTitle("Cardio", "Registra caminadora, escalera, bicicleta, elíptica, caminata, trote o cuerda.")}
      <form id="cardioForm" class="card form-grid form-grid-3">
        ${select("type", "Tipo", ["Caminadora", "Escalera", "Bicicleta", "Elíptica", "Caminata", "Trote", "Saltar cuerda"], "Caminadora")}
        ${select("template", "Plantilla", ["Cardio suave", "Cardio moderado", "Intervalos", "Post-entreno", "Pérdida de grasa"], "Post-entreno")}
        ${input("time", "Tiempo (min)", 15, "number", { min: 1, max: 300 })}
        ${input("level", "Nivel/inclinación", "suave")}
        ${input("speed", "Velocidad", "4.8 km/h")}
        ${input("distance", "Distancia", "1.2 km")}
        ${input("calories", "Calorías estimadas", 90, "number", { min: 0, max: 3000 })}
        ${select("feeling", "Sensación", ["Muy fácil", "Bien", "Difícil", "Muy difícil"], "Bien")}
        <div class="form-actions"><button class="btn btn-primary" type="submit">Guardar cardio</button></div>
      </form>

      <section class="card">
        <header class="card-head"><h2>Historial</h2></header>
        <div class="card-body">
          ${state.cardio.length
            ? `<table class="data-table"><thead><tr><th>Fecha</th><th>Tipo</th><th>Tiempo</th><th>Sensación</th></tr></thead><tbody>${state.cardio.slice(-6).reverse().map(c => `<tr><td>${escapeHtml(c.date)}</td><td>${escapeHtml(c.type)}</td><td>${escapeHtml(c.time)} min</td><td>${escapeHtml(c.feeling)}</td></tr>`).join("")}</tbody></table>`
            : emptyState("Sin registros de cardio todavía.")}
        </div>
      </section>
    </div>`;
}

export function bind(ctx) {
  const form = document.querySelector("#cardioForm");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    ctx.state.cardio.push({
      date: new Date().toLocaleDateString("es-CO"),
      ...Object.fromEntries(new FormData(form))
    });
    ctx.save();
    toast.success("Cardio guardado");
    ctx.render();
  });
}
