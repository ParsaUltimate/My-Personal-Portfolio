import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useLayoutEffect, lazy, Suspense } from "react";
import Lenis from "lenis";
import { scrollToHashTarget } from "./lib/scroll";

import Index from "./pages/Index";

// Lazy load non-critical pages
const BlogPage = lazy(() => import("./pages/BlogPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => {

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isTouchDevice) {
      delete window.__lenis;
      return;
    }

    const lenis = new Lenis({
      duration: 0.95,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1,
      syncTouch: false,
      lerp: 0.13,
    });
    window.__lenis = lenis;

    let rafId: number | null = null;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    const startRaf = () => {
      if (rafId !== null) {
        return;
      }
      rafId = window.requestAnimationFrame(raf);
    };

    const stopRaf = () => {
      if (rafId === null) {
        return;
      }
      window.cancelAnimationFrame(rafId);
      rafId = null;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopRaf();
      } else {
        startRaf();
      }
    };

    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopRaf();
      delete window.__lenis;
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const syncTabStateClass = () => {
      root.classList.toggle("tab-inactive", document.hidden);
    };

    syncTabStateClass();
    document.addEventListener("visibilitychange", syncTabStateClass);

    return () => {
      document.removeEventListener("visibilitychange", syncTabStateClass);
      root.classList.remove("tab-inactive");
    };
  }, []);

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      const anchor = target.closest("a[href^='#']");
      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href || href === "#") {
        return;
      }

      const sectionId = href.slice(1);
      const section = document.getElementById(sectionId);
      if (!section) {
        return;
      }

      event.preventDefault();
      scrollToHashTarget(href);
      window.history.replaceState(null, "", href);
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const targetSelector = ".section-enter, .section-enter-soft";
    const shouldDisableRevealAnimation = prefersReducedMotion || isTouchDevice;

    const prepareElement = (element: HTMLElement) => {
      if (shouldDisableRevealAnimation) {
        element.style.transitionDelay = "0ms";
        element.classList.add("is-visible");
        return;
      }

      if (element.style.animationDelay) {
        const parsedDelay = Number.parseInt(element.style.animationDelay, 10);
        const safeDelay = Number.isNaN(parsedDelay) ? 0 : Math.min(parsedDelay, 140);
        element.style.transitionDelay =
          safeDelay > 0 ? `${safeDelay}ms` : element.style.animationDelay;
      }
    };

    const setVisibleState = (element: HTMLElement, isVisible: boolean) => {
      if (isVisible) {
        element.classList.remove("reveal-pending");
        element.classList.add("is-visible");
      } else {
        // Allow re-triggering: remove is-visible when out of view
        element.classList.remove("is-visible");
        element.classList.add("reveal-pending");
      }
    };

    const revealIfInViewport = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // Use a wider "preload" band so elements are visible before the user reaches them.
      const isInPreloadBand = rect.top < viewportHeight * 1.2 && rect.bottom > viewportHeight * -0.2;
      setVisibleState(element, isInPreloadBand);
      return isInPreloadBand;
    };

    const observer = shouldDisableRevealAnimation
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!(entry.target instanceof HTMLElement)) {
                return;
              }
              setVisibleState(entry.target, entry.isIntersecting);
            });
          },
          {
            threshold: 0.001,
            rootMargin: "100px 0px 100px 0px",
          }
        );

    const registerElement = (element: HTMLElement) => {
      if (element.dataset.revealRegistered === "true") {
        return;
      }
      element.dataset.revealRegistered = "true";
      prepareElement(element);
      if (shouldDisableRevealAnimation) {
        setVisibleState(element, true);
        return;
      }
      revealIfInViewport(element);
      observer?.observe(element);
    };

    const observedElements = Array.from(document.querySelectorAll<HTMLElement>(targetSelector));
    observedElements.forEach(registerElement);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) {
            return;
          }

          if (node.matches(targetSelector)) {
            registerElement(node);
          }

          const nestedTargets = Array.from(node.querySelectorAll<HTMLElement>(targetSelector));
          nestedTargets.forEach(registerElement);
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const revealVisibleNow = () => {
      document.querySelectorAll<HTMLElement>(targetSelector).forEach((element) => {
        revealIfInViewport(element);
      });
    };

    // Run immediately; relying only on "load" can miss already-fired page load events.
    revealVisibleNow();
    const rafId = window.requestAnimationFrame(revealVisibleNow);
    const settleTimer = window.setTimeout(revealVisibleNow, 180);

    window.addEventListener("load", revealVisibleNow);
    window.addEventListener("resize", revealVisibleNow);

    return () => {
      if (observer) {
        observer.disconnect();
      }
      mutationObserver.disconnect();
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(settleTimer);
      window.removeEventListener("load", revealVisibleNow);
      window.removeEventListener("resize", revealVisibleNow);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen bg-gray-950" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<BlogPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
