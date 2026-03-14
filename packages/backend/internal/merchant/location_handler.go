package merchant

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// ListStates handles GET /public/states
func (h *Handler) ListStates(c *gin.Context) {
	states, err := h.queries.ListStates(c.Request.Context())
	if err != nil {
		h.logger.Error("failed to fetch states", "error", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to load states"})
		return
	}
	c.JSON(http.StatusOK, states)
}

// ListCities handles GET /public/cities?state_id=X
func (h *Handler) ListCities(c *gin.Context) {
	stateIDStr := c.Query("state_id")
	if stateIDStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "state_id is required"})
		return
	}

	stateID, err := strconv.ParseInt(stateIDStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid state_id format"})
		return
	}

	cities, err := h.queries.ListCitiesByState(c.Request.Context(), int32(stateID))
	if err != nil {
		h.logger.Error("failed to fetch cities", "error", err, "state_id", stateID)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to load cities"})
		return
	}

	// Ensure empty slice instead of null for frontend consistency
	if cities == nil {
		c.JSON(http.StatusOK, []interface{}{})
		return
	}

	c.JSON(http.StatusOK, cities)
}
