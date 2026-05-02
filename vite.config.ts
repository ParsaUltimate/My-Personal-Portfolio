import { defineConfig, loadEnv } from "vite";
import path from "path";
import { componentTagger } from "@0xminds/component-tagger";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isPromptsVariant = env.VITE_SITE_VARIANT === "prompts";

  const seo = isPromptsVariant
    ? {
        title: "AI Prompt Library | Parsa Ghaei",
        description:
          "A curated AI Prompt Library by Parsa Ghaei with structured prompts for writing, research, visual design, and coding workflows.",
        keywords:
          "AI prompts, Prompt library, ChatGPT prompts, Claude prompts, Gemini prompts, Parsa Ghaei",
        ogTitle: "AI Prompt Library | Parsa Ghaei",
        ogDescription:
          "Structured prompts for writing, research, visual design, and coding workflows.",
        ogImage: "/og-prompts.svg",
        canonicalUrl: "https://prompts.parsaghaei.dev/",
      }
    : {
        title: "Parsa Ghaei | Game Developer & Designer",
        description:
          "Parsa Ghaei - aspiring Game Developer and Game Designer studying Unity and C#. Building gameplay mechanics and documenting the journey into game development.",
        keywords:
          "Game Developer, Game Designer, Unity, C#, Game Development, Portfolio, Parsa Ghaei",
        ogTitle: "Parsa Ghaei | Game Developer & Designer",
        ogDescription:
          "Aspiring Game Developer and Game Designer studying Unity and C#. Building gameplay mechanics and documenting the journey.",
        ogImage: "/hero-bg.png",
        canonicalUrl: "https://parsaghaei.dev/",
      };

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
    {
      name: "inject-static-seo",
      transformIndexHtml(html: string) {
        return html
          .replace(/__SITE_TITLE__/g, seo.title)
          .replace(/__SITE_DESCRIPTION__/g, seo.description)
          .replace(/__SITE_KEYWORDS__/g, seo.keywords)
          .replace(/__SITE_OG_TITLE__/g, seo.ogTitle)
          .replace(/__SITE_OG_DESCRIPTION__/g, seo.ogDescription)
          .replace(/__SITE_OG_IMAGE__/g, seo.ogImage)
          .replace(/__SITE_CANONICAL_URL__/g, seo.canonicalUrl);
      },
    },
    componentTagger({
      enabled: mode === "development", // Only in development mode
      debug: true, // Enable debug logging to see what's being tagged
      exclude: [
        "node_modules/**",
        "dist/**",
        "build/**",
        "**/ui/**", // Exclude shadcn/ui components
      ],
    })
    ],
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': [
              '@radix-ui/react-dialog',
              '@radix-ui/react-toast',
              '@radix-ui/react-tooltip',
              '@radix-ui/react-accordion',
              '@radix-ui/react-avatar',
              '@radix-ui/react-checkbox',
              '@radix-ui/react-dropdown-menu',
              '@radix-ui/react-popover',
              '@radix-ui/react-select',
              '@radix-ui/react-tabs',
            ],
            'query-vendor': ['@tanstack/react-query'],
            'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
            'animation-vendor': ['lenis'],
          },
        },
      },
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: true,
          pure_funcs: mode === 'production' ? ['console.log', 'console.info'] : [],
        },
      },
      chunkSizeWarningLimit: 600,
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
