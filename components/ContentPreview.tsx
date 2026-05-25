"use client";

import ReactMarkdown from "react-markdown";

interface ContentPreviewProps {
  content: string;
}

export function ContentPreview({ content }: ContentPreviewProps) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Generated Content
        </h3>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
      </div>
      <div className="p-6 max-h-[600px] overflow-y-auto">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-5">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-4">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700 dark:text-gray-300">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-700 dark:text-gray-300">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="leading-relaxed">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-gray-900 dark:text-white">
                  {children}
                </strong>
              ),
              em: ({ children }) => (
                <em className="italic text-gray-600 dark:text-gray-400">
                  {children}
                </em>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-brand-500 pl-4 my-4 italic text-gray-600 dark:text-gray-400">
                  {children}
                </blockquote>
              ),
              code: ({ children, className }) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-brand-600 dark:text-brand-400">
                      {children}
                    </code>
                  );
                }
                return (
                  <code className={className}>{children}</code>
                );
              },
              pre: ({ children }) => (
                <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 rounded-xl p-4 overflow-x-auto mb-4">
                  {children}
                </pre>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
