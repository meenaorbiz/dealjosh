package auth

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// Secret key - in production, move this to Environment Variables!
var jwtKey = []byte("dealjosh_secret_2026")

type Claims struct {
	Mobile string `json:"mobile"`
	jwt.RegisteredClaims
}

func GenerateToken(mobile string) (string, error) {
	expirationTime := time.Now().Add(72 * time.Hour) // 3 days
	claims := &Claims{
		Mobile: mobile,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtKey)
}
