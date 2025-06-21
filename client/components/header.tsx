import Link from "next/link";
import React from "react";
import Container from "./container";
import { Github, Sun } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
    return (
        <Container clasName="border-b border-border px-0">
            <div className="backdrop-blur-xl flex items-center  justify-between">
                <Link href="/" className="text-2xl font-bold">
                    UniClip_
                </Link>

                <div className="space-x-1">
                    <Button
                        variant={"ghost"}
                        size="icon"
                        className="rounded-full"
                    >
                        <Sun />
                    </Button>

                    <Link
                        href={"https://github.com/surojit-ghosh/uniclip"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            buttonVariants({
                                variant: "ghost",
                                size: "icon",
                            }),
                            "rounded-full"
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
