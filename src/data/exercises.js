function ex(name, muscle, secondary, level, equipment, place, description, steps, mistakes, sets, reps, rest, alternatives) {
  return {
    name,
    muscle,
    secondary,
    level,
    equipment,
    place,
    description,
    steps,
    mistakes,
    sets,
    reps,
    rest,
    alternatives,
    safety: "Si sientes dolor agudo, detén el ejercicio y usa una alternativa más cómoda."
  };
}

export const exercises = [
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
