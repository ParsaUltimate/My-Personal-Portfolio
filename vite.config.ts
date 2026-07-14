import { defineConfig, loadEnv } from "vite";
import path from "path";
import { componentTagger } from "@0xminds/component-tagger";
 import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const seo = {
    title: "Parsa Ghaei | Eager to Become a Game Developer & Designer",
    description:
      "Hi, I'm Parsa — a 17-year-old game developer studying computer science in technical high school, currently learning Unity and C#.",
    keywords:
      "Game Developer, Game Designer, Unity, C#, Game Development, Portfolio, Parsa Ghaei",
    ogTitle: "Parsa Ghaei | Eager to Become a Game Developer & Designer",
    ogDescription:
      "Hi, I'm Parsa — a 17-year-old game developer studying computer science in technical high school, currently learning Unity and C#.",
    ogImage: "/og-portfolio.png",
    canonicalUrl: "https://parsaghaei.dev/",
    h1: "Parsa Ghaei | Eager to Become a Game Developer & Designer",
    schema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Parsa Ghaei",
      "url": "https://parsaghaei.dev/",
      "image": "https://parsaghaei.dev/og-portfolio.png",
      "jobTitle": "Game Developer & Designer",
      "sameAs": [
        "https://github.com/ParsaUltimate",
        "https://parsaghaei.itch.io",
        "https://www.linkedin.com/in/parsaghaei",
        "https://x.com/ParsaUltimate"
      ]
    }, null, 2)
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
          .replace(/__SITE_CANONICAL_URL__/g, seo.canonicalUrl)
          .replace(/__SITE_SCHEMA__/g, seo.schema)
          .replace(/__SITE_H1__/g, seo.h1);
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
