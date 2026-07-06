import { input, select, sectionTitle, emptyState } from "../components/ui.js";
import { fmt, escapeHtml } from "../utils/format.js";
import { calcProfile, diaryTotals, hasBodyProfile, macrosFor, entriesForDate, cardioCalories, todayISO } from "../utils/calc.js";
import { foods } from "../data/foods.js";
import { toast } from "../components/toast.js";

export function render(state) {
  if (!hasBodyProfile(state.profile)) return completeProfilePrompt();

  const selectedDate = state.selectedDiaryDate || todayISO();
  const catalog = [...foods, ...(state.customFoods || [])];
  const c = calcProfile(state.profile);
  const totals = diaryTotals(state.diary, selectedDate);
  const dayCardio = cardioCalories(state.cardio, selectedDate);
  const netCalories = Math.max(0, totals.kcal - dayCardio);
  const remaining = Math.max(0, c.goalCalories - netCalories);
  const over = netCalories > c.goalCalories;
  const dayEntries = entriesForDate(state.diary, selectedDate);

  return `
    <div class="view-stack">
      ${sectionTitle("Mi alimentacion", "Busca un alimento, elige una porcion casera o gramos, y agregalo al diario.")}

      <section class="card">
        <div class="card-body form-row">
          ${input("diaryDate", "Fecha del diario", selectedDate, "date")}
          <button class="btn btn-ghost" data-today-diary type="button">Hoy</button>
        </div>
      </section>

      <div class="grid grid-4">
        ${metric("Objetivo", fmt(c.goalCalories, " kcal"))}
        ${metric("Consumidas netas", fmt(netCalories, " kcal"), over ? "Te pasaste" : `${fmt(remaining)} restantes`, { accent: over ? "warn" : "primary" })}
        ${metric("Cardio", fmt(dayCardio, " kcal"), "Descontadas del dia")}
        ${metric("Macros", `${fmt(totals.protein, "P")} / ${fmt(totals.carbs, "C")} / ${fmt(totals.fat, "G")}`)}
      </div>

      <section class="card">
        <header class="card-head"><h2>Agregar comida</h2></header>
        <div class="card-body">
          <form id="mealForm" class="form-grid form-grid-2">
            ${select("meal", "Comida", ["Desayuno", "Almuerzo", "Cena", "Snack"], "Almuerzo")}
            ${input("foodSearch", "Buscar alimento", "", "search", { placeholder: "pollo, arroz, huevo..." })}
            <label class="field">
              <span class="field-label">Alimento</span>
              <select name="food">${catalog.map(f => `<option>${escapeHtml(f.name)}</option>`).join("")}</select>
            </label>
            <label class="field">
              <span class="field-label">Porcion</span>
              <select name="portion" id="portionSelect"></select>
            </label>
            ${input("grams", "Gramos", 100, "number", { min: 1, max: 2000 })}
            <div class="form-actions"><button class="btn btn-primary" type="submit">Agregar al diario</button></div>
          </form>
        </div>
      </section>

      <section class="card">
        <header class="card-head"><h2>Alimento personalizado</h2></header>
        <div class="card-body">
          <form id="customFoodForm" class="form-grid form-grid-4">
            ${input("name", "Nombre", "", "text", { placeholder: "Mi comida" })}
            ${input("kcal", "Kcal / 100 g", "", "number", { min: 0, max: 1000 })}
            ${input("protein", "Proteina / 100 g", "", "number", { min: 0, max: 100 })}
            ${input("carbs", "Carbos / 100 g", "", "number", { min: 0, max: 100 })}
            ${input("fat", "Grasa / 100 g", "", "number", { min: 0, max: 100 })}
            <div class="form-actions"><button class="btn btn-secondary" type="submit">Guardar alimento</button></div>
          </form>
        </div>
      </section>

      <section class="card">
        <header class="card-head">
          <h2>Comidas de la fecha</h2>
          ${dayEntries.length ? `<button class="btn btn-ghost btn-sm" data-clear-diary>Vaciar dia</button>` : ""}
        </header>
        <div class="card-body">
          ${dayEntries.length ? tableDiary(dayEntries) : emptyState("Aun no hay comidas registradas para esta fecha.")}
        </div>
      </section>

      <section class="card">
        <header class="card-head"><h2>Plan basico sugerido</h2></header>
        <div class="card-body">${renderMealPlan(state.profile)}</div>
      </section>
    </div>`;
}

function metric(label, value, note = "", opts = {}) {
  const accent = opts.accent ? ` metric--${opts.accent}` : "";
  return `<article class="metric${accent}"><span class="metric-label">${escapeHtml(label)}</span><strong class="metric-value">${escapeHtml(value)}</strong><small class="metric-note">${escapeHtml(note)}</small></article>`;
}

function tableDiary(diary) {
  return `<table class="data-table"><thead><tr><th>Comida</th><th>Alimento</th><th>Cantidad</th><th>Kcal</th><th>P/C/G</th><th></th></tr></thead><tbody>
    ${diary.map(i => `<tr><td>${escapeHtml(i.meal)}</td><td>${escapeHtml(i.name)}</td><td>${i.grams} g</td><td>${fmt(i.macros.kcal)}</td><td>${fmt(i.macros.protein)} / ${fmt(i.macros.carbs)} / ${fmt(i.macros.fat)}</td><td><button class="btn btn-ghost btn-sm" data-delete-meal="${escapeHtml(i.id)}">Eliminar</button></td></tr>`).join("")}
  </tbody></table>`;
}

