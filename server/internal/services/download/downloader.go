package download

import (
	"fmt"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
)

func FileDownloader(c *fiber.Ctx) error {
	fileName := c.Params("filename")
	file := fmt.Sprintf("download/%s", fileName)

	go func(path string) {
		time.Sleep(60 * time.Minute)
		if err := os.Remove(path); err == nil {
			fmt.Printf("Deleted file after 5 min: %s\n", path)
		}
	}(file)

	c.Set("Content-Disposition", "attachment; filename="+fileName)

	if err := c.SendFile(file, true); err != nil {
		fmt.Print("Error sending file: ", err)
		return fiber.NewError(fiber.StatusNotFound, "File not found")
	}

	return nil
}
