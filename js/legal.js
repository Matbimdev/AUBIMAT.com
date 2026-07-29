// ===================== AUBIMAT legal pages — language switch =====================
// The landing page translates through data-i18n keys in js/i18n.js. That does not
// scale to legal prose, so each legal page ships both languages in the markup —
// <div data-lang="en"> and <div data-lang="es"> — and this file shows one of them.
//
// The choice is stored under the same localStorage key the landing page uses, so
// a visitor who picked Spanish there lands on Spanish legal text too.
(function () {
  "use strict";

  const STORAGE_KEY = "aubimat_lang";
  const DEFAULT_LANG = "en";
  const LANGS = ["en", "es"];

  function setLanguage(lang) {
    if (!LANGS.includes(lang)) lang = DEFAULT_LANG;

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode */ }
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-lang]").forEach(el => {
      el.hidden = el.getAttribute("data-lang") !== lang;
    });

    LANGS.forEach(code => {
      ["btn-" + code, "btn-" + code + "-mob"].forEach(id => {
        const btn = document.getElementById(id);
        if (!btn) return;
        const active = code === lang;
        btn.style.opacity = active ? "1" : "0.5";
        btn.classList.toggle("text-brand-cyan", active);
      });
    });

    // The document <title> carries both languages too.
    const title = document.querySelector("[data-title-" + lang + "]");
    if (title) document.title = title.getAttribute("data-title-" + lang);
  }

  function initialLanguage() {
    let stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* private mode */ }
    return LANGS.includes(stored) ? stored : DEFAULT_LANG;
  }

  document.addEventListener("DOMContentLoaded", () => {
    setLanguage(initialLanguage());

    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  });

  window.setLanguage = setLanguage;
})();
