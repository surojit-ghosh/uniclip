package youtube

import (
	"fmt"
	"os/exec"
)

func TrimVideo(input, output, start, end string) error {
	args := []string{"-i", input, "-ss", start, "-to", end, "-c", "copy", output}
	cmd := exec.Command("ffmpeg", args...)
	out, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println("ffmpeg error:", string(out))
		return err
	}
	return nil
}
