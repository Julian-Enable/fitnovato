// Helpers para manipulación segura del DOM y creación de elementos.

import { escapeHtml } from "./format.js";

/**
 * Crea un elemento DOM a partir de string HTML.
 * Retorna el primer nodo del fragmento, o null si el string está vacío.
 */
export function html(literals, ...values) {
  const raw = literals.reduce((acc, lit, i) => {
    return acc + lit + (i < values.length ? escapeHtml(values[i]) : "");
  }, "");
  const template = document.createElement("template");
  template.innerHTML = raw.trim();
  return template.content.firstElementChild;
}

/**
 * Igual que `html` pero NO escapa los valores (útil cuando se inserta HTML
 * ya construido de forma controlada, como cards que ya pasaron por escape).
 */
export function htmlRaw(literals, ...values) {
  const raw = literals.reduce((acc, lit, i) => acc + lit + (i < values.length ? values[i] : ""), "");
  const template = document.createElement("template");
  template.innerHTML = raw.trim();
  return template.content.firstElementChild;
}

export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else if (k.startsWith("data-")) node.setAttribute(k, v);
    else if (k === "on" && typeof v === "object") {
      for (const [evt, fn] of Object.entries(v)) node.addEventListener(evt, fn);
    } else node.setAttribute(k, v);
  }
  for (const c of [].concat(children)) {
    if (c == null) continue;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return node;
}

export function $(selector, root = document) {
  return root.querySelector(selector);
}

export function $$(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

export function debounce(fn, ms = 300) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
