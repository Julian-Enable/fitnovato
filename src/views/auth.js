// Vista de autenticación (login + registro + configuración de API).
import { input, button, card } from "../components/ui.js";
import { getApiBase, setApiUrl } from "../api/client.js";
import { toast } from "../components/toast.js";
import { escapeHtml } from "../utils/format.js";

export function render() {
  return `
    <div class="auth-screen">
      <div class="auth-brand">
        <span class="brand-mark brand-mark-lg">FN</span>
        <h1>FitNovato</h1>
        <p>Tu guía de comida y entrenamiento, sin tecnicismos.</p>
      </div>

      <div class="auth-cards">
        <section class="card auth-card">
          <header class="card-head"><h2>Iniciar sesión</h2></header>
          <form id="loginForm" class="form-stack">
            ${input("email", "Correo", "", "email", { placeholder: "tu@correo.com" })}
            ${input("password", "Contraseña", "", "password", { placeholder: "Mínimo 6 caracteres" })}
            <button class="btn btn-primary btn-block" type="submit">Entrar</button>
            <p id="loginMsg" class="form-msg"></p>
          </form>
        </section>

        <section class="card auth-card">
          <header class="card-head"><h2>Crear cuenta</h2></header>
          <form id="registerForm" class="form-stack">
            ${input("name", "Nombre", "", "text", { placeholder: "Tu nombre" })}
            ${input("email", "Correo", "", "email", { placeholder: "tu@correo.com" })}
            ${input("password", "Contraseña", "", "password", { placeholder: "Mínimo 6 caracteres" })}
            <button class="btn btn-secondary btn-block" type="submit">Registrarme</button>
            <p id="registerMsg" class="form-msg"></p>
          </form>
        </section>
      </div>

      <section class="card auth-api-card">
        <header class="card-head">
          <h2>Conexión al backend</h2>
          <p class="card-sub">Pega aquí la URL de Railway. Si la dejas vacía, la app funciona en modo local en este navegador.</p>
        </header>
        <form id="apiConfigForm" class="form-row">
          ${input("apiUrl", "URL del backend", getApiBase(), "url", { placeholder: "https://backend.up.railway.app" })}
          <button class="btn btn-ghost" type="submit">Guardar</button>
        </form>
        <p class="form-msg">Estado actual: <strong>${escapeHtml(getApiBase() ? "con backend" : "modo local")}</strong></p>
      </section>

      <p class="auth-foot">FitNovato MVP · datos separados por correo</p>
    </div>`;
}

export function bind(ctx) {
  const { auth, api, onSuccess } = ctx;

  // API config
  document.querySelector("#apiConfigForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const value = String(new FormData(e.target).get("apiUrl") || "").trim();
    setApiUrl(value);
    toast.success(value ? "URL del backend guardada" : "Modo local activado");
    setTimeout(() => location.reload(), 600);
  });

  // Login
  document.querySelector("#loginForm")?.addEventListener("submit", async e => {
    e.preventDefault();
    const data = normalizeAuth(new FormData(e.target));
    if (!data.email || !data.password) {
      showMsg("#loginMsg", "Correo y contraseña son obligatorios");
      return;
    }
    try {
      if (getApiBase()) {
        const result = await api.apiRequest("/auth/login", {
          method: "POST",
          body: JSON.stringify({ email: data.email, password: data.password })
        });
        Object.assign(auth, {
          token: result.token,
          user: result.user,
          currentEmail: result.user.email
        });
        auth.users[result.user.email] = result.user;
        onSuccess(normalizeBackendState(result.state));
      } else {
        const user = auth.users[data.email];
        if (!user || user.password !== data.password) {
          showMsg("#loginMsg", "Correo o contraseña incorrectos");
          return;
        }
        auth.currentEmail = data.email;
        api.saveAuth(auth);
        toast.success(`Hola de nuevo, ${user.name}`);
        onSuccess();
      }
    } catch (err) {
      showMsg("#loginMsg", err.message);
    }
  });

  // Register
  document.querySelector("#registerForm")?.addEventListener("submit", async e => {
    e.preventDefault();
    const data = normalizeAuth(new FormData(e.target));
    if (!data.name || !data.email || data.password.length < 6) {
      showMsg("#registerMsg", "Nombre, correo y contraseña (mínimo 6 caracteres)");
      return;
    }
    try {
      if (getApiBase()) {
        const initial = structuredClone(ctx.defaultState);
        const result = await api.apiRequest("/auth/register", {
          method: "POST",
          body: JSON.stringify({ name: data.name, email: data.email, password: data.password, state: initial })
        });
        Object.assign(auth, {
          token: result.token,
          user: result.user,
          currentEmail: result.user.email
        });
        auth.users[result.user.email] = result.user;
        toast.success(`Cuenta creada. ¡Bienvenido, ${data.name}!`);
        onSuccess(normalizeBackendState(result.state));
      } else {
        if (auth.users[data.email]) {
          showMsg("#registerMsg", "Ese correo ya está registrado. Inicia sesión.");
          return;
        }
        auth.users[data.email] = {
          name: data.name,
          email: data.email,
          password: data.password,
          createdAt: new Date().toISOString()
        };
        auth.currentEmail = data.email;
        api.saveAuth(auth);
        toast.success(`Cuenta creada. ¡Bienvenido, ${data.name}!`);
        onSuccess(structuredClone(ctx.defaultState));
      }
    } catch (err) {
      showMsg("#registerMsg", err.message);
    }
  });
}

function showMsg(selector, msg) {
  const el = document.querySelector(selector);
  if (el) el.textContent = msg;
}

function normalizeAuth(formData) {
  const data = Object.fromEntries(formData);
  return {
    name: (data.name || "").trim(),
    email: (data.email || "").trim().toLowerCase(),
    password: data.password || ""
  };
}

function normalizeBackendState(remoteState) {
  return remoteState && typeof remoteState === "object" ? remoteState : {};
}
