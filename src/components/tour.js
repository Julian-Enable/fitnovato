// Engine de tour guiado: tooltips flotantes que resaltan elementos reales de la UI.
//
// Uso:
//   import { startTour } from "./tour.js";
//   startTour([
//     { target: ".topbar-brand", title: "Bienvenido", text: "Aquí está tu logo.", placement: "bottom" },
//     { target: ".quick-action", title: "Accesos rápidos", text: "Usa estos botones para acciones frecuentes.", placement: "top" }
//   ], { onComplete: () => {...}, onSkip: () => {...} });

const OVERLAY_CLASS = "tour-overlay";
const HIGHLIGHT_CLASS = "tour-highlight";
const TOOLTIP_CLASS = "tour-tooltip";

let currentTour = null;

/**
 * Inicia un tour guiado.
 * @param {Array} steps - Lista de pasos { target, title, text, placement }
 * @param {Object} opts - { onComplete, onSkip, allowSkip }
 */
export function startTour(steps, opts = {}) {
  if (currentTour) currentTour.destroy();
  currentTour = new Tour(steps, opts);
  currentTour.start();
  return currentTour;
}

export function isTourActive() {
  return currentTour !== null;
}

export function stopTour() {
  if (currentTour) {
    currentTour.destroy();
    currentTour = null;
  }
}

class Tour {
  constructor(steps, opts) {
    this.steps = steps;
    this.opts = { allowSkip: true, ...opts };
    this.index = 0;
    this.overlay = null;
    this.tooltip = null;
    this.highlight = null;
    this.bound = false;
  }

  start() {
    if (!this.steps.length) {
      this.complete();
      return;
    }
    this.createOverlay();
    this.createTooltip();
    this.bindEvents();
    this.showStep(0);
  }

  createOverlay() {
    this.overlay = document.createElement("div");
    this.overlay.className = OVERLAY_CLASS;
    document.body.appendChild(this.overlay);
  }

  createTooltip() {
    this.tooltip = document.createElement("div");
    this.tooltip.className = TOOLTIP_CLASS;
    this.tooltip.setAttribute("role", "dialog");
    this.tooltip.setAttribute("aria-live", "assertive");
    document.body.appendChild(this.tooltip);
  }

  bindEvents() {
    this.bound = true;
    this.onKey = e => {
      if (e.key === "Escape" && this.opts.allowSkip) this.skip();
      else if (e.key === "ArrowRight") this.next();
      else if (e.key === "ArrowLeft") this.prev();
    };
    this.onResize = () => this.position();
    document.addEventListener("keydown", this.onKey);
    window.addEventListener("resize", this.onResize);
    window.addEventListener("scroll", this.onResize, true);
  }

  showStep(i) {
    if (i < 0) i = 0;
    if (i >= this.steps.length) {
      this.complete();
      return;
    }
    this.index = i;
    const step = this.steps[i];
    this.renderTooltip(step);
    this.highlightTarget(step.target);
    this.position();
  }

  renderTooltip(step) {
    const stepNum = this.index + 1;
    const total = this.steps.length;
    const isLast = this.index === this.steps.length - 1;
    const isFirst = this.index === 0;
    this.tooltip.innerHTML = `
      <div class="tour-progress">
        <span class="tour-progress-bar" style="width: ${(stepNum / total) * 100}%"></span>
      </div>
      <div class="tour-content">
        ${step.title ? `<h3 class="tour-title">${escapeHtml(step.title)}</h3>` : ""}
        <p class="tour-text">${escapeHtml(step.text)}</p>
      </div>
      <div class="tour-footer">
        <span class="tour-counter">${stepNum} / ${total}</span>
        <div class="tour-buttons">
          ${!isFirst ? `<button class="tour-btn tour-btn-prev" type="button">Atrás</button>` : ""}
          <button class="tour-btn tour-btn-next" type="button">${isLast ? "Finalizar" : "Siguiente"}</button>
        </div>
      </div>`;
    this.tooltip.querySelector(".tour-btn-next")?.addEventListener("click", () => this.next());
    this.tooltip.querySelector(".tour-btn-prev")?.addEventListener("click", () => this.prev());
  }

  highlightTarget(selector) {
    // Limpiar highlight anterior
    document.querySelectorAll(`.${HIGHLIGHT_CLASS}`).forEach(el => el.classList.remove(HIGHLIGHT_CLASS));
    const target = typeof selector === "string" ? document.querySelector(selector) : selector;
    this.currentTarget = target;
    if (target) {
      target.classList.add(HIGHLIGHT_CLASS);
      // Scroll suave al elemento
      target.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
  }

  position() {
    if (!this.tooltip || !this.currentTarget) {
      // Si no hay target, centrar en pantalla
      if (this.tooltip) {
        this.tooltip.classList.add("tour-tooltip-centered");
      }
      return;
    }
    this.tooltip.classList.remove("tour-tooltip-centered");
    const step = this.steps[this.index];
    const placement = step.placement || "bottom";
    const targetRect = this.currentTarget.getBoundingClientRect();
    const tooltipRect = this.tooltip.getBoundingClientRect();
    const padding = 12;
    let top, left;
    switch (placement) {
      case "top":
        top = targetRect.top - tooltipRect.height - padding;
        left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
        break;
      case "bottom":
        top = targetRect.bottom + padding;
        left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
        break;
      case "left":
        top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
        left = targetRect.left - tooltipRect.width - padding;
        break;
      case "right":
        top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
        left = targetRect.right + padding;
        break;
      default:
        top = targetRect.bottom + padding;
        left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
    }
    // Clamp dentro del viewport
    const margin = 8;
    left = Math.max(margin, Math.min(left, window.innerWidth - tooltipRect.width - margin));
    top = Math.max(margin, Math.min(top, window.innerHeight - tooltipRect.height - margin));
    this.tooltip.style.top = `${top}px`;
    this.tooltip.style.left = `${left}px`;
    // Update arrow position relative to target
    const arrowLeft = targetRect.left + targetRect.width / 2 - left;
    this.tooltip.style.setProperty("--tour-arrow-left", `${Math.max(20, Math.min(tooltipRect.width - 20, arrowLeft))}px`);
  }

  next() {
    this.showStep(this.index + 1);
  }

  prev() {
    this.showStep(this.index - 1);
  }

  skip() {
    this.destroy();
    this.opts.onSkip?.();
  }

  complete() {
    this.destroy();
    this.opts.onComplete?.();
  }

  destroy() {
    if (!this.bound) return;
    document.removeEventListener("keydown", this.onKey);
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("scroll", this.onResize, true);
    this.overlay?.remove();
    this.tooltip?.remove();
    document.querySelectorAll(`.${HIGHLIGHT_CLASS}`).forEach(el => el.classList.remove(HIGHLIGHT_CLASS));
    this.overlay = null;
    this.tooltip = null;
    this.bound = false;
    if (currentTour === this) currentTour = null;
  }
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[ch]));
}
