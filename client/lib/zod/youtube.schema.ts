import { z } from "zod";

// Zod schema for YouTube form validation
export const youtubeFormSchema = z
    .object({
        url: z
            .string()
            .min(1, "Video URL is required")
            .url("Please enter a valid URL")
            .refine((url) => {
                const videoUrlRegex = new RegExp(
                    "^(https?:\\/\\/)?(www\\.|m\\.)?(?:" +
                    "(?:youtube\\.com\\/watch\\?v=|youtu\\.be\\/|youtube\\.com\\/embed\\/)|" +
                    "(?:instagram\\.com\\/(?:reel|p|tv)\\/)|" +
                    "(?:facebook\\.com\\/(?:watch\\/?\\?v=|.*\\/videos\\/)|fb\\.watch\\/)|" +
                    "(?:x\\.com\\/[^\\/]+\\/status\\/|twitter\\.com\\/[^\\/]+\\/status\\/)" +
                    ")",
                    "i"
                );
                return videoUrlRegex.test(url);
            }, "Please enter a valid YouTube/Instagram/Facebook/X (Twitter) video URL"),
        start: z
            .string()
            .regex(
                /^([0-9]{1,2}):([0-5][0-9]):([0-5][0-9])$/,
                "Invalid time format (HH:MM:SS)"
            )
            .optional()
            .or(z.literal("")),
        end: z
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
            if (data.start && data.end) {
                const timeToSeconds = (time: string) => {
                    const [hours, minutes, seconds] = time
                        .split(":")
                        .map(Number);
                    return hours * 3600 + minutes * 60 + seconds;
                };
                return (
                    timeToSeconds(data.start) < timeToSeconds(data.end)
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
