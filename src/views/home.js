// Vista de inicio: dashboard con métricas clave y accesos rápidos.
import { metric, card, sectionTitle, button } from "../components/ui.js";
import { fmt, one, escapeHtml } from "../utils/format.js";
import { calcProfile, diaryTotals, hasBodyProfile, buildRoutine, cardioCalories, todayISO } from "../utils/calc.js";
import { exercises as allExercises } from "../data/exercises.js";

export function render(state, user) {
  if (!hasBodyProfile(state.profile)) {
    return completeProfilePrompt();
  }
  const selectedDate = state.selectedDiaryDate || todayISO();
  const calc = calcProfile(state.profile);
  const totals = diaryTotals(state.diary, selectedDate);
  const dayCardio = cardioCalories(state.cardio, selectedDate);
  const netCalories = Math.max(0, totals.kcal - dayCardio);
  const routine = buildRoutine(state.profile, allExercises);
  const remaining = Math.max(0, calc.goalCalories - netCalories);
  const caloriePercent = Math.min(100, Math.round((netCalories / calc.goalCalories) * 100));
  const proteinPercent = Math.min(100, Math.round((totals.protein / calc.protein) * 100));
  const name = state.profile.name || user?.name || "vamos paso a paso";

  return `
    <div class="view-stack">
      ${sectionTitle(`Hola, ${name}`, "No necesitas hacerlo perfecto. Registra lo importante y ajusta con calma.", `<span class="badge badge-accent">${escapeHtml(state.profile.goal)}</span>`)}

      <section class="card hero-card">
        <div class="hero-stats">
          <div class="hero-stat-main">
            <span class="metric-label">Calorías hoy</span>
            <strong class="hero-value">${fmt(netCalories)}<small> / ${fmt(calc.goalCalories)} kcal</small></strong>
            <div class="progress"><div class="progress-fill" style="width: ${caloriePercent}%"></div></div>
            <span class="metric-note">${fmt(remaining)} restantes · cardio ${fmt(dayCardio)} kcal</span>
          </div>
          <div class="hero-stat-side">
            <span class="metric-label">Proteína</span>
            <strong>${fmt(totals.protein)}<small> / ${fmt(calc.protein)} g</small></strong>
            <div class="progress progress-thin"><div class="progress-fill progress-fill-accent" style="width: ${proteinPercent}%"></div></div>
          </div>
        </div>
      </section>

      <div class="grid grid-4">
        ${metric("Mantenimiento", fmt(calc.maintenance, " kcal"), "Gasto diario estimado")}
        ${metric("Meta diaria", fmt(calc.goalCalories, " kcal"), state.profile.goal, { accent: "primary" })}
        ${metric("Peso actual", `${one(state.profile.weight)} kg`, `Meta: ${state.profile.targetWeight || "—"} kg`)}
        ${metric("IMC", one(calc.bmi), "Referencia general")}
      </div>

      <section class="card">
        <header class="card-head">
          <h2>Entrenamiento de hoy</h2>
          <p class="card-sub">${escapeHtml(routine.name)} · ${escapeHtml(routine.days[0].focus)}</p>
        </header>
        <div class="card-body">
          <p class="workout-summary">${routine.days[0].exercises.length} ejercicios · ${escapeHtml(state.profile.minutes)} min · ${escapeHtml(routine.days[0].cardio)}</p>
          <div class="btn-row">
            <button class="btn btn-primary" data-goto="entrenamiento">Empezar entrenamiento</button>
            <button class="btn btn-ghost" data-goto="rutina">Ver rutina completa</button>
          </div>
        </div>
      </section>

      <div class="quick-actions">
        <button class="quick-action" data-goto="alimentacion">
          <span class="quick-action-icon">📝</span>
          <span>Registrar comida</span>
        </button>
        <button class="quick-action" data-goto="plato">
          <span class="quick-action-icon">🍽</span>
          <span>Crear plato</span>
        </button>
        <button class="quick-action" data-goto="progreso">
          <span class="quick-action-icon">⚖️</span>
          <span>Registrar peso</span>
        </button>
        <button class="quick-action" data-goto="cardio">
          <span class="quick-action-icon">🏃</span>
          <span>Cardio</span>
        </button>
      </div>
    </div>`;
}

function completeProfilePrompt() {
  return `
    <div class="view-stack">
      ${sectionTitle("Completa tu perfil fitness", "Tu cuenta ya existe, pero todavía no hay datos corporales ni preferencias. La app no calculará calorías ni rutinas hasta que llenes esa información.")}
      <section class="card">
        <div class="card-body">
          <p>Ve a <strong>Mi perfil</strong> y registra edad, sexo, peso, estatura, objetivo, días de entrenamiento, actividad y comidas al día.</p>
          <button class="btn btn-primary" data-goto="perfil">Completar perfil</button>
        </div>
      </section>
    </div>`;
}
