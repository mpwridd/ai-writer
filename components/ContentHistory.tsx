"use client";

import { ContentHistory as ContentHistoryType, CONTENT_TYPES, TONES } from "@/lib/types";
import { formatTimestamp, countWords } from "@/lib/utils";
import { History, Trash2, Clock, FileText } from "lucide-react";

interface ContentHistoryProps {
  history: ContentHistoryType[];
  onLoad: (item: ContentHistoryType) => void;
  onDelete: (id: string) => void;
}

export function ContentHistory({
  history,
  onLoad,
  onDelete,
}: ContentHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500" />
          History
        </h3>
        <div className="text-center py-8">
          <History className="w-10 h-10 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No content generated yet
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Your generation history will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-indigo-500" />
        History
        <span className="ml-auto text-xs font-normal text-gray-500 dark:text-gray-400">
          {history.length} items
        </span>
      </h3>
      <div className="space-y-2 max-h-[500px] overflow-y-auto">
        {history.map((item) => {
          const contentType = CONTENT_TYPES.find(
            (t) => t.value === item.contentType
          );
          const tone = TONES.find((t) => t.value === item.tone);
          const words = countWords(item.content);

          return (
            <div
              key={item.id}
              className="group relative p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer"
              onClick={() => onLoad(item)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{contentType?.icon}</span>
                    <span className="text-xs font-medium text-gray-900 dark:text-white truncate">
                      {contentType?.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimestamp(item.timestamp)}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {words} words
                    </span>
                  </div>
                  <div className="mt-1">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        tone?.value === "professional"
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                          : tone?.value === "casual"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                          : tone?.value === "persuasive"
                          ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                          : tone?.value === "humorous"
                          ? "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300"
                          : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      }`}
                    >
                      {tone?.label}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500 transition-all duration-200"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
