package youtube

import (
	"fmt"
	"os/exec"
	"path/filepath"
	"time"
)

func DownloadYouTubeVideo(url string) (string, error) {
	id := time.Now().Unix()
	output := fmt.Sprintf("static/download/%d.mp4", id)

	// Force mp4 format
	cmd := exec.Command("yt-dlp", "-f", "bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4", "-o", output, url)
	out, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println("yt-dlp error:", string(out))
		return "", err
	}

	// Confirm the file exists
	matches, _ := filepath.Glob(output)
	if len(matches) == 0 {
		return "", fmt.Errorf("MP4 file not found after download")
	}

	return output, nil
}
