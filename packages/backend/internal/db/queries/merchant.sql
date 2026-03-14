-- name: CreateMerchant :one
-- We use a simple INSERT. De-duplication logic is handled in Go by 
-- catching the unique constraint error on primary_mobile.
INSERT INTO merchants (
    primary_mobile, 
    owner_name
) VALUES (
    $1, $2
)
RETURNING *;

-- name: CreateStore :one
INSERT INTO stores (
    merchant_id, 
    category_id, 
    name
) VALUES (
    $1, $2, $3
)
RETURNING *;

-- name: CreateStoreLocation :one
INSERT INTO store_locations (
    store_id, 
    city_id, 
    branch_name, 
    lat, 
    lng, 
    pincode, 
    landmark, 
    area_locality, 
    full_address
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9
)
RETURNING *;