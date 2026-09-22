/* ==========================================================================
   PosterWala — product.js  (live configurator: options, price, ETA, preview)
   ========================================================================== */
(function (PW) {
  'use strict';
  var D = PW.data, esc = PW.esc, qs = PW.qs, qsa = PW.qsa;
  var money = PW.money;
  var GSM = { silk170: 170, silk250: 250, rag310: 310, pvc220: 200, pvc400: 360 };

  var p = PW.product(PW.q('p')) || D.products[3];
  var cfg = {
    sizeId: PW.q('size') || p.sizeId,
    stockId: PW.q('stock') || p.stockId,
    finishId: PW.q('finish') || p.finishId || 'none',
    mountId: PW.q('mount') || 'none',
    rushId: PW.q('rush') || 'std',
    cityId: PW.q('city') || 'lhr',
    rot: PW.q('rot') === 'l' ? 'l' : (PW.size(PW.q('size') || p.sizeId).orientation === 'landscape' ? 'l' : 'p'),
    qty: Math.max(1, parseInt(PW.q('qty'), 10) || 1),
    w: PW.size('custom').defW, h: PW.size('custom').defH
  };
  var file = null;      // {name, size, w, h, thumb, kind}
  var noProof = false;

  /* ---------- option groups ---------- */
  function sizeGroup() {
    qs('#g-size').innerHTML = D.sizes.map(function (s) {
      var q = PW.quote(Object.assign({}, cfg, { sizeId: s.id, qty: cfg.qty }));
      var on = s.id === cfg.sizeId;
      return '<button class="optbtn' + (on ? ' is-on' : '') + '" type="button" data-size="' + s.id + '" aria-pressed="' + on + '">' +
        '<span class="optbtn__tick" aria-hidden="true">✓</span>' +
        '<span class="optbtn__t">' + esc(s.label) + '</span>' +
        '<span class="optbtn__d">' + (s.custom ? 'your mm' : s.w + '×' + s.h + ' mm') + '</span>' +
        '<span class="optbtn__p">' + money(q.unit) + '</span></button>';
    }).join('');
    qsa('[data-size]').forEach(function (b) {
      b.addEventListener('click', function () {
        cfg.sizeId = b.getAttribute('data-size');
        qs('#custom-dims').hidden = !PW.size(cfg.sizeId).custom;
        render();
      });
    });
    qs('#custom-dims').hidden = !PW.size(cfg.sizeId).custom;
  }

  function rotGroup() {
    qs('#g-rot').innerHTML = [['p', 'Portrait'], ['l', 'Landscape']].map(function (r) {
      var on = cfg.rot === r[0];
      return '<button class="optbtn optbtn--wide' + (on ? ' is-on' : '') + '" type="button" data-rot="' + r[0] + '" aria-pressed="' + on + '">' +
        '<span class="optbtn__t">' + r[1] + '</span><span class="optbtn__d">' + (r[0] === 'p' ? '↑' : '→') + ' same price</span></button>';
    }).join('');
    qsa('[data-rot]').forEach(function (b) {
      b.addEventListener('click', function () { cfg.rot = b.getAttribute('data-rot'); render(); });
    });
  }

  function stockGroup() {
    var base = PW.quote(Object.assign({}, cfg, { stockId: 'silk170' })).unit;
    qs('#g-stock').innerHTML = D.stocks.map(function (s) {
      var q = PW.quote(Object.assign({}, cfg, { stockId: s.id }));
      var on = s.id === cfg.stockId;
      var delta = q.unit - base;
      return '<button class="optbtn optbtn--wide' + (on ? ' is-on' : '') + '" type="button" data-stock="' + s.id + '" aria-pressed="' + on + '">' +
        '<span class="optbtn__tick" aria-hidden="true">✓</span>' +
        '<span class="optbtn__t">' + esc(s.label) + (s.badge ? ' <span class="badge' + (on ? '' : ' badge--red') + ' optbtn__b">' + esc(s.badge) + '</span>' : '') +
        '<br><span class="optbtn__d" style="margin-top:4px;display:block;max-width:44ch">' + esc(s.best) + ' · ' + esc(s.life) + '</span></span>' +
        '<span class="optbtn__p">' + (delta > 0 ? '+ ' + money(delta) : 'incl.') + '</span></button>';
    }).join('');
    qsa('[data-stock]').forEach(function (b) {
      b.addEventListener('click', function () { cfg.stockId = b.getAttribute('data-stock'); render(); });
    });
    var st = PW.stock(cfg.stockId);
    qs('#h-stock span:last-child').innerHTML = '<b>' + esc(st.blurb) + '</b>';
  }

  function finishGroup() {
    var st = PW.stock(cfg.stockId);
    var lock = !(st.laminate || st.outdoor);
    var base = PW.quote(Object.assign({}, cfg, { finishId: 'none' })).unit;
    qs('#g-finish').innerHTML = D.finishes.map(function (f) {
      var q = PW.quote(Object.assign({}, cfg, { finishId: f.id }));
      var on = f.id === cfg.finishId;
      var dis = lock && f.id !== 'none';
      var delta = q.unit - base;
      return '<button class="optbtn' + (on ? ' is-on' : '') + '" type="button" data-fin="' + f.id + '"' +
        (dis ? ' disabled aria-disabled="true" style="opacity:.4;cursor:not-allowed"' : '') + ' aria-pressed="' + on + '">' +
        '<span class="optbtn__t">' + esc(f.label) + '</span><span class="optbtn__d">' + esc(f.note) + '</span>' +
        '<span class="optbtn__p">' + (delta > 0 ? '+ ' + money(delta) : 'free') + '</span></button>';
    }).join('');
    qsa('[data-fin]').forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.disabled) { PW.ui.toast('Laminate needs 250gsm Classic Silk or heavier — change stock first', 'warn'); return; }
        cfg.finishId = b.getAttribute('data-fin'); render();
      });
    });
  }

  function mountGroup() {
    var base = PW.quote(Object.assign({}, cfg, { mountId: 'none' })).unit;
    qs('#g-mount').innerHTML = D.mounts.map(function (m) {
      var q = PW.quote(Object.assign({}, cfg, { mountId: m.id }));
      var on = m.id === cfg.mountId;
      var delta = q.unit - base;
      return '<button class="optbtn optbtn--wide' + (on ? ' is-on' : '') + '" type="button" data-mount="' + m.id + '" aria-pressed="' + on + '">' +
        '<span class="optbtn__tick" aria-hidden="true">✓</span>' +
        '<span class="optbtn__t">' + esc(m.label) + '<br><span class="optbtn__d" style="display:block;margin-top:3px">' + esc(m.note) + '</span></span>' +
        '<span class="optbtn__p">' + (delta > 0 ? '+ ' + money(delta) : 'incl.') + '</span></button>';
    }).join('');
    qsa('[data-mount]').forEach(function (b) {
      b.addEventListener('click', function () { cfg.mountId = b.getAttribute('data-mount'); render(); });
    });
  }

  function qtyGroup() {
    var t = PW.quote(Object.assign({}, cfg, { qty: cfg.qty }));
    qs('#qty').value = cfg.qty;
    qs('#v-qty').textContent = cfg.qty + (cfg.qty === 1 ? ' poster' : ' posters');
    qsa('[data-qty]').forEach(function (b) { b.classList.toggle('is-on', +b.getAttribute('data-qty') === cfg.qty); });
    qs('#breaks tbody').innerHTML = D.qtyBreaks.map(function (b) {
      var q = PW.quote(Object.assign({}, cfg, { qty: Math.max(b.min, 1) }));
      var on = cfg.qty >= b.min && (b === D.qtyBreaks[D.qtyBreaks.length - 1] || cfg.qty < D.qtyBreaks[D.qtyBreaks.indexOf(b) + 1].min);
      return '<tr class="' + (on ? 'is-on' : '') + '"><td>' + esc(b.label) + '</td><td>' + (b.off ? '−' + Math.round(b.off * 100) + '%' : '—') + '</td><td>' + money(q.unit) + '</td></tr>';
    }).join('');
    void t;
  }

  function rushGroup() {
    var city = PW.city(cfg.cityId) || D.cities[0];
    qs('#city').innerHTML = D.cities.map(function (c) {
      return '<option value="' + c.id + '"' + (c.id === cfg.cityId ? ' selected' : '') + '>' + esc(c.name) + ' · ' + esc(c.zone) + '</option>';
    }).join('');
    var base = PW.quote(Object.assign({}, cfg, { rushId: 'std' })).unit;
    qs('#g-rush').innerHTML = D.rush.map(function (r) {
      var q = PW.quote(Object.assign({}, cfg, { rushId: r.id }));
      var on = r.id === cfg.rushId;
      var dis = r.lahoreOnly && cfg.cityId !== 'lhr';
      var days = r.days === 0 ? (cfg.cityId === 'lhr' ? 0 : 1) : r.days + (city.zone === 'Zone 1' ? 1 : city.zone === 'Zone 2' ? 2 : 3);
      return '<label class="optcard' + (on ? ' is-on' : '') + '"' + (dis ? ' style="opacity:.45"' : '') + '>' +
        '<input type="radio" name="rush" value="' + r.id + '"' + (on ? ' checked' : '') + (dis ? ' disabled' : '') + '>' +
        '<span><span class="optcard__t">' + esc(r.label) + '</span><br><span class="optcard__d">' + esc(r.note) +
        ' · arrives ' + PW.dateFmt(PW.eta(days)) + (dis ? ' · Lahore &amp; nearby only' : '') + '</span></span>' +
        '<span class="optcard__p">' + (q.unit - base > 0 ? '+ ' + money(q.unit - base) : 'free') + '</span></label>';
    }).join('');
    qsa('[name="rush"]').forEach(function (i) {
      i.addEventListener('change', function () { cfg.rushId = i.value; render(); });
    });
    qs('#city').addEventListener('change', function () { cfg.cityId = this.value; render(); });
  }

  /* ---------- artwork upload ---------- */
  function bindUpload() {
    var drop = qs('#drop'), inp = qs('#file');
    drop.addEventListener('click', function () { inp.click(); });
    drop.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inp.click(); } });
    ['dragenter', 'dragover'].forEach(function (ev) {
      drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('is-over'); });
    });
    ['dragleave', 'drop'].forEach(function (ev) {
      drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove('is-over'); });
    });
    drop.addEventListener('drop', function (e) {
      var f = e.dataTransfer.files && e.dataTransfer.files[0];
      if (f) take(f);
    });
    inp.addEventListener('change', function () { if (inp.files[0]) take(inp.files[0]); });

    function take(f) {
      var okExt = /\.(pdf|png|jpe?g|tif|tiff|ai|psd)$/i.test(f.name);
      if (!okExt) { PW.ui.toast('Unsupported file type — send PDF, PNG, JPG, TIFF, AI or PSD', 'warn'); return; }
      if (f.size > D.artworkRules.maxUploadMb * 1048576) { PW.ui.toast('That file is over 200 MB — split the pages or compress it', 'warn'); return; }
      var isPdf = /\.pdf$/i.test(f.name);
      file = { name: f.name, size: f.size, kind: isPdf ? 'PDF' : (f.type || 'image').split('/')[1] || 'FILE', w: 0, h: 0, thumb: null };
      if (isPdf) { file.w = 2480; file.h = 3508; renderFile(); PW.ui.toast('PDF received — we\'ll check size, bleed and colour by eye', 'ok'); return; }
      var url = URL.createObjectURL(f);
      var img = new Image();
      img.onload = function () {
        file.w = img.naturalWidth; file.h = img.naturalHeight;
        file.thumb = shrink(img, 420);
        renderFile();
        URL.revokeObjectURL(url);
      };
      img.onerror = function () { PW.ui.toast('Could not read that image — send a JPG or PNG instead', 'warn'); };
      img.src = url;
    }

    function shrink(img, max) {
      try {
        var r = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
        var c = document.createElement('canvas');
        c.width = Math.round(img.naturalWidth * r); c.height = Math.round(img.naturalHeight * r);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        return c.toDataURL('image/jpeg', 0.72);
      } catch (e) { return null; }
    }
  }

  function renderFile() {
    var box = qs('#filebox');
    if (!file) {
      box.innerHTML = '';
      qs('#v-art').textContent = 'Not uploaded yet';
      qs('#drop').hidden = false;
      return;
    }
    var d = PW.dims(cfg.sizeId, cfg.w, cfg.h, cfg.rot);
    var chk = file.w ? PW.dpiCheck(file.w, file.h, d.w + 6, d.h + 6) : null;
    var cls = chk ? (chk.verdict === 'low' ? 'q-bad' : chk.verdict === 'usable' ? 'q-mid' : 'q-good') : 'q-good';
    box.innerHTML = '<div class="file"><span class="file__i">' + esc(file.kind) + '</span>' +
      '<div><p class="file__n">' + esc(file.name) + '</p>' +
      '<p class="file__m">' + (file.w ? file.w + ' × ' + file.h + ' px · ' : '') + Math.round(file.size / 1024) + ' KB</p>' +
      (chk ? '<p class="quality"><span class="' + cls + '">' + (chk.verdict === 'low' ? '▲' : '●') + ' ' + esc(chk.label) +
        ' · ' + chk.dpi + ' DPI</span><span style="color:var(--muted)">' + esc(chk.hint) + '</span></p>'
        : '<p class="quality"><span class="q-good">● Vector / page-based file — we\'ll confirm on the proof</span></p>') +
      '</div><button class="file__x" type="button" aria-label="Remove file" id="file-x">×</button></div>' +
      '<div class="bar"><i style="width:' + (chk ? Math.min(100, Math.round(chk.dpi / 3)) : 88) + '%"></i></div>';
    qs('#v-art').textContent = file.name;
    qs('#file-x').addEventListener('click', function () { file = null; renderFile(); render(); });
  }

  /* ---------- preview ---------- */
  function renderPreview() {
    var d = PW.dims(cfg.sizeId, cfg.w, cfg.h, cfg.rot);
    var st = PW.stock(cfg.stockId), fi = PW.finish(cfg.finishId), mo = PW.mount(cfg.mountId);
    var host = qs('#pm-art');
    var ar = (d.w / d.h).toFixed(4);
    host.style.aspectRatio = ar;
    host.innerHTML = file && file.thumb
      ? '<img src="' + file.thumb + '" alt="Your uploaded artwork on the selected poster size" style="width:100%;height:100%;object-fit:cover">'
      : PW.artHTML(p.art).replace('class="art', 'style="height:100%" class="art');

    var m = qs('#pm');
    m.style.background = st.outdoor ? '#141416' : (st.id === 'rag310' ? '#efece4' : '#f1efea');
    m.style.boxShadow = mo.id === 'snap' ? 'inset 0 0 0 10px #17171a, inset 0 0 0 12px #6b6b70, var(--sh-2)'
      : mo.id === 'foam' ? 'inset 0 0 0 14px #e8e2d2, var(--sh-2)'
      : mo.id === 'canvas' ? 'inset 0 0 0 16px #cbb79a, inset 0 0 0 18px #a08a68, var(--sh-2)' : 'var(--sh-2)';
    var shine = m.querySelector('.sheen');
    if (fi.id === 'gloss' || fi.id === 'soft' || fi.id === 'matt') {
      if (!shine) { shine = document.createElement('span'); shine.className = 'sheen'; m.appendChild(shine); }
      shine.style.cssText = 'position:absolute;inset:0;pointer-events:none;mix-blend-mode:screen;background:' +
        (fi.id === 'gloss' ? 'linear-gradient(118deg, transparent 34%, rgba(255,255,255,.42) 46%, rgba(255,255,255,.06) 55%, transparent 66%)'
          : fi.id === 'soft' ? 'linear-gradient(118deg, transparent 30%, rgba(255,255,255,.14) 50%, transparent 72%)'
            : 'linear-gradient(118deg, transparent 20%, rgba(255,255,255,.05) 50%, transparent 80%)');
    } else if (shine) shine.remove();
    m.style.outline = noProof ? '2px dashed var(--red)' : '';

    qs('#pm-cap').innerHTML = '<span class="mono">' + esc(st.label) + ' · ' + esc(fi.label) + ' · ' + esc(mo.label) + '</span> — ' +
      d.label + ' (' + (d.w / 25.4).toFixed(1) + ' × ' + (d.h / 25.4).toFixed(1) + ' in), ' + PW.sqm(d.w, d.h).toFixed(3) + ' m² of printed material per poster.';
    qs('#pm-badge').textContent = p.badge || 'Configured live';
  }

  /* ---------- strip + tabs + related ---------- */
  function renderStrip() {
    var shots = [
      { k: 'art', t: 'Your artwork' },
      { img: 'assets/img/hero-wall.jpg', t: 'On the wall' },
      { img: 'assets/img/shop-window.jpg', t: 'In a window' },
      { img: 'assets/img/paper-stack.jpg', t: 'Paper & cut' },
      { img: 'assets/img/rolled-posters.jpg', t: 'Packed' }
    ];
    var host = qs('#pm-strip');
    host.innerHTML = shots.map(function (s, i) {
      return '<button type="button" class="' + (i === 0 ? 'is-on' : '') + '" data-shot="' + i + '" aria-label="' + esc(s.t) + '">' +
        (s.img ? '<img src="' + s.img + '" alt="" loading="lazy">' : PW.artHTML(p.art)) + '</button>';
    }).join('');
    qsa('[data-shot]', host).forEach(function (b) {
      b.addEventListener('click', function () {
        qsa('[data-shot]', host).forEach(function (x) { x.classList.toggle('is-on', x === b); });
        var i = +b.getAttribute('data-shot'), m = qs('#pm');
        var existing = m.querySelector('img.shot');
        if (existing) existing.remove();
        if (i === 0) { renderPreview(); return; }
        var im = document.createElement('img');
        im.className = 'shot'; im.src = shots[i].img; im.alt = shots[i].t;
        im.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover';
        m.appendChild(im);
      });
    });
  }

  function renderTabs() {
    var st = PW.stock(cfg.stockId), d = PW.dims(cfg.sizeId, cfg.w, cfg.h, cfg.rot);
    var area = PW.sqm(d.w, d.h), weight = Math.round((GSM[st.id] || 200) * area * cfg.qty / 1000 * 10) / 10;
    var q = PW.quote(Object.assign({}, cfg));
    qs('#tp1').innerHTML =
      '<p>' + esc(st.blurb) + ' This is ' + esc(p.name.toLowerCase()) + ' at ' + d.label +
      ' — ' + (d.custom ? 'cut to your millimetres' : PW.size(cfg.sizeId).note.toLowerCase()) + '. ' +
      'Printed to 1200 DPI, trimmed on the Kongsberg, and tube-packed so corners arrive square.</p>' +
      '<p>' + esc(p.badge ? p.badge + '. ' : '') + 'Use it for ' + esc((p.tags || []).slice(0, 3).join(', ').replace(/_/g, ' ')) +
      '. Because we charge by the square metre, going one size up usually costs a few hundred rupees more and buys you four times the distance people can read it from.</p>' +
      '<h4>What you get</h4><ul>' +
      '<li>' + esc(st.label) + ' — ' + esc(st.life) + '</li>' +
      '<li>Free 3mm bleed added by us if your file is short of it</li>' +
      '<li>Colour-managed proof on WhatsApp before the press starts</li>' +
      '<li>' + (st.outdoor ? 'UV-stable inks rated for outdoor exposure' : 'Indoor inks, laminatable for scuff resistance') + '</li>' +
      '<li>Packed in a rigid tube (under A2) or flat board sandwich (A1 and bigger)</li>' +
      '<li>Invoice with your NTN, GST shown separately</li></ul>';

    qs('#tp2').innerHTML = '<div class="tablewrap" style="border:0;border-radius:0;margin:0 -28px -28px"><table class="spec" style="min-width:0">' +
      '<tbody>' +
      row('Finished size', d.label + ' (portrait ' + (cfg.rot === 'l' ? '— flip to portrait' : '✓') + ')') +
      row('Printed area', area.toFixed(3) + ' m² per poster') +
      row('Stock', st.label + ' · ' + (GSM[st.id] || 200) + 'gsm equivalent') +
      row('Finish', PW.finish(cfg.finishId).label + ' — ' + PW.finish(cfg.finishId).note) +
      row('Mounting', PW.mount(cfg.mountId).label) +
      row('Press', area > 0.25 ? 'EFI VUTEk h5, 6 colour + white, up to 1200 DPI' : 'HP Indigo 12000, G7 calibrated') +
      row('Artwork spec', '300 DPI at ' + d.label + ' · ' + (D.artworkRules.bleedMm) + 'mm bleed · CMYK · outlined fonts') +
      row('Recommended file', file ? esc(file.name) + ' — received' : 'PDF/X-1a (PNG or JPG also fine)') +
      row('Shipping weight', weight + ' kg across ' + cfg.qty + ' poster' + (cfg.qty === 1 ? '' : 's')) +
      row('Price here', money(q.unit) + ' each × ' + q.qty + ' = ' + money(q.subtotal) + ' (before GST)') +
      '</tbody></table></div>' +
      '<h4 style="margin-top:18px">Artwork checks we run, free</h4><ul>' +
      '<li>Resolution at final print size, not at the size you exported</li>' +
      '<li>Bleed, trim and 5mm safe margin — we add 3mm bleed for you at no cost</li>' +
      '<li>RGB reds and greens that will dull in CMYK, with a heads-up before print</li>' +
      '<li>Small type in Urdu Nastaliq, nuqta dots and thin rules under 0.25pt</li>' +
      '<li>Fonts not embedded or images placed below 72 DPI</li></ul>';

    qs('#tp3').innerHTML =
      '<p>Printed in ' + PW.rush(cfg.rushId).days + ' working day' + (PW.rush(cfg.rushId).days === 1 ? '' : 's') + ' from proof approval, then ' +
      esc((PW.city(cfg.cityId) || D.cities[0]).eta.toLowerCase()) + '. Estimated arrival for ' + esc((PW.city(cfg.cityId) || D.cities[0]).name) +
      ' on your current config: <b>' + PW.dateFmt(PW.eta(rushDays())) + '</b>.</p>' +
      '<ul><li>Delivery Rs ' + PW.num(D.brand.deliveryFlat) + ' anywhere in Pakistan — free over Rs ' + PW.num(D.brand.freeDeliveryOver) + '</li>' +
      '<li>Lahore: own van, two drops a day, collect available from Gulberg III the same evening</li>' +
      '<li>Karachi: next day by van; Saddar collection counter open till 9pm</li>' +
      '<li>Elsewhere: insured TCS or Leopards, tracking sent on WhatsApp</li>' +
      '<li>Cash on delivery available up to Rs 150,000; above that we take a 40% advance by bank or JazzCash</li></ul>' +
      '<h4>If anything is wrong</h4><p>Print it, post a photo of the parcel and the sheet, and we reprint and re-courier at our cost — decided by a person, not a policy. Keep the faulty copies; there is no point making you box them up. If the artwork was yours and the fault came from your file, we will say so before printing rather than after.</p>';

    var revs = D.testimonials.slice(0, 3).map(function (t) {
      return '<figure class="rev" style="border:1px solid var(--line);border-radius:var(--r);margin-bottom:10px"><p class="rev__q">“' + esc(t.copy) + '”</p>' +
        '<div class="rev__m"><span class="rev__av">' + esc(t.name.split(' ').map(function (w) { return w[0]; }).join('')) + '</span>' +
        '<div><p class="rev__n">' + esc(t.name) + '</p><p class="rev__r">' + esc(t.role) + ' · ' + esc(t.city) + ' · ' + esc(t.product) + '</p></div></div></figure>';
    }).join('');
    qs('#tp4').innerHTML = '<div class="grid grid--3" style="grid-template-columns:1fr">' + revs + '</div>' +
      '<p class="small">Showing 3 of ' + PW.num(p.count) + ' verified reviews for this product. The average across all PosterWala orders is ' + D.brand.rating + '/5.</p>';
    qs('#rev-n').textContent = '(' + PW.num(p.count) + ')';

    function row(k, v) { return '<tr><td class="is-key">' + k + '</td><td>' + v + '</td></tr>'; }
  }

  function rushDays() {
    var r = PW.rush(cfg.rushId);
    var city = PW.city(cfg.cityId) || D.cities[0];
    var extra = city.zone === 'Zone 1' ? 1 : city.zone === 'Zone 2' ? 2 : 3;
    return (r.days === 0 ? 0 : r.days) + extra;
  }

  /* ---------- price + summary ---------- */
  function render() {
    var q = PW.quote(cfg);
    var d = q.dims, s = PW.size(cfg.sizeId);
    qs('#p-title').textContent = s.custom ? 'Custom Size Poster' : s.label + ' ' + (p.name.replace(/^(A\d|20x30|40x30|60x40)\s/i, ''));
    qs('#crumb').textContent = qs('#p-title').textContent;
    document.title = qs('#p-title').textContent + ' — configure & buy | PosterWala';
    qs('#p-strap').textContent = s.blurb + ' Area on this build: ' + PW.sqm(d.w, d.h).toFixed(3) + ' m², priced per square metre — ' + (q.breakOff ? 'so a longer run is cheaper per sheet.' : 'quantity is where the savings are.');
    qs('#p-code').textContent = 'SKU PW-' + s.short.replace(/[^A-Za-z0-9]/g, '') + '-' + PW.stock(cfg.stockId).id.toUpperCase();

    qs('#p-unit').textContent = money(q.unit);
    qs('#p-total').textContent = money(q.subtotal);
    qs('#p-unit-note').textContent = 'per poster · qty ' + q.qty + (q.breakOff ? ' · ' + Math.round(q.breakOff * 100) + '% break applied' : '');
    qs('#p-total-note').textContent = d.label + ' · ' + PW.stock(cfg.stockId).label + (q.finishAmt ? ' · ' + PW.finish(cfg.finishId).label : '') + ' · before GST';
    qs('#add-p').textContent = money(q.subtotal);
    qs('#s-unit').textContent = money(q.unit);
    qs('#s-note').textContent = q.qty + ' × ' + s.label + ' · ' + PW.stock(cfg.stockId).label;
    qs('#s-eta').textContent = 'Arrives ' + PW.dateFmt(PW.eta(rushDays()));
    qs('#v-size').textContent = s.label + ' · ' + d.label;
    qs('#v-stock').textContent = PW.stock(cfg.stockId).label;
    qs('#v-finish').textContent = PW.finish(cfg.finishId).label;
    qs('#v-mount').textContent = PW.mount(cfg.mountId).label;
    qs('#v-rush').textContent = PW.rush(cfg.rushId).label + ' · ' + (PW.rush(cfg.rushId).days || 0) + '+1 courier day';

    var save = q.unitList - q.unit;
    qs('#p-savenote').innerHTML = q.breakOff
      ? '✓ Quantity break active — you save ' + money(save * q.qty) + ' on this order (' + Math.round(q.breakOff * 100) + '% off).'
      : (q.nextBreak ? 'Add ' + q.nextBreak.need + ' more to reach ' + q.nextBreak.at + ' and drop to about ' +
        money(Math.round((q.unitList * (1 - q.nextBreak.off)) / 10) * 10) + ' each — saves ' + money(q.nextBreak.at * (q.unitList - q.unitList * (1 - q.nextBreak.off))) + ' on the run.' : '');

    var goods = q.subtotal;
    var del = goods >= D.brand.freeDeliveryOver ? 0 : D.brand.deliveryFlat;
    qs('#eta-t').textContent = 'Arrives ' + PW.dateFmt(PW.eta(rushDays())) + ' · ' + (PW.city(cfg.cityId) || D.cities[0]).name;
    qs('#eta-s').textContent = PW.rush(cfg.rushId).label + ' · ' + (PW.city(cfg.cityId) || D.cities[0]).zone + ' · ' +
      (del ? 'courier Rs ' + PW.num(del) + ' (free over Rs ' + PW.num(D.brand.freeDeliveryOver) + ')' : 'free delivery unlocked');
    qs('#eta-f').textContent = del ? 'Delivery Rs ' + PW.num(del) : 'Free delivery';
    qs('#eta-f').className = 'eta__o badge ' + (del ? '' : 'badge--ok');

    sizeGroup(); rotGroup(); stockGroup(); finishGroup(); mountGroup(); qtyGroup(); rushGroup();
    renderPreview(); renderFile(); renderTabs();
    var wa = 'https://wa.me/' + D.brand.whatsapp + '?text=' + encodeURIComponent(
      'Hi PosterWala — I want ' + q.qty + ' × ' + s.label + ' poster(s), ' + PW.stock(cfg.stockId).label +
      ', ' + PW.finish(cfg.finishId).label + ', ' + PW.mount(cfg.mountId).label + ', ' + PW.rush(cfg.rushId).label +
      '. Your site quoted ' + money(q.subtotal) + '. Can you confirm?');
    qs('#wa').href = wa;
  }

  /* ---------- events ---------- */
  function bind() {
    qsa('[data-q]').forEach(function (b) {
      b.addEventListener('click', function () {
        var steps = [1, 5, 10, 25, 50, 100, 250, 500];
        var cur = cfg.qty, delta = +b.getAttribute('data-q');
        var i = steps.indexOf(cur);
        if (delta > 0 && i > -1 && i < steps.length - 1) cfg.qty = steps[i + 1];
        else if (delta < 0 && i > 0) cfg.qty = steps[i - 1];
        else cfg.qty = Math.max(1, cur + delta);
        render();
      });
    });
    qs('#qty').addEventListener('input', function () {
      cfg.qty = Math.max(1, Math.min(9999, parseInt(this.value, 10) || 1)); render();
    });
    qsa('[data-qty]').forEach(function (b) {
      b.addEventListener('click', function () { cfg.qty = +b.getAttribute('data-qty'); render(); });
    });
    ['cw', 'ch'].forEach(function (id) {
      qs('#' + id).addEventListener('input', function () {
        cfg.w = clampNum(qs('#cw').value, 594); cfg.h = clampNum(qs('#ch').value, 841); render();
      });
    });
    qs('#noproof').addEventListener('click', function () {
      noProof = !noProof;
      this.textContent = noProof ? 'Proof needed again' : 'Print without a proof';
      PW.ui.toast(noProof ? 'We\'ll press straight from your file — no proof' : 'Proof restored: nothing prints until you say OK', noProof ? 'warn' : 'ok');
      renderPreview();
    });
    qs('#add').addEventListener('click', addToBasket);
    qs('#s-add').addEventListener('click', addToBasket);
    qs('#savecfg').addEventListener('click', function () {
      var url = location.origin + location.pathname + '?' + buildQS();
      var done = function () { PW.ui.toast('Link copied — this exact build, prices and all', 'ok'); };
      var fallback = function () {
        // no clipboard (http or denied): offer a selectable field
        var tmp = document.createElement('textarea');
        tmp.value = url; tmp.setAttribute('readonly', 'readonly');
        tmp.style.cssText = 'position:fixed;top:10px;left:10px;width:1px;height:1px;opacity:0';
        document.body.appendChild(tmp); tmp.select();
        try { document.execCommand('copy'); done(); }
        catch (e) { PW.ui.toast('Copy this link: ' + url, 'warn'); }
        tmp.remove();
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done, fallback);
      } else fallback();
    });
    bindSticky();
  }
  function clampNum(v, f) { var n = parseInt(v, 10); return isNaN(n) ? f : Math.max(80, Math.min(3000, n)); }
  function buildQS() {
    var o = { p: p.slug, size: cfg.sizeId, stock: cfg.stockId, finish: cfg.finishId, mount: cfg.mountId, rush: cfg.rushId, city: cfg.cityId, qty: cfg.qty };
    if (cfg.rot === 'l') o.rot = 'l';
    if (PW.size(cfg.sizeId).custom) { o.cw = cfg.w; o.ch = cfg.h; }
    return Object.keys(o).map(function (k) { return k + '=' + encodeURIComponent(o[k]); }).join('&');
  }

  function addToBasket() {
    var q = PW.quote(cfg);
    var name = qs('#p-title').textContent;
    var line = {
      slug: p.slug, name: name, art: file && file.thumb ? null : p.art, thumb: file && file.thumb ? file.thumb : null,
      file: file ? file.name : null, sizeId: cfg.sizeId, stockId: cfg.stockId, finishId: cfg.finishId,
      mountId: cfg.mountId, rushId: cfg.rushId, cityId: cfg.cityId, rot: cfg.rot, w: cfg.w, h: cfg.h,
      qty: q.qty, unit: q.unit, total: q.subtotal, configSummary: PW.summary(cfg) + (cfg.rot === 'l' ? ' · landscape' : ''),
      rushDays: rushDays(), proof: !noProof
    };
    PW.store.add(line);
    PW.ui.toast(name + ' × ' + q.qty + ' added — ' + money(q.subtotal), 'ok');
    PW.ui.openDrawer();
    history.replaceState(null, '', '?' + buildQS());
  }

  function bindSticky() {
    var bar = qs('#sticky'), buy = qs('#buy');
    if (!('IntersectionObserver' in window)) return;
    var seen = false;
    new IntersectionObserver(function (e) {
      var r = e[0];
      if (r.boundingClientRect.top < 0 && !r.isIntersecting) { bar.classList.add('is-on'); seen = true; }
      else bar.classList.remove('is-on');
      void seen;
    }, { threshold: 0, rootMargin: '0px 0px -20% 0px' }).observe(buy);
  }

  /* ---------- complete the set + related ---------- */
  function renderExtras() {
    var picks = D.accessories.filter(function (a) { return /snap|foam|canvas|frame/i.test(a.name); }).slice(0, 4);
    var q = PW.quote(cfg);
    var combo = picks.slice(0, 2).reduce(function (n, a) { return n + a.from; }, 0) + q.subtotal;
    qs('#set-p').textContent = 'Poster + frame + mount from ' + money(combo) + ' · set up in one order';
    qs('#set-grid').innerHTML = picks.map(function (a, i) {
      return '<article class="card"><a class="card__media" href="posters.html?cat=accessory" style="aspect-ratio:1.2">' +
        (a.img ? '<img src="' + a.img + '" alt="' + esc(a.name) + '" loading="lazy">' : PW.artHTML(PW.artVariants[(i + 3) % PW.artVariants.length])) + '</a>' +
        '<div class="card__body"><h3 class="card__t">' + esc(a.name) + '</h3><p class="card__d">' + esc(a.sub) + '</p>' +
        '<div class="card__foot"><p class="card__p">From<b>' + money(a.from) + '</b></p><span class="badge">Add to order</span></div></div>' +
        '<div class="card__acts"><button class="btn btn--sm btn--ink" type="button" data-set="' + a.slug + '">Add ' + esc(a.name) + '</button></div></article>';
    }).join('');
    qsa('[data-set]').forEach(function (b) {
      b.addEventListener('click', function () {
        var a = null;
        D.accessories.forEach(function (x) { if (x.slug === b.getAttribute('data-set')) a = x; });
        PW.store.add({
          slug: a.slug, name: a.name, art: 'grid', sizeId: cfg.sizeId, stockId: a.slug.indexOf('canvas') > -1 ? 'rag310' : 'silk250',
          finishId: 'none', mountId: 'none', rushId: cfg.rushId, qty: 1, unit: a.from, total: a.from,
          configSummary: a.sub + ' · for your ' + PW.size(cfg.sizeId).label + ' poster', rushDays: rushDays()
        });
        PW.ui.toast(a.name + ' added at ' + money(a.from), 'ok');
      });
    });

    var rel = D.products.filter(function (x) { return x.slug !== p.slug; }).slice(0, 4);
    qs('#rel-grid').innerHTML = rel.map(function (x) {
      var xx = PW.quote({ sizeId: x.sizeId, stockId: x.stockId, finishId: x.finishId || 'none', qty: 1 });
      var ss = PW.size(x.sizeId);
      return '<article class="card"><a class="card__media" href="product.html?p=' + x.slug + '" style="aspect-ratio:' + (ss.custom ? .85 : (ss.w / ss.h).toFixed(3)) + '">' +
        PW.artHTML(x.art) + '</a><div class="card__body"><h3 class="card__t"><a href="product.html?p=' + x.slug + '">' + esc(x.name) + '</a></h3>' +
        '<p class="card__d">' + esc(ss.custom ? 'your mm' : ss.w + '×' + ss.h + ' mm') + ' · ' + esc(PW.stock(x.stockId).label) + '</p>' +
        '<div class="card__foot"><p class="card__p">From<b>' + money(xx.unit) + '</b></p><span class="badge">' + esc(x.turnaround) + '</span></div></div></article>';
    }).join('');

    var faqs = D.faqs.slice(0, 4);
    qs('#p-faq').innerHTML = faqs.map(function (f, i) {
      return '<div class="acc__item"><h3><button class="acc__q" type="button" aria-expanded="false" aria-controls="pf-' + i + '">' +
        esc(f.q) + '<span class="acc__ic" aria-hidden="true">+</span></button></h3>' +
        '<div class="acc__a" id="pf-' + i + '" hidden><p>' + esc(f.a) + '</p></div></div>';
    }).join('');
    PW.ui.tabs();
    PW.ui.accordion();
  }

  /* ---------- boot ---------- */
  if (PW.q('cw')) { cfg.w = +PW.q('cw') || cfg.w; cfg.h = +PW.q('ch') || cfg.h; }
  qs('#cw').value = cfg.w; qs('#ch').value = cfg.h;
  bind(); renderStrip(); renderExtras(); render();
})(window.PW);
