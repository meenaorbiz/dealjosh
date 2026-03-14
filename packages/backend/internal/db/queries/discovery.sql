-- name: CheckMobileDedupe :many
-- This query performs a lean UNION check to find the user in either table
SELECT 
    'merchant' as role, 
    id, 
    owner_name as name 
FROM merchants 
WHERE primary_mobile = $1

UNION ALL

SELECT 
    role, 
    id, 
    staff_name as name 
FROM merchant_staff 
WHERE staff_mobile = $1;