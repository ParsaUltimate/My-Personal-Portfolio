import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [previewText, setPreviewText] = useState<string | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const previewHideTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) {
      return;
    }

    let latestX = 0;
    let latestY = 0;
    let moveRafId: number | null = null;

    const clearPreviewHideTimeout = () => {
      if (previewHideTimeoutRef.current !== null) {
        window.clearTimeout(previewHideTimeoutRef.current);
        previewHideTimeoutRef.current = null;
      }
    };

    const hidePreview = () => {
      setIsPreviewVisible(false);
      clearPreviewHideTimeout();
      previewHideTimeoutRef.current = window.setTimeout(() => {
        setPreviewText(null);
      }, 140);
    };

    const flushCursorPosition = () => {
      setPosition({ x: latestX, y: latestY });
      setIsVisible(true);
      moveRafId = null;
    };

    const moveCursor = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      if (moveRafId !== null) {
        return;
      }
      moveRafId = window.requestAnimationFrame(flushCursorPosition);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof HTMLElement) && !(target instanceof SVGElement)) {
        setIsHovering(false);
        hidePreview();
        return;
      }

      // Find the closest link or element with data-cursor-preview
      let linkTarget: Element | null = null;
      if (target instanceof HTMLElement) {
        linkTarget = target.closest('a, [data-cursor-preview]');
      } else if (target instanceof SVGElement) {
        // For SVG elements, traverse up to find the parent link
        let parent: Element | null = target;
        while (parent && !(parent instanceof HTMLAnchorElement) && !parent.hasAttribute('data-cursor-preview')) {
          parent = parent.parentElement;
        }
        linkTarget = parent;
      }

      if (linkTarget instanceof HTMLAnchorElement) {
        const nextPreviewText =
          linkTarget.getAttribute('data-cursor-preview') ||
          linkTarget.textContent?.trim() ||
          'Open Link';
        clearPreviewHideTimeout();
        setPreviewText(nextPreviewText.slice(0, 56));
        setIsPreviewVisible(true);
      } else {
        hidePreview();
      }

      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.milled-card') ||
        target.closest('.stat-item') ||
        target.closest('[role="button"]');

      if (isInteractive) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const hideCursor = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        setIsVisible(false);
        setIsHovering(false);
        clearPreviewHideTimeout();
        setPreviewText(null);
        setIsPreviewVisible(false);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', hideCursor);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', hideCursor);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (moveRafId !== null) {
        window.cancelAnimationFrame(moveRafId);
      }
      clearPreviewHideTimeout();
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    const syncCursorClass = (matches: boolean) => {
      document.body.classList.toggle('custom-cursor-active', matches);
      document.documentElement.classList.toggle('custom-cursor-active', matches);
    };

    syncCursorClass(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      syncCursorClass(event.matches);
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      document.body.classList.remove('custom-cursor-active');
      document.documentElement.classList.remove('custom-cursor-active');
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const previewPosition = (() => {
    if (!previewText || typeof window === 'undefined') {
      return null;
    }

    const margin = 12;
    const compactMode = window.innerWidth < 1024;
    const fontSize = compactMode ? 10 : 11;
    const horizontalPadding = compactMode ? 8 : 10;
    const verticalPadding = compactMode ? 6 : 7;
    const estimatedWidth = Math.min(
      compactMode ? 210 : 230,
      Math.max(120, previewText.length * (fontSize * 0.58) + horizontalPadding * 2)
    );
    const estimatedHeight = fontSize + verticalPadding * 2 + 8;

    let left = position.x + 24;
    let top = position.y + 20;

    if (left + estimatedWidth > window.innerWidth - margin) {
      left = position.x - estimatedWidth - 24;
    }
    if (left < margin) {
      left = margin;
    }

    if (top + estimatedHeight > window.innerHeight - margin) {
      top = position.y - estimatedHeight - 20;
    }
    if (top < margin) {
      top = margin;
    }

    return {
      left,
      top,
      fontSize,
      padding: `${verticalPadding}px ${horizontalPadding}px`,
      maxWidth: `${compactMode ? 210 : 230}px`,
    };
  })();

  if (typeof document === 'undefined' || !isVisible) {
    return null;
  }

  return createPortal(
    <>
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: 0,
          top: 0,
          width: '34px',
          height: '34px',
          border: '2px solid rgb(255, 255, 255)',
          borderRadius: '9999px',
          mixBlendMode: 'difference',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.12s ease-out, background-color 0.12s ease-out',
          transform: `translate3d(${position.x - 17}px, ${position.y - 17}px, 0) scale(${
            isHovering ? 1.5 : 1
          })`,
          backgroundColor: isHovering ? 'rgba(255,255,255,0.1)' : 'transparent',
          willChange: 'transform, background-color',
        }}
      >
        <div
          style={{
            width: '4px',
            height: '4px',
            backgroundColor: 'rgb(255, 255, 255)',
          }}
        />
      </div>
      {previewText && (
        <div
          className="fixed pointer-events-none z-[10000]"
          style={{
            left: `${previewPosition?.left ?? position.x + 26}px`,
            top: `${previewPosition?.top ?? position.y + 22}px`,
            transform: `translate3d(0, ${isPreviewVisible ? '0px' : '4px'}, 0)`,
            border: '1px solid rgba(255,255,255,0.28)',
            background: 'rgba(10,10,12,0.72)',
            color: 'rgba(255,255,255,0.94)',
            borderRadius: '10px',
            padding: previewPosition?.padding ?? '7px 10px',
            fontSize: `${previewPosition?.fontSize ?? 11}px`,
            lineHeight: 1.2,
            letterSpacing: '0.02em',
            fontFamily: 'Inter, sans-serif',
            backdropFilter: 'blur(9px)',
            WebkitBackdropFilter: 'blur(9px)',
            opacity: isVisible && isPreviewVisible ? 1 : 0,
            transition: 'opacity 160ms ease, transform 160ms ease',
            boxShadow: '0 10px 28px rgba(0,0,0,0.35)',
            maxWidth: previewPosition?.maxWidth ?? '230px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            willChange: 'transform, opacity',
          }}
        >
          {previewText}
        </div>
      )}
    </>,
    document.body
  );
};
