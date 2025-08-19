package download

import (
	"fmt"
	"os/exec"
)

func DownloadYouTubeVideo(url, output string) error {
	cmd := exec.Command("yt-dlp",
		"--format", "best[ext=mp4]/best",
		"--output", output,
		"--no-playlist",
		url,
	)
	out, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println("yt-dlp error:", string(out))
		return err
	}
	return nil
}
