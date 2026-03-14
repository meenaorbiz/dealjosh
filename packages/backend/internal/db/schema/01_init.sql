-- 1. GEOGRAPHY (Master Data)
CREATE TABLE states (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL -- e.g., 'MH', 'KA'
);

CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    state_id INTEGER NOT NULL REFERENCES states(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    UNIQUE(state_id, name)
);

-- 2. CATEGORIES (Recursive Master/Sub structure)
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    parent_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL, -- Added slug for clean URLs/Analytics
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. MERCHANTS (The Owner)
CREATE TABLE merchants (
    id BIGSERIAL PRIMARY KEY,
    primary_mobile TEXT UNIQUE NOT NULL,
    owner_name TEXT NOT NULL,
    merchant_email TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. STORES (The Brand)
CREATE TABLE stores (
    id BIGSERIAL PRIMARY KEY,
    merchant_id BIGINT REFERENCES merchants(id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES categories(id),
    name TEXT NOT NULL,
    logo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(merchant_id, name)
);

-- 5. STORE LOCATIONS (The Physical Presence)
-- Linked to City/State tables for perfect data integrity
CREATE TABLE store_locations (
    id BIGSERIAL PRIMARY KEY,
    store_id BIGINT REFERENCES stores(id) ON DELETE CASCADE,
    city_id INTEGER NOT NULL REFERENCES cities(id),
    branch_name TEXT NOT NULL DEFAULT 'Main Branch',
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    house_no TEXT,         
    street_name TEXT,      
    landmark TEXT NOT NULL, 
    area_locality TEXT NOT NULL, 
    pincode VARCHAR(10) NOT NULL,
    full_address TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. MERCHANT STAFF (RBAC for scaling operations)
CREATE TABLE merchant_staff (
    id BIGSERIAL PRIMARY KEY,
    merchant_id BIGINT REFERENCES merchants(id) ON DELETE CASCADE,
    staff_mobile TEXT NOT NULL,
    staff_name TEXT NOT NULL,
    role TEXT CHECK (role IN ('OWNER', 'MANAGER', 'ASSISTANT')) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(merchant_id, staff_mobile)
);