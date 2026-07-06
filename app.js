const STORE_KEY = "fitnovato-v1";
const AUTH_KEY = "fitnovato-auth-v1";
const API_URL_KEY = "fitnovato-api-url";

const navItems = [
  ["inicio", "Inicio"],
  ["perfil", "Mi perfil"],
  ["calorias", "Mis calorías"],
  ["alimentacion", "Mi alimentación"],
  ["plato", "Crear plato"],
  ["recetas", "Recetas"],
  ["mercado", "Lista de mercado"],
  ["rutina", "Mi rutina"],
  ["entrenamiento", "Mi entrenamiento"],
  ["ejercicios", "Guía de ejercicios"],
  ["cardio", "Cardio"],
  ["progreso", "Mi progreso"],
  ["ajustes", "Ajustar plan"],
  ["aprende", "Aprende"],
  ["config", "Configuración"]
];

const foods = [
  food("Arroz blanco cocido", "Carbohidratos", 130, 2.7, 28, 0.3, 0.4, 0.1, 1, [["1 taza", 160], ["1 cucharada", 15], ["plato común", 220]], true, true, false, true, true),
  food("Arepa de maíz", "Carbohidratos", 218, 5, 45, 2.5, 3, 1, 290, [["1 unidad mediana", 80], ["1 unidad pequeña", 55]], true, true, false, true, true),
  food("Huevo entero", "Proteínas", 143, 13, 1.1, 10, 0, 0.4, 140, [["1 unidad", 50], ["2 unidades", 100]], true, true, true, true, true),
  food("Pechuga de pollo", "Proteínas", 165, 31, 0, 3.6, 0, 0, 74, [["1 filete", 120], ["media pechuga", 160]], true, true, true, true, true),
  food("Atún en agua", "Proteínas", 116, 26, 0, 1, 0, 0, 300, [["1 lata escurrida", 100], ["media lata", 50]], true, true, true, true, true),
  food("Carne magra", "Proteínas", 190, 28, 0, 8, 0, 0, 70, [["1 porción", 120], ["bistec pequeño", 90]], true, true, true, false, true),
  food("Pescado blanco", "Proteínas", 105, 22, 0, 1.8, 0, 0, 85, [["1 filete", 130]], true, true, true, false, true),
  food("Fríjoles cocidos", "Proteínas", 127, 8.7, 22.8, 0.5, 6.4, 0.3, 2, [["1 taza", 170], ["medio pocillo", 90]], true, true, false, true, false),
  food("Lentejas cocidas", "Proteínas", 116, 9, 20, 0.4, 7.9, 1.8, 2, [["1 taza", 180], ["medio pocillo", 90]], true, true, false, true, false),
  food("Garbanzos cocidos", "Proteínas", 164, 8.9, 27, 2.6, 7.6, 4.8, 7, [["1 taza", 165], ["medio pocillo", 85]], true, true, false, true, false),
  food("Papa cocida", "Carbohidratos", 87, 1.9, 20, 0.1, 1.8, 0.9, 4, [["1 papa mediana", 150], ["media papa", 75]], true, true, false, true, true),
  food("Yuca cocida", "Carbohidratos", 160, 1.4, 38, 0.3, 1.8, 1.7, 14, [["1 trozo mediano", 100], ["plato común", 180]], false, true, false, true, false),
  food("Plátano maduro", "Carbohidratos", 122, 1.3, 32, 0.4, 2.3, 15, 4, [["media unidad", 90], ["1 tajada", 35]], false, true, false, true, false),
  food("Avena en hojuelas", "Carbohidratos", 389, 17, 66, 7, 10.6, 1, 2, [["media taza", 40], ["1 cucharada", 10]], true, true, true, true, true),
  food("Aguacate", "Grasas", 160, 2, 8.5, 14.7, 6.7, 0.7, 7, [["medio aguacate pequeño", 70], ["2 cucharadas", 30]], true, true, false, false, true),
  food("Queso campesino", "Lácteos", 265, 18, 2, 20, 0, 1, 620, [["1 tajada", 30], ["porción mediana", 60]], false, true, true, false, true),
  food("Pan integral", "Carbohidratos", 247, 9, 41, 4, 7, 5, 400, [["1 tajada", 30], ["2 tajadas", 60]], true, true, false, true, true),
  food("Café sin azúcar", "Bebidas", 2, 0.2, 0, 0, 0, 0, 2, [["1 taza", 240]], true, true, false, true, true),
  food("Chocolate de mesa con leche", "Bebidas", 95, 3, 14, 3, 1, 12, 55, [["1 pocillo", 200]], false, true, false, false, true),
  food("Leche semidescremada", "Lácteos", 50, 3.4, 5, 1.7, 0, 5, 44, [["1 vaso", 240], ["media taza", 120]], true, true, false, true, true),
  food("Yogur natural", "Lácteos", 61, 3.5, 4.7, 3.3, 0, 4.7, 46, [["1 vaso", 200], ["1 porción", 125]], true, true, false, true, true),
  food("Banano", "Frutas", 89, 1.1, 23, 0.3, 2.6, 12, 1, [["1 unidad", 118], ["medio banano", 60]], true, true, false, true, true),
  food("Manzana", "Frutas", 52, 0.3, 14, 0.2, 2.4, 10, 1, [["1 unidad", 150]], true, false, false, true, true),
  food("Ensalada mixta", "Verduras", 28, 1.4, 5.3, 0.3, 2, 2.5, 25, [["1 taza", 90], ["plato común", 140]], true, false, false, true, true),
  food("Empanada de carne", "Otros", 310, 9, 28, 18, 2, 1, 430, [["1 unidad", 90]], false, true, false, false, true),
  food("Buñuelo", "Otros", 350, 8, 33, 21, 1, 3, 510, [["1 unidad", 80]], false, true, false, false, true),
  food("Chorizo", "Proteínas", 455, 24, 2, 38, 0, 1, 980, [["1 unidad", 80]], false, true, true, false, true),
  food("Sancocho de pollo", "Comidas caseras", 95, 7, 12, 2, 1.7, 1.8, 240, [["1 plato hondo", 450], ["medio plato", 250]], true, true, false, true, false),
  food("Sudado de pollo", "Comidas caseras", 142, 13, 13, 4.5, 1.8, 2, 240, [["1 plato común", 380], ["porción pequeña", 250]], true, true, true, true, false),
  food("Almuerzo corriente", "Comidas caseras", 150, 10, 18, 4.5, 2.5, 2, 320, [["1 plato común", 550], ["medio plato", 320]], false, true, false, true, false),
  food("Bandeja paisa ajustada", "Comidas caseras", 185, 13, 18, 7, 4, 2, 390, [["1 plato ajustado", 520]], false, true, true, false, false),
  food("Maní", "Grasas", 567, 26, 16, 49, 8.5, 4, 18, [["1 puñado", 30], ["1 cucharada", 15]], false, true, true, true, true)
];

