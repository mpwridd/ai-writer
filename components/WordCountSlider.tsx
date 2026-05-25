"use client";

import { AlignLeft } from "lucide-react";

interface WordCountSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function WordCountSlider({ value, onChange }: WordCountSliderProps) {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-pink-500" />
        Word Count Target
      </h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold gradient-text">{value}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            words
          </span>
        </div>
        <input
          type="range"
          min={100}
          max={2000}
          step={50}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-brand-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-brand-500 [&::-webkit-slider-thumb]:to-purple-600 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-brand-500/25 [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>100</span>
          <span>500</span>
          <span>1000</span>
          <span>1500</span>
          <span>2000</span>
        </div>
      </div>
    </div>
  );
}
