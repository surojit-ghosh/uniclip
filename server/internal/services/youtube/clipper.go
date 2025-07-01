package youtube

import (
	"fmt"
	"os/exec"
)

func TrimVideo(input, output, start, end string) error {
	var cmd *exec.Cmd

	if start == "" && end == "" {
		cmd = exec.Command("ffmpeg", "-i", input, "-c", "copy", output)
	} else if end == "" {
		cmd = exec.Command("ffmpeg", "-i", input, "-ss", start, "-c", "copy", output)
	} else if start == "" {
		cmd = exec.Command("ffmpeg", "-i", input, "-to", end, "-c", "copy", output)
	} else {
		cmd = exec.Command("ffmpeg", "-i", input, "-ss", start, "-to", end, "-c", "copy", output)
	}

	if out, err := cmd.CombinedOutput(); err != nil {
		fmt.Println("ffmpeg error:", string(out))
		return err
	}

	return nil
}
