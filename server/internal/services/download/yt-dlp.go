package download

import (
	"fmt"
	"os"
	"os/exec"
)

func DownloadYouTubeVideo(url, output string) error {
	isProduction := os.Getenv("ENV") == "production"

	cookieFile := "../../../cookie.txt"
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
		fmt.Println("yt-dlp error:", string(out))
		return err
	}
	return nil
}
