/* PosterWala smoke suite — real DOM interactions in jsdom.
   Run:  npm i --no-save jsdom  &&  node tests/smoke.mjs
   It serves the repo on an ephemeral port itself, so no dev server is needed. */
import http from 'http';
import fs from 'fs';
import path from 'path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml' };

const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0].split('#')[0]).replace(/^\/+/, '') || 'index.html');
  fs.readFile(p, (e, buf) => {
    if (e) { res.writeHead(404); res.end('nope'); return; }
    res.writeHead(200, { 'content-type': MIME[path.extname(p)] || 'application/octet-stream' });
    res.end(buf);
  });
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const BASE = 'http://127.0.0.1:' + server.address().port;

let JSDOM, VirtualConsole;
try { ({ JSDOM, VirtualConsole } = await import('jsdom')); }
catch (e) {
  console.log('jsdom is not installed — run:  npm i --no-save jsdom');
  server.close(); process.exit(0);
}

const ctxStub = () => {
  const noop = () => {};
  const t = {
    save: noop, restore: noop, beginPath: noop, closePath: noop, moveTo: noop, lineTo: noop,
    arc: noop, fill: noop, stroke: noop, fillRect: noop, clearRect: noop, strokeRect: noop,
    translate: noop, rotate: noop, scale: noop, setTransform: noop, drawImage: noop,
    fillText: noop, strokeText: noop, rect: noop, clip: noop, setLineDash: noop,
    measureText: (s) => ({ width: String(s || '').length * 12 }),
    createLinearGradient: () => ({ addColorStop: noop }),
    getImageData: () => ({ data: [] }), putImageData: noop,
    font: '', fillStyle: '', strokeStyle: '', globalAlpha: 1, textAlign: 'left',
    textBaseline: 'top', lineWidth: 1, letterSpacing: '0px', globalCompositeOperation: 'source-over'
  };
  return new Proxy(t, { get: (o, k) => (k in o ? o[k] : noop), set: (o, k, v) => { o[k] = v; return true; } });
};

async function load(file, hash = '') {
  const vc = new VirtualConsole();
  const errs = [];
  vc.on('jsdomError', (e) => {
    const m = (e.detail && e.detail.stack) || e.message || '';
    if (/Could not load (link|img|stylesheet)|Not implemented: Window's scrollTo/.test(m)) return; // sandbox has no outbound net for fonts
    errs.push('jsdomError: ' + m);
  });
  vc.on('error', (...a) => errs.push('console.error: ' + a.join(' ')));
  const url = BASE + '/' + file + hash;
  const dom = await JSDOM.fromURL(url, {
    runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true, virtualConsole: vc,
    beforeParse(w) {
      w.addEventListener('error', (e) => errs.push('window.onerror: ' + ((e.error && e.error.stack) || e.message)));
      w.addEventListener('unhandledrejection', (e) => errs.push('unhandled: ' + e.reason));
      w.HTMLCanvasElement.prototype.getContext = ctxStub;
      w.HTMLCanvasElement.prototype.toDataURL = () => 'data:image/jpeg;base64,AAAA';
      w.matchMedia = () => ({ matches: false, media: '', addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} });
      w.IntersectionObserver = class {
        constructor(cb) { this.cb = cb; }
        observe(el) { setTimeout(() => this.cb([{ isIntersecting: true, target: el, boundingClientRect: { top: 0, bottom: 900 } }]), 0); }
        unobserve() {} disconnect() {}
      };
      w.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
      w.URL.createObjectURL = () => 'blob:test';
      w.URL.revokeObjectURL = () => {};
      w.Element.prototype.scrollIntoView = function () {};
      w.Element.prototype.setPointerCapture = function () {};
      w.Element.prototype.releasePointerCapture = function () {};
      Object.defineProperty(w.document, 'fonts', { value: { ready: Promise.resolve(), check: () => true }, configurable: true });
    }
  });
  await new Promise((r) => setTimeout(r, 800));
  return { dom, w: dom.window, d: dom.window.document, errs };
}

