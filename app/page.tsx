"use client";

import { useWriter } from "@/hooks/useWriter";
import { useTheme } from "@/hooks/useTheme";
import { Header } from "@/components/Header";
import { ContentTypeSelector } from "@/components/ContentTypeSelector";
import { ToneSelector } from "@/components/ToneSelector";
import { AudienceInput } from "@/components/AudienceInput";
import { KeyPointsInput } from "@/components/KeyPointsInput";
import { WordCountSlider } from "@/components/WordCountSlider";
import { TemplateSelector } from "@/components/TemplateSelector";
import { ContentPreview } from "@/components/ContentPreview";
import { StatsBar } from "@/components/StatsBar";
import { ExportButtons } from "@/components/ExportButtons";
import { ContentHistory } from "@/components/ContentHistory";
import LoadingAnimation from "@/components/LoadingAnimation";
import { Sparkles, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const writer = useWriter();
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950 dark:via-orange-950 dark:to-yellow-950 transition-colors duration-300">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <Header theme={theme} toggleTheme={toggleTheme} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar - Controls */}
            <div className="lg:col-span-4 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TemplateSelector
                  selectedTemplate={writer.selectedTemplate}
                  onSelect={writer.setSelectedTemplate}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <ContentTypeSelector
                  selected={writer.contentType}
                  onChange={writer.setContentType}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ToneSelector
                  selected={writer.tone}
                  onChange={writer.setTone}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <AudienceInput
                  value={writer.audience}
                  onChange={writer.setAudience}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <KeyPointsInput
                  value={writer.keyPoints}
                  onChange={writer.setKeyPoints}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <WordCountSlider
                  value={writer.wordCountTarget}
                  onChange={writer.setWordCountTarget}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex gap-3"
              >
                <button
                  onClick={writer.generate}
                  disabled={writer.isGenerating}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-brand-500 to-purple-600 text-white font-semibold rounded-xl hover:from-brand-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {writer.isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Content
                    </>
                  )}
                </button>

                {writer.generatedContent && (
                  <button
                    onClick={writer.clearAll}
                    className="px-4 py-3.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
                    title="Clear content"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                )}
              </motion.div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-5 space-y-4">
              <AnimatePresence mode="wait">
                {writer.isGenerating && !writer.generatedContent ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <LoadingAnimation />
                  </motion.div>
                ) : writer.generatedContent ? (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <StatsBar content={writer.generatedContent} />
                    <ContentPreview content={writer.generatedContent} />
                    <ExportButtons
                      content={writer.generatedContent}
                      title={`${writer.contentType} - ${writer.tone}`}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass-card p-12 text-center"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brand-100 to-purple-100 dark:from-brand-900/30 dark:to-purple-900/30 flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-brand-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Ready to Create
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                      Choose your content type, set the tone, and click Generate
                      to create amazing content with AI.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Sidebar - History */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <ContentHistory
                  history={writer.history}
                  onLoad={writer.loadFromHistory}
                  onDelete={writer.deleteFromHistory}
                />
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
