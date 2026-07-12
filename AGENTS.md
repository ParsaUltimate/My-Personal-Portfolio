# Repository Guidelines

This document provides essential guidance for contributing to this React + TypeScript portfolio project.

## Project Structure & Module Organization

```
src/
  components/
    portfolio/      # Main sections: Hero, Projects, About, Contact, etc.
    ui/             # Reusable UI primitives (buttons, cards, dialogs)
    common/         # Shared utilities (ErrorBoundary, Loading, EmptyState)
  pages/            # Route-level page components
  hooks/            # Custom React hooks
  lib/              # Utility functions and helpers
  integrations/     # External service integrations (Supabase, etc.)
  index.css         # Global styles and Tailwind directives
public/             # Static assets (images, fonts, icons)
docs/               # Project documentation
scripts/            # Build and deployment scripts
```

## Build, Test, and Development Commands

- `npm run dev` — Start Vite development server on `http://localhost:8080`
- `npm run build` — Type-check and create production build in `dist/`
- `npm run typecheck` — Run TypeScript compiler without emitting files
- `npm run lint` — Run ESLint on all TypeScript/TSX files
- `npm run preview` — Preview production build locally

## Coding Style & Naming Conventions

- **Indentation**: 2 spaces (enforced by ESLint)
- **Components**: PascalCase for files and exports (`Hero.tsx`, `CustomCursor.tsx`)
- **Utilities**: camelCase for functions and variables
- **Path aliases**: Use `@/*` for imports from `src/` (e.g., `import { cn } from '@/lib/utils'`)
- **TypeScript**: Strict mode disabled; prefer explicit types where clarity matters
- **Styling**: Tailwind utility classes; use `cn()` helper for conditional classes
- **Linting**: ESLint configured with React Hooks rules; unused vars/expressions allowed

## Testing Guidelines

Currently no testing framework is configured. When adding tests:
- Place test files adjacent to source files with `.test.tsx` or `.spec.tsx` extension
- Use descriptive test names following pattern: `should [expected behavior] when [condition]`

## Commit & Pull Request Guidelines

**Commit Message Format** (based on Git history):
- `feat:` — New features or enhancements
- `fix:` — Bug fixes
- `refactor:` — Code restructuring without behavior change
- `chore:` — Maintenance tasks (dependencies, config)
- `test:` — Adding or modifying tests

Examples:
```
feat: optimize mobile responsive design for Hero and all sections
refactor: remove Tech Stack section from About page
chore: update navigation version text to IN DEVELOPMENT
```

**Pull Request Requirements**:
- Ensure `npm run typecheck` passes
- Run `npm run lint` and fix any errors
- Test responsive behavior on mobile/tablet/desktop
- Include screenshots for visual changes
- Reference related issues if applicable

## Architecture Overview

- **Routing**: React Router v7 for client-side navigation
- **State Management**: TanStack Query for server state; React hooks for local state
- **Styling**: Tailwind CSS with custom animations; Radix UI for accessible primitives
- **Smooth Scroll**: Lenis library for enhanced scroll experience
- **Backend**: Supabase for data persistence (configure via `.env`)

## Agent-Specific Instructions

- Preserve existing animation patterns when modifying components
- Maintain mobile-first responsive design approach
- Keep component files focused; extract reusable logic to `hooks/` or `lib/`
- Use existing UI components from `components/ui/` before creating new ones
- Follow the established pattern of exporting components via `index.ts` barrel files
- When adding new sections, follow the structure in `components/portfolio/`
- When modifying personal details (e.g., age, social links, bio), ensure updates are made consistently across both the visual components (such as `src/components/portfolio/Contact.tsx` or `Hero.tsx`) and the SEO metadata configurations in `vite.config.ts`.
