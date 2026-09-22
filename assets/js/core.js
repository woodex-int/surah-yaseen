/* ==========================================================================
   PosterWala — core: pricing engine, basket store, shared UI
   Everything stateful lives here so the shop grid, PDP, studio and basket
   all read the same numbers. No dependencies, no build step.
   ========================================================================== */
window.PW = window.PW || {};
(function (PW) {
  'use strict';

  var D = PW.data;

  /* ---------- tiny helpers --------------------------------------------- */
  var qs = function (s, r) { return (r || document).querySelector(s); };
  var qsa = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var num = function (n) { return (n || '').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  PW.qs = qs; PW.qsa = qsa; PW.num = num; PW.clamp = clamp; PW.esc = esc;

  /* safe storage (private modes / blocked file:// origins throw on access) */
  function lsGet(store, k) { try { return window[store].getItem(k); } catch (e) { return null; } }
  function lsSet(store, k, v) { try { window[store].setItem(k, v); return true; } catch (e) { return false; } }
  function lsDel(store, k) { try { window[store].removeItem(k); } catch (e) { } }
  PW.ls = { get: lsGet, set: lsSet, del: lsDel };

  PW.q = function (k) {
    try { return new URLSearchParams(location.search).get(k); } catch (e) { return null; }
  };

  /* ---------- lookups --------------------------------------------------- */
  var by = function (arr, id) {
    for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i];
    return null;
  };
  PW.size = function (id) { return by(D.sizes, id) || D.sizes[3]; };
  PW.stock = function (id) { return by(D.stocks, id) || D.stocks[0]; };
  PW.finish = function (id) { return by(D.finishes, id) || D.finishes[0]; };
  PW.mount = function (id) { return by(D.mounts, id) || D.mounts[0]; };
  PW.rush = function (id) { return by(D.rush, id) || D.rush[0]; };
  PW.product = function (slug) {
    for (var i = 0; i < D.products.length; i++) if (D.products[i].slug === slug) return D.products[i];
    return null;
  };
  PW.city = function (id) {
    for (var i = 0; i < D.cities.length; i++) if (D.cities[i].id === id) return D.cities[i];
    return null;
  };

  /* ---------- geometry -------------------------------------------------- */
  // Dimensions of a config in mm (custom sizes carry their own numbers)
  PW.dims = function (sizeId, cw, ch, rot) {
    var s = PW.size(sizeId);
    if (s.custom) {
      var w = Math.max(80, Math.round(cw || s.defW || 420)), h = Math.max(80, Math.round(ch || s.defH || 594));
      if (rot === 'l' && h > w) { var t0 = w; w = h; h = t0; }
      return { w: w, h: h, custom: true, label: w + ' × ' + h + ' mm' };
    }
    var w2 = s.w, h2 = s.h;
    if (rot === 'l') { w2 = s.h; h2 = s.w; }
    return { w: w2, h: h2, custom: false, label: w2 + ' × ' + h2 + ' mm' };
  };

  PW.sqm = function (w, h) { return (w * h) / 1e6; };

  /* ---------- PRICING ENGINE -------------------------------------------
     unit = max(size minimum, area × substrate rate × customUplift)
            + area × laminate rate
            + max(mount rate × area, mount minimum)
            then × (1 + rush uplift)
     total = unit × qty × (1 − quantity break), rounded to Rs 10
  ------------------------------------------------------------------ */
  PW.quote = function (cfg) {
    var P = D.pricing;
    var sizeId = cfg.sizeId || 'a1';
    var s = PW.size(sizeId);
    var d = PW.dims(sizeId, cfg.w, cfg.h, cfg.rot);
    var area = PW.sqm(d.w, d.h);

    var rate = P.rates[cfg.stockId || 'silk170'];
    if (rate == null) rate = P.rates.silk170;
    if (s.custom) rate *= s.rateBoost;

    var print = area * rate;
    var printFloor = s.min || 0;
    var printAmt = Math.max(printFloor, print);

    var fin = PW.finish(cfg.finishId || 'none');
    var finishAmt = (P.finishes[fin.id] ? P.finishes[fin.id].rate : 0) * area;

    var mo = PW.mount(cfg.mountId || 'none');
    var mRule = P.mounts[mo.id] || { rate: 0, min: 0 };
    var mountAmt = Math.max(mRule.min || 0, mRule.rate * area);
    if (mo.id === 'none') mountAmt = 0;

    var r = PW.rush(cfg.rushId || 'std');
    var sub = printAmt + finishAmt + mountAmt;
    var rushAmt = sub * (P.rush[r.id] || 0);
    var unit = sub + rushAmt;

    var qty = clamp(parseInt(cfg.qty, 10) || 1, 1, 99999);
    var brk = PW.breakFor(qty);
    var disc = unit * brk.off;
    var unitNet = unit - disc;

    var round = P.roundTo || 10;
    var unitR = Math.round(unitNet / round) * round;
    var total = unitR * qty;

    return {
      dims: d, area: area, qty: qty,
      unitList: Math.round(unit / round) * round,
      unit: unitR,
      breakOff: brk.off,
      breakLabel: brk.label,
      line: [
        { k: 'Print — ' + d.label + ' on ' + PW.stock(cfg.stockId).label, v: Math.round(printAmt / round) * round, note: area.toFixed(3) + ' m²' },
        finishAmt ? { k: fin.label, v: Math.round(finishAmt / round) * round, note: 'per m²' } : null,
        mountAmt ? { k: mo.label, v: Math.round(mountAmt / round) * round, note: 'per poster' } : null,
        rushAmt ? { k: r.label + ' turnaround', v: Math.round(rushAmt / round) * round, note: '+' + Math.round((P.rush[r.id] || 0) * 100) + '%' } : null
      ].filter(Boolean),
      printAmt: Math.round(printAmt / round) * round,
      finishAmt: Math.round(finishAmt / round) * round,
      mountAmt: Math.round(mountAmt / round) * round,
      rushAmt: Math.round(rushAmt / round) * round,
      discount: Math.round((disc * qty) / round) * round,
      subtotal: total,
      nextBreak: PW.nextBreak(qty)
    };
  };

  PW.breakFor = function (qty) {
    var out = D.qtyBreaks[0];
    for (var i = 0; i < D.qtyBreaks.length; i++) if (qty >= D.qtyBreaks[i].min) out = D.qtyBreaks[i];
    return out;
  };

  PW.nextBreak = function (qty) {
    for (var i = 0; i < D.qtyBreaks.length; i++) {
      if (qty < D.qtyBreaks[i].min) {
        var prev = D.qtyBreaks[i - 1] || { off: 0 };
        return { need: D.qtyBreaks[i].min - qty, at: D.qtyBreaks[i].min, off: D.qtyBreaks[i].off, from: prev.off };
      }
    }
    return null;
  };

  // "From" price of a size at its cheapest legal config (custom = smallest cut)
  PW.fromPrice = function (sizeId) {
    var sz = PW.size(sizeId), cfg = { sizeId: sizeId, stockId: 'silk170', qty: 1 };
    if (sz.custom && sz.minCut) { cfg.w = sz.minCut.w; cfg.h = sz.minCut.h; }
    return PW.quote(cfg).unit;
  };

  PW.money = function (n) {
    n = Math.round(n || 0);
    return 'Rs ' + num(n);
  };
  PW.fmt = PW.money;

  /* ---------- delivery estimate (working days, Sun off) ---------------- */
  PW.eta = function (days, from) {
    var d = from ? new Date(from) : new Date();
    d = new Date(d.getTime());
    var left = Math.max(0, days | 0);
    while (left > 0) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0) left--;
    }
    return d;
  };
  PW.dateFmt = function (d) {
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var mons = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return days[d.getDay()] + ' ' + d.getDate() + ' ' + mons[d.getMonth()];
  };

  /* ---------- artwork DPI checker -------------------------------------- */
  PW.dpiCheck = function (pxW, pxH, mmW, mmH) {
    var inW = mmW / 25.4, inH = mmH / 25.4;
    var dpi = Math.min(pxW / inW, pxH / inH);
    var R = D.artworkRules;
    var verdict = dpi >= R.idealDpi ? 'excellent' : dpi >= 220 ? 'good' : dpi >= R.minDpi ? 'usable' : 'low';
    return {
      dpi: Math.round(dpi), verdict: verdict,
      label: { excellent: 'Press-ready', good: 'Good', usable: 'Usable — slightly soft', low: 'Too low-resolution' }[verdict],
      hint: verdict === 'low'
        ? 'Upscale or re-export at ' + Math.ceil(R.idealDpi * inW) + 'px wide for a crisp print.'
        : Math.round(dpi) + ' DPI at ' + Math.round(mmW) + '×' + Math.round(mmH) + 'mm'
    };
  };

  /* =======================================================================
     BASKET STORE
     ===================================================================== */
  var KEY = 'pw_basket_v2';
  var listeners = [];

  var mem = [];
  function read() {
    try {
      var raw = lsGet('localStorage', KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : (mem.length ? mem : []);
    } catch (e) { return mem; }
  }
  function write(lines) {
    mem = lines;
    if (!lsSet('localStorage', KEY, JSON.stringify(lines))) {
      try {
        lsSet('localStorage', KEY, JSON.stringify(lines.map(function (l) {
          var c = Object.assign({}, l);
          if (c.thumb && c.thumb.length > 60000) { c.thumb = null; c.art = c.art || 'grid'; }
          return c;
        })));
      } catch (e) { /* memory only */ }
    }
    listeners.forEach(function (fn) { try { fn(lines); } catch (e) {} });
  }

  PW.store = {
    all: read,
    each: function (fn) { listeners.push(fn); fn(read()); },
    add: function (line) {
      var lines = read();
      var sig = line.signature || [line.slug || 'poster', line.sizeId, line.stockId, line.finishId, line.mountId, line.rushId, line.w || '', line.h || '', line.qty].join('|');
      var found = null;
      for (var i = 0; i < lines.length; i++) if (lines[i].signature === sig) found = lines[i];
      if (found) {
        found.qty = clamp(found.qty + (line.qty || 1), 1, 99999);
        found.quote = line.quote || found.quote;
        if (line.thumb) found.thumb = line.thumb;
        if (line.file) found.file = line.file;
      } else {
        lines.push(Object.assign({ id: 'l' + Date.now() + Math.random().toString(36).slice(2, 6) }, line, { signature: sig }));
      }
      write(lines);
      return sig;
    },
    setQty: function (id, qty) {
      var lines = read();
      lines.forEach(function (l) { if (l.id === id) l.qty = clamp(qty, 1, 99999); });
      write(lines);
    },
    update: function (id, patch) {
      var lines = read();
      lines.forEach(function (l) { if (l.id === id) Object.assign(l, patch); });
      write(lines);
    },
    remove: function (id) { write(read().filter(function (l) { return l.id !== id; })); },
    clear: function () { write([]); },
    count: function () { return read().reduce(function (n, l) { return n + l.qty; }, 0); },
    totals: function (opts) {
      opts = opts || {};
      var lines = read();
      var goods = lines.reduce(function (n, l) { return n + l.total; }, 0);
      var rush = lines.length ? lines[0].rushDays || 3 : 3;
      var delivery = goods === 0 ? 0 : (opts.pickup || goods >= D.brand.freeDeliveryOver ? 0 : D.brand.deliveryFlat);
      var promoOff = 0;
      if (opts.promo && String(opts.promo).toUpperCase() === D.brand.promo.code) promoOff = Math.round(goods * D.brand.promo.off);
      var taxable = Math.max(0, goods - promoOff);
      var gst = Math.round(taxable * D.brand.gstRate);
      return {
        lines: lines, items: lines.length, pieces: lines.reduce(function (n, l) { return n + l.qty; }, 0),
        goods: goods, discount: promoOff, delivery: delivery, gst: gst,
        total: taxable + delivery + gst, rushDays: rush,
        freeDeliveryGap: delivery ? D.brand.freeDeliveryOver - goods : 0
      };
    }
  };

  /* =======================================================================
     SHARED UI — header, drawer, toasts, reveal, counters, accordion, search
     ===================================================================== */
  var ui = PW.ui = {};
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  PW.reduceMotion = reduceMotion;

  /* --- toast --- */
  var toastHost;
  ui.toast = function (msg, kind) {
    if (!toastHost) {
      toastHost = document.createElement('div');
      toastHost.className = 'toast-host';
      toastHost.setAttribute('role', 'status');
      toastHost.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastHost);
    }
    var t = document.createElement('div');
    t.className = 'toast' + (kind ? ' toast--' + kind : '');
    t.innerHTML = (kind === 'ok' ? '<span class="toast__i">✓</span>' : kind === 'warn' ? '<span class="toast__i">!</span>' : '<span class="toast__i">•</span>') + '<span>' + esc(msg) + '</span>';
    toastHost.appendChild(t);
    setTimeout(function () { t.classList.add('is-out'); }, 3200);
    setTimeout(function () { t.remove(); }, 3600);
  };

  /* --- basket drawer (built here, shared by every page) --- */
  function buildDrawer() {
    if (qs('#pw-drawer')) return;
    var d = document.createElement('aside');
    d.id = 'pw-drawer';
    d.className = 'drawer';
    d.setAttribute('aria-hidden', 'true');
    d.setAttribute('aria-label', 'Basket');
    d.innerHTML =
      '<div class="drawer__head"><h2 class="drawer__title">Your basket</h2>' +
      '<button class="drawer__x" type="button" aria-label="Close basket" data-close-drawer>×</button></div>' +
      '<div class="drawer__body" id="drawer-body"></div>' +
      '<div class="drawer__foot" id="drawer-foot"></div>';
    document.body.appendChild(d);
    qsa('[data-close-drawer]', d).forEach(function (b) {
      b.addEventListener('click', ui.closeDrawer);
    });

    var scrim = document.createElement('div');
    scrim.className = 'scrim';
    scrim.id = 'pw-scrim';
    scrim.hidden = true;
    document.body.appendChild(scrim);
    scrim.addEventListener('click', ui.closeDrawer);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { ui.closeDrawer(); ui.closeSearch(); }
    });
    return d;
  }

  ui.renderDrawer = function () {
    var body = qs('#drawer-body'), foot = qs('#drawer-foot');
    if (!body) return;
    var t = PW.store.totals();
    if (!t.lines.length) {
      body.innerHTML =
        '<div class="drawer__empty"><p class="drawer__empty-t">Nothing in here yet.</p>' +
        '<p class="drawer__empty-s">Pick a size, or design a poster in the studio — it takes about four minutes.</p>' +
        '<div class="drawer__empty-acts"><a class="btn btn--red btn--sm" href="posters.html">Shop sizes</a>' +
        '<a class="btn btn--ghost btn--sm" href="design-studio.html">Design online</a></div></div>';
      foot.innerHTML = '';
      return;
    }
    body.innerHTML = t.lines.map(function (l) {
      return '<div class="dline">' + thumbHTML(l, 56) +
        '<div class="dline__m"><p class="dline__n">' + esc(l.name) + '</p>' +
        '<p class="dline__c">' + esc(l.configSummary || '') + '</p>' +
        '<p class="dline__p">' + PW.money(l.unit) + ' × ' + l.qty + '</p></div>' +
        '<button class="dline__x" data-rm="' + l.id + '" aria-label="Remove ' + esc(l.name) + '">×</button></div>';
    }).join('');
    foot.innerHTML =
      '<div class="drawer__row"><span>Subtotal (' + t.pieces + ' poster' + (t.pieces === 1 ? '' : 's') + ')</span><b>' + PW.money(t.goods) + '</b></div>' +
      (t.freeDeliveryGap > 0
        ? '<p class="drawer__hint">Add ' + PW.money(t.freeDeliveryGap) + ' more for free delivery</p>'
        : '<p class="drawer__hint drawer__hint--ok">Free delivery unlocked</p>') +
      '<div class="drawer__acts"><a class="btn btn--ink btn--block" href="basket.html">Review &amp; checkout</a>' +
      '<button class="btn btn--ghost btn--block" data-close-drawer type="button">Keep shopping</button></div>';

    qsa('[data-rm]', body).forEach(function (b) {
      b.addEventListener('click', function () {
        PW.store.remove(b.getAttribute('data-rm'));
        ui.toast('Removed from basket');
      });
    });
    var c = qs('[data-close-drawer]', foot);
    if (c) c.addEventListener('click', ui.closeDrawer);
  };

  ui.openDrawer = function () {
    buildDrawer();
    ui.renderDrawer();
    qs('#pw-drawer').classList.add('is-open');
    qs('#pw-scrim').hidden = false;
    requestAnimationFrame(function () { qs('#pw-scrim').classList.add('is-on'); });
    document.documentElement.classList.add('no-scroll');
    var f = qs('#pw-drawer .btn');
    if (f) f.focus();
  };
  ui.closeDrawer = function () {
    var d = qs('#pw-drawer'); if (!d) return;
    d.classList.remove('is-open');
    var s = qs('#pw-scrim');
    if (s) { s.classList.remove('is-on'); setTimeout(function () { s.hidden = true; }, 220); }
    document.documentElement.classList.remove('no-scroll');
  };
  ui.refreshBasketBadges = function () {
    var n = PW.store.count();
    qsa('[data-basket-count]').forEach(function (el) {
      el.textContent = n;
      el.classList.toggle('is-hidden', n === 0);
    });
    qsa('[data-basket-total]').forEach(function (el) {
      el.textContent = PW.money(PW.store.totals().total);
    });
    if (qs('#pw-drawer') && qs('#pw-drawer').classList.contains('is-open')) ui.renderDrawer();
  };

  /* --- poster art thumbnails (pure CSS compositions, no photos) --- */
  var ART = {
    sale: { kick: 'END OF SEASON', head: '50<span>%</span>', sub: 'ALL LAWN · TILL SUNDAY', tone: 'cream' },
    gig: { kick: 'LIVE · 8PM', head: 'ROUND<br>ROOM', sub: 'COKE STUDIO SESSIONS', tone: 'red' },
    eid: { kick: 'FROM ALL OF US', head: 'EID<br>MUBARAK', sub: 'SHOWROOM CLOSED 21–23 JUNE', tone: 'ink' },
    open: { kick: 'SATURDAY 4 OCT', head: 'GRAND<br>OPENING', sub: 'SAFFRON CYCLES · MM ALAM RD', tone: 'cream' },
    cricket: { kick: '14 TEAMS · FREE ENTRY', head: 'SIXER<br>CUP 26', sub: 'GADDAFI TURF · FINAL 5PM', tone: 'ink' },
    cinema: { kick: 'NOW SHOWING', head: 'THE<br>LONG<br>NIGHT', sub: 'IMAX · 7PM · AWARE', tone: 'ink' },
    'cinema-dark': { kick: 'SNEAK PREVIEW', head: 'DUNE<br>LINE', sub: '40×30 · CINEMA SIZE', tone: 'ink2' },
    realty: { kick: 'TO LET', head: '5 MARLA<br>3 BED', sub: 'DHA PHASE 5 · Rs 145,000/MO', tone: 'cream' },
    menu: { kick: 'WATERPROOF', head: 'LUNCH<br>MENU', sub: '12PM–4PM · Rs 390', tone: 'red' },
    festival: { kick: 'WEEKEND', head: 'STREET<br>FOOD', sub: '42 STALLS · DHA CIVIC', tone: 'cream' },
    abstract: { kick: 'FINE-ART RAG 310GSM', head: 'RED,<br>BLACK &<br>CREAM', sub: 'EDITION OF 25', tone: 'cream' },
    grid: { kick: 'ANY MILLIMETRE', head: 'CUSTOM<br>SIZE', sub: 'CUT ON THE KONGSBERG', tone: 'ink' }
  };

  function thumbHTML(l, size) {
    if (l.thumb) {
      return '<span class="thumb thumb--img" style="--ts:' + size + 'px"><img src="' + l.thumb + '" alt=""></span>';
    }
    return '<span class="thumb" style="--ts:' + size + 'px">' + artHTML(l.art || 'grid') + '</span>';
  }
  PW.thumbHTML = thumbHTML;

  function artHTML(variant) {
    var a = ART[variant] || ART.grid;
    return '<span class="art art--' + variant + '" data-tone="' + a.tone + '" aria-hidden="true">' +
      '<span class="art__kick">' + a.kick + '</span>' +
      '<span class="art__head">' + a.head + '</span>' +
      '<span class="art__bar"></span>' +
      '<span class="art__sub">' + a.sub + '</span></span>';
  }
  PW.artHTML = artHTML;
  PW.artVariants = Object.keys(ART);

  /* --- scroll reveal --- */
  ui.reveal = function (root) {
    var els = qsa('[data-reveal]', root || document);
    if (!('IntersectionObserver' in window) || reduceMotion) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    els.forEach(function (el, i) {
      el.style.setProperty('--i', (i % 6));
      io.observe(el);
    });
  };

  /* --- counters --- */
  ui.counters = function (root) {
    qsa('[data-count]', root || document).forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var pre = el.getAttribute('data-prefix') || '';
      var suf = el.getAttribute('data-suffix') || '';
      function paint(v) {
        el.textContent = pre + num(Math.round(v)) + suf;
      }
      if (reduceMotion || !('IntersectionObserver' in window)) { paint(target); return; }
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) {
          if (!en.isIntersecting) return;
          io.disconnect();
          var t0 = performance.now(), dur = 1400;
          (function tick(now) {
            var p = clamp((now - t0) / dur, 0, 1);
            paint(target * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(tick);
          })(t0);
        });
      }, { threshold: 0.4 });
      io.observe(el);
    });
  };

  /* --- accordions --- */
  ui.accordion = function (root) {
    qsa('.acc__q', root || document).forEach(function (btn) {
      if (btn.dataset.acc) return;
      btn.dataset.acc = '1';
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!panel) return;
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
        panel.hidden = open;
        if (!open) panel.classList.add('is-in');
      });
    });
  };

  /* --- tabs --- */
  ui.tabs = function (root) {
    qsa('[data-tabs]', root || document).forEach(function (wrap) {
      var btns = qsa('[role="tab"]', wrap);
      btns.forEach(function (b) {
        b.addEventListener('click', function () {
          btns.forEach(function (x) {
            var on = x === b;
            x.setAttribute('aria-selected', String(on));
            x.classList.toggle('is-on', on);
            var p = document.getElementById(x.getAttribute('aria-controls'));
            if (p) p.hidden = !on;
          });
        });
        b.addEventListener('keydown', function (e) {
          var i = btns.indexOf(b), j = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : -1;
          if (j < 0) return;
          e.preventDefault();
          var n = btns[(j + btns.length) % btns.length];
          n.focus(); n.click();
        });
      });
    });
  };

  /* --- marquee pausing on hover/focus + reduced motion --- */
  ui.marquee = function () {
    qsa('.marquee').forEach(function (m) {
      if (reduceMotion) { m.classList.add('is-static'); return; }
      m.addEventListener('mouseenter', function () { m.classList.add('is-paused'); });
      m.addEventListener('mouseleave', function () { m.classList.remove('is-paused'); });
      m.addEventListener('focusin', function () { m.classList.add('is-paused'); });
      m.addEventListener('focusout', function () { m.classList.remove('is-paused'); });
    });
  };

  /* --- header behaviour: mobile nav, drawer, search palette --- */
  function headerInit() {
    var burger = qs('[data-burger]');
    var nav = qs('#pw-nav');
    if (burger && nav) {
      burger.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        burger.setAttribute('aria-expanded', String(open));
        document.documentElement.classList.toggle('no-scroll', open);
      });
      qsa('a', nav).forEach(function (a) {
        a.addEventListener('click', function () { nav.classList.remove('is-open'); document.documentElement.classList.remove('no-scroll'); });
      });
    }
    qsa('[data-open-drawer]').forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); ui.openDrawer(); });
    });
    var bar = qs('[data-promo-close]');
    if (bar) bar.addEventListener('click', function () {
      var el = qs('[data-promo]'); if (el) { el.style.display = 'none'; PW.ls.set('sessionStorage', 'pw_promo', '0'); }
    });
    if (PW.ls.get('sessionStorage', 'pw_promo') === '0') { var p = qs('[data-promo]'); if (p) p.style.display = 'none'; }

    qsa('[data-search-btn]').forEach(function (b) { b.addEventListener('click', ui.openSearch); });
  }

  /* --- search palette over the whole catalogue --- */
  var searchEl;
  ui.openSearch = function () {
    if (!searchEl) {
      searchEl = document.createElement('div');
      searchEl.className = 'omni';
      searchEl.id = 'pw-search';
      searchEl.innerHTML =
        '<div class="omni__scrim" data-close></div>' +
        '<div class="omni__panel" role="dialog" aria-modal="true" aria-label="Search PosterWala">' +
        '<div class="omni__top"><span aria-hidden="true">⌕</span>' +
        '<input id="omni-q" type="search" placeholder="Search sizes, stocks, products, help…" autocomplete="off" spellcheck="false">' +
        '<kbd>esc</kbd></div><div class="omni__res" id="omni-res"></div></div>';
      document.body.appendChild(searchEl);
      searchEl.addEventListener('click', function (e) { if (e.target.hasAttribute('data-close')) ui.closeSearch(); });
      var input = qs('#omni-q', searchEl);
      input.addEventListener('input', function () { runSearch(input.value); });
      input.addEventListener('keydown', function (e) {
        var items = qsa('.omni__i', searchEl);
        var cur = items.findIndex ? items.findIndex(function (x) { return x === document.activeElement; }) : -1;
        if (e.key === 'ArrowDown') { e.preventDefault(); (items[cur + 1] || items[0]).focus(); }
        if (e.key === 'ArrowUp') { e.preventDefault(); (items[cur - 1] || items[items.length - 1]).focus(); }
        if (e.key === 'Enter' && cur === -1 && items[0]) { e.preventDefault(); location.href = items[0].getAttribute('href'); }
      });
    }
    searchEl.classList.add('is-open');
    document.documentElement.classList.add('no-scroll');
    setTimeout(function () { qs('#omni-q', searchEl).focus(); }, 30);
    runSearch('');
  };
  ui.closeSearch = function () {
    if (!searchEl) return;
    searchEl.classList.remove('is-open');
    document.documentElement.classList.remove('no-scroll');
  };

  function searchIndex() {
    var idx = [];
    D.sizes.forEach(function (s) {
      idx.push({ t: s.label + ' posters', k: s.note + ' · ' + (s.custom ? 'your own mm' : s.w + '×' + s.h + 'mm'), h: 'posters.html?size=' + s.id, g: 'Size' });
    });
    D.stocks.forEach(function (s) {
      idx.push({ t: s.label, k: s.best, h: 'posters.html?stock=' + s.id, g: 'Stock' });
    });
    D.products.forEach(function (p) {
      idx.push({ t: p.name, k: 'From ' + PW.money(PW.fromPrice(p.sizeId)) + ' · ' + p.turnaround, h: 'product.html?p=' + p.slug, g: 'Product' });
    });
    D.accessories.forEach(function (a) {
      idx.push({ t: a.name, k: a.sub, h: 'posters.html?cat=accessory', g: 'Accessory' });
    });
    idx.push({ t: 'Design Studio', k: 'Build a poster in the browser, 10 free templates', h: 'design-studio.html', g: 'Tool' });
    idx.push({ t: 'Basket & checkout', k: 'Cash on delivery, JazzCash, Easypaisa, bank', h: 'basket.html', g: 'Account' });
    D.faqs.forEach(function (f, i) {
      idx.push({ t: f.q, k: f.a.slice(0, 92) + '…', h: 'posters.html#faq', g: 'Help' });
    });
    idx.push({ t: 'Delivery across Pakistan', k: '74 cities, 2–3 days, free over Rs 5,000', h: 'index.html#delivery', g: 'Help' });
    idx.push({ t: 'Bulk & trade pricing', k: '5+ 8% off, 10+ 15%, 25+ 22%, 50+ 30%', h: 'index.html#trade', g: 'Help' });
    return idx;
  }
  var IDX = null;
  function runSearch(qv) {
    IDX = IDX || searchIndex();
    var out = qs('#omni-res', searchEl);
    var t = (qv || '').trim().toLowerCase();
    var hits = !t ? IDX.filter(function (i) { return i.g !== 'Help'; }).slice(0, 9)
      : IDX.filter(function (i) { return (i.t + ' ' + i.k + ' ' + i.g).toLowerCase().indexOf(t) > -1; }).slice(0, 14);
    out.innerHTML = hits.length
      ? hits.map(function (i) {
        return '<a class="omni__i" href="' + i.h + '"><span class="omni__g">' + i.g + '</span><span class="omni__t">' + esc(i.t) + '</span><span class="omni__k">' + esc(i.k) + '</span></a>';
      }).join('')
      : '<p class="omni__none">Nothing matches “' + esc(qv) + '”. Try “A1”, “waterproof”, “custom size”.</p>';
  }

  /* --- config summary text used in drawer + basket lines --- */
  PW.summary = function (cfg) {
    var bits = [];
    bits.push(PW.size(cfg.sizeId).label);
    bits.push(PW.stock(cfg.stockId).label.replace(/^(170gsm|250gsm|310gsm|220mic|400mic)\s/, ''));
    if (cfg.finishId && cfg.finishId !== 'none') bits.push(PW.finish(cfg.finishId).label);
    if (cfg.mountId && cfg.mountId !== 'none') bits.push(PW.mount(cfg.mountId).label);
    if (cfg.rushId && cfg.rushId !== 'std') bits.push(PW.rush(cfg.rushId).label);
    if (cfg.file) bits.push(cfg.file);
    return bits.join(' · ');
  };

  /* --- boot --- */
  PW.boot = function () {
    headerInit();
    buildDrawer();
    PW.store.each(function () { ui.refreshBasketBadges(); });
    ui.reveal();
    ui.counters();
    ui.accordion();
    ui.tabs();
    ui.marquee();
    document.addEventListener('pw:basket', function () { ui.refreshBasketBadges(); });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', PW.boot);
  else PW.boot();
})(window.PW);
