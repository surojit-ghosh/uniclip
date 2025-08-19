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
import apiClient from "@/lib/apiClient";

const DownloadForm = () => {
    const form = useForm<YouTubeFormData>({
        resolver: zodResolver(youtubeFormSchema),
        mode: "onChange",
        defaultValues: {
            url: "",
            start: "",
            end: "",
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
            const response = await apiClient.post("/api/download", data);

            if (!response.data) throw new Error("No data received from server");

            const link = document.createElement("a");
            link.href = response.data.url;
            link.download = "";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            reset();
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <h2 className="mb-3 text-center text-2xl font-bold">Video Downloader</h2>
            <p className="text-muted-foreground mb-6 text-center text-sm">
                Download videos from YouTube, Instagram, Twitter, Facebook, and more.
                <br />
                Paste the video link below to get started.
            </p>

            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Video URL
                                    <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="url"
                                        placeholder="Paste a video link (YouTube, Instagram, Twitter, Facebook...)"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Time Range Section */}
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={control}
                            name="start"
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
                        <FormField
                            control={control}
                            name="end"
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

export default DownloadForm;
