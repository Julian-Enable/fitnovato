# FitNovato

App web fitness para principiantes. Funciona como una SPA estática con datos locales, reglas internas y guardado por cuenta en el navegador.

## Deploy actual

- Frontend estático: `index.html`, `styles.css`, `app.js`, `config.js`.
- Backend API: carpeta `backend/`.
- Base de datos recomendada: PostgreSQL en Railway.

## Deploy del frontend en Vercel

1. Entra a Vercel y crea un nuevo proyecto desde este repositorio.
2. Framework preset: `Other`.
3. Root directory: raíz del repositorio.
4. Build command: vacío.
5. Output directory: vacío o `.`.
6. Deploy.

Después de publicar el backend en Railway, copia la URL pública del backend y ponla en `config.js`:

```js
window.FITNOVATO_API_URL = "https://TU-BACKEND.up.railway.app";
```

Luego haz commit y push para que Vercel actualice el frontend.

## Deploy del backend en Railway

1. En Railway crea un proyecto nuevo desde este repositorio.
2. Elige el servicio desde la carpeta `backend`.
3. Agrega PostgreSQL al proyecto.
4. En variables del servicio backend configura:
   - `DATABASE_URL`: Railway la agrega desde PostgreSQL.
   - `JWT_SECRET`: una cadena larga y privada.
   - `FRONTEND_ORIGIN`: la URL de Vercel, por ejemplo `https://fitnovato.vercel.app`.
5. Start command: Railway usará `npm start`.
6. El backend corre migraciones y luego inicia la API.

Endpoints principales:

- `POST /auth/register`
- `POST /auth/login`
- `GET /me/state`
- `PUT /me/state`
- `GET /health`

## Deploy en GitHub Pages

1. Crea un repositorio nuevo en GitHub, por ejemplo `fitnovato`.
2. Sube estos archivos en la raíz del repositorio:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `.nojekyll`
   - carpeta `assets/`
3. En GitHub entra a `Settings > Pages`.
4. En `Build and deployment`, selecciona:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Guarda. GitHub publicará la app en una URL similar a:
   `https://TU-USUARIO.github.io/fitnovato/`

## Nota técnica

Este MVP no usa IA, APIs externas ni backend. El registro por correo separa la información por usuario dentro de `localStorage`.

Para producción se recomienda agregar backend propio con:

- Base de datos de usuarios.
- Contraseñas cifradas.
- Sesiones seguras.
- Recuperación y verificación de correo.
- Persistencia multi-dispositivo.

Deploy refresh: 2026-07-06T03:25Z
