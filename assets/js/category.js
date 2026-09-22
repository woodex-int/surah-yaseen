/* ==========================================================================
   PosterWala — category.js  (shop grid, live filters, sort, size guide)
   ========================================================================== */
(function (PW) {
  'use strict';
  var D = PW.data, esc = PW.esc, qs = PW.qs, qsa = PW.qsa;
  var money = PW.money;

  var EXTRA_FAQS = [
    {
      q: 'What poster sizes are available?',
      a: 'Nine standard cuts — A4 (210×297mm), A3 (297×420mm), A2 (420×594mm), A1 (594×841mm), A0 (841×1189mm), 20×30in (508×762mm), 40×30in (1016×762mm) and 60×40in (1524×1016mm) — plus any custom size between 80×80mm and 1500×3000mm, cut to the millimetre. Every one prints portrait or landscape for the same money, and 20×30 is the size that fits off-the-shelf frames sold in Pakistan.'
    },
    {
      q: 'What are posters used for?',
      a: 'Advertising products (in-store offers, star buys, bus-stop-style large format), promoting events (date, time, venue on one sheet at every entrance), and communicating information people must be able to read — hygiene ratings, health and safety, floor plans, price lists. For anything that must be wiped clean or survive weather, choose PVC rather than paper.'
    },
    {
      q: 'What paper stock is best?',
      a: '170gsm value silk for temporary promos and notices — thin and cheap. 250gsm classic silk when someone will hold it or it sits in a frame: a proper hand-feel and the only stock we laminate. 310gsm fine-art rag for art prints, wedding signage and limited editions. 220mic waterproof PVC for A-frames and windows, 400mic heavy PVC for hoardings that must live outdoors for two monsoons.'
    },
    {
      q: 'Can you check my file before printing?',
      a: 'Always, free, on every order, by a person rather than a script. We look at resolution at final size, bleed, safety margin, fonts being embedded, RGB-to-CMYK shift and whether a dark background will band. You get a proof on WhatsApp — usually inside 45 minutes during working hours — and nothing goes on a press until you reply "OK".'
    },
    {
      q: 'Do you print in Urdu and Arabic script?',
      a: 'Yes. Urdu needs care: send text as outlines or embedded fonts, keep Nastaliq line-height generous, and avoid tiny nuqta dots below 6pt at A4 (they fill in at 1200 DPI on silk). We keep a designer who reads Urdu on the Lahore team, so we can spot a broken join before it costs you 300 sheets.'
    }
  ];

  /* ---------- state ---------- */
  var state = {
    size: {}, stock: {}, use: {}, finish: {}, extra: {}, cat: null, sort: 'pop'
  };
  var preSize = PW.q('size'), preStock = PW.q('stock'), preCat = PW.q('cat');
  if (preSize) state.size[preSize] = true;
  if (preStock) state.stock[preStock] = true;
  if (preCat === 'accessory') state.cat = 'accessory';

  /* ---------- helpers ---------- */
  function priceOf(p) {
    return PW.quote({ sizeId: p.sizeId, stockId: p.stockId, finishId: p.finishId || 'none', qty: 1 }).unit;
  }
  function areaOf(p) {
    var s = PW.size(p.sizeId);
    return s.custom ? 0.25 : s.w * s.h;
  }
  function isFast(p) { return /48|2 day|same/i.test(p.turnaround); }
  function isOutdoor(p) { return PW.stock(p.stockId).outdoor || /outdoor/.test(p.tags.join(' ')); }
  function hasLam(p) { return !!(p.finishId && p.finishId !== 'none'); }

  function passes(p) {
    var any = function (o) { return Object.keys(o).some(function (k) { return o[k]; }); };
    if (any(state.size) && !state.size[p.sizeId]) return false;
    if (any(state.stock) && !state.stock[p.stockId]) return false;
    if (any(state.use)) {
      if (state.use.indoor && isOutdoor(p)) return false;
      if (state.use.outdoor && !isOutdoor(p)) return false;
    }
    if (any(state.finish) && !((state.finish.lam && hasLam(p)) || (state.finish.plain && !hasLam(p)))) return false;
    if (any(state.extra)) {
      if (state.extra.fast && !isFast(p)) return false;
      if (state.extra.cheap && priceOf(p) > 1000) return false;
      if (state.extra.premium && !(PW.stock(p.stockId).id === 'rag310' || hasLam(p))) return false;
      if (state.extra.frame && !/2030|i2030/.test(p.sizeId)) return false;
    }
    return true;
  }

  /* ---------- filter UI ---------- */
  function group(el, items, key, kind) {
    el.innerHTML = items.map(function (it) {
      return '<label class="fopt"><input type="' + (kind || 'checkbox') + '" name="' + key + '" value="' + it.v + '"' +
        (state[key] && state[key][it.v] ? ' checked' : '') + '>' +
        '<span>' + it.t + '</span>' + (it.n != null ? '<em>' + it.n + '</em>' : '') + '</label>';
    }).join('');
    qsa('input', el).forEach(function (i) {
      i.addEventListener('change', function () {
        state[key][i.value] = i.checked;
        if (key === 'cat') state.cat = i.checked ? 'accessory' : null;
        render();
      });
    });
  }

  function counts(key, fn) {
    var o = {};
    D.products.forEach(function (p) { var k = fn(p); if (k) o[k] = (o[k] || 0) + 1; });
    return o;
  }
  var cSize = counts('size', function (p) { return p.sizeId; });
  var cStock = counts('stock', function (p) { return p.stockId; });

  group(qs('#f-size'), D.sizes.filter(function (s) { return cSize[s.id]; }).map(function (s) {
    return { v: s.id, t: s.label + ' <em style="margin-left:6px">' + (s.custom ? 'your mm' : s.w + '×' + s.h) + '</em>', n: cSize[s.id] };
  }), 'size');
  group(qs('#f-stock'), D.stocks.map(function (s) {
    return { v: s.id, t: s.label, n: cStock[s.id] || 0 };
  }), 'stock');
  group(qs('#f-use'), [{ v: 'indoor', t: 'Indoor only', n: D.products.filter(function (p) { return !isOutdoor(p); }).length },
    { v: 'outdoor', t: 'Weatherproof / outdoor', n: D.products.filter(isOutdoor).length }], 'use');
  group(qs('#f-finish'), [{ v: 'lam', t: 'Laminated', n: D.products.filter(hasLam).length },
    { v: 'plain', t: 'No laminate', n: D.products.filter(function (p) { return !hasLam(p); }).length }], 'finish');
  group(qs('#f-extra'), [
    { v: 'fast', t: '48-hour express available', n: D.products.filter(isFast).length },
    { v: 'cheap', t: 'Under Rs 1,000 each', n: D.products.filter(function (p) { return priceOf(p) <= 1000; }).length },
    { v: 'premium', t: 'Premium stock or finish' },
    { v: 'frame', t: 'Fits standard frames' }
  ], 'extra');

  var catBox = qsa('#f-cat, [name="cat"]');
  catBox.forEach(function (i) {
    i.checked = state.cat === 'accessory';
    i.addEventListener('change', function () {
      state.cat = i.checked ? 'accessory' : null;
      render();
    });
  });

  qs('#f-reset').addEventListener('click', reset);
  var pc = qs('#p-clear'); if (pc) pc.addEventListener('click', function () { reset(); render(); });

  function reset() {
    state = { size: {}, stock: {}, use: {}, finish: {}, extra: {}, cat: null, sort: state.sort };
    qsa('#filters input').forEach(function (i) { i.checked = false; });
    history.replaceState(null, '', location.pathname);
    render();
  }

  qs('#sort').addEventListener('change', function () { state.sort = this.value; render(); });

  /* ---------- quick size chips ---------- */
  qs('#quick-sizes').innerHTML = D.sizes.map(function (s) {
    return '<a class="chip' + (preSize === s.id ? ' is-on' : '') + '" href="posters.html?size=' + s.id + '">' +
      esc(s.label) + ' <span class="mono" style="color:var(--red)">' + money(PW.fromPrice(s.id)) + '</span></a>';
  }).join('') + '<a class="chip" href="posters.html?cat=accessory" style="border-color:var(--ink)">Frames &amp; display →</a>';

  /* ---------- cards ---------- */
  function card(p) {
    var s = PW.size(p.sizeId), q = PW.quote({ sizeId: p.sizeId, stockId: p.stockId, finishId: p.finishId || 'none', qty: 1 });
    var ar = s.custom ? .85 : Math.min(1.6, Math.max(.55, s.w / s.h));
    var stock = PW.stock(p.stockId);
    return '<article class="card pcard" data-slug="' + p.slug + '">' +
      '<button class="quickadd" type="button" data-add="' + p.slug + '" aria-label="Quick add ' + esc(p.name) + ' to basket" title="Quick add to basket">+</button>' +
      '<a class="card__media" href="product.html?p=' + p.slug + '" style="aspect-ratio:' + ar + '">' +
      (p.badge ? '<span class="badge ' + (/seller|most/i.test(p.badge) ? 'badge--red' : 'badge--ink') + ' card__flag">' + esc(p.badge) + '</span>' : '') +
      PW.artHTML(p.art) + '</a>' +
      '<div class="card__body">' +
      '<h3 class="card__t"><a href="product.html?p=' + p.slug + '">' + esc(p.name) + '</a></h3>' +
      '<p class="card__d">' + esc(s.label) + ' · ' + esc(stock.label) + ' · ' + esc(s.custom ? 'your own mm' : s.w + ' × ' + s.h + ' mm') + '</p>' +
      '<p class="card__blurb">' + esc(stock.blurb) + '</p>' +
      '<div class="pcard__rate"><span class="stars" aria-hidden="true">★★★★★</span> ' + p.rating.toFixed(1) +
      ' <span style="color:var(--line-strong)">|</span> ' + PW.num(p.count) + ' reviews <span style="color:var(--line-strong)">|</span> ' + esc(p.turnaround) + '</div>' +
      '<div class="card__foot"><p class="card__p">From<b>' + money(q.unit) + '</b></p>' +
      (q.breakOff ? '<span class="badge badge--ok">qty break active</span>' : '<span class="badge">' + (stock.outdoor ? 'Outdoor' : 'Indoor') + '</span>') +
      '</div></div>' +
      '<div class="pcard__acts"><a class="btn btn--sm btn--ink" href="product.html?p=' + p.slug + '">Configure &amp; buy</a>' +
      '<a class="btn btn--sm btn--ghost" href="design-studio.html?s=' + p.sizeId + '&stock=' + p.stockId + '" title="Open in the design studio at this size">Design</a></div>' +
      '</article>';
  }

  function accCard(a) {
    return '<article class="card pcard"><a class="card__media" href="posters.html?cat=accessory" style="aspect-ratio:1.3">' +
      (a.img ? '<img src="' + a.img + '" alt="' + esc(a.name) + '" loading="lazy">' : PW.artHTML('grid')) +
      (a.badge ? '<span class="badge badge--red card__flag">' + esc(a.badge) + '</span>' : '') + '</a>' +
      '<div class="card__body"><h3 class="card__t">' + esc(a.name) + '</h3><p class="card__d">' + esc(a.sub) + '</p>' +
      '<p class="card__blurb">' + esc(a.note) + '</p>' +
      '<div class="card__foot"><p class="card__p">From<b>' + money(a.from) + '</b></p><span class="badge">Made to order</span></div></div>' +
      '<div class="pcard__acts"><a class="btn btn--sm btn--ink" href="tel:+923008427755">Get a quote</a>' +
      '<a class="btn btn--sm btn--ghost" href="product.html?p=a1-event-poster">Add posters to it</a></div></article>';
  }

  var grid = qs('#pgrid');
  function render() {
    var list = D.products.filter(passes);
    var s = state.sort;
    list.sort(function (a, b) {
      if (s === 'low') return priceOf(a) - priceOf(b);
      if (s === 'high') return priceOf(b) - priceOf(a);
      if (s === 'size') return areaOf(b) - areaOf(a);
      if (s === 'big') return areaOf(b) - areaOf(a) || priceOf(b) - priceOf(a);
      if (s === 'fast') return (isFast(a) ? 1 : 0) - (isFast(b) ? 1 : 0) || priceOf(a) - priceOf(b);
      return b.count - a.count;
    });
    var accs = state.cat === 'accessory' ? D.accessories : [];
    var html = list.map(card).join('');
    if (accs.length) html = accs.map(accCard).join('') + (list.length ? html : '');
    grid.innerHTML = html;
    qs('#p-empty').hidden = !!(list.length || accs.length);
    qs('#rc').textContent = list.length + accs.length;

    // active filter pills
    var pills = [];
    Object.keys(state).forEach(function (k) {
      if (k === 'sort' || k === 'cat') return;
      Object.keys(state[k]).forEach(function (v) {
        if (!state[k][v]) return;
        var label = v;
        if (k === 'size') label = PW.size(v).label;
        if (k === 'stock') label = PW.stock(v).label;
        if (k === 'use') label = v === 'indoor' ? 'Indoor' : 'Weatherproof';
        if (k === 'finish') label = v === 'lam' ? 'Laminated' : 'No laminate';
        if (k === 'extra') label = { fast: '48h available', cheap: 'Under Rs 1,000', premium: 'Premium', frame: 'Frame-ready' }[v] || v;
        pills.push('<button class="chip is-on" type="button" data-k="' + k + '" data-v="' + v + '">' + esc(label) + ' <span aria-hidden="true">×</span></button>');
      });
    });
    if (state.cat === 'accessory') pills.push('<button class="chip is-on" type="button" data-k="cat" data-v="accessory">Frames &amp; display <span aria-hidden="true">×</span></button>');
    var af = qs('#active-filters');
    af.hidden = !pills.length;
    af.innerHTML = pills.length ? '<span class="small" style="align-self:center">Active:</span>' + pills.join('') : '';
    qsa('[data-k]', af).forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.getAttribute('data-k'), v = b.getAttribute('data-v');
        if (k === 'cat') { state.cat = null; qsa('[name="cat"]').forEach(function (i) { i.checked = false; }); }
        else { delete state[k][v]; }
        var inp = qs('#filters input[value="' + v + '"]');
        if (inp) inp.checked = false;
        render();
      });
    });
    qs('#rfilt').textContent = pills.length ? ' · ' + pills.length + ' filter' + (pills.length === 1 ? '' : 's') : '';
    qsa('[data-add]', grid).forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        var p = PW.product(b.getAttribute('data-add'));
        addToBasket(p);
      });
    });
    PW.ui.reveal(grid);
  }

  function addToBasket(p) {
    var cfg = { sizeId: p.sizeId, stockId: p.stockId, finishId: p.finishId || 'none', mountId: 'none', rushId: 'std', qty: 1 };
    var q = PW.quote(cfg);
    PW.store.add({
      slug: p.slug, name: p.name, art: p.art, sizeId: p.sizeId, stockId: p.stockId,
      finishId: cfg.finishId, mountId: 'none', rushId: 'std', qty: 1,
      unit: q.unit, total: q.subtotal, configSummary: PW.summary(cfg), rushDays: PW.rush('std').days || 3
    });
    PW.ui.toast(p.name + ' added — ' + money(q.unit) + ' × 1', 'ok');
    PW.ui.openDrawer();
  }

  /* ---------- size comparison bars + table ---------- */
  var maxArea = D.sizes.reduce(function (m, s) { return Math.max(m, s.custom ? 0 : s.w * s.h); }, 1);
  qs('#size-bars').innerHTML = D.sizes.filter(function (s) { return !s.custom; }).map(function (s) {
    var pct = Math.max(4, Math.round((s.w * s.h) / maxArea * 100));
    return '<div class="sizebar__r"><span>' + esc(s.short) + '</span><span class="sizebar__b" title="' + s.w + '×' + s.h + 'mm"><i style="width:' + pct + '%"></i></span><b>' + money(PW.fromPrice(s.id)) + '</b></div>';
  }).join('');

  var readFrom = { a4: '1 m', a3: '2 m', a2: '2.5 m', a1: '4 m', a0: '6 m', i2030: '3 m', i4030: '5 m', i6040: '12 m', custom: 'you decide' };
  qs('#size-table tbody').innerHTML = D.sizes.map(function (s) {
    var mm = s.custom ? 'any' : s.w + ' × ' + s.h;
    var inch = s.custom ? 'any' : (s.w / 25.4).toFixed(1) + ' × ' + (s.h / 25.4).toFixed(1);
    return '<tr><td class="is-key"><a href="#shop" data-jump="' + s.id + '">' + esc(s.label) + '</a> <span class="small">' + esc(s.note) + '</span></td>' +
      '<td class="num">' + mm + '</td><td class="num">' + inch + '</td><td>' + (s.custom ? 'as close as you like' : readFrom[s.id] + ' away') + '</td>' +
      '<td class="num">' + money(PW.fromPrice(s.id)) + '</td></tr>';
  }).join('');
  qsa('[data-jump]').forEach(function (a) {
    a.addEventListener('click', function () {
      state.size = {}; state.size[a.getAttribute('data-jump')] = true;
      qsa('#f-size input').forEach(function (i) { i.checked = state.size[i.value]; });
      render();
      qs('#shop').scrollIntoView({ block: 'start' });
    });
  });

  /* ---------- FAQ (page copy + shared) ---------- */
  var faqHost = qs('#c-faq');
  var faqs = EXTRA_FAQS.concat(D.faqs.slice(0, 4));
  faqHost.innerHTML = faqs.map(function (f, i) {
    return '<div class="acc__item"><h3><button class="acc__q" type="button" aria-expanded="' + (i === 0) + '" aria-controls="cf-' + i + '">' +
      esc(f.q) + '<span class="acc__ic" aria-hidden="true">+</span></button></h3>' +
      '<div class="acc__a' + (i === 0 ? ' is-in' : '') + '" id="cf-' + i + '"' + (i === 0 ? '' : ' hidden') + '><p>' + esc(f.a) + '</p></div></div>';
  }).join('');

  /* ---------- mobile: filters behind a toggle ---------- */
  var tg = qs('#f-toggle'), fl = qs('#filters');
  function mq() { return window.matchMedia('(max-width: 1000px)').matches; }
  function syncToggle() {
    tg.hidden = !mq();
    if (mq()) fl.hidden = !(fl.dataset.open === '1');
    else fl.hidden = false;
  }
  tg.addEventListener('click', function () {
    fl.dataset.open = fl.dataset.open === '1' ? '0' : '1';
    syncToggle();
    if (fl.dataset.open === '1') { var a = qs('#f-size input'); if (a) a.focus(); }
  });
  window.addEventListener('resize', syncToggle);

  render();
  syncToggle();

  // deep-link: #sizes or #faq on load
  if (location.hash) { var t = qs(location.hash); if (t) setTimeout(function () { t.scrollIntoView({ block: 'start' }); }, 60); }
})(window.PW);
