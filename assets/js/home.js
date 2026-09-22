/* ==========================================================================
   PosterWala — home.js  (renders every data-driven block on index.html)
   ========================================================================== */
(function (PW) {
  'use strict';
  var D = PW.data, esc = PW.esc, qs = PW.qs, qsa = PW.qsa;

  /* keep the hand-written "From Rs" labels in sync with the pricing engine */
  qsa('[data-from-size]').forEach(function (el) {
    el.textContent = PW.money(PW.fromPrice(el.getAttribute('data-from-size')));
  });

  /* ---------- accessories ---------- */
  var acc = qs('#acc-grid');
  function artFor(i) {
    var v = PW.artVariants[i % PW.artVariants.length];
    return '<span class="art art--' + v + '" data-tone="' + (i % 2 ? 'ink' : 'cream') + '">' +
      '<span class="art__kick">' + esc(D.accessories[i].sub) + '</span>' +
      '<span class="art__head">' + esc(D.accessories[i].name.replace(/s$/, '')) + '</span>' +
      '<span class="art__bar"></span><span class="art__sub">' + esc(D.accessories[i].note.slice(0, 34)) + '</span></span>';
  }
  if (acc) {
    acc.innerHTML = D.accessories.map(function (a, i) {
      var media = a.img
        ? '<img src="' + a.img + '" alt="' + esc(a.name) + '" loading="lazy">'
        : artFor(i);
      return '<article class="card">' +
        '<a class="card__media" href="posters.html?cat=accessory" style="aspect-ratio:1.32">' +
        (a.badge ? '<span class="badge card__flag">' + esc(a.badge) + '</span>' : '') + media + '</a>' +
        '<div class="card__body"><h3 class="card__t"><a href="posters.html?cat=accessory">' + esc(a.name) + '</a></h3>' +
        '<p class="card__d">' + esc(a.sub) + '</p>' +
        '<p class="card__blurb">' + esc(a.note) + '</p>' +
        '<div class="card__foot"><p class="card__p">From<b>' + PW.money(a.from) + '</b></p>' +
        '<span class="badge">Ask for a quote</span></div></div>' +
        '<div class="card__acts"><a class="btn btn--sm btn--ink" href="posters.html?cat=accessory">Continue</a>' +
        '<a class="btn btn--sm btn--ghost" href="tel:+923008427755">WhatsApp a quote</a></div></article>';
    }).join('');
    PW.ui.reveal(acc);
  }

  /* ---------- stock guide table ---------- */
  var st = qs('#stock-table tbody');
  if (st) {
    st.innerHTML = D.stocks.map(function (s) {
      var a1 = PW.quote({ sizeId: 'a1', stockId: s.id, qty: 1 });
      return '<tr><td class="is-key">' + esc(s.label) + (s.badge ? ' <span class="badge' + (s.badge === 'Recommended' ? ' badge--red' : '') + '">' + esc(s.badge) + '</span>' : '') +
        '<br><span class="small">' + esc(s.blurb) + '</span></td>' +
        '<td>' + esc(s.best) + '</td><td>' + esc(s.life) + '</td>' +
        '<td>' + (s.outdoor ? '<span class="dot-ok">✓ Yes</span>' : '<span class="dot-no">✕ No</span>') + '</td>' +
        '<td>' + (s.id === 'silk250' || s.id === 'rag310' ? 'Matt · Gloss · Soft-touch' : (s.outdoor ? 'Gloss or matt UV' : '—')) + '</td>' +
        '<td class="num">' + PW.money(a1.unit) + '</td></tr>';
    }).join('');
  }

  var fg = qs('#finish-grid');
  if (fg) {
    fg.innerHTML = D.finishes.map(function (f) {
      var add = PW.quote({ sizeId: 'a1', stockId: 'silk250', finishId: f.id, qty: 1 }).unit -
        PW.quote({ sizeId: 'a1', stockId: 'silk250', qty: 1 }).unit;
      return '<div class="step" style="padding:18px"><p class="step__t" style="margin-bottom:4px">' + esc(f.label) + '</p>' +
        '<p class="step__c">' + esc(f.note) + '</p>' +
        '<p class="mono" style="margin-top:12px;color:' + (add ? 'var(--red)' : 'var(--muted)') + '">' +
        (add ? '+ ' + PW.money(add) + ' per A1' : 'included') + '</p></div>';
    }).join('');
  }

  /* ---------- price matrix ---------- */
  var pm = qs('#price-matrix tbody');
  if (pm) {
    pm.innerHTML = D.sizes.map(function (s) {
      var cells = D.qtyBreaks.map(function (b) {
        var q = PW.quote({ sizeId: s.id, stockId: 'silk170', qty: Math.max(b.min, 1) });
        return '<td class="num">' + PW.money(q.unit) + '</td>';
      }).join('');
      return '<tr><td class="is-key"><a href="posters.html?size=' + s.id + '">' + esc(s.label) + '</a>' +
        '<br><span class="small">' + (s.custom ? '420 × 594 shown · any mm' : s.w + ' × ' + s.h + ' mm') + '</span></td>' + cells + '</tr>';
    }).join('') +
      '<tr><td class="is-key">Flex banner <span class="small">510gsm, eyelets</span></td>' +
      '<td class="num">Rs 185<small>/sq ft</small></td><td class="num">Rs 170</td><td class="num">Rs 157</td><td class="num">Rs 144</td><td class="num">Rs 130</td></tr>';
  }

  /* ---------- city table ---------- */
  var ct = qs('#city-table tbody');
  if (ct) {
    ct.innerHTML = D.cities.map(function (c) {
      var eta = PW.eta(c.zone === 'Zone 1' ? 1 : c.zone === 'Zone 2' ? 2 : 3);
      return '<tr><td class="is-key">' + esc(c.name) + '</td><td>' + esc(c.zone) + '</td>' +
        '<td class="num">' + esc(c.eta) + ' · arrives ' + PW.dateFmt(eta) + '</td></tr>';
    }).join('');
  }

  /* ---------- reviews ---------- */
  var rg = qs('#rev-grid');
  if (rg) {
    rg.innerHTML = D.testimonials.map(function (t) {
      return '<article class="rev"><div style="display:flex;gap:10px;align-items:center">' +
        '<span class="stars" aria-label="' + t.stars + ' out of 5">' + '★★★★★'.slice(0, t.stars) + '</span>' +
        '<span class="badge badge--ok">✓ Verified</span></div>' +
        '<p class="rev__q">“' + esc(t.copy) + '”</p>' +
        '<div class="rev__m"><span class="rev__av" aria-hidden="true">' + esc(t.name.split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2)) + '</span>' +
        '<div><p class="rev__n">' + esc(t.name) + '</p><p class="rev__r">' + esc(t.role) + ' · ' + esc(t.city) + '</p></div></div>' +
        '<p class="rev__p">' + esc(t.product) + '</p></article>';
    }).join('');
    PW.ui.reveal(rg);
  }

  /* ---------- FAQ ---------- */
  var fa = qs('#faq-acc');
  if (fa) {
    fa.innerHTML = D.faqs.map(function (f, i) {
      return '<div class="acc__item"><h3><button class="acc__q" type="button" aria-expanded="false" aria-controls="faqs-' + i + '">' +
        esc(f.q) + '<span class="acc__ic" aria-hidden="true">+</span></button></h3>' +
        '<div class="acc__a" id="faqs-' + i + '" hidden><p>' + esc(f.a) + '</p></div></div>';
    }).join('');
    // deep-link support: #faq opens the first question
    if (location.hash === '#faq') {
      var f0 = qs('.acc__q', fa);
      if (f0) { f0.setAttribute('aria-expanded', 'true'); document.getElementById(f0.getAttribute('aria-controls')).hidden = false; }
    }
  }

  /* ---------- brand ticker (printspace-style logo strip) ---------------- */
  var bt = qs('#brand-ticker');
  if (bt) {
    var one = D.brands.map(function (b) { return '<span class="brand"><i aria-hidden="true"></i>' + esc(b) + '</span>'; }).join('');
    bt.innerHTML = one + one;   // duplicated for the -50% loop
  }

  /* ---------- rotating hero feature (echoes the reference slideshow) ----- */
  var FEATURE = [
    { art: 'open', tone: 'cream', kick: 'Saturday 4 Oct', head: 'Grand<br>Opening', sub: 'Saffron Cycles · MM Alam Rd' },
    { art: 'festival', tone: 'cream', kick: 'Weekend · 42 stalls', head: 'Street<br>Food', sub: 'DHA Civic Centre · free entry' },
    { art: 'gig', tone: 'red', kick: 'Live · 8pm', head: 'Round<br>Room', sub: 'Tickets Rs 800 · door Rs 1,200' },
    { art: 'cinema', tone: 'ink', kick: 'Now showing', head: 'The<br>Long<br>Night', sub: 'Nueplex 6 · 40×30 lobby set' }
  ];
  var feat = qs('#hero-feature');
  if (feat && !PW.reduceMotion) {
    var fi = 0, host = feat.querySelector('.art');
    setInterval(function () {
      if (document.hidden) return;
      fi = (fi + 1) % FEATURE.length;
      var f = FEATURE[fi];
      host.classList.add('is-swap');
      setTimeout(function () {
        host.className = 'art art--' + f.art;
        host.setAttribute('data-tone', f.tone);
        host.innerHTML = '<span class="art__kick">' + f.kick + '</span><span class="art__head">' + f.head +
          '</span><span class="art__bar"></span><span class="art__sub">' + f.sub + '</span>';
        host.classList.remove('is-swap');
      }, 260);
    }, 5200);
  }

  /* ---------- scroll-spy on the size cards: highlight the matching one ---- */
  if (location.hash && /^#sizes?$/.test(location.hash)) {
    var g = qs('#sizes'); if (g) g.scrollIntoView({ block: 'start' });
  }
})(window.PW);
