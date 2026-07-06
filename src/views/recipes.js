// Vista de recetas: guardar recetas con porciones y cálculo estimado.
import { input, textarea, sectionTitle, emptyState } from "../components/ui.js";
import { fmt, escapeHtml } from "../utils/format.js";
import { estimateRecipe } from "../utils/calc.js";
import { foods } from "../data/foods.js";
import { toast } from "../components/toast.js";

export function render(state) {
  return `
    <div class="view-stack">
      ${sectionTitle("Recetas", "Guarda recetas por porciones y luego úsalas como comidas frecuentes.")}
      <form id="recipeForm" class="card form-grid form-grid-2">
        ${input("name", "Nombre", "Sudado práctico de pollo")}
        ${input("servings", "Porciones", 3, "number", { min: 1, max: 20 })}
        ${textarea("ingredients", "Ingredientes y cantidades", "pollo 360 g, papa 300 g, arroz 240 g, ensalada 200 g")}
        ${textarea("steps", "Preparación", "Cocina el pollo con verduras, acompaña con papa y arroz medido.")}
        <div class="form-actions form-actions-span2">
          <button class="btn btn-primary" type="submit">Guardar receta</button>
        </div>
      </form>

      <section class="card">
        <header class="card-head"><h2>Recetas guardadas</h2></header>
        <div class="card-body">
          ${state.recipes.length
            ? `<table class="data-table"><thead><tr><th>Receta</th><th>Porciones</th><th>Estimado</th><th>Preparación</th></tr></thead><tbody>${state.recipes.map(r => `<tr><td>${escapeHtml(r.name)}</td><td>${r.servings}</td><td>${fmt(r.perServing.kcal, " kcal")} / porción</td><td>${escapeHtml(r.steps)}</td></tr>`).join("")}</tbody></table>`
            : emptyState("Crea tu primera receta.")}
        </div>
      </section>
    </div>`;
}

export function bind(ctx) {
  const form = document.querySelector("#recipeForm");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const macros = estimateRecipe(data.ingredients, foods);
    const servings = Number(data.servings) || 1;
    ctx.state.recipes.push({
      ...data,
      servings,
      total: macros,
      perServing: {
        kcal: macros.kcal / servings,
        protein: macros.protein / servings,
        carbs: macros.carbs / servings,
        fat: macros.fat / servings
      }
    });
    ctx.save();
    toast.success(`Receta "${data.name}" guardada`);
    ctx.render();
  });
}
