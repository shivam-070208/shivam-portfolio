import { cn } from "@/lib/utils";
import React from "react";

type HeadingLevels = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span";

type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

const sizeMap: Record<Size, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
};

export interface HeadingProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: HeadingLevels;
  size?: Size;
  weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
  align?: "left" | "center" | "right" | "justify";
  className?: string;
}

const weightMap: Record<NonNullable<HeadingProps["weight"]>, string> = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

const alignMap: Record<NonNullable<HeadingProps["align"]>, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

const Heading = React.forwardRef<HTMLElement, HeadingProps>(
  (
    {
      as = "h1",
      size = "2xl",
      weight = "bold",
      align,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Tag = as || "h1";
    return (
      <Tag
        className={cn(
          sizeMap[size],
          weight && weightMap[weight],
          align && alignMap[align],
          "text-foreground tracking-tight",
          className
        )}
        ref={ref as React.Ref<HTMLHeadingElement>}
        {...props}>
        {children}
      </Tag>
    );
  }
);

Heading.displayName = "Heading";

export default Heading;
