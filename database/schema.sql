-- =============================================================================
-- INPRINT CREATIVE PRODUCTION AGENCY — PRODUCTION DATABASE SCHEMA
-- PostgreSQL / MySQL Compatible (Standard SQL:2016)
-- Facility: M-71, Zainab Tower, Model Town Link Road, Lahore, 54700
-- =============================================================================

-- 1. Master Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    slug VARCHAR(128) UNIQUE NOT NULL,
    headline VARCHAR(255) NOT NULL,
    intro TEXT,
    item_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Master Products Catalog Table
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(64) PRIMARY KEY,
    category_id VARCHAR(64) NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(191) NOT NULL,
    slug VARCHAR(191) UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    intro TEXT,
    base_price DECIMAL(12, 2) NOT NULL,
    price_unit VARCHAR(64) DEFAULT 'per standard batch',
    turnaround VARCHAR(64) NOT NULL,
    image_url TEXT NOT NULL,
    rating DECIMAL(3, 2) DEFAULT 4.90,
    reviews_count INT DEFAULT 18,
    standard_size VARCHAR(128),
    bleed_requirement VARCHAR(64) DEFAULT '3mm all sides',
    print_method VARCHAR(128),
    resolution_dpi VARCHAR(64) DEFAULT '300 DPI CMYK',
    min_order_qty VARCHAR(64) DEFAULT '100 pcs',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Product Substrates & Materials Table
CREATE TABLE IF NOT EXISTS product_materials (
    id VARCHAR(64) PRIMARY KEY,
    product_id VARCHAR(64) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    price_multiplier DECIMAL(5, 3) DEFAULT 1.000,
    is_default BOOLEAN DEFAULT FALSE
);

-- 4. Product Finishes & Embellishments Table
CREATE TABLE IF NOT EXISTS product_finishes (
    id VARCHAR(64) PRIMARY KEY,
    product_id VARCHAR(64) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    add_cost DECIMAL(10, 2) DEFAULT 0.00,
    is_default BOOLEAN DEFAULT FALSE
);

-- 5. Client Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(64) PRIMARY KEY,
    order_number VARCHAR(32) UNIQUE NOT NULL,
    client_name VARCHAR(128) NOT NULL,
    client_phone VARCHAR(32) NOT NULL,
    client_email VARCHAR(128),
    whatsapp_consent BOOLEAN DEFAULT TRUE,
    delivery_method VARCHAR(32) NOT NULL, -- 'pickup' or 'delivery'
    delivery_city VARCHAR(64) DEFAULT 'Lahore',
    delivery_address TEXT,
    payment_method VARCHAR(64) NOT NULL, -- 'bank-transfer', 'jazzcash', 'easypaisa', 'card', 'cod'
    payment_status VARCHAR(64) DEFAULT 'Pending Verification',
    subtotal DECIMAL(12, 2) NOT NULL,
    delivery_fee DECIMAL(10, 2) DEFAULT 0.00,
    discount_amount DECIMAL(10, 2) DEFAULT 0.00,
    grand_total DECIMAL(12, 2) NOT NULL,
    current_stage INT DEFAULT 1, -- 1 to 9 (ORDER_STAGES)
    stage_text VARCHAR(128) DEFAULT 'Order Placed & Prepress Review',
    artwork_status VARCHAR(128) DEFAULT 'Under Review by Pre-Press',
    estimated_dispatch_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Order Line Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id VARCHAR(64) PRIMARY KEY,
    order_id VARCHAR(64) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR(64) NOT NULL REFERENCES products(id),
    product_name VARCHAR(191) NOT NULL,
    quantity INT NOT NULL,
    material_name VARCHAR(128) NOT NULL,
    finish_name VARCHAR(128) NOT NULL,
    sides_name VARCHAR(64) DEFAULT 'Double-sided',
    artwork_file_name VARCHAR(255),
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(12, 2) NOT NULL
);

-- 7. Project Briefs & Custom Quotes Table
CREATE TABLE IF NOT EXISTS quotes (
    id VARCHAR(64) PRIMARY KEY,
    reference_id VARCHAR(32) UNIQUE NOT NULL,
    full_name VARCHAR(128) NOT NULL,
    brand_company VARCHAR(128),
    phone VARCHAR(32) NOT NULL,
    email VARCHAR(128),
    city VARCHAR(64) DEFAULT 'Lahore',
    budget_range VARCHAR(64),
    deadline VARCHAR(64),
    needs_selected TEXT, -- comma-separated or JSON
    description TEXT,
    need_design VARCHAR(64),
    need_installation VARCHAR(64),
    preferred_contact VARCHAR(32) DEFAULT 'WhatsApp',
    status VARCHAR(64) DEFAULT 'New Lead',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Lahore Site Reconnaissance & Measurement Visits Table
CREATE TABLE IF NOT EXISTS site_visits (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    company VARCHAR(128),
    project_type VARCHAR(128) NOT NULL,
    site_address TEXT NOT NULL,
    preferred_date VARCHAR(64),
    preferred_time VARCHAR(64),
    technician_notes TEXT,
    status VARCHAR(64) DEFAULT 'Survey Scheduled',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Franchise Multi-Location Expansion Table
CREATE TABLE IF NOT EXISTS franchise_inquiries (
    id VARCHAR(64) PRIMARY KEY,
    full_name VARCHAR(128) NOT NULL,
    brand_name VARCHAR(128) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    email VARCHAR(128),
    industry VARCHAR(128),
    current_locations VARCHAR(64),
    planned_locations VARCHAR(64),
    cities_list TEXT,
    issues_reported TEXT,
    status VARCHAR(64) DEFAULT 'Audit Review',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Verified Client Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id VARCHAR(64) PRIMARY KEY,
    author VARCHAR(128) NOT NULL,
    role VARCHAR(128) NOT NULL,
    company VARCHAR(128) NOT NULL,
    product_service VARCHAR(128) NOT NULL,
    rating INT DEFAULT 5,
    comment TEXT NOT NULL,
    city VARCHAR(64) DEFAULT 'Lahore',
    review_date VARCHAR(32) NOT NULL,
    is_verified BOOLEAN DEFAULT TRUE
);

-- Indexing for Maximum Performance & Search Optimization
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_orders_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(client_phone);
CREATE INDEX IF NOT EXISTS idx_quotes_ref ON quotes(reference_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
