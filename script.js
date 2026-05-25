(function () {
  'use strict';

  const THEME_KEY = 'lavasch-theme';
  const LANG_KEY = 'lavasch-lang';
  const translations = window.LAVASCH_I18N;

  function runApp() {
    if (!translations || !translations.tr || !translations.de) {
      return;
    }

    const html = document.documentElement;
    const header = document.getElementById('header');
    const themeToggle = document.getElementById('themeToggle');
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const flagsWrap = document.querySelector('.flags');
    const HEADER_OFFSET = 64;

    function setLanguage(lang) {
      const active = lang === 'de' ? 'de' : 'tr';
      const dict = translations[active];
      html.lang = active;
      html.setAttribute('data-lang', active);

      try {
        localStorage.setItem(LANG_KEY, active);
      } catch (e) {
        /* private mode */
      }

      document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (key && dict[key]) el.textContent = dict[key];
      });

      document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
        const key = el.getAttribute('data-i18n-aria');
        if (key && dict[key]) el.setAttribute('aria-label', dict[key]);
      });

      document.title = active === 'de'
        ? 'LAVASCH — Döner Elazığ'
        : 'LAVASCH — Elazığ Döner';

      document.querySelectorAll('.flag').forEach((btn) => {
        const btnLang = btn.getAttribute('data-lang');
        const isActive = btnLang === active;
        btn.classList.toggle('flag--active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
    }

    function initLanguage() {
      let lang = 'tr';
      try {
        if (localStorage.getItem(LANG_KEY) === 'de') lang = 'de';
      } catch (e) {
        /* ignore */
      }
      setLanguage(lang);
    }

    function setTheme(theme) {
      html.setAttribute('data-theme', theme);
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch (e) {
        /* ignore */
      }
    }

    function initTheme() {
      let theme = 'light';
      try {
        if (localStorage.getItem(THEME_KEY) === 'dark') theme = 'dark';
      } catch (e) {
        /* ignore */
      }
      setTheme(theme);
    }

    themeToggle?.addEventListener('click', () => {
      setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });

    initTheme();
    initLanguage();

    if (flagsWrap) {
      flagsWrap.addEventListener('click', (e) => {
        const btn = e.target.closest('.flag');
        if (!btn) return;
        e.preventDefault();
        const lang = btn.getAttribute('data-lang') === 'de' ? 'de' : 'tr';
        setLanguage(lang);
      });
    }

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
      heroVideo.addEventListener('canplay', playHeroVideo);
      heroVideo.addEventListener('loadedmetadata', playHeroVideo);

      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) playHeroVideo();
      });

      document.addEventListener('touchstart', playHeroVideo, { once: true, passive: true });
    }

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

    function processInstagramEmbed() {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
    }

    processInstagramEmbed();
    window.addEventListener('load', () => {
      setTimeout(processInstagramEmbed, 800);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runApp);
  } else {
    runApp();
  }
})();
