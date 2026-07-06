// Vista de configuración.
import { input, sectionTitle } from "../components/ui.js";
import { escapeHtml } from "../utils/format.js";
import { getApiBase, setApiUrl } from "../api/client.js";
import { toast } from "../components/toast.js";

export function render(state, user) {
  return `
    <div class="view-stack">
      ${sectionTitle("Configuración", "Cuenta activa y conexión con el backend.")}

      <section class="card">
        <header class="card-head"><h2>Cuenta</h2></header>
        <div class="card-body">
          <p class="form-msg">Cuenta activa: <strong>${escapeHtml(user?.email || "")}</strong></p>
          <p class="form-msg">${getApiBase() ? "La app sincroniza esta cuenta con el backend." : "La app guarda la información localmente en este navegador."} No usa IA, escáneres, pagos ni APIs externas de alimentos.</p>
          <div class="notice notice-info">Backend configurado: <strong>${escapeHtml(getApiBase() || "ninguno")}</strong></div>
        </div>
      </section>

      <section class="card">
        <header class="card-head"><h2>Conexión al backend</h2></header>
        <div class="card-body">
          <form id="apiConfigForm" class="form-row">
            ${input("apiUrl", "URL del backend", getApiBase(), "url", { placeholder: "https://backend.up.railway.app" })}
            <button class="btn btn-ghost" type="submit">Guardar URL</button>
          </form>
        </div>
      </section>

      <section class="card">
        <header class="card-head"><h2>Datos y sesión</h2></header>
        <div class="card-body">
          <div class="btn-row">
            <button class="btn btn-secondary" data-export>Exportar datos</button>
            <button class="btn btn-secondary" data-logout>Cerrar sesión</button>
            <button class="btn btn-danger" data-reset>Reiniciar app</button>
          </div>
          <pre id="exportBox" class="export-box"></pre>
        </div>
      </section>
    </div>`;
}

export function bind(ctx) {
  document.querySelector("#apiConfigForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const value = String(new FormData(e.target).get("apiUrl") || "").trim();
    setApiUrl(value);
    toast.success(value ? "URL guardada" : "Modo local activado");
    setTimeout(() => location.reload(), 600);
  });

  document.querySelector("[data-export]")?.addEventListener("click", () => {
    const { password, ...safeUser } = ctx.currentUser() || {};
    document.querySelector("#exportBox").textContent = JSON.stringify({ user: safeUser, data: ctx.state }, null, 2);
    toast.info("Datos exportados");
  });

  document.querySelector("[data-logout]")?.addEventListener("click", () => {
    ctx.logout();
  });

  document.querySelector("[data-reset]")?.addEventListener("click", () => {
    if (!confirm("¿Reiniciar la app? Se borrarán tus datos locales.")) return;
    localStorage.removeItem(ctx.userStateKey());
    ctx.state = structuredClone(ctx.defaultState);
    ctx.save();
    toast.success("App reiniciada");
    ctx.render();
  });
}
