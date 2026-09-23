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
      bio1: "CSIRT、ペネトレーションテスト、CTIに並行して携わっています。",
      bio2: "ペネトレーションテストでは幅広い対象のリスクを検証し、CSIRTとCTIの視点も交えて攻撃と防御の両面から課題を捉えています。",
      bio3: "現在は高度なレッドチーミングへ軸足を移し、攻撃の再現を検知・改善につなげるパープルチーミングを志向しています。HTBなどの演習環境でも検証を重ねています。",
      focusLabel: "関心領域",
      focus1Title: "CSIRT / CTI",
      focus1Text: "対応で得た知見と脅威情報を検証に生かす",
      focus2Title: "PENETRATION TESTING",
      focus2Text: "幅広い環境のリスクと攻撃経路を検証",
      focus3Title: "RED / PURPLE TEAMING",
      focus3Text: "高度な攻撃再現を検知・改善につなげる",
      credential1: "安全確保支援士（合格のみ）",
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
      expandSidebar: "サイドバーを開く"
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
      bio2: "I assess risks across a broad range of environments through penetration testing, bringing CSIRT and CTI perspectives to both offensive and defensive analysis.",
      bio3: "I am shifting my focus toward advanced red teaming, with the goal of connecting attack simulations to better detection and defenses through purple teaming. I continue to test ideas in labs such as Hack The Box.",
      focusLabel: "Focus Areas",
      focus1Title: "CSIRT / CTI",
      focus1Text: "Bring incident response insights and threat intelligence into testing",
      focus2Title: "PENETRATION TESTING",
      focus2Text: "Assess risks and attack paths across diverse environments",
      focus3Title: "RED / PURPLE TEAMING",
      focus3Text: "Connect advanced attack simulation with detection and improvement",
      credential1: "Registered Information Security Specialist exam (passed; not registered)",
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
      expandSidebar: "Expand sidebar"
    }
  };

  const stored = (key) => {
    try { return localStorage.getItem(key); } catch { return null; }
  };
  const remember = (key, value) => {
    try { localStorage.setItem(key, value); } catch { /* Browsing still works without storage. */ }
  };

  const sidebarToggle = document.querySelector("[data-sidebar-toggle]");
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
    syncSidebarToggle();
    remember(storageKeySidebar, document.documentElement.dataset.sidebar);
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
    syncSidebarToggle();
    remember(storageKeyLanguage, language);
  };

  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.addEventListener("click", () => applyTheme(button.dataset.themeChoice));
  });
  document.querySelectorAll("[data-lang-choice]").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.langChoice));
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
