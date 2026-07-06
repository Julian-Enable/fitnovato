# FitNovato

App web fitness para principiantes. Funciona como una SPA estática con datos locales, reglas internas y guardado por cuenta en el navegador.

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