const exercises = [
  ex("Sentadilla goblet", "Pierna", ["Glúteo", "Abdomen"], "principiante", "Mancuerna", "ambos", "Baja con el pecho alto y rodillas siguiendo la punta de los pies.", ["Apoya bien los pies", "Baja controlado", "Sube empujando el piso"], ["Meter rodillas", "Redondear espalda"], 3, "8-12", "75 s", ["Prensa", "Zancadas", "Sentadilla a caja"]),
  ex("Prensa", "Pierna", ["Glúteo"], "principiante", "Máquina", "gym", "Empuja la plataforma sin bloquear las rodillas.", ["Ajusta el asiento", "Baja hasta sentir control", "Empuja sin despegar la cadera"], ["Bajar demasiado", "Bloquear rodillas"], 3, "10-12", "90 s", ["Sentadilla goblet", "Zancadas", "Extensión de pierna"]),
  ex("Press banca", "Pecho", ["Tríceps", "Hombro"], "principiante", "Barra o máquina", "gym", "Empuja desde el pecho con control y hombros estables.", ["Escápulas atrás", "Baja suave", "Sube sin rebotar"], ["Rebotar la barra", "Abrir demasiado los codos"], 3, "8-12", "90 s", ["Press en máquina", "Press con mancuernas", "Flexiones"]),
  ex("Flexiones modificadas", "Pecho", ["Tríceps", "Abdomen"], "principiante", "Peso corporal", "ambos", "Flexión con rodillas apoyadas o manos elevadas.", ["Cuerpo firme", "Baja hasta donde controles", "Sube empujando fuerte"], ["Cadera caída", "Cuello tenso"], 3, "8-12", "60 s", ["Press en máquina", "Press mancuernas"]),
  ex("Jalón al pecho", "Espalda", ["Bíceps"], "principiante", "Polea", "gym", "Trae la barra hacia la parte alta del pecho sin balancearte.", ["Pecho arriba", "Codos hacia abajo", "Controla la subida"], ["Jalar con impulso", "Encoger hombros"], 3, "10-12", "75 s", ["Remo en polea", "Remo con mancuerna", "Dominadas asistidas"]),
  ex("Remo con mancuerna", "Espalda", ["Bíceps"], "principiante", "Mancuerna", "ambos", "Jala la mancuerna hacia la cadera con espalda estable.", ["Apoya una mano", "Espalda larga", "Jala con el codo"], ["Girar el tronco", "Subir el hombro"], 3, "10-12", "75 s", ["Remo en máquina", "Jalón al pecho"]),
  ex("Puente de glúteo", "Glúteo", ["Pierna"], "principiante", "Peso corporal", "ambos", "Eleva la cadera apretando glúteos arriba.", ["Pies firmes", "Sube cadera", "Pausa arriba"], ["Arquear espalda", "Empujar con punta de pies"], 3, "12-15", "60 s", ["Hip thrust", "Peso muerto rumano"]),
  ex("Peso muerto rumano", "Glúteo", ["Pierna", "Espalda"], "intermedio", "Mancuernas", "gym", "Bisagra de cadera con espalda neutra.", ["Cadera atrás", "Mancuernas cerca", "Sube apretando glúteo"], ["Redondear espalda", "Bajar sin control"], 3, "8-10", "90 s", ["Puente de glúteo", "Curl femoral"]),
  ex("Press militar sentado", "Hombro", ["Tríceps"], "principiante", "Mancuernas", "gym", "Empuja las mancuernas por encima de la cabeza sin arquearte.", ["Abdomen firme", "Codos bajo manos", "Sube controlado"], ["Arquear espalda", "Chocar mancuernas"], 3, "8-12", "75 s", ["Elevaciones laterales", "Press en máquina"]),
  ex("Curl bíceps", "Bíceps", ["Antebrazo"], "principiante", "Mancuernas", "ambos", "Dobla el codo sin mover el hombro.", ["Codos cerca", "Sube suave", "Baja lento"], ["Balancear cuerpo", "Subir el codo"], 2, "10-15", "60 s", ["Curl en polea", "Curl martillo"]),
  ex("Extensión de tríceps", "Tríceps", ["Hombro"], "principiante", "Polea o banda", "ambos", "Extiende los codos manteniendo hombros quietos.", ["Codos pegados", "Extiende completo", "Controla regreso"], ["Mover hombros", "Usar impulso"], 2, "10-15", "60 s", ["Fondos asistidos", "Press cerrado"]),
  ex("Plancha", "Abdomen", ["Hombro"], "principiante", "Peso corporal", "ambos", "Mantén cuerpo firme sin hundir cadera.", ["Codos bajo hombros", "Abdomen firme", "Respira"], ["Levantar cadera", "Aguantar dolor lumbar"], 3, "20-40 s", "45 s", ["Dead bug", "Plancha elevada"]),
  ex("Caminadora inclinada", "Cardio", ["Pierna"], "principiante", "Caminadora", "gym", "Camina a ritmo sostenible con leve inclinación.", ["Empieza suave", "Respira estable", "No te agarres fuerte"], ["Subir muy rápido", "Dolor de rodilla"], 1, "15-25 min", "Libre", ["Caminata", "Bicicleta", "Elíptica"]),
  ex("Zancadas", "Pierna", ["Glúteo"], "principiante", "Peso corporal", "ambos", "Da un paso largo y baja controlado.", ["Tronco alto", "Rodilla estable", "Empuja con el pie delantero"], ["Paso muy corto", "Perder equilibrio"], 3, "8-10 por pierna", "75 s", ["Prensa", "Sentadilla goblet"]),
  ex("Movilidad de cadera", "Movilidad", ["Pierna"], "principiante", "Colchoneta", "ambos", "Movimientos suaves para preparar cadera y rodilla.", ["Ve lento", "No rebotes", "Respira"], ["Forzar rango", "Dolor agudo"], 1, "5 min", "Libre", ["Caminata suave", "Estiramiento dinámico"])
];

const lessons = [
  ["Déficit calórico", "Comer un poco menos de lo que gastas. No es aguantar hambre: es ordenar porciones, proteína, verduras y constancia."],
  ["Calorías", "Son una forma de medir energía. Tu cuerpo las usa para moverse, entrenar, pensar y recuperarse."],
  ["Macronutrientes", "Proteína, carbohidratos y grasas. Los tres sirven; lo importante es ajustar cantidades a tu meta."],
  ["Proteína", "Ayuda a cuidar músculo y a sentir más saciedad. Buenas opciones: pollo, huevo, atún, carne magra, yogur, lentejas y fríjoles."],
  ["Antes del gym", "Come algo fácil de digerir: banano, arepa, avena, pan o arroz con una proteína ligera si tienes tiempo."],
  ["Después del gym", "Busca una comida normal con proteína y carbohidrato: pollo con arroz, huevos con arepa, atún con papa o lentejas."],
  ["Calentar", "Haz 5 a 8 minutos suaves y luego series livianas del primer ejercicio. La idea es preparar, no cansarte."],
  ["Elegir peso", "Debe sentirse retador, pero te debe dejar completar el rango con técnica. Si duele una articulación, baja o cambia."],
  ["Series y repeticiones", "Una repetición es una vez el movimiento. Una serie es un grupo de repeticiones, por ejemplo 3 series de 10."],
  ["Descanso", "Descansa 60 a 90 segundos en ejercicios normales. En piernas o ejercicios pesados puedes usar un poco más."],
  ["Estancamiento", "Primero revisa sueño, cumplimiento y porciones. Si todo va bien por 2 semanas, ajusta 100 a 150 kcal o cardio."],
  ["Plato balanceado", "Usa esta base: proteína, carbohidrato, verduras y una grasa saludable en cantidad moderada."]
];

const defaultState = {
  active: "inicio",
  profile: {
    name: "",
    age: "",
    sex: "",
    weight: "",
    height: "",
    experience: "",
    goal: "",
    days: "",
    minutes: "",
    place: "",
    limitations: "",
    activity: "",
    meals: "",
    avoid: "",
    preferences: "",
    budget: "",
    targetWeight: "",
    deficit: ""
  },
  diary: [],
  plates: [],
  recipes: [],
  workoutLogs: [],
  cardio: [],
  progress: []
};

let auth = loadAuth();
let state = auth.currentEmail ? loadState() : structuredClone(defaultState);

function food(name, category, kcal, protein, carbs, fat, fiber, sugar, sodium, portions, deficit, bulk, highProtein, cheap, easy) {
  return { name, category, kcal, protein, carbs, fat, fiber, sugar, sodium, portions, unit: "g", home: portions.map(p => p[0]).join(", "), tags: { deficit, bulk, highProtein, cheap, easy } };
}

function ex(name, muscle, secondary, level, equipment, place, description, steps, mistakes, sets, reps, rest, alternatives) {
  return { name, muscle, secondary, level, equipment, place, description, steps, mistakes, sets, reps, rest, alternatives, safety: "Si sientes dolor agudo, detén el ejercicio y usa una alternativa más cómoda." };
}

