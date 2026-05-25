# AI Content Writer

A beautiful, production-ready AI content writing app powered by Mimo V2.5 Pro.

## Features

- 🎯 Content type selector: Blog Post, Social Media, Email, Ad Copy, Product Description
- 🎨 Tone selector: Professional, Casual, Persuasive, Humorous, Formal
- 👥 Target audience input
- 📝 Key points / outline input
- 📊 Word count target slider
- ⚡ Live streaming generation
- 📋 Copy to clipboard
- 📁 Export to Markdown / HTML
- 📄 Content templates (pre-built prompts)
- 📜 Content history sidebar
- 🌙 Dark/light mode
- 🎨 Beautiful gradient UI

## Tech Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- OpenAI SDK (Mimo V2.5 Pro API)
- react-markdown
- framer-motion
- lucide-react

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create `.env.local`:

```env
MIMO_API_BASE_URL=http://100.91.112.121:8317/v1
MIMO_API_KEY=your_api_key
MIMO_MODEL=Mimo-V2.5-Pro
```

## Build & Deploy

```bash
npm run build
npm start
```
