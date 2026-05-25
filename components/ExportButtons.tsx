"use client";

import { useState } from "react";
import { downloadFile, exportAsHtml } from "@/lib/utils";
import { Copy, Check, FileDown, FileCode } from "lucide-react";

interface ExportButtonsProps {
  content: string;
  title: string;
}

export function ExportButtons({ content, title }: ExportButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleExportMarkdown = () => {
    const filename = `${title.toLowerCase().replace(/\s+/g, "-")}.md`;
    downloadFile(content, filename, "text/markdown");
  };

  const handleExportHtml = () => {
    const html = exportAsHtml(content, title);
    const filename = `${title.toLowerCase().replace(/\s+/g, "-")}.html`;
    downloadFile(html, filename, "text/html");
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopy}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
          copied
            ? "bg-green-500 text-white"
            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            Copy
          </>
        )}
      </button>

      <button
        onClick={handleExportMarkdown}
        className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
      >
        <FileDown className="w-4 h-4" />
        Markdown
      </button>

      <button
        onClick={handleExportHtml}
        className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
      >
        <FileCode className="w-4 h-4" />
        HTML
      </button>
    </div>
  );
}
