// Opciones predefinidas para los campos del perfil.
// Centralizadas para que wizard y formulario de perfil usen las mismas.

// Edad: 12 a 100 años
export const ageOptions = Array.from({ length: 89 }, (_, i) => String(i + 12));

// Estatura: 120 a 230 cm, en pasos de 1 cm
export const heightOptions = Array.from({ length: 111 }, (_, i) => String(i + 120));

// Peso: 30 a 250 kg, en pasos de 0.5 kg
export const weightOptions = Array.from({ length: 441 }, (_, i) => String((30 + i * 0.5).toFixed(1)));

// Días por semana: 1 a 7
export const daysOptions = ["1", "2", "3", "4", "5", "6", "7"];

// Minutos por sesión: valores comunes
export const minutesOptions = ["15", "20", "30", "40", "45", "50", "60", "75", "90", "120", "150", "180"];

// Comidas al día: 2 a 8
export const mealsOptions = ["2", "3", "4", "5", "6", "7", "8"];

// Presupuesto
export const budgetOptions = ["Bajo", "Medio", "Alto", "Sin restricción"];
