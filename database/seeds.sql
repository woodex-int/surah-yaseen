-- =============================================================================
-- INPRINT CREATIVE PRODUCTION AGENCY — PRODUCTION SEEDS
-- =============================================================================

-- Seed Categories
INSERT INTO categories (id, name, slug, headline, intro, item_count) VALUES
('business-essentials', 'Business Essentials', 'business-essentials', 'Business print for every working day.', 'Business cards, letterheads, folders, profiles, forms and stationery produced with consistent brand application.', 10),
('custom-packaging', 'Packaging & Boxes', 'custom-packaging', 'Packaging that protects, presents and sells.', 'Custom folding cartons, rigid boxes, sleeves, mailers and food-grade takeaway packaging made to order.', 9),
('signage-display', 'Signage & Spatial Branding', 'signage-display', 'Signage engineered for presence and longevity.', 'Illuminated 3D channel letters, halo-lit logos, acrylic office signs, directory systems and pylons.', 8),
('promotional-events', 'Promotional & Large Format', 'promotional-events', 'Large-format impact for launches and spaces.', 'Panna flex banners, tension fabric backdrops, roll-up standees, vehicle branding and vinyl graphics.', 9),
('marketing-collateral', 'Marketing Collateral', 'marketing-collateral', 'Printed collateral that communicates quality.', 'Brochures, flyers, lookbooks, table talkers, door hangers and multi-page catalogues with premium finishes.', 8),
('stickers-labels', 'Stickers & Labels', 'stickers-labels', 'Precision die-cut stickers and labels.', 'Die-cut vinyl stickers, roll labels, security seals, metallic foil stickers and barcode labels.', 7),
('corporate-gifting', 'Corporate Gifting', 'corporate-gifting', 'Executive gifting that reflects your brand.', 'Customized executive diaries, engraved metal pens, branded drinkware, notebooks and luxury welcome kits.', 8),
('apparel-uniforms', 'Apparel & Uniforms', 'apparel-uniforms', 'Professional uniforms that unite your team.', 'Embroidered polo shirts, aprons, chef coats, high-visibility vests and branded caps.', 6)
ON CONFLICT (id) DO NOTHING;

-- Seed Sample Products
INSERT INTO products (id, category_id, name, slug, short_description, intro, base_price, turnaround, image_url, standard_size, print_method, min_order_qty) VALUES
('prod-card-matte', 'business-essentials', 'Velvet Matte Business Cards', 'velvet-matte-business-cards', 'Tactile velvet lamination on heavy 400gsm art board with crisp razor-cut edges.', 'The executive standard for Lahore professionals.', 2200.00, '24-48 Hours', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800', '3.5 x 2.0 in (89 x 51 mm)', 'Offset Litho 4C + Matte Thermal', '100 cards'),
('prod-card-spotuv', 'business-essentials', 'Spot UV & Gold Foil Executive Cards', 'spot-uv-gold-foil-cards', 'High-gloss raised UV texture combined with hot stamped metallic foil on matte black board.', 'Designed for founders, architects and luxury brands.', 4500.00, '48-72 Hours', 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=800', '3.5 x 2.0 in (89 x 51 mm)', 'Offset Litho + Foil + Raised UV', '100 cards'),
('prod-box-rigid', 'custom-packaging', 'Luxury Rigid Presentation Boxes', 'luxury-rigid-presentation-boxes', 'Handcrafted 2mm greyboard boxes wrapped in textured specialty papers with magnetic closure.', 'Showcase high-value perfumes, electronics and apparel.', 18500.00, '5-7 Days', 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800', 'Custom engineered dielines', 'Litho 4C + Anti-Scratch Film', '50 boxes'),
('prod-sign-3dhalo', 'signage-display', '3D Backlit Halo LED Signage', '3d-backlit-halo-led-signage', 'Laser-cut stainless steel or aluminum letters floating on standoffs with warm/cool red halo glow.', 'Architectural store fronts and office reception walls.', 28000.00, '4-6 Days', 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800', 'Custom laser profiled', 'CNC Laser Cut + SMD LED Module', '1 set'),
('prod-flex-banner', 'promotional-events', 'Heavy Duty Panna Flex Banners', 'heavy-duty-panna-flex-banners', 'Heavyweight 550gsm front-lit flex media printed on high-density solvent/UV grand format presses.', 'Weatherproof outdoor road displays and launch facades.', 3500.00, 'Same Day / 24h', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800', 'Custom sizes up to 10 x 50 ft', 'UV Solvent 1440 DPI', '1 pc')
ON CONFLICT (id) DO NOTHING;

-- Seed Sample Orders
INSERT INTO orders (id, order_number, client_name, client_phone, client_email, delivery_method, delivery_city, payment_method, payment_status, subtotal, delivery_fee, grand_total, current_stage, stage_text, artwork_status, estimated_dispatch_date) VALUES
('ord-001', 'INP-8492', 'Tariq Mehmood', '03213656096', 'tariq@client.pk', 'pickup', 'Lahore', 'bank-transfer', 'Verified Paid', 4200.00, 0.00, 4200.00, 5, 'Production on press', 'Verified Print-Ready', CURRENT_DATE + INTERVAL '2 days'),
('ord-002', 'INP-9021', 'Fatima Noor', '03001234567', 'fatima@luxecandles.pk', 'delivery', 'Karachi', 'bank-transfer', 'Verified Paid', 45000.00, 450.00, 45450.00, 7, 'Dispatched via TCS', 'Approved by Client', CURRENT_DATE + INTERVAL '1 day')
ON CONFLICT (id) DO NOTHING;

-- Seed Verified Reviews
INSERT INTO reviews (id, author, role, company, product_service, rating, comment, city, review_date) VALUES
('rev-1', 'Zayd Farooq', 'Managing Director', 'Verve Retail', '3D Facade Signage & Retail Rollout', 5, 'INPRINT transformed our flagship store on MM Alam Road. The halo LED letters are razor sharp, and the team completed installation in a single overnight shift.', 'Lahore', '12 Sep 2026'),
('rev-2', 'Ayesha Malik', 'Brand Manager', 'Khaam Organics', 'Rigid Foil-Stamped Packaging', 5, 'The tactile quality of our skincare boxes exceeded expectations. Zero color shift between batches, and their dieline advice saved us significant waste.', 'Lahore', '28 Aug 2026'),
('rev-3', 'Bilal Siddiqui', 'Creative Director', 'Siddiqui & Co. Architects', 'Executive Stationery & Profiles', 5, 'As an architectural atelier, paper texture and foil registration are everything to us. INPRINT is the only team in Lahore with this level of prepress discipline.', 'Lahore', '19 Aug 2026')
ON CONFLICT (id) DO NOTHING;
