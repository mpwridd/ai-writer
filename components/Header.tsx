"use client";

import { ThemeToggle } from "./ThemeToggle";
import { Sparkles } from "lucide-react";

interface HeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export function Header({ theme, toggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-lg shadow-brand-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">AI Writer</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Powered by Mimo V2.5 Pro
              </p>
            </div>
          </div>

          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </header>
  );
}