function renderMealPlan(profile) {
  const goal = profile.goal;
  const avoid = String(profile.avoid || "").toLowerCase();
  const prefersEasy = String(profile.preferences || "").toLowerCase().includes("facil");
  const protein = avoid.includes("atun") ? "pollo" : "atun";
  const plan = [
    ["Desayuno", goal === "perder grasa" ? "2 huevos, arepa pequena, fruta y cafe sin azucar" : "Avena con leche, banano y 2 huevos"],
    ["Almuerzo", "Arroz, pechuga de pollo, ensalada grande y aguacate medido"],
    ["Cena", goal === "ganar masa muscular" ? "Carne magra, papa o yuca, verduras y yogur" : `${protein}, papa cocida y verduras`],
    ["Snack", prefersEasy ? "Yogur natural o fruta lista para llevar" : "Yogur natural, fruta o mani medido"]
  ];
  return `<div class="grid grid-4">${plan.map(([meal, desc]) => `<article class="mini-card"><span class="badge badge-accent">${escapeHtml(meal)}</span><p>${escapeHtml(desc)}</p></article>`).join("")}</div>
  <p class="form-msg">El plan evita lo que indicaste en tu perfil cuando hay una alternativa clara. Puedes cambiar equivalentes segun disponibilidad.</p>`;
}

function completeProfilePrompt() {
  return `<div class="view-stack">${sectionTitle("Completa tu perfil", "Ve a Mi perfil para registrar tus datos corporales.")}<button class="btn btn-primary" data-goto="perfil">Completar perfil</button></div>`;
}

export function bind(ctx) {
  const form = document.querySelector("#mealForm");
  if (!form) return;

  const foodEl = form.elements.food;
  const searchEl = form.elements.foodSearch;
  const portionEl = document.querySelector("#portionSelect");
  const selectedDate = () => ctx.state.selectedDiaryDate || todayISO();
  const catalog = () => [...foods, ...(ctx.state.customFoods || [])];

  const syncPortions = () => {
    const f = catalog().find(item => item.name === foodEl.value);
    if (!f) return;
    portionEl.innerHTML = f.portions.map(([label, grams]) => `<option value="${grams}">${escapeHtml(label)} (${grams} g)</option>`).join("") + `<option value="custom">Usar gramos manuales</option>`;
    form.elements.grams.value = f.portions[0][1];
  };

  const renderFoodOptions = () => {
    const q = String(searchEl?.value || "").trim().toLowerCase();
    const list = catalog().filter(f => !q || f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q));
    foodEl.innerHTML = list.map(f => `<option>${escapeHtml(f.name)}</option>`).join("");
    syncPortions();
  };

  searchEl?.addEventListener("input", renderFoodOptions);
  foodEl.addEventListener("change", syncPortions);
  portionEl.addEventListener("change", () => {
    if (portionEl.value !== "custom") form.elements.grams.value = portionEl.value;
  });
  syncPortions();

  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const f = catalog().find(item => item.name === data.food);
    if (!f) return;
    const grams = Number(data.grams);
    if (!grams || grams <= 0) { toast.error("Indica una cantidad valida"); return; }
    ctx.state.diary.push({ id: crypto.randomUUID(), dateISO: selectedDate(), meal: data.meal, name: f.name, grams, macros: macrosFor(f, grams) });
    ctx.save();
    toast.success(`${f.name} agregado al diario`);
    ctx.render();
  });

  document.querySelector("[name='diaryDate']")?.addEventListener("change", e => {
    ctx.state.selectedDiaryDate = e.target.value || todayISO();
    ctx.save();
    ctx.render();
  });

  document.querySelector("[data-today-diary]")?.addEventListener("click", () => {
    ctx.state.selectedDiaryDate = todayISO();
    ctx.save();
    ctx.render();
  });

  document.querySelector("#customFoodForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const name = String(data.name || "").trim();
    if (!name) { toast.error("Ponle nombre al alimento"); return; }
    ctx.state.customFoods = ctx.state.customFoods || [];
    ctx.state.customFoods.push({
      name,
      category: "Personalizados",
      kcal: Number(data.kcal) || 0,
      protein: Number(data.protein) || 0,
      carbs: Number(data.carbs) || 0,
      fat: Number(data.fat) || 0,
      fiber: 0,
      sugar: 0,
      sodium: 0,
      portions: [["100 g", 100]],
      tags: { deficit: false, bulk: false, highProtein: false, cheap: false, easy: true }
    });
    ctx.save();
    toast.success("Alimento personalizado guardado");
    ctx.render();
  });

  document.querySelectorAll("[data-delete-meal]").forEach(btn => {
    btn.addEventListener("click", () => {
      ctx.state.diary = ctx.state.diary.filter(item => item.id !== btn.dataset.deleteMeal);
      ctx.save();
      toast.info("Comida eliminada");
      ctx.render();
    });
  });

  document.querySelector("[data-clear-diary]")?.addEventListener("click", () => {
    ctx.state.diary = ctx.state.diary.filter(item => (item.dateISO || item.date) !== selectedDate());
    ctx.save();
    toast.info("Diario del dia vaciado");
    ctx.render();
  });
}
