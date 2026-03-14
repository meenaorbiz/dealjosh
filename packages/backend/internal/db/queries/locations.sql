-- name: ListStates :many
SELECT * FROM states ORDER BY name ASC;

-- name: ListCitiesByState :many
SELECT * FROM cities 
WHERE state_id = $1 
ORDER BY name ASC;