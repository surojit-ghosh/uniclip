package download

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
)

func DownloadYouTubeVideo(url, output string) error {
	isProduction := os.Getenv("ENV") == "production"

	cookieFile := filepath.Join(".", "cookie.txt")
	if isProduction {
		cookieFile = "/cookies/yt-cookie.txt"
	}
	cmd := exec.Command("yt-dlp",
		"--format", "best[ext=mp4]/best",
		"--output", output,
		"--no-playlist",
		"--cookies", cookieFile,
		url,
	)

	out, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("yt-dlp failed: %w, output: %s", err, string(out))
	}
	return nil
}
