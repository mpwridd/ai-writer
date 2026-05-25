"use client";

import { ListChecks } from "lucide-react";

interface KeyPointsInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function KeyPointsInput({ value, onChange }: KeyPointsInputProps) {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-orange-500" />
        Key Points / Outline
      </h3>
      <div className="relative">
        <ListChecks className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter key points, one per line..."
          rows={4}
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200 resize-none"
        />
      </div>
    </div>
  );
}
