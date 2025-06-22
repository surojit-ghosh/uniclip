import { cn } from "@/lib/utils";
import React from "react";

const Background = () => {
    return (
        <>
            <div
                className={cn(
                    "fixed inset-0 -z-10",
                    "[background-size:40px_40px]",
                    "[background-image:linear-gradient(to_right,var(--muted-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--muted-grid)_1px,transparent_1px)]",
                    "dark:[background-image:linear-gradient(to_right,var(--muted-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--muted-grid)_1px,transparent_1px)]"
                )}
            />
            <div className="bg-background pointer-events-none fixed inset-0 -z-1 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </>
    );
};

export default Background;
