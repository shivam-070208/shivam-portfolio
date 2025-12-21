import React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  as?: React.ElementType;
}

const maxWidthMap: Record<NonNullable<ContainerProps["maxWidth"]>, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-full",
};

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  maxWidth = "2xl",
  as: Component = "div",
  ...props
}) => {
    
  return (
    <Component
      className={cn(
        "w-full  mx-auto px-4",
        maxWidthMap[maxWidth],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Container;