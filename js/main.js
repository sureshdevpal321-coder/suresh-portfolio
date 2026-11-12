/* =====================================================================
   SURESH KUMAR — PORTFOLIO LOGIC
   Is file ko edit karne ki zarurat nahi.
   Aapka content (projects, email, links, photo) js/projects.js me hai.
   ===================================================================== */
(function () {
  'use strict';

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var site     = (typeof SITE !== 'undefined' && SITE) ? SITE : {};
  var projects = (typeof PROJECTS !== 'undefined' && Array.isArray(PROJECTS)) ? PROJECTS : [];
  var CATEGORIES = ['Short-form', 'Long-form', 'Documentary', 'Personal Brand'];

  var PLAY_SVG = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>';

  /* ---------- tiny DOM helper ---------- */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'text') node.textContent = attrs[k];
      else if (k === 'html') node.innerHTML = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  /* ---------- video link understanding ---------- */
  function parseVideo(url) {
    if (!url || typeof url !== 'string') return null;
    url = url.trim();
    if (!url) return null;
    var m;
    m = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/);
    if (m) return { type: 'youtube', id: m[1] };
    m = url.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([a-z0-9]+))?/i);
    if (m) return { type: 'vimeo', id: m[1], hash: m[2] || '' };
    if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url)) return { type: 'file', src: url };
    return { type: 'link', src: url };          // koi aur link: naye tab me khulega
  }

  function posterFor(v) {
    if (v && v.type === 'youtube') return 'https://img.youtube.com/vi/' + v.id + '/hqdefault.jpg';
    return '';
  }

  function mediaElement(v, title) {
    if (v.type === 'youtube') {
      return el('iframe', {
        src: 'https://www.youtube-nocookie.com/embed/' + v.id + '?autoplay=1&rel=0&modestbranding=1&playsinline=1',
        title: title, allow: 'autoplay; fullscreen; picture-in-picture', allowfullscreen: '',
        referrerpolicy: 'strict-origin-when-cross-origin'
      });
    }
    if (v.type === 'vimeo') {
      return el('iframe', {
        src: 'https://player.vimeo.com/video/' + v.id + '?autoplay=1' + (v.hash ? '&h=' + v.hash : ''),
        title: title, allow: 'autoplay; fullscreen; picture-in-picture', allowfullscreen: ''
      });
    }
    var vid = el('video', { src: v.src, controls: '', autoplay: '', playsinline: '', preload: 'auto' });
    vid.setAttribute('aria-label', title);
    return vid;
  }

  /* ---------- scroll reveal ---------- */
  var revealObserver = null;
  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); revealObserver.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  }
  function watch(nodes) {
    nodes.forEach(function (n) {
      if (revealObserver) revealObserver.observe(n); else n.classList.add('is-visible');
    });
  }
  // Staggered groups
  $$('[data-stagger]').forEach(function (g) {
    Array.prototype.forEach.call(g.children, function (c, i) {
      c.classList.add('reveal'); c.style.setProperty('--i', i);
    });
  });
  watch($$('.reveal'));

  /* ---------- navigation ---------- */
  var nav = $('#nav'), toggle = $('#menuToggle'), menu = $('#navMenu');

  function onScroll() { nav.classList.toggle('is-scrolled', window.scrollY > 24); }
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(function () { onScroll(); ticking = false; }); }
  }, { passive: true });
  onScroll();

  function setMenu(open) {
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () { setMenu(!document.body.classList.contains('nav-open')); });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  window.matchMedia('(min-width: 900px)').addEventListener('change', function (e) { if (e.matches) setMenu(false); });

  // Active link highlight
  if ('IntersectionObserver' in window) {
    var linkMap = {};
    $$('[data-link]').forEach(function (a) { linkMap[a.getAttribute('data-link')] = a; });
    var secObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var id = e.target.id;
        if (id === 'process') id = 'services';
        $$('[data-link]').forEach(function (a) { a.classList.remove('is-active'); });
        if (linkMap[id]) linkMap[id].classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['home', 'work', 'about', 'services', 'process', 'contact'].forEach(function (id) {
      var s = document.getElementById(id); if (s) secObserver.observe(s);
    });
  }

  /* ---------- site settings (email, social links, status, portrait) ---------- */
  if (site.status) $$('[data-status]').forEach(function (n) { n.textContent = site.status; });

  if (site.instagram) $$('[data-instagram]').forEach(function (a) { a.href = site.instagram; });

  $$('[data-linkedin]').forEach(function (a) {
    if (site.linkedin) a.href = site.linkedin; else a.hidden = true;
  });

  var email = (site.email || '').trim();
  var contactEmail = $('#contactEmail');
  if (email) {
    contactEmail.appendChild(el('a', { href: 'mailto:' + email, text: email }));
  } else {
    contactEmail.appendChild(el('span', { class: 'muted', text: 'Email coming soon — message me on Instagram.' }));
  }
  $$('[data-inquiry]').forEach(function (a) {
    if (email) {
      a.href = 'mailto:' + email + '?subject=' + encodeURIComponent('Video editing project inquiry');
    } else {
      a.href = site.instagram || '#contact';
      a.target = '_blank'; a.rel = 'noopener';
    }
  });

  if (site.portrait) {
    var portrait = $('#portrait');
    var fallback = $$('.about__mono, .about__cap', portrait);
    var photo = el('img', { src: site.portrait, alt: 'Portrait of Suresh Kumar', loading: 'lazy' });
    photo.addEventListener('load', function () {
      portrait.classList.add('has-photo');
      fallback.forEach(function (n) { n.hidden = true; });
    });
    photo.addEventListener('error', function () { photo.remove(); });   // monogram placeholder rehta hai
    portrait.insertBefore(photo, portrait.firstChild);
  }

  /* ---------- video pop-up ---------- */
  var modal = $('#modal'), modalPlayer = $('#modalPlayer'), modalTitle = $('#modalTitle');

  function openVideo(v, title, vertical) {
    if (!v) return;
    if (v.type === 'link') { window.open(v.src, '_blank', 'noopener'); return; }
    modalTitle.textContent = title;
    modalPlayer.innerHTML = '';
    modalPlayer.appendChild(mediaElement(v, title));
    modal.classList.toggle('modal--vertical', !!vertical);
    if (typeof modal.showModal === 'function') modal.showModal(); else modal.setAttribute('open', '');
  }
  function closeVideo() {
    if (typeof modal.close === 'function') modal.close(); else modal.removeAttribute('open');
    modalPlayer.innerHTML = '';
  }
  $('#modalClose').addEventListener('click', closeVideo);
  modal.addEventListener('click', function (e) {
    if (e.target === modal || e.target.classList.contains('modal__wrap')) closeVideo();
  });
  modal.addEventListener('close', function () { modalPlayer.innerHTML = ''; });

  /* ---------- hero: featured project frame ---------- */
  function thumbOf(p) { return (p.thumbnail || '').trim() || posterFor(parseVideo(p.videoUrl)); }

  var heroWrap = $('#heroFrameWrap'), heroFrame = $('#heroFrame');
  var playable = projects.filter(function (p) {
    var v = parseVideo(p.videoUrl);
    return v && v.type !== 'link' && thumbOf(p);
  });
  var heroProject = playable.filter(function (p) { return p.featured; })[0] || playable[0];

  if (heroProject) {
    var hImg = el('img', { src: thumbOf(heroProject), alt: '' });
    hImg.addEventListener('error', function () { hImg.remove(); });
    heroFrame.insertBefore(hImg, heroFrame.firstChild);
    $('#heroFrameTitle').textContent = heroProject.title || '';
    $('#heroFrameCat').textContent = heroProject.category || '';
    heroFrame.setAttribute('aria-label', 'Play featured project: ' + (heroProject.title || ''));
    heroFrame.addEventListener('click', function () {
      openVideo(parseVideo(heroProject.videoUrl), heroProject.title || 'Featured project', !!heroProject.vertical);
    });
  } else {
    heroWrap.hidden = true;      // koi playable project nahi to frame chhupa do
  }

  /* ---------- projects ---------- */
  var grid = $('#projectGrid'), filtersEl = $('#filters'), emptyEl = $('#emptyState');
  var current = 'All';

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function placeholder(p, i) {
    return el('div', { class: 'ph', 'data-tone': String(i % 3), 'aria-hidden': 'true' }, [
      el('span', { class: 'ph__label', text: p.category || 'Project' }),
      el('span', { class: 'ph__num', text: pad(i + 1) })
    ]);
  }

  function renderCard(p, i) {
    var v = parseVideo(p.videoUrl);
    var title = p.title || 'Untitled project';
    var thumb = thumbOf(p);

    var card = el('article', { class: 'card reveal' + (p.featured ? ' card--featured' : '') + (p.vertical ? ' card--vertical' : '') });
    card.style.setProperty('--i', String(i % 3));

    var media = el(v ? 'button' : 'div', v ? { class: 'card__media', type: 'button', 'aria-label': 'Play: ' + title } : { class: 'card__media' });

    if (thumb) {
      var img = el('img', { src: thumb, alt: title + ' — thumbnail', loading: 'lazy' });
      img.addEventListener('error', function () { img.replaceWith(placeholder(p, i)); });
      media.appendChild(img);
    } else {
      media.appendChild(placeholder(p, i));
    }

    if (v) {
      media.appendChild(el('span', { class: 'card__play', html: PLAY_SVG }));
      media.addEventListener('click', function () { openVideo(v, title, !!p.vertical); });
    } else {
      media.appendChild(el('span', { class: 'card__badge', text: 'Video coming soon' }));
    }
    card.appendChild(media);

    var meta = el('div', { class: 'card__meta' });
    var cat = (p.category || '') + (p.client ? '  ·  ' + p.client : '');
    meta.appendChild(el('p', { class: 'card__cat', text: cat }));
    meta.appendChild(el('h3', { class: 'card__title', text: title }));
    if (p.description) meta.appendChild(el('p', { class: 'card__desc', text: p.description }));
    if (Array.isArray(p.services) && p.services.length) {
      var ul = el('ul', { class: 'card__tags', 'aria-label': 'Services' });
      p.services.forEach(function (s) { ul.appendChild(el('li', { text: s })); });
      meta.appendChild(ul);
    }
    if (p.link) meta.appendChild(el('a', { class: 'card__link', href: p.link, target: '_blank', rel: 'noopener', text: 'View project →' }));
    card.appendChild(meta);
    return card;
  }

  function renderProjects() {
    var list = projects.filter(function (p) { return current === 'All' || p.category === current; });
    // Featured projects pehle dikhte hain
    list = list.slice().sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });

    grid.innerHTML = '';
    var cards = list.map(renderCard);
    cards.forEach(function (c) { grid.appendChild(c); });
    // Full-width (landscape featured) card ko chhodkar baaki cards gino, taaki aakhri row center ho sake
    var regular = list.filter(function (p) { return !(p.featured && !p.vertical); }).length;
    grid.setAttribute('data-rem2', String(regular % 2));
    grid.setAttribute('data-rem3', String(regular % 3));
    emptyEl.hidden = list.length > 0;
    watch(cards);
  }

  function renderFilters() {
    // Sirf wahi categories dikhao jinme project hai
    var cats = ['All'].concat(CATEGORIES.filter(function (c) {
      return projects.some(function (p) { return p.category === c; });
    }));
    projects.forEach(function (p) {
      if (p.category && cats.indexOf(p.category) < 0) cats.push(p.category);
    });
    if (cats.length <= 2) { filtersEl.hidden = true; return; }

    cats.forEach(function (cat) {
      var b = el('button', { class: 'filter', type: 'button', 'aria-pressed': String(cat === current), text: cat });
      b.addEventListener('click', function () {
        current = cat;
        $$('.filter', filtersEl).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        renderProjects();
      });
      filtersEl.appendChild(b);
    });
  }

  renderFilters();
  renderProjects();

  /* ---------- footer year ---------- */
  var y = $('#year'); if (y) y.textContent = new Date().getFullYear();
})();