function userStateKey(email = auth.currentEmail) {
  return `${STORE_KEY}:user:${email}`;
}

function apiBase() {
  const configured = window.FITNOVATO_API_URL || localStorage.getItem(API_URL_KEY) || "";
  return configured.replace(/\/$/, "");
}

function loadAuth() {
  try {
    return { users: {}, currentEmail: "", token: "", user: null, ...JSON.parse(localStorage.getItem(AUTH_KEY)) };
  } catch {
    return { users: {}, currentEmail: "", token: "", user: null };
  }
}

function saveAuth() {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
}

function currentUser() {
  if (auth.token && auth.user) return auth.user;
  return auth.currentEmail ? auth.users[auth.currentEmail] : null;
}

function loadState() {
  try {
    return normalizeState(JSON.parse(localStorage.getItem(userStateKey())));
  } catch {
    return structuredClone(defaultState);
  }
}

function normalizeState(rawState = {}) {
  const merged = { ...structuredClone(defaultState), ...rawState };
  const profile = merged.profile || {};
  const looksLikeDemoProfile =
    profile.name === "Valentina" &&
    Number(profile.age) === 28 &&
    Number(profile.weight) === 78 &&
    Number(profile.height) === 165;

  if (looksLikeDemoProfile) {
    merged.profile = structuredClone(defaultState.profile);
    merged.progress = [];
  }

  return merged;
}

function saveState() {
  if (!auth.currentEmail) return;
  localStorage.setItem(userStateKey(), JSON.stringify(state));
  saveRemoteState();
}

let remoteSaveTimer = null;

function saveRemoteState() {
  if (!apiBase() || !auth.token) return;
  clearTimeout(remoteSaveTimer);
  remoteSaveTimer = setTimeout(async () => {
    try {
      await apiRequest("/me/state", {
        method: "PUT",
        body: JSON.stringify({ state })
      });
    } catch (error) {
      console.warn("No se pudo sincronizar con el backend", error);
    }
  }, 600);
}

async function apiRequest(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (auth.token) headers.Authorization = `Bearer ${auth.token}`;
  const response = await fetch(`${apiBase()}${path}`, { ...options, headers });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "Error de conexión");
  return payload;
}