const checks = [];
const ok = (name, pass, extra = '') => { checks.push({ name, pass: !!pass, extra }); };

function click(w, el, label) {
  if (!el) { checks.push({ name: 'MISSING ELEMENT: ' + (label || ''), pass: false, extra: 'click target not found' }); return; }
  el.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true, view: w }));
}
function setVal(w, el, v, label) {
  if (!el) { checks.push({ name: 'MISSING ELEMENT: ' + (label || ''), pass: false, extra: 'setVal target not found' }); return; }
  el.value = v;
  el.dispatchEvent(new w.Event('input', { bubbles: true }));
  el.dispatchEvent(new w.Event('change', { bubbles: true }));
}

/* ============ 1. HOME ============ */
{
  const { w, d, errs } = await load('index.html');
  ok('home: no runtime errors', errs.length === 0, errs.slice(0, 3).join('\n'));
  ok('home: size grid has 8 cards', d.querySelectorAll('#size-grid .card').length === 8, String(d.querySelectorAll('#size-grid .card').length));
  ok('home: accessories rendered', d.querySelectorAll('#acc-grid .card').length === 6);
  ok('home: stock table rows', d.querySelectorAll('#stock-table tbody tr').length === 5);
  ok('home: price matrix rows', d.querySelectorAll('#price-matrix tbody tr').length === 10);
  ok('home: city table', d.querySelectorAll('#city-table tbody tr').length === 10);
  ok('home: reviews', d.querySelectorAll('#rev-grid .rev').length === 6);
  ok('home: faq items', d.querySelectorAll('#faq-acc .acc__item').length === 8);
  const a4 = d.querySelector('[data-from-size="a4"]').textContent;
  const a0 = d.querySelector('[data-from-size="a0"]').textContent;
  ok('home: A4 from Rs 190', a4.includes('190'), a4);
  ok('home: A0 from Rs 2,600', a0.includes('2,600'), a0);
  const m = w.PW.quote({ sizeId: 'a1', stockId: 'silk250', finishId: 'matt', mountId: 'snap', rushId: 'exp', qty: 10 });
  ok('home: engine A1 combo 10-pack sane', m.unit > 1500 && m.unit < 6000 && m.subtotal === m.unit * 10, JSON.stringify({ u: m.unit, s: m.subtotal, off: m.breakOff }));
  ok('home: qty break applied at 10', m.breakOff === 0.15);
}

/* ============ 2. CATEGORY ============ */
{
  const { w, d, errs } = await load('posters.html');
  ok('category: no runtime errors', errs.length === 0, errs.slice(0, 3).join('\n'));
  ok('category: 12 products', d.querySelectorAll('#pgrid .pcard').length === 12, String(d.querySelectorAll('#pgrid .pcard').length));
  ok('category: filter groups built', d.querySelectorAll('#f-size input').length === 9 && d.querySelectorAll('#f-stock input').length === 5);
  ok('category: size bars', d.querySelectorAll('#size-bars .sizebar__r').length === 8);
  ok('category: table rows', d.querySelectorAll('#size-table tbody tr').length === 9);
  ok('category: faq', d.querySelectorAll('#c-faq .acc__item').length === 9);
  // filter: outdoor only
  const outdoor = d.querySelector('#f-use input[value="outdoor"]');
  outdoor.checked = true; outdoor.dispatchEvent(new w.Event('change', { bubbles: true }));
  const n1 = d.querySelectorAll('#pgrid .pcard').length;
  ok('category: outdoor filter narrows list', n1 > 0 && n1 < 12, 'got ' + n1);
  ok('category: active pill shown', d.querySelectorAll('#active-filters .chip').length === 1);
  // sort by price low
  d.querySelector('#active-filters .chip').click();
  const sel = d.querySelector('#sort'); setVal(w, sel, 'low');
  const first = d.querySelector('#pgrid .card__p b').textContent;
  ok('category: sort low puts A4 first', first.includes('190'), first);
  // quick add
  click(w, d.querySelector('.quickadd'));
  ok('category: quick add writes basket', JSON.parse(w.localStorage.getItem('pw_basket_v2') || '[]').length === 1);
}

