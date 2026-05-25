(function () {
  'use strict';

  const THEME_KEY = 'lavasch-theme';
  const LANG_KEY = 'lavasch-lang';
  const html = document.documentElement;
  const header = document.getElementById('header');
  const themeToggle = document.getElementById('themeToggle');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const HEADER_OFFSET = 64;

  const translations = {
    tr: {
      'aria.home': 'LAVASCH ana sayfa',
      'aria.menu': 'Ana menü',
      'aria.theme': 'Tema',
      'aria.video': 'LAVASCH tanıtım videosu',
      'nav.yemekler': 'Yemekler',
      'nav.icecekler': 'İçecekler',
      'nav.konum': 'Konum',
      'nav.instagram': 'Instagram',
      'btn.yolTarifi': 'Yol Tarifi',
      'btn.ara': 'Ara',
      'btn.takipEt': 'Takip Et',
      'btn.harita': 'Harita',
      'btn.tamEkran': 'Tam ekran aç',
      'btn.haritada': 'Haritada gör',
      'hero.kicker': 'Elazığ · Tek Şube',
      'hero.h1': '%100 Tavuk Yaprak Döner',
      'hero.h2': 'Özel Alman Sosu',
      'hero.h3': 'Gerçek Yaprak Döner Lezzeti',
      'hero.h4': 'Günlük Taze Üretim',
      'hero.h5': 'Bol Malzeme, Yoğun Lezzet',
      'hero.h6': 'Her Lokmada Premium Kalite',
      'cta.yemekler': 'Yemekler',
      'cta.yemeklerSub': 'Döner · Dürüm · Tabak',
      'cta.icecekler': 'İçecekler',
      'cta.iceceklerSub': 'Ayran · Kola · Su',
      'sec.yemekler.title': 'YEMEKLER',
      'sec.yemekler.sub': 'Döner, köfte ve yan ürünler',
      'tab.doner': 'Döner',
      'tab.kofte': 'Köfte',
      'tab.yan': 'Yan Ürün',
      'jump.icecekler': 'İçeceklere git →',
      'sec.icecekler.title': 'İÇECEKLER',
      'sec.icecekler.sub': 'Ayran, kola ve soğuk içecekler',
      'jump.yemekler': 'Yemeklere git →',
      'sec.konum.title': 'KONUM',
      'sec.konum.sub': 'LAVASCH Elazığ — tek şubemiz',
      'loc.hours.label': 'Pazartesi – Pazar',
      'loc.hours.value': '09:00 – 02:00',
      'loc.service.label': 'Servis',
      'loc.service.value': 'Gel-Al · Paket',
      'sec.insta.title': 'INSTAGRAM',
      'sec.insta.sub': '@lavasch_elazig — gönderiler ve profil',
      'footer.copy': '© 2026 LAVASCH Elazığ',
      'price.free': 'Ücretsiz',
      'product.doner-bowl': 'Döner Bowl',
      'product.doner-box': 'Döner Box',
      'product.doner-durum': 'Döner Dürüm',
      'product.doner-ekmek': 'Döner Ekmek Arası',
      'product.doner-tabak': 'Döner Tabak',
      'product.tam-kofte': 'Tam Köfte',
      'product.yarim-kofte': 'Yarım Köfte',
      'product.patates-buyuk': 'Patates Büyük',
      'product.patates-kucuk': 'Patates Küçük',
      'product.ayran-buyuk': 'Ayran Büyük',
      'product.ayran-kucuk': 'Ayran Küçük',
      'product.kola': 'Kola',
      'product.kola-cam': 'Kola Cam',
      'product.soguk-icecek': 'Soğuk İçecek',
      'product.su': 'Su',
      'product.cay': 'Çay'
    },
    de: {
      'aria.home': 'LAVASCH Startseite',
      'aria.menu': 'Hauptmenü',
      'aria.theme': 'Design',
      'aria.video': 'LAVASCH Werbevideo',
      'nav.yemekler': 'Speisen',
      'nav.icecekler': 'Getränke',
      'nav.konum': 'Standort',
      'nav.instagram': 'Instagram',
      'btn.yolTarifi': 'Route',
      'btn.ara': 'Anrufen',
      'btn.takipEt': 'Folgen',
      'btn.harita': 'Karte',
      'btn.tamEkran': 'Vollbild öffnen',
      'btn.haritada': 'Auf Karte anzeigen',
      'hero.kicker': 'Elazığ · Einzelstandort',
      'hero.h1': '100% Hähnchen Yaprak Döner',
      'hero.h2': 'Spezielle deutsche Soße',
      'hero.h3': 'Echter Yaprak-Döner-Geschmack',
      'hero.h4': 'Täglich frisch produziert',
      'hero.h5': 'Viel Belag, intensiver Geschmack',
      'hero.h6': 'Premium-Qualität bei jedem Bissen',
      'cta.yemekler': 'Speisen',
      'cta.yemeklerSub': 'Döner · Wrap · Teller',
      'cta.icecekler': 'Getränke',
      'cta.iceceklerSub': 'Ayran · Cola · Wasser',
      'sec.yemekler.title': 'SPEISEN',
      'sec.yemekler.sub': 'Döner, Köfte und Beilagen',
      'tab.doner': 'Döner',
      'tab.kofte': 'Köfte',
      'tab.yan': 'Beilagen',
      'jump.icecekler': 'Zu Getränken →',
      'sec.icecekler.title': 'GETRÄNKE',
      'sec.icecekler.sub': 'Ayran, Cola und kalte Getränke',
      'jump.yemekler': 'Zu Speisen →',
      'sec.konum.title': 'STANDORT',
      'sec.konum.sub': 'LAVASCH Elazığ — unsere Filiale',
      'loc.hours.label': 'Montag – Sonntag',
      'loc.hours.value': '09:00 – 02:00',
      'loc.service.label': 'Service',
      'loc.service.value': 'Abholung · To-Go',
      'sec.insta.title': 'INSTAGRAM',
      'sec.insta.sub': '@lavasch_elazig — Beiträge und Profil',
      'footer.copy': '© 2026 LAVASCH Elazığ',
      'price.free': 'Kostenlos',
      'product.doner-bowl': 'Döner Bowl',
      'product.doner-box': 'Döner Box',
      'product.doner-durum': 'Döner Wrap',
      'product.doner-ekmek': 'Döner im Brot',
      'product.doner-tabak': 'Döner Teller',
      'product.tam-kofte': 'Ganze Köfte',
      'product.yarim-kofte': 'Halbe Köfte',
      'product.patates-buyuk': 'Große Pommes',
      'product.patates-kucuk': 'Kleine Pommes',
      'product.ayran-buyuk': 'Ayran Groß',
      'product.ayran-kucuk': 'Ayran Klein',
      'product.kola': 'Cola',
      'product.kola-cam': 'Cola Glas',
      'product.soguk-icecek': 'Kaltes Getränk',
      'product.su': 'Wasser',
      'product.cay': 'Tee'
    }
  };

  function setLanguage(lang) {
    const active = translations[lang] ? lang : 'tr';
    html.lang = active;
    localStorage.setItem(LANG_KEY, active);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const text = translations[active][key];
      if (text) el.textContent = text;
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria');
      const text = translations[active][key];
      if (text) el.setAttribute('aria-label', text);
    });

    document.title = active === 'de'
      ? 'LAVASCH — Döner Elazığ'
      : 'LAVASCH — Elazığ Döner';
  }

  function initLanguage() {
    const saved = localStorage.getItem(LANG_KEY);
    const lang = saved === 'de' ? 'de' : 'tr';
    setLanguage(lang);

    document.querySelectorAll('.flag').forEach((btn) => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('flag--active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  // Theme
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    setTheme(saved === 'dark' ? 'dark' : 'light');
  }

  themeToggle?.addEventListener('click', () => {
    setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  initTheme();
  initLanguage();

  // Hero video — muted autoplay (iOS / Android)
  const heroVideo = document.querySelector('.hero__video-player');
  if (heroVideo) {
    heroVideo.defaultMuted = true;
    heroVideo.muted = true;
    heroVideo.setAttribute('playsinline', '');
    heroVideo.setAttribute('webkit-playsinline', '');

    const playHeroVideo = () => {
      const p = heroVideo.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };

    playHeroVideo();
    heroVideo.addEventListener('canplay', playHeroVideo, { once: false });
    heroVideo.addEventListener('loadedmetadata', playHeroVideo);

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) playHeroVideo();
    });

    document.addEventListener(
      'touchstart',
      () => {
        playHeroVideo();
      },
      { once: true, passive: true }
    );
  }

  // Mobile menu
  menuToggle?.addEventListener('click', () => {
    const open = header.classList.toggle('nav-open');
    menuToggle.setAttribute('aria-expanded', open);
    document.body.classList.toggle('nav-locked', open);
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      header.classList.remove('nav-open');
      document.body.classList.remove('nav-locked');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  // Food menu tabs
  const tabs = document.querySelectorAll('.tab');
  const panels = {
    doner: document.getElementById('panel-doner'),
    kofte: document.getElementById('panel-kofte'),
    yan: document.getElementById('panel-yan')
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.panel;
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      Object.entries(panels).forEach(([key, panel]) => {
        if (!panel) return;
        panel.hidden = key !== id;
      });
    });
  });

  function scrollToSection(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo(0, top);
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      scrollToSection(id);
    });
  });

  // Language flags
  document.querySelectorAll('.flag').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang === 'de' ? 'de' : 'tr';
      document.querySelectorAll('.flag').forEach((b) => {
        b.classList.remove('flag--active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('flag--active');
      btn.setAttribute('aria-pressed', 'true');
      setLanguage(lang);
    });
  });

  function processInstagramEmbed() {
    if (window.instgrm && window.instgrm.Embeds) {
      window.instgrm.Embeds.process();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', processInstagramEmbed);
  } else {
    processInstagramEmbed();
  }

  window.addEventListener('load', () => {
    setTimeout(processInstagramEmbed, 800);
  });
})();
