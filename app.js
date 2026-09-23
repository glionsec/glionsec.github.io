(() => {
  const storageKeyTheme = "guri-theme";
  const storageKeyLanguage = "guri-language";
  const storageKeySidebar = "guri-sidebar";
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
      bio1: "CSIRT、ペネトレーションテスト、スレットインテリジェンスに携わっています。脅威情報やインシデント対応で得た知見をもとに、攻撃と防御の両面から課題に取り組んでいます。",
      bio2: "現在はレッドチーミングに軸足を移し、EDR回避を含む攻撃手法の再現に取り組んでいます。",
      bio3: "これまでの経験を生かし、攻撃側の検証結果を検知・対応の改善につなげるパープルチーミングにも取り組んでいきたいと考えています。",
      focusLabel: "関心領域",
      focus1Title: "CSIRT / CTI",
      focus1Text: "インシデント対応と脅威情報を検証に生かす",
      focus2Title: "PENETRATION TESTING / RED TEAMING",
      focus2Text: "幅広い対象を調べ、高度な攻撃再現に取り組む",
      focus3Title: "PURPLE TEAMING",
      focus3Text: "攻撃側の発見を検知・対応の改善につなげる",
      credential1: "安全確保支援士（合格のみ）",
      expired: "（期限切れ）",
      appearance: "表示",
      dark: "黒",
      light: "白",
      language: "言語",
      navigation: "ページ内の移動",
      preferences: "表示設定",
      themeGroup: "配色",
      languageGroup: "言語",
      socialList: "SNSリンク",
      collapseSidebar: "サイドバーを折りたたむ",
      expandSidebar: "サイドバーを開く",
      switchToLight: "白テーマに切り替える",
      switchToDark: "黒テーマに切り替える",
      switchToEnglish: "英語に切り替える",
      switchToJapanese: "日本語に切り替える"
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
      bio1: "I work in CSIRT, penetration testing, and threat intelligence. Drawing on threat intelligence and lessons from incident response, I tackle security challenges from both offensive and defensive perspectives.",
      bio2: "I am currently shifting my focus toward red teaming and working to reproduce attacker techniques, including EDR evasion.",
      bio3: "I want to use my experience to connect the results of offensive testing to improvements in detection and response through purple teaming.",
      focusLabel: "Focus Areas",
      focus1Title: "CSIRT / CTI",
      focus1Text: "Use incident response and threat intelligence to guide testing",
      focus2Title: "PENETRATION TESTING / RED TEAMING",
      focus2Text: "Assess a broad range of targets and develop advanced attack simulation skills",
      focus3Title: "PURPLE TEAMING",
      focus3Text: "Turn offensive findings into improvements in detection and response",
      credential1: "Registered Information Security Specialist exam (passed; not registered)",
      expired: "(Expired)",
      appearance: "Theme",
      dark: "Dark",
      light: "Light",
      language: "Language",
      navigation: "On this page",
      preferences: "Display preferences",
      themeGroup: "Color theme",
      languageGroup: "Language",
      socialList: "Social links",
      collapseSidebar: "Collapse sidebar",
      expandSidebar: "Expand sidebar",
      switchToLight: "Switch to light theme",
      switchToDark: "Switch to dark theme",
      switchToEnglish: "Switch to English",
      switchToJapanese: "Switch to Japanese"
    }
  };

  const stored = (key) => {
    try { return localStorage.getItem(key); } catch { return null; }
  };
  const remember = (key, value) => {
    try { localStorage.setItem(key, value); } catch { /* Browsing still works without storage. */ }
  };

  const sidebarToggle = document.querySelector("[data-sidebar-toggle]");
  const compactTheme = document.querySelector("[data-compact-theme]");
  const compactLanguage = document.querySelector("[data-compact-language]");
  const themeIconPath = compactTheme.querySelector("[data-theme-icon-path]");
  const sunIcon = "M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4";
  const moonIcon = "M20.5 14.1A8.5 8.5 0 0 1 9.9 3.5 8.5 8.5 0 1 0 20.5 14.1Z";
  const compactControls = document.querySelector(".sidebar__compact-controls");
  const expandedControls = document.querySelector(".sidebar__bottom");
  const syncCompactControls = () => {
    const translated = copy[document.documentElement.lang] || copy.ja;
    const themeLabel = document.documentElement.dataset.theme === "light" ? translated.switchToDark : translated.switchToLight;
    const languageLabel = document.documentElement.lang === "en" ? translated.switchToJapanese : translated.switchToEnglish;
    compactTheme.setAttribute("aria-label", themeLabel);
    compactTheme.title = themeLabel;
    compactLanguage.setAttribute("aria-label", languageLabel);
    compactLanguage.title = languageLabel;
  };
  const syncSidebarToggle = () => {
    const expanded = document.documentElement.dataset.sidebar !== "collapsed";
    const translated = copy[document.documentElement.lang] || copy.ja;
    const label = expanded ? translated.collapseSidebar : translated.expandSidebar;
    sidebarToggle.setAttribute("aria-expanded", String(expanded));
    sidebarToggle.setAttribute("aria-label", label);
    sidebarToggle.title = label;
  };
  const applySidebar = (expanded) => {
    document.documentElement.dataset.sidebar = expanded ? "expanded" : "collapsed";
    compactControls.hidden = expanded;
    expandedControls.hidden = !expanded;
    syncSidebarToggle();
    remember(storageKeySidebar, document.documentElement.dataset.sidebar);
  };

  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    themeIconPath.setAttribute("d", theme === "light" ? moonIcon : sunIcon);
    document.querySelectorAll("[data-theme-choice]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.themeChoice === theme));
    });
    document.querySelector('meta[name="theme-color"]').content = theme === "light" ? "#e7eeec" : "#0b151d";
    syncCompactControls();
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
    syncSidebarToggle();
    syncCompactControls();
    remember(storageKeyLanguage, language);
  };

  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.addEventListener("click", () => applyTheme(button.dataset.themeChoice));
  });
  document.querySelectorAll("[data-lang-choice]").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.langChoice));
  });
  compactTheme.addEventListener("click", () => {
    applyTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light");
  });
  compactLanguage.addEventListener("click", () => {
    applyLanguage(document.documentElement.lang === "en" ? "ja" : "en");
  });
  sidebarToggle.addEventListener("click", () => {
    applySidebar(document.documentElement.dataset.sidebar === "collapsed");
  });

  applyTheme(stored(storageKeyTheme) === "light" ? "light" : "dark");
  applyLanguage(stored(storageKeyLanguage) === "en" ? "en" : "ja");
  applySidebar(stored(storageKeySidebar) !== "collapsed");

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
