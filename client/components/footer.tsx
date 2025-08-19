"use client";

import Link from "next/link";
import Container from "./container";
import { useEffect, useState } from "react";
import { GitFork, Star } from "lucide-react";
import { github_repo } from "@/lib/config";

export function Footer() {
    const [stars, setStars] = useState<number | null>(null);
    const [forks, setForks] = useState<number | null>(null);

    useEffect(() => {
        const fetchGitHubStats = async () => {
            try {
                const response = await fetch(`https://api.github.com/repos/${github_repo}`);
                const data = await response.json();
                setStars(data.stargazers_count);
                setForks(data.forks_count);
            } catch (error) {
                console.error("Failed to fetch GitHub data:", error);
            }
        };

        fetchGitHubStats();
    }, []);

    return (
        <Container className="border-border mt-12 border-t px-4 py-8">
            <div className="mx-auto flex w-full items-center justify-between font-mono text-sm">
                <Link
                    href={`https://github.com/${github_repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-accent-foreground space-y-1 text-center transition-all duration-300"
                >
                    <div>Built by Surojit Ghosh</div>
                </Link>

                <Link
                    href={`https://github.com/${github_repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-accent-foreground space-y-1 text-center transition-all duration-300"
                >
                    <div className="flex items-center justify-center gap-3">
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            <span>{stars !== null ? stars.toLocaleString() : "—"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <GitFork className="h-4 w-4" />
                            <span>{forks !== null ? forks.toLocaleString() : "—"}</span>
                        </div>
                    </div>
                </Link>
            </div>
        </Container>
    );
}

export default Footer;
