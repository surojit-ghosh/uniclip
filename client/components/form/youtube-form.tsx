"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { withMask } from "use-mask-input";
import { youtubeFormSchema, type YouTubeFormData } from "@/lib/zod/youtube.schema";

const YouTubeForm = () => {
    const form = useForm<YouTubeFormData>({
        resolver: zodResolver(youtubeFormSchema),
        mode: "onChange", // Enable real-time validation
        defaultValues: {
            url: "",
            startTime: "",
            endTime: "",
        },
    });

    const {
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting },
    } = form;

    const onSubmit = async (data: YouTubeFormData) => {
        try {
            console.log("Form submitted:", data);
            // Here you would typically send the data to your backend
            // Example API call:
            // const response = await fetch('/api/download', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(data),
            // });

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));
            alert("Download started! Check your downloads folder.");
            reset();
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <h2 className="mb-6 text-center text-2xl font-bold">YouTube Video Downloader</h2>

            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* YouTube URL Input */}
                    <FormField
                        control={control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    YouTube URL
                                    <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="url"
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Time Range Section */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Start Time */}
                        <FormField
                            control={control}
                            name="startTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="">Start Time</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="00:00:00"
                                            type="text"
                                            {...field}
                                            ref={withMask("99:99:99", {
                                                placeholder: "0",
                                                showMaskOnHover: false,
                                            })}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* End Time */}
                        <FormField
                            control={control}
                            name="endTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="">End Time</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="00:00:00"
                                            type="text"
                                            {...field}
                                            ref={withMask("99:99:99", {
                                                placeholder: "0",
                                                showMaskOnHover: false,
                                            })}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" disabled={isSubmitting} className="mt-4 w-full">
                        {isSubmitting ? "Downloading..." : "Download Video"}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default YouTubeForm;
