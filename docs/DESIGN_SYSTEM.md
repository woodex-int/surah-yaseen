# INPRINT Design System Specification

**Reference Aesthetic:** Excited Agency (`https://excited.agency/`)  
**Strict Palette:** Exclusively **White, Black, and Red**  
**Core Brand Token:** Red `#FF2D20`  

---

## 1. Color Palette

```
┌─────────────────┬───────────┬──────────────────────────────────────────┐
│ Name            │ Hex Code  │ Usage Context                            │
├─────────────────┼───────────┼──────────────────────────────────────────┤
│ Pure Black      │ #000000   │ Canvas background, text on white sheets  │
│ Obsidian Black  │ #0A0A0D   │ Deep primary section sheets & containers │
│ Charcoal Dark   │ #0D0E12   │ Surface cards, hover states, input wells │
│ High-Tone Gray  │ #16171B   │ Secondary border lines & dividers        │
│ Pure White      │ #FFFFFF   │ High-contrast curved sheets, primary text│
│ Off-White       │ #F4F4F6   │ Minimalist architectural card surfaces   │
│ Brand Red       │ #FF2D20   │ Buttons, badges, focus rings, callouts   │
│ Accessible Red  │ #FF453A   │ Small monospace text badges (WCAG 4.8:1) │
│ Brand Red Dark  │ #E02418   │ Button active/hover state                │
└─────────────────┴───────────┴──────────────────────────────────────────┘
```

> **Mandate:** No green, emerald, lime, yellow, amber, cyan, or blue are permitted anywhere in production components.

---

## 2. Typography

1. **Headlines (`font-display`):**
   * **Space Grotesk** & **Syne**
   * Weights: 700 (Bold), 800 (Extra Bold), 900 (Black).
   * Letter-spacing: `-0.03em` for monumental, high-impact titles.

2. **Body Text (`font-sans`):**
   * **Plus Jakarta Sans**
   * Weights: 400 (Regular), 500 (Medium), 600 (Semi-Bold).
   * High legibility on dark and light surfaces.

3. **Technical Specs & Dimensions (`font-mono`):**
   * **JetBrains Mono**
   * Weights: 500 (Medium), 700 (Bold).
   * Used for pricing, turnaround, dielines, and order statuses.

---

## 3. UI Component Classes

### Pill Badges
* `.pill-badge-red`: Solid brand red badge (`#FF2D20`) with white text.
* `.pill-badge-red-outline`: Subtle red backdrop (`rgba(255,45,32,0.12)`) with `#FF453A` text.
* `.pill-badge-dark`: Minimalist charcoal pill with delicate border.
* `.pill-badge-light`: Crisp off-white pill for light sheet sections.

### Buttons
* `.btn-pill-red`: Primary high-conversion action button (`#FF2D20`) with smooth hover lift.
* `.btn-pill-white`: Secondary high-contrast pill button (`#FFFFFF`).
* `.btn-pill-dark`: Subtle dark outlined pill button (`rgba(255,255,255,0.06)`).

### Alternating Curved Sheets (Excited.agency Pattern)
* `.sheet-black`: Pure black curved surface with top border radius `44px`.
* `.sheet-white`: Pure white surface with top border radius `44px` and dark drop shadow.
