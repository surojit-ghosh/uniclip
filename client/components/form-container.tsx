import { cn } from "@/lib/utils";
import React from "react";

type FormContainerProps = {
    children: React.ReactNode;
    className?: string;
};

const FormContainer = ({ children, className }: FormContainerProps) => {
    return (
        <div
            className={cn(
                "max-w-xl w-full mx-auto p-6 bg-secondary rounded-lg shadow-lg",
                className
            )}
        >
            {children}
        </div>
    );
};

export default FormContainer;
