"use client";

import React, { useEffect, useState } from "react";
import { useAppStore, Theme } from "@/store/app.store";
import { STORAGE_KEYS } from "@/config/constants";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): React.JSX.Element {
  const { theme, setTheme } = useAppStore();
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage on client-side mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as Theme | null;
    if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system") {
      setTheme(savedTheme);
    }
    setMounted(true);
  }, [setTheme]);

  // Apply theme class and custom attributes to document element
  useEffect(() => {
    if (!mounted) return;

    // Persist current selection to localStorage
    localStorage.setItem(STORAGE_KEYS.THEME, theme);

    const root = document.documentElement;

    const applyTheme = (t: "light" | "dark") => {
      root.setAttribute("data-theme", t);
      if (t === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? "dark" : "light");
      };

      // Set initial state matching media query
      applyTheme(mediaQuery.matches ? "dark" : "light");

      // Register system preference listener
      mediaQuery.addEventListener("change", handleSystemThemeChange);
      return () => {
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
      };
    } else {
      applyTheme(theme);
    }
  }, [theme, mounted]);

  return <>{children}</>;
}
