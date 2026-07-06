// Definición de los pasos del tour guiado para cada vista.
// Cada paso tiene: target (selector), title, text, placement (top|bottom|left|right).
// Tono: coach amigable, frases cortas y directas.

export const tourSteps = {
  // Bienvenida inicial (no atada a ningún elemento)
  welcome: [
    {
      target: null,
      title: "¡Bienvenido a FitNovato!",
      text: "Vamos a hacer un recorrido rápido por la app. Te mostraré dónde está cada cosa en menos de 2 minutos.",
      placement: "center"
    }
  ],

  // Tour del home después del onboarding
  home: [
    {
      target: ".topbar-brand",
      title: "Tu base",
      text: "Aquí está FitNovato. Desde esta barra superior puedes navegar a cualquier sección.",
      placement: "bottom"
    },
    {
      target: ".hero-card",
      title: "Tus calorías de hoy",
      text: "Esta es tu métrica principal. El objetivo se calcula con tu perfil. La barra se llena a medida que registras comidas.",
      placement: "bottom"
    },
    {
      target: ".grid-4",
      title: "Métricas clave",
      text: "Mantenimiento, meta diaria, peso actual e IMC. Toca cualquier métrica para ver más detalle.",
      placement: "top"
    },
    {
      target: ".quick-actions",
      title: "Accesos rápidos",
      text: "Estos 4 botones son lo que más vas a usar: registrar comida, crear plato, pesar y cardio.",
      placement: "top"
    }
  ],

  // Cada vista del tour completo
  calorias: [
    {
      target: ".section-title",
      title: "Tus calorías y macros",
      text: "Aquí ves el detalle de tu gasto calórico. La fórmula Mifflin-St Jeor estima tu metabolismo basal.",
      placement: "bottom"
    },
    {
      target: ".macro-grid",
      title: "Macros diarios",
      text: "Proteína, carbohidratos y grasas. Cada uno tiene un rol: músculo, energía y hormonas.",
      placement: "top"
    }
  ],

  alimentacion: [
    {
      target: "#mealForm",
      title: "Agregar comida",
      text: "Elige un alimento, una porción casera o gramos manuales, y agrégalo al diario. Así de simple.",
      placement: "bottom"
    },
    {
      target: ".data-table",
      title: "Tu diario de hoy",
      text: "Aquí se acumulan las comidas que registres. Las calorías se descuentan automáticamente del objetivo.",
      placement: "top"
    }
  ],

  plato: [
    {
      target: "#plateForm",
      title: "Constructor de platos",
      text: "Arma platos combinando proteína, carbohidrato, grasa, verdura y extra. La app calcula los macros al instante.",
      placement: "bottom"
    },
    {
      target: "#plateResult",
      title: "Resultado en vivo",
      text: "Mientras cambias gramos, este resultado se actualiza. Guarda el plato para reutilizarlo después.",
      placement: "top"
    }
  ],

  recetas: [
    {
      target: "#recipeForm",
      title: "Tus recetas",
      text: "Guarda recetas con ingredientes y porciones. La app estima los macros automáticamente leyendo el texto.",
      placement: "bottom"
    }
  ],

  mercado: [
    {
      target: ".btn-row",
      title: "Calcula por días",
      text: "Elige para cuántos días quieres la lista y la app te da una guía de compras económica o balanceada.",
      placement: "bottom"
    },
    {
      target: ".check-list",
      title: "Lista interactiva",
      text: "Marca los productos que ya compraste. La lista se ajusta a tu presupuesto.",
      placement: "top"
    }
  ],

  rutina: [
    {
      target: ".section-title",
      title: "Tu rutina",
      text: "Esta rutina se genera automáticamente según tu objetivo, nivel, días disponibles y lugar de entrenamiento.",
      placement: "bottom"
    },
    {
      target: ".routine-day",
      title: "Día a día",
      text: "Cada día muestra ejercicios, series, repeticiones y descanso. Prioriza técnica sobre peso.",
      placement: "top"
    }
  ],

  entrenamiento: [
    {
      target: "#workoutForm",
      title: "Registra tu sesión",
      text: "Anota peso, reps y sensación de cada ejercicio. Al finalizar, la app te da una recomendación de progresión.",
      placement: "bottom"
    }
  ],

  ejercicios: [
    {
      target: ".exercise-detail",
      title: "Catálogo de ejercicios",
      text: "Toca cualquier ejercicio para ver técnica paso a paso, errores comunes y alternativas. Útil cuando no sabes cómo hacer algo.",
      placement: "right"
    }
  ],

  cardio: [
    {
      target: "#cardioForm",
      title: "Registra cardio",
      text: "Caminadora, bicicleta, trote, cuerda… lo que hagas, regístralo aquí para tener histórico.",
      placement: "bottom"
    }
  ],

  progreso: [
    {
      target: "#progressForm",
      title: "Seguimiento semanal",
      text: "Cada semana registra tu peso, hábitos y energía. La app detecta tendencias y te sugiere ajustes.",
      placement: "bottom"
    }
  ],

  ajustes: [
    {
      target: "#adjustForm",
      title: "Ajusta tu plan",
      text: "Si llevas un tiempo cumpliendo y no ves cambios, responde este formulario. La app te dirá qué ajustar.",
      placement: "bottom"
    }
  ],

  aprende: [
    {
      target: ".lesson-card",
      title: "Aprende",
      text: "Conceptos clave explicados simple: déficit calórico, proteína, calentamiento, estancamiento. Vuelve aquí cuando tengas dudas.",
      placement: "right"
    }
  ],

  config: [
    {
      target: ".section-title",
      title: "Configuración",
      text: "Aquí gestionas tu cuenta, conexión al backend, exportas tus datos o cierras sesión.",
      placement: "bottom"
    }
  ],

  perfil: [
    {
      target: ".section-title",
      title: "Tu perfil",
      text: "Estos datos alimentan todos los cálculos. Si cambias de objetivo o rutina, actualízalos aquí.",
      placement: "bottom"
    }
  ]
};

// Orden del tour completo (15 vistas)
export const fullTourOrder = [
  "home",
  "calorias",
  "alimentacion",
  "plato",
  "recetas",
  "mercado",
  "rutina",
  "entrenamiento",
  "ejercicios",
  "cardio",
  "progreso",
  "ajustes",
  "aprende",
  "perfil",
  "config"
];

// Mensaje de cierre del tour
export const tourClosing = [
  {
    target: null,
    title: "¡Listo, ya conoces FitNovato!",
    text: "Recuerda: la constancia vence al esfuerzo. Registra tus comidas, cumple tus entrenamientos y revisa tu progreso cada semana. ¡Vamos paso a paso!",
    placement: "center"
  }
];
