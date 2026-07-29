// ===================== AUBIMAT — internationalisation =====================
// Plain-object translation table. Every element carrying a `data-i18n="key"`
// attribute gets its innerHTML replaced from here. No library, no build step.
//
// Dynamic content (the tool cards) is NOT translated through data-i18n — the
// TOOLS array in app.js carries {en, es} per field and is re-rendered by
// setLanguage(). See renderTools().
(function () {
  "use strict";

  const DEFAULT_LANG = "en";
  const STORAGE_KEY = "aubimat_lang";

  const translations = {
    // ------------------------------------------------------------------ EN
    en: {
      // Navigation
      nav_home: "Home",
      nav_about: "About",
      nav_tools: "Tools",
      nav_pricing: "Pricing",
      nav_contact: "Contact",
      nav_cta: "Get AUBIMAT",

      // Hero
      hero_badge: "Revit 2022 → 2026 · one installer",
      hero_title: "Automate your modelling and <br/><span class=\"text-transparent bg-clip-text bg-gradient-to-r from-brand-navy-light to-brand-cyan\">raise your BIM productivity</span>",
      hero_desc: "I built AUBIMAT to speed up the workflows that eat the most time inside Revit: modelling, quality control and project management. Every tool came out of a real problem on a real project — and if your office needs something that isn't in the catalogue, I build custom tools too.",
      hero_btn_tools: "Explore the catalogue",
      hero_btn_get: "Get AUBIMAT",
      hero_note: "$4.99 a month · works on Revit 2022 through 2026",

      // About
      about_badge: "Who's behind this",
      about_title: "A civil engineer who <span class=\"text-gray-400\">kept ending up in the code</span>",
      about_p1: "I'm Mateo Lopez, a civil engineer from Lima, Peru. I started out as a BIM coordinator on high-rises — a twelve-tower residential complex, a 22-storey building, over a million square feet of federated model to keep honest. That is where you learn exactly which parts of Revit eat your week.",
      about_p2: "So I started automating them. Dynamo first, fifty-odd scripts. Then Python and the Revit API, where I've shipped more than twenty-five tools that run daily on live projects and take 40 to 60% off the time each task used to cost.",
      about_p3: "AUBIMAT is what happens when those ideas get rewritten properly: from scratch in C#, straight against the Revit API, fast enough to run on a real model and stable across five Revit versions. And when an office needs something the catalogue doesn't cover yet, <span class=\"text-white font-medium\">I build it to measure.</span>",

      // Numbers
      stat1_num: "40 – 60%",
      stat1_desc: "less time on the tasks these tools cover, measured on live production projects.",
      stat2_num: "75+",
      stat2_desc: "automation tools and scripts shipped before AUBIMAT existed — this is what I do all day.",
      stat3_num: "1.3M ft²",
      stat3_desc: "of high-rise model coordinated as a BIM coordinator. I know what breaks once a project gets big.",

      // Developer card
      dev_badge: "My commitment",
      dev_title: "Here to make your team <span class=\"text-gray-400\">faster</span>",
      dev_name: "Mateo Lopez",
      dev_role: "Civil Engineer · BIM Automation Specialist · Lima, Peru",
      dev_bio: "My work is making BIM processes stop eating your day. Every AUBIMAT release comes out of listening to where people actually get stuck, and the commitment is simple: the catalogue keeps growing, the tools keep raising your productivity project after project, and you get a direct answer whenever you need one.",
      dev_connect: "Mateo Lopez on LinkedIn",

      // Tools
      tools_badge: "The catalogue",
      tools_title: "Tools for <span class=\"text-brand-cyan\">every discipline</span>",
      tools_desc: "Architecture, structure, MEP, quality control and views. All of it ships in one installer — no add-on packs, no per-tool licences.",
      disc_architecture: "Architecture",
      disc_structure: "Structure",
      disc_mep: "MEP",
      disc_quality: "Quality Control",
      disc_views: "Views",

      // Pricing
      price_badge: "Pricing",
      price_title: "The whole catalogue, <span class=\"text-brand-cyan\">one price</span>",
      price_desc: "My best tools for every discipline, at the best price. No per-tool licences and nothing more to pay when a new Revit version lands.",
      price_plan: "AUBIMAT — full catalogue",
      price_period: "/month",
      price_sub: "Every tool in the catalogue, across every discipline.",
      price_f1: "The whole catalogue — Architecture, Structure, MEP, QC and Views",
      price_f2: "Revit 2022, 2023, 2024, 2025 and 2026",
      price_f3: "One installer that finds your versions and deploys to each",
      price_f4: "New tools land in your ribbon at no extra cost",
      price_f5: "One machine at a time — move the licence whenever you change laptop",
      price_cta: "Get AUBIMAT",
      price_fineprint: "Cancel any month from your own account. Licence keys are issued and validated by Lemon Squeezy.",
      lemon_title: "I never see your card",
      lemon_desc: "Checkout, invoices and licence keys all go through <strong class=\"text-white\">Lemon Squeezy</strong>, a Merchant of Record. They take the payment and deal with the tax; AUBIMAT only ever receives a licence key to validate.",
      lemon_b1: "PCI-DSS compliant checkout — not mine to get wrong",
      lemon_b2: "Card, PayPal and local payment methods",
      lemon_b3: "Invoices and VAT handled for you",

      // Contact
      contact_badge: "Contact",
      contact_title: "Write to <span class=\"text-brand-cyan\">me</span>",
      contact_desc: "A bug, a licence that will not activate, or a tool you wish existed for your office. It goes straight to my inbox and I read all of it.",
      form_name: "Your name",
      form_email: "Your email",
      subj_general: "Questions about AUBIMAT",
      subj_custom: "Custom add-in or automation development",
      subj_enterprise: "Licensing for a company",
      subj_collab: "Collaboration — interview, talk or partnership",
      subj_other: "Something else",
      form_message: "What are you stuck on?",
      form_send: "Send it",
      form_sending: "Sending…",
      form_ok: "✓ Got it. I'll reply shortly.",
      form_err: "That didn't go through. Email soporte@aubimat.com directly and I'll pick it up there.",
      form_pending: "The form isn't wired up yet — email soporte@aubimat.com in the meantime.",
      contact_direct: "Or skip the form",

      // Footer
      footer_tagline: "Revit automation for modelling, quality control and BIM management. Written in Lima, Peru.",
      footer_rights: "All rights reserved.",
      footer_tools: "Tools",
      footer_pricing: "Pricing",
      footer_contact: "Contact"
    },

    // ------------------------------------------------------------------ ES
    es: {
      // Navegación
      nav_home: "Inicio",
      nav_about: "Sobre mí",
      nav_tools: "Herramientas",
      nav_pricing: "Precios",
      nav_contact: "Contacto",
      nav_cta: "Obtener AUBIMAT",

      // Hero
      hero_badge: "Revit 2022 → 2026 · un solo instalador",
      hero_title: "Automatiza tu modelado y <br/><span class=\"text-transparent bg-clip-text bg-gradient-to-r from-brand-navy-light to-brand-cyan\">eleva tu productividad BIM</span>",
      hero_desc: "Desarrollé AUBIMAT para acelerar los flujos que más tiempo consumen dentro de Revit: modelado, control de calidad y gestión del proyecto. Cada herramienta nació de un problema real en un proyecto real — y si tu oficina necesita algo que no está en el catálogo, también desarrollo herramientas a medida.",
      hero_btn_tools: "Ver el catálogo",
      hero_btn_get: "Obtener AUBIMAT",
      hero_note: "$4.99 al mes · funciona en Revit 2022 hasta 2026",

      // Sobre mí
      about_badge: "Quién está detrás",
      about_title: "Un ingeniero civil que <span class=\"text-gray-400\">siempre terminaba metido en el código</span>",
      about_p1: "Soy Mateo Lopez, ingeniero civil de Lima, Perú. Empecé como coordinador BIM en edificios altos: un complejo residencial de doce torres, un edificio de 22 pisos, más de un millón de pies cuadrados de modelo federado que mantener en orden. Ahí aprendes exactamente qué partes de Revit se te comen la semana.",
      about_p2: "Así que empecé a automatizarlas. Primero Dynamo, unos cincuenta scripts. Después Python y la API de Revit, donde llevo más de veinticinco herramientas corriendo a diario en proyectos reales, recortando entre 40 y 60% del tiempo que costaba cada tarea.",
      about_p3: "AUBIMAT es lo que pasa cuando esas ideas se reescriben en serio: desde cero en C#, directo contra la API de Revit, lo bastante rápidas para correr sobre un modelo real y estables en cinco versiones de Revit. Y cuando una oficina necesita algo que el catálogo todavía no cubre, <span class=\"text-white font-medium\">lo desarrollo a medida.</span>",

      // Números
      stat1_num: "40 – 60%",
      stat1_desc: "menos tiempo en las tareas que cubren estas herramientas, medido en proyectos reales en producción.",
      stat2_num: "75+",
      stat2_desc: "herramientas y scripts de automatización publicados antes de que AUBIMAT existiera. A esto me dedico todo el día.",
      stat3_num: "1.3M pies²",
      stat3_desc: "de modelo de edificios altos coordinados como coordinador BIM. Sé qué se rompe cuando el proyecto crece.",

      // Tarjeta del desarrollador
      dev_badge: "Mi compromiso",
      dev_title: "Aquí para que tu equipo <span class=\"text-gray-400\">rinda más</span>",
      dev_name: "Mateo Lopez",
      dev_role: "Ingeniero Civil · Especialista en automatización BIM · Lima, Perú",
      dev_bio: "Mi trabajo es que los procesos BIM dejen de consumirte el día. Cada versión de AUBIMAT sale de escuchar dónde se traba realmente la gente, y el compromiso es simple: el catálogo sigue creciendo, las herramientas siguen elevando tu productividad proyecto tras proyecto, y tienes respuesta directa cuando la necesites.",
      dev_connect: "Mateo Lopez en LinkedIn",

      // Herramientas
      tools_badge: "El catálogo",
      tools_title: "Herramientas para <span class=\"text-brand-cyan\">cada disciplina</span>",
      tools_desc: "Arquitectura, estructuras, MEP, control de calidad y vistas. Todo viene en un solo instalador: sin paquetes adicionales ni licencias por herramienta.",
      disc_architecture: "Arquitectura",
      disc_structure: "Estructuras",
      disc_mep: "MEP",
      disc_quality: "Control de calidad",
      disc_views: "Vistas",

      // Precios
      price_badge: "Precios",
      price_title: "Todo el catálogo, <span class=\"text-brand-cyan\">un solo precio</span>",
      price_desc: "Mis mejores herramientas para cada disciplina, al mejor precio. Sin licencias por herramienta y sin volver a pagar cuando salga una nueva versión de Revit.",
      price_plan: "AUBIMAT — catálogo completo",
      price_period: "/mes",
      price_sub: "Todas las herramientas del catálogo, en todas las disciplinas.",
      price_f1: "Todo el catálogo — Arquitectura, Estructuras, MEP, Control de calidad y Vistas",
      price_f2: "Revit 2022, 2023, 2024, 2025 y 2026",
      price_f3: "Un instalador que detecta tus versiones y se instala en cada una",
      price_f4: "Las herramientas nuevas aparecen en tu ribbon sin costo extra",
      price_f5: "Un equipo a la vez — mueve la licencia cuando cambies de laptop",
      price_cta: "Obtener AUBIMAT",
      price_fineprint: "Cancela cualquier mes desde tu propia cuenta. Las claves de licencia las emite y valida Lemon Squeezy.",
      lemon_title: "Nunca veo tu tarjeta",
      lemon_desc: "El pago, las facturas y las claves de licencia pasan por <strong class=\"text-white\">Lemon Squeezy</strong>, un Merchant of Record. Ellos cobran y se encargan de los impuestos; AUBIMAT solo recibe una clave de licencia para validar.",
      lemon_b1: "Pasarela con cumplimiento PCI-DSS, no es mía para equivocarme",
      lemon_b2: "Tarjeta, PayPal y métodos de pago locales",
      lemon_b3: "Facturas e impuestos resueltos por ellos",

      // Contacto
      contact_badge: "Contacto",
      contact_title: "Escríbeme",
      contact_desc: "Un error, una licencia que no activa, o una herramienta que te gustaría que existiera para tu oficina. Llega directo a mi bandeja y lo leo todo.",
      form_name: "Tu nombre",
      form_email: "Tu correo",
      subj_general: "Dudas sobre AUBIMAT",
      subj_custom: "Desarrollo a medida: add-in o automatización",
      subj_enterprise: "Implementación de licencias para mi empresa",
      subj_collab: "Colaboración: entrevista, conferencia o alianza",
      subj_other: "Otros",
      form_message: "¿En qué te quedaste trabado?",
      form_send: "Enviar",
      form_sending: "Enviando…",
      form_ok: "✓ Recibido. Te respondo pronto.",
      form_err: "No se pudo enviar. Escribe directo a soporte@aubimat.com y lo tomo desde ahí.",
      form_pending: "El formulario aún no está conectado — mientras tanto, escribe a soporte@aubimat.com.",
      contact_direct: "O sáltate el formulario",

      // Pie
      footer_tagline: "Automatización de Revit para modelado, control de calidad y gestión BIM. Escrita en Lima, Perú.",
      footer_rights: "Todos los derechos reservados.",
      footer_tools: "Herramientas",
      footer_pricing: "Precios",
      footer_contact: "Contacto"
    }
  };

  let currentLang = DEFAULT_LANG;

  /** Returns a translated string for the active language, or the key itself. */
  function t(key, lang) {
    const table = translations[lang || currentLang] || translations[DEFAULT_LANG];
    return table[key] !== undefined ? table[key] : key;
  }

  /**
   * Applies a language across the whole document.
   * Every [data-i18n] element is rewritten, then the dynamic tool cards are
   * re-rendered by app.js through the AUBIMAT.onLanguageChange hook.
   */
  function setLanguage(lang) {
    if (!translations[lang]) lang = DEFAULT_LANG;
    currentLang = lang;

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode */ }
    document.documentElement.lang = lang;

    // Highlight the active language button (desktop + mobile)
    Object.keys(translations).forEach(code => {
      ["btn-" + code, "btn-" + code + "-mob"].forEach(id => {
        const btn = document.getElementById(id);
        if (!btn) return;
        const active = code === lang;
        btn.style.opacity = active ? "1" : "0.5";
        btn.classList.toggle("text-brand-cyan", active);
      });
    });

    // Static content
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const value = translations[lang][el.getAttribute("data-i18n")];
      if (value === undefined) return;
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        if (el.type === "submit") el.value = value;
        else el.placeholder = value;
      } else if (el.tagName === "OPTION") {
        el.textContent = value;
      } else {
        el.innerHTML = value;
      }
    });

    // Dynamic content (tool cards) — app.js registers the callback
    if (typeof window.AUBIMAT.onLanguageChange === "function") {
      window.AUBIMAT.onLanguageChange(lang);
    }
  }

  /**
   * The visitor's own previous choice wins; otherwise English.
   * Deliberately NOT sniffing navigator.language — the page ships in English
   * (<html lang="en">, English meta description) and should stay consistent
   * with what search engines index until the visitor picks otherwise.
   */
  function initialLanguage() {
    let stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* private mode */ }
    return stored && translations[stored] ? stored : DEFAULT_LANG;
  }

  // Public surface — app.js and the inline onclick handlers use this.
  window.AUBIMAT = window.AUBIMAT || {};
  window.AUBIMAT.t = t;
  window.AUBIMAT.setLanguage = setLanguage;
  window.AUBIMAT.initialLanguage = initialLanguage;
  window.AUBIMAT.getLanguage = () => currentLang;

  // Global alias so the markup can use onclick="setLanguage('es')"
  window.setLanguage = setLanguage;
})();
