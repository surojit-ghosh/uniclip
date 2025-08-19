package download

import (
	"fmt"
	"os"
	"regexp"
	"time"

	"github.com/gofiber/fiber/v2"
)

type ClipRequest struct {
	URL   string `json:"url"`
	Start string `json:"start"`
	End   string `json:"end"`
}

var ytRegex = regexp.MustCompile(`(?i)https?://(?:www\.)?(?:youtube\.com/(?:watch\?v=|embed/|v/|shorts/)|youtu\.be/)([A-Za-z0-9_-]{11})`)
var instaRegex = regexp.MustCompile(`(?i)https?://(?:www\.)?instagram\.com/(?:reel|p|tv)/[A-Za-z0-9_-]+`)
var xRegex = regexp.MustCompile(`(?i)https?://(?:www\.)?(?:twitter|x)\.com/.+/status/\d+`)

func Handler(c *fiber.Ctx) error {
	baseURL := os.Getenv("BASE_URL")

	var body ClipRequest
	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	id := time.Now().Unix()
	original := fmt.Sprintf("download/%d.mp4", id)
	clipped := fmt.Sprintf("download/clipped_%d.mp4", id)

	switch {
	case ytRegex.MatchString(body.URL):
		if err := DownloadYouTubeVideo(body.URL, original); err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "YouTube download failed"})
		}
		if err := TrimVideo(original, clipped, body.Start, body.End); err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Trimming failed"})
		}
		link := fmt.Sprintf("%s/%s", baseURL, clipped)

		go func(file string) {
			_ = os.Remove(file)
		}(original)

		return c.JSON(fiber.Map{"url": link})

	case instaRegex.MatchString(body.URL):
		// TODO: Implement Instagram download logic
		// Example stub:
		// err := DownloadInstagramVideo(body.URL, ...)
		return c.Status(501).JSON(fiber.Map{"error": "Instagram download not implemented yet"})

	case xRegex.MatchString(body.URL):
		// TODO: Implement X (Twitter) download logic
		// Example stub:
		// err := DownloadXVideo(body.URL, ...)
		return c.Status(501).JSON(fiber.Map{"error": "X (Twitter) download not implemented yet"})

	default:
		return c.Status(400).JSON(fiber.Map{"error": "Unsupported or invalid URL"})
	}
}
