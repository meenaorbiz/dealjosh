package merchant

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype" // Added this import to handle PGX types
)

// ListCategories handles GET /public/categories?parent_id=X
// It uses the Handler struct defined in handler.go
func (h *Handler) ListCategories(c *gin.Context) {
	parentIDStr := c.Query("parent_id")
	ctx := c.Request.Context()

	// 1. Logic for Master Categories (Sectors)
	if parentIDStr == "" {
		masters, err := h.queries.ListMasterCategories(ctx)
		if err != nil {
			h.logger.Error("failed to load master categories", "error", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to load sectors"})
			return
		}
		c.JSON(http.StatusOK, masters)
		return
	}

	// 2. Logic for Sub-Categories
	pID, err := strconv.ParseInt(parentIDStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid parent_id format"})
		return
	}

	// FIXED: Wrapped int32(pID) into pgtype.Int4 so it matches the generated code
	subs, err := h.queries.ListSubCategories(ctx, pgtype.Int4{Int32: int32(pID), Valid: true})
	if err != nil {
		h.logger.Error("failed to load sub categories", "error", err, "parent_id", pID)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to load sub-categories"})
		return
	}

	// Safety: return empty array [] instead of null if no sub-categories exist
	if subs == nil {
		c.JSON(http.StatusOK, []interface{}{})
		return
	}

	c.JSON(http.StatusOK, subs)
}
