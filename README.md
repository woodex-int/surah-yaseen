# PosterWala — poster printing store (design reference build)

A five-page print e-commerce front end for a fictional Pakistani poster shop, built as a static
HTML/CSS/JS site — no framework, no build step, no runtime dependencies.

Design brief was reverse-engineered from two references:

| Reference | What was taken from it |
| --- | --- |
| [instantprint.co.uk/posters](https://www.instantprint.co.uk/posters) | The conversion skeleton of a print category page: **Shop by size** grid with a real `From Rs` price and dual CTAs (`Continue` / `Design online`), accessories cross-sell, "which machine prints it", paper-stock explainer, 4-step ordering, long-form SEO copy + FAQ accordions, trust stats. |
| [printspace /demand (Harutheme WooCommerce POD theme)](https://printspace.harutheme.com/demand/) | The POD-store drama: brand logo marquee, `4.9/5` rating panel with bar chart, **animated counters**, "how it works" band, category tiles, mixed media gallery collages, and a rotating hero banner (implemented here as a slow art-rotation on the hero card). |

Visual direction requested: **white / black / red**. Implemented as a print-catalogue language —
paper white, litho ink black, one spot colour (`#E4002B`, close to Pantone Red 032), hairline rules,
sharp 4–6px radii, `Archivo` 900 for display type, `Inter` for UI, `IBM Plex Mono` for anything numeric.
Light commerce surfaces carry the shop grids and configurators; each page gets one dark showpiece band.

## Run it

```bash
python3 -m http.server 8000      # or: npx serve .
open http://localhost:8000/
```

Any static host works — the site is plain files. Opening `index.html` directly from disk also works
(`localStorage` may be blocked on `file://` origins in some browsers; the code degrades to in-memory
state rather than throwing).

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home: hero, brand ticker, promises, 8-card size grid, dark stats + press band, 4-step, accessories, stock/finish guide, **live bulk price matrix**, gallery, reviews + rating bars, delivery zones, long copy, FAQ, CTA. |
| `posters.html` | Category: sticky filter rail (size, stock, indoor/outdoor, laminate, speed/budget, frames), sort, live result count, active-filter pills, quick-add, size-comparison bars, page-specific FAQ. Reads `?size=` / `?stock=` / `?cat=accessory`. |
| `product.html` | Configurator: size + orientation (custom mm fields appear for Custom size), stock, laminate (locked on light stocks), mounting, quantity with break table, turnaround with per-city ETA, artwork dropzone with a real DPI verdict, live price + itemised breakdown, tabs, complete-the-set, related, sticky buy bar. Reads `?p= &size= &stock= &finish= &mount= &rush= &qty= &rot=l`. |
| `design-studio.html` | Canvas editor: 10 templates, upload/drag artwork, add/edit text (typeface, size, line-height, block width, colour, rotation), paper + spot colour + 5 patterns, layers with reorder/duplicate, drag/resize/rotate handles, bleed + trim + safe-area guides, zoom, undo/redo, keyboard nudges, **pre-flight checker with an auto-fix**, PNG export at 72/150/300 DPI *including 3mm bleed*, autosaved draft, live price + add-to-basket with a rendered thumbnail. Reads `?s= &stock= &tpl= &tab=check`. |
| `basket.html` | Cart + checkout: re-prices every line through the engine, quantity breaks, promo code (`POSTER10`), free-delivery threshold, GST, collection-vs-courier toggle, 4-step checkout with Pakistani phone/address validation, order confirmation with proof-approval flow, and an order tracker that advances over time. |

## Shared modules

```
assets/js/data.js    single source of truth: sizes, stocks, finishes, mounts, rush, qty breaks,
                     catalogue, accessories, templates, testimonials, FAQs, cities, copy
assets/js/core.js    pricing engine, basket store, drawer, toasts, search palette, reveal,
                     counters, accordions, tabs, marquee, CSS poster-art thumbnails
assets/js/home.js    renders every data-driven block on the home page
assets/js/category.js|product.js|studio.js|basket.js   page behaviour
assets/css/site.css  tokens, type, header/footer, hero, cards, drawer, search, dark bands
assets/css/pages.css category, configurator, studio, basket/checkout
```

### The price engine (why every number agrees)

One function, `PW.quote(cfg)`, is used by the size grid, the category cards, the PDP, the studio and
the basket, so a "From Rs" label can never drift from a checkout total:

```
print  = max(size minimum, area_m² × substrate rate × custom-cut uplift)
finish = area_m² × laminate rate                 (per m², so it scales with size)
mount  = max(mount minimum, area_m² × mount rate)
rush   = (print + finish + mount) × rush factor   (0 / 15% / 35%)
unit   = round(total → nearest Rs 10) after the quantity break (5→8%, 10→15%, 25→22%, 50→30%)
```

Delivery is `Rs 250`, free over `Rs 5,000`; GST `17%` is added only at checkout; turnaround ETA
skips Sundays and adds a courier day by zone. `home.js` overwrites every hand-written price label
with the engine's value on load as a drift guard.

### Market localisation (Pakistan)

PKR pricing, `Rs` labels, 74-city delivery with TCS/Leopards/Lahore vans, cash on delivery,
JazzCash / Easypaisa / IBAN bank transfer, NTN + PRA/SRB invoicing, Urdu accent line, and print
realities specific to the market (monsoon-rated PVC instead of paper outdoors, 1200 DPI large
format for dust and humidity, Nastaliq type-size warnings on the artwork checker).

## Notes

- **Accessibility:** skip links, one `h1` per page (visually hidden in the app shell), labelled
  controls, `aria-pressed` / `aria-expanded` / `role=tab` with arrow-key navigation, focus-visible
  rings, `aria-live` on results, 4.85:1 contrast on red buttons, and full
  `prefers-reduced-motion` opt-out (marquee, reveal, counters, hero rotation, smooth scroll).
- **Robustness:** all storage access goes through a `try/catch` wrapper that falls back to memory;
  no external JS; fonts load from Google with a system-stack fallback so the layout survives a
  blocked CDN; images are lazy except the hero.
- **Weight:** ~1.4 MB of JPEG across 7 photos; all product thumbnails are pure CSS compositions,
  not images, so the shop grid is instant and the artwork never goes stale.

## Tests

```bash
node tests/static.mjs                        # dependency-free: links, ids, alt text, h1/title,
                                             # script order, aria wiring, asset existence
npm i --no-save jsdom && node tests/smoke.mjs # 93 interaction checks: filters, sort, quick-add,
                                             # configurator price deltas, custom mm, basket
                                             # re-pricing, promo, validation, order + tracking,
                                             # studio tools, pre-flight, export
```

Both suites are what caught the real bugs during this build (a duplicate accordion binding that
toggled the FAQ back shut, a stale `brk:` reference in the totals, an un-called renderer on the PDP,
and three different "from" prices for the custom size).

## Disclaimer

PosterWala is a fictional brand invented for this design exercise. Prices, press models, review
counts and courier details are illustrative. Third-party names (HP Indigo, EFI VUTEk, Kongsberg,
Polar, TCS, Leopards, JazzCash, Easypaisa) belong to their owners and appear only to describe print
technology and payment methods.
