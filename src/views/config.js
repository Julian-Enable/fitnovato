import { input, sectionTitle } from "../components/ui.js";
import { escapeHtml } from "../utils/format.js";
import { getApiBase, setApiUrl } from "../api/client.js";
import { toast } from "../components/toast.js";

export function render(state, user) {
  return `
    <div class="view-stack">
      ${sectionTitle("Configuracion", "Cuenta activa, conexion con el backend y copias de seguridad.")}

      <section class="card">
        <header class="card-head"><h2>Cuenta</h2></header>
        <div class="card-body">
          <p class="form-msg">Cuenta activa: <strong>${escapeHtml(user?.email || "")}</strong></p>
          <p class="form-msg">${getApiBase() ? "La app sincroniza esta cuenta con el backend." : "La app guarda la informacion localmente en este navegador."} No usa IA, escaneres, pagos ni APIs externas de alimentos.</p>
          <div class="notice notice-info">Backend configurado: <strong>${escapeHtml(getApiBase() || "ninguno")}</strong></div>
        </div>
      </section>

      <section class="card">
        <header class="card-head"><h2>Conexion al backend</h2></header>
        <div class="card-body">
          <form id="apiConfigForm" class="form-row">
            ${input("apiUrl", "URL del backend", getApiBase(), "url", { placeholder: "https://backend.up.railway.app" })}
            <button class="btn btn-ghost" type="submit">Guardar URL</button>
          </form>
        </div>
      </section>

      <section class="card">
        <header class="card-head"><h2>Datos y sesion</h2></header>
        <div class="card-body">
          <div class="btn-row">
            <button class="btn btn-secondary" data-export>Exportar datos</button>
            <label class="btn btn-secondary">
              Importar datos
              <input type="file" data-import accept="application/json" hidden />
            </label>
            <button class="btn btn-secondary" data-repeat-tour>Repetir tutorial</button>
            <button class="btn btn-secondary" data-logout>Cerrar sesion</button>
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
    const { password, passwordHash, ...safeUser } = ctx.currentUser() || {};
    const payload = JSON.stringify({ user: safeUser, data: ctx.state, exportedAt: new Date().toISOString() }, null, 2);
    document.querySelector("#exportBox").textContent = payload;
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fitnovato-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.info("Backup descargado");
  });

  document.querySelector("[data-import]")?.addEventListener("change", async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const payload = JSON.parse(await file.text());
      if (!payload.data || typeof payload.data !== "object") throw new Error("Archivo invalido");
      ctx.state = { ...ctx.defaultState, ...payload.data };
      ctx.save();
      toast.success("Datos importados");
      ctx.render();
    } catch (error) {
      toast.error(error.message || "No se pudo importar");
    }
  });

  document.querySelector("[data-repeat-tour]")?.addEventListener("click", () => {
    ctx.startTour?.();
  });

  document.querySelector("[data-logout]")?.addEventListener("click", () => {
    ctx.logout();
  });

  document.querySelector("[data-reset]")?.addEventListener("click", () => {
    localStorage.removeItem(ctx.userStateKey());
    ctx.state = structuredClone(ctx.defaultState);
    ctx.save();
    toast.success("App reiniciada");
    ctx.render();
  });
}
