(function () {
  'use strict';

  const THEME_KEY = 'lavasch-theme';
  const html = document.documentElement;
  const header = document.getElementById('header');
  const themeToggle = document.getElementById('themeToggle');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const HEADER_OFFSET = 64;

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

    // First tap anywhere can unlock autoplay on strict mobile browsers
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

  // Scroll to section (food / drinks buttons & nav)
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

  // Flags
  document.querySelectorAll('.flag').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.flag').forEach((b) => {
        b.classList.remove('flag--active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('flag--active');
      btn.setAttribute('aria-pressed', 'true');
    });
  });

  // Instagram embed.js — process profile blockquote when loaded
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
