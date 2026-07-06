// Componentes de formulario reutilizables con estilo Apple Health.
import { escapeHtml } from "../utils/format.js";

export function input(name, label, value, type = "text", opts = {}) {
  const v = escapeHtml(value);
  const placeholder = opts.placeholder ? `placeholder="${escapeHtml(opts.placeholder)}"` : "";
  const min = opts.min != null ? `min="${opts.min}"` : "";
  const max = opts.max != null ? `max="${opts.max}"` : "";
  const step = opts.step ? `step="${opts.step}"` : "";
  return `<label class="field">
    <span class="field-label">${escapeHtml(label)}</span>
    <input name="${name}" type="${type}" value="${v}" ${placeholder} ${min} ${max} ${step} />
  </label>`;
}

export function textarea(name, label, value, opts = {}) {
  const rows = opts.rows || 3;
  return `<label class="field">
    <span class="field-label">${escapeHtml(label)}</span>
    <textarea name="${name}" rows="${rows}">${escapeHtml(value)}</textarea>
  </label>`;
}

export function select(name, label, options, value) {
  const placeholder = value ? "" : `<option value="" disabled selected>Selecciona…</option>`;
  const opts = options.map(o => `<option ${o === value ? "selected" : ""}>${escapeHtml(o)}</option>`).join("");
  return `<label class="field">
    <span class="field-label">${escapeHtml(label)}</span>
    <select name="${name}">${placeholder}${opts}</select>
  </label>`;
}

export function foodSelect(name, label, value, foods = []) {
  const opts = foods.map(f => `<option ${f.name === value ? "selected" : ""}>${escapeHtml(f.name)}</option>`).join("");
  return `<label class="field">
    <span class="field-label">${escapeHtml(label)}</span>
    <select name="${name}">${opts}</select>
  </label>`;
}

export function button(label, opts = {}) {
  const variant = opts.variant || "primary";
  const type = opts.type || "button";
  const icon = opts.icon ? `<span class="btn-icon" aria-hidden="true">${opts.icon}</span>` : "";
  return `<button class="btn btn-${variant}" type="${type}" ${opts.disabled ? "disabled" : ""}>
    ${icon}<span>${escapeHtml(label)}</span>
  </button>`;
}

export function metric(label, value, note = "", opts = {}) {
  const accent = opts.accent ? ` metric--${opts.accent}` : "";
  return `<article class="metric${accent}">
    <span class="metric-label">${escapeHtml(label)}</span>
    <strong class="metric-value">${escapeHtml(value)}</strong>
    <small class="metric-note">${escapeHtml(note)}</small>
  </article>`;
}

export function card(title, bodyHtml, opts = {}) {
  const header = title ? `<header class="card-head"><h2>${escapeHtml(title)}</h2>${opts.subtitle ? `<p class="card-sub">${escapeHtml(opts.subtitle)}</p>` : ""}</header>` : "";
  return `<section class="card">${header}<div class="card-body">${bodyHtml}</div></section>`;
}

export function emptyState(message, actionHtml = "") {
  return `<div class="empty-state">
    <div class="empty-icon" aria-hidden="true">∅</div>
    <p>${escapeHtml(message)}</p>
    ${actionHtml}
  </div>`;
}

export function sectionTitle(title, subtitle = "", rightHtml = "") {
  return `<header class="section-title">
    <div><h1>${escapeHtml(title)}</h1>${subtitle ? `<p>${escapeHtml(subtitle)}</p>` : ""}</div>
    ${rightHtml ? `<div class="section-title-right">${rightHtml}</div>` : ""}
  </header>`;
}
