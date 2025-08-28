package download

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"path/filepath"
)

func DownloadYouTubeVideo(url, output string) error {
	log.Printf("%s", os.Getenv("ENV"))
	isProduction := os.Getenv("ENV") == "production"
	log.Printf("DownloadYouTubeVideo: ENV=production? %v, URL: %s", isProduction, url)

	cookieFile := filepath.Join(".", "cookie.txt")
	if isProduction {
		cookieFile = "/cookies/yt-cookie.txt"
	}

	// Check if cookie file exists, but only require it in production
	if _, err := os.Stat(cookieFile); err != nil {
		if os.IsNotExist(err) {
			if isProduction {
				log.Printf("Cookie file missing in production: %s", cookieFile)
				return fmt.Errorf("cookie file not found (production): %s", cookieFile)
			} else {
				log.Printf("Cookie file not found, continuing without cookies: %s", cookieFile)
				// In non-production, proceed without cookies
				cmd := exec.Command("yt-dlp",
					"--format", "best[ext=mp4]/best",
					"--output", output,
					"--no-playlist",
					url,
				)
				log.Printf("Running yt-dlp without cookies: %v", cmd.Args)
				out, err := cmd.CombinedOutput()
				if err != nil {
					log.Printf("yt-dlp error: %s", string(out))
					return fmt.Errorf("yt-dlp failed: %w, output: %s", err, string(out))
				}
				log.Printf("yt-dlp success without cookies")
				return nil
			}
		}
		log.Printf("Failed to stat cookie file %s: %v", cookieFile, err)
		return fmt.Errorf("failed to stat cookie file %s: %w", cookieFile, err)
	}

	log.Printf("Using cookie file: %s", cookieFile)
	cmd := exec.Command("yt-dlp",
		"--format", "best[ext=mp4]/best",
		"--output", output,
		"--no-playlist",
		"--cookies", cookieFile,
		url,
	)

	log.Printf("Running yt-dlp with cookies: %v", cmd.Args)
	out, err := cmd.CombinedOutput()
	if err != nil {
		log.Printf("yt-dlp error: %s", string(out))
		return fmt.Errorf("yt-dlp failed: %w, output: %s", err, string(out))
	}
	log.Printf("yt-dlp success with cookies")
	return nil
}
