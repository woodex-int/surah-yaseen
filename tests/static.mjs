import fs from 'fs';
import path from 'path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const pages = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));
const problems = [];
const warn = (m) => problems.push(m);

const allIdsByPage = {};
const allFiles = new Set();
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name === '.git' || e.name === 'node_modules') continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else allFiles.add(p.replace(ROOT + '/', ''));
  }
})(ROOT);

for (const pg of pages) {
  const html = fs.readFileSync(path.join(ROOT, pg), 'utf8');
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dupes = ids.filter((v, i) => ids.indexOf(v) !== i);
  if (dupes.length) warn(`${pg}: duplicate id(s): ${[...new Set(dupes)].join(', ')}`);
  allIdsByPage[pg] = new Set(ids);

  // internal links + assets
  for (const m of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|tel:|data:|javascript:)/.test(u)) continue;
    const clean = u.split('?')[0];
    if (!clean) continue;
    if (!allFiles.has(clean)) warn(`${pg}: broken reference → ${u}`);
  }
  // anchors
  for (const m of html.matchAll(/href="#([^"]+)"/g)) {
    if (!ids.includes(m[1])) warn(`${pg}: in-page link to missing #${m[1]}`);
  }
  for (const m of html.matchAll(/aria-controls="([^"]+)"/g)) {
    if (!ids.includes(m[1]) && !/^(omni|f-|tp|tb|pf|cf|faqs)/.test(m[1])) warn(`${pg}: aria-controls → missing #${m[1]}`);
  }
  // images need alt
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  imgs.forEach((t) => { if (!/\salt=/.test(t)) warn(`${pg}: <img> without alt: ${t.slice(0, 70)}`); });

  // structural
  const h1 = (html.match(/<h1\b/g) || []).length;
  if (h1 !== 1) warn(`${pg}: ${h1} <h1> elements (want exactly 1)`);
  if (!/<title>[^<]{12,}<\/title>/.test(html)) warn(`${pg}: missing/short <title>`);
  if (!/name="description"/.test(html)) warn(`${pg}: no meta description`);
  if (!/lang="en-PK"/.test(html)) warn(`${pg}: html lang not en-PK`);
  if (!/viewport/.test(html)) warn(`${pg}: no viewport meta`);
  if (/class="[^"]*\bclassName\b/.test(html)) warn(`${pg}: stray className attribute`);
  // script order
  const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]);
  if (scripts.indexOf('assets/js/data.js') !== 0) warn(`${pg}: data.js must load first → ${scripts.join(', ')}`);
  const pageJs = scripts.find((s) => /assets\/js\/(home|category|product|studio|basket)\.js/.test(s));
  if (pageJs && scripts.indexOf(pageJs) < scripts.indexOf('assets/js/core.js')) warn(`${pg}: ${pageJs} before core.js`);
  if (/<a class="skip"/.test(html) === false) warn(`${pg}: no skip link`);
}

// JS → DOM id references that no page declares and no JS creates
const jsFiles = [...allFiles].filter((f) => f.endsWith('.js'));
const jsSrc = jsFiles.map((f) => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n');
const htmlAll = pages.map((p) => fs.readFileSync(path.join(ROOT, p), 'utf8')).join('\n');
const referenced = new Set([...jsSrc.matchAll(/qs\('#([A-Za-z0-9_-]+)/g)].map((m) => m[1]));
for (const id of referenced) {
  if (!htmlAll.includes(`id="${id}"`) && !jsSrc.includes(`id="${id}"`) && !jsSrc.includes(`.id = '${id}'`)) warn(`js references #${id} — not present in any page`);
}

// asset weight sanity
const big = [...allFiles].filter((f) => /\.(jpg|png|svg)$/.test(f))
  .map((f) => [f, fs.statSync(path.join(ROOT, f)).size])
  .filter(([, s]) => s > 900000);
big.forEach(([f, s]) => warn(`heavy asset ${f} (${Math.round(s / 1024)} KB)`));

console.log(`pages: ${pages.join(', ')}`);
console.log(`files tracked: ${allFiles.size}`);
if (problems.length) { console.log('\nPROBLEMS:'); problems.forEach((p) => console.log('  ✗ ' + p)); }
else console.log('\n✓ no static problems found');
process.exit(problems.length ? 1 : 0);
