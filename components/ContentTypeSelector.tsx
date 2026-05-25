"use client";

import { ContentType, CONTENT_TYPES } from "@/lib/types";

interface ContentTypeSelectorProps {
  selected: ContentType;
  onChange: (type: ContentType) => void;
}

export function ContentTypeSelector({
  selected,
  onChange,
}: ContentTypeSelectorProps) {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-brand-500" />
        Content Type
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {CONTENT_TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => onChange(type.value)}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              selected === type.value
                ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25"
                : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <span className="text-lg">{type.icon}</span>
            <span className="truncate">{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
