import { input, select, sectionTitle, emptyState } from "../components/ui.js";
import { escapeHtml } from "../utils/format.js";
import { todayISO } from "../utils/calc.js";
import { toast } from "../components/toast.js";

export function render(state) {
  const selectedDate = state.selectedDiaryDate || todayISO();
  return `
    <div class="view-stack">
      ${sectionTitle("Cardio", "Registra caminadora, escalera, bicicleta, eliptica, caminata, trote o cuerda.")}
      <form id="cardioForm" class="card form-grid form-grid-3">
        ${input("dateISO", "Fecha", selectedDate, "date")}
        ${select("type", "Tipo", ["Caminadora", "Escalera", "Bicicleta", "Eliptica", "Caminata", "Trote", "Saltar cuerda"], "Caminadora")}
        ${select("template", "Plantilla", ["Cardio suave", "Cardio moderado", "Intervalos", "Post-entreno", "Perdida de grasa"], "Post-entreno")}
        ${input("time", "Tiempo (min)", 15, "number", { min: 1, max: 300 })}
        ${input("level", "Nivel/inclinacion", "suave")}
        ${input("speed", "Velocidad", "4.8 km/h")}
        ${input("distance", "Distancia", "1.2 km")}
        ${input("calories", "Calorias estimadas", 90, "number", { min: 0, max: 3000 })}
        ${select("feeling", "Sensacion", ["Muy facil", "Bien", "Dificil", "Muy dificil"], "Bien")}
        <div class="form-actions"><button class="btn btn-primary" type="submit">Guardar cardio</button></div>
      </form>

      <section class="card">
        <header class="card-head"><h2>Historial</h2></header>
        <div class="card-body">
          ${state.cardio.length
            ? `<table class="data-table"><thead><tr><th>Fecha</th><th>Tipo</th><th>Tiempo</th><th>Kcal</th><th>Sensacion</th><th></th></tr></thead><tbody>${state.cardio.slice(-12).reverse().map(c => `<tr><td>${escapeHtml(c.dateISO || c.date)}</td><td>${escapeHtml(c.type)}</td><td>${escapeHtml(c.time)} min</td><td>${escapeHtml(c.calories || 0)}</td><td>${escapeHtml(c.feeling)}</td><td><button class="btn btn-ghost btn-sm" data-delete-cardio="${escapeHtml(c.id)}">Eliminar</button></td></tr>`).join("")}</tbody></table>`
            : emptyState("Sin registros de cardio todavia.")}
        </div>
      </section>
    </div>`;
}

export function bind(ctx) {
  const form = document.querySelector("#cardioForm");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    ctx.state.cardio.push({
      id: crypto.randomUUID(),
      dateISO: data.dateISO || todayISO(),
      date: new Date(`${data.dateISO || todayISO()}T00:00:00`).toLocaleDateString("es-CO"),
      ...data
    });
    ctx.save();
    toast.success("Cardio guardado");
    ctx.render();
  });

  document.querySelectorAll("[data-delete-cardio]").forEach(btn => {
    btn.addEventListener("click", () => {
      ctx.state.cardio = ctx.state.cardio.filter(item => item.id !== btn.dataset.deleteCardio);
      ctx.save();
      toast.info("Cardio eliminado");
      ctx.render();
    });
  });
}
