/* McCue Travel & Cruise — site script (no dependencies)
   1. SITE: business details + form endpoint. Edit these first.
   2. Shared header/footer are injected so you edit navigation once.
   3. Illustrated scenes, scroll reveals, forms, price estimator, filters, logo picker. */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ 1. CONFIG */
  var SITE = {
    name: 'McCue Travel & Cruise',
    phone: '(555) 555-0123',            // TODO: replace
    phoneHref: '+15555550123',          // TODO: replace
    email: 'hello@mccuetravelandcruise.com', // TODO: replace
    location: 'Your City, ST',          // TODO: replace
    hours: 'Mon–Fri 9am–6pm · Sat 10am–2pm',
    // Create a free form at https://formspree.io (or use Netlify Forms) and paste the endpoint here.
    // While it still contains YOUR_FORM_ID, forms fall back to opening the visitor's email app.
    formEndpoint: 'https://formspree.io/f/YOUR_FORM_ID',
    social: { facebook: '#', instagram: '#' },
    year: new Date().getFullYear()
  };

  var LOGOS = [
    { id: 'compass',  name: 'The Compass',  file: 'assets/logos/logo-compass.svg',  note: 'A compass rose with a brass north point. Classic, trustworthy, instantly "travel."' },
    { id: 'helm',     name: 'The Helm',     file: 'assets/logos/logo-helm.svg',     note: "A ship's wheel with brass handles. Warm, nautical, a little sentimental." },
    { id: 'horizon',  name: 'The Horizon',  file: 'assets/logos/logo-horizon.svg',  note: 'A golden sun setting into layered waves inside a navy badge. Romantic and aspirational.' },
    { id: 'monogram', name: 'The Monogram', file: 'assets/logos/logo-monogram.svg', note: 'A framed serif "M" over a wave line. Boutique and luxe; works great as an app/social icon.' },
    { id: 'anchor',   name: 'The Anchor Seal', file: 'assets/logos/logo-anchor.svg', note: 'An anchor in a navy seal with a gold ring. Heritage, dependable, reads well small.' },
    { id: 'wordmark', name: 'The Wordmark', file: 'assets/logos/logo-wordmark.svg', note: 'Pure italic serif script with a brass wave underline. Elegant and editorial; no symbol to maintain.' }
  ];

  function store(key, val) {
    try { if (val === undefined) return localStorage.getItem(key); localStorage.setItem(key, val); } catch (e) { return null; }
  }
  function currentLogo() {
    var id = store('mccueLogo') || 'compass';
    return LOGOS.filter(function (l) { return l.id === id; })[0] || LOGOS[0];
  }

  /* ------------------------------------------------------------------ icons */
  var ICONS = {
    ship: 'M3 17l2 3h14l2-3H3z M5 17v-6h14v6 M9 11V7h6v4 M12 7V4',
    compass: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M16 8l-2 6-6 2 2-6z',
    heart: 'M12 21s-8-5.5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 10c0 5.5-8 11-8 11z',
    users: 'M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2 M10 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z M21 20v-2a4 4 0 0 0-3-3.9 M16 3.1a3.5 3.5 0 0 1 0 6.8',
    shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2 2 4-4',
    phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
    calendar: 'M4 6h16v14H4z M4 10h16 M8 3v4 M16 3v4',
    star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
    map: 'M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
    ring: 'M12 20a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M9 8l3-4 3 4',
    plane: 'M3 13l8-2 4-7 2 1-2 7 5 1 1 2-6 1-3 5-2-1 1-5-6-1z',
    tag: 'M3 12V4h8l10 10-8 8z M7.5 8.5h.01',
    mail: 'M3 5h18v14H3z M3 6l9 7 9-7',
    glass: 'M8 3h8l-1 8a3 3 0 0 1-6 0z M12 14v7 M8 21h8',
    sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M12 2v3 M12 19v3 M2 12h3 M19 12h3 M5 5l2 2 M17 17l2 2 M19 5l-2 2 M7 17l-2 2',
    facebook: 'M14 9h3V5h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V9z',
    instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M17.5 6.5h.01'
  };
  function icon(name) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + (ICONS[name] || '') + '"/></svg>';
  }

  /* ------------------------------------------------------------------ 2. HEADER / FOOTER */
  var NAV_EXP = [
    ['services.html', 'All Services', 'Everything we plan, in one place'],
    ['ocean-cruises.html', 'Ocean Cruises', 'Caribbean, Alaska, Europe & beyond'],
    ['river-expedition.html', 'River & Expedition', 'Rhine, Galápagos, Antarctica'],
    ['weddings-honeymoons.html', 'Weddings & Honeymoons', 'Romance, planned to the detail'],
    ['groups-corporate.html', 'Groups & Corporate', 'Reunions, retreats, incentives']
  ];
  var NAV = [
    ['destinations.html', 'Destinations'],
    ['pricing.html', 'Pricing'],
    ['about.html', 'About'],
    ['contact.html', 'Contact']
  ];

  function pageName() {
    var p = location.pathname.split('/').pop();
    return p === '' ? 'index.html' : p;
  }

  function buildHeader() {
    var here = pageName();
    var expActive = NAV_EXP.some(function (n) { return n[0] === here; });
    var logo = currentLogo();
    var html =
      '<a class="skip" href="#main">Skip to content</a>' +
      '<div class="topbar"><div class="container">' +
        '<span class="hide-sm">Personal, expert travel planning — every cruise line, one trusted advisor.</span>' +
        '<span><a href="tel:' + SITE.phoneHref + '" data-config="phone">' + SITE.phone + '</a><span class="sep">|</span><a href="mailto:' + SITE.email + '" data-config="email">' + SITE.email + '</a></span>' +
      '</div></div>' +
      '<div class="container nav-wrap">' +
        '<a class="brand" href="index.html" aria-label="' + SITE.name + ' — home"><img class="brand-logo" src="' + logo.file + '" alt="' + SITE.name + '" width="210" height="58"></a>' +
        '<button class="menu-toggle" aria-expanded="false" aria-controls="nav" aria-label="Open menu"><span></span></button>' +
        '<nav class="nav" id="nav" aria-label="Main">' +
          '<a class="link' + (here === 'index.html' ? ' active' : '') + '" href="index.html">Home</a>' +
          '<div class="has-menu"><button class="link' + (expActive ? ' active' : '') + '" aria-haspopup="true" aria-expanded="false">Experiences <i class="caret"></i></button><div class="menu">' +
            NAV_EXP.map(function (n) { return '<a href="' + n[0] + '"><strong>' + n[1] + '</strong><span>' + n[2] + '</span></a>'; }).join('') +
          '</div></div>' +
          NAV.map(function (n) { return '<a class="link' + (here === n[0] ? ' active' : '') + '" href="' + n[0] + '">' + n[1] + '</a>'; }).join('') +
          '<a class="btn btn-primary btn-sm nav-cta" href="contact.html">Plan My Trip</a>' +
        '</nav>' +
      '</div><div class="scrim"></div>';
    var el = document.getElementById('site-header');
    if (!el) return;
    el.className = 'site-header';
    el.innerHTML = html;

    var toggle = el.querySelector('.menu-toggle'), nav = el.querySelector('.nav'), scrim = el.querySelector('.scrim');
    function setOpen(open) {
      nav.classList.toggle('open', open); scrim.classList.toggle('show', open);
      toggle.setAttribute('aria-expanded', open); toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    }
    toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
    scrim.addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    var hm = el.querySelector('.has-menu'), hb = hm.querySelector('button');
    hb.addEventListener('click', function () { var o = hm.classList.toggle('open'); hb.setAttribute('aria-expanded', o); });
    var onScroll = function () { el.classList.toggle('scrolled', window.scrollY > 10); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  function buildFooter() {
    var el = document.getElementById('site-footer');
    if (!el) return;
    var logo = currentLogo();
    el.className = 'site-footer';
    el.innerHTML =
      '<div class="container"><div class="footer-grid">' +
        '<div><img class="footer-logo" src="' + logo.file + '" alt="' + SITE.name + '" width="220" height="62">' +
          '<p>Thoughtfully planned cruises and journeys for travelers who want the experience, not the paperwork. Call us, tell us your dream, and we’ll handle the rest.</p>' +
          '<div class="socials"><a href="' + SITE.social.facebook + '" aria-label="Facebook">' + icon('facebook') + '</a><a href="' + SITE.social.instagram + '" aria-label="Instagram">' + icon('instagram') + '</a></div></div>' +
        '<div><h4>Experiences</h4><ul>' + NAV_EXP.map(function (n) { return '<li><a href="' + n[0] + '">' + n[1] + '</a></li>'; }).join('') + '</ul></div>' +
        '<div><h4>Explore</h4><ul><li><a href="destinations.html">Destinations</a></li><li><a href="pricing.html">Pricing &amp; Estimator</a></li><li><a href="about.html">About Us</a></li><li><a href="faq.html">FAQ</a></li><li><a href="contact.html">Contact</a></li><li><a href="logos.html">Logo Options</a></li></ul></div>' +
        '<div><h4>Get in touch</h4><ul>' +
          '<li><a href="tel:' + SITE.phoneHref + '" data-config="phone">' + SITE.phone + '</a></li>' +
          '<li><a href="mailto:' + SITE.email + '" data-config="email">' + SITE.email + '</a></li>' +
          '<li>' + SITE.location + '</li><li>' + SITE.hours + '</li></ul>' +
          '<h4 style="margin-top:22px">Travel inspiration</h4>' +
          '<form class="news" data-form="newsletter" novalidate><label class="hp" for="nl-email">Email</label><input id="nl-email" name="email" type="email" placeholder="Your email" required aria-label="Email address"><button class="btn btn-primary btn-sm" type="submit">Join</button></form>' +
          '<div class="form-status" role="status" style="margin-top:10px;padding:10px 12px;font-size:.85rem"></div>' +
        '</div>' +
      '</div>' +
      '<p class="fine">Prices shown on this site are illustrative “from” rates per person, based on double occupancy, and vary by sailing date, availability, cabin, and supplier. Final pricing is confirmed in writing at booking. Taxes, port fees, gratuities and optional insurance may be additional.</p>' +
      '<div class="legal"><span>© ' + SITE.year + ' ' + SITE.name + '. All rights reserved.</span><span><a href="privacy.html">Privacy</a> · <a href="terms.html">Terms</a></span></div></div>' +
      '<a class="btn btn-primary fab" href="tel:' + SITE.phoneHref + '" data-config="phone-fab">Call Us</a>';
  }

  /* ------------------------------------------------------------------ 3. SCENES (illustrated art, no image files needed) */
  var uid = 0;
  function pal(a) { return a.map(function (c, i) { return '<stop offset="' + Math.round(i / (a.length - 1) * 100) + '%" stop-color="' + c + '"/>'; }).join(''); }
  function palm(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M0 0 Q4 -40 14 -70" stroke="#2a1a12" stroke-width="4" fill="none" stroke-linecap="round"/><g fill="#12331f"><path d="M14 -70 Q-10 -80 -32 -62 Q-8 -70 14 -70Z"/><path d="M14 -70 Q30 -92 58 -80 Q30 -80 14 -70Z"/><path d="M14 -70 Q42 -68 54 -46 Q32 -62 14 -70Z"/><path d="M14 -70 Q-4 -94 -28 -90 Q0 -84 14 -70Z"/></g></g>';
  }
  function ship(x, y, s, hull) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M-62 0 L62 0 L48 14 L-50 14Z" fill="' + (hull || '#f6f1e4') + '"/><rect x="-52" y="-10" width="104" height="10" fill="#fff"/><rect x="-42" y="-20" width="84" height="10" fill="#f6f1e4"/><rect x="-30" y="-29" width="58" height="9" fill="#fff"/><rect x="8" y="-40" width="13" height="11" fill="#b8923f"/><path d="M-50 -5H50M-40 -15H40M-26 -24H26" stroke="#0b2545" stroke-width="1.6" stroke-dasharray="2.5 3.5" opacity=".55"/><path d="M-62 4H62" stroke="#0b2545" stroke-width="2.4" opacity=".8"/></g>';
  }
  function waves(y, color, op) {
    return '<path d="M0 ' + y + ' Q25 ' + (y - 7) + ' 50 ' + y + ' T100 ' + y + ' T150 ' + y + ' T200 ' + y + ' T250 ' + y + ' T300 ' + y + ' T350 ' + y + ' T400 ' + y + ' V250 H0Z" fill="' + color + '" opacity="' + op + '"/>';
  }
  function village(x, y, s) {
    var b = '';
    [[0, 0, 26, 22], [28, -8, 22, 30], [52, 2, 28, 20], [82, -12, 20, 34], [104, 0, 26, 22]].forEach(function (r, i) {
      b += '<rect x="' + r[0] + '" y="' + (r[1] - r[3]) + '" width="' + r[2] + '" height="' + r[3] + '" fill="#fffaf0"/>';
      if (i % 2 === 0) b += '<path d="M' + r[0] + ' ' + (r[1] - r[3]) + ' a' + r[2] / 2 + ' ' + r[2] / 2 + ' 0 0 1 ' + r[2] + ' 0z" fill="#1d6aa0"/>';
      b += '<rect x="' + (r[0] + r[2] / 2 - 2) + '" y="' + (r[1] - 10) + '" width="4" height="9" fill="#1d6aa0"/>';
    });
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' + b + '</g>';
  }
  function stars(n, seed) {
    var o = '', a = seed || 7;
    for (var i = 0; i < n; i++) { a = (a * 9301 + 49297) % 233280; var x = a / 233280 * 400; a = (a * 9301 + 49297) % 233280; var y = a / 233280 * 120; o += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + (i % 4 === 0 ? 1.4 : .8) + '" fill="#fff" opacity="' + (i % 3 ? .6 : .95) + '"/>'; }
    return o;
  }

  var SCENES = {
    hero: { sky: ['#08142b', '#1b3a63', '#e08e5f'], sea: ['#1a4a6d', '#071a33'], h: 186, pre: stars(70, 3), sun: [110, 182, 40, '#ffd9a6', .95], extra: ship(312, 194, 1.35, '#f6f1e4') },
    caribbean: { sky: ['#ff9966', '#ffcf8a', '#ffe9b8'], sea: ['#1aa6b7', '#0b5f7a'], h: 150, sun: [280, 140, 34, '#fff1c4', .95], extra: ship(190, 152, .45) + palm(58, 225, 1.3) + palm(346, 238, 1.05) },
    alaska: { sky: ['#6d8fb3', '#b8d0e4', '#eef4f8'], sea: ['#3f6f8f', '#16384f'], h: 168, back: '<polygon points="0,168 50,100 88,134 142,66 204,152 252,92 312,142 362,86 400,132 400,168" fill="#9db6cc"/><polygon points="142,66 124,94 142,86 158,100 170,92" fill="#fff"/><polygon points="362,86 346,108 362,102 376,112" fill="#fff"/><polygon points="252,92 238,114 252,108 266,118" fill="#fff"/><polygon points="0,168 72,122 140,168" fill="#5b7c98"/><polygon points="240,168 320,118 400,168" fill="#5b7c98"/><polygon points="72,122 58,140 72,136 88,146" fill="#eaf2f8"/><polygon points="320,118 306,138 320,134 336,144" fill="#eaf2f8"/>', extra: ship(230, 190, .5) + '<polygon points="30,176 60,150 100,172 90,184 40,184" fill="#e6f4fb" opacity=".95"/>' },
    mediterranean: { sky: ['#4aa3df', '#9bd3f2', '#fff0cf'], sea: ['#1f8ac0', '#0b4f86'], h: 162, sun: [76, 66, 24, '#fff6d6', .95], back: '<path d="M200 162 Q250 100 320 92 Q370 90 400 104 V162Z" fill="#d9b27c"/><path d="M230 162 Q290 120 400 126 V162Z" fill="#c79b61"/>', extra: village(264, 140, 1.1) + ship(110, 172, .4) },
    greek: { sky: ['#5fb5ff', '#cfeaff', '#ffffff'], sea: ['#1ea0d8', '#0a4c8c'], h: 158, back: '<path d="M-10 158 Q60 92 150 112 Q190 122 214 158Z" fill="#e0c9a0"/><path d="M230 158 Q310 70 410 112 V158Z" fill="#d6b987"/>', extra: village(30, 150, 1.05) + village(262, 138, .95) },
    riviera: { sky: ['#6b3f8c', '#e56b6f', '#ffbe8c'], sea: ['#e07a5f', '#3d405b'], h: 160, sun: [210, 150, 40, '#ffdba8', .95], back: '<path d="M0 160 V70 Q50 60 90 90 Q120 120 150 160Z" fill="#5a3a2e"/><path d="M290 160 Q330 110 400 100 V160Z" fill="#3b2a35"/>', extra: palm(40, 100, 1) + palm(360, 228, 1.1) },
    hawaii: { sky: ['#f7797d', '#fbd786', '#d9f7da'], sea: ['#00a8b5', '#02586e'], h: 168, back: '<polygon points="110,168 190,66 276,168" fill="#2f3e46"/><polygon points="190,66 172,92 190,84 210,96" fill="#ff7b3a" opacity=".9"/><polygon points="40,168 100,118 160,168" fill="#3c6e47"/><polygon points="250,168 320,112 390,168" fill="#3c6e47"/>', extra: palm(70, 232, 1.35) + palm(336, 238, 1.1) },
    river: { sky: ['#a8d8ea', '#e9f5e1', '#fff7da'], sea: ['#5f9ea0', '#2f5d62'], h: 178, back: '<path d="M0 178 Q60 100 140 120 T260 110 T400 130 V178Z" fill="#8fbf7a"/><path d="M0 178 Q80 130 170 150 T330 140 T400 160 V178Z" fill="#5d9150"/><g transform="translate(262 82)"><rect x="0" y="12" width="60" height="30" fill="#d8cdb7"/><rect x="-6" y="0" width="16" height="42" fill="#cbbf9f"/><rect x="50" y="0" width="16" height="42" fill="#cbbf9f"/><polygon points="-8,0 2,-16 12,0" fill="#8a3b2e"/><polygon points="48,0 58,-16 68,0" fill="#8a3b2e"/><rect x="22" y="22" width="14" height="20" fill="#5b4a37"/></g>', extra: ship(130, 192, .55) },
    expedition: { sky: ['#0f2a47', '#3b6a94', '#cfe3f1'], sea: ['#0d3d5c', '#06223a'], h: 172, pre: stars(36, 11), back: '<polygon points="0,172 80,96 130,140 190,70 250,150 320,100 400,172" fill="#dbe9f3"/><polygon points="190,70 172,100 190,92 208,106" fill="#fff"/><polygon points="80,96 66,120 80,114 96,124" fill="#fff"/>', extra: '<polygon points="270,176 300,140 340,176" fill="#f2f8fc"/><polygon points="300,140 318,176 340,176" fill="#bcd6e8"/><polygon points="40,184 70,158 112,184" fill="#f2f8fc"/><polygon points="70,158 88,184 112,184" fill="#bcd6e8"/>' + ship(180, 196, .5, '#d9442b') },
    wedding: { sky: ['#ffd6e0', '#ffe9d6', '#fff7e6'], sea: ['#8ecae6', '#4a90b8'], h: 172, sun: [200, 118, 42, '#ffffff', .85], extra: '<g transform="translate(200 176)"><path d="M-34 70 V-14 A34 34 0 0 1 34 -14 V70" fill="none" stroke="#fffdf5" stroke-width="6"/><g fill="#f4a6b8"><circle cx="-34" cy="-14" r="9"/><circle cx="34" cy="-14" r="9"/><circle cx="0" cy="-48" r="10"/><circle cx="-22" cy="-38" r="8"/><circle cx="22" cy="-38" r="8"/></g><g fill="#7fb77e"><circle cx="-26" cy="-4" r="6"/><circle cx="26" cy="-4" r="6"/><circle cx="-14" cy="-46" r="5"/><circle cx="14" cy="-46" r="5"/></g></g>' + palm(60, 232, 1.1) + palm(350, 236, 1.2) },
    group: { sky: ['#274c77', '#6096ba', '#f5d7a0'], sea: ['#2a6f97', '#0d2f52'], h: 168, sun: [90, 150, 30, '#fff1c4', .9], extra: ship(240, 192, 2.1) },
    polynesia: { sky: ['#6dd5ed', '#b2fefa', '#fff3b0'], sea: ['#2bd2c0', '#0b7a8a'], h: 166, back: '<polygon points="130,166 200,60 232,100 268,70 340,166" fill="#2d6a4f"/><polygon points="200,60 188,82 200,78 214,90" fill="#52b788" opacity=".8"/>', extra: '<g fill="#8b5e3c"><rect x="40" y="196" width="70" height="6"/><rect x="48" y="200" width="3" height="20"/><rect x="98" y="200" width="3" height="20"/><polygon points="40,196 75,176 110,196" fill="#c9a66b"/></g><g fill="#8b5e3c"><rect x="290" y="206" width="70" height="6"/><rect x="298" y="210" width="3" height="18"/><rect x="348" y="210" width="3" height="18"/><polygon points="290,206 325,186 360,206" fill="#c9a66b"/></g>' + palm(232, 232, 1.1) },
    fjords: { sky: ['#9fb4c7', '#d7e3ec', '#f4f7f9'], sea: ['#2c4a5a', '#0d2330'], h: 176, back: '<polygon points="-10,176 40,40 110,90 150,176" fill="#4e6a5e"/><polygon points="250,176 300,70 350,30 410,176" fill="#43605a"/><polygon points="40,40 26,70 40,62 56,76" fill="#fff"/><polygon points="350,30 334,64 350,56 368,70" fill="#fff"/><path d="M96 100 V176" stroke="#fff" stroke-width="2.5" opacity=".8"/>', extra: ship(206, 196, .5) },
    galapagos: { sky: ['#f6d365', '#fda085', '#fff1d0'], sea: ['#2bb0b8', '#0d5e6e'], h: 164, sun: [310, 120, 34, '#fff3c4', .95], back: '<path d="M0 164 Q40 120 100 128 T170 164Z" fill="#4a3b33"/><path d="M200 164 Q250 140 300 156 T400 164Z" fill="#5a4a40"/>', extra: '<g transform="translate(60 208)" fill="#3d4d3d"><ellipse cx="0" cy="0" rx="22" ry="9"/><circle cx="24" cy="-2" r="5"/><path d="M-22 2 l-10 6 M-6 8 l-3 8 M10 8 l3 8"/></g>' },
    canal: { sky: ['#79c2d0', '#e0f4e6', '#fff8dc'], sea: ['#3a8f6e', '#1f4f3f'], h: 176, back: '<path d="M0 176 Q70 110 150 130 T290 120 T400 140 V176Z" fill="#4f9a5b"/><path d="M0 176 Q90 140 190 156 T400 150 V176Z" fill="#2f6e44"/>', extra: ship(210, 196, .8) + palm(50, 232, 1.2) + palm(352, 236, 1) }
  };

  function sceneSVG(type) {
    var c = SCENES[type] || SCENES.caribbean, i = ++uid, g = 'sg' + i, s = 'ss' + i;
    var o = '<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><defs>' +
      '<linearGradient id="' + g + '" x1="0" y1="0" x2="0" y2="1">' + pal(c.sky) + '</linearGradient>' +
      '<linearGradient id="' + s + '" x1="0" y1="0" x2="0" y2="1">' + pal(c.sea) + '</linearGradient></defs>' +
      '<rect width="400" height="250" fill="url(#' + g + ')"/>' + (c.pre || '');
    if (c.sun) {
      o += '<circle cx="' + c.sun[0] + '" cy="' + c.sun[1] + '" r="' + (c.sun[2] * 1.9) + '" fill="' + c.sun[3] + '" opacity=".16"/><circle cx="' + c.sun[0] + '" cy="' + c.sun[1] + '" r="' + c.sun[2] + '" fill="' + c.sun[3] + '" opacity="' + c.sun[4] + '"/>';
    }
    o += (c.back || '') + '<rect y="' + c.h + '" width="400" height="' + (250 - c.h) + '" fill="url(#' + s + ')"/>';
    if (c.sun) o += '<g stroke="' + c.sun[3] + '" stroke-linecap="round" opacity=".5"><path d="M' + (c.sun[0] - 22) + ' ' + (c.h + 10) + 'h44 M' + (c.sun[0] - 14) + ' ' + (c.h + 22) + 'h28 M' + (c.sun[0] - 8) + ' ' + (c.h + 34) + 'h16" stroke-width="3"/></g>';
    o += waves(c.h + 14, '#ffffff', .1) + (c.extra || '') + waves(c.h + 52, '#ffffff', .12) + waves(c.h + 74, '#071a33', .18) + '</svg>';
    return o;
  }

  function fillScenes() {
    document.querySelectorAll('[data-scene]').forEach(function (el) { if (!el.firstChild) el.innerHTML = sceneSVG(el.getAttribute('data-scene')); });
    document.querySelectorAll('[data-ico]').forEach(function (el) { el.innerHTML = icon(el.getAttribute('data-ico')); });
    document.querySelectorAll('.hero-waves').forEach(function (el) {
      var p = '<svg viewBox="0 0 1200 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 50 Q150 10 300 50 T600 50 T900 50 T1200 50 V90 H0Z" fill="#faf6ec" fill-opacity=".35"/></svg>';
      var q = '<svg viewBox="0 0 1200 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 62 Q150 28 300 62 T600 62 T900 62 T1200 62 V90 H0Z" fill="#faf6ec"/></svg>';
      el.innerHTML = p + q;
    });
  }

  /* ------------------------------------------------------------------ reveal */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: .12 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ------------------------------------------------------------------ forms */
  function formStatus(form) {
    var s = form.querySelector('.form-status') || (form.parentNode && form.parentNode.querySelector('.form-status'));
    return s;
  }
  function setStatus(form, ok, msg) {
    var s = formStatus(form); if (!s) return;
    s.className = 'form-status ' + (ok ? 'ok' : 'bad'); s.textContent = msg;
    if (form.dataset.form === 'contact') s.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function validate(form) {
    var ok = true, first = null;
    form.querySelectorAll('[required]').forEach(function (inp) {
      var field = inp.closest('.field'), bad = false;
      if (inp.type === 'checkbox') bad = !inp.checked;
      else if (inp.type === 'email') bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim());
      else bad = !inp.value.trim();
      if (field) field.classList.toggle('invalid', bad);
      if (bad) { ok = false; if (!first) first = inp; }
    });
    if (first) first.focus();
    return ok;
  }
  function mailtoFallback(form, data) {
    var lines = [];
    data.forEach(function (v, k) { if (v && k.indexOf('_') !== 0 && k !== 'company_website') lines.push(k.replace(/-/g, ' ') + ': ' + v); });
    var subject = form.dataset.form === 'newsletter' ? 'Newsletter signup' : 'Trip inquiry — ' + (data.get('name') || 'website');
    location.href = 'mailto:' + SITE.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
  }
  function initForms() {
    document.querySelectorAll('form[data-form]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var s = formStatus(form); if (s) s.className = 'form-status';
        if (!validate(form)) { setStatus(form, false, 'Please complete the highlighted fields.'); return; }
        var data = new FormData(form);
        if (data.get('company_website')) return; // honeypot: bots only
        var btn = form.querySelector('button[type="submit"]'), label = btn && btn.textContent;
        if (/YOUR_FORM_ID/.test(SITE.formEndpoint)) {
          mailtoFallback(form, data);
          setStatus(form, true, 'Thank you! Your email app should open with your details ready to send. (Site owner: connect a form service in assets/js/main.js to receive submissions automatically.)');
          return;
        }
        if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
        fetch(SITE.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (r) { if (!r.ok) throw new Error(r.status); form.reset(); setStatus(form, true, form.dataset.form === 'newsletter' ? 'Welcome aboard! Watch your inbox.' : 'Thank you! We’ve received your request and will reply within one business day.'); })
          .catch(function () { setStatus(form, false, 'Something went wrong. Please call ' + SITE.phone + ' or email ' + SITE.email + '.'); })
          .then(function () { if (btn) { btn.disabled = false; btn.textContent = label; } });
      });
      form.addEventListener('input', function (e) { var f = e.target.closest('.field'); if (f) f.classList.remove('invalid'); });
    });

    // Prefill contact form from query string (?service=&destination=&month=&travelers=)
    var cf = document.querySelector('form[data-form="contact"]');
    if (cf) {
      var q = new URLSearchParams(location.search);
      ['service', 'destination', 'month', 'travelers', 'message'].forEach(function (k) {
        var v = q.get(k), el = cf.elements[k]; if (v && el) el.value = v;
      });
    }
  }

  /* quick enquiry bar on the home page */
  function initQuickbar() {
    var f = document.getElementById('quickbar-form'); if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = new URLSearchParams();
      ['destination', 'month', 'travelers'].forEach(function (k) { var v = f.elements[k].value; if (v) q.set(k, v); });
      var svc = { 'A relaxing escape': 'ocean', 'A bucket-list adventure': 'expedition', 'A wedding or honeymoon': 'wedding', 'A family or group getaway': 'group' }[f.elements.style.value];
      if (svc) q.set('service', svc);
      location.href = 'contact.html?' + q.toString() + '#plan';
    });
  }

  /* ------------------------------------------------------------------ filters */
  function initFilters() {
    var chips = document.querySelectorAll('.chip[data-filter]'); if (!chips.length) return;
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); c.setAttribute('aria-pressed', 'false'); });
        chip.classList.add('active'); chip.setAttribute('aria-pressed', 'true');
        var f = chip.dataset.filter;
        document.querySelectorAll('[data-tags]').forEach(function (card) {
          card.classList.toggle('hidden', f !== 'all' && card.dataset.tags.split(' ').indexOf(f) < 0);
        });
      });
    });
  }

  /* ------------------------------------------------------------------ price estimator */
  function initCalc() {
    var root = document.getElementById('calc'); if (!root) return;
    var $ = function (id) { return document.getElementById(id); };
    var money = function (n) { return '$' + Math.round(n).toLocaleString('en-US'); };
    var CABIN = { interior: 1, oceanview: 1.2, balcony: 1.45, suite: 2.4 };
    function run() {
      var base = parseFloat($('c-type').value), nights = +$('c-nights').value, trav = +$('c-trav').value;
      var cabin = CABIN[root.querySelector('input[name="c-cabin"]:checked').value];
      var fare = base * nights * cabin * trav;
      var taxes = fare * .15;
      var ins = $('c-ins').checked ? (fare + taxes) * .07 : 0;
      var air = $('c-air').checked ? 450 * trav : 0;
      var hotel = $('c-hotel').checked ? 180 * 2 * Math.ceil(trav / 2) : 0;
      var total = fare + taxes + ins + air + hotel;
      $('c-nights-out').textContent = nights + (nights === 1 ? ' night' : ' nights');
      $('c-trav-out').textContent = trav + (trav === 1 ? ' traveler' : ' travelers');
      $('r-total').textContent = money(total);
      $('r-range').textContent = money(total * .9) + ' – ' + money(total * 1.15);
      $('r-fare').textContent = money(fare); $('r-tax').textContent = money(taxes);
      $('r-ins').textContent = ins ? money(ins) : '—'; $('r-air').textContent = air ? money(air) : '—'; $('r-hotel').textContent = hotel ? money(hotel) : '—';
      $('r-pp').textContent = money(total / trav);
      var sel = $('c-type'), label = sel.options[sel.selectedIndex].text;
      $('r-quote').href = 'contact.html?service=quote&destination=' + encodeURIComponent(label) + '&travelers=' + trav + '&message=' + encodeURIComponent('Estimator: ' + label + ', ' + nights + ' nights, ' + trav + ' travelers, ' + root.querySelector('input[name="c-cabin"]:checked').value + ' cabin. Estimate ' + money(total)) + '#plan';
    }
    root.addEventListener('input', run); root.addEventListener('change', run); run();
  }

  /* ------------------------------------------------------------------ logo picker */
  function initLogoPicker() {
    var grid = document.getElementById('logo-grid'); if (!grid) return;
    var sel = currentLogo().id;
    grid.innerHTML = LOGOS.map(function (l, i) {
      return '<article class="logo-card' + (l.id === sel ? ' selected' : '') + '" data-id="' + l.id + '">' +
        '<div class="stages"><div class="stage"><img src="' + l.file + '" alt="' + l.name + ' logo on light background"></div><div class="stage dark"><img src="' + l.file + '" alt="' + l.name + ' logo, single-color on navy"></div></div>' +
        '<div><span class="eyebrow">Option ' + (i + 1) + '</span><h3>' + l.name + '</h3><p>' + l.note + '</p></div>' +
        '<div class="actions"><button class="btn btn-navy btn-sm" data-use="' + l.id + '">' + (l.id === sel ? 'Selected ✓' : 'Preview on site') + '</button><a class="btn btn-outline btn-sm" href="' + l.file + '" download>Download SVG</a></div></article>';
    }).join('');
    grid.addEventListener('click', function (e) {
      var b = e.target.closest('[data-use]'); if (!b) return;
      store('mccueLogo', b.dataset.use);
      var logo = currentLogo();
      document.querySelectorAll('.brand-logo, .footer-logo').forEach(function (img) { img.src = logo.file; });
      grid.querySelectorAll('.logo-card').forEach(function (c) {
        var on = c.dataset.id === logo.id; c.classList.toggle('selected', on);
        c.querySelector('[data-use]').textContent = on ? 'Selected ✓' : 'Preview on site';
      });
      var out = document.getElementById('logo-chosen'); if (out) out.textContent = logo.name;
    });
    var out = document.getElementById('logo-chosen'); if (out) out.textContent = currentLogo().name;
  }

  /* ------------------------------------------------------------------ boot */
  function boot() {
    buildHeader(); buildFooter(); fillScenes(); initReveal(); initForms(); initQuickbar();
    initFilters(); initCalc(); initLogoPicker();
    document.querySelectorAll('[data-config="phone"]').forEach(function (a) { a.textContent = SITE.phone; a.href = 'tel:' + SITE.phoneHref; });
    document.querySelectorAll('[data-config="email"]').forEach(function (a) { a.textContent = SITE.email; a.href = 'mailto:' + SITE.email; });
    document.querySelectorAll('[data-config="location"]').forEach(function (a) { a.textContent = SITE.location; });
    document.querySelectorAll('[data-config="hours"]').forEach(function (a) { a.textContent = SITE.hours; });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
