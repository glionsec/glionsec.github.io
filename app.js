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
      aboutLabel: "自己紹介",
      qualifications: "資格",
      qualificationsLabel: "資格",
      social: "SNS",
      socialLabel: "SNS",
      bio1: "CSIRT、ペネトレーションテスト、CTIに並行して携わっています。",
      bio2: "脆弱性調査やActive Directory環境の検証、脅威情報の分析で得た知見を行き来させながら、攻撃と防御の両面から課題を捉えています。",
      bio3: "攻撃の再現を検知・改善につなげるパープルチーミングを志向し、HTBなどの演習環境でも検証を重ねています。",
      focusLabel: "関心領域",
      focus1Title: "CSIRT / CTI",
      focus1Text: "対応で得た知見と脅威情報を検証に生かす",
      focus2Title: "AD / PENTEST",
      focus2Text: "Windows環境の攻撃経路を調べる",
      focus3Title: "PURPLE TEAMING",
      focus3Text: "攻撃再現を検知と改善につなげる",
      credential1: "安全確保支援士（合格のみ）",
      appearance: "表示",
      dark: "黒",
      light: "白",
      language: "言語",
      navigation: "ページ内の移動",
      preferences: "表示設定",
      themeGroup: "配色",
      languageGroup: "言語",
      socialList: "SNSリンク"
    },
    en: {
      title: "ぐり | Security Engineer",
      description: "Profile and certifications of ぐり, a security engineer.",
      skip: "Skip to content",
      role: "Security Engineer",
      about: "About",
      aboutLabel: "About",
      qualifications: "Certifications",
      qualificationsLabel: "Qualifications",
      social: "Social",
      socialLabel: "Social",
      bio1: "I work across CSIRT, penetration testing, and cyber threat intelligence in parallel.",
      bio2: "I connect insights from vulnerability research, Active Directory testing, and threat intelligence to examine security from both offensive and defensive perspectives.",
      bio3: "I aim to practice purple teaming that turns attack simulations into better detection and defenses, while continuing to test ideas in labs such as Hack The Box.",
      focusLabel: "Focus Areas",
      focus1Title: "CSIRT / CTI",
      focus1Text: "Bring incident response insights and threat intelligence into testing",
      focus2Title: "AD / PENTEST",
      focus2Text: "Explore attack paths in Windows environments",
      focus3Title: "PURPLE TEAMING",
      focus3Text: "Connect attack simulation with detection and improvement",
      credential1: "Registered Information Security Specialist exam (passed; not registered)",
      appearance: "Theme",
      dark: "Dark",
      light: "Light",
      language: "Language",
      navigation: "On this page",
      preferences: "Display preferences",
      themeGroup: "Color theme",
      languageGroup: "Language",
      socialList: "Social links"
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
    const position = window.scrollY + window.innerHeight * 0.2;
    let activeIndex = -1;
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
