(() => {
  const storageKeyTheme = "guri-theme";
  const storageKeyLanguage = "guri-language";
  const copy = {
    ja: {
      title: "ぐり | セキュリティエンジニア",
      description: "ぐりのセキュリティエンジニアとしてのプロフィールと資格。",
      skip: "本文へ移動",
      role: "セキュリティエンジニア",
      about: "自己紹介",
      qualifications: "資格",
      social: "SNS",
      bio1: "脆弱性調査を中心に実務をしてきました",
      bio2: "今は主にAD環境へのペネトレーションテストを実施しています",
      bio3: "HTBを中心に技術を身に着けているところです",
      credential1: "安全確保支援士（合格のみ）",
      appearance: "表示",
      dark: "黒",
      light: "白",
      language: "言語",
      navigation: "ページ内の移動",
      preferences: "表示設定",
      themeGroup: "配色",
      languageGroup: "言語",
      socialList: "SNS（リンク未設定）"
    },
    en: {
      title: "ぐり | Security Engineer",
      description: "Profile and certifications of ぐり, a security engineer.",
      skip: "Skip to content",
      role: "Security Engineer",
      about: "About",
      qualifications: "Certifications",
      social: "Social",
      bio1: "My professional work has focused on vulnerability research.",
      bio2: "I currently conduct penetration tests of Active Directory environments.",
      bio3: "I continue to build my skills primarily through Hack The Box.",
      credential1: "Registered Information Security Specialist exam (passed; not registered)",
      appearance: "Theme",
      dark: "Dark",
      light: "Light",
      language: "Language",
      navigation: "On this page",
      preferences: "Display preferences",
      themeGroup: "Color theme",
      languageGroup: "Language",
      socialList: "Social platforms (links not set)"
    }
  };

  const stored = (key) => {
    try { return localStorage.getItem(key); } catch { return null; }
  };
  const remember = (key, value) => {
    try { localStorage.setItem(key, value); } catch { /* Browsing still works without storage. */ }
  };

  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll("[data-theme-choice]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.themeChoice === theme));
    });
    document.querySelector('meta[name="theme-color"]').content = theme === "light" ? "#e7eeec" : "#0b151d";
    remember(storageKeyTheme, theme);
  };

  const applyLanguage = (language) => {
    const translated = copy[language];
    document.documentElement.lang = language;
    document.title = translated.title;
    document.querySelector('meta[name="description"]').content = translated.description;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = translated[element.dataset.i18n];
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      element.setAttribute("aria-label", translated[element.dataset.i18nAria]);
    });
    document.querySelectorAll("[data-i18n-group]").forEach((element) => {
      element.setAttribute("aria-label", translated[element.dataset.i18nGroup]);
    });
    document.querySelectorAll("[data-lang-choice]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.langChoice === language));
    });
    remember(storageKeyLanguage, language);
  };

  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.addEventListener("click", () => applyTheme(button.dataset.themeChoice));
  });
  document.querySelectorAll("[data-lang-choice]").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.langChoice));
  });

  applyTheme(stored(storageKeyTheme) === "light" ? "light" : "dark");
  applyLanguage(stored(storageKeyLanguage) === "en" ? "en" : "ja");

  const links = Array.from(document.querySelectorAll(".nav-link"));
  const sections = links.map((link) => document.querySelector(link.getAttribute("href")));
  let scheduled = false;
  const updateActiveSection = () => {
    const position = window.scrollY + window.innerHeight * 0.35;
    let activeIndex = 0;
    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top + window.scrollY <= position) activeIndex = index;
    });
    links.forEach((link, index) => {
      const active = index === activeIndex;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    scheduled = false;
  };

  window.addEventListener("scroll", () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateActiveSection);
    }
  }, { passive: true });
  window.addEventListener("resize", updateActiveSection);
  window.addEventListener("hashchange", () => requestAnimationFrame(updateActiveSection));
  updateActiveSection();
})();
