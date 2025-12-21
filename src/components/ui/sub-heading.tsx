import { cn } from "@/lib/utils";
import React from "react";

type SubHeadingLevels = "h2" | "h3" | "h4" | "p"|"div" | "span";

type Size = "xs"|"sm" | "md" | "lg" | "xl" | "2xl";

const sizeMap: Record<Size, string> = {
    xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
};

export interface SubHeadingProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: SubHeadingLevels;
  size?: Size;
  weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
  align?: "left" | "center" | "right" | "justify";
  className?: string;
}

const weightMap: Record<NonNullable<SubHeadingProps["weight"]>, string> = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

const alignMap: Record<NonNullable<SubHeadingProps["align"]>, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

const SubHeading = React.forwardRef<HTMLElement, SubHeadingProps>(
  (
    {
      as = "h2",
      size = "lg",
      weight = "semibold",
      align,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Tag = as || "h2";
    return (
      <Tag
        className={cn(
          sizeMap[size],
          weight && weightMap[weight],
          align && alignMap[align],
          "tracking-tight leading-tight max-w-sm text-muted-foreground",
          className
        )}
        ref={ref as any}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

SubHeading.displayName = "SubHeading";

export default SubHeading;