"use client";

import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
}
