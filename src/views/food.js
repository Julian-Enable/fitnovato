// Vista de diario de comidas: buscar alimento, elegir porción, agregar.
import { input, select, sectionTitle, button, emptyState } from "../components/ui.js";
import { fmt, escapeHtml } from "../utils/format.js";
import { calcProfile, diaryTotals, hasBodyProfile, macrosFor } from "../utils/calc.js";
import { foods } from "../data/foods.js";
import { toast } from "../components/toast.js";

export function render(state) {
  if (!hasBodyProfile(state.profile)) return completeProfilePrompt();
  const c = calcProfile(state.profile);
  const totals = diaryTotals(state.diary);
  const remaining = Math.max(0, c.goalCalories - totals.kcal);
  const over = totals.kcal > c.goalCalories;

  return `
    <div class="view-stack">
      ${sectionTitle("Mi alimentación", "Busca un alimento, elige una porción casera o gramos, y agrégalo al diario.")}

      <div class="grid grid-4">
        ${metric("Objetivo", fmt(c.goalCalories, " kcal"))}
        ${metric("Consumidas", fmt(totals.kcal, " kcal"), over ? "Te pasaste" : `${fmt(remaining)} restantes`, { accent: over ? "warn" : "primary" })}
        ${metric("Restantes", fmt(remaining, " kcal"))}
        ${metric("Macros", `${fmt(totals.protein, "P")} / ${fmt(totals.carbs, "C")} / ${fmt(totals.fat, "G")}`)}
      </div>

      <section class="card">
        <header class="card-head"><h2>Agregar comida</h2></header>
        <div class="card-body">
          <form id="mealForm" class="form-grid form-grid-2">
            ${select("meal", "Comida", ["Desayuno", "Almuerzo", "Cena", "Snack"], "Almuerzo")}
            <label class="field">
              <span class="field-label">Alimento</span>
              <select name="food">${foods.map(f => `<option>${escapeHtml(f.name)}</option>`).join("")}</select>
            </label>
            <label class="field">
              <span class="field-label">Porción</span>
              <select name="portion" id="portionSelect"></select>
            </label>
            ${input("grams", "Gramos", 100, "number", { min: 1, max: 2000 })}
            <div class="form-actions"><button class="btn btn-primary" type="submit">Agregar al diario</button></div>
          </form>
        </div>
      </section>

      <section class="card">
        <header class="card-head">
          <h2>Comidas de hoy</h2>
          ${state.diary.length ? `<button class="btn btn-ghost btn-sm" data-clear-diary>Vaciar diario</button>` : ""}
        </header>
        <div class="card-body">
          ${state.diary.length ? tableDiary(state.diary) : emptyState("Aún no hay comidas registradas hoy.")}
        </div>
      </section>

      <section class="card">
        <header class="card-head"><h2>Plan básico sugerido</h2></header>
        <div class="card-body">${renderMealPlan(state.profile.goal)}</div>
      </section>
    </div>`;
}

function metric(label, value, note = "", opts = {}) {
  const accent = opts.accent ? ` metric--${opts.accent}` : "";
  return `<article class="metric${accent}"><span class="metric-label">${escapeHtml(label)}</span><strong class="metric-value">${escapeHtml(value)}</strong><small class="metric-note">${escapeHtml(note)}</small></article>`;
}

function tableDiary(diary) {
  return `<table class="data-table"><thead><tr><th>Comida</th><th>Alimento</th><th>Cantidad</th><th>Kcal</th><th>P/C/G</th></tr></thead><tbody>
    ${diary.map(i => `<tr><td>${escapeHtml(i.meal)}</td><td>${escapeHtml(i.name)}</td><td>${i.grams} g</td><td>${fmt(i.macros.kcal)}</td><td>${fmt(i.macros.protein)} / ${fmt(i.macros.carbs)} / ${fmt(i.macros.fat)}</td></tr>`).join("")}
  </tbody></table>`;
}

function renderMealPlan(goal) {
  const plan = [
    ["Desayuno", goal === "perder grasa" ? "2 huevos, arepa pequeña, fruta y café sin azúcar" : "Avena con leche, banano y 2 huevos"],
    ["Almuerzo", "Arroz, pechuga de pollo, ensalada grande y aguacate medido"],
    ["Cena", goal === "ganar masa muscular" ? "Carne magra, papa o yuca, verduras y yogur" : "Atún o pescado, papa cocida y verduras"],
    ["Snack", "Yogur natural, fruta o maní medido"]
  ];
  return `<div class="grid grid-4">${plan.map(([meal, desc]) => `<article class="mini-card"><span class="badge badge-accent">${escapeHtml(meal)}</span><p>${escapeHtml(desc)}</p></article>`).join("")}</div>
  <p class="form-msg">Puedes cambiar proteínas por pollo, atún, huevo, carne, pescado, lentejas o fríjoles; carbohidratos por arroz, papa, yuca, arepa, avena o plátano; grasas por aguacate, maní o aceite de oliva.</p>`;
}

function completeProfilePrompt() {
  return `<div class="view-stack">${sectionTitle("Completa tu perfil", "Ve a Mi perfil para registrar tus datos corporales.")}<button class="btn btn-primary" data-goto="perfil">Completar perfil</button></div>`;
}

export function bind(ctx) {
  const form = document.querySelector("#mealForm");
  if (!form) return;

  const foodEl = form.elements.food;
  const portionEl = document.querySelector("#portionSelect");
  const syncPortions = () => {
    const f = foods.find(item => item.name === foodEl.value);
    if (!f) return;
    portionEl.innerHTML = f.portions.map(([label, grams]) => `<option value="${grams}">${escapeHtml(label)} (${grams} g)</option>`).join("") + `<option value="custom">Usar gramos manuales</option>`;
    form.elements.grams.value = f.portions[0][1];
  };
  foodEl.addEventListener("change", syncPortions);
  portionEl.addEventListener("change", () => {
    if (portionEl.value !== "custom") form.elements.grams.value = portionEl.value;
  });
  syncPortions();

  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const f = foods.find(item => item.name === data.food);
    if (!f) return;
    const grams = Number(data.grams);
    if (!grams || grams <= 0) { toast.error("Indica una cantidad válida"); return; }
    ctx.state.diary.push({ meal: data.meal, name: f.name, grams, macros: macrosFor(f, grams) });
    ctx.save();
    toast.success(`${f.name} agregado al diario`);
    ctx.render();
  });

  document.querySelector("[data-clear-diary]")?.addEventListener("click", () => {
    if (!ctx.state.diary.length) return;
    ctx.state.diary = [];
    ctx.save();
    toast.info("Diario vaciado");
    ctx.render();
  });
}
