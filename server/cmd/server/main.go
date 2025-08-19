package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"github.com/surojit-ghosh/uniclip/server/internal/services/download"
)

func main() {
	_ = godotenv.Load()
	app := fiber.New()

	app.Use(cors.New())

	app.Post("/api/download", download.Handler)
	app.Get("/download/:filename", download.FileDownloader)

	port := os.Getenv("SERVER_PORT")
	if port == "" {
		port = "8001"
	}
	log.Fatal(app.Listen(":" + port))
}
