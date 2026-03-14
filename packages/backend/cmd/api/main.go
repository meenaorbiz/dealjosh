package main

import (
	"context"
	"log"
	"log/slog"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"

	"dealjosh-backend/internal/auth"
	"dealjosh-backend/internal/db/generated"
	"dealjosh-backend/internal/merchant"
)

func main() {
	// 1. Setup Structured Logging
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(logger)

	// 2. Database Connection (Cloud SQL / Local Docker)
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		// Fallback for local development
		dbURL = "postgres://postgres:postgres@localhost:5432/dealjosh?sslmode=disable"
	}

	ctx := context.Background()
	dbPool, err := pgxpool.New(ctx, dbURL)
	if err != nil {
		logger.Error("Unable to connect to database", "error", err)
		os.Exit(1)
	}
	defer dbPool.Close()

	// Ping the DB to ensure it's actually alive before starting
	if err := dbPool.Ping(ctx); err != nil {
		logger.Error("Database ping failed", "error", err)
		os.Exit(1)
	}
	logger.Info("Connected to PostgreSQL successfully")

	// 3. Initialize SQLC Queries
	queries := generated.New(dbPool)

	// 4. Initialize Handlers (Independent Packages)
	authH := auth.NewHandler(dbPool, queries, logger)
	merchantH := merchant.NewHandler(dbPool, queries, logger)

	// 5. Setup Router
	r := gin.Default()

	// Global Middleware
	r.Use(gin.Recovery()) // Prevent crashes from panics

	// --- PUBLIC ROUTES (No Auth Needed) ---
	public := r.Group("/public")
	{
		// Discovery Gate
		public.GET("/discover", authH.DiscoverUser)

		// Onboarding Data
		public.GET("/categories", merchantH.ListCategories)
		public.GET("/states", merchantH.ListStates)
		public.GET("/cities", merchantH.ListCities)

		// Initial Registration (De-dupe happens inside here)
		public.POST("/merchant/register", merchantH.RegisterStore)
	}

	// --- PROTECTED ROUTES (Future JWT Auth) ---
	api := r.Group("/api/v1")
	// api.Use(auth.Middleware()) // We will add this once OTP is working
	{
		// Routes for logged-in merchants
		api.GET("/ping", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"status": "authenticated"})
		})
	}

	// 6. Start Server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	logger.Info("Starting DealJosh API", "port", port)

	srv := &http.Server{
		Addr:         ":" + port,
		Handler:      r,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	if err := srv.ListenAndServe(); err != nil {
		log.Fatal("Server forced to shutdown:", err)
	}
}
