// Vista de perfil: formulario completo con validación.
import { input, select, textarea, sectionTitle } from "../components/ui.js";
import { toast } from "../components/toast.js";
import { hasBodyProfile } from "../utils/calc.js";

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
            ${input("age", "Edad", p.age, "number", { min: 12, max: 100 })}
            ${select("sex", "Sexo", ["mujer", "hombre"], p.sex)}
            ${input("weight", "Peso actual (kg)", p.weight, "number", { min: 30, max: 250, step: 0.1 })}
            ${input("height", "Estatura (cm)", p.height, "number", { min: 120, max: 230 })}
            ${input("targetWeight", "Peso objetivo (kg)", p.targetWeight, "number", { min: 30, max: 250, step: 0.1 })}
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
            ${input("days", "Días por semana", p.days, "number", { min: 1, max: 7 })}
            ${input("minutes", "Minutos por sesión", p.minutes, "number", { min: 15, max: 180 })}
            ${select("place", "Lugar", ["gimnasio completo", "gimnasio básico", "casa"], p.place)}
          </div>
        </div>

        <div class="form-section">
          <h3 class="form-section-title">Estilo de vida</h3>
          <div class="form-grid-3">
            ${select("activity", "Actividad diaria", ["sedentaria", "ligera", "moderada", "alta"], p.activity)}
            ${input("meals", "Comidas al día", p.meals, "number", { min: 2, max: 8 })}
            ${input("budget", "Presupuesto", p.budget)}
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
    // Validación mínima
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
