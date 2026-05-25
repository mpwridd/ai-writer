export type ContentType =
  | "blog-post"
  | "social-media"
  | "email"
  | "ad-copy"
  | "product-description";

export type Tone =
  | "professional"
  | "casual"
  | "persuasive"
  | "humorous"
  | "formal";

export interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  contentType: ContentType;
  tone: Tone;
  audience: string;
  keyPoints: string;
  icon: string;
}

export interface ContentHistory {
  id: string;
  timestamp: number;
  contentType: ContentType;
  tone: Tone;
  audience: string;
  keyPoints: string;
  wordCount: number;
  content: string;
}

export interface WriterState {
  contentType: ContentType;
  tone: Tone;
  audience: string;
  keyPoints: string;
  wordCountTarget: number;
  generatedContent: string;
  isGenerating: boolean;
  history: ContentHistory[];
  selectedTemplate: string | null;
}

export const CONTENT_TYPES: { value: ContentType; label: string; icon: string }[] = [
  { value: "blog-post", label: "Blog Post", icon: "📝" },
  { value: "social-media", label: "Social Media", icon: "📱" },
  { value: "email", label: "Email", icon: "📧" },
  { value: "ad-copy", label: "Ad Copy", icon: "📢" },
  { value: "product-description", label: "Product Description", icon: "🛍️" },
];

export const TONES: { value: Tone; label: string; color: string }[] = [
  { value: "professional", label: "Professional", color: "bg-blue-500" },
  { value: "casual", label: "Casual", color: "bg-green-500" },
  { value: "persuasive", label: "Persuasive", color: "bg-orange-500" },
  { value: "humorous", label: "Humorous", color: "bg-pink-500" },
  { value: "formal", label: "Formal", color: "bg-purple-500" },
];

export const CONTENT_TEMPLATES: ContentTemplate[] = [
  {
    id: "tech-blog",
    name: "Tech Blog Post",
    description: "Engaging technical blog post with clear explanations",
    contentType: "blog-post",
    tone: "professional",
    audience: "Software developers and tech enthusiasts",
    keyPoints: "Introduction to the concept\nHow it works technically\nPractical use cases\nCode examples\nConclusion with key takeaways",
    icon: "💻",
  },
  {
    id: "product-launch",
    name: "Product Launch Email",
    description: "Exciting product launch announcement email",
    contentType: "email",
    tone: "persuasive",
    audience: "Existing customers and newsletter subscribers",
    keyPoints: "Exciting product announcement\nKey features and benefits\nLimited-time offer\nCall to action\nSocial proof",
    icon: "🚀",
  },
  {
    id: "social-thread",
    name: "Twitter/X Thread",
    description: "Viral-worthy social media thread",
    contentType: "social-media",
    tone: "casual",
    audience: "General social media audience interested in the topic",
    keyPoints: "Hook opening tweet\n5-7 value-packed tweets\nReal examples or stories\nEngagement question\nCall to action",
    icon: "🧵",
  },
  {
    id: "sales-page",
    name: "Sales Page Copy",
    description: "High-converting sales page copy",
    contentType: "ad-copy",
    tone: "persuasive",
    audience: "Potential customers considering the product",
    keyPoints: "Attention-grabbing headline\nPain point identification\nSolution presentation\nBenefits over features\nTestimonials\nUrgency and scarcity\nStrong CTA",
    icon: "💰",
  },
  {
    id: "ecommerce-desc",
    name: "E-commerce Description",
    description: "Compelling product description that sells",
    contentType: "product-description",
    tone: "professional",
    audience: "Online shoppers looking for quality products",
    keyPoints: "Product overview\nKey specifications\nUnique selling points\nUse cases\nWhat's included",
    icon: "🛒",
  },
  {
    id: "newsletter",
    name: "Weekly Newsletter",
    description: "Engaging weekly newsletter content",
    contentType: "email",
    tone: "casual",
    audience: "Newsletter subscribers interested in industry updates",
    keyPoints: "Welcome greeting\nThis week's highlights\nFeatured content\nTips or insights\nUpcoming events\nCTA",
    icon: "📬",
  },
];
