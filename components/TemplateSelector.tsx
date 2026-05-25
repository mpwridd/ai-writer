"use client";

import { ContentTemplate, CONTENT_TEMPLATES } from "@/lib/types";
import { LayoutTemplate } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: string | null;
  onSelect: (templateId: string | null) => void;
}

export function TemplateSelector({
  selectedTemplate,
  onSelect,
}: TemplateSelectorProps) {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-yellow-500" />
        Templates
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {CONTENT_TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() =>
              onSelect(selectedTemplate === template.id ? null : template.id)
            }
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 text-left ${
              selectedTemplate === template.id
                ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25"
                : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <span className="text-base">{template.icon}</span>
            <span className="truncate">{template.name}</span>
          </button>
        ))}
      </div>
      {selectedTemplate && (
        <button
          onClick={() => onSelect(null)}
          className="mt-2 w-full text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          Clear template
        </button>
      )}
    </div>
  );
}
