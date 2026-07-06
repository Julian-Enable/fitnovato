// Vista de calorías y macros detallados.
import { metric, card, sectionTitle } from "../components/ui.js";
import { fmt, one } from "../utils/format.js";
import { calcProfile, hasBodyProfile } from "../utils/calc.js";

export function render(state) {
  if (!hasBodyProfile(state.profile)) return completeProfilePrompt();
  const c = calcProfile(state.profile);
  const meals = Number(state.profile.meals) || 4;

  return `
    <div class="view-stack">
      ${sectionTitle("Mis calorías y macros", "Fórmula Mifflin-St Jeor + factor de actividad. Es una guía inicial, no una sentencia.")}

      <section class="card">
        <header class="card-head"><h2>Resumen</h2></header>
        <div class="card-body">
          <div class="grid grid-4">
            ${metric("IMC", one(c.bmi), "Referencia general")}
            ${metric("Tasa metabólica", fmt(c.bmr, " kcal"), "Energía en reposo")}
            ${metric("Mantenimiento", fmt(c.maintenance, " kcal"), "Gasto diario estimado")}
            ${metric("Meta diaria", fmt(c.goalCalories, " kcal"), state.profile.goal, { accent: "primary" })}
            ${metric("Déficit moderado", fmt(c.deficit, " kcal"), "Pérdida de grasa")}
            ${metric("Superávit", fmt(c.surplus, " kcal"), "Ganar músculo")}
            ${metric("Recomposición", fmt(c.recomposition, " kcal"), "Ligero ajuste")}
            ${metric("Peso ideal aprox.", `${one(c.idealLow)}-${one(c.idealHigh)} kg`, "Solo referencia")}
          </div>
        </div>
      </section>

      <section class="card">
        <header class="card-head">
          <h2>Macros diarios</h2>
          <p class="card-sub">Reparto sugerido según tu objetivo.</p>
        </header>
        <div class="card-body">
          <div class="macro-grid">
            <div class="macro-block macro-protein">
              <span class="macro-label">Proteína</span>
              <strong class="macro-value">${fmt(c.protein, " g")}</strong>
              <span class="macro-note">Cuida músculo y saciedad</span>
            </div>
            <div class="macro-block macro-carbs">
              <span class="macro-label">Carbohidratos</span>
              <strong class="macro-value">${fmt(c.carbs, " g")}</strong>
              <span class="macro-note">Energía para entrenar</span>
            </div>
            <div class="macro-block macro-fat">
              <span class="macro-label">Grasas</span>
              <strong class="macro-value">${fmt(c.fat, " g")}</strong>
              <span class="macro-note">Hormonas y saciedad</span>
            </div>
          </div>
        </div>
      </section>

      <section class="card">
        <header class="card-head"><h2>Por comida</h2><p class="card-sub">Dividido en ${meals} comidas. Mueve cantidades entre desayuno, almuerzo, cena y snacks.</p></header>
        <div class="card-body">
          <table class="data-table">
            <tbody>
              <tr><th>Calorías</th><td>${fmt(c.goalCalories / meals, " kcal")}</td></tr>
              <tr><th>Proteína</th><td>${fmt(c.protein / meals, " g")}</td></tr>
              <tr><th>Carbohidratos</th><td>${fmt(c.carbs / meals, " g")}</td></tr>
              <tr><th>Grasas</th><td>${fmt(c.fat / meals, " g")}</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>`;
}

function completeProfilePrompt() {
  return `<div class="view-stack">${sectionTitle("Completa tu perfil", "Ve a Mi perfil para registrar tus datos corporales.")}<button class="btn btn-primary" data-goto="perfil">Completar perfil</button></div>`;
}
