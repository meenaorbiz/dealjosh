package auth

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

// AuthMiddleware validates the JWT and injects merchant identity into the context
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 1. Get the 'Authorization' header
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is required"})
			c.Abort()
			return
		}

		// 2. Parse 'Bearer <token>'
		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid authorization format. Use 'Bearer <token>'"})
			c.Abort()
			return
		}

		tokenString := parts[1]

		// 3. Verify the token using the Claims struct from jwt.go
		claims := &Claims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			// We use jwtSecret here to match the variable in our jwt.go file
			return jwtSecret, nil
		})

		// Check for parsing errors or invalid tokens
		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
			c.Abort()
			return
		}

		// 4. RBAC INJECTION
		// We store both Mobile and MerchantID in the context.
		// The MerchantID is what we will use for Row-Level security in our queries.
		c.Set("merchant_id", claims.MerchantID)
		c.Set("user_mobile", claims.Mobile)

		c.Next() // Pass the context to the next handler/function
	}
}
