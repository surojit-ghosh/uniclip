"use client";

import React from "react";
import { AnimatePresence, motion, Transition } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useIsMobile } from "@/lib/hooks/use-mobile";

export interface Tab {
    icon: string;
    label: string;
    value: string;
    form: React.ReactNode;
}

interface ExpandableTabsProps {
    tabs: Tab[];
    className?: string;
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const buttonVariants = {
    initial: {
        gap: 0,
        paddingLeft: ".5rem",
        paddingRight: ".5rem",
    },
    animate: (isSelected: boolean) => ({
        gap: isSelected ? ".5rem" : 0,
        paddingLeft: isSelected ? "1rem" : ".5rem",
        paddingRight: isSelected ? "1rem" : ".5rem",
    }),
};

const spanVariants = {
    initial: { width: 0, opacity: 0 },
    animate: { width: "auto", opacity: 1 },
    exit: { width: 0, opacity: 0 },
};

const transition: Transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

export function ExpandableTabs({ tabs, className, activeTab, setActiveTab }: ExpandableTabsProps) {
    const isMobile = useIsMobile();

    return (
        <div
            className={cn(
                "bg-muted mx-auto flex w-fit flex-wrap items-center gap-1 rounded-md p-1 shadow-sm",
                className
            )}
        >
            {tabs.map((tab) => {
                return (
                    <motion.button
                        key={tab.value}
                        variants={buttonVariants}
                        initial={false}
                        animate="animate"
                        custom={activeTab === tab.value || !isMobile}
                        onClick={() => setActiveTab(tab.value)}
                        transition={transition}
                        className={cn(
                            "relative flex items-center px-4 py-2 text-sm font-medium transition-colors duration-300",
                            activeTab === tab.value
                                ? cn("bg-background")
                                : "hover:bg-background hover:text-foreground"
                        )}
                    >
                        <Image src={tab.icon} alt={`${tab.label} Icon`} width={25} height={25} />
                        <AnimatePresence initial={false}>
                            {(!isMobile || activeTab === tab.value) && (
                                <motion.span
                                    variants={spanVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={transition}
                                    className="overflow-hidden"
                                >
                                    {tab.label}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                );
            })}
        </div>
    );
}

export function useTabs(defaultValue: string) {
    const [activeTab, setActiveTab] = React.useState(defaultValue);

    return {
        activeTab,
        setActiveTab,
    };
}
