"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useLayoutEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        type="button"
        tabIndex={0}
        className={cn(
          "border-foreground/20 flex h-7 w-12 cursor-pointer items-center rounded-full border p-1 transition-all duration-300",
          "bg-foreground/10 backdrop-blur-lg",
          "justify-start"
        )}
        onClick={handleToggle}>
        <motion.div
          transition={{
            duration: 0.02,
          }}
          layout
          className={cn(
            "shadow-glass border-foreground/30 h-5 w-5 rounded-full border",
            "bg-linear-to-br from-pink-300 via-pink-400/80 to-pink-600/70",
            "opacity-90 transition-all duration-300"
          )}
          style={{
            boxShadow:
              "0 0 12px 5px rgba(236,72,153,0.25), 0 1.5px 8px 0 rgba(255,255,255,0.15)",
          }}
        />
      </button>
    );
  }
  return (
    <button
      aria-label="Toggle theme"
      type="button"
      tabIndex={0}
      className={cn(
        "border-foreground/20 flex h-7 w-12 cursor-pointer items-center rounded-full border p-1 transition-all duration-300",
        "bg-foreground/10 hidden backdrop-blur-lg sm:inline-block",
        theme === "light" ? "justify-start" : "justify-end"
      )}
      onClick={handleToggle}>
      <motion.div
        transition={{
          duration: 0.02,
        }}
        layout
        className={cn(
          "shadow-glass border-foreground/30 h-5 w-5 rounded-full border",
          "bg-linear-to-br from-pink-300 via-pink-400/80 to-pink-600/70",
          "opacity-90 transition-all duration-300"
        )}
        style={{
          boxShadow:
            "0 0 12px 5px rgba(236,72,153,0.25), 0 1.5px 8px 0 rgba(255,255,255,0.15)",
        }}
      />
    </button>
  );
};

export default ThemeToggle;
