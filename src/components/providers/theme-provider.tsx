"use client";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

const ThemeProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
    
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
        enableSystem={false}
    >
      {children}
    </NextThemeProvider>
  );
};

export default ThemeProvider;
