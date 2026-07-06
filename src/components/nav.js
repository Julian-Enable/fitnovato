// Navegación: top bar en desktop, bottom tabs en mobile.
// Agrupa los 15 items en 5 secciones lógicas para reducir ruido.

import { escapeHtml, initials } from "../utils/format.js";

const NAV_GROUPS = [
  {
    label: "Resumen",
    items: [
      ["inicio", "Inicio", "home"],
      ["progreso", "Progreso", "trending"],
    ]
  },
  {
    label: "Nutrición",
    items: [
      ["calorias", "Calorías", "flame"],
      ["alimentacion", "Diario", "book"],
      ["plato", "Plato", "bowl"],
      ["recetas", "Recetas", "chef"],
      ["mercado", "Mercado", "cart"],
    ]
  },
  {
    label: "Entrenamiento",
    items: [
      ["rutina", "Rutina", "dumbbell"],
      ["entrenamiento", "Entrenar", "play"],
      ["ejercicios", "Ejercicios", "list"],
      ["cardio", "Cardio", "heart"],
    ]
  },
  {
    label: "Ajustes",
    items: [
      ["perfil", "Perfil", "user"],
      ["ajustes", "Ajustar plan", "sliders"],
      ["aprende", "Aprende", "lightbulb"],
      ["config", "Configuración", "gear"],
    ]
  }
];

// 5 items principales para bottom tabs en mobile
const MOBILE_TABS = [
  ["inicio", "Inicio", "home"],
  ["alimentacion", "Comidas", "book"],
  ["entrenamiento", "Entrenar", "play"],
  ["progreso", "Progreso", "trending"],
  ["config", "Más", "menu"],
];

const ICONS = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  trending: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
  flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2s4 4 4 8a4 4 0 0 1-8 0c0-1 .5-2 1-3 .5 1 1.5 1.5 2 1 0-2-1-4 1-6z"/><path d="M12 22a6 6 0 0 0 6-6c0-3-2-5-3-6 0 2-1 3-2 3 1-3-1-6-1-6s-6 4-6 9a6 6 0 0 0 6 6z"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  bowl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20"/><path d="M2 12a10 10 0 0 0 20 0"/><path d="M12 2v4"/><path d="M8 6l1-3"/><path d="M16 6l-1-3"/></svg>',
  chef: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6z"/><line x1="6" y1="17" x2="18" y2="17"/></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
  dumbbell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5l11 11"/><path d="M21 21l-1-1"/><path d="M3 3l1 1"/><path d="M18 22l4-4"/><path d="M2 6l4-4"/><path d="M3 10l7-7"/><path d="M14 21l7-7"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
  list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  sliders: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>',
  lightbulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
};

export function icon(name) {
  return ICONS[name] || ICONS.list;
}

export function renderTopBar(user, activeView) {
  const name = user?.name || "Cuenta";
  const email = user?.email || "";
  return `
    <header class="topbar">
      <div class="topbar-brand">
        <span class="brand-mark">FN</span>
        <strong>FitNovato</strong>
      </div>
      <nav class="topbar-nav" aria-label="Navegación principal">
        ${NAV_GROUPS.map(g => `
          <div class="nav-group">
            <button class="nav-group-trigger" type="button" aria-expanded="false">
              ${escapeHtml(g.label)}
            </button>
            <div class="nav-group-items" role="menu">
              ${g.items.map(([id, label, ic]) => `
                <button class="nav-item ${activeView === id ? "active" : ""}" data-view="${id}" role="menuitem">
                  <span class="nav-item-icon">${icon(ic)}</span>
                  <span>${escapeHtml(label)}</span>
                </button>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </nav>
      <div class="topbar-account">
        <div class="avatar" title="${escapeHtml(email)}">${escapeHtml(initials(name)) || "FN"}</div>
        <button class="icon-btn" data-action="logout" title="Cerrar sesión" aria-label="Cerrar sesión">${icon("logout")}</button>
      </div>
    </header>`;
}

export function renderMobileTabs(activeView) {
  return `
    <nav class="mobile-tabs" aria-label="Navegación móvil">
      ${MOBILE_TABS.map(([id, label, ic]) => `
        <button class="mobile-tab ${activeView === id ? "active" : ""}" data-view="${id}">
          <span class="mobile-tab-icon">${icon(ic)}</span>
          <span class="mobile-tab-label">${escapeHtml(label)}</span>
        </button>
      `).join("")}
    </nav>`;
}

export function bindNav(onNavigate, onLogout) {
  // Click en item de nav
  document.querySelectorAll(".nav-item, .mobile-tab").forEach(btn => {
    btn.addEventListener("click", () => onNavigate(btn.dataset.view));
  });

  // Hover/click en grupos de navegación (desktop)
  document.querySelectorAll(".nav-group-trigger").forEach(trigger => {
    const group = trigger.parentElement;
    let hoverTimer = null;
    const open = () => {
      clearTimeout(hoverTimer);
      document.querySelectorAll(".nav-group.is-open").forEach(g => {
        if (g !== group) {
          g.classList.remove("is-open");
          g.querySelector(".nav-group-trigger")?.setAttribute("aria-expanded", "false");
        }
      });
      group.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    };
    const close = () => {
      hoverTimer = setTimeout(() => {
        group.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
      }, 120);
    };
    group.addEventListener("mouseenter", open);
    group.addEventListener("mouseleave", close);
    trigger.addEventListener("click", e => {
      e.preventDefault();
      group.classList.contains("is-open") ? close() : open();
    });
  });

  // Click fuera para cerrar
  document.addEventListener("click", e => {
    if (!e.target.closest(".nav-group")) {
      document.querySelectorAll(".nav-group.is-open").forEach(g => {
        g.classList.remove("is-open");
        g.querySelector(".nav-group-trigger")?.setAttribute("aria-expanded", "false");
      });
    }
  });

  // Logout
  document.querySelectorAll('[data-action="logout"]').forEach(btn => {
    btn.addEventListener("click", onLogout);
  });
}
