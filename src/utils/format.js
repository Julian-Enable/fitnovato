// Utilidades de formato numérico y de strings.

export function fmt(num, unit = "") {
  if (!Number.isFinite(num)) num = 0;
  return `${Math.round(num).toLocaleString("es-CO")}${unit}`;
}

export function one(num) {
  if (!Number.isFinite(num)) num = 0;
  return Number(num).toLocaleString("es-CO", { maximumFractionDigits: 1 });
}

export function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[ch]));
}

export function initials(name = "") {
  return String(name || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() || "")
    .join("");
}

export function today() {
  return new Date().toLocaleDateString("es-CO", { day: "2-digit", month: "short" });
}

export function clampNumber(value, min, max) {
  const n = Number(value);
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}
