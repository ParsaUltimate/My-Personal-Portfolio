<div align="center">

# Parsa Ghaei Portfolio

### A modern, cinematic portfolio for a game developer journey

[![React](https://img.shields.io/badge/React-19-20232A?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-parsaghaei.dev-111111?logo=cloudflarepages&logoColor=F38020)](https://parsaghaei.dev)

</div>

---

## Preview

**Live Website:** [https://parsaghaei.dev](https://parsaghaei.dev)

[![Portfolio Live Preview](https://parsaghaei.dev/og-image.png)](https://parsaghaei.dev)

## Why this project looks different

- Sharp brutalist-inspired typography and layout
- Smooth scroll experience powered by `lenis`
- Custom cursor preview interactions
- Scroll progress line for long-page feedback
- Journey-focused content blocks (Projects, Learning Path, Blog, Contact)
- Mobile-first responsive behavior

## Tech Stack

| Layer | Tools |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS, custom animation system |
| UI Primitives | Radix UI, shadcn-style components |
| Data / Async | TanStack Query, Supabase SDK |
| Routing | React Router |

## Quick Start

```bash
git clone <your-repo-url>
cd my-portfolio
npm install
npm run dev
```

Runs on `http://localhost:8080`.

## Scripts

```bash
npm run dev        # start development server
npm run typecheck  # TypeScript validation
npm run lint       # ESLint
npm run build      # production build
npm run preview    # preview production output
```

## Environment Setup

```bash
cp .env.example .env
```

Required variables:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_API_URL=
VITE_PROJECT_ID=
VITE_MEDIUM_USERNAME=
VITE_MEDIUM_FEATURED_POST_1=
VITE_MEDIUM_FEATURED_POST_2=
VITE_MEDIUM_FEATURED_POST_3=
```

## Project Structure

```text
src/
  components/
    portfolio/      # Core sections: Hero, Projects, Journey, About, Contact
    ui/             # Reusable UI building blocks
  pages/            # Route pages
  lib/              # Helpers (scroll, utils)
  hooks/            # Reusable hooks
  data/             # Static or structured content
public/             # Static files
docs/               # Project documentation
```

## Customize Your Version

- Update identity/content in `src/components/portfolio/Hero.tsx`
- Edit about text in `src/components/portfolio/About.tsx`
- Update social/email in `src/components/portfolio/Contact.tsx`
- Replace project cards in `src/components/portfolio/Projects.tsx`
- Edit learning goals in `src/components/portfolio/LearningJourney.tsx`
- Tune visual style and animations in `src/index.css`

## Deploy

Works well on:

- Vercel
- Netlify
- Cloudflare Pages

Production settings:

- Build command: `npm run build`
- Output folder: `dist`
- Production URL: `https://parsaghaei.dev`

## Connect

- GitHub: `https://github.com/ParsaUltimate`
- Email: `contact@parsaghaei.dev`

---

If this repo helped you, give it a star and build your own version.

