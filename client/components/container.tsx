import { cn } from "@/lib/utils";
import React from "react";

type ContainerProps = {
    children: React.ReactNode;
    clasName?: string;
};

const Container = ({ children, clasName }: ContainerProps) => {
    return (
        <section className={cn("max-w-5xl w-full mx-auto p-4", clasName)}>
            {children}
        </section>
    );
};

export default Container;