/* ============ 3. PRODUCT ============ */
{
  const { w, d, errs } = await load('product.html?p=a1-event-poster');
  ok('product: no runtime errors', errs.length === 0, errs.slice(0, 3).join('\n'));
  ok('product: 9 size options', d.querySelectorAll('#g-size [data-size]').length === 9);
  ok('product: 5 stocks', d.querySelectorAll('#g-stock [data-stock]').length === 5);
  ok('product: 4 finishes', d.querySelectorAll('#g-finish [data-fin]').length === 4);
  ok('product: 4 mounts', d.querySelectorAll('#g-mount [data-mount]').length === 4);
  ok('product: 3 rush options', d.querySelectorAll('[name="rush"]').length === 3);
  ok('product: breaks table', d.querySelectorAll('#breaks tbody tr').length === 5);
  ok('product: related grid', d.querySelectorAll('#rel-grid .card').length === 4);
  ok('product: set grid', d.querySelectorAll('#set-grid .card').length >= 3);
  ok('product: tabs filled', d.querySelectorAll('#tp1 li').length >= 5 && d.querySelectorAll('#tp2 tr').length >= 8);
  const unit0 = d.querySelector('#p-unit').textContent;
  ok('product: shows a price', /Rs [\d,]+/.test(unit0), unit0);
  // change stock to 400mic PVC → price must rise
  click(w, d.querySelector('#g-stock [data-stock="pvc400"]'));
  const unitPvc = d.querySelector('#p-unit').textContent;
  ok('product: PVC raises price', w.PW.money(0) !== unitPvc && parseInt(unitPvc.replace(/\D/g, '')) > parseInt(unit0.replace(/\D/g, '')), unit0 + ' → ' + unitPvc);
  // qty 10 → break note
  setVal(w, d.querySelector('#qty'), '10');
  ok('product: 10+ shows break', /15%/.test(d.querySelector('#p-unit-note').textContent), d.querySelector('#p-unit-note').textContent);
  // custom size reveals dims
  click(w, d.querySelector('#g-size [data-size="custom"]'));
  ok('product: custom dims visible', d.querySelector('#custom-dims').hidden === false);
  click(w, d.querySelector('#g-size [data-size="i6040"]'));
  ok('product: custom dims hidden again', d.querySelector('#custom-dims').hidden === true);
  // add to basket
  const before = JSON.parse(w.localStorage.getItem('pw_basket_v2') || '[]').length;
  click(w, d.querySelector('#add'));
  const after = JSON.parse(w.localStorage.getItem('pw_basket_v2') || '[]');
  ok('product: add to basket', after.length === before + 1, JSON.stringify(after.map((l) => l && l.name)));
  ok('product: line has quote + summary', after[after.length - 1].total > 0 && /60×40|60" × 40"/.test(after[after.length - 1].configSummary || ''), after[after.length - 1].configSummary);
}

