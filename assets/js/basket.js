/* ==========================================================================
   PosterWala — basket.js  (cart, order summary, checkout, tracking)
   ========================================================================== */
(function (PW) {
  'use strict';
  var D = PW.data, qs = PW.qs, qsa = PW.qsa, esc = PW.esc;
  var money = PW.money;
  var OKEY = 'pw_orders_v2', PKEY = 'pw_promo_v1';

  var promo = PW.ls.get('sessionStorage', PKEY) || '';
  var pay = 'cod';
  var cityId = 'lhr';

  /* ---------- recompute a line through the live pricing engine ---------- */
  function recalc(l) {
    if (!l.sizeId) return l;
    var q = PW.quote({
      sizeId: l.sizeId, stockId: l.stockId, finishId: l.finishId || 'none',
      mountId: l.mountId || 'none', rushId: l.rushId || 'std', qty: l.qty, w: l.w, h: l.h
    });
    l.unit = q.unit; l.total = q.subtotal; l.breakOff = q.breakOff;
    return l;
  }

  /* ---------- cart lines ---------- */
  function renderLines() {
    var t = PW.store.totals({ promo: promo, pickup: pickup() });
    var host = qs('#lines');
    if (!t.lines.length) {
      host.innerHTML = '<div class="empty" style="border:0;background:transparent"><p class="empty__t">Your basket is empty</p>' +
        '<p class="empty__s">Pick a size, or open the Design Studio and make something. Nothing prints until you approve a proof — so there is no risk in adding it now.</p>' +
        '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">' +
        '<a class="btn btn--red" href="posters.html">Shop poster sizes</a>' +
        '<a class="btn btn--ghost" href="design-studio.html">Design online — free</a></div></div>';
      qs('#clear-all').hidden = true;
      return;
    }
    qs('#clear-all').hidden = false;
    host.innerHTML = t.lines.map(function (l) {
      return '<div class="cline" data-id="' + l.id + '">' +
        PW.thumbHTML(l, 76) +
        '<div><p class="cline__t">' + esc(l.name) + '</p><p class="cline__c">' + esc(l.configSummary || '') + '</p>' +
        '<div class="cline__ops">' +
        '<div class="stepper"><button type="button" data-q="-" aria-label="One fewer">−</button>' +
        '<input type="number" value="' + l.qty + '" min="1" max="9999" aria-label="Quantity for ' + esc(l.name) + '">' +
        '<button type="button" data-q="+" aria-label="One more">+</button></div>' +
        (l.breakOff ? '<span class="badge badge--ok">−' + Math.round(l.breakOff * 100) + '% bulk break</span>' : '<span class="badge">qty break at 5</span>') +
        (l.file ? '<span class="mono" style="color:var(--muted)">↳ ' + esc(l.file) + '</span>' : '<span class="badge badge--red">no artwork yet</span>') +
        '<a class="mono" style="color:var(--red)" href="' + (l.slug === 'design-studio' ? 'design-studio.html' : 'product.html?p=' + (l.slug || 'a1-event-poster') + '&size=' + l.sizeId) + '">' +
        (l.slug === 'design-studio' ? 'edit in studio' : 'change build') + '</a></div></div>' +
        '<div class="cline__r"><p class="cline__p">' + money(l.total) + '</p><p class="cline__pu">' + money(l.unit) + ' × ' + l.qty + '</p>' +
        '<button class="btn btn--quiet btn--sm" type="button" data-rm="' + l.id + '">Remove</button></div></div>';
    }).join('');

    qsa('[data-rm]', host).forEach(function (b) {
      b.addEventListener('click', function () {
        PW.store.remove(b.getAttribute('data-rm'));
        PW.ui.toast('Removed from basket');
      });
    });
    qsa('.cline', host).forEach(function (row) {
      var id = row.getAttribute('data-id');
      var input = qs('input[type="number"]', row);
      var line = PW.store.all().filter(function (l) { return l.id === id; })[0];
      qsa('[data-q]', row).forEach(function (b) {
        b.addEventListener('click', function () {
          var q2 = Math.max(1, Math.min(9999, line.qty + (b.getAttribute('data-q') === '+' ? 1 : -1)));
          line.qty = q2; recalc(line);
          PW.store.update(id, { qty: line.qty, unit: line.unit, total: line.total, breakOff: line.breakOff });
        });
      });
      if (input) input.addEventListener('change', function () {
        line.qty = Math.max(1, Math.min(9999, parseInt(input.value, 10) || 1));
        recalc(line);
        PW.store.update(id, { qty: line.qty, unit: line.unit, total: line.total, breakOff: line.breakOff });
      });
    });
  }

  function pickup() { var v = qs('#c-van'); return !!(v && v.checked); }

  /* ---------- summary ---------- */
  function renderSummary() {
    var t = PW.store.totals({ promo: promo, pickup: pickup() });
    qs('#pieces').textContent = t.pieces + ' poster' + (t.pieces === 1 ? '' : 's') + ' · ' + t.items + ' line' + (t.items === 1 ? '' : 's');
    var eta = PW.eta(t.rushDays);
    var rows = [
      ['Posters at your quantity breaks', money(t.goods)],
      t.discount ? ['Promo ' + promo, '− ' + money(t.discount)] : null,
      [t.delivery ? 'Delivery to ' + (PW.city(cityId) || D.cities[0]).name : 'Delivery', t.delivery ? money(t.delivery) : 'Free'],
      ['GST @ ' + Math.round(D.brand.gstRate * 100) + '%', money(t.gst)],
      ['Order total', money(t.total), true]
    ].filter(Boolean);
    qs('#sum').innerHTML = rows.map(function (r) {
      return '<p class="srow' + (r[0].indexOf('Delivery') === 0 && !t.delivery ? ' srow--free' : '') + (r[2] ? ' srow--tot' : '') + '">' +
        '<span>' + esc(r[0]) + '</span><b>' + r[1] + '</b></p>';
    }).join('') +
      '<p class="small">Estimated arrival <b>' + PW.dateFmt(eta) + '</b> in ' + esc((PW.city(cityId) || D.cities[0]).name) +
      ' · ' + esc((PW.city(cityId) || D.cities[0]).eta.toLowerCase()) + ' after your proof is approved.</p>' +
      (t.freeDeliveryGap > 0 ? '<p class="small" style="color:var(--red)">Add ' + money(t.freeDeliveryGap) + ' more to waive the Rs 250 courier charge.</p>' : '');
    qs('#place-amt').textContent = money(t.total);
    var payNote = qs('#pay-note');
    if (payNote) payNote.innerHTML = PAYMENTS.filter(function (p) { return p.id === pay; }).map(function (p) { return p.note; })[0] || '';
    var rev = qs('#review');
    if (rev) rev.innerHTML = t.lines.length
      ? '<div class="tablewrap" style="border:0;border-radius:0;margin:-18px"><table class="spec" style="min-width:0"><thead><tr><th>Item</th><th>Build</th><th class="num">Qty</th><th class="num">Each</th><th class="num">Line</th></tr></thead><tbody>' +
      t.lines.map(function (l) {
        return '<tr><td class="is-key">' + esc(l.name) + '</td><td class="small">' + esc(l.configSummary || '') + '</td>' +
          '<td class="num">' + l.qty + '</td><td class="num">' + money(l.unit) + '</td><td class="num">' + money(l.total) + '</td></tr>';
      }).join('') +
      '<tr><td colspan="4" style="text-align:right">Delivery + GST</td><td class="num">' + money(t.delivery + t.gst) + '</td></tr>' +
      '<tr><td colspan="4" class="is-key" style="text-align:right">Total to pay' + (pay === 'cod' ? ' (cash to the rider)' : '') + '</td><td class="num is-key">' + money(t.total) + '</td></tr>' +
      '</tbody></table></div>'
      : '<p class="small">Nothing to review yet.</p>';
    void qs;
  }

  /* ---------- payments ---------- */
  var PAYMENTS = [
    { id: 'cod', t: 'Cash on delivery', d: 'Pay the rider', note: '<b>Cash on delivery.</b> The rider takes cash up to Rs 150,000; bring change where you can, they carry about Rs 5,000. Above Rs 150,000 we take a 40% advance by bank first.' },
    { id: 'jazz', t: 'JazzCash / Easypaisa', d: 'Instant, no fee', note: '<b>Mobile wallet.</b> Send to 0300 842 7755 (PosterWala Pvt Ltd) and WhatsApp the screenshot. We start the job the moment it lands — usually within minutes.' },
    { id: 'bank', t: 'Bank transfer', d: 'IBAN, 1 page', note: '<b>Bank transfer.</b> HBL · IBAN PK36HABB0012345678901200 · PosterWala (Pvt) Ltd. Business orders start on payment confirmation; the PO can follow.' },
    { id: 'card', t: 'Visa / Mastercard', d: '3-D Secure', note: '<b>Card.</b> Processed over the gateway; a GST invoice with your NTN is emailed the same day and printed in the box.' },
    { id: 'trade', t: 'Trade account (net 30)', d: 'Agencies & chains', note: '<b>Net 30.</b> Only for approved trade accounts with 3+ orders behind them. Invoice goes to your accounts team, printing starts now.' }
  ];
  function renderPays() {
    qs('#pays').innerHTML = PAYMENTS.map(function (p) {
      return '<label class="optcard' + (p.id === pay ? ' is-on' : '') + '"><input type="radio" name="pay" value="' + p.id + '"' + (p.id === pay ? ' checked' : '') + '>' +
        '<span><span class="optcard__t">' + esc(p.t) + '</span><br><span class="optcard__d">' + esc(p.d) + '</span></span></label>';
    }).join('');
    qsa('[name="pay"]').forEach(function (i) {
      i.addEventListener('change', function () { pay = i.value; renderPays(); renderSummary(); });
    });
  }

  /* ---------- promo ---------- */
  function renderPromo() {
    var msg = qs('#promo-msg');
    if (!promo) { msg.textContent = 'Got a code? POSTER10 takes 10% off your first order.'; msg.style.color = 'var(--muted)'; return; }
    msg.innerHTML = '✓ ' + esc(promo) + ' applied — ' + Math.round(D.brand.promo.off * 100) + '% off the posters.';
    msg.style.color = 'var(--ok)';
    qs('#promo').value = promo;
  }
  qs('#promo-apply').addEventListener('click', function () {
    var v = (qs('#promo').value || '').trim().toUpperCase();
    if (!v) { promo = ''; PW.ls.del('sessionStorage', PKEY); renderPromo(); renderSummary(); return; }
    if (v === D.brand.promo.code) {
      promo = v; PW.ls.set('sessionStorage', PKEY, v);
      PW.ui.toast('Code applied — 10% off', 'ok');
    } else {
      promo = '';
      PW.ui.toast('That code isn\'t live any more', 'warn');
    }
    renderPromo(); renderSummary();
  });

  /* ---------- city + dates ---------- */
  function renderCities() {
    qs('#c-city').innerHTML = D.cities.map(function (c) {
      return '<option value="' + c.id + '"' + (c.id === cityId ? ' selected' : '') + '>' + esc(c.name) + ' · ' + esc(c.eta) + '</option>';
    }).join('');
    qs('#c-city').addEventListener('change', function () {
      cityId = this.value;
      qs('#c-pickup-city').textContent = (PW.city(cityId) || D.cities[0]).name;
      renderSummary();
    });
    var today = new Date();
    var min = PW.eta(1), max = PW.eta(45);
    ['#need-by', '#c-pin'].forEach(function (id) {
      var el = qs(id); if (!el) return;
      el.min = iso(min); el.max = iso(max);
      el.value = iso(PW.eta(4));
    });
    function iso(d) { return d.toISOString().slice(0, 10); }
    void today;
  }

  /* ---------- validation ---------- */
  function setErr(id, msg) {
    var f = qs('#' + id).closest('.fld');
    var e = qs('.fld__e', f);
    f.classList.toggle('is-bad', !!msg);
    if (e) { e.hidden = !msg; e.textContent = msg || ''; }
  }
  function valid() {
    var ok = true;
    var name = qs('#c-name').value.trim();
    setErr('c-name', name.length < 3 ? 'We need a name for the courier label' : ''); if (name.length < 3) ok = false;
    var ph = qs('#c-phone').value.replace(/[\s-]/g, '');
    var okPh = /^(\+?92|0)?3\d{2}\d{7}$/.test(ph) || /^0\d{2,4}\d{7}$/.test(ph);
    setErr('c-phone', okPh ? '' : 'A Pakistani number, e.g. 0300 8427755'); if (!okPh) ok = false;
    var em = qs('#c-email').value.trim();
    var okEm = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(em);
    setErr('c-email', okEm ? '' : 'Where should the invoice and proof go?'); if (!okEm) ok = false;
    var area = qs('#c-area').value.trim();
    setErr('c-area', area.length < 2 ? 'Which area?' : ''); if (area.length < 2) ok = false;
    var addr = qs('#c-addr').value.trim();
    setErr('c-addr', addr.length < 10 ? 'House/unit and street, please — riders get lost without it' : ''); if (addr.length < 10) ok = false;
    var t = qs('#c-terms');
    var te = qs('#terms-e');
    te.hidden = t.checked; te.textContent = 'Tick the box so we know you saw the proof step';
    if (!t.checked) ok = false;
    var t2 = PW.store.totals({ promo: promo, pickup: pickup() });
    if (pay === 'cod' && t2.total > 150000) {
      setErr('c-phone', 'Orders over Rs 150,000 need a 40% advance — pick bank transfer instead');
      ok = false;
    }
    return ok;
  }

  /* ---------- place order ---------- */
  function orderId() {
    var n = 480 + Math.floor(Math.random() * 120);
    return 'PW-2026-0' + n;
  }
  function place() {
    var t = PW.store.totals({ promo: promo, pickup: pickup() });
    if (!t.lines.length) { PW.ui.toast('Add a poster first', 'warn'); return; }
    if (!valid()) { PW.ui.toast('Check the highlighted fields', 'warn'); var bad = qs('.is-bad input, .is-bad select'); if (bad) bad.focus(); return; }
    var id = orderId();
    var order = {
      id: id, at: Date.now(), city: cityId, pay: pay, promo: promo,
      name: qs('#c-name').value.trim(), phone: qs('#c-phone').value.trim(), email: qs('#c-email').value.trim(),
      biz: qs('#c-biz').value.trim(), area: qs('#c-area').value.trim(), addr: qs('#c-addr').value.trim(),
      notes: qs('#notes').value.trim(), need: qs('#c-pin').value || qs('#need-by').value,
      total: t.total, goods: t.goods, gst: t.gst, delivery: t.delivery,
      invoice: (qs('#invoice').value || '').trim(),
      lines: t.lines.map(function (l) { return { name: l.name, qty: l.qty, unit: l.unit, summary: l.configSummary }; }),
      rushDays: t.rushDays, items: t.items, pieces: t.pieces
    };
    var all = orders();
    all[id] = order;
    PW.ls.set('localStorage', OKEY, JSON.stringify(all));
    PW.ls.set('localStorage', OKEY + '_last', id);
    PW.store.clear();
    renderDone(order);
    qs('#cart-wrap').hidden = true;
    qs('#checkout').hidden = true;
    document.title = 'Order ' + id + ' placed — PosterWala';
    window.scrollTo({ top: 0, behavior: PW.reduceMotion ? 'auto' : 'smooth' });
  }

  function renderDone(o) {
    var eta = PW.eta(o.rushDays);
    var payLine = {
      cod: 'Keep <b>' + money(o.total) + '</b> ready for the rider — they carry about Rs 5,000 in change.',
      jazz: 'Send <b>' + money(o.total) + '</b> to 0300 842 7755 (PosterWala Pvt Ltd) and WhatsApp the screenshot to start the press.',
      bank: 'Transfer <b>' + money(o.total) + '</b> to PK36HABB0012345678901200 (HBL, PosterWala Pvt Ltd), reference ' + o.id + '.',
      card: 'Complete the card payment when the gateway tab opens; nothing is charged until you approve the proof.',
      trade: 'Invoice goes to your accounts team on net 30, reference ' + o.id + '.'
    }[o.pay];
    qs('#done').hidden = false;
    qs('#done').innerHTML =
      '<div class="done"><div class="done__top">' +
      '<div class="done__tick" aria-hidden="true">✓</div>' +
      '<p class="done__id">Order placed · <b>' + esc(o.id) + '</b></p>' +
      '<h2 class="h2" style="color:#fff;margin:10px 0 10px">Thank you, ' + esc(o.name.split(' ')[0]) + '. It\'s on the board.</h2>' +
      '<p class="lead" style="color:rgba(255,255,255,.85)">A proof of your artwork goes to <b style="color:#fff">' + esc(o.phone) + '</b> on WhatsApp — inside 45 minutes during working hours. Nothing goes on a press until you reply OK.</p>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px">' +
      '<a class="btn btn--white" href="https://wa.me/' + D.brand.whatsapp + '?text=' + encodeURIComponent('Hi PosterWala, this is order ' + o.id + ' — happy to approve the proof.') + '">Message the press room</a>' +
      '<a class="btn btn--outline-l" href="#track" id="goto-track">Track this order</a>' +
      '<button class="btn btn--outline-l" type="button" onclick="window.print()">Print this confirmation</button></div>' +
      '</div><div class="done__grid">' +
      '<div class="done__cell"><dl class="kv"><dt>Arriving</dt><dd><b>' + PW.dateFmt(eta) + '</b> · ' + esc((PW.city(o.city) || D.cities[0]).name) + '</dd>' +
      '<dt>Address</dt><dd>' + esc(o.addr + ', ' + o.area) + '</dd><dt>Contact</dt><dd>' + esc(o.phone) + '</dd></dl></div>' +
      '<div class="done__cell"><dl class="kv"><dt>You pay</dt><dd><b>' + money(o.total) + '</b></dd><dt>Method</dt><dd>' + esc(PAYMENTS.filter(function (p) { return p.id === o.pay; })[0].t) + '</dd>' +
      '<dt>How</dt><dd>' + payLine + '</dd></dl></div>' +
      '<div class="done__cell"><dl class="kv"><dt>Posters</dt><dd>' + o.pieces + ' across ' + o.items + ' line' + (o.items === 1 ? '' : 's') + '</dd>' +
      '<dt>Goods / GST</dt><dd>' + money(o.goods) + ' / ' + money(o.gst) + '</dd>' +
      '<dt>Invoice</dt><dd>' + (o.invoice ? esc(o.invoice) : 'emailed with your proof') + '</dd></dl></div>' +
      '</div>' +
      '<div style="padding:18px"><div class="proof">' +
      '<div class="proof__c"><b>1 · Proof</b>We open your file, fix bleed, convert to CMYK and send a proof on WhatsApp. Usually inside 45 minutes.</div>' +
      '<div class="proof__c"><b>2 · Press</b>Once you approve, the job goes on the Indigo or the VUTEk. You get a photo of the sheet on the bed.</div>' +
      '<div class="proof__c"><b>3 · Courier</b>Tube-packed, insured, tracked. ' + esc((PW.city(o.city) || D.cities[0]).eta) + ' after dispatch. ' + (o.need ? 'You asked for it by ' + esc(o.need) + '.' : '') + '</div>' +
      '</div>' + (o.notes ? '<p class="small" style="margin-top:12px"><b>Your note to the press:</b> “' + esc(o.notes) + '”</p>' : '') +
      '<p class="small" style="margin-top:10px">Order <b>' + esc(o.id) + '</b> placed ' + new Date(o.at).toLocaleString('en-PK') + ' · quote reference ' + esc(o.id) + 'B · ' +
      '<a class="linkarrow" href="posters.html">start another order <span aria-hidden="true">→</span></a></p></div></div>';
    renderTrack(o.id);
    qs('#goto-track').addEventListener('click', function () { qs('#track-in').value = o.id; });
  }

  /* ---------- tracking ---------- */
  function orders() { try { return JSON.parse(PW.ls.get('localStorage', OKEY) || '{}'); } catch (e) { return {}; } }
  function stageOf(o) {
    var mins = (Date.now() - o.at) / 60000;
    if (mins < 1) return 1;
    if (mins < 6) return 2;
    if (mins < 20) return 3;
    if (mins < 60 * 12) return 4;
    return 5;
  }
  function renderTrack(id) {
    var out = qs('#track-out'), err = qs('#track-e');
    var all = orders();
    var o = all[id];
    if (!o) {
      err.hidden = false;
      err.textContent = id ? 'No order ' + id + ' on this device. Orders are stored locally in this demo — place one below the basket and it will track here.' : 'Type an order number to track it.';
      var lastId = PW.ls.get('localStorage', OKEY + '_last');
      out.innerHTML = '<div class="note"><span class="note__i">i</span><span>Try <b>' + esc(all[lastId] ? lastId : orderId()) + '</b> — orders from this browser are stored locally, so place a basket and it tracks itself here.</span></div>';
      return;
    }
    err.hidden = true;
    var st = stageOf(o);
    var steps = [
      ['Order received', 'Quote ' + money(o.total) + ' locked, job on the board', 0],
      ['Proof sent for approval', 'Artwork checked free · WhatsApp to ' + o.phone, 1],
      ['Approved — on press', (o.pieces) + ' posters, ' + o.items + ' build' + (o.items === 1 ? '' : 's'), 2],
      ['Cut and packed', 'Kongsberg cut, 3mm bleed verified, tube + board', 3],
      ['Out for delivery', (PW.city(o.city) || D.cities[0]).name + ' · ' + (PW.city(o.city) || D.cities[0]).eta + ' · TCS tracking on WhatsApp', 4]
    ];
    out.innerHTML = '<div class="track">' + steps.map(function (s, i) {
      var cls = i < st ? 'is-done' : i === st ? 'is-now' : '';
      return '<div class="track__s ' + cls + '"><span class="track__d">' + (i < st ? '✓' : i + 1) + '</span>' +
        '<div><p class="track__l">' + esc(s[0]) + '</p><p class="track__m">' + esc(s[1]) + '</p></div>' +
        '<span class="track__w">' + (i <= st ? timeAgo(o.at + i * 1200000) : 'queued') + '</span></div>';
    }).join('') + '</div>' +
      '<p class="small" style="margin-top:10px">Order <b>' + esc(o.id) + '</b> · placed ' + new Date(o.at).toLocaleString('en-PK') +
      ' · arriving ' + PW.dateFmt(PW.eta(o.rushDays)) + '. <button class="btn btn--quiet btn--sm" type="button" id="tr-refresh">Refresh</button></p>';
    var r = qs('#tr-refresh', out); if (r) r.addEventListener('click', function () { renderTrack(id); });
  }
  function timeAgo(ts) {
    var m = Math.max(0, Math.round((ts - Date.now()) / 60000));
    if (m <= 0) return 'now';
    if (m < 60) return 'in ' + m + ' min';
    return 'in ' + Math.round(m / 60) + ' h';
  }
  qs('#track-go').addEventListener('click', function () {
    var v = (qs('#track-in').value || '').trim().toUpperCase();
    renderTrack(v);
  });
  qs('#track-in').addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); qs('#track-go').click(); } });

  /* ---------- wire up ---------- */
  qs('#clear-all').addEventListener('click', function () {
    if (!PW.store.all().length) return;
    PW.store.clear();
    PW.ui.toast('Basket emptied');
  });
  qs('#checkout').addEventListener('submit', function (e) { e.preventDefault(); place(); });
  qs('#to-checkout').addEventListener('click', function (e) {
    e.preventDefault();
    qs('#checkout').hidden = false;
    qs('#checkout').scrollIntoView({ block: 'start', behavior: PW.reduceMotion ? 'auto' : 'smooth' });
    setTimeout(function () { qs('#c-name').focus(); }, 420);
  });
  qs('#fill-demo').addEventListener('click', function () {
    qs('#c-name').value = 'Areeba Khan';
    qs('#c-phone').value = '0321 4455667';
    qs('#c-email').value = 'areeba@zevaa.pk';
    qs('#c-biz').value = 'Zevaa Apparel';
    qs('#c-area').value = 'Gulberg III';
    qs('#c-addr').value = '24-C, MM Alam Road, near Grand Fleet';
    qs('#c-terms').checked = true;
    renderSummary();
    PW.ui.toast('Demo details filled', 'ok');
  });
  qs('#quote-wa').addEventListener('click', function () {
    var t = PW.store.totals({ promo: promo, pickup: pickup() });
    var txt = 'Hi PosterWala, quoting my basket ' + t.pieces + ' poster(s) = ' + money(t.total) + ':\n' +
      t.lines.map(function (l, i) { return (i + 1) + '. ' + l.name + ' — ' + l.configSummary + ' — ' + money(l.total); }).join('\n');
    location.href = 'https://wa.me/' + D.brand.whatsapp + '?text=' + encodeURIComponent(txt);
  });
  ['c-name', 'c-phone', 'c-email', 'c-area', 'c-addr'].forEach(function (id) {
    qs('#' + id).addEventListener('blur', function () { if (this.value) valid(); });
  });
  qs('#c-terms').addEventListener('change', valid);
  qs('#c-van').addEventListener('change', function () {
    renderSummary();
    PW.ui.toast(this.checked ? 'Collection selected — courier charge removed' : 'Courier delivery restored');
  });
  ['notes', 'invoice'].forEach(function (id) { qs('#' + id).addEventListener('input', renderSummary); });

  var busy = false;
  function syncPrices(notify) {
    if (busy) return 0;
    busy = true;
    var dirty = 0;
    try {
      PW.store.all().forEach(function (l) {
        var before = l.unit + '/' + l.total;
        recalc(l);
        if (before !== l.unit + '/' + l.total) {
          PW.store.update(l.id, { unit: l.unit, total: l.total, breakOff: l.breakOff });
          dirty++;
        }
      });
    } finally { busy = false; }
    if (dirty && notify) PW.ui.toast('Prices refreshed against the current rate card', 'ok');
    return dirty;
  }
  // any basket change re-prices through the live engine, then repaints
  PW.store.each(function () { syncPrices(false); renderLines(); renderSummary(); });
  renderCities(); renderPays(); renderPromo();
  var last = PW.ls.get('localStorage', OKEY + '_last');
  if (last) renderTrack(last); else renderTrack('');
  if (location.hash === '#track') qs('#track').scrollIntoView({ block: 'start' });
  setInterval(function () { if (!qs('#done').hidden) renderTrack(last || ''); }, 30000);
})(window.PW);
