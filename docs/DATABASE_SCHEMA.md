# INPRINT Database Architecture & Schema Specification

**Engine Target:** PostgreSQL 14+ / MySQL 8.0+ / SQLite 3  
**DDL Source:** `database/schema.sql`  
**Seed Source:** `database/seeds.sql`  

---

## Entity Relationship Overview

```
 [categories] 1 ──── ∞ [products] 1 ──── ∞ [product_materials]
                            │       1 ──── ∞ [product_finishes]
                            │
                            │ 1
                            │
                            ∞
                       [order_items] ∞ ──── 1 [orders]
```

---

## Table Definitions

### 1. `categories`
Stores master catalog taxonomy.
* `id` (VARCHAR(64), PK): Unique slug (e.g. `business-essentials`, `custom-packaging`).
* `name` (VARCHAR(128)): Display title.
* `slug` (VARCHAR(128), UNIQUE): URL slug.
* `headline` (VARCHAR(255)): Category banner headline.
* `intro` (TEXT): Descriptive overview.
* `item_count` (INT): Active product counter.

### 2. `products`
Commercial items with base configurations.
* `id` (VARCHAR(64), PK): Internal product code.
* `category_id` (VARCHAR(64), FK): Belongs to `categories.id`.
* `name` (VARCHAR(191)): Product title.
* `slug` (VARCHAR(191), UNIQUE): Product URL identifier.
* `base_price` (DECIMAL(12,2)): Minimum commercial batch rate (PKR).
* `turnaround` (VARCHAR(64)): Production SLA (e.g. `24-48 Hours`, `Same Day`).
* `standard_size` (VARCHAR(128)): Nominal dimensions.
* `bleed_requirement` (VARCHAR(64)): Prepress trim bleed (default: `3mm all sides`).
* `resolution_dpi` (VARCHAR(64)): Prepress resolution (default: `300 DPI CMYK`).

### 3. `product_materials` & `product_finishes`
Stock variations and embellishments.
* `price_multiplier` (DECIMAL(5,3)): Substrate scaling factor (e.g. `1.15` for 400gsm Velvet).
* `add_cost` (DECIMAL(10,2)): Fixed finish surcharge (e.g. `+1500.00` for Gold Foil Stamping).

### 4. `orders` & `order_items`
E-commerce and commercial print procurement runs.
* `order_number` (VARCHAR(32), UNIQUE): Human-readable ID (e.g. `INP-8492`).
* `delivery_method` (VARCHAR(32)): `pickup` (Model Town Lahore) or `delivery` (TCS Nationwide).
* `current_stage` (INT): 1 to 9 corresponding to `ORDER_STAGES`:
  1. Order Placed
  2. Pre-Press Review
  3. Digital Proof Sent
  4. Client Approval
  5. Press Plate Setup
  6. Printing & Coating
  7. Die-Cutting & Assembly
  8. Quality Inspection
  9. Dispatched / Ready for Pickup

### 5. `quotes` & `site_visits`
Lead intake and survey dispatch records.
* Indexed by `reference_id` and `client_phone` for rapid retrieval.

---

## Migration & Deployment

### Run on PostgreSQL:
```bash
psql -h localhost -U postgres -d inprint_db -f database/schema.sql
psql -h localhost -U postgres -d inprint_db -f database/seeds.sql
```

### Run on MySQL:
```bash
mysql -u root -p inprint_db < database/schema.sql
mysql -u root -p inprint_db < database/seeds.sql
```
