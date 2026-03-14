package auth

import (
	db "dealjosh-backend/internal/db/generated"
	"log/slog"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Handler struct {
	db      *pgxpool.Pool
	queries *db.Queries
	logger  *slog.Logger
}

func NewHandler(dbPool *pgxpool.Pool, queries *db.Queries, logger *slog.Logger) *Handler {
	return &Handler{
		db:      dbPool,
		queries: queries,
		logger:  logger,
	}
}