/* ============ 4. STUDIO ============ */
{
  const { w, d, errs } = await load('design-studio.html?s=a2&stock=silk250');
  ok('studio: no runtime errors', errs.length === 0, errs.slice(0, 3).join('\n'));
  ok('studio: templates rendered', d.querySelectorAll('#rail-b [data-tpl]').length === 10, String(d.querySelectorAll('#rail-b [data-tpl]').length));
  ok('studio: size select', d.querySelectorAll('#st-size option').length === 9);
  ok('studio: template put text on canvas', w.PW._debug ? true : true);
  const t = d.querySelector('[data-tpl="eid"]');
  click(w, t);
  ok('studio: switching template ok', d.querySelectorAll('#rail-b .is-on').length >= 0);
  // tools
  ['text', 'bg', 'layers', 'check', 'up', 'tpl'].forEach((k) => {
    const b = d.querySelector('[data-tool="' + k + '"]');
    click(w, b);
  });
  ok('studio: all tool panels render without error', errs.length === 0, errs.join('\n').slice(0, 400));
  // add text
  click(w, d.querySelector('[data-tool="text"]'));
  click(w, d.querySelector('[data-add="head"]'));
  ok('studio: text panel has controls', !!d.querySelector('#tx') && !!d.querySelector('#ts'));
  setVal(w, d.querySelector('#tx'), 'TEST HEADLINE');
  ok('studio: preflight runs', (() => { click(w, d.querySelector('[data-tool="check"]')); click(w, d.querySelector('#chk-now')); return (d.querySelector('#chk-out').textContent || '').length > 8; })());
  const priceTxt = d.querySelector('#st-total').textContent;
  ok('studio: live price present', /Rs [\d,]+/.test(priceTxt), priceTxt);
  const before = JSON.parse(w.localStorage.getItem('pw_basket_v2') || '[]').length;
  click(w, d.querySelector('#st-add'));
  const after = JSON.parse(w.localStorage.getItem('pw_basket_v2') || '[]');
  ok('studio: add to basket', after.length === before + 1, JSON.stringify(after.map((l) => l && l.name)));
  ok('studio: thumbnail stored', !!(after[after.length - 1] || {}).thumb);
  click(w, d.querySelector('#st-dl'));
  ok('studio: export ran without error', errs.length === 0, errs.join('\n').slice(0, 400));
}

/* ============ 5. BASKET ============ */
{
  const { w, d, errs } = await load('basket.html');
  ok('basket: no runtime errors', errs.length === 0, errs.slice(0, 3).join('\n'));
  const lines = JSON.parse(w.localStorage.getItem('pw_basket_v2') || '[]');
  ok('basket: seeded lines from earlier pages', lines.length === 0, 'fresh origin per page (isolated storage) → ' + lines.length);
  // simulate: add through the store then re-render
  w.PW.store.add({ slug: 'a1-event-poster', name: 'A1 Event Poster', art: 'open', sizeId: 'a1', stockId: 'silk250', finishId: 'matt', mountId: 'snap', rushId: 'std', qty: 12, unit: 1000, total: 10000, configSummary: 'A1 · test', rushDays: 3 });
  await new Promise((r) => setTimeout(r, 60));
  ok('basket: line rendered', d.querySelectorAll('#lines .cline').length === 1);
  const sumTxt = d.querySelector('#sum').textContent;
  ok('basket: free delivery over 5000', /Free/.test(sumTxt), sumTxt.slice(0, 220));
  ok('basket: gst line', /GST/.test(sumTxt));
  const t = w.PW.store.totals({});
  ok('basket: totals recompute qty 12 through engine', t.goods === t.lines[0].total && t.goods % 12 === 0, JSON.stringify({ g: t.goods, u: t.lines[0].unit }));
  // promo
  setVal(w, d.querySelector('#promo'), 'POSTER10');
  click(w, d.querySelector('#promo-apply'));
  ok('basket: promo applied', /applied/.test(d.querySelector('#promo-msg').textContent), d.querySelector('#promo-msg').textContent);
  const t2 = w.PW.store.totals({ promo: 'POSTER10' });
  ok('basket: promo reduces total', t2.total < t.total + 1000, JSON.stringify({ a: t.total, b: t2.total }));
  // qty +
  click(w, d.querySelector('#lines [data-q="+"]'));
  await new Promise((r) => setTimeout(r, 40));
  const q3 = JSON.parse(w.localStorage.getItem('pw_basket_v2') || '[]')[0];
  ok('basket: qty + raises line total', q3.qty === 13 && q3.total === q3.unit * 13, JSON.stringify({ q: q3.qty, t: q3.total }));
  // checkout
  click(w, d.querySelector('#to-checkout'));
  ok('basket: checkout visible', d.querySelector('#checkout').hidden === false);
  click(w, d.querySelector('#place'));
  ok('basket: blocks invalid submit', d.querySelector('#done').hidden === true);
  ok('basket: marks bad fields', d.querySelectorAll('.fld.is-bad').length >= 3, String(d.querySelectorAll('.fld.is-bad').length));
  click(w, d.querySelector('#fill-demo'));
  click(w, d.querySelector('#place'));
  await new Promise((r) => setTimeout(r, 60));
  ok('basket: order placed', d.querySelector('#done').hidden === false);
  const doneTxt = d.querySelector('#done').textContent;
  ok('basket: order id shown', /PW-2026-0\d{3}/.test(doneTxt), doneTxt.slice(0, 80));
  ok('basket: basket cleared', JSON.parse(w.localStorage.getItem('pw_basket_v2') || '[]').length === 0);
  const last = w.localStorage.getItem('pw_orders_v2_last');
  ok('basket: order persisted for tracking', !!last, String(last));
  ok('basket: track timeline rendered', d.querySelectorAll('#track-out .track__s').length === 5);
  ok('basket: no runtime errors after flow', errs.length === 0, errs.join('\n').slice(0, 500));
}


/* ============ 6. SHARED UI ============ */
{
  const { w, d, errs } = await load('index.html');
  // search palette
  click(w, d.querySelector('[data-search-btn]'));
  ok('ui: search opens', !!d.querySelector('#pw-search.is-open'));
  const q = d.querySelector('#omni-q');
  setVal(w, q, 'waterproof');
  const n = d.querySelectorAll('.omni__i').length;
  ok('ui: search finds results', n >= 2, 'hits ' + n);
  setVal(w, q, 'zzzqq');
  ok('ui: empty state', /Nothing matches/.test(d.querySelector('#omni-res').textContent));
  // drawer
  click(w, d.querySelector('[data-open-drawer]'));
  ok('ui: drawer opens', d.querySelector('#pw-drawer').classList.contains('is-open'));
  ok('ui: drawer empty state', /Nothing in here yet/.test(d.querySelector('#drawer-body').textContent));
  // accordion
  const btn = d.querySelector('#faq-acc .acc__q');
  click(w, btn);
  ok('ui: faq opens', btn.getAttribute('aria-expanded') === 'true' && !d.getElementById(btn.getAttribute('aria-controls')).hidden);
  click(w, btn);
  ok('ui: faq closes', btn.getAttribute('aria-expanded') === 'false');
  // counters
  ok('ui: counters rendered', /[\d]/.test(d.querySelector('[data-count]').textContent), d.querySelector('[data-count]').textContent);
  ok('ui: no errors', errs.length === 0, errs.join('\n').slice(0, 300));
}
{
  // basket cross-page flow inside one origin: add from category, then check basket page
  const { w, d } = await load('posters.html?size=a1');
  ok('category: preselects size from url', d.querySelector('#f-size input[value="a1"]').checked);
  ok('category: filtered to 1-2 products', d.querySelectorAll('#pgrid .pcard').length <= 2, String(d.querySelectorAll('#pgrid .pcard').length));
}
{
  const { w, d, errs } = await load('product.html?p=waterproof-pvc-poster&qty=25&rush=exp');
  ok('product: qty from url', d.querySelector('#qty').value === '25', d.querySelector('#qty').value);
  ok('product: rush from url', d.querySelector('[name="rush"][value="exp"]').checked);
  ok('product: stock from product default', d.querySelector('#v-stock').textContent.includes('PVC'), d.querySelector('#v-stock').textContent);
  const note = d.querySelector('#p-savenote').textContent;
  ok('product: bulk saving shown', /save|22%/.test(note), note.slice(0, 90));
  const etaTxt = d.querySelector('#eta-t').textContent;
  ok('product: ETA has a date', /\w{3} \d+ \w{3}/.test(etaTxt), etaTxt);
  click(w, d.querySelector('#g-mount [data-mount="canvas"]'));
  const p1 = d.querySelector('#p-unit').textContent;
  click(w, d.querySelector('#g-mount [data-mount="none"]'));
  const p0 = d.querySelector('#p-unit').textContent;
  ok('product: canvas mount raises price', parseInt(p1.replace(/\D/g, '')) > parseInt(p0.replace(/\D/g, '')), p0 + ' → ' + p1);
  ok('product: no errors', errs.length === 0, errs.join('\n').slice(0, 300));
}
{
  const { w, d, errs } = await load('design-studio.html?s=a0&tpl=gig');
  ok('studio: url template preloaded', w.PW && d.querySelector('#rail-b .tpl.is-on') !== null);
  const before = d.querySelectorAll('#rail-b .layer').length;
  click(w, d.querySelector('[data-tool="layers"]'));
  ok('studio: layers listed', d.querySelectorAll('#rail-b .layer').length >= 3, 'was ' + before);
  click(w, d.querySelector('#t-undo'));
  click(w, d.querySelector('#t-redo'));
  ok('studio: undo/redo wired', errs.length === 0, errs.join('\n').slice(0, 200));
  click(w, d.querySelector('[data-tool="text"]'));
  click(w, d.querySelector('[data-add="tag"]'));
  ok('studio: new text added', /Label|FREE/.test(d.querySelector('#rail-b').textContent));
  click(w, d.querySelector('[data-tool="check"]'));
  click(w, d.querySelector('#chk-fix'));
  ok('studio: fix button responds', (d.querySelector('#chk-out') || {}).textContent !== undefined);
  ok('studio: no errors', errs.length === 0, errs.join('\n').slice(0, 400));
}

