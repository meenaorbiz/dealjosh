-- name: ListMasterCategories :many
SELECT * FROM categories 
WHERE parent_id IS NULL 
ORDER BY name ASC;

-- name: ListSubCategories :many
SELECT * FROM categories 
WHERE parent_id = $1 
ORDER BY name ASC;