package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// AuthProvider interface defines what an OTP service must do.
// This allows you to swap SMS providers (Twilio, Firebase, etc.) easily.
type AuthProvider interface {
	SendCode(ctx any, mobile string) error
	VerifyCode(ctx any, mobile string, code string) (bool, error)
}

// RequestOTP sends a code to the user's mobile
func (h *Handler) RequestOTP(c *gin.Context) {
	mobile := c.Query("mobile")
	if mobile == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Mobile number required"})
		return
	}

	// Note: We will implement the actual Provider logic in a separate file later.
	// For now, this calls the interface.
	c.JSON(http.StatusOK, gin.H{"message": "OTP sent to " + mobile})
}

// VerifyOTP checks the code and returns a JWT token
func (h *Handler) VerifyOTP(c *gin.Context) {
	var req struct {
		Mobile string `json:"mobile"`
		Code   string `json:"code"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	// Placeholder for OTP verification logic
	if req.Code != "123456" { // Temporary bypass for testing
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Wrong OTP"})
		return
	}

	// Generate JWT for the frontend to use in future requests
	// Note: You'll need a GenerateToken function in a utils file later
	token := "dummy-jwt-token-for-" + req.Mobile

	c.JSON(http.StatusOK, gin.H{
		"token":   token,
		"message": "Login successful",
	})
}
