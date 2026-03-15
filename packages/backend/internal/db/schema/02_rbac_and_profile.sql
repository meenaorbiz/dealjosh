-- ==========================================
-- 1. SUBSCRIPTION SYSTEM (Reference Table)
-- ==========================================
CREATE TABLE IF NOT EXISTS subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE, -- 'NORMAL', 'PREMIUM'
    base_price DECIMAL(10, 2) DEFAULT 0.00,
    current_price DECIMAL(10, 2) DEFAULT 0.00, -- Waive off logic happens here
    features JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Phase 1 Plans
INSERT INTO subscription_plans (name, base_price, current_price, features)
VALUES 
('NORMAL', 0.00, 0.00, '{"video_deals": false, "max_stores": 1}'),
('PREMIUM', 999.00, 0.00, '{"video_deals": true, "max_stores": 5}')
ON CONFLICT (name) DO NOTHING;

-- Link Merchant to Plan
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS plan_id UUID REFERENCES subscription_plans(id);

-- ==========================================
-- 2. JWT & AUTH ENHANCEMENTS
-- ==========================================
-- Fields for session management and primary/secondary number logic
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS jwt_secret UUID DEFAULT gen_random_uuid();
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE;
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS secondary_mobile VARCHAR(15);

-- ==========================================
-- 3. STORE FLIP & RBAC LOGIC
-- ==========================================
-- This table allows one merchant ID to be linked to many store IDs
CREATE TABLE IF NOT EXISTS store_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
    store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
    role VARCHAR(20) DEFAULT 'OWNER', -- OWNER, MANAGER, STAFF
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- Prevent duplicate memberships
    UNIQUE(merchant_id, store_id)
);

-- Index for fast store-switching/flipping
CREATE INDEX IF NOT EXISTS idx_membership_merchant ON store_memberships(merchant_id);