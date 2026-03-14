-- 1. Insert States
INSERT INTO states (name, code) VALUES ('Maharashtra', 'MH') ON CONFLICT (code) DO NOTHING;
INSERT INTO states (name, code) VALUES ('Karnataka', 'KA') ON CONFLICT (code) DO NOTHING;

-- 2. Insert Cities by linking via the Code
INSERT INTO cities (state_id, name) 
VALUES 
((SELECT id FROM states WHERE code = 'MH'), 'Pune'),
((SELECT id FROM states WHERE code = 'MH'), 'Mumbai'),
((SELECT id FROM states WHERE code = 'MH'), 'Nagpur'),
((SELECT id FROM states WHERE code = 'KA'), 'Bengaluru'),
((SELECT id FROM states WHERE code = 'KA'), 'Mysuru')
ON CONFLICT (state_id, name) DO NOTHING;