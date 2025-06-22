import { z } from "zod";

// Zod schema for YouTube form validation
export const youtubeFormSchema = z
    .object({
        url: z
            .string()
            .min(1, "YouTube URL is required")
            .url("Please enter a valid URL")
            .refine((url) => {
                const youtubeRegex =
                    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)/;
                return youtubeRegex.test(url);
            }, "Please enter a valid YouTube URL"),
        startTime: z
            .string()
            .regex(
                /^([0-9]{1,2}):([0-5][0-9]):([0-5][0-9])$/,
                "Invalid time format (HH:MM:SS)"
            )
            .optional()
            .or(z.literal("")),
        endTime: z
            .string()
            .regex(
                /^([0-9]{1,2}):([0-5][0-9]):([0-5][0-9])$/,
                "Invalid time format (HH:MM:SS)"
            )
            .optional()
            .or(z.literal("")),
    })
    .refine(
        (data) => {
            if (data.startTime && data.endTime) {
                const timeToSeconds = (time: string) => {
                    const [hours, minutes, seconds] = time
                        .split(":")
                        .map(Number);
                    return hours * 3600 + minutes * 60 + seconds;
                };
                return (
                    timeToSeconds(data.startTime) < timeToSeconds(data.endTime)
                );
            }
            return true;
        },
        {
            message: "Start time must be before end time",
            path: ["endTime"],
        }
    );

export type YouTubeFormData = z.infer<typeof youtubeFormSchema>;
