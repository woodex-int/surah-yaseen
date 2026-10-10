# INPRINT — Creative Production Agency Web Platform & Architecture

[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)
[![Design Reference](https://img.shields.io/badge/Design%20Reference-excited.agency-red.svg)](https://excited.agency/)
[![Palette](https://img.shields.io/badge/Palette-Strict%20White%2C%20Black%2C%20Red-red.svg)](#design-system)
[![Status](https://img.shields.io/badge/Production-Ready-white.svg)](#)

> **"From idea to brand launch. Design to delivery."**  
> Premium production agency web platform built for **INPRINT**, Lahore, Pakistan. Crafted with inspiration from **[Excited.agency](https://excited.agency/)**, using an uncompromising **strict White, Black, and Red (`#FF2D20`)** architectural design language.

---

## 💎 Highlights & Deliverables

* **Strict Visual Identity:** 100% compliant with the user mandate: strictly pure Black (`#000000`, `#0A0A0D`), pure White (`#FFFFFF`), and Brand Red (`#FF2D20`). Zero blues, yellows, or greens.
* **Excited Agency Architectural Design:** Alternating curved sheets (`rounded-t-[44px]`), prominent pill badge filters, interactive case study cards with client location + impact metrics, awards grid, and persistent bottom contact docking bar.
* **Full 26 Master Sections:**
  1. Header & Minimalist Top Bar
  2. Hero with Live Metrics & Dual Interactive CTAs
  3. Interactive Category Explorer (6 Categories, 60+ Products)
  4. Real-time Interactive Custom Quote Calculator (Materials, Finishes, Bleed, Quantity, Dynamic Subtotal)
  5. 3D Packaging & Mockup Studio (Rigid Box, Pouch, Sleeve, Magnetic Box)
  6. Comprehensive Portfolio & Case Studies (Client, Lahore/Nationwide, Impact Metrics)
  7. Interactive Print Production Pipeline & Process (6 Stages with Substrates & Equipment)
  8. Material & Finishes Sample Kit / Paper Specimen Explorer
  9. Equipment Fleet & Pre-Press Diagnostic Spec Sheet
  10. Client Reviews & Trust Verification (Verified 4.9 Rating)
  11. Instant Artwork Pre-Flight Checker (File inspection, bleed, color mode, resolution)
  12. Live Order Tracker (`INP-8492` default + custom search through 9 production stages)
  13. On-Site Corporate Survey & Measurement Request
  14. Franchise & Multi-Location Brand Rollout Planner
  15. Comprehensive FAQ with Category Filtering
  16. Creative Production Knowledge Base & Technical Blog
  17. Contact & Lahore Flagship Studio Locator (Google Map embed + One-tap WhatsApp & Direct Phone)
  18. Sticky Bottom Action Bar with Direct WhatsApp & Quote Triggers
* **Backend REST API:** Full Express.js server (`server/server.js`) with input validation, quotes, orders, pre-flight analysis, and franchise endpoints.
* **Database Layer:** Production SQL Schema (`database/schema.sql`), Seed Datasets (`database/seeds.sql`), and JSON snapshot (`database/inprint_database_dump.json`).
* **DevOps & Containers:** Multi-stage `Dockerfile` and `docker-compose.yml` for turnkey deployment.

---

## 🚀 Quickstart & Development

### 1. Frontend Development
```bash
# Install dependencies
npm install

# Start Vite live development server
npm run dev
```
Preview opens at `http://localhost:5173`.

### 2. Backend API Development
```bash
cd server
npm install
node server.js
```
API runs on `http://localhost:4000/api/v1`.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 📦 Master Bundle Download

The full production suite is archived in a single master ZIP file:
- File: `inprint-master-production.zip`
- Available directly in the root workspace and public assets directory (`public/inprint-master-production.zip`) for instant one-click browser download.

---

## 🏢 Contact & Flagship Studio

* **Primary Phone:** `+92 321 3656096`
* **Address:** M-71, Zainab Tower, Model Town Link Road, Lahore, 54700, Pakistan
* **Website:** https://inprint.pk
