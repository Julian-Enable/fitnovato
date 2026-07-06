// Sistema de toasts / notificaciones no intrusivas.
// Uso: import { toast } from "./toast.js"; toast.success("Guardado"); toast.error("Falló");

let container = null;

function ensureContainer() {
  if (container) return container;
  container = document.createElement("div");
  container.className = "toast-container";
  container.setAttribute("role", "status");
  container.setAttribute("aria-live", "polite");
  document.body.appendChild(container);
  return container;
}

function show(message, type = "info", duration = 3200) {
  const root = ensureContainer();
  const t = document.createElement("div");
  t.className = `toast toast-${type}`;
  t.innerHTML = `
    <span class="toast-icon" aria-hidden="true"></span>
    <span class="toast-msg"></span>
  `;
  t.querySelector(".toast-msg").textContent = message;
  root.appendChild(t);
  // Animar entrada
  requestAnimationFrame(() => t.classList.add("toast-visible"));
  // Auto-cerrar
  const close = () => {
    t.classList.remove("toast-visible");
    setTimeout(() => t.remove(), 240);
  };
  t.addEventListener("click", close);
  setTimeout(close, duration);
}

export const toast = {
  success: (msg, ms) => show(msg, "success", ms),
  error: (msg, ms) => show(msg, "error", ms ?? 4500),
  info: (msg, ms) => show(msg, "info", ms),
  warn: (msg, ms) => show(msg, "warn", ms)
};
