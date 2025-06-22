"use client";

import { motion } from "framer-motion";
import { Scissors, Globe, Zap, HardDrive } from "lucide-react";

const features = [
    {
        title: "Smart Video Trimming",
        description:
            "Clip exactly the moments you need by setting custom start and end times — perfect for reels, shorts, or reaction content.",
        icon: Scissors,
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50 dark:bg-blue-950/20",
        iconColor: "text-blue-500",
    },
    {
        title: "Multi-Platform Support",
        description:
            "Download videos from YouTube, Instagram, Facebook, and X (Twitter) — all in one tool, no switching tabs.",
        icon: Globe,
        color: "from-green-500 to-emerald-500",
        bgColor: "bg-green-50 dark:bg-green-950/20",
        iconColor: "from-green-500",
    },
    {
        title: "Fast & No-Signup Access",
        description:
            "No account needed. Just paste a link, trim, and download — UniClip works instantly with zero bloat.",
        icon: Zap,
        color: "from-yellow-500 to-orange-500",
        bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
        iconColor: "from-yellow-500",
    },
    {
        title: "High-Quality, Watermark-Free Downloads",
        description:
            "Save full HD or original-quality videos with no compression or branding — your content stays clean and sharp.",
        icon: HardDrive,
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-purple-50 dark:bg-purple-950/20",
        iconColor: "from-purple-500",
    },
];

export function FeaturesSection() {
    return (
        <section className="">
            <div className="mb-8 text-center">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 text-3xl font-bold sm:text-4xl"
                >
                    Why Creators Trust UniClip
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-muted-foreground mx-auto max-w-xl text-lg"
                >
                    Speed, simplicity, and clean clips — UniClip gives you total control over your
                    content in seconds.
                </motion.p>
            </div>

            {/* Features Grid - 4 columns on desktop, responsive on smaller screens */}
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                            className="group h-full"
                        >
                            <div className="border-border bg-card hover:bg-card/80 relative flex h-full flex-col overflow-hidden rounded-md border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                                {/* Gradient background overlay */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                                />

                                <div className="relative flex h-full flex-col p-4">
                                    {/* Icon */}
                                    <div className="mb-6 flex justify-center">
                                        <div
                                            className={`rounded-md p-4 ${feature.bgColor} transition-transform duration-300 group-hover:scale-110`}
                                        >
                                            <Icon className={`h-8 w-8 ${feature.iconColor}`} />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-1 flex-col text-center">
                                        <h4 className="text-md mb-3 font-semibold text-gray-900 transition-colors group-hover:text-gray-800 dark:text-gray-100 dark:group-hover:text-gray-50">
                                            {feature.title}
                                        </h4>
                                        <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}

export default FeaturesSection;
