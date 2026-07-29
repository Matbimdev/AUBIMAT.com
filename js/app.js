// ===================== AUBIMAT landing — app logic =====================
// Depends on js/i18n.js being loaded first (it defines window.AUBIMAT).
(function () {
  "use strict";

  // -------------------------------------------------------------------------
  // Configuration
  // -------------------------------------------------------------------------

  // TODO: paste the Lemon Squeezy checkout URL for the AUBIMAT subscription,
  // e.g. "https://aubimat.lemonsqueezy.com/checkout/buy/<uuid>".
  // While it is empty every "Get AUBIMAT" button falls back to the mailto below.
  const CHECKOUT_URL = "";
  const CONTACT_EMAIL = "support@aubimat.com";

  // Web3Forms access key for support@aubimat.com. Public by design — it only
  // authorises delivery to that one address and carries no account access.
  const WEB3FORMS_KEY = "bfa35119-2054-4bdd-8ed5-05765d183209";

  // LinkedIn profile shown on the About section's developer card.
  const LINKEDIN_URL = "https://www.linkedin.com/in/mateo-lopez/";

  // -------------------------------------------------------------------------
  // Tool catalogue (source: AUBIMAT Resources/Files/Tooltips.resx)
  // -------------------------------------------------------------------------
  const TOOLS = [
    {
      disc: "architecture", icon: "ceilingWall_ceilingWall",
      name: { en: "Ceiling Wall", es: "Cielo desde Muros" },
      desc: {
        en: "Creates ceilings automatically from selected walls and vertical structure, locked to the walls.",
        es: "Crea cielos rasos automáticamente a partir de los muros y la estructura vertical seleccionados, bloqueados a los muros."
      }
    },
    {
      disc: "architecture", icon: "floorWall_floorWall",
      name: { en: "Floor Wall", es: "Piso desde Muros" },
      desc: {
        en: "Creates floors automatically from selected walls and vertical structure, locked to the walls.",
        es: "Crea pisos automáticamente a partir de los muros y la estructura vertical seleccionados, bloqueados a los muros."
      }
    },
    {
      disc: "architecture", icon: "finishWall_finishWall",
      name: { en: "Finish Wall", es: "Muro de Acabado" },
      desc: {
        en: "Creates finish walls flush against the interior face of selected host walls.",
        es: "Crea muros de acabado a ras de la cara interior de los muros anfitriones seleccionados."
      }
    },
    {
      disc: "architecture", icon: "wallFromCAD_wallFromCAD",
      name: { en: "Wall CAD", es: "Muros desde CAD" },
      desc: {
        en: "Generates walls from CAD footprints — runs, L-corners, T-junctions and crossings.",
        es: "Genera muros a partir de las siluetas del CAD: tramos rectos, esquinas en L, encuentros en T y cruces."
      }
    },
    {
      disc: "structure", icon: "columnFromCAD_columnFromCAD",
      name: { en: "Column CAD", es: "Columnas desde CAD" },
      desc: {
        en: "Generates structural columns from rectangles, circles or L-shapes on a CAD layer.",
        es: "Genera columnas estructurales a partir de rectángulos, círculos o formas en L de una capa CAD."
      }
    },
    {
      disc: "mep", icon: "pipesCAD_pipesCAD",
      name: { en: "Pipes CAD", es: "Tuberías desde CAD" },
      desc: {
        en: "Creates fire-protection collector piping from CAD linework, with automatic fittings.",
        es: "Crea las tuberías colectoras del sistema contra incendios desde las líneas del CAD, con accesorios automáticos."
      }
    },
    {
      disc: "mep", icon: "sprinklerCAD_sprinklerCAD",
      name: { en: "Sprinkler CAD", es: "Rociadores desde CAD" },
      desc: {
        en: "Places sprinklers from CAD circle symbols and connects them to collector piping.",
        es: "Coloca rociadores a partir de los símbolos circulares del CAD y los conecta a la tubería colectora."
      }
    },
    {
      disc: "quality", icon: "clashDetector_clashDetector",
      name: { en: "Clash Detector", es: "Detector de Interferencias" },
      desc: {
        en: "Finds geometric interferences between host and linked categories, with an interactive browser.",
        es: "Encuentra interferencias geométricas entre categorías del modelo y de los vínculos, con un navegador interactivo."
      }
    },
    {
      disc: "quality", icon: "levelFixer_levelFixer",
      name: { en: "Level Fixer", es: "Corrector de Niveles" },
      desc: {
        en: "Finds elements whose assigned level disagrees with their real Z position and fixes them.",
        es: "Encuentra los elementos cuyo nivel asignado no coincide con su posición real en Z y los corrige."
      }
    },
    {
      disc: "views", icon: "moveSections_moveSections",
      name: { en: "Move Sections", es: "Mover Secciones" },
      desc: {
        en: "Moves all section markers in the active plan view onto a selected element.",
        es: "Mueve todas las marcas de sección de la vista de planta activa sobre un elemento seleccionado."
      }
    }
  ];

  // Order in which the discipline groups are rendered.
  const DISCIPLINES = ["architecture", "structure", "mep", "quality", "views"];

  // Accent colour per discipline. The command icons are the same PNGs used in
  // the Revit ribbon: light line art meant for a pale background. On a coloured
  // tile they wash out, so each icon sits on black with the discipline colour
  // as the border instead.
  const DISC_ACCENT = {
    architecture: { border: "border-sky-500",     glow: "shadow-sky-500/20",     bar: "from-sky-400 to-blue-600" },
    structure:    { border: "border-amber-500",   glow: "shadow-amber-500/20",   bar: "from-amber-400 to-orange-600" },
    mep:          { border: "border-emerald-500", glow: "shadow-emerald-500/20", bar: "from-emerald-400 to-teal-600" },
    quality:      { border: "border-fuchsia-500", glow: "shadow-fuchsia-500/20", bar: "from-fuchsia-400 to-purple-600" },
    views:        { border: "border-cyan-500",    glow: "shadow-cyan-500/20",    bar: "from-cyan-400 to-sky-600" }
  };

  // -------------------------------------------------------------------------
  // Tool rendering
  // -------------------------------------------------------------------------
  function renderTools() {
    const host = document.getElementById("tools-container");
    if (!host) return;
    const t = window.AUBIMAT.t;
    const lang = window.AUBIMAT.getLanguage();

    host.innerHTML = DISCIPLINES.map(disc => {
      const group = TOOLS.filter(tool => tool.disc === disc);
      if (!group.length) return "";
      const accent = DISC_ACCENT[disc];

      const cards = group.map(tool => `
        <article class="tool-card bg-white/[0.03] rounded-2xl p-6 flex flex-col">
          <div class="w-14 h-14 rounded-xl bg-black border-2 ${accent.border} ${accent.glow} p-2 mb-5 shadow-lg">
            <img src="assets/icons/${tool.icon}.png" alt="" class="w-full h-full object-contain" loading="lazy" />
          </div>
          <h3 class="text-lg font-bold text-white mb-2">${tool.name[lang]}</h3>
          <p class="text-gray-400 text-sm leading-relaxed">${tool.desc[lang]}</p>
        </article>`).join("");

      return `
        <div class="mb-14">
          <h3 class="flex items-center gap-3 text-xl font-bold text-white mb-6">
            <span class="w-1.5 h-6 rounded-full bg-gradient-to-b ${accent.bar}"></span>
            ${t("disc_" + disc)}
            <span class="text-gray-600 font-medium text-base">${group.length}</span>
          </h3>
          <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">${cards}</div>
        </div>`;
    }).join("");
  }

  // -------------------------------------------------------------------------
  // Section routing — the whole site is one page with swapped sections.
  // -------------------------------------------------------------------------
  const SECTIONS = ["home", "about", "tools", "pricing", "contact"];

  function showSection(sectionId, pushHistory = true) {
    if (!SECTIONS.includes(sectionId)) sectionId = "home";

    document.querySelectorAll(".page-section").forEach(el => {
      el.classList.remove("active");
      el.hidden = el.id !== sectionId;
    });

    const target = document.getElementById(sectionId);
    if (!target) return;

    // One frame between `hidden = false` and adding `.active` so the opacity
    // and transform transitions actually run instead of being skipped.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => target.classList.add("active"));
    });

    // Highlight the active nav entry
    document.querySelectorAll("[data-nav]").forEach(el => {
      const active = el.getAttribute("data-nav") === sectionId;
      el.classList.toggle("text-white", active);
      el.classList.toggle("text-gray-400", !active);
    });

    // The closing CTA would just repeat the form when Contact is on screen.
    const cta = document.getElementById("cta-band");
    if (cta) cta.hidden = sectionId === "contact";

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (pushHistory) {
      const url = sectionId === "home" ? window.location.pathname : "#" + sectionId;
      history.pushState({ section: sectionId }, "", url);
    }

    closeMobileMenu();
  }

  function sectionFromHash() {
    const hash = window.location.hash.replace("#", "");
    return SECTIONS.includes(hash) ? hash : "home";
  }

  // -------------------------------------------------------------------------
  // Mobile menu
  // -------------------------------------------------------------------------
  function toggleMobileMenu() {
    const menu = document.getElementById("mobile-menu");
    if (menu) menu.classList.toggle("hidden");
  }

  function closeMobileMenu() {
    const menu = document.getElementById("mobile-menu");
    if (menu) menu.classList.add("hidden");
  }

  // -------------------------------------------------------------------------
  // Hero background — drifting points joined by lines when close enough.
  // -------------------------------------------------------------------------
  function initConstellation() {
    const canvas = document.getElementById("constellation");
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    const LINK_DIST = 130;
    let points = [];
    let width = 0;
    let height = 0;
    let raf = null;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      // The hero is hidden while another section is showing — a resize then
      // reports 0×0 and would wipe the points. Keep the last good size.
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with area, capped so phones don't burn battery.
      const count = Math.min(90, Math.round((width * height) / 14000));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 1.6 + 0.7
      }));
    }

    function frame() {
      ctx.clearRect(0, 0, width, height);

      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist > LINK_DIST) continue;
          ctx.strokeStyle = `rgba(43, 184, 196, ${0.22 * (1 - dist / LINK_DIST)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = "rgba(43, 184, 196, 0.55)";
      for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);
    frame();

    // Stop burning frames while the tab is in the background.
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        raf = null;
      } else if (!raf) {
        frame();
      }
    });
  }

  // -------------------------------------------------------------------------
  // Checkout / contact wiring
  // -------------------------------------------------------------------------
  function initCheckoutLinks() {
    const href = CHECKOUT_URL || "mailto:" + CONTACT_EMAIL + "?subject=AUBIMAT";
    document.querySelectorAll("[data-checkout]").forEach(a => {
      a.setAttribute("href", href);
      if (CHECKOUT_URL) {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener");
      }
    });
  }

  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    const status = document.getElementById("form-status");
    const submit = form.querySelector('button[type="submit"]');
    const t = window.AUBIMAT.t;

    if (!WEB3FORMS_KEY) {
      // Not connected yet — keep the layout, block submission, explain why.
      form.querySelectorAll("input, textarea, select, button").forEach(el => { el.disabled = true; });
      status.setAttribute("data-i18n", "form_pending");
      status.className = "text-sm text-amber-400 min-h-[1.5rem]";
      status.textContent = t("form_pending");
      return;
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const original = submit.textContent;
      submit.disabled = true;
      submit.textContent = t("form_sending");
      status.removeAttribute("data-i18n");
      status.textContent = "";

      try {
        const body = new FormData(form);
        body.append("access_key", WEB3FORMS_KEY);
        // Web3Forms uses `subject` as the email subject line, so build a readable
        // one from the selected topic instead of letting the raw slug through.
        const topic = form.querySelector("#topic");
        const label = topic.options[topic.selectedIndex].textContent.trim();
        body.append("subject", "AUBIMAT — " + label);
        body.append("from_name", form.querySelector("#name").value.trim() || "aubimat.com");
        const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || "submit failed");
        status.className = "text-sm text-emerald-400 min-h-[1.5rem]";
        status.textContent = t("form_ok");
        form.reset();
      } catch (err) {
        console.error("Contact form:", err);
        status.className = "text-sm text-red-400 min-h-[1.5rem]";
        status.textContent = t("form_err");
      } finally {
        submit.disabled = false;
        submit.textContent = original;
      }
    });
  }

  function initLinkedIn() {
    document.querySelectorAll("[data-linkedin]").forEach(a => {
      if (LINKEDIN_URL) {
        a.setAttribute("href", LINKEDIN_URL);
      } else {
        // No profile URL yet — keep the card, drop the dead link.
        a.removeAttribute("href");
        a.classList.add("cursor-default");
      }
    });
  }

  // -------------------------------------------------------------------------
  // Init
  // -------------------------------------------------------------------------
  window.AUBIMAT = window.AUBIMAT || {};
  window.AUBIMAT.onLanguageChange = renderTools;
  window.showSection = showSection;
  window.toggleMobileMenu = toggleMobileMenu;

  document.addEventListener("DOMContentLoaded", () => {
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    initCheckoutLinks();
    initLinkedIn();
    initConstellation();
    initContactForm();

    // setLanguage() calls renderTools() through onLanguageChange.
    window.AUBIMAT.setLanguage(window.AUBIMAT.initialLanguage());

    showSection(sectionFromHash(), false);
  });

  window.addEventListener("popstate", () => showSection(sectionFromHash(), false));
})();
