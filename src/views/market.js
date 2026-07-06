// Vista de lista de mercado.
import { sectionTitle } from "../components/ui.js";
import { escapeHtml } from "../utils/format.js";
import { groupBy, marketCategory } from "../utils/calc.js";
import { foods } from "../data/foods.js";
import { toast } from "../components/toast.js";

export function render(state) {
  const budget = String(state.profile.budget || "").toLowerCase();
  const economical = budget.includes("bajo") || budget.includes("econ");
  const picks = foods
    .filter(f => economical
      ? f.tags.cheap
      : ["Proteínas", "Carbohidratos", "Grasas", "Verduras", "Frutas", "Lácteos"].includes(f.category))
    .slice(0, 22);
  const grouped = groupBy(picks, f => marketCategory(f.category));
  const days = [1, 3, 5, 7];

  return `
    <div class="view-stack">
      ${sectionTitle("Lista de mercado", "Basada en el plan semanal y alimentos comunes de Colombia y Latinoamérica.", `<span class="badge ${economical ? "badge-warn" : "badge-accent"}">${economical ? "Modo económico" : "Modo balanceado"}</span>`)}

      <section class="card">
        <header class="card-head"><h2>Calcular para</h2></header>
        <div class="card-body">
          <div class="btn-row">
            ${days.map(d => `<button class="btn btn-ghost" data-market-days="${d}">${d} día${d > 1 ? "s" : ""}</button>`).join("")}
          </div>
        </div>
      </section>

      <div id="marketList" class="grid grid-3">
        ${Object.entries(grouped).map(([cat, list]) => `
          <article class="mini-card">
            <h3>${escapeHtml(cat)}</h3>
            <ul class="check-list">
              ${list.map(f => `<li><label><input type="checkbox" /> <span>${escapeHtml(f.name)}</span> <small>${f.tags.cheap ? "económico" : "opción útil"}</small></label></li>`).join("")}
            </ul>
          </article>`).join("")}
      </div>
    </div>`;
}

export function bind(ctx) {
  document.querySelectorAll("[data-market-days]").forEach(btn => {
    btn.addEventListener("click", () => {
      const days = Number(btn.dataset.marketDays);
      const list = document.querySelector("#marketList");
      // Toggle: si ya hay un banner, lo removemos
      const existing = list.querySelector(".market-banner");
      if (existing) existing.remove();
      const banner = document.createElement("div");
      banner.className = "market-banner";
      banner.innerHTML = `Lista calculada para <strong>${days} día${days > 1 ? "s" : ""}</strong>. Multiplica porciones base por ${days}. Prioriza pollo, huevo, arroz, papa, lentejas, frutas y verduras de temporada.`;
      list.insertBefore(banner, list.firstChild);
      toast.info(`Calculado para ${days} día${days > 1 ? "s" : ""}`);
    });
  });
}
