// Vista de lecciones (aprende).
import { sectionTitle } from "../components/ui.js";
import { escapeHtml } from "../utils/format.js";
import { lessons } from "../data/lessons.js";

export function render() {
  return `
    <div class="view-stack">
      ${sectionTitle("Aprende", "Conceptos simples para empezar sin tecnicismos.")}
      <div class="grid grid-3">
        ${lessons.map(([title, body]) => `
          <article class="card lesson-card">
            <div class="card-body">
              <h3>${escapeHtml(title)}</h3>
              <p>${escapeHtml(body)}</p>
            </div>
          </article>`).join("")}
      </div>
    </div>`;
}
