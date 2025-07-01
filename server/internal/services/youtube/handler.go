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
	baseURL := os.Getenv("BASE_URL")

	var body ClipRequest
	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	id := time.Now().Unix()
	original := fmt.Sprintf("download/%d.mp4", id)
	clipped := fmt.Sprintf("download/clipped_%d.mp4", id)

	if err := DownloadYouTubeVideo(body.URL, original); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Download failed"})
	}

	if err := TrimVideo(original, clipped, body.Start, body.End); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Trimming failed"})
	}

	link := fmt.Sprintf("%s/%s", baseURL, clipped)
	os.Remove(original)

	return c.JSON(fiber.Map{"url": link})
}
