import { cn } from "@/lib/utils";
import React from "react";

type ContainerProps = {
    children: React.ReactNode;
    className?: string;
};

const Container = ({ children, className }: ContainerProps) => {
    return <section className={cn("mx-auto w-full max-w-5xl p-4", className)}>{children}</section>;
};

export default Container;
