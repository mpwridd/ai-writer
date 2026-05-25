"use client";

import { useState, useCallback } from "react";
import {
  ContentType,
  Tone,
  ContentHistory,
  WriterState,
  CONTENT_TEMPLATES,
} from "@/lib/types";
import { buildPrompt, generateId } from "@/lib/utils";
import { useLocalStorage } from "./useLocalStorage";

export function useWriter() {
  const [state, setState] = useState<WriterState>({
    contentType: "blog-post",
    tone: "professional",
    audience: "",
    keyPoints: "",
    wordCountTarget: 500,
    generatedContent: "",
    isGenerating: false,
    history: [],
    selectedTemplate: null,
  });

  const [history, setHistory] = useLocalStorage<ContentHistory[]>(
    "ai-writer-history",
    []
  );

  const setContentType = useCallback((type: ContentType) => {
    setState((prev) => ({ ...prev, contentType: type }));
  }, []);

  const setTone = useCallback((tone: Tone) => {
    setState((prev) => ({ ...prev, tone }));
  }, []);

  const setAudience = useCallback((audience: string) => {
    setState((prev) => ({ ...prev, audience }));
  }, []);

  const setKeyPoints = useCallback((keyPoints: string) => {
    setState((prev) => ({ ...prev, keyPoints }));
  }, []);

  const setWordCountTarget = useCallback((wordCountTarget: number) => {
    setState((prev) => ({ ...prev, wordCountTarget }));
  }, []);

  const setSelectedTemplate = useCallback(
    (templateId: string | null) => {
      if (!templateId) {
        setState((prev) => ({ ...prev, selectedTemplate: null }));
        return;
      }

      const template = CONTENT_TEMPLATES.find((t) => t.id === templateId);
      if (template) {
        setState((prev) => ({
          ...prev,
          selectedTemplate: templateId,
          contentType: template.contentType,
          tone: template.tone,
          audience: template.audience,
          keyPoints: template.keyPoints,
        }));
      }
    },
    []
  );

  const generate = useCallback(async () => {
    setState((prev) => ({ ...prev, isGenerating: true, generatedContent: "" }));

    const prompt = buildPrompt(
      state.contentType,
      state.tone,
      state.audience,
      state.keyPoints,
      state.wordCountTarget
    );

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Generation failed");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content || "";
              fullContent += content;
              setState((prev) => ({
                ...prev,
                generatedContent: fullContent,
              }));
            } catch {
              // Skip malformed JSON
            }
          }
        }
      }

      // Save to history
      const historyItem: ContentHistory = {
        id: generateId(),
        timestamp: Date.now(),
        contentType: state.contentType,
        tone: state.tone,
        audience: state.audience,
        keyPoints: state.keyPoints,
        wordCount: state.wordCountTarget,
        content: fullContent,
      };

      setHistory((prev) => [historyItem, ...prev].slice(0, 50));
    } catch (error) {
      console.error("Generation error:", error);
      setState((prev) => ({
        ...prev,
        generatedContent:
          "Error generating content. Please check your connection and try again.",
      }));
    } finally {
      setState((prev) => ({ ...prev, isGenerating: false }));
    }
  }, [state.contentType, state.tone, state.audience, state.keyPoints, state.wordCountTarget, setHistory]);

  const loadFromHistory = useCallback((item: ContentHistory) => {
    setState((prev) => ({
      ...prev,
      contentType: item.contentType,
      tone: item.tone,
      audience: item.audience,
      keyPoints: item.keyPoints,
      wordCountTarget: item.wordCount,
      generatedContent: item.content,
      selectedTemplate: null,
    }));
  }, []);

  const deleteFromHistory = useCallback(
    (id: string) => {
      setHistory((prev) => prev.filter((item) => item.id !== id));
    },
    [setHistory]
  );

  const clearAll = useCallback(() => {
    setState((prev) => ({
      ...prev,
      generatedContent: "",
      selectedTemplate: null,
    }));
  }, []);

  return {
    ...state,
    history,
    setContentType,
    setTone,
    setAudience,
    setKeyPoints,
    setWordCountTarget,
    setSelectedTemplate,
    generate,
    loadFromHistory,
    deleteFromHistory,
    clearAll,
  };
}
