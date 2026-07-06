import { input, textarea, sectionTitle, emptyState } from "../components/ui.js";
import { fmt, escapeHtml } from "../utils/format.js";
import { estimateRecipe, todayISO } from "../utils/calc.js";
import { foods } from "../data/foods.js";
import { toast } from "../components/toast.js";

export function render(state) {
  return `
    <div class="view-stack">
      ${sectionTitle("Recetas", "Guarda recetas por porciones y luego usalas como comidas frecuentes.")}
      <form id="recipeForm" class="card form-grid form-grid-2">
        ${input("name", "Nombre", "Sudado practico de pollo")}
        ${input("servings", "Porciones", 3, "number", { min: 1, max: 20 })}
        ${textarea("ingredients", "Ingredientes y cantidades", "pollo 360 g, papa 300 g, arroz 240 g, ensalada 200 g")}
        ${textarea("steps", "Preparacion", "Cocina el pollo con verduras, acompana con papa y arroz medido.")}
        <div class="form-actions form-actions-span2">
          <button class="btn btn-primary" type="submit">Guardar receta</button>
        </div>
      </form>

      <section class="card">
        <header class="card-head"><h2>Recetas guardadas</h2></header>
        <div class="card-body">
          ${state.recipes.length
            ? `<table class="data-table"><thead><tr><th>Receta</th><th>Porciones</th><th>Estimado</th><th>Preparacion</th><th></th></tr></thead><tbody>${state.recipes.map(r => `<tr><td>${escapeHtml(r.name)}</td><td>${r.servings}</td><td>${fmt(r.perServing.kcal, " kcal")} / porcion</td><td>${escapeHtml(r.steps)}</td><td><div class="btn-row"><button class="btn btn-ghost btn-sm" data-add-recipe="${escapeHtml(r.id)}">Agregar</button><button class="btn btn-ghost btn-sm" data-delete-recipe="${escapeHtml(r.id)}">Eliminar</button></div></td></tr>`).join("")}</tbody></table>`
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
      id: crypto.randomUUID(),
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

  document.querySelectorAll("[data-add-recipe]").forEach(btn => {
    btn.addEventListener("click", () => {
      const recipe = ctx.state.recipes.find(item => item.id === btn.dataset.addRecipe);
      if (!recipe) return;
      ctx.state.diary.push({
        id: crypto.randomUUID(),
        dateISO: ctx.state.selectedDiaryDate || todayISO(),
        meal: "Almuerzo",
        name: recipe.name,
        grams: "1 porcion",
        macros: recipe.perServing
      });
      ctx.save();
      toast.success("Receta agregada al diario");
      ctx.render();
    });
  });

  document.querySelectorAll("[data-delete-recipe]").forEach(btn => {
    btn.addEventListener("click", () => {
      ctx.state.recipes = ctx.state.recipes.filter(item => item.id !== btn.dataset.deleteRecipe);
      ctx.save();
      toast.info("Receta eliminada");
      ctx.render();
    });
  });
}
