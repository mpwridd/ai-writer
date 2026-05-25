"use client";

import { Tone, TONES } from "@/lib/types";

interface ToneSelectorProps {
  selected: Tone;
  onChange: (tone: Tone) => void;
}

export function ToneSelector({ selected, onChange }: ToneSelectorProps) {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-purple-500" />
        Tone
      </h3>
      <div className="flex flex-wrap gap-2">
        {TONES.map((tone) => (
          <button
            key={tone.value}
            onClick={() => onChange(tone.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              selected === tone.value
                ? "bg-gradient-to-r from-brand-500 to-purple-600 text-white shadow-lg shadow-brand-500/25"
                : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {tone.label}
          </button>
        ))}
      </div>
    </div>
  );
}
