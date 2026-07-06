import { input, foodSelect, sectionTitle, emptyState } from "../components/ui.js";
import { fmt, escapeHtml } from "../utils/format.js";
import { calculatePlate, todayISO } from "../utils/calc.js";
import { foods } from "../data/foods.js";
import { toast } from "../components/toast.js";

export function render(state) {
  return `
    <div class="view-stack">
      ${sectionTitle("Crear plato", "Arma platos sin IA: eliges ingredientes y la app suma calorias y macros.")}
      <form id="plateForm" class="card form-grid form-grid-3">
        ${input("plateName", "Nombre del plato", "Ensalada de atun con huevo")}
        ${foodSelect("protein", "Proteina", "Atun en agua", foods)}
        ${foodSelect("carb", "Carbohidrato", "Papa cocida", foods)}
        ${foodSelect("fat", "Grasa saludable", "Aguacate", foods)}
        ${foodSelect("veg", "Verduras", "Ensalada mixta", foods)}
        ${foodSelect("extra", "Extra o bebida", "Cafe sin azucar", foods)}
        ${input("proteinG", "Gramos proteina", 100, "number", { min: 0, max: 1000 })}
        ${input("carbG", "Gramos carbohidrato", 150, "number", { min: 0, max: 1000 })}
        ${input("fatG", "Gramos grasa", 50, "number", { min: 0, max: 1000 })}
        ${input("vegG", "Gramos verduras", 100, "number", { min: 0, max: 1000 })}
        ${input("extraG", "Gramos/ml extra", 200, "number", { min: 0, max: 1000 })}
        <div class="form-actions form-actions-span2">
          <button class="btn btn-primary" type="submit">Guardar plato</button>
        </div>
        <div id="plateResult" class="plate-result"></div>
      </form>

      <section class="card">
        <header class="card-head"><h2>Platos guardados</h2></header>
        <div class="card-body">
          ${state.plates.length
            ? `<div class="grid grid-3">${state.plates.map(p => `<article class="mini-card"><strong>${escapeHtml(p.name)}</strong><p>${fmt(p.macros.kcal, " kcal")} · ${fmt(p.macros.protein, " g proteina")}</p><div class="btn-row"><button class="btn btn-ghost btn-sm" data-add-plate="${escapeHtml(p.id)}">Agregar al diario</button><button class="btn btn-ghost btn-sm" data-delete-plate="${escapeHtml(p.id)}">Eliminar</button></div></article>`).join("")}</div>`
            : emptyState("Todavia no has guardado platos.")}
        </div>
      </section>
    </div>`;
}

export function bind(ctx) {
  const form = document.querySelector("#plateForm");
  if (!form) return;

  const update = () => {
    const r = calculatePlate(form, foods);
    document.querySelector("#plateResult").innerHTML = `
      <div class="result-pills">
        <span class="pill pill-primary">${fmt(r.kcal, " kcal")}</span>
        <span class="pill">${fmt(r.protein, " g P")}</span>
        <span class="pill">${fmt(r.carbs, " g C")}</span>
        <span class="pill">${fmt(r.fat, " g G")}</span>
      </div>`;
  };
  form.addEventListener("input", update);
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = form.elements.plateName.value.trim() || "Plato sin nombre";
    ctx.state.plates.push({ id: crypto.randomUUID(), name, macros: calculatePlate(form, foods) });
    ctx.save();
    toast.success(`Plato "${name}" guardado`);
    ctx.render();
  });
  update();

  document.querySelectorAll("[data-add-plate]").forEach(btn => {
    btn.addEventListener("click", () => {
      const plate = ctx.state.plates.find(item => item.id === btn.dataset.addPlate);
      if (!plate) return;
      ctx.state.diary.push({
        id: crypto.randomUUID(),
        dateISO: ctx.state.selectedDiaryDate || todayISO(),
        meal: "Almuerzo",
        name: plate.name,
        grams: "1 porcion",
        macros: plate.macros
      });
      ctx.save();
      toast.success("Plato agregado al diario");
      ctx.render();
    });
  });

  document.querySelectorAll("[data-delete-plate]").forEach(btn => {
    btn.addEventListener("click", () => {
      ctx.state.plates = ctx.state.plates.filter(item => item.id !== btn.dataset.deletePlate);
      ctx.save();
      toast.info("Plato eliminado");
      ctx.render();
    });
  });
}
