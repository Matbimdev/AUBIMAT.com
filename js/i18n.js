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
      hero_title: "I got tired of clicking.<br/><span class=\"text-transparent bg-clip-text bg-gradient-to-r from-brand-navy-light to-brand-cyan\">So I wrote AUBIMAT.</span>",
      hero_desc: "Ten Revit commands that take over the parts nobody enjoys — tracing ceilings on top of walls that are already drawn, redrawing a CAD plan that already has every wall in it, hunting the one pipe that crosses a beam. Each one exists because I needed it with a deadline on top of me.",
      hero_btn_tools: "See the ten tools",
      hero_btn_get: "Get AUBIMAT",
      hero_note: "$4.99 a month · works on Revit 2022 through 2026",

      // About
      about_badge: "Who's behind this",
      about_title: "A civil engineer who <span class=\"text-gray-400\">kept ending up in the code</span>",
      about_p1: "I'm Mateo Lopez, a civil engineer from Lima, Peru. I started out as a BIM coordinator on high-rises — a twelve-tower residential complex, a 22-storey building, over a million square feet of federated model to keep honest. That is where you learn exactly which parts of Revit eat your week.",
      about_p2: "So I started automating them. Dynamo first, fifty-odd scripts. Then Python and the Revit API, where I've shipped more than twenty-five tools that run daily on live projects and take 40 to 60% off the time each task used to cost.",
      about_p3: "AUBIMAT is what happens when those ideas get rewritten properly: from scratch in C#, straight against the Revit API, fast enough to run on a real model and stable across five Revit versions. <span class=\"text-white font-medium\">None of it is a demo.</span> Every command shipped because I needed it before a delivery date.",

      // Numbers
      stat1_num: "40 – 60%",
      stat1_desc: "less time on the tasks these tools cover, measured on live production projects.",
      stat2_num: "75+",
      stat2_desc: "automation tools and scripts shipped before AUBIMAT existed — this is what I do all day.",
      stat3_num: "1.3M ft²",
      stat3_desc: "of high-rise model coordinated as a BIM coordinator. I know what breaks once a project gets big.",

      // Developer card
      dev_badge: "The whole team",
      dev_title: "You're buying from <span class=\"text-gray-400\">one person</span>",
      dev_name: "Mateo Lopez",
      dev_role: "Civil Engineer · BIM Automation Specialist · Lima, Peru",
      dev_bio: "I write the code, I answer the emails, I fix the bugs. There is no support tier and no ticket queue — if AUBIMAT does something strange on your model, you are talking to the person who can go and change it.",
      dev_connect: "Mateo Lopez on LinkedIn",

      // Tools
      tools_badge: "What you get",
      tools_title: "Ten commands, <span class=\"text-brand-cyan\">five disciplines</span>",
      tools_desc: "All of it ships in one installer. No add-on packs, no per-tool licences — if it is on this page, it is in your ribbon.",
      disc_architecture: "Architecture",
      disc_structure: "Structure",
      disc_mep: "MEP",
      disc_quality: "Quality Control",
      disc_views: "Views",

      // Pricing
      price_badge: "Pricing",
      price_title: "One price. <span class=\"text-brand-cyan\">No asterisks.</span>",
      price_desc: "No per-tool licences, no upgrade fee when Revit 2027 turns up, and a seat you can move to a new laptop yourself.",
      price_plan: "AUBIMAT — everything included",
      price_period: "/month",
      price_sub: "All ten tools. Every supported Revit version. Every update.",
      price_f1: "All 10 tools — Architecture, Structure, MEP, QC and Views",
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
      subj_general: "Just a question",
      subj_custom: "A custom tool for my office",
      subj_licence: "Licence or billing",
      subj_bug: "Something is broken",
      form_message: "What are you stuck on?",
      form_send: "Send it",
      form_sending: "Sending…",
      form_ok: "✓ Got it. I'll reply shortly.",
      form_err: "That didn't go through. Email soporte@aubimat.com directly and I'll pick it up there.",
      form_pending: "The form isn't wired up yet — email soporte@aubimat.com in the meantime.",
      contact_direct: "Or skip the form",

      // Footer
      footer_tagline: "Revit automation, written in Lima, Peru — by a civil engineer who got tired of clicking.",
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
      hero_title: "Me cansé de hacer clic.<br/><span class=\"text-transparent bg-clip-text bg-gradient-to-r from-brand-navy-light to-brand-cyan\">Así que escribí AUBIMAT.</span>",
      hero_desc: "Diez comandos de Revit que se hacen cargo de lo que a nadie le gusta: trazar cielos rasos sobre muros que ya están dibujados, volver a dibujar un CAD que ya tiene todos los muros, cazar la única tubería que cruza una viga. Cada uno existe porque lo necesité con una entrega encima.",
      hero_btn_tools: "Ver las diez herramientas",
      hero_btn_get: "Obtener AUBIMAT",
      hero_note: "$4.99 al mes · funciona en Revit 2022 hasta 2026",

      // Sobre mí
      about_badge: "Quién está detrás",
      about_title: "Un ingeniero civil que <span class=\"text-gray-400\">siempre terminaba metido en el código</span>",
      about_p1: "Soy Mateo Lopez, ingeniero civil de Lima, Perú. Empecé como coordinador BIM en edificios altos: un complejo residencial de doce torres, un edificio de 22 pisos, más de un millón de pies cuadrados de modelo federado que mantener en orden. Ahí aprendes exactamente qué partes de Revit se te comen la semana.",
      about_p2: "Así que empecé a automatizarlas. Primero Dynamo, unos cincuenta scripts. Después Python y la API de Revit, donde llevo más de veinticinco herramientas corriendo a diario en proyectos reales, recortando entre 40 y 60% del tiempo que costaba cada tarea.",
      about_p3: "AUBIMAT es lo que pasa cuando esas ideas se reescriben en serio: desde cero en C#, directo contra la API de Revit, lo bastante rápidas para correr sobre un modelo real y estables en cinco versiones de Revit. <span class=\"text-white font-medium\">Aquí no hay nada de demostración.</span> Cada comando salió porque lo necesitaba antes de una entrega.",

      // Números
      stat1_num: "40 – 60%",
      stat1_desc: "menos tiempo en las tareas que cubren estas herramientas, medido en proyectos reales en producción.",
      stat2_num: "75+",
      stat2_desc: "herramientas y scripts de automatización publicados antes de que AUBIMAT existiera. A esto me dedico todo el día.",
      stat3_num: "1.3M pies²",
      stat3_desc: "de modelo de edificios altos coordinados como coordinador BIM. Sé qué se rompe cuando el proyecto crece.",

      // Tarjeta del desarrollador
      dev_badge: "El equipo completo",
      dev_title: "Le estás comprando a <span class=\"text-gray-400\">una sola persona</span>",
      dev_name: "Mateo Lopez",
      dev_role: "Ingeniero Civil · Especialista en automatización BIM · Lima, Perú",
      dev_bio: "Yo escribo el código, yo respondo los correos, yo arreglo los errores. No hay niveles de soporte ni cola de tickets: si AUBIMAT hace algo raro en tu modelo, estás hablando con la persona que puede ir a cambiarlo.",
      dev_connect: "Mateo Lopez en LinkedIn",

      // Herramientas
      tools_badge: "Qué te llevas",
      tools_title: "Diez comandos, <span class=\"text-brand-cyan\">cinco disciplinas</span>",
      tools_desc: "Todo viene en un solo instalador. Sin paquetes adicionales ni licencias por herramienta: si está en esta página, está en tu ribbon.",
      disc_architecture: "Arquitectura",
      disc_structure: "Estructuras",
      disc_mep: "MEP",
      disc_quality: "Control de calidad",
      disc_views: "Vistas",

      // Precios
      price_badge: "Precios",
      price_title: "Un precio. <span class=\"text-brand-cyan\">Sin asteriscos.</span>",
      price_desc: "Sin licencias por herramienta, sin volver a pagar cuando salga Revit 2027, y con una licencia que tú mismo mueves a otra laptop.",
      price_plan: "AUBIMAT — todo incluido",
      price_period: "/mes",
      price_sub: "Las diez herramientas. Todas las versiones de Revit compatibles. Todas las actualizaciones.",
      price_f1: "Las 10 herramientas — Arquitectura, Estructuras, MEP, Control de calidad y Vistas",
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
      subj_general: "Solo una pregunta",
      subj_custom: "Una herramienta a medida para mi oficina",
      subj_licence: "Licencia o facturación",
      subj_bug: "Algo está roto",
      form_message: "¿En qué te quedaste trabado?",
      form_send: "Enviar",
      form_sending: "Enviando…",
      form_ok: "✓ Recibido. Te respondo pronto.",
      form_err: "No se pudo enviar. Escribe directo a soporte@aubimat.com y lo tomo desde ahí.",
      form_pending: "El formulario aún no está conectado — mientras tanto, escribe a soporte@aubimat.com.",
      contact_direct: "O sáltate el formulario",

      // Pie
      footer_tagline: "Automatización de Revit, escrita en Lima, Perú — por un ingeniero civil que se cansó de hacer clic.",
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
