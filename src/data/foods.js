// Catálogo de alimentos. Valores por 100 g.
// Estructura: name, category, kcal, protein, carbs, fat, fiber, sugar, sodium,
// portions[[label, grams]], tags{deficit, bulk, highProtein, cheap, easy}

function food(name, category, kcal, protein, carbs, fat, fiber, sugar, sodium, portions, deficit, bulk, highProtein, cheap, easy) {
  return {
    name,
    category,
    kcal,
    protein,
    carbs,
    fat,
    fiber,
    sugar,
    sodium,
    portions,
    unit: "g",
    home: portions.map(p => p[0]).join(", "),
    tags: { deficit, bulk, highProtein, cheap, easy }
  };
}

export const foods = [
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

export const foodCategories = ["Proteínas", "Carbohidratos", "Grasas", "Verduras", "Frutas", "Lácteos", "Bebidas", "Comidas caseras", "Otros"];
