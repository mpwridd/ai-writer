import { ContentType, Tone } from "./types";

export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

export function countCharacters(text: string): number {
  return text.length;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function buildPrompt(
  contentType: ContentType,
  tone: Tone,
  audience: string,
  keyPoints: string,
  wordCountTarget: number
): string {
  const contentTypeMap: Record<ContentType, string> = {
    "blog-post": "blog post",
    "social-media": "social media post or thread",
    email: "professional email",
    "ad-copy": "advertising copy",
    "product-description": "product description",
  };

  const toneMap: Record<Tone, string> = {
    professional: "professional and authoritative",
    casual: "casual and conversational",
    persuasive: "persuasive and compelling",
    humorous: "humorous and entertaining",
    formal: "formal and polished",
  };

  const parts = [
    `Write a ${contentTypeMap[contentType]} with a ${toneMap[tone]} tone.`,
  ];

  if (audience.trim()) {
    parts.push(`Target audience: ${audience.trim()}.`);
  }

  if (keyPoints.trim()) {
    parts.push(`Include these key points:\n${keyPoints.trim()}`);
  }

  parts.push(`Aim for approximately ${wordCountTarget} words.`);

  if (contentType === "social-media") {
    parts.push(
      "Format as a social media thread with numbered tweets/posts. Each post should be concise and engaging."
    );
  } else if (contentType === "email") {
    parts.push(
      "Include a compelling subject line, greeting, body content, and a clear call-to-action."
    );
  } else if (contentType === "ad-copy") {
    parts.push(
      "Start with an attention-grabbing headline. Focus on benefits over features. End with a strong call-to-action."
    );
  } else if (contentType === "product-description") {
    parts.push(
      "Start with an engaging overview, list key features with benefits, and include what makes it unique."
    );
  } else if (contentType === "blog-post") {
    parts.push(
      "Include an engaging introduction, well-structured sections with headers, and a conclusion with key takeaways."
    );
  }

  parts.push(
    "Use markdown formatting for headers, lists, and emphasis where appropriate."
  );

  return parts.join(" ");
}

export function downloadFile(
  content: string,
  filename: string,
  mimeType: string
) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Lists
  html = html.replace(/^\s*[-*]\s+(.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>");

  // Numbered lists
  html = html.replace(/^\s*\d+\.\s+(.+)$/gm, "<li>$1</li>");

  // Paragraphs
  html = html.replace(/\n\n/g, "</p><p>");
  html = "<p>" + html + "</p>";

  // Clean up
  html = html.replace(/<p><\/p>/g, "");
  html = html.replace(/<p>(<h[1-6]>)/g, "$1");
  html = html.replace(/(<\/h[1-6]>)<\/p>/g, "$1");
  html = html.replace(/<p>(<ul>)/g, "$1");
  html = html.replace(/(<\/ul>)<\/p>/g, "$1");

  return html;
}

export function exportAsHtml(markdown: string, title: string): string {
  const content = markdownToHtml(markdown);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.6; color: #333; }
    h1, h2, h3 { color: #1a1a1a; margin-top: 1.5em; }
    h1 { font-size: 2em; border-bottom: 2px solid #eee; padding-bottom: 0.3em; }
    h2 { font-size: 1.5em; }
    h3 { font-size: 1.2em; }
    ul { padding-left: 1.5em; }
    li { margin: 0.5em 0; }
    strong { color: #1a1a1a; }
    em { color: #555; }
    p { margin: 1em 0; }
  </style>
</head>
<body>
${content}
</body>
</html>`;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
