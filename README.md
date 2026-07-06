# FitNovato

App web fitness para principiantes. Funciona como una SPA con backend opcional, datos locales por cuenta y sincronización con PostgreSQL cuando hay backend configurado.

## Arquitectura v2 (2026-07-06)

- **Frontend**: HTML + CSS + JS modular con **Vite** como bundler. Estética minimalista Apple Health (light + dark mode automático).
- **Backend**: Node.js + Express + PostgreSQL + JWT + bcrypt en `backend/`.
- **Deploy**: Vercel (frontend, build con Vite) + Railway (backend + PostgreSQL).

## Estructura

```
fitnovato/
├── index.html              # HTML raíz con #app y /config.js
├── vite.config.js          # Config Vite
├── vercel.json             # Build: npm run build, output: dist
├── package.json            # Scripts: dev / build / preview / start (backend)
├── public/
│   ├── config.js           # window.FITNOVATO_API_URL (runtime config)
│   └── fitness-banner.png
├── src/
│   ├── main.js             # Entry point, router de vistas
│   ├── styles.css          # Design system completo
│   ├── data/               # foods.js, exercises.js, lessons.js
│   ├── state/store.js      # Auth + state con sync al backend
│   ├── api/client.js       # Wrapper fetch con auth
│   ├── utils/              # format, dom, calc
│   ├── components/         # nav, toast, ui (inputs, cards, badges)
│   └── views/              # 16 vistas (auth, home, profile, calories, food, plate, recipes, market, routine, workout, exercises, cardio, progress, adjustments, learn, config)
└── backend/                # API Express + PostgreSQL
    └── src/
        ├── server.js
        ├── db.js
        ├── schema.js
        └── migrate.js
```

## Desarrollo local

```bash
npm install
npm run dev          # http://localhost:5173
```

Para forzar modo local (sin backend) aunque `public/config.js` tenga una URL:

```
http://localhost:5173/?local=1
```

## Build de producción

```bash
npm run build        # genera dist/
npm run preview      # sirve dist/ en http://localhost:4173
```

## Deploy del frontend en Vercel

1. Importa el repo en Vercel.
2. Framework preset: **Vite** (se detecta automáticamente).
3. Build command: `npm run build` (automático).
4. Output directory: `dist` (automático).
5. Deploy.

El archivo `public/config.js` se sirve estático y define `window.FITNOVATO_API_URL`. Para cambiar la URL del backend sin rebuild, edita ese archivo y haz push.

## Deploy del backend en Railway

1. En Railway crea un proyecto desde este repo.
2. Configura `Root Directory` como `backend` (recomendado) o deja la raíz (el `package.json` raíz redirige con `npm --prefix backend start`).
3. Agrega PostgreSQL.
4. Variables de entorno del servicio backend:
   - `DATABASE_URL`: la agrega Railway desde PostgreSQL.
   - `JWT_SECRET`: cadena larga y privada (mínimo 32 bytes).
   - `FRONTEND_ORIGIN`: URL de Vercel, ej. `https://fitnovato.vercel.app`.
   - `NODE_ENV`: `production` (recomendado).
5. Start command: `npm start`.
6. El backend corre migraciones al arrancar y luego inicia la API.

## Endpoints del backend

- `GET /health` — estado del servicio y de la base de datos
- `POST /auth/register` — crea usuario, devuelve token + estado inicial
- `POST /auth/login` — verifica credenciales, devuelve token + estado
- `GET /me/state` — (auth) devuelve el estado completo del usuario
- `PUT /me/state` — (auth) sobrescribe el estado del usuario

## Características

- Cálculo de calorías y macros con fórmula Mifflin-St Jeor.
- Diario de comidas con catálogo de 32 alimentos locales (Colombia/Latinoamérica).
- Constructor de platos y recetas con estimación automática de macros.
- Generación de rutinas por reglas según objetivo, nivel, días, tiempo, lugar y limitaciones.
- Registro de entrenamientos con recomendación de progresión.
- Seguimiento semanal de peso, hábitos y ajuste del plan.
- Lista de mercado con cálculo por días.
- Modo local (sin backend) o modo sincronizado (con backend).
- Dark mode automático según preferencia del sistema.
- Responsive: bottom tabs en mobile, top nav con dropdowns en desktop.
- Toasts de feedback, validación de formularios, accesibilidad WCAG AA.

Deploy refresh: 2026-07-06
