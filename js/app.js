// ===================== AUBIMAT landing — app logic =====================
(function () {
  "use strict";

  // ---------- Tool catalogue (source: AUBIMAT Tooltips.resx) ----------
  const TOOLS = [
    { name: "Ceiling Wall",    disc: "Architecture",     icon: "ceilingWall_ceilingWall",
      desc: "Creates ceilings automatically from selected walls and vertical structure, locked to the walls." },
    { name: "Floor Wall",      disc: "Architecture",     icon: "floorWall_floorWall",
      desc: "Creates floors automatically from selected walls and vertical structure, locked to the walls." },
    { name: "Finish Wall",     disc: "Architecture",     icon: "finishWall_finishWall",
      desc: "Creates finish walls flush against the interior face of selected host walls." },
    { name: "Wall CAD",        disc: "Architecture",     icon: "wallFromCAD_wallFromCAD",
      desc: "Generates walls from CAD footprints — runs, L-corners, T-junctions and crossings." },
    { name: "Move Sections",   disc: "Views",            icon: "moveSections_moveSections",
      desc: "Moves all section markers in the active plan view onto a selected element." },
    { name: "Column CAD",      disc: "Structure",        icon: "columnFromCAD_columnFromCAD",
      desc: "Generates structural columns from rectangles, circles or L-shapes on a CAD layer." },
    { name: "Clash Detector",  disc: "Quality Control",  icon: "clashDetector_clashDetector",
      desc: "Finds geometric interferences between host and linked categories, with an interactive browser." },
    { name: "Level Fixer",     disc: "Quality Control",  icon: "levelFixer_levelFixer",
      desc: "Finds elements whose assigned level disagrees with their real Z position and fixes them." },
    { name: "Pipes CAD",       disc: "MEP",              icon: "pipesCAD_pipesCAD",
      desc: "Creates fire-protection collector piping from CAD linework, with automatic fittings." },
    { name: "Sprinkler CAD",   disc: "MEP",              icon: "sprinklerCAD_sprinklerCAD",
      desc: "Places sprinklers from CAD circle symbols and connects them to collector piping." }
  ];

  function renderTools() {
    const grid = document.getElementById("tools-grid");
    if (!grid) return;
    grid.innerHTML = TOOLS.map(t => `
      <article class="tool-card">
        <div class="icon"><img src="assets/icons/${t.icon}.png" alt="" loading="lazy" /></div>
        <span class="disc">${t.disc}</span>
        <h3>${t.name}</h3>
        <p>${t.desc}</p>
      </article>`).join("");
  }

  // ---------- Footer year ----------
  function setYear() {
    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  // ---------- Auth tab switching ----------
  function initTabs() {
    const tabs = document.querySelectorAll(".auth-tab");
    const forms = {
      register: document.getElementById("register-form"),
      login: document.getElementById("login-form")
    };
    function show(tab) {
      tabs.forEach(t => t.classList.toggle("is-active", t.dataset.tab === tab));
      forms.register.classList.toggle("is-hidden", tab !== "register");
      forms.login.classList.toggle("is-hidden", tab !== "login");
    }
    tabs.forEach(t => t.addEventListener("click", () => show(t.dataset.tab)));
    document.querySelectorAll("[data-auth-tab]").forEach(el =>
      el.addEventListener("click", () => show(el.dataset.authTab)));
  }

  // ---------- Supabase ----------
  function getClient() {
    const cfg = window.AUBIMAT_CONFIG || {};
    const configured = cfg.SUPABASE_URL && !cfg.SUPABASE_URL.includes("YOUR-PROJECT") &&
                       cfg.SUPABASE_ANON_KEY && !cfg.SUPABASE_ANON_KEY.includes("YOUR-ANON");
    if (!configured) return null;
    if (!window.supabase || !window.supabase.createClient) return null;
    return window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
  }

  function msg(el, text, kind) {
    el.textContent = text;
    el.className = "auth-msg" + (kind ? " " + kind : "");
  }

  function initAuth(sb) {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    const panel = document.getElementById("account-panel");
    const registerMsg = document.getElementById("register-msg");
    const loginMsg = document.getElementById("login-msg");

    if (!sb) {
      msg(registerMsg, "⚠ Supabase is not configured yet. Fill js/config.js.", "err");
      return;
    }

    // Register
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const f = new FormData(registerForm);
      if (f.get("password") !== f.get("password2")) {
        return msg(registerMsg, "Passwords do not match.", "err");
      }
      msg(registerMsg, "Creating your account…", "");
      const { error } = await sb.auth.signUp({
        email: String(f.get("email")).trim(),
        password: String(f.get("password")),
        options: {
          data: {
            first_name: String(f.get("first_name")).trim(),
            last_name: String(f.get("last_name")).trim(),
            company: String(f.get("company") || "").trim()
          }
        }
      });
      if (error) return msg(registerMsg, error.message, "err");
      msg(registerMsg, "✓ Account created. If email confirmation is on, check your inbox, then sign in.", "ok");
      registerForm.reset();
    });

    // Login
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const f = new FormData(loginForm);
      msg(loginMsg, "Signing in…", "");
      const { error } = await sb.auth.signInWithPassword({
        email: String(f.get("email")).trim(),
        password: String(f.get("password"))
      });
      if (error) return msg(loginMsg, error.message, "err");
      msg(loginMsg, "", "");
      await showAccount(sb);
    });

    // Sign out
    document.getElementById("signout-btn").addEventListener("click", async () => {
      await sb.auth.signOut();
      panel.classList.add("is-hidden");
      registerForm.classList.remove("is-hidden");
      document.querySelector('.auth-tab[data-tab="register"]').click();
    });

    // Restore session on load
    showAccount(sb);
  }

  async function showAccount(sb) {
    const { data: { session } } = await sb.auth.getSession();
    const panel = document.getElementById("account-panel");
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    const tabs = document.querySelector(".auth-tabs");
    if (!session) return;

    // Fetch the profile (RLS restricts this to the current user's own row)
    let status = "trial";
    const { data: profile } = await sb.from("profiles")
      .select("license_status").eq("id", session.user.id).single();
    if (profile && profile.license_status) status = profile.license_status;

    document.getElementById("ap-email").textContent = session.user.email;
    document.getElementById("ap-status").textContent = status;
    registerForm.classList.add("is-hidden");
    loginForm.classList.add("is-hidden");
    if (tabs) tabs.classList.add("is-hidden");
    panel.classList.remove("is-hidden");
  }

  // ---------- Init ----------
  document.addEventListener("DOMContentLoaded", () => {
    renderTools();
    setYear();

    // The account section is hidden in index.html while the licensing flow is
    // being decided. Skipping init is all that disables it — the handlers above
    // stay intact and run again as soon as the section is unhidden.
    const account = document.getElementById("account");
    if (account && !account.hidden) {
      initTabs();
      initAuth(getClient());
    }
  });
})();
