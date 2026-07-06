// Vista de perfil: formulario completo con validación.
import { input, select, textarea, sectionTitle } from "../components/ui.js";
import { toast } from "../components/toast.js";
import { hasBodyProfile } from "../utils/calc.js";
import { ageOptions, heightOptions, weightOptions, daysOptions, minutesOptions, mealsOptions, budgetOptions } from "../data/profile-options.js";

export function render(state) {
  const p = state.profile;
  return `
    <div class="view-stack">
      ${sectionTitle("Mi perfil", "Con estos datos se calculan calorías, macros, planes y rutinas.", hasBodyProfile(p) ? `<span class="badge badge-success">Completo</span>` : `<span class="badge badge-warn">Incompleto</span>`)}
      <form id="profileForm" class="card form-grid">
        <div class="form-section">
          <h3 class="form-section-title">Datos personales</h3>
          <div class="form-grid-3">
            ${input("name", "Nombre", p.name)}
            ${select("age", "Edad", ageOptions, p.age ? String(p.age) : "")}
            ${select("sex", "Sexo", ["mujer", "hombre"], p.sex)}
            ${select("weight", "Peso actual (kg)", weightOptions, p.weight ? String(p.weight) : "")}
            ${select("height", "Estatura (cm)", heightOptions, p.height ? String(p.height) : "")}
            ${select("targetWeight", "Peso objetivo (kg)", weightOptions, p.targetWeight ? String(p.targetWeight) : "")}
          </div>
        </div>

        <div class="form-section">
          <h3 class="form-section-title">Experiencia y objetivo</h3>
          <div class="form-grid-3">
            ${select("experience", "Experiencia", ["principiante", "intermedio", "avanzado"], p.experience)}
            ${select("goal", "Objetivo", ["perder grasa", "ganar masa muscular", "mantener peso", "recomposición corporal"], p.goal)}
            ${select("deficit", "Nivel de déficit", ["suave", "moderado", "alto controlado"], p.deficit)}
          </div>
        </div>

        <div class="form-section">
          <h3 class="form-section-title">Entrenamiento</h3>
          <div class="form-grid-3">
            ${select("days", "Días por semana", daysOptions, p.days ? String(p.days) : "")}
            ${select("minutes", "Minutos por sesión", minutesOptions, p.minutes ? String(p.minutes) : "")}
            ${select("place", "Lugar", ["gimnasio completo", "gimnasio básico", "casa"], p.place)}
          </div>
        </div>

        <div class="form-section">
          <h3 class="form-section-title">Estilo de vida</h3>
          <div class="form-grid-3">
            ${select("activity", "Actividad diaria", ["sedentaria", "ligera", "moderada", "alta"], p.activity)}
            ${select("meals", "Comidas al día", mealsOptions, p.meals ? String(p.meals) : "")}
            ${select("budget", "Presupuesto", budgetOptions, p.budget)}
          </div>
        </div>

        <div class="form-section">
          <h3 class="form-section-title">Preferencias y limitaciones</h3>
          <div class="form-grid-3">
            ${textarea("limitations", "Lesiones o molestias", p.limitations)}
            ${textarea("avoid", "Alimentos que no consumes", p.avoid)}
            ${textarea("preferences", "Preferencias alimentarias", p.preferences)}
          </div>
        </div>

        <div class="form-actions">
          <button class="btn btn-primary" type="submit">Guardar perfil</button>
        </div>
      </form>
    </div>`;
}

export function bind(ctx) {
  const form = document.querySelector("#profileForm");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    ["age", "weight", "height", "days", "minutes", "meals", "targetWeight"].forEach(k => {
      data[k] = Number(data[k]);
    });
    // Validación mínima (safety net, los selects ya limitan las opciones)
    if (data.age && (data.age < 12 || data.age > 100)) {
      toast.error("La edad debe estar entre 12 y 100 años");
      return;
    }
    if (data.weight && (data.weight < 30 || data.weight > 250)) {
      toast.error("El peso debe estar entre 30 y 250 kg");
      return;
    }
    Object.assign(ctx.state.profile, data);
    ctx.save();
    toast.success("Perfil guardado");
    ctx.render();
  });
}
