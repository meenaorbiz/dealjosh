INSERT INTO categories (name, slug) VALUES 
('Pharmacy', 'pharmacy'),
('Grocery', 'grocery'),
('Dairy & Bakery', 'dairy-bakery'),
('Fruits & Vegetables', 'fruits-vegetables'),
('Electronics', 'electronics'),
('Fashion', 'fashion'),
('Stationery', 'stationery')
ON CONFLICT (slug) DO NOTHING;