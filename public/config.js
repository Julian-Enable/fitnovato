// Configuración del frontend cargada en runtime (no se build-ea).
// Este archivo se sirve estático desde /public/config.js y debe cargarse
// antes que el bundle de Vite. Permite cambiar la URL del backend sin
// reconstruir el frontend.

window.FITNOVATO_API_URL = "https://fitnovato-production.up.railway.app";
