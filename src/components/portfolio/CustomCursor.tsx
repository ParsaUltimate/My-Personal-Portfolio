import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * CustomCursor component renders a highly custom, performant cursor with interactive hover scaling
 * and dynamic link preview tooltips. It utilizes GPU acceleration via translate3d and requestAnimationFrame.
 */
export const CustomCursor = () => {
  // Cursor coordinate state (X and Y coordinates on viewport)
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // Hover state (true when hovering over interactive elements)
  const [isHovering, setIsHovering] = useState(false);
  // Visibility state (false if cursor leaves the window or tab is inactive)
  const [isVisible, setIsVisible] = useState(false);
  // Text content to display inside the preview tooltip
  const [previewText, setPreviewText] = useState<string | null>(null);
  // Visibility state of the preview tooltip (enables fade/slide transition)
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  // Reference to track the timeout for hiding the preview tooltip
  const previewHideTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if the device has a pointing device capable of hovering (e.g. mouse/trackpad)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) {
      return; // Do not initialize custom cursor on touch devices (mobile, tablet)
    }

    let latestX = 0;
    let latestY = 0;
    let moveRafId: number | null = null;

    // Clears the scheduled hide timeout for the preview tooltip
    const clearPreviewHideTimeout = () => {
      if (previewHideTimeoutRef.current !== null) {
        window.clearTimeout(previewHideTimeoutRef.current);
        previewHideTimeoutRef.current = null;
      }
    };

    // Smoothly hides the preview tooltip with a delay to match transition durations
    const hidePreview = () => {
      setIsPreviewVisible(false);
      clearPreviewHideTimeout();
      previewHideTimeoutRef.current = window.setTimeout(() => {
        setPreviewText(null);
      }, 140);
    };

    // Updates state with the latest coordinates and triggers visibility
    const flushCursorPosition = () => {
      setPosition({ x: latestX, y: latestY });
      setIsVisible(true);
      moveRafId = null;
    };

    // Tracks mouse movements and throttles updates using requestAnimationFrame (60hz/120hz alignment)
    const moveCursor = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      if (moveRafId !== null) {
        return;
      }
      moveRafId = window.requestAnimationFrame(flushCursorPosition);
    };

    // Handles hover states and extracts preview texts dynamically
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof HTMLElement) && !(target instanceof SVGElement)) {
        setIsHovering(false);
        hidePreview();
        return;
      }

      // Traverses up the DOM tree to find the closest link or element with data-cursor-preview
      let linkTarget: Element | null = null;
      if (target instanceof HTMLElement) {
        linkTarget = target.closest('a, [data-cursor-preview]');
      } else if (target instanceof SVGElement) {
        let parent: Element | null = target;
        while (parent && !(parent instanceof HTMLAnchorElement) && !parent.hasAttribute('data-cursor-preview')) {
          parent = parent.parentElement;
        }
        linkTarget = parent;
      }

      // If a preview target is found, set and display the preview tooltip
      if (linkTarget instanceof HTMLAnchorElement) {
        const nextPreviewText =
          linkTarget.getAttribute('data-cursor-preview') ||
          linkTarget.textContent?.trim() ||
          'Open Link';
        clearPreviewHideTimeout();
        setPreviewText(nextPreviewText.slice(0, 56)); // Limit text to 56 characters
        setIsPreviewVisible(true);
      } else {
        hidePreview();
      }

      // Detect if the target is interactive to trigger the scaling effect
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

    // Hides the cursor when the mouse leaves the browser viewport
    const hideCursor = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        setIsVisible(false);
        setIsHovering(false);
        clearPreviewHideTimeout();
        setPreviewText(null);
        setIsPreviewVisible(false);
      }
    };

    // Hides the cursor if the user switches browser tabs (tab becomes inactive)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
      }
    };

    // Attach all window/document mouse and visibility listeners
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', hideCursor);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clean up all event listeners and cancel scheduled requestAnimationFrames/timeouts on unmount
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
    // Synchronize HTML/Body class to hide the native system cursor when custom cursor is active
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    const syncCursorClass = (matches: boolean) => {
      document.body.classList.toggle('custom-cursor-active', matches);
      document.documentElement.classList.toggle('custom-cursor-active', matches);
    };

    syncCursorClass(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      syncCursorClass(event.matches);
    };

    // Keep active class state in sync when media queries change
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    // Remove classes and listeners on cleanup
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

  // Calculate position and boundaries for the preview tooltip to keep it inside the viewport
  const previewPosition = (() => {
    if (!previewText || typeof window === 'undefined') {
      return null;
    }

    const margin = 12; // Safety margin from screen boundaries
    const compactMode = window.innerWidth < 1024;
    const fontSize = compactMode ? 10 : 11;
    const horizontalPadding = compactMode ? 8 : 10;
    const verticalPadding = compactMode ? 6 : 7;
    // Estimate width based on character length
    const estimatedWidth = Math.min(
      compactMode ? 210 : 230,
      Math.max(120, previewText.length * (fontSize * 0.58) + horizontalPadding * 2)
    );
    const estimatedHeight = fontSize + verticalPadding * 2 + 8;

    let left = position.x + 24;
    let top = position.y + 20;

    // Boundary detection: Right-edge collision
    if (left + estimatedWidth > window.innerWidth - margin) {
      left = position.x - estimatedWidth - 24;
    }
    // Boundary detection: Left-edge collision
    if (left < margin) {
      left = margin;
    }

    // Boundary detection: Bottom-edge collision
    if (top + estimatedHeight > window.innerHeight - margin) {
      top = position.y - estimatedHeight - 20;
    }
    // Boundary detection: Top-edge collision
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

  // Do not render anything during Server-Side Rendering (SSR) or when the cursor is invisible
  if (typeof document === 'undefined' || !isVisible) {
    return null;
  }

  // Render the custom cursor elements using a Portal attached to the document body
  return createPortal(
    <>
      {/* Outer interactive ring (scales and changes opacity) */}
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
          //the transition duration and make it smooth
          transition: 'transform 0.01s ease-out, background-color 0.12s ease-out',
          transform: `translate3d(${position.x - 17}px, ${position.y - 17}px, 0) scale(${isHovering ? 1.5 : 1
            })`,
          backgroundColor: isHovering ? 'rgba(255,255,255,0.1)' : 'transparent',
          willChange: 'transform, background-color',
        }}
      >
        {/* Inner dot */}
        <div
          style={{
            width: '4px',
            height: '4px',
            backgroundColor: 'rgb(255, 255, 255)',
          }}
        />
      </div>
      {/* Link preview tooltip */}
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
