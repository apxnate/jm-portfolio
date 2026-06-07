# John Mark Dulce — AI Portfolio

Personal AI-powered portfolio website. Chat with an animated avatar that knows everything about John Mark's skills, projects, and services.

**Inspired by:** toukoum.fr (Raphael Giraud's AI-native portfolio)

## Features

- Animated SVG avatar with idle/thinking/speaking states
- Streaming AI chat powered by Vercel AI SDK
- Rainbow mouse-trail + liquid click splash effect
- Light/dark mode toggle
- Inline project cards triggered by conversation
- Floating suggestion chips
- Fully responsive, deploy-ready for Vercel

## Tech Stack

- **Next.js 15** (App Router, Server Components)
- **Tailwind CSS v4**
- **Motion** (`motion/react`, formerly Framer Motion)
- **Vercel AI SDK v4** with streaming
- **OpenAI GPT-4o-mini** (default) or **Groq Llama-3.1-70B** (optional)
- **Geist** font
- **Lucide React** icons

## Setup

### 1. Install dependencies

```bash
cd jm-portfolio
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API key:

```env
# Option A — OpenAI (recommended)
OPENAI_API_KEY=sk-...

# Option B — Groq (faster, free tier)
GROQ_API_KEY=gsk_...
```

> The app auto-detects which key is present. `GROQ_API_KEY` takes priority if both are set.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Screenshots

Place screenshot images in `public/projects/`:
- `public/projects/project-1.jpg`
- `public/projects/project-2.jpg`
- `public/projects/project-3.jpg`

Then update `components/ProjectCards.tsx` to reference these local paths instead of the picsum placeholders.

## Deploy to Vercel

```bash
npx vercel --prod
```

Or connect your GitHub repo to Vercel and set the environment variables in the Vercel dashboard under **Settings > Environment Variables**.

## Customization

| What to change | File |
|---|---|
| AI personality + knowledge base | `lib/prompt.ts` |
| Project cards content | `components/ProjectCards.tsx` |
| Suggestion chips | `components/SuggestionChips.tsx` |
| Avatar look/animations | `components/Avatar.tsx` |
| Colors & theme tokens | `app/globals.css` (CSS custom properties) |
| AI model | `app/api/chat/route.ts` |

## Contact Links

Update `lib/prompt.ts` with your real Calendly/Cal.com link once you have one. The AI will guide visitors to book a call or email jmdulce111@gmail.com.
