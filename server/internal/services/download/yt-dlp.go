package download

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
)

func DownloadYouTubeVideo(url, output string) error {
	isProduction := os.Getenv("ENV") == "production"
	if isProduction {
		fmt.Print("isProduction")
	}
	cookieFile := filepath.Join(".", "cookie.txt")
	if isProduction {
		cookieFile = "/cookies/yt-cookie.txt"
	}

	if _, err := os.Stat(cookieFile); err != nil {
		if os.IsNotExist(err) {
			return fmt.Errorf("cookie file not found (production): %s", cookieFile)
		}
		return fmt.Errorf("failed to stat cookie file %s: %w", cookieFile, err)
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
		fmt.Println("yt-dlp error:", string(out))
		return err
	}
	return nil
}
