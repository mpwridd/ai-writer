"use client";

import { countWords, countCharacters } from "@/lib/utils";
import { Type, Hash, Clock } from "lucide-react";

interface StatsBarProps {
  content: string;
}

export function StatsBar({ content }: StatsBarProps) {
  const words = countWords(content);
  const chars = countCharacters(content);
  const readTime = Math.max(1, Math.ceil(words / 200));

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Type className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Words
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {words.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Hash className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Characters
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {chars.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Read Time
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {readTime} min
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
