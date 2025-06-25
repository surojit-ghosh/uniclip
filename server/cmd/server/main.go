package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/surojit-ghosh/uniclip/server/internal/services/youtube"
)

func main() {
	_ = godotenv.Load()
	app := fiber.New()

	app.Static("/static", "./static")
	app.Post("/api/youtube/clip", youtube.Handler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}
	log.Fatal(app.Listen(":" + port))
}
