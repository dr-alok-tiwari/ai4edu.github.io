/* ═══════════════════════════════════════
   AI4EDU — Shared Script
   ═══════════════════════════════════════ */

(function() {

  // ── PROGRESS BAR ──
  const bar = document.createElement('div');
  bar.className = 'progress-bar';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });

  // ── NAV SCROLL STATE ──
  const nav = document.querySelector('.site-nav');
  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
  if (nav && window.scrollY > 30) nav.classList.add('scrolled');

  // ── HAMBURGER ──
  const ham = document.querySelector('.nav-hamburger');
  const links = document.querySelector('.nav-links');
  if (ham && links) {
    ham.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      ham.classList.toggle('open', open);
      ham.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('.nav-link').forEach(l => {
      l.addEventListener('click', () => {
        links.classList.remove('open');
        ham.classList.remove('open');
      });
    });
  }

  // ── ACTIVE NAV LINK ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[href]').forEach(l => {
    const href = l.getAttribute('href').split('/').pop();
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      l.classList.add('active');
    }
  });

  // ── SCROLL REVEAL ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ── COLLAPSIBLE CATEGORY BLOCKS ──
  document.querySelectorAll('.cat-block-header').forEach(header => {
    header.addEventListener('click', () => {
      header.closest('.cat-block').classList.toggle('collapsed');
    });
  });

  // ── SEARCH FILTER ──
  const searchInput = document.getElementById('resourceSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase();
      document.querySelectorAll('.link-item, .res-card').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  // ── YEAR ──
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // ── SMOOTH ANCHOR ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ── COPY TO CLIPBOARD ──
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(btn.dataset.copy).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = orig, 1500);
      });
    });
  });

})();
