package merchant

import (
	"net/http"

	db "dealjosh-backend/internal/db/generated"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgtype"
)

// RegisterStoreRequest defines the incoming JSON structure from the frontend
type RegisterStoreRequest struct {
	OwnerName     string  `json:"owner_name" binding:"required"`
	PrimaryMobile string  `json:"primary_mobile" binding:"required"`
	StoreName     string  `json:"store_name" binding:"required"`
	CategoryID    int32   `json:"category_id" binding:"required"`
	CityID        int32   `json:"city_id" binding:"required"`
	BranchName    string  `json:"branch_name"`
	Lat           float64 `json:"lat" binding:"required"`
	Lng           float64 `json:"lng" binding:"required"`
	Pincode       string  `json:"pincode" binding:"required"`
	Landmark      string  `json:"landmark" binding:"required"`
	AreaLocality  string  `json:"area_locality" binding:"required"`
	FullAddress   string  `json:"full_address" binding:"required"`
}

func (h *Handler) RegisterStore(c *gin.Context) {
	var req RegisterStoreRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx := c.Request.Context()

	// 1. START TRANSACTION (Manual control for pgxpool compatibility)
	tx, err := h.db.Begin(ctx)
	if err != nil {
		h.logger.Error("failed to begin transaction", "error", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}
	// Defer rollback: if the function returns before tx.Commit(), changes are undone
	defer tx.Rollback(ctx)

	qtx := h.queries.WithTx(tx)

	// 2. CREATE MERCHANT
	m, err := qtx.CreateMerchant(ctx, db.CreateMerchantParams{
		PrimaryMobile: req.PrimaryMobile,
		OwnerName:     req.OwnerName,
	})
	if err != nil {
		h.handleRegistrationError(c, err)
		return
	}

	// 3. CREATE STORE
	// Note: We use pgtype.Int8 because sqlc + pgx/v5 generates nullable BigInts this way
	s, err := qtx.CreateStore(ctx, db.CreateStoreParams{
		MerchantID: pgtype.Int8{Int64: m.ID, Valid: true},
		CategoryID: req.CategoryID,
		Name:       req.StoreName,
	})
	if err != nil {
		h.handleRegistrationError(c, err)
		return
	}

	// 4. CREATE STORE LOCATION
	_, err = qtx.CreateStoreLocation(ctx, db.CreateStoreLocationParams{
		StoreID:      pgtype.Int8{Int64: s.ID, Valid: true},
		CityID:       req.CityID,
		BranchName:   req.BranchName,
		Lat:          req.Lat,
		Lng:          req.Lng,
		Pincode:      req.Pincode,
		Landmark:     req.Landmark,
		AreaLocality: req.AreaLocality,
		FullAddress:  req.FullAddress,
	})
	if err != nil {
		h.handleRegistrationError(c, err)
		return
	}

	// 5. COMMIT
	if err := tx.Commit(ctx); err != nil {
		h.logger.Error("failed to commit registration", "error", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to finalize registration"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Welcome to DealJosh! Store created."})
}

// handleRegistrationError checks for the unique constraint (de-dupe) error
func (h *Handler) handleRegistrationError(c *gin.Context, err error) {
	// Postgres Error Code 23505 = Unique Violation
	if pgErr, ok := err.(*pgconn.PgError); ok && pgErr.Code == "23505" {
		c.JSON(http.StatusConflict, gin.H{
			"error": "This number is already registered.",
			"code":  "MERCHANT_EXISTS",
		})
		return
	}
	h.logger.Error("Registration operation failed", "error", err)
	c.JSON(http.StatusInternalServerError, gin.H{"error": "Registration failed"})
}
