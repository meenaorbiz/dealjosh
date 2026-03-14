package auth

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// Use an environment variable for the secret, with a fallback for local dev
var jwtSecret = []byte(getEnv("JWT_SECRET", "dealjosh_secret_key_2026"))

// Claims defines the "Passport" data inside the token
type Claims struct {
	MerchantID string `json:"merchant_id"` // Used for Row-Level RBAC
	Mobile     string `json:"mobile"`
	jwt.RegisteredClaims
}

// GenerateToken creates a new JWT signed with our secret
func GenerateToken(merchantID string, mobile string) (string, error) {
	claims := Claims{
		MerchantID: merchantID,
		Mobile:     mobile,
		RegisteredClaims: jwt.RegisteredClaims{
			// Token expires in 24 hours
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Issuer:    "dealjosh-auth",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

// Helper function to get environment variables
func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