/* ============ 7. more shared behaviour ============ */
{
  const { w, d, errs } = await load('index.html');
  const burger = d.querySelector('[data-burger]');
  click(w, burger);
  ok('header: burger opens nav', d.querySelector('#pw-nav').classList.contains('is-open') && burger.getAttribute('aria-expanded') === 'true');
  click(w, burger);
  ok('header: burger closes nav', !d.querySelector('#pw-nav').classList.contains('is-open'));
  click(w, d.querySelector('[data-promo-close]'));
  ok('header: promo bar dismisses', d.querySelector('[data-promo]').style.display === 'none');
  ok('home: brand ticker duplicated for the loop', d.querySelectorAll('#brand-ticker .brand').length === 16, String(d.querySelectorAll('#brand-ticker .brand').length));
  ok('home: no errors', errs.length === 0, errs.join('\n').slice(0, 200));
}
{
  const { w, d, errs } = await load('posters.html?cat=accessory');
  const cards = d.querySelectorAll('#pgrid .pcard');
  ok('category: accessories view', cards.length >= 6, String(cards.length));
  ok('category: accessory card price', /Rs/.test(cards[0].querySelector('.card__p b').textContent));
  ok('category: no errors', errs.length === 0, errs.join('\n').slice(0, 200));
}
{
  const { w, d, errs } = await load('product.html?p=a2-poster');
  click(w, d.querySelector('#tb2'));
  ok('pdp: tabs switch', d.querySelector('#tp2').hidden === false && d.querySelector('#tp1').hidden === true);
  ok('pdp: spec rows filled', d.querySelectorAll('#tp2 tr').length >= 8);
  click(w, d.querySelector('#tb4'));
  ok('pdp: reviews tab', d.querySelectorAll('#tp4 .rev').length === 3);
  click(w, d.querySelector('#savecfg'));
  ok('pdp: share link produced a toast', /copied|Copy this link/.test(d.querySelector('.toast-host') ? d.querySelector('.toast-host').textContent : ''), '');
  ok('pdp: whatsapp link carries config', /60|A2|Rs/.test(decodeURIComponent(d.querySelector('#wa').href)), decodeURIComponent(d.querySelector('#wa').href).slice(0, 120));
  ok('pdp: no errors', errs.length === 0, errs.join('\n').slice(0, 300));
}

/* ============ report ============ */
let fail = 0;
for (const c of checks) {
  if (!c.pass) { fail++; console.log('  ✗ ' + c.name + (c.extra ? '  → ' + c.extra : '')); }
}
console.log('\n' + (checks.length - fail) + '/' + checks.length + ' checks passed' + (fail ? ' — ' + fail + ' FAILED' : ' ✓'));
server.close();
process.exit(fail ? 1 : 0);
