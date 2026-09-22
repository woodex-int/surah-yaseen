/* ==========================================================================
   PosterWala — studio.js  (canvas poster editor + live print pricing)
   Units: 1 = one trim width. Poster height in units = mm.h / mm.w.
   Every element is stored as a box whose CENTRE is (x, y), so preview,
   export and basket thumbnail all come out of one paint() function.
   ========================================================================== */
(function (PW) {
  'use strict';
  var D = PW.data, qs = PW.qs, qsa = PW.qsa, esc = PW.esc;
  var cv = qs('#cv'), ctx = cv.getContext('2d'), stage = qs('#cstage'), wrap = qs('#st-wrap');
  var MAXW = 1000;                       // preview render width (px)
  var BLEED = D.artworkRules.bleedMm;    // mm added on export

  var doc = {
    bg: '#f5f2ec', accent: '#e4002b', pattern: 'none', tpl: null,
    sizeId: PW.q('s') || 'a1', stockId: PW.q('stock') || 'silk250',
    finishId: 'none', mountId: 'none', rushId: 'std', qty: 1, w: 0, h: 0, objs: []
  };
  if (PW.size(doc.sizeId).custom) { doc.w = PW.size('custom').defW; doc.h = PW.size('custom').defH; }
  if (PW.q('tpl')) doc.tpl = PW.q('tpl');

  var sel = null, undoStack = [], redoStack = [], zoom = 1, imgs = {}, uid = 1;

  /* ---------------- geometry ---------------- */
  function mm() { return PW.dims(doc.sizeId, doc.w, doc.h); }
  function ratio() { var d = mm(); return d.h / d.w; }
  function trimH(W) { return Math.round(W * ratio()); }
  function padOf(W) { return Math.round(W * (BLEED / mm().w)); }
  function sc() { return cv.getBoundingClientRect().width / (MAXW + 2 * padOf(MAXW)); }

  /* ---------------- paint: the one renderer ---------------- */
  function paint(c, W, withBleed) {
    var H = trimH(W), pad = withBleed ? padOf(W) : 0, full = W + pad * 2;
    c.save();
    c.fillStyle = doc.bg; c.fillRect(0, 0, full, H + pad * 2);
    c.translate(pad, pad);
    drawPat(c, W, H);
    doc.objs.forEach(function (o) {
      c.save();
      c.translate(o.x * W, o.y * W);
      c.rotate((o.rot || 0) * Math.PI / 180);
      if (o.type === 'img') drawImg(c, o, W); else drawText(c, o, W);
      c.restore();
    });
    c.restore();
  }

  /* ---------------- placeholder ---------------- */
  function drawPlaceholder(c, W, H) {
    c.save();
    c.textAlign = 'center'; c.fillStyle = lum(doc.bg) > 140 ? 'rgba(12,12,13,.5)' : 'rgba(255,255,255,.6)';
    c.font = '700 ' + Math.round(W * .04) + 'px Inter, sans-serif';
    c.fillText('Pick a template, drop artwork in, or add text', W / 2, H / 2);
    c.font = '500 ' + Math.round(W * .022) + 'px "IBM Plex Mono", monospace';
    c.fillText(mm().label + '  ·  ' + PW.stock(doc.stockId).label, W / 2, H / 2 + W * .05);
    c.restore();
  }

  /* ---------------- images ---------------- */
  function drawImg(c, o, W) {
    var im = imgs[o.src];
    if (!im || !im.complete || !im.naturalWidth) { o._bw = o.w; o._bh = o.w; return; }
    var bw = o.w * W, bh = (o.fit === 'cover' && o.h ? o.h * W : o.w * W * (im.naturalHeight / im.naturalWidth));
    c.globalAlpha = o.alpha == null ? 1 : o.alpha;
    if (o.fit === 'cover' && o.h) {
      var ir = im.naturalWidth / im.naturalHeight, br = bw / bh;
      var sw = im.naturalWidth, sh = im.naturalHeight, sx = 0, sy = 0;
      if (ir > br) { sw = im.naturalHeight * br; sx = (im.naturalWidth - sw) / 2; }
      else { sh = im.naturalWidth / br; sy = (im.naturalHeight - sh) / 2; }
      c.drawImage(im, sx, sy, sw, sh, -bw / 2, -bh / 2, bw, bh);
    } else {
      c.drawImage(im, -bw / 2, -bh / 2, bw, bh);
    }
    c.globalAlpha = 1;
    o._bw = bw / W; o._bh = bh / W;
  }

  /* ---------------- text ---------------- */
  function fontOf(o, W) {
    var m = { archivo: '900', space: '700', mono: '500', inter: '500' };
    var f = { archivo: 'Archivo, sans-serif', space: '"Space Grotesk", sans-serif', mono: '"IBM Plex Mono", monospace', inter: 'Inter, sans-serif' };
    return m[o.font || 'archivo'] + ' ' + Math.max(1, Math.round(o.size * W)) + 'px ' + f[o.font || 'archivo'];
  }
  function linesOf(c, o, W) {
    c.font = fontOf(o, W);
    var maxW = (o.wrap || .84) * W, out = [];
    String(o.text == null ? '' : o.text).split('\n').forEach(function (para) {
      var words = para.split(/\s+/), line = '';
      words.forEach(function (word) {
        var t = line ? line + ' ' + word : word;
        if (c.measureText(t).width > maxW && line) { out.push(line); line = word; }
        else line = t;
      });
      out.push(line);
    });
    return out;
  }
  function drawText(c, o, W) {
    var px = Math.max(1, o.size * W), lh = (o.lh || 1.02) * px;
    var lines = linesOf(c, o, W);
    var boxW = (o.wrap || .84) * W;
    var total = lines.length * lh;
    var anchor = o.align === 'center' ? 0 : o.align === 'right' ? boxW / 2 : -boxW / 2;
    c.save();
    c.textBaseline = 'top';
    c.textAlign = o.align === 'center' ? 'center' : o.align === 'right' ? 'right' : 'left';
    c.font = fontOf(o, W);
    if (o.chip) {
      var widest = 0;
      lines.forEach(function (l) { widest = Math.max(widest, c.measureText(l).width); });
      var pw = widest + px * .7, phh = total + px * .42;
      c.fillStyle = o.chipBg || doc.accent;
      var ox = o.align === 'center' ? -pw / 2 : o.align === 'right' ? -pw + px * .35 : -px * .35;
      c.fillRect(ox, -total / 2 - px * .21, pw, phh);
      c.fillStyle = lum(o.chipBg || doc.accent) > 140 ? '#0c0c0d' : '#ffffff';
    } else {
      c.fillStyle = o.color || '#0c0c0d';
    }
    lines.forEach(function (ln, i) { c.fillText(ln, anchor, -total / 2 + i * lh + (o.chip ? px * 0 : 0)); });
    c.restore();
    o._bw = boxW / W;
    o._bh = total / W + .02;
  }

  function lum(hex) {
    var m = /^#?([0-9a-f]{6})$/i.exec(String(hex || ''));
    if (!m) return 200;
    var n = parseInt(m[1], 16);
    return .2126 * (n >> 16 & 255) + .7152 * (n >> 8 & 255) + .0722 * (n & 255);
  }
  function inkOn(hex) { return lum(hex) > 140 ? '#0c0c0d' : '#ffffff'; }

  /* ---------------- draw + selection ---------------- */
  function draw() {
    var W = MAXW, pad = padOf(W), full = W + pad * 2;
    cv.width = full; cv.height = full === 0 ? 1 : trimH(W) + pad * 2;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    paint(ctx, W, true);
    if (!doc.objs.length) drawPlaceholder(ctx, W, trimH(W));
    fitFrame();
    drawSel();
    meta();
  }

  function fitFrame() {
    var availW = Math.max(240, wrap.clientWidth - 56);
    var availH = Math.max(240, (wrap.clientHeight || 520) - 56);
    var full = MAXW + 2 * padOf(MAXW);
    var natural = full / (trimH(MAXW) + 2 * padOf(MAXW));   // w/h of the sheet
    var baseW = Math.min(availW, availH * natural);
    var w = Math.round(baseW * zoom);
    cv.style.width = w + 'px';
    var s = w / full;
    stage.style.width = Math.round(full * s) + 'px';
    stage.style.height = Math.round((trimH(MAXW) + 2 * padOf(MAXW)) * s) + 'px';
    qs('#z-v').textContent = Math.round(zoom * 100) + '%';
    stage.style.setProperty('--bleed', (padOf(MAXW) * s).toFixed(2) + 'px');
  }

  function boxOf(o) {
    var full = MAXW + 2 * padOf(MAXW), s = cv.getBoundingClientRect().width / full, pad = padOf(MAXW);
    var bw = (o._bw || o.w || .5) * MAXW, bh = (o._bh || .1) * MAXW;
    return { x: (pad + o.x * MAXW) * s, y: (pad + o.y * MAXW) * s, w: bw * s, h: bh * s, rot: o.rot || 0 };
  }
  function drawSel() {
    var host = qs('#selbox'), o = find(sel);
    if (!o) { stage.classList.remove('has-sel'); host.style.cssText = ''; return; }
    stage.classList.add('has-sel');
    var b = boxOf(o);
    host.style.width = Math.max(26, b.w) + 'px';
    host.style.height = Math.max(18, b.h) + 'px';
    host.style.left = (b.x - b.w / 2) + 'px';
    host.style.top = (b.y - b.h / 2) + 'px';
    host.style.transform = 'rotate(' + b.rot + 'deg)';
  }
  function find(id) { var r = null; doc.objs.forEach(function (x) { if (x.id === id) r = x; }); return r; }

  function hit(e) {
    var r = cv.getBoundingClientRect(), b, o;
    for (var i = doc.objs.length - 1; i >= 0; i--) {
      o = doc.objs[i]; b = boxOf(o);
      var dx = e.clientX - r.left - b.x, dy = e.clientY - r.top - b.y;
      var a = -(b.rot || 0) * Math.PI / 180;
      var rx = dx * Math.cos(a) - dy * Math.sin(a), ry = dx * Math.sin(a) + dy * Math.cos(a);
      if (Math.abs(rx) <= b.w / 2 + 6 && Math.abs(ry) <= b.h / 2 + 6) return o;
    }
    return null;
  }

  /* ---------------- history ---------------- */
  function snap() { return JSON.stringify(doc); }
  function push() { undoStack.push(snap()); if (undoStack.length > 40) undoStack.shift(); redoStack.length = 0; syncHist(); }
  function restore(json) { var o = JSON.parse(json); Object.keys(o).forEach(function (k) { doc[k] = o[k]; }); syncControls(); draw(); inspector(); }
  function undo() { if (!undoStack.length) return; redoStack.push(snap()); restore(undoStack.pop()); syncHist(); }
  function redo() { if (!redoStack.length) return; undoStack.push(snap()); restore(redoStack.pop()); syncHist(); }
  function syncHist() { qs('#t-undo').disabled = !undoStack.length; qs('#t-redo').disabled = !redoStack.length; }

  /* ---------------- factories ---------------- */
  function addText(o) {
    push();
    var t = Object.assign({
      id: uid++, type: 'text', text: 'Your headline', x: .5, y: ratio() / 2, w: .84, wrap: .84,
      size: .1, font: 'archivo', color: inkOn(doc.bg), align: 'left', lh: 1.02, rot: 0
    }, o);
    doc.objs.push(t); sel = t.id; draw(); inspector(); return t;
  }
  function addImg(src, img, name) {
    push();
    imgs[src] = img;
    var ar = img.naturalHeight / img.naturalWidth;
    var t = { id: uid++, type: 'img', src: src, name: name, x: .5, y: ratio() / 2, w: .78, h: .78 * ar, fit: 'contain', rot: 0, alpha: 1 };
    doc.objs.push(t); sel = t.id; draw(); inspector(); price(); return t;
  }

  /* ---------------- templates ---------------- */
  var PAT = { 'grand-opening': 'none', eid: 'arc', gig: 'band', sale: 'dots', cricket: 'stripes', rent: 'grid', festival: 'band', wedding: 'arc', admissions: 'dots', lost: 'grid' };
  var STYLE = {
    huge: { size: .3, font: 'archivo', lh: .9 },
    display: { size: .155, font: 'archivo', lh: .92 },
    mid: { size: .072, font: 'space', lh: 1.05 },
    body: { size: .038, font: 'inter', lh: 1.4 },
    flag: { size: .028, font: 'mono', lh: 1.15 }
  };
  function loadTemplate(id) {
    var t = D.templates.filter(function (x) { return x.id === id; })[0];
    if (!t) return;
    push();
    doc.tpl = t.id; doc.bg = t.bg; doc.accent = t.accent; doc.pattern = PAT[t.id] || 'none';
    doc.objs = [];
    var centred = t.layout === 'centred' || t.layout === 'band';
    var wrapW = t.layout === 'split' ? .4 : .82;
    var x = t.layout === 'split' ? .09 + wrapW / 2 : (centred ? .5 : .09 + wrapW / 2);
    var align = centred ? 'center' : 'left';
    var y = t.layout === 'split' ? .3 : .18;
    t.lines.forEach(function (ln) {
      var s = STYLE[ln.k] || STYLE.body;
      var isFlag = ln.k === 'flag';
      y += s.size * s.lh / 2;
      doc.objs.push({
        id: uid++, type: 'text', text: ln.t, x: x, y: y, size: s.size, font: s.font, lh: s.lh,
        wrap: isFlag ? wrapW : wrapW, align: isFlag ? 'left' : align,
        color: isFlag ? '#ffffff' : t.ink, chip: isFlag, chipBg: t.accent, rot: 0
      });
      y += s.size * s.lh / 2 + .04;
    });
    draw(); syncControls(); inspector(); price();
    PW.ui.toast(t.name + ' loaded — drag anything, edit text in the Text tab', 'ok');
  }

  /* ---------------- patterns (drawn into any context) ---------------- */
  function patternGrid(c, W, H, a) {
    c.strokeStyle = a; c.globalAlpha = .18; c.lineWidth = W * .0022;
    for (var x = 0; x <= W; x += W * .0625) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); }
    for (var y = 0; y <= H; y += W * .0625) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
  }
  function patternDots(c, W, H, a) {
    c.fillStyle = a; c.globalAlpha = .22;
    var step = W * .045, r = W * .0052, row = 0;
    for (var y = step; y < H; y += step) {
      for (var x = (row % 2 ? step / 2 : 0) + step; x < W; x += step) { c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); }
      row++;
    }
  }
  function patternStripes(c, W, H, a) {
    c.strokeStyle = a; c.globalAlpha = .15; c.lineWidth = W * .013;
    for (var i = -H; i < W + H; i += W * .07) { c.beginPath(); c.moveTo(i, 0); c.lineTo(i + H, H); c.stroke(); }
  }
  function patternArc(c, W, H, a) {
    c.fillStyle = a;
    c.beginPath(); c.arc(W * 1.0, H * .16, W * .44, 0, 7); c.fill();
    c.globalAlpha = .22;
    c.beginPath(); c.arc(0, H * .86, W * .3, 0, 7); c.fill();
  }
  function patternBand(c, W, H, a) {
    c.fillStyle = a;
    c.fillRect(0, H * .07, W, H * .05);
    c.fillRect(0, H - H * .12, W, H * .05);
  }
  function drawPat(c, W, H) {
    c.save();
    if (doc.pattern === 'grid') patternGrid(c, W, H, doc.accent);
    else if (doc.pattern === 'dots') patternDots(c, W, H, doc.accent);
    else if (doc.pattern === 'stripes') patternStripes(c, W, H, doc.accent);
    else if (doc.pattern === 'arc') patternArc(c, W, H, doc.accent);
    else if (doc.pattern === 'band') patternBand(c, W, H, doc.accent);
    c.restore();
  }
  /* ---------------- rail panels ---------------- */
  var TOOL = {
    tpl: { t: 'Templates', s: '10 free' }, up: { t: 'Your artwork', s: '300 DPI' },
    text: { t: 'Text', s: 'click to edit' }, bg: { t: 'Background', s: 'paper & pattern' },
    layers: { t: 'Layers', s: 'top first' }, check: { t: 'Artwork check', s: 'free, by a human' }
  };
  var tool = 'tpl';
  function setTool(k) {
    tool = k;
    qsa('[data-tool]').forEach(function (b) {
      var on = b.getAttribute('data-tool') === k;
      b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', String(on));
    });
    qs('#rail-t').textContent = TOOL[k].t; qs('#rail-s').textContent = TOOL[k].s;
    inspector();
  }

  function inspector() {
    var host = qs('#rail-b'), o = find(sel);
    if (tool === 'tpl') {
      host.innerHTML = '<div class="tplgrid">' + D.templates.map(function (t) {
        return '<button class="tpl' + (doc.tpl === t.id ? ' is-on' : '') + '" type="button" data-tpl="' + t.id + '">' +
          '<span class="tpl__a" style="background:' + t.bg + ';color:' + t.ink + '">' +
          '<b>' + esc(t.lines[0].t) + '</b>' + (t.lines[1] ? '<b style="opacity:.7;font-size:8.5px">' + esc(t.lines[1].t) + '</b>' : '') +
          '<i style="background:' + t.accent + '"></i></span><span class="tpl__n">' + esc(t.name) + '</span></button>';
      }).join('') + '</div>' +
        '<p class="small" style="margin-top:12px">Every template already has the right bleed and type big enough to read from three metres. Change the words, then check the price at the bottom of this panel.</p>' +
        '<button class="btn btn--ghost btn--sm btn--block" type="button" id="clear-doc" style="margin-top:10px">Start from a blank sheet</button>';
      qsa('[data-tpl]', host).forEach(function (b) { b.addEventListener('click', function () { loadTemplate(b.getAttribute('data-tpl')); }); });
      var cd = qs('#clear-doc', host);
      if (cd) cd.addEventListener('click', function () { push(); doc.objs = []; doc.tpl = null; sel = null; draw(); inspector(); });
      return;
    }
    if (tool === 'up') {
      host.innerHTML = '<div class="drop" id="sd-drop" tabindex="0" role="button" aria-label="Upload artwork">' +
        '<div class="drop__i">↥</div><p class="drop__t">Drop your artwork here</p>' +
        '<p class="drop__s">JPG or PNG · placed centred · PDF goes through the product page</p>' +
        '<input type="file" id="sd-file" accept="image/png,image/jpeg,image/tiff,.pdf" hidden></div>' +
        (o && o.type === 'img' ? imgPanel(o) : '<p class="small" style="margin-top:12px">Select an image on the canvas to crop-fit, fade or scale it. Artwork never leaves your browser until you add it to the basket.</p>') +
        dpiCard();
      bindDrop(qs('#sd-drop', host), qs('#sd-file', host)); bindImgPanel(o);
      return;
    }
    if (tool === 'text') {
      host.innerHTML = '<div style="display:grid;gap:7px;margin-bottom:14px">' +
        '<button class="btn btn--ink btn--sm" type="button" data-add="head">＋ Headline</button>' +
        '<button class="btn btn--ghost btn--sm" type="button" data-add="sub">＋ Subhead</button>' +
        '<button class="btn btn--ghost btn--sm" type="button" data-add="body">＋ Detail text</button>' +
        '<button class="btn btn--ghost btn--sm" type="button" data-add="tag">＋ Label / tagline</button></div>' +
        (o && o.type === 'text' ? textPanel(o) : '<p class="small">Nothing selected. Click a line of text on the poster — or add one above — then edit words, typeface, size, colour and rotation here.</p>');
      qsa('[data-add]', host).forEach(function (b) {
        b.addEventListener('click', function () {
          var k = b.getAttribute('data-add');
          addText({
            head: { text: 'HEADLINE', size: .16, font: 'archivo' },
            sub: { text: 'Bigger than you think it needs to be', size: .06, font: 'space' },
            body: { text: 'Saturday 4 October · 11am\nMM Alam Road, Lahore', size: .038, font: 'inter', lh: 1.45 },
            tag: { text: 'FREE ENTRY · TILL 9PM', size: .028, font: 'mono', color: '#ffffff', chip: true, chipBg: doc.accent }
          }[k]);
        });
      });
      bindTextPanel(o);
      return;
    }
    if (tool === 'bg') {
      var bgs = ['#ffffff', '#f5f2ec', '#e9e6df', '#0c0c0d', '#e4002b', '#b3001f', '#16161a', '#2c2a26', '#dfe4e2', '#f0e6d2'];
      var accs = ['#e4002b', '#0c0c0d', '#ffffff', '#c9a227', '#0f7a3c', '#1f4fd8', '#f5f2ec', '#ff6a00'];
      host.innerHTML = '<p class="fgroup__t">Paper colour</p><div class="swatches">' + bgs.map(function (c) {
        return '<button class="sw' + (doc.bg === c ? ' is-on' : '') + '" type="button" data-bg="' + c + '" style="background:' + c + '" aria-label="Paper ' + c + '"></button>';
      }).join('') + '</div><p class="fgroup__t" style="margin-top:16px">Spot colour</p><div class="swatches">' + accs.map(function (c) {
        return '<button class="sw' + (doc.accent === c ? ' is-on' : '') + '" type="button" data-acc="' + c + '" style="background:' + c + '" aria-label="Spot colour ' + c + '"></button>';
      }).join('') + '</div>' +
        '<div class="fld" style="margin-top:14px"><label class="fld__l" for="pat">Background pattern</label><select class="sel" id="pat" style="width:100%">' +
        [['none', 'None — flat paper'], ['grid', 'Grid rules'], ['dots', 'Halftone dots'], ['stripes', 'Diagonal stripes'], ['arc', 'Offset circles'], ['band', 'Top & bottom bands']]
          .map(function (p) { return '<option value="' + p[0] + '"' + (doc.pattern === p[0] ? ' selected' : '') + '>' + p[1] + '</option>'; }).join('') + '</select></div>' +
        '<p class="small" style="margin-top:14px"><b>On press:</b> a full dark background is heavy ink. On 250gsm Classic Silk it comes out rich and flat because we print it on the Indigo with an extra varnish pass — 4 days rather than 3, no surcharge.</p>';
      qsa('[data-bg]', host).forEach(function (b) { b.addEventListener('click', function () { push(); doc.bg = b.getAttribute('data-bg'); draw(); inspector(); }); });
      qsa('[data-acc]', host).forEach(function (b) { b.addEventListener('click', function () { push(); doc.accent = b.getAttribute('data-acc'); draw(); inspector(); }); });
      qs('#pat', host).addEventListener('change', function () { push(); doc.pattern = this.value; draw(); });
      return;
    }
    if (tool === 'layers') {
      host.innerHTML = doc.objs.length
        ? '<div class="layers">' + doc.objs.slice().reverse().map(function (x) {
          return '<button class="layer' + (x.id === sel ? ' is-on' : '') + '" type="button" data-sel="' + x.id + '">' +
            '<span class="layer__i">' + (x.type === 'img' ? '▣' : 'T') + '</span>' +
            '<span class="layer__n">' + esc(x.type === 'img' ? (x.name || 'Uploaded image') : String(x.text).split('\n')[0].slice(0, 24)) + '</span>' +
            '<span class="mono" style="font-size:10px;color:var(--muted)">' + Math.round(x.size * 1000) + '</span>' +
            '<span class="layer__b" data-del="' + x.id + '" title="Delete">×</span></button>';
        }).join('') + '</div>' +
        (o ? '<div class="insp__row" style="margin-top:12px"><button class="btn btn--ghost btn--sm" type="button" id="lay-up">↑ Forward</button>' +
          '<button class="btn btn--ghost btn--sm" type="button" id="lay-dn">↓ Back</button></div>' +
          '<div class="insp__row" style="margin-top:7px"><button class="btn btn--ghost btn--sm" type="button" id="lay-dup">Duplicate</button>' +
          '<button class="btn btn--ghost btn--sm" type="button" id="lay-ctr">Centre</button></div>' : '')
        : '<p class="small">Nothing on the sheet yet. Load a template or add a line of text.</p>';
      qsa('[data-sel]', host).forEach(function (b) {
        b.addEventListener('click', function (e) {
          if (e.target.hasAttribute && e.target.hasAttribute('data-del')) {
            push(); var id = +e.target.getAttribute('data-del');
            doc.objs = doc.objs.filter(function (x) { return x.id !== id; });
            if (sel === id) sel = null;
            draw(); inspector(); return;
          }
          sel = +b.getAttribute('data-sel'); draw(); inspector();
        });
      });
      function idx(id) { var r = -1; doc.objs.forEach(function (x, i) { if (x.id === id) r = i; }); return r; }
      var up = qs('#lay-up', host), dn = qs('#lay-dn', host);
      if (up) up.addEventListener('click', function () { push(); var i = idx(sel); if (i < doc.objs.length - 1) doc.objs.splice(i + 1, 0, doc.objs.splice(i, 1)[0]); draw(); inspector(); });
      if (dn) dn.addEventListener('click', function () { push(); var i = idx(sel); if (i > 0) doc.objs.splice(i - 1, 0, doc.objs.splice(i, 1)[0]); draw(); inspector(); });
      var dup = qs('#lay-dup', host), ctr = qs('#lay-ctr', host);
      if (dup) dup.addEventListener('click', duplicate);
      if (ctr) ctr.addEventListener('click', function () { var x = find(sel); if (!x) return; push(); x.x = .5; x.y = ratio() / 2; draw(); inspector(); });
      return;
    }
    if (tool === 'check') {
      host.innerHTML = dpiCard() +
        '<p class="small" style="margin-top:14px">A press operator checks every file by eye — resolution, bleed, safe margin, embedded fonts, and whether your red will dull in CMYK. If something will print badly we ring you instead of printing it.</p>' +
        '<div style="display:grid;gap:7px;margin-top:12px"><button class="btn btn--ink btn--sm" type="button" id="chk-now">Run pre-flight on this design</button>' +
        '<button class="btn btn--ghost btn--sm" type="button" id="chk-fix">Fix what can be fixed</button></div><div id="chk-out" style="margin-top:12px"></div>' +
        '<div class="drop" id="sd-drop" tabindex="0" role="button" style="margin-top:14px"><div class="drop__i">↥</div>' +
        '<p class="drop__t">Or check an existing file</p><p class="drop__s">We read its pixel size against your print size</p>' +
        '<input type="file" id="sd-file" accept="image/*,.pdf" hidden></div><div id="chk-file"></div>';
      qs('#chk-now', host).addEventListener('click', preflight);
      qs('#chk-fix', host).addEventListener('click', preflightFix);
      bindDrop(qs('#sd-drop', host), qs('#sd-file', host));
      return;
    }
  }

  /* ---------------- inspectors for selection ---------------- */
  function textPanel(o) {
    return '<div class="insp" style="margin-top:14px">' +
      '<div class="fld"><label class="fld__l" for="tx">Words</label><textarea class="inp" id="tx" rows="3">' + esc(o.text) + '</textarea></div>' +
      '<div class="insp__row"><div class="fld"><label class="fld__l" for="tf">Typeface</label><select class="sel" id="tf" style="width:100%">' +
      D.studioFonts.map(function (f) { return '<option value="' + f.id + '"' + (o.font === f.id ? ' selected' : '') + '>' + esc(f.label) + '</option>'; }).join('') +
      '</select></div><div class="fld"><label class="fld__l">Align</label><div style="display:flex;gap:5px">' +
      ['left', 'center', 'right'].map(function (a) {
        return '<button class="chip' + (o.align === a ? ' is-on' : '') + '" type="button" data-al="' + a + '" style="flex:1;justify-content:center" aria-label="Align ' + a + '">' +
          ({ left: '⇤', center: '⇹', right: '⇥' })[a] + '</button>';
      }).join('') + '</div></div></div>' +
      '<div class="slider"><label for="ts">Size <b>' + Math.round(o.size * 1000) + '/1000</b></label><input type="range" id="ts" min="12" max="330" value="' + Math.round(o.size * 1000) + '"></div>' +
      '<div class="slider"><label for="tl">Line height <b>' + (o.lh || 1.02).toFixed(2) + '</b></label><input type="range" id="tl" min="80" max="200" value="' + Math.round((o.lh || 1.02) * 100) + '"></div>' +
      '<div class="slider"><label for="tw">Block width <b>' + Math.round((o.wrap || .84) * 100) + '%</b></label><input type="range" id="tw" min="16" max="100" value="' + Math.round((o.wrap || .84) * 100) + '"></div>' +
      '<div class="slider"><label for="tr">Rotation <b>' + (o.rot || 0) + '°</b></label><input type="range" id="tr" min="-45" max="45" value="' + (o.rot || 0) + '"></div>' +
      '<div class="fld"><label class="fld__l">Colour</label><div class="swatches">' +
      ['#0c0c0d', '#f5f2ec', '#ffffff', doc.accent, '#e4002b', '#6c6a66'].map(function (c) {
        return '<button class="sw' + (o.color === c ? ' is-on' : '') + '" type="button" data-tc="' + c + '" style="background:' + c + '" aria-label="Ink ' + c + '"></button>';
      }).join('') + '</div></div></div>';
  }
  function bindTextPanel(o) {
    if (!o || o.type !== 'text') return;
    var host = qs('#rail-b');
    function on(id, ev, fn) { var e = qs('#' + id, host); if (e) e.addEventListener(ev, fn); }
    on('tx', 'input', function () { o.text = this.value; draw(); });
    on('tx', 'change', push);
    on('tf', 'change', function () { push(); o.font = this.value; draw(); });
    on('ts', 'input', function () { o.size = +this.value / 1000; draw(); });
    on('ts', 'change', push);
    on('tl', 'input', function () { o.lh = +this.value / 100; draw(); });
    on('tl', 'change', push);
    on('tw', 'input', function () { o.wrap = +this.value / 100; draw(); });
    on('tw', 'change', push);
    on('tr', 'input', function () { o.rot = +this.value; draw(); });
    on('tr', 'change', push);
    qsa('[data-al]', host).forEach(function (b) { b.addEventListener('click', function () { push(); o.align = b.getAttribute('data-al'); draw(); inspector(); }); });
    qsa('[data-tc]', host).forEach(function (b) { b.addEventListener('click', function () { push(); o.color = b.getAttribute('data-tc'); o.chip = false; draw(); inspector(); }); });
  }
  function imgPanel(o) {
    return '<div class="insp" style="margin-top:14px">' +
      '<div class="fld"><label class="fld__l">Fit inside its box</label><div style="display:flex;gap:6px">' +
      '<button class="chip' + (o.fit !== 'cover' ? ' is-on' : '') + '" type="button" data-fit="contain" style="flex:1;justify-content:center">Fit</button>' +
      '<button class="chip' + (o.fit === 'cover' ? ' is-on' : '') + '" type="button" data-fit="cover" style="flex:1;justify-content:center">Fill (crop)</button></div></div>' +
      '<div class="slider"><label for="iw">Width <b>' + Math.round(o.w * 100) + '%</b></label><input type="range" id="iw" min="8" max="140" value="' + Math.round(o.w * 100) + '"></div>' +
      (o.fit === 'cover' ? '<div class="slider"><label for="ih">Box height <b>' + Math.round(o.h * 100) + '%</b></label><input type="range" id="ih" min="8" max="140" value="' + Math.round(o.h * 100) + '"></div>' : '') +
      '<div class="slider"><label for="ia">Opacity <b>' + Math.round((o.alpha == null ? 1 : o.alpha) * 100) + '%</b></label><input type="range" id="ia" min="5" max="100" value="' + Math.round((o.alpha == null ? 1 : o.alpha) * 100) + '"></div>' +
      '<div class="slider"><label for="ir">Rotation <b>' + (o.rot || 0) + '°</b></label><input type="range" id="ir" min="-45" max="45" value="' + (o.rot || 0) + '"></div>' +
      '<div style="display:flex;gap:6px"><button class="btn btn--ghost btn--sm" type="button" id="i-centre" style="flex:1">Centre</button>' +
      '<button class="btn btn--ghost btn--sm" type="button" id="i-full" style="flex:1">Full bleed</button></div></div>';
  }
  function bindImgPanel(o) {
    if (!o || o.type !== 'img') return;
    var host = qs('#rail-b');
    function on(id, ev, fn) { var e = qs('#' + id, host); if (e) e.addEventListener(ev, fn); }
    on('iw', 'input', function () { o.w = +this.value / 100; draw(); });
    on('iw', 'change', push);
    on('ih', 'input', function () { o.h = +this.value / 100; draw(); });
    on('ih', 'change', push);
    on('ia', 'input', function () { o.alpha = +this.value / 100; draw(); });
    on('ia', 'change', push);
    on('ir', 'input', function () { o.rot = +this.value; draw(); });
    on('ir', 'change', push);
    qsa('[data-fit]', host).forEach(function (b) {
      b.addEventListener('click', function () { push(); o.fit = b.getAttribute('data-fit'); if (o.fit === 'cover' && !o.h) o.h = o.w; draw(); inspector(); });
    });
    on('i-centre', 'click', function () { push(); o.x = .5; o.y = ratio() / 2; draw(); inspector(); });
    on('i-full', 'click', function () { push(); o.x = .5; o.y = ratio() / 2; o.w = 1.06; o.h = ratio() * 1.06; o.fit = 'cover'; draw(); inspector(); });
  }

  function dpiCard() {
    var d = mm();
    var need = { w: Math.round(d.w / 25.4 * 300), h: Math.round(d.h / 25.4 * 300) };
    var list = doc.objs.filter(function (o) { return o.type === 'img'; }).map(function (o) {
      var im = imgs[o.src]; if (!im || !im.naturalWidth) return null;
      var printWmm = (o.w || .8) * d.w;
      var dpi = Math.round(im.naturalWidth / (printWmm / 25.4));
      return { dpi: dpi, name: o.name || 'image', ok: dpi >= 300, mid: dpi >= 150 };
    }).filter(Boolean);
    return '<div class="quality" style="border:1px solid var(--line);border-radius:var(--r-s);padding:12px;margin-top:14px;background:var(--paper)">' +
      '<p class="mono" style="color:var(--muted)">Ideal file for ' + esc(d.label) + '</p>' +
      '<p class="mono"><b>' + need.w + ' × ' + need.h + ' px</b> at 300 DPI</p>' +
      (list.length ? list.map(function (r) {
        return '<p class="' + (r.ok ? 'q-good' : r.mid ? 'q-mid' : 'q-bad') + '">● ' + esc(r.name) + ' — ' + r.dpi + ' DPI ' +
          (r.ok ? 'at this size' : r.mid ? '· fine from 2 m' : '· will print soft, make it smaller or re-export') + '</p>';
      }).join('') : '<p class="small" style="margin-top:6px">Text-only posters are sharp at any size — nothing to resolve.</p>') +
      '</div>';
  }

  /* ---------------- pre-flight ---------------- */
  function preflight(silent) {
    var d = mm(), out = [], bad = 0;
    var bleedU = BLEED / d.w, safeU = (BLEED + 5) / d.w, Rh = ratio();
    if (!doc.objs.length) out.push(['warn', 'Blank sheet — there is nothing to check yet.']);
    doc.objs.forEach(function (o) {
      var bw = (o._bw || o.w || .5) / 2, bh = (o._bh || .1) / 2;
      var lab = (o.type === 'img' ? 'Image ' + (o.name || '') : '“' + String(o.text).split('\n')[0].slice(0, 18) + '…”');
      var full = o.type === 'img' && o.fit === 'cover' && o.w > 1;
      if (o.x - bw < -bleedU || o.x + bw > 1 + bleedU || o.y - bh < -bleedU || o.y + bh > Rh + bleedU) {
        out.push(['bad', lab + ' runs off the sheet']); bad++;
      } else if (!full && (o.x - bw < safeU || o.x + bw > 1 - safeU || o.y - bh < safeU || o.y + bh > Rh - safeU)) {
        out.push(['mid', lab + ' crosses the 5mm safe margin']); bad++;
      }
      if (o.type === 'text') {
        var pt = Math.round(o.size * d.w / 25.4 * 72);
        if (pt < 7) { out.push(['mid', 'Type at ' + pt + 'pt — under 7pt fills in on 170gsm silk (' + lab + ')']); bad++; }
      }
    });
    if (lum(doc.bg) < 90) out.push(['info', 'Dark full-bleed background: printed on the Indigo with extra varnish, so 4 days rather than 3.']);
    if (!bad && doc.objs.length) out.push(['ok', 'Passes pre-flight — nothing on the trim line, type sizes safe, ' + doc.objs.length + ' elements.']);
    var host = qs('#chk-out');
    if (host) {
      var map = { ok: ['✓', 'var(--ok)'], bad: ['▲', 'var(--red)'], mid: ['!', 'var(--warn)'], warn: ['i', 'var(--muted)'], info: ['i', 'var(--muted)'] };
      host.innerHTML = '<div style="display:grid;gap:7px">' + (out.length ? out.map(function (r) {
        var m = map[r[0]] || map.info;
        return '<p class="mono" style="display:flex;gap:9px;align-items:flex-start"><span style="color:' + m[1] + '">' + m[0] + '</span>' +
          '<span style="color:var(--ink-3);font-family:var(--font-b);font-size:13px">' + esc(r[1]) + '</span></p>';
      }).join('') : '<p class="small">Nothing to report.</p>') + '</div>';
    }
    if (!silent) PW.ui.toast(bad ? bad + ' thing' + (bad === 1 ? '' : 's') + ' to fix before we print' : 'Pre-flight clear — this will print beautifully', bad ? 'warn' : 'ok');
    return bad;
  }
  function preflightFix() {
    var d = mm(), safeU = (BLEED + 5) / d.w, n = 0, Rh = ratio();
    push();
    doc.objs.forEach(function (o) {
      var full = o.type === 'img' && o.fit === 'cover' && o.w > 1;
      if (full) return;
      var bw = (o._bw || o.w || .5) / 2, bh = (o._bh || .1) / 2;
      var nx = Math.min(Math.max(o.x, safeU + bw * .35), 1 - safeU - bw * .35);
      var ny = Math.min(Math.max(o.y, safeU + bh * .35), Rh - safeU - bh * .35);
      if (Math.abs(nx - o.x) > .0005 || Math.abs(ny - o.y) > .0005) { o.x = nx; o.y = ny; n++; }
    });
    draw();
    var fixed = preflight(true);
    PW.ui.toast(n ? n + ' element' + (n === 1 ? '' : 's') + ' pulled inside the safe margin' : fixed ? 'Still ' + fixed + ' to look at manually' : 'All clear now', 'ok');
    preflight(true);
  }

  /* ---------------- uploads ---------------- */
  function bindDrop(dr, fi) {
    if (!dr || !fi) return;
    dr.addEventListener('click', function () { fi.click(); });
    dr.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fi.click(); } });
    ['dragenter', 'dragover'].forEach(function (ev) { dr.addEventListener(ev, function (e) { e.preventDefault(); dr.classList.add('is-over'); }); });
    ['dragleave', 'drop'].forEach(function (ev) { dr.addEventListener(ev, function (e) { e.preventDefault(); dr.classList.remove('is-over'); }); });
    dr.addEventListener('drop', function (e) { var f = e.dataTransfer.files && e.dataTransfer.files[0]; if (f) ingest(f); });
    fi.addEventListener('change', function () { if (fi.files[0]) ingest(fi.files[0]); });
  }
  function ingest(f) {
    if (/pdf/i.test(f.type || f.name)) {
      var box = qs('#chk-file');
      if (box) box.innerHTML = '<p class="small" style="margin-top:10px"><b>' + esc(f.name) + '</b> received. PDFs carry their own resolution — the product page lets you attach it and we rasterise + proof it free.</p>';
      PW.ui.toast('PDF noted — attach it on the product page for the full bleed check', 'warn');
      return;
    }
    var fr = new FileReader();
    fr.onload = function () {
      var img = new Image();
      img.onload = function () {
        var d = mm();
        var chk = PW.dpiCheck(img.naturalWidth, img.naturalHeight, d.w, d.h);
        addImg(fr.result, img, f.name);
        PW.ui.toast(img.naturalWidth + '×' + img.naturalHeight + 'px · ' + chk.dpi + ' DPI at this size — ' + chk.label, chk.verdict === 'low' ? 'warn' : 'ok');
      };
      img.onerror = function () { PW.ui.toast('Could not open that image', 'warn'); };
      img.src = fr.result;
    };
    fr.readAsDataURL(f);
  }
  function duplicate() {
    var o = find(sel); if (!o) return;
    push();
    var c = Object.assign({}, o, { id: uid++, x: o.x + .035, y: o.y + .035 });
    doc.objs.push(c); sel = c.id; draw(); inspector();
  }

  /* ---------------- pointer: move + handles ---------------- */
  var drag = null;
  cv.addEventListener('pointerdown', function (e) {
    var o = hit(e);
    if (!o) { sel = null; drawSel(); return; }
    sel = o.id; push();
    var r = cv.getBoundingClientRect();
    drag = { id: o.id, px: (e.clientX - r.left) / sc(), py: (e.clientY - r.top) / sc(), sx: o.x, sy: o.y };
    try { cv.setPointerCapture(e.pointerId); } catch (err) { }
    draw();
  });
  cv.addEventListener('pointermove', function (e) {
    if (!drag) { cv.style.cursor = hit(e) ? 'move' : 'default'; return; }
    var o = find(drag.id); if (!o) return;
    var r = cv.getBoundingClientRect();
    var nx = (e.clientX - r.left) / sc(), ny = (e.clientY - r.top) / sc();
    var dx = nx - drag.px, dy = ny - drag.py;
    if (e.shiftKey) { if (Math.abs(dx) > Math.abs(dy)) dy = 0; else dx = 0; }
    o.x = drag.sx + dx; o.y = drag.sy + dy;
    draw();
  });
  ['pointerup', 'pointercancel'].forEach(function (ev) {
    cv.addEventListener(ev, function () { if (drag) { drag = null; inspector(); price(); } });
  });

  var hs = null;
  qsa('.selbox__h').forEach(function (h) {
    h.addEventListener('pointerdown', function (e) {
      e.stopPropagation();
      var o = find(sel); if (!o) return;
      push();
      var b = boxOf(o), r = stage.getBoundingClientRect();
      hs = {
        kind: h.getAttribute('data-h'), id: o.id,
        cx: r.left + b.x, cy: r.top + b.y,
        d0: Math.hypot(e.clientX - (r.left + b.x), e.clientY - (r.top + b.y)),
        a0: Math.atan2(e.clientY - (r.top + b.y), e.clientX - (r.left + b.x)),
        w0: o.w, h0: o.h || o.w, r0: o.rot || 0
      };
      try { h.setPointerCapture(e.pointerId); } catch (err) { }
    });
    h.addEventListener('pointermove', function (e) {
      if (!hs) return;
      var o = find(hs.id); if (!o) return;
      if (hs.kind === 'se') {
        var dist = Math.hypot(e.clientX - hs.cx, e.clientY - hs.cy);
        var k = Math.max(.15, dist / Math.max(1, hs.d0));
        o.w = Math.min(3, hs.w0 * k);
        if (o.fit === 'cover') o.h = Math.min(3, hs.h0 * k);
      } else {
        var a = Math.atan2(e.clientY - hs.cy, e.clientX - hs.cx);
        o.rot = Math.round(hs.r0 + (a - hs.a0) * 180 / Math.PI);
        if (e.shiftKey) o.rot = Math.round(o.rot / 15) * 15;
      }
      draw();
    });
    h.addEventListener('pointerup', function () { hs = null; draw(); inspector(); });
  });
  qs('#sel-del').addEventListener('click', function () {
    if (sel == null) return;
    push();
    doc.objs = doc.objs.filter(function (x) { return x.id !== sel; });
    sel = null; draw(); inspector();
  });

  document.addEventListener('keydown', function (e) {
    var tag = (document.activeElement || {}).tagName || '';
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag)) { if (e.key === 'Escape') document.activeElement.blur(); return; }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); return; }
    if (e.key === 'Escape') { sel = null; drawSel(); return; }
    var o = find(sel);
    if (e.key === '1' && !o) { setTool('check'); return; }
    if (!o) return;
    var s = e.shiftKey ? .02 : .004, used = true;
    if (e.key === 'ArrowLeft') { o.x -= s; } else if (e.key === 'ArrowRight') { o.x += s; }
    else if (e.key === 'ArrowUp') { o.y -= s; } else if (e.key === 'ArrowDown') { o.y += s; }
    else if (e.key === 'Delete' || e.key === 'Backspace') { push(); doc.objs = doc.objs.filter(function (x) { return x.id !== sel; }); sel = null; }
    else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'd') { duplicate(); }
    else used = false;
    if (used) { e.preventDefault(); push(); draw(); }
  });

  /* ---------------- controls ---------------- */
  function syncControls() {
    if (qs('#st-size')) qs('#st-size').value = doc.sizeId;
    if (qs('#st-stock')) qs('#st-stock').value = doc.stockId;
    if (qs('#st-finish')) qs('#st-finish').value = doc.finishId;
    if (qs('#st-mount')) qs('#st-mount').value = doc.mountId;
    if (qs('#st-qty')) qs('#st-qty').value = doc.qty;
  }
  function meta() {
    var d = mm();
    qs('#st-meta').textContent = d.label + ' · ' + PW.sqm(d.w, d.h).toFixed(3) + ' m² · ' + doc.objs.length + ' element' + (doc.objs.length === 1 ? '' : 's') + ' · ' + PW.stock(doc.stockId).label;
  }
  function buildControls() {
    qs('#st-size').innerHTML = D.sizes.map(function (s) {
      return '<option value="' + s.id + '">' + esc(s.label) + ' · ' + money(PW.quote(Object.assign({}, doc, { sizeId: s.id, qty: 1 })).unit) + '</option>';
    }).join('');
    qs('#st-stock').innerHTML = D.stocks.map(function (s) { return '<option value="' + s.id + '">' + esc(s.label) + '</option>'; }).join('');
    qs('#st-finish').innerHTML = D.finishes.map(function (f) { return '<option value="' + f.id + '">' + esc(f.label) + '</option>'; }).join('');
    qs('#st-mount').innerHTML = D.mounts.map(function (m) { return '<option value="' + m.id + '">' + esc(m.label) + '</option>'; }).join('');
    [['st-size', 'change'], ['st-stock', 'change'], ['st-finish', 'change'], ['st-mount', 'change'], ['st-qty', 'input']].forEach(function (pair) {
      qs('#' + pair[0]).addEventListener(pair[1], function () {
        var v = this.value;
        if (pair[0] === 'st-size') {
          if (PW.size(v).custom && !doc.w) { doc.w = mm().w; doc.h = mm().h; }
          doc.sizeId = v; draw();
        } else if (pair[0] === 'st-stock') doc.stockId = v;
        else if (pair[0] === 'st-finish') doc.finishId = v;
        else if (pair[0] === 'st-mount') doc.mountId = v;
        else doc.qty = Math.max(1, Math.min(9999, parseInt(v, 10) || 1));
        price(); draw();
      });
    });
    qs('#z-in').addEventListener('click', function () { zoom = Math.min(3, zoom * 1.2); fitFrame(); drawSel(); });
    qs('#z-out').addEventListener('click', function () { zoom = Math.max(.2, zoom / 1.2); fitFrame(); drawSel(); });
    qs('#t-fit').addEventListener('click', function () { zoom = 1; fitFrame(); drawSel(); });
    qs('#t-bleed').addEventListener('click', function () {
      var on = stage.classList.toggle('is-bleed');
      this.classList.toggle('is-on', on); this.setAttribute('aria-pressed', String(on));
    });
    qs('#t-undo').addEventListener('click', undo);
    qs('#t-redo').addEventListener('click', redo);
    qsa('[data-tool]').forEach(function (b) { b.addEventListener('click', function () { setTool(b.getAttribute('data-tool')); }); });
    qs('#st-add').addEventListener('click', addBasket);
    qs('#st-dl').addEventListener('click', download);
    qs('#save-here').addEventListener('click', function () { save(); PW.ui.toast('Draft saved in this browser', 'ok'); });
    window.addEventListener('resize', function () { fitFrame(); drawSel(); });
    cv.addEventListener('dragover', function (e) { e.preventDefault(); });
    cv.addEventListener('drop', function (e) {
      e.preventDefault();
      var f = e.dataTransfer.files && e.dataTransfer.files[0];
      if (f) ingest(f);
    });
  }
  function money(n) { return PW.money(n); }

  /* ---------------- price ---------------- */
  function price() {
    var d = mm();
    var q = PW.quote({ sizeId: doc.sizeId, stockId: doc.stockId, finishId: doc.finishId, mountId: doc.mountId, rushId: doc.rushId, qty: doc.qty, w: d.w, h: d.h });
    qs('#st-each').textContent = money(q.unit) + ' each · qty ' + q.qty;
    qs('#st-total').textContent = money(q.subtotal);
    qs('#st-break').textContent = q.breakOff ? Math.round(q.breakOff * 100) + '% bulk break' : (q.nextBreak ? '+' + q.nextBreak.need + ' for ' + Math.round(q.nextBreak.off * 100) + '% off' : '');
    var gsm = (D.pricing.rates[doc.stockId] / D.pricing.rates.silk170 * 170);
    var kg = gsm * PW.sqm(d.w, d.h) * doc.qty / 1000;
    qs('#st-note').innerHTML = money(q.unitList) + ' at quantity 1 · ' + PW.sqm(d.w, d.h).toFixed(3) + ' m² · about ' +
      Math.max(.2, Math.round(kg * 10) / 10) + ' kg shipped · ' +
      (doc.mountId === 'none' ? 'poster only, tube-packed' : esc(PW.mount(doc.mountId).label).toLowerCase()) +
      ' · 3mm bleed added on export, free. <span style="color:var(--muted)">PNG is for approval only — add it to the basket and we re-render your layers at full resolution on press.</span>';
    buildPriceInSizeList();
    syncControls();
  }
  function buildPriceInSizeList() {
    var selEl = qs('#st-size');
    if (!selEl) return;
    Array.prototype.forEach.call(selEl.options, function (op) {
      var q = PW.quote(Object.assign({}, doc, { sizeId: op.value, qty: 1 }));
      var s = PW.size(op.value);
      op.textContent = s.label + ' · ' + money(q.unit);
    });
  }

  /* ---------------- export ---------------- */
  function renderTo(target, Wpx, withBleed) {
    var H = trimH(Wpx), pad = withBleed ? padOf(Wpx) : 0;
    target.width = Wpx + pad * 2; target.height = H + pad * 2;
    var c = target.getContext('2d');
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.clearRect(0, 0, target.width, target.height);
    paint(c, Wpx, withBleed);
    return target;
  }
  function thumbURL(w) {
    try {
      var t = renderTo(document.createElement('canvas'), w || 360, false);
      return t.toDataURL('image/jpeg', .78);
    } catch (e) { return null; }
  }
  function download() {
    var d = mm(), dpi = +qs('#st-dpi').value;
    var want = Math.round(d.w / 25.4 * dpi);
    var Wpx = Math.max(600, Math.min(4400, want));
    var eff = Math.round(Wpx / (d.w / 25.4));
    var t = renderTo(document.createElement('canvas'), Wpx, true);
    var a = document.createElement('a');
    a.download = 'posterwala-' + PW.size(doc.sizeId).short.replace(/[^a-z0-9]/gi, '') + '-' + eff + 'dpi.png';
    a.href = t.toDataURL('image/png');
    document.body.appendChild(a); a.click(); a.remove();
    var bad = preflight(true);
    PW.ui.toast(
      'Exported ' + t.width + '×' + t.height + 'px (' + eff + ' DPI, ' + BLEED + 'mm bleed included)' +
      (want > Wpx ? ' — browser canvas capped at 4400px, the press re-renders your layers at full ' + dpi + ' DPI' : ''),
      bad ? 'warn' : 'ok');
  }

  /* ---------------- basket ---------------- */
  function addBasket() {
    var d = mm();
    var bad = preflight(true);
    if (bad) PW.ui.toast(bad + ' pre-flight warning' + (bad === 1 ? '' : 's') + ' — we’ll fix what we can on the proof', 'warn');
    var q = PW.quote({ sizeId: doc.sizeId, stockId: doc.stockId, finishId: doc.finishId, mountId: doc.mountId, rushId: doc.rushId, qty: doc.qty, w: d.w, h: d.h });
    var name = 'Studio poster · ' + PW.size(doc.sizeId).label;
    var cfg = { sizeId: doc.sizeId, stockId: doc.stockId, finishId: doc.finishId, mountId: doc.mountId, rushId: doc.rushId };
    PW.store.add({
      slug: 'design-studio', name: name, thumb: thumbURL(320), sizeId: doc.sizeId, stockId: doc.stockId,
      finishId: doc.finishId, mountId: doc.mountId, rushId: doc.rushId, qty: doc.qty, unit: q.unit, total: q.subtotal,
      w: d.w, h: d.h, file: 'PosterWala Studio' + (doc.tpl ? ' · ' + doc.tpl : ''),
      configSummary: PW.summary(cfg) + ' · ' + d.label + ' · ' + doc.objs.length + ' elements',
      rushDays: PW.rush(doc.rushId).days || 3, proof: true
    });
    PW.ui.toast(name + ' × ' + q.qty + ' added — ' + money(q.subtotal), 'ok');
    PW.ui.openDrawer();
  }

  /* ---------------- persistence ---------------- */
  var SKEY = 'pw_studio_v2';
  function save() { PW.ls.set('localStorage', SKEY, snap()); }
  function loadSaved() {
    try {
      var raw = PW.ls.get('localStorage', SKEY);
      if (!raw || PW.q('new') != null) return false;
      var o = JSON.parse(raw);
      if (!o || !o.objs) return false;
      Object.keys(o).forEach(function (k) { doc[k] = o[k]; });
      doc.objs.forEach(function (ob) {
        if (ob.type === 'img' && ob.src && !imgs[ob.src]) {
          var im = new Image();
          im.onload = function () { draw(); };
          im.src = ob.src; imgs[ob.src] = im;
        }
      });
      return doc.objs.length > 0;
    } catch (e) { return false; }
  }

  /* ---------------- boot ---------------- */
  buildControls();
  var restored = loadSaved();
  if (!restored) loadTemplate(doc.tpl || 'grand-opening');
  setTool(PW.q('tab') === 'check' ? 'check' : 'tpl');
  draw(); price(); syncControls(); syncHist();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { draw(); });
  window.addEventListener('beforeunload', save);
})(window.PW);
