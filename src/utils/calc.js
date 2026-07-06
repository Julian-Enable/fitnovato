// Cálculos de nutrición, rutinas y progresión.
// Todo extraído del app.js original, sin cambios en la lógica.

export function emptyMacros() {
  return { kcal: 0, protein: 0, carbs: 0, fat: 0 };
}

export function addMacros(a, b) {
  return {
    kcal: a.kcal + b.kcal,
    protein: a.protein + b.protein,
    carbs: a.carbs + b.carbs,
    fat: a.fat + b.fat
  };
}

export function macrosFor(foodItem, grams) {
  const ratio = grams / 100;
  return {
    kcal: foodItem.kcal * ratio,
    protein: foodItem.protein * ratio,
    carbs: foodItem.carbs * ratio,
    fat: foodItem.fat * ratio
  };
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function entriesForDate(entries = [], dateISO = todayISO()) {
  return entries.filter(item => (item.dateISO || item.date) === dateISO);
}

export function diaryTotals(diary = [], dateISO = todayISO()) {
  return entriesForDate(diary, dateISO).reduce((sum, item) => addMacros(sum, item.macros), emptyMacros());
}

export function cardioCalories(cardio = [], dateISO = todayISO()) {
  return entriesForDate(cardio, dateISO).reduce((sum, item) => sum + (Number(item.calories) || 0), 0);
}

export function hasBodyProfile(profile = {}) {
  return Boolean(
    Number(profile.age) &&
    Number(profile.weight) &&
    Number(profile.height) &&
    profile.sex &&
    profile.experience &&
    profile.goal &&
    Number(profile.days) &&
    Number(profile.minutes) &&
    profile.place &&
    profile.activity &&
    Number(profile.meals) &&
    profile.deficit
  );
}

export function calcProfile(profile = {}) {
  if (!hasBodyProfile(profile)) {
    return {
      bmi: 0, bmr: 0, maintenance: 0, deficit: 0, surplus: 0,
      recomposition: 0, goalCalories: 0, protein: 0, carbs: 0, fat: 0,
      idealLow: 0, idealHigh: 0,
      pace: "Completa tu perfil para calcularlo"
    };
  }
  const heightM = profile.height / 100;
  const bmi = profile.weight / (heightM * heightM);
  const bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + (profile.sex === "hombre" ? 5 : -161);
  const activity = { sedentaria: 1.2, ligera: 1.375, moderada: 1.55, alta: 1.725 }[profile.activity] || 1.375;
  const maintenance = bmr * activity;
  const deficitMap = { suave: 0.88, moderado: 0.8, "alto controlado": 0.72 };
  const goalCalories = profile.goal === "perder grasa"
    ? maintenance * deficitMap[profile.deficit]
    : profile.goal === "ganar masa muscular"
      ? maintenance * 1.1
      : profile.goal === "recomposición corporal"
        ? maintenance * 0.95
        : maintenance;
  const protein = profile.goal === "ganar masa muscular" ? profile.weight * 2 : profile.weight * 1.8;
  const fat = profile.weight * (profile.goal === "perder grasa" ? 0.7 : 0.85);
  const carbs = Math.max(80, (goalCalories - protein * 4 - fat * 9) / 4);
  const idealLow = 18.5 * heightM * heightM;
  const idealHigh = 24.9 * heightM * heightM;
  return {
    bmi, bmr, maintenance,
    deficit: maintenance * 0.8,
    surplus: maintenance * 1.1,
    recomposition: maintenance * 0.95,
    goalCalories, protein, carbs, fat, idealLow, idealHigh,
    pace: profile.goal === "perder grasa"
      ? "0,3 a 0,8 kg por semana"
      : profile.goal === "ganar masa muscular"
        ? "0,2 a 0,5 kg por semana"
        : "cambios lentos y medibles"
  };
}

/**
 * Construye la rutina según el perfil del usuario.
 * @param {object} profile - state.profile
 * @param {Array}  exercises - catálogo de ejercicios
 */
export function buildRoutine(profile = {}, exercises = []) {
  const home = profile.place === "casa";
  const avoidMuscles = musclesToAvoid(profile.limitations);
  const avoidNames = exerciseNamesToAvoid(profile.limitations);
  const pool = exercises
    .filter(e => (home ? e.place !== "gym" : e.place !== "casa"))
    .filter(e => e.level === "principiante" || profile.experience !== "principiante")
    .filter(e => !avoidMuscles.has(e.muscle))
    .filter(e => !(e.secondary || []).some(m => avoidMuscles.has(m)))
    .filter(e => !avoidNames.has(e.name));
  const days = Math.max(2, Math.min(5, Number(profile.days) || 3));
  const goal = profile.goal;
  const name = goal === "ganar masa muscular"
    ? "Hipertrofia básica"
    : goal === "perder grasa"
      ? "Fuerza + cardio para pérdida de grasa"
      : "Full body sostenible";
  const focus = days <= 3
    ? ["Full body A", "Full body B", "Full body C"]
    : ["Tren superior", "Tren inferior", "Empuje y abdomen", "Pierna y cardio", "Full body suave"];
  return {
    name,
    days: Array.from({ length: days }, (_, i) => {
      const selected = pickExercises(pool, focus[i]);
      return {
        day: i + 1,
        focus: focus[i],
        note: "Prioriza técnica, rango cómodo y progreso pequeño.",
        exercises: selected,
        cardio: goal === "perder grasa" ? "10-20 min suave al final" : "5-10 min suave opcional"
      };
    })
  };
}

function musclesToAvoid(limitations = "") {
  const text = String(limitations).toLowerCase();
  const map = [
    [["rodilla", "menisco", "ligamento"], ["Pierna"]],
    [["lumbar", "espalda baja", "ciatica", "ciática"], ["Glúteo"]],
    [["hombro", "manguito"], ["Hombro", "Pecho"]],
    [["codo"], ["Bíceps", "Tríceps"]],
    [["muñeca", "muneca"], ["Pecho", "Bíceps", "Tríceps"]]
  ];
  return new Set(map.flatMap(([keys, muscles]) => keys.some(k => text.includes(k)) ? muscles : []));
}

function exerciseNamesToAvoid(limitations = "") {
  const text = String(limitations).toLowerCase();
  const names = [];
  if (/(rodilla|menisco|ligamento)/.test(text)) names.push("Sentadilla goblet", "Prensa", "Zancadas");
  if (/(lumbar|espalda baja|ciatica|ciática)/.test(text)) names.push("Peso muerto rumano");
  if (/(hombro|manguito)/.test(text)) names.push("Press banca", "Press militar sentado");
  return new Set(names);
}

function pickExercises(pool, focus) {
  const wanted = focus.includes("superior")
    ? ["Pecho", "Espalda", "Hombro", "Bíceps", "Tríceps"]
    : focus.includes("inferior") || focus.includes("Pierna")
      ? ["Pierna", "Glúteo", "Abdomen", "Movilidad"]
      : ["Pierna", "Pecho", "Espalda", "Glúteo", "Abdomen", "Cardio"];
  return wanted.map(m => pool.find(e => e.muscle === m)).filter(Boolean).slice(0, 6);
}

export function progressionAdvice(entries = []) {
  if (entries.some(e => ["Sentí dolor", "Senti dolor"].includes(e.feeling))) return "Baja el peso o cambia el ejercicio la próxima vez. El dolor manda.";
  const easy = entries.some(e => ["Muy fácil", "Muy facil"].includes(e.feeling));
  const completed = entries.every(e => {
    const targetMax = targetMaxFromRange(e.targetReps || e.reps);
    const actual = parseReps(e.reps);
    return actual.length > 0 && actual.every(n => n >= targetMax);
  });
  const hard = entries.some(e => ["Muy difícil", "Difícil", "Muy dificil", "Dificil"].includes(e.feeling));
  if (completed && !hard) {
    return easy
      ? "Puedes subir un poco el peso la próxima vez."
      : "Buen trabajo. Mantén el peso o sube muy poco si la técnica fue sólida.";
  }
  if (hard) return "Mantén el mismo peso hasta completar mejor las repeticiones.";
  return "Repite este peso la próxima sesión e intenta sumar una repetición.";
}

function parseReps(repsStr) {
  // Acepta "12,12,10", "10-12", "12"
  return String(repsStr || "")
    .split(/[,\-]/)
    .map(s => Number(s.trim()))
    .filter(n => Number.isFinite(n));
}

function targetMaxFromRange(repsStr) {
  const nums = parseReps(repsStr);
  return nums.length ? Math.max(...nums) : 12;
}

export function weeklyAdjustment(a = {}, progress = [], profileGoal = "") {
  const recommendations = [];
  const noDropTwoWeeks = progress.length >= 2
    && progress.at(-1).weight >= progress.at(-2).weight
    && profileGoal === "perder grasa";
  if (a.pain === "sí") recommendations.push("Prioridad: baja peso, reduce rango o cambia el ejercicio que molestó. No entrenes sobre dolor agudo.");
  if (a.training === "no") recommendations.push("Reduce días o duración por una semana. Mantén ejercicios principales y haz sesiones más cortas.");
  if (a.hunger === "sí") recommendations.push("Usa alimentos más saciantes: verduras, papa cocida, frutas enteras, proteína en cada comida y revisa el tamaño del déficit.");
  if (noDropTwoWeeks) recommendations.push("Si cumpliste bien y no bajaste en 2 semanas, reduce 100-150 kcal o agrega 10 minutos de cardio suave.");
  if (a.energy === "no") recommendations.push("Sube 100-150 kcal o reduce cardio por unos días. El plan debe ser sostenible.");
  return recommendations.length ? recommendations : ["Mantén el plan una semana más. Ajusta solo cuando la tendencia lo pida."];
}

export function progressMessage(entries = [], profileGoal = "") {
  if (entries.length < 2) return "Registra al menos dos semanas para ver una lectura de tendencia.";
  const last = entries.at(-1);
  const prev = entries.at(-2);
  if (profileGoal === "perder grasa" && last.weight < prev.weight) return "Vas bajando de forma progresiva. Mantén el plan esta semana.";
  if (last.weight === prev.weight && last.training === "bien") return "Tu peso no cambió, pero cumpliste tus entrenamientos. Mantén el plan una semana más.";
  return "Observa la tendencia, no un solo día. Ajusta solo si se repite por varias semanas.";
}

export function estimateRecipe(text, foods = []) {
  const lower = String(text || "").toLowerCase();
  if (!lower) return emptyMacros();
  return foods.reduce((sum, f) => {
    const words = f.name.toLowerCase().split(/\s+/);
    const needle = words.slice(0, 2).join("\\s+");
    const units = "g|gr|gramos|ml|mililitros|taza|tazas|cucharada|cucharadas|cucharadita|cucharaditas|unidad|unidades";
    const re = new RegExp(`(?:(\\d{1,5})\\s*(${units})[^,.;\\n]{0,40}${needle}|${needle}[^0-9]{0,40}(\\d{1,5})\\s*(${units}))`, "i");
    const match = lower.match(re);
    if (!match) return sum;
    const amount = Number(match[1] || match[3]);
    const unit = String(match[2] || match[4] || "g").toLowerCase();
    const grams = unitToGrams(amount, unit, f);
    if (!Number.isFinite(grams) || grams <= 0 || grams > 5000) return sum;
    return addMacros(sum, macrosFor(f, grams));
  }, emptyMacros());
}

function unitToGrams(amount, unit, foodItem) {
  if (["g", "gr", "gramos", "ml", "mililitros"].includes(unit)) return amount;
  if (["cucharada", "cucharadas"].includes(unit)) return amount * 15;
  if (["cucharadita", "cucharaditas"].includes(unit)) return amount * 5;
  if (["taza", "tazas"].includes(unit)) return amount * 240;
  if (["unidad", "unidades"].includes(unit)) return amount * (foodItem.portions?.[0]?.[1] || 100);
  return amount;
}

export function calculatePlate(form, foods = []) {
  const pairs = [["protein", "proteinG"], ["carb", "carbG"], ["fat", "fatG"], ["veg", "vegG"], ["extra", "extraG"]];
  return pairs.reduce((sum, [foodName, gramsName]) => {
    const f = foods.find(item => item.name === form.elements[foodName].value);
    if (!f) return sum;
    return addMacros(sum, macrosFor(f, Number(form.elements[gramsName].value) || 0));
  }, emptyMacros());
}

export function marketCategory(category) {
  const map = {
    "Proteínas": "Proteínas",
    "Carbohidratos": "Carbohidratos",
    "Grasas": "Grasas saludables",
    "Verduras": "Verduras",
    "Frutas": "Frutas",
    "Lácteos": "Lácteos"
  };
  return map[category] || "Otros";
}

export function groupBy(list, fn) {
  return list.reduce((acc, item) => {
    const key = fn(item);
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
}
