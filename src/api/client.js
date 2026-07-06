// Cliente HTTP para el backend. Maneja auth y errores.

const API_URL_KEY = "fitnovato-api-url";

export function getApiBase() {
  // Prioridad: ?local=1 en URL (desarrollo) > localStorage (override del usuario) > window.FITNOVATO_API_URL (config.js) > ""
  if (typeof window !== "undefined" && window.location) {
    const params = new URLSearchParams(window.location.search);
    if (params.get("local") === "1") return "";
  }
  const lsValue = (typeof localStorage !== "undefined" && localStorage.getItem(API_URL_KEY)) || "";
  const configured = lsValue || (typeof window !== "undefined" && window.FITNOVATO_API_URL) || "";
  return configured.replace(/\/$/, "");
}

export function setApiUrl(value) {
  const clean = String(value || "").trim().replace(/\/$/, "");
  if (clean) localStorage.setItem(API_URL_KEY, clean);
  else localStorage.removeItem(API_URL_KEY);
}

/**
 * Wrapper de fetch con auth y manejo de errores.
 * Lanza Error con mensaje en español si la respuesta no es 2xx.
 */
export async function apiRequest(path, options = {}, token = "") {
  const base = getApiBase();
  if (!base) throw new Error("Backend no configurado");
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${base}${path}`, { ...options, headers });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "Error de conexión");
  return payload;
}

export function isOnline() {
  return Boolean(getApiBase());
}
