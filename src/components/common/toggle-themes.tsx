"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <button
      aria-label="Toggle theme"
      type="button"
      tabIndex={0}
      className={cn(
        "w-12 h-7 flex items-center cursor-pointer p-1 rounded-full border border-foreground/20 transition-all duration-300",
        "backdrop-blur-lg bg-foreground/10 ",
        theme === "light" ? "justify-start" : "justify-end"
      )}
      onClick={handleToggle}
    >
      <motion.div
        transition={{
          ease: "linear",
          duration: 0.3,
        }}
        layout
        className={cn(
          "w-5 h-5 rounded-full shadow-glass border border-foreground/30",
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