function calcProfile(profile = state.profile) {
  if (!hasBodyProfile(profile)) {
    return {
      bmi: 0,
      bmr: 0,
      maintenance: 0,
      deficit: 0,
      surplus: 0,
      recomposition: 0,
      goalCalories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      idealLow: 0,
      idealHigh: 0,
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
    bmi,
    bmr,
    maintenance,
    deficit: maintenance * 0.8,
    surplus: maintenance * 1.1,
    recomposition: maintenance * 0.95,
    goalCalories,
    protein,
    carbs,
    fat,
    idealLow,
    idealHigh,
    pace: profile.goal === "perder grasa" ? "0,3 a 0,8 kg por semana" : profile.goal === "ganar masa muscular" ? "0,2 a 0,5 kg por semana" : "cambios lentos y medibles"
  };
}

function hasBodyProfile(profile = state.profile) {
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

function completeProfilePrompt() {
  return `
    <div class="panel">
      <div class="section-title">
        <div>
          <h2>Completa tu perfil fitness</h2>
          <p class="subtle">Tu cuenta ya existe, pero todavía no hay datos corporales ni preferencias. La app no calculará calorías ni rutinas hasta que llenes esa información.</p>
        </div>
      </div>
      <div class="notice">Ve a <strong>Mi perfil</strong> y registra edad, sexo, peso, estatura, objetivo, días de entrenamiento, actividad y comidas al día.</div>
      <div class="btn-row"><button class="btn" data-goto="perfil">Completar perfil</button></div>
    </div>`;
}

function macrosFor(foodItem, grams) {
  const ratio = grams / 100;
  return {
    kcal: foodItem.kcal * ratio,
    protein: foodItem.protein * ratio,
    carbs: foodItem.carbs * ratio,
    fat: foodItem.fat * ratio
  };
}

function diaryTotals() {
  return state.diary.reduce((sum, item) => addMacros(sum, item.macros), emptyMacros());
}

function emptyMacros() {
  return { kcal: 0, protein: 0, carbs: 0, fat: 0 };
}

function addMacros(a, b) {
  return { kcal: a.kcal + b.kcal, protein: a.protein + b.protein, carbs: a.carbs + b.carbs, fat: a.fat + b.fat };
}

function fmt(num, unit = "") {
  return `${Math.round(num).toLocaleString("es-CO")}${unit}`;
}

function one(num) {
  return Number(num).toLocaleString("es-CO", { maximumFractionDigits: 1 });
}

function renderNav() {
  const nav = document.querySelector("#nav");
  const accountBox = document.querySelector("#accountBox");
  const user = currentUser();
  accountBox.innerHTML = user ? `<div class="account-box"><small>Cuenta activa</small><strong>${user.name}</strong><small>${user.email}</small></div>` : "";
  if (!user) {
    nav.innerHTML = "";
    return;
  }
  nav.innerHTML = navItems.map(([id, label]) => `<button class="nav-btn ${state.active === id ? "active" : ""}" data-view="${id}">${label}</button>`).join("");
  nav.querySelectorAll("button").forEach(btn => btn.addEventListener("click", () => {
    state.active = btn.dataset.view;
    saveState();
    render();
  }));
}

function render() {
  renderNav();
  const view = document.querySelector("#view");
  if (!currentUser()) {
    view.innerHTML = renderAuth();
    bindAuth();
    return;
  }
  const routes = {
    inicio: renderHome,
    perfil: renderProfile,
    calorias: renderCalories,
    alimentacion: renderFoodDiary,
    plato: renderPlateBuilder,
    recetas: renderRecipes,
    mercado: renderMarket,
    rutina: renderRoutine,
    entrenamiento: renderWorkout,
    ejercicios: renderExercises,
    cardio: renderCardio,
    progreso: renderProgress,
    ajustes: renderAdjustments,
    aprende: renderLearn,
    config: renderConfig
  };
  view.innerHTML = routes[state.active]();
  bindView();
}

function renderAuth() {
  return `
    <div class="auth-layout stack">
      <div class="section-title">
        <div><h2>Entra a tu cuenta</h2><p class="subtle">Cada correo tiene su perfil, comidas, rutinas, progreso y registros guardados por separado.</p></div>
      </div>
      <div class="panel auth-card">
        <form id="loginForm" class="stack">
          <h2>Iniciar sesión</h2>
          ${input("email", "Correo", "", "email")}
          ${input("password", "Contraseña", "", "password")}
          <button class="btn" type="submit">Entrar</button>
          <p id="loginMsg" class="subtle"></p>
        </form>
        <form id="registerForm" class="stack">
          <h2>Crear cuenta</h2>
          ${input("name", "Nombre", "", "text")}
          ${input("email", "Correo", "", "email")}
          ${input("password", "Contraseña", "", "password")}
          <button class="btn secondary" type="submit">Registrarme</button>
          <p id="registerMsg" class="subtle"></p>
        </form>
      </div>
      <div class="panel stack">
        <h2>Conexión backend</h2>
        <p class="subtle">Para producción pega aquí la URL de Railway. Si está vacío, la app usa modo local en este navegador.</p>
        <form id="apiConfigForm" class="grid two">
          ${input("apiUrl", "URL API Railway", apiBase(), "url")}
          <div class="btn-row"><button class="btn secondary" type="submit">Guardar URL</button></div>
        </form>
        <p class="subtle">Estado actual: <strong>${apiBase() ? "con backend" : "modo local"}</strong></p>
      </div>
      <div class="auth-note">
        <strong>Nota técnica del MVP:</strong>
        <p>Este prototipo no usa servidores externos. El registro por correo funciona localmente en este navegador para separar la información de cada usuario. En producción debe conectarse a un backend propio con base de datos, sesiones seguras y contraseñas cifradas.</p>
      </div>
    </div>`;
}

function metric(label, value, note = "") {
  return `<article class="metric"><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`;
}

function renderHome() {
  if (!hasBodyProfile()) return completeProfilePrompt();

  const calc = calcProfile();
  const totals = diaryTotals();
  const routine = buildRoutine();
  const remaining = calc.goalCalories - totals.kcal;
  return `
    <div class="stack">
      <div class="section-title">
        <div><h2>Hola, ${state.profile.name || currentUser()?.name || "vamos paso a paso"}.</h2><p class="subtle">No necesitas hacerlo perfecto. Registra lo importante y ajusta con calma.</p></div>
        <span class="pill">${state.profile.goal}</span>
      </div>
      <div class="grid four">
        ${metric("Calorías objetivo", fmt(calc.goalCalories, " kcal"), "Estimado inicial")}
        ${metric("Consumidas", fmt(totals.kcal, " kcal"), `${fmt(Math.max(0, remaining), " kcal")} restantes`)}
        ${metric("Proteína", `${fmt(totals.protein, " g")} / ${fmt(calc.protein, " g")}`, totals.protein < calc.protein ? `Te faltan ${fmt(calc.protein - totals.protein, " g")}` : "Muy bien")}
        ${metric("Peso actual", `${one(state.profile.weight)} kg`, `Meta: ${state.profile.targetWeight || "sin definir"} kg`)}
      </div>
      <div class="panel split">
        <div>
          <h2>Entrenamiento de hoy</h2>
          <p><strong>${routine.name}</strong></p>
          <p class="subtle">${routine.days[0].focus}. ${routine.days[0].exercises.length} ejercicios, ${state.profile.minutes} minutos disponibles.</p>
          <div class="btn-row">
            <button class="btn" data-goto="alimentacion">Agregar comida</button>
            <button class="btn secondary" data-goto="plato">Crear plato</button>
            <button class="btn secondary" data-goto="entrenamiento">Iniciar entrenamiento</button>
            <button class="btn secondary" data-goto="progreso">Registrar peso</button>
          </div>
        </div>
        <div class="notice">Tu mantenimiento estimado es de <strong>${fmt(calc.maintenance, " kcal")}</strong>. Para ${state.profile.goal}, tu objetivo inicial será de <strong>${fmt(calc.goalCalories, " kcal")}</strong>. Estos cálculos son estimados y se ajustan según tu progreso.</div>
      </div>
    </div>`;
}

function renderProfile() {
  const p = state.profile;
  return `
    <div class="panel">
      <div class="section-title"><div><h2>Mi perfil</h2><p class="subtle">Con estos datos se calculan calorías, macros, planes y rutinas.</p></div></div>
      <form id="profileForm" class="grid three">
        ${input("name", "Nombre", p.name)}
        ${input("age", "Edad", p.age, "number")}
        ${select("sex", "Sexo", ["mujer", "hombre"], p.sex)}
        ${input("weight", "Peso actual (kg)", p.weight, "number")}
        ${input("height", "Estatura (cm)", p.height, "number")}
        ${select("experience", "Experiencia", ["principiante", "intermedio", "avanzado"], p.experience)}
        ${select("goal", "Objetivo", ["perder grasa", "ganar masa muscular", "mantener peso", "recomposición corporal"], p.goal)}
        ${input("days", "Días por semana", p.days, "number")}
        ${input("minutes", "Minutos por sesión", p.minutes, "number")}
        ${select("place", "Lugar", ["gimnasio completo", "gimnasio básico", "casa"], p.place)}
        ${select("activity", "Actividad diaria", ["sedentaria", "ligera", "moderada", "alta"], p.activity)}
        ${input("meals", "Comidas al día", p.meals, "number")}
        ${select("deficit", "Nivel de déficit", ["suave", "moderado", "alto controlado"], p.deficit)}
        ${input("budget", "Presupuesto", p.budget)}
        ${input("targetWeight", "Peso objetivo (kg)", p.targetWeight, "number")}
        <label>Lesiones o molestias<textarea name="limitations">${p.limitations}</textarea></label>
        <label>Alimentos que no consumes<textarea name="avoid">${p.avoid}</textarea></label>
        <label>Preferencias alimentarias<textarea name="preferences">${p.preferences}</textarea></label>
        <div class="btn-row"><button class="btn" type="submit">Guardar perfil</button></div>
      </form>
    </div>`;
}

function renderCalories() {
  if (!hasBodyProfile()) return completeProfilePrompt();

  const c = calcProfile();
  const meals = Number(state.profile.meals) || 4;
  return `
    <div class="stack">
      <div class="panel">
        <div class="section-title"><div><h2>Mis calorías y macros</h2><p class="subtle">Fórmula Mifflin-St Jeor + factor de actividad. Es una guía inicial, no una sentencia.</p></div></div>
        <div class="grid four">
          ${metric("IMC", one(c.bmi), "Referencia general")}
          ${metric("Tasa metabólica basal", fmt(c.bmr, " kcal"), "Energía en reposo")}
          ${metric("Mantenimiento", fmt(c.maintenance, " kcal"), "Gasto diario estimado")}
          ${metric("Meta diaria", fmt(c.goalCalories, " kcal"), state.profile.goal)}
          ${metric("Déficit moderado", fmt(c.deficit, " kcal"), "Pérdida de grasa")}
          ${metric("Superávit", fmt(c.surplus, " kcal"), "Ganar músculo")}
          ${metric("Recomposición", fmt(c.recomposition, " kcal"), "Ligero ajuste")}
          ${metric("Peso ideal aproximado", `${one(c.idealLow)}-${one(c.idealHigh)} kg`, "Solo referencia")}
        </div>
      </div>
      <div class="panel split">
        <div>
          <h2>Macros diarios</h2>
          <div class="grid three">
            ${metric("Proteína", fmt(c.protein, " g"), "Cuida músculo y saciedad")}
            ${metric("Carbohidratos", fmt(c.carbs, " g"), "Energía para entrenar")}
            ${metric("Grasas", fmt(c.fat, " g"), "Hormonas y saciedad")}
          </div>
        </div>
        <div>
          <h2>Por comida</h2>
          <p class="subtle">Dividido en ${meals} comidas. Puedes mover cantidades entre desayuno, almuerzo, cena y snacks.</p>
          <table><tbody>
            <tr><th>Calorías</th><td>${fmt(c.goalCalories / meals, " kcal")}</td></tr>
            <tr><th>Proteína</th><td>${fmt(c.protein / meals, " g")}</td></tr>
            <tr><th>Carbohidratos</th><td>${fmt(c.carbs / meals, " g")}</td></tr>
            <tr><th>Grasas</th><td>${fmt(c.fat / meals, " g")}</td></tr>
          </tbody></table>
        </div>
      </div>
    </div>`;
}

function renderFoodDiary() {
  if (!hasBodyProfile()) return completeProfilePrompt();

  const c = calcProfile();
  const totals = diaryTotals();
  return `
    <div class="stack">
      <div class="panel">
        <div class="section-title"><div><h2>Mi alimentación</h2><p class="subtle">Busca un alimento local, elige una porción casera o gramos, y agrégalo al diario.</p></div></div>
        <div class="grid four">
          ${metric("Objetivo", fmt(c.goalCalories, " kcal"))}
          ${metric("Consumidas", fmt(totals.kcal, " kcal"))}
          ${metric("Restantes", fmt(Math.max(0, c.goalCalories - totals.kcal), " kcal"))}
          ${metric("Macros", `${fmt(totals.protein, "P")} / ${fmt(totals.carbs, "C")} / ${fmt(totals.fat, "G")}`)}
        </div>
      </div>
      <div class="split">
        <div class="panel">
          <h2>Agregar comida</h2>
          <form id="mealForm" class="grid two">
            ${select("meal", "Comida", ["Desayuno", "Almuerzo", "Cena", "Snack"], "Almuerzo")}
            <label>Alimento<select name="food">${foods.map(f => `<option>${f.name}</option>`).join("")}</select></label>
            <label>Porción<select name="portion" id="portionSelect"></select></label>
            ${input("grams", "Gramos", 100, "number")}
            <div class="btn-row"><button class="btn" type="submit">Agregar al diario</button></div>
          </form>
        </div>
        <div class="panel">
          <h2>Comidas registradas</h2>
          ${state.diary.length ? tableDiary() : `<div class="empty">Aún no hay comidas registradas hoy.</div>`}
          ${state.diary.length ? `<button class="btn warn" data-clear-diary>Vaciar diario</button>` : ""}
        </div>
      </div>
      <div class="panel">
        <h2>Plan básico sugerido</h2>
        ${renderMealPlan()}
      </div>
    </div>`;
}

function tableDiary() {
  return `<table><thead><tr><th>Comida</th><th>Alimento</th><th>Cantidad</th><th>Kcal</th><th>P/C/G</th></tr></thead><tbody>
    ${state.diary.map(i => `<tr><td>${i.meal}</td><td>${i.name}</td><td>${i.grams} g</td><td>${fmt(i.macros.kcal)}</td><td>${fmt(i.macros.protein)} / ${fmt(i.macros.carbs)} / ${fmt(i.macros.fat)}</td></tr>`).join("")}
  </tbody></table>`;
}

function renderMealPlan() {
  const goal = state.profile.goal;
  const plan = [
    ["Desayuno", goal === "perder grasa" ? "2 huevos, arepa pequeña, fruta y café sin azúcar" : "Avena con leche, banano y 2 huevos"],
    ["Almuerzo", "Arroz, pechuga de pollo, ensalada grande y aguacate medido"],
    ["Cena", goal === "ganar masa muscular" ? "Carne magra, papa o yuca, verduras y yogur" : "Atún o pescado, papa cocida y verduras"],
    ["Snack", "Yogur natural, fruta o maní medido"]
  ];
  return `<div class="grid four">${plan.map(([meal, desc]) => `<article class="item"><span class="pill">${meal}</span><p>${desc}</p><button class="btn secondary" data-goto="mercado">Ver mercado</button></article>`).join("")}</div>
  <p class="subtle">Puedes cambiar proteínas por pollo, atún, huevo, carne, pescado, lentejas o fríjoles; carbohidratos por arroz, papa, yuca, arepa, avena o plátano; grasas por aguacate, maní o aceite de oliva.</p>`;
}

function renderPlateBuilder() {
  return `
    <div class="panel">
      <div class="section-title"><div><h2>Crear plato</h2><p class="subtle">Arma platos sin IA: eliges ingredientes y la app suma calorías y macros.</p></div></div>
      <form id="plateForm" class="grid three">
        ${input("plateName", "Nombre del plato", "Ensalada de atún con huevo")}
        ${foodSelect("protein", "Proteína", "Atún en agua")}
        ${foodSelect("carb", "Carbohidrato", "Papa cocida")}
        ${foodSelect("fat", "Grasa saludable", "Aguacate")}
        ${foodSelect("veg", "Verduras", "Ensalada mixta")}
        ${foodSelect("extra", "Extra o bebida", "Café sin azúcar")}
        ${input("proteinG", "Gramos proteína", 100, "number")}
        ${input("carbG", "Gramos carbohidrato", 150, "number")}
        ${input("fatG", "Gramos grasa", 50, "number")}
        ${input("vegG", "Gramos verduras", 100, "number")}
        ${input("extraG", "Gramos/ml extra", 200, "number")}
        <div class="btn-row"><button class="btn" type="submit">Guardar plato frecuente</button></div>
      </form>
      <div id="plateResult" class="notice"></div>
      <h2>Platos guardados</h2>
      ${state.plates.length ? `<div class="grid three">${state.plates.map(p => `<article class="item"><strong>${p.name}</strong><p>${fmt(p.macros.kcal, " kcal")} · ${fmt(p.macros.protein, " g proteína")}</p></article>`).join("")}</div>` : `<div class="empty">Todavía no has guardado platos.</div>`}
    </div>`;
}

function renderRecipes() {
  return `
    <div class="panel">
      <div class="section-title"><div><h2>Recetas</h2><p class="subtle">Guarda recetas por porciones y luego úsalas como comidas frecuentes.</p></div></div>
      <form id="recipeForm" class="grid two">
        ${input("name", "Nombre", "Sudado práctico de pollo")}
        ${input("servings", "Porciones", 3, "number")}
        <label>Ingredientes y cantidades<textarea name="ingredients">pollo 360 g, papa 300 g, arroz 240 g, ensalada 200 g</textarea></label>
        <label>Preparación<textarea name="steps">Cocina el pollo con verduras, acompaña con papa y arroz medido.</textarea></label>
        <div class="btn-row"><button class="btn" type="submit">Guardar receta</button></div>
      </form>
      ${state.recipes.length ? `<table><thead><tr><th>Receta</th><th>Porciones</th><th>Estimado</th><th>Preparación</th></tr></thead><tbody>${state.recipes.map(r => `<tr><td>${r.name}</td><td>${r.servings}</td><td>${fmt(r.perServing.kcal, " kcal")} por porción</td><td>${r.steps}</td></tr>`).join("")}</tbody></table>` : `<div class="empty">Crea tu primera receta.</div>`}
    </div>`;
}

function renderMarket() {
  const days = [1, 3, 5, 7];
  const economical = state.profile.budget.toLowerCase().includes("bajo") || state.profile.budget.toLowerCase().includes("econ");
  const picks = foods.filter(f => economical ? f.tags.cheap : ["Proteínas", "Carbohidratos", "Grasas", "Verduras", "Frutas", "Lácteos"].includes(f.category)).slice(0, 22);
  const grouped = groupBy(picks, f => marketCategory(f.category));
  return `
    <div class="panel">
      <div class="section-title"><div><h2>Lista de mercado</h2><p class="subtle">Basada en el plan semanal y alimentos comunes de Colombia y Latinoamérica.</p></div><span class="pill yellow">${economical ? "Modo económico" : "Modo balanceado"}</span></div>
      <div class="btn-row">${days.map(d => `<button class="btn secondary" data-market-days="${d}">${d} día${d > 1 ? "s" : ""}</button>`).join("")}</div>
      <div id="marketList" class="grid three">${Object.entries(grouped).map(([cat, list]) => `<article class="item"><h3>${cat}</h3><ul>${list.map(f => `<li>${f.name}: ${f.tags.cheap ? "económico" : "opción útil"}</li>`).join("")}</ul></article>`).join("")}</div>
    </div>`;
}

function renderRoutine() {
  if (!hasBodyProfile()) return completeProfilePrompt();

  const routine = buildRoutine();
  return `
    <div class="panel">
      <div class="section-title"><div><h2>Mi rutina</h2><p class="subtle">Generada por reglas según objetivo, nivel, días, tiempo, lugar y limitaciones.</p></div><span class="pill">${routine.name}</span></div>
      <div class="grid ${routine.days.length > 2 ? "three" : "two"}">
        ${routine.days.map(day => `<article class="routine-day">
          <span class="pill yellow">Día ${day.day}</span>
          <h3>${day.focus}</h3>
          <p class="subtle">${day.note}</p>
          <table><tbody>${day.exercises.map(e => `<tr><th>${e.name}</th><td>${e.sets} x ${e.reps}<br><small>${e.rest}</small></td></tr>`).join("")}</tbody></table>
          <p><strong>Cardio:</strong> ${day.cardio}</p>
        </article>`).join("")}
      </div>
    </div>`;
}

function buildRoutine() {
  const home = state.profile.place === "casa";
  const pool = exercises.filter(e => home ? e.place !== "gym" : e.place !== "casa").filter(e => e.level === "principiante" || state.profile.experience !== "principiante");
  const days = Math.max(2, Math.min(5, Number(state.profile.days) || 3));
  const goals = state.profile.goal;
  const names = goals === "ganar masa muscular" ? "Hipertrofia básica" : goals === "perder grasa" ? "Fuerza + cardio para pérdida de grasa" : "Full body sostenible";
  const focus = days <= 3 ? ["Full body A", "Full body B", "Full body C"] : ["Tren superior", "Tren inferior", "Empuje y abdomen", "Pierna y cardio", "Full body suave"];
  return {
    name: names,
    days: Array.from({ length: days }, (_, i) => {
      const selected = pickExercises(pool, focus[i]);
      return { day: i + 1, focus: focus[i], note: "Prioriza técnica, rango cómodo y progreso pequeño.", exercises: selected, cardio: goals === "perder grasa" ? "10-20 min suave al final" : "5-10 min suave opcional" };
    })
  };
}

function pickExercises(pool, focus) {
  const wanted = focus.includes("superior") ? ["Pecho", "Espalda", "Hombro", "Bíceps", "Tríceps"] : focus.includes("inferior") || focus.includes("Pierna") ? ["Pierna", "Glúteo", "Abdomen", "Movilidad"] : ["Pierna", "Pecho", "Espalda", "Glúteo", "Abdomen", "Cardio"];
  return wanted.map(m => pool.find(e => e.muscle === m)).filter(Boolean).slice(0, 6);
}

function renderWorkout() {
  if (!hasBodyProfile()) return completeProfilePrompt();

  const routine = buildRoutine();
  const day = routine.days[0];
  return `
    <div class="panel">
      <div class="section-title"><div><h2>Mi entrenamiento</h2><p class="subtle">Registra series, repeticiones, peso y sensación. La recomendación sale de reglas de doble progresión.</p></div></div>
      <form id="workoutForm" class="stack">
        ${day.exercises.map((e, idx) => `<article class="item">
          <h3>${e.name}</h3><p class="subtle">${e.sets} series · ${e.reps} reps · descanso ${e.rest}</p>
          <div class="grid four">
            ${input(`weight-${idx}`, "Peso usado (kg)", 0, "number")}
            ${input(`reps-${idx}`, "Reps por serie", "12,12,10")}
            ${input(`sets-${idx}`, "Series completadas", e.sets, "number")}
            ${select(`feeling-${idx}`, "Sensación", ["Muy fácil", "Bien", "Difícil", "Muy difícil", "Sentí dolor"], "Bien")}
          </div>
          ${input(`note-${idx}`, "Nota personal", "")}
        </article>`).join("")}
        <div class="grid two">
          ${input("duration", "Duración (min)", state.profile.minutes, "number")}
          ${input("cardio", "Cardio realizado", "15 min caminadora")}
        </div>
        <div class="btn-row"><button class="btn" type="submit">Finalizar entrenamiento</button></div>
      </form>
      <h2>Historial reciente</h2>
      ${state.workoutLogs.length ? renderWorkoutHistory() : `<div class="empty">Cuando finalices un entrenamiento verás aquí el resumen.</div>`}
    </div>`;
}

function renderWorkoutHistory() {
  return `<table><thead><tr><th>Fecha</th><th>Resumen</th><th>Recomendación</th></tr></thead><tbody>${state.workoutLogs.slice(-5).reverse().map(log => `<tr><td>${log.date}</td><td>${log.summary}</td><td>${log.recommendation}</td></tr>`).join("")}</tbody></table>`;
}

function progressionAdvice(entries) {
  if (entries.some(e => e.feeling === "Sentí dolor")) return "Baja el peso o cambia el ejercicio la próxima vez. El dolor manda.";
  const easy = entries.some(e => e.feeling === "Muy fácil");
  const completed = entries.every(e => e.reps.split(",").map(Number).every(n => n >= 12));
  const hard = entries.some(e => e.feeling === "Muy difícil" || e.feeling === "Difícil");
  if (completed && !hard) return easy ? "Puedes subir un poco el peso la próxima vez." : "Buen trabajo. Mantén el peso o sube muy poco si la técnica fue sólida.";
  if (hard) return "Mantén el mismo peso hasta completar mejor las repeticiones.";
  return "Repite este peso la próxima sesión e intenta sumar una repetición.";
}

function renderExercises() {
  const grouped = groupBy(exercises, e => e.muscle);
  return `
    <div class="panel">
      <div class="section-title"><div><h2>Guía de ejercicios</h2><p class="subtle">Textual, simple y local. Incluye alternativas para cambiar solo hoy o siempre en tu rutina.</p></div></div>
      <div class="grid three">${Object.entries(grouped).map(([muscle, list]) => `<article class="item"><h3>${muscle}</h3>${list.map(e => `<details><summary><strong>${e.name}</strong> · ${e.equipment}</summary><p>${e.description}</p><ol>${e.steps.map(s => `<li>${s}</li>`).join("")}</ol><p><strong>Errores:</strong> ${e.mistakes.join(", ")}.</p><p><strong>Alternativas:</strong> ${e.alternatives.join(", ")}.</p><p class="subtle">${e.safety}</p></details>`).join("")}</article>`).join("")}</div>
    </div>`;
}

function renderCardio() {
  return `
    <div class="panel">
      <div class="section-title"><div><h2>Cardio</h2><p class="subtle">Registra caminadora, escalera, bicicleta, elíptica, caminata, trote o cuerda.</p></div></div>
      <form id="cardioForm" class="grid three">
        ${select("type", "Tipo", ["Caminadora", "Escalera", "Bicicleta", "Elíptica", "Caminata", "Trote", "Saltar cuerda"], "Caminadora")}
        ${select("template", "Plantilla", ["Cardio suave", "Cardio moderado", "Intervalos", "Post-entreno", "Pérdida de grasa"], "Post-entreno")}
        ${input("time", "Tiempo (min)", 15, "number")}
        ${input("level", "Nivel/inclinación", "suave")}
        ${input("speed", "Velocidad", "4.8 km/h")}
        ${input("distance", "Distancia", "1.2 km")}
        ${input("calories", "Calorías estimadas", 90, "number")}
        ${select("feeling", "Sensación", ["Muy fácil", "Bien", "Difícil", "Muy difícil"], "Bien")}
        <div class="btn-row"><button class="btn" type="submit">Guardar cardio</button></div>
      </form>
      ${state.cardio.length ? `<table><thead><tr><th>Fecha</th><th>Tipo</th><th>Tiempo</th><th>Sensación</th></tr></thead><tbody>${state.cardio.slice(-6).reverse().map(c => `<tr><td>${c.date}</td><td>${c.type}</td><td>${c.time} min</td><td>${c.feeling}</td></tr>`).join("")}</tbody></table>` : `<div class="empty">Sin registros de cardio todavía.</div>`}
    </div>`;
}

function renderProgress() {
  if (!hasBodyProfile()) return completeProfilePrompt();

  return `
    <div class="panel">
      <div class="section-title"><div><h2>Mi progreso</h2><p class="subtle">Seguimiento semanal de peso, hábitos, energía, hambre, sueño, agua y ánimo.</p></div></div>
      <form id="progressForm" class="grid four">
        ${input("weight", "Peso actual (kg)", state.profile.weight, "number")}
        ${select("food", "Alimentación", ["bien", "regular", "difícil"], "bien")}
        ${select("training", "Entrenamientos", ["bien", "regular", "difícil"], "bien")}
        ${select("energy", "Energía", ["alta", "normal", "baja"], "normal")}
        ${select("hunger", "Hambre", ["baja", "normal", "mucha"], "normal")}
        ${input("sleep", "Sueño", "7 h")}
        ${input("water", "Agua", "6 vasos")}
        ${input("mood", "Ánimo", "estable")}
        ${select("difficulty", "Dificultad del plan", ["fácil", "normal", "difícil"], "normal")}
        <div class="btn-row"><button class="btn" type="submit">Registrar semana</button></div>
      </form>
      <div class="notice">${progressMessage()}</div>
      ${state.progress.length ? `<table><thead><tr><th>Semana</th><th>Peso</th><th>Comida</th><th>Entreno</th><th>Notas</th></tr></thead><tbody>${state.progress.map(p => `<tr><td>${p.week}</td><td>${one(p.weight)} kg</td><td>${p.food}</td><td>${p.training}</td><td>Energía ${p.energy}, hambre ${p.hunger}, sueño ${p.sleep}</td></tr>`).join("")}</tbody></table>` : ""}
    </div>`;
}

function progressMessage() {
  const entries = state.progress;
  if (entries.length < 2) return "Registra al menos dos semanas para ver una lectura de tendencia.";
  const last = entries.at(-1);
  const prev = entries.at(-2);
  if (state.profile.goal === "perder grasa" && last.weight < prev.weight) return "Vas bajando de forma progresiva. Mantén el plan esta semana.";
  if (last.weight === prev.weight && last.training === "bien") return "Tu peso no cambió, pero cumpliste tus entrenamientos. Mantén el plan una semana más.";
  return "Observa la tendencia, no un solo día. Ajusta solo si se repite por varias semanas.";
}

function renderAdjustments() {
  if (!hasBodyProfile()) return completeProfilePrompt();

  return `
    <div class="panel">
      <div class="section-title"><div><h2>Ajustar plan</h2><p class="subtle">Revisión semanal con reglas internas. Sin IA, sin servicios externos.</p></div></div>
      <form id="adjustForm" class="grid three">
        ${input("weight", "Peso actual", state.profile.weight, "number")}
        ${select("food", "¿Cumpliste alimentación?", ["sí", "más o menos", "no"], "sí")}
        ${select("training", "¿Cumpliste entrenamientos?", ["sí", "más o menos", "no"], "sí")}
        ${select("hunger", "¿Tuviste mucha hambre?", ["no", "normal", "sí"], "normal")}
        ${select("energy", "¿Tuviste energía?", ["sí", "normal", "no"], "normal")}
        ${select("pain", "¿Sentiste dolor?", ["no", "molestia leve", "sí"], "no")}
        ${select("difficulty", "¿El plan fue fácil o difícil?", ["fácil", "normal", "difícil"], "normal")}
        <div class="btn-row"><button class="btn" type="submit">Ver recomendación</button></div>
      </form>
      <div id="adjustResult" class="notice">${weeklyAdjustment({})}</div>
    </div>`;
}

function weeklyAdjustment(a) {
  const entries = state.progress;
  const noDropTwoWeeks = entries.length >= 2 && entries.at(-1).weight >= entries.at(-2).weight && state.profile.goal === "perder grasa";
  if (a.pain === "sí") return "Prioridad: baja peso, reduce rango o cambia el ejercicio que molestó. No entrenes sobre dolor agudo.";
  if (a.training === "no") return "Reduce días o duración por una semana. Mantén ejercicios principales y haz sesiones más cortas.";
  if (a.hunger === "sí") return "Usa alimentos más saciantes: verduras, papa cocida, frutas enteras, proteína en cada comida y revisa el tamaño del déficit.";
  if (noDropTwoWeeks) return "Si cumpliste bien y no bajaste en 2 semanas, reduce 100-150 kcal o agrega 10 minutos de cardio suave.";
  if (a.energy === "no") return "Sube 100-150 kcal o reduce cardio por unos días. El plan debe ser sostenible.";
  return "Mantén el plan una semana más. Ajusta solo cuando la tendencia lo pida.";
}

function renderLearn() {
  return `<div class="panel"><div class="section-title"><div><h2>Aprende</h2><p class="subtle">Conceptos simples para empezar sin tecnicismos.</p></div></div><div class="grid three">${lessons.map(([t, d]) => `<article class="lesson"><h3>${t}</h3><p>${d}</p></article>`).join("")}</div></div>`;
}

function renderConfig() {
  const user = currentUser();
  return `
    <div class="panel">
      <h2>Configuración</h2>
      <p class="subtle">Cuenta activa: <strong>${user.email}</strong>. ${apiBase() ? "La app sincroniza esta cuenta con el backend configurado." : "La app guarda la información de esta cuenta localmente en este navegador."} No usa IA, escáneres, pagos ni APIs externas de alimentos.</p>
      <div class="notice">Backend configurado: <strong>${apiBase() || "ninguno"}</strong>. Para producción usa la URL pública de Railway.</div>
      <form id="apiConfigForm" class="grid two">
        ${input("apiUrl", "URL API Railway", apiBase(), "url")}
        <div class="btn-row"><button class="btn secondary" type="submit">Guardar URL</button></div>
      </form>
      <div class="btn-row">
        <button class="btn secondary" data-export>Exportar datos</button>
        <button class="btn secondary" data-logout>Cerrar sesión</button>
        <button class="btn warn" data-reset>Reiniciar app</button>
      </div>
      <pre id="exportBox" class="empty"></pre>
    </div>`;
}

function bindAuth() {
  const loginForm = document.querySelector("#loginForm");
  const registerForm = document.querySelector("#registerForm");

  bindApiConfig();

  loginForm.addEventListener("submit", async event => {
    event.preventDefault();
    const data = normalizeAuthData(new FormData(loginForm));
    if (apiBase()) {
      try {
        const result = await apiRequest("/auth/login", {
          method: "POST",
          body: JSON.stringify({ email: data.email, password: data.password })
        });
        auth.token = result.token;
        auth.user = result.user;
        auth.currentEmail = result.user.email;
        auth.users[result.user.email] = result.user;
        state = normalizeState(result.state);
        saveAuth();
        localStorage.setItem(userStateKey(result.user.email), JSON.stringify(state));
        saveState();
        render();
      } catch (error) {
        document.querySelector("#loginMsg").textContent = error.message;
      }
      return;
    }
    const user = auth.users[data.email];
    if (!user || user.password !== data.password) {
      document.querySelector("#loginMsg").textContent = "Correo o contraseña incorrectos.";
      return;
    }
    auth.currentEmail = data.email;
    saveAuth();
    state = loadState();
    render();
  });

  registerForm.addEventListener("submit", async event => {
    event.preventDefault();
    const data = normalizeAuthData(new FormData(registerForm));
    if (!data.name || !data.email || data.password.length < 6) {
      document.querySelector("#registerMsg").textContent = "Completa nombre, correo y una contraseña de mínimo 6 caracteres.";
      return;
    }
    if (apiBase()) {
      try {
        const initialState = structuredClone(defaultState);
        const result = await apiRequest("/auth/register", {
          method: "POST",
          body: JSON.stringify({ name: data.name, email: data.email, password: data.password, state: initialState })
        });
        auth.token = result.token;
        auth.user = result.user;
        auth.currentEmail = result.user.email;
        auth.users[result.user.email] = result.user;
        state = normalizeState(result.state);
        saveAuth();
        localStorage.setItem(userStateKey(result.user.email), JSON.stringify(state));
        render();
      } catch (error) {
        document.querySelector("#registerMsg").textContent = error.message;
      }
      return;
    }
    if (auth.users[data.email]) {
      document.querySelector("#registerMsg").textContent = "Ese correo ya está registrado. Puedes iniciar sesión.";
      return;
    }
    auth.users[data.email] = { name: data.name, email: data.email, password: data.password, createdAt: new Date().toISOString() };
    auth.currentEmail = data.email;
    state = structuredClone(defaultState);
    saveAuth();
    saveState();
    render();
  });
}

function bindApiConfig() {
  document.querySelectorAll("#apiConfigForm").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const value = String(new FormData(form).get("apiUrl") || "").trim().replace(/\/$/, "");
      localStorage.setItem(API_URL_KEY, value);
      render();
    });
  });
}

function normalizeAuthData(formData) {
  const data = Object.fromEntries(formData);
  return {
    name: (data.name || "").trim(),
    email: (data.email || "").trim().toLowerCase(),
    password: data.password || ""
  };
}

function input(name, label, value, type = "text") {
  return `<label>${label}<input name="${name}" type="${type}" value="${value ?? ""}" /></label>`;
}

function select(name, label, options, value) {
  const placeholder = value ? "" : `<option value="" selected>Selecciona...</option>`;
  return `<label>${label}<select name="${name}">${placeholder}${options.map(o => `<option ${o === value ? "selected" : ""}>${o}</option>`).join("")}</select></label>`;
}

function foodSelect(name, label, value) {
  return `<label>${label}<select name="${name}">${foods.map(f => `<option ${f.name === value ? "selected" : ""}>${f.name}</option>`).join("")}</select></label>`;
}

function groupBy(list, fn) {
  return list.reduce((acc, item) => {
    const key = fn(item);
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
}

function marketCategory(category) {
  if (category === "Proteínas") return "Proteínas";
  if (category === "Carbohidratos") return "Carbohidratos";
  if (category === "Grasas") return "Grasas saludables";
  if (category === "Verduras") return "Verduras";
  if (category === "Frutas") return "Frutas";
  if (category === "Lácteos") return "Lácteos";
  return "Otros";
}

function bindView() {
  bindApiConfig();

  document.querySelectorAll("[data-goto]").forEach(btn => btn.addEventListener("click", () => {
    state.active = btn.dataset.goto;
    saveState();
    render();
  }));

  const profileForm = document.querySelector("#profileForm");
  if (profileForm) profileForm.addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(profileForm));
    ["age", "weight", "height", "days", "minutes", "meals", "targetWeight"].forEach(k => data[k] = Number(data[k]));
    state.profile = data;
    saveState();
    render();
  });

  const mealForm = document.querySelector("#mealForm");
  if (mealForm) {
    const foodEl = mealForm.elements.food;
    const portionEl = document.querySelector("#portionSelect");
    const syncPortions = () => {
      const f = foods.find(item => item.name === foodEl.value);
      portionEl.innerHTML = f.portions.map(([label, grams]) => `<option value="${grams}">${label} (${grams} g)</option>`).join("") + `<option value="custom">Usar gramos manuales</option>`;
      mealForm.elements.grams.value = f.portions[0][1];
    };
    foodEl.addEventListener("change", syncPortions);
    portionEl.addEventListener("change", () => {
      if (portionEl.value !== "custom") mealForm.elements.grams.value = portionEl.value;
    });
    syncPortions();
    mealForm.addEventListener("submit", event => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(mealForm));
      const f = foods.find(item => item.name === data.food);
      const grams = Number(data.grams);
      state.diary.push({ meal: data.meal, name: f.name, grams, macros: macrosFor(f, grams) });
      saveState();
      render();
    });
  }

  const clearDiary = document.querySelector("[data-clear-diary]");
  if (clearDiary) clearDiary.addEventListener("click", () => {
    state.diary = [];
    saveState();
    render();
  });

  const plateForm = document.querySelector("#plateForm");
  if (plateForm) {
    const updatePlate = () => {
      const result = calculatePlate(plateForm);
      document.querySelector("#plateResult").innerHTML = `<strong>Resultado:</strong> ${fmt(result.kcal, " kcal")} · ${fmt(result.protein, " g proteína")} · ${fmt(result.carbs, " g carbos")} · ${fmt(result.fat, " g grasa")}`;
    };
    plateForm.addEventListener("input", updatePlate);
    plateForm.addEventListener("submit", event => {
      event.preventDefault();
      state.plates.push({ name: plateForm.elements.plateName.value, macros: calculatePlate(plateForm) });
      saveState();
      render();
    });
    updatePlate();
  }

  const recipeForm = document.querySelector("#recipeForm");
  if (recipeForm) recipeForm.addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(recipeForm));
    const macros = estimateRecipe(data.ingredients);
    const servings = Number(data.servings) || 1;
    state.recipes.push({ ...data, servings, total: macros, perServing: { kcal: macros.kcal / servings, protein: macros.protein / servings, carbs: macros.carbs / servings, fat: macros.fat / servings } });
    saveState();
    render();
  });

  const workoutForm = document.querySelector("#workoutForm");
  if (workoutForm) workoutForm.addEventListener("submit", event => {
    event.preventDefault();
    const routine = buildRoutine().days[0];
    const entries = routine.exercises.map((e, idx) => ({
      exercise: e.name,
      weight: Number(workoutForm.elements[`weight-${idx}`].value),
      reps: workoutForm.elements[`reps-${idx}`].value,
      sets: Number(workoutForm.elements[`sets-${idx}`].value),
      feeling: workoutForm.elements[`feeling-${idx}`].value,
      note: workoutForm.elements[`note-${idx}`].value
    }));
    const totalSets = entries.reduce((sum, e) => sum + e.sets, 0);
    const totalReps = entries.reduce((sum, e) => sum + e.reps.split(",").map(Number).reduce((a, b) => a + (b || 0), 0), 0);
    const recommendation = progressionAdvice(entries);
    state.workoutLogs.push({ date: new Date().toLocaleDateString("es-CO"), entries, recommendation, summary: `${entries.length} ejercicios, ${totalSets} series, ${totalReps} repeticiones, ${workoutForm.elements.cardio.value}.` });
    saveState();
    render();
  });

  const cardioForm = document.querySelector("#cardioForm");
  if (cardioForm) cardioForm.addEventListener("submit", event => {
    event.preventDefault();
    state.cardio.push({ date: new Date().toLocaleDateString("es-CO"), ...Object.fromEntries(new FormData(cardioForm)) });
    saveState();
    render();
  });

  const progressForm = document.querySelector("#progressForm");
  if (progressForm) progressForm.addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(progressForm));
    data.weight = Number(data.weight);
    data.week = state.progress.length + 1;
    state.progress.push(data);
    state.profile.weight = data.weight;
    saveState();
    render();
  });

  const adjustForm = document.querySelector("#adjustForm");
  if (adjustForm) adjustForm.addEventListener("submit", event => {
    event.preventDefault();
    document.querySelector("#adjustResult").textContent = weeklyAdjustment(Object.fromEntries(new FormData(adjustForm)));
  });

  document.querySelectorAll("[data-market-days]").forEach(btn => btn.addEventListener("click", () => {
    const days = Number(btn.dataset.marketDays);
    document.querySelector("#marketList").insertAdjacentHTML("afterbegin", `<div class="notice" style="grid-column: 1 / -1">Lista calculada para ${days} día${days > 1 ? "s" : ""}. Multiplica porciones base por ${days}. Prioriza pollo, huevo, arroz, papa, lentejas, frutas y verduras de temporada.</div>`);
  }));

  const exportBtn = document.querySelector("[data-export]");
  if (exportBtn) exportBtn.addEventListener("click", () => {
    const { password, ...safeUser } = currentUser();
    document.querySelector("#exportBox").textContent = JSON.stringify({ user: safeUser, data: state }, null, 2);
  });

  const logoutBtn = document.querySelector("[data-logout]");
  if (logoutBtn) logoutBtn.addEventListener("click", () => {
    auth.currentEmail = "";
    auth.token = "";
    auth.user = null;
    saveAuth();
    state = structuredClone(defaultState);
    render();
  });

  const resetBtn = document.querySelector("[data-reset]");
  if (resetBtn) resetBtn.addEventListener("click", () => {
    localStorage.removeItem(userStateKey());
    state = structuredClone(defaultState);
    saveState();
    render();
  });
}

function calculatePlate(form) {
  const pairs = [["protein", "proteinG"], ["carb", "carbG"], ["fat", "fatG"], ["veg", "vegG"], ["extra", "extraG"]];
  return pairs.reduce((sum, [foodName, gramsName]) => {
    const f = foods.find(item => item.name === form.elements[foodName].value);
    return addMacros(sum, macrosFor(f, Number(form.elements[gramsName].value) || 0));
  }, emptyMacros());
}

function estimateRecipe(text) {
  const lower = text.toLowerCase();
  return foods.reduce((sum, f) => {
    const first = f.name.toLowerCase().split(" ")[0];
    if (!lower.includes(first)) return sum;
    const match = lower.match(new RegExp(`${first}[^0-9]*(\\d+)\\s*g`));
    const grams = match ? Number(match[1]) : 100;
    return addMacros(sum, macrosFor(f, grams));
  }, emptyMacros());
}

render();
