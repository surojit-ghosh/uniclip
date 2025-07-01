package download

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func Handler(c *fiber.Ctx) error {
	fileName := c.Params("filename")
	file := fmt.Sprintf("download/%s", fileName)

	c.Set("Content-Disposition", "attachment; filename="+fileName)

	if err := c.SendFile(file, true); err != nil {
		fmt.Print("Error sending file: ", err)
		return fiber.NewError(fiber.StatusNotFound, "File not found")
	}

	return nil
}
