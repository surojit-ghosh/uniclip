"use client";

import Link from "next/link";
import React from "react";
import Container from "./container";
import { Download, Github, Moon, Sun } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { github_repo } from "@/lib/config";
import { useTheme } from "next-themes";

const Header = () => {
    const { setTheme, theme } = useTheme();

    return (
        <Container clasName="border-b border-border font-mono backdrop-blur-md bg-background/70 fixed inset-0 h-fit">
            <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 text-3xl font-bold">
                    <div className="bg-primary rounded-xs p-1.5">
                        <Download className="h-6 w-6 text-white" />
                    </div>
                    <span>UniClip_</span>
                </Link>

                <div className="space-x-1">
                    <Button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        variant={"ghost"}
                        size="icon"
                        className="rounded-full transition-all duration-300"
                    >
                        {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
                    </Button>

                    <Link
                        href={`https://github.com/${github_repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            buttonVariants({
                                variant: "ghost",
                                size: "icon",
                            }),
                            "rounded-full transition-all duration-300"
                        )}
                    >
                        <Github size={18} />
                    </Link>
                </div>
            </div>
        </Container>
    );
};

export default Header;
