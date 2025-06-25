package youtube

import (
	"fmt"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
)

type ClipRequest struct {
	URL   string `json:"url"`
	Start string `json:"start"`
	End   string `json:"end"`
}

func Handler(c *fiber.Ctx) error {
	var body ClipRequest
	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	id := time.Now().Unix()
	original := fmt.Sprintf("static/download/%d.mp4", id)
	clipped := fmt.Sprintf("static/download/clipped_%d.mp4", id)

	// Step 1: Download
	if err := DownloadYouTubeVideo(body.URL, original); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Download failed"})
	}

	// Step 2: Trim
	if err := TrimVideo(original, clipped, body.Start, body.End); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Trimming failed"})
	}

	// Step 3: Return public URL
	url := fmt.Sprintf("%s/%s", os.Getenv("BASE_URL"), clipped)
	return c.JSON(fiber.Map{"url": url})
}
