import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;

    const syncScrolledState = () => {
      const nextScrolled = window.scrollY > 50;
      setIsScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
      rafId = null;
    };

    const handleScroll = () => {
      if (rafId !== null) {
        return;
      }
      rafId = window.requestAnimationFrame(syncScrolledState);
    };

    syncScrolledState();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const navItems = [
    { label: 'HOME', href: '#hero' },
    { label: 'PROJECTS', href: '#projects_title' },
    { label: 'JOURNEY', href: '#journey_title' },
    { label: 'ABOUT', href: '#about_title' },
    { label: 'FEATURED BLOGS', href: '#featured_blogs_title' },
    { label: 'CONTACT', href: '#contact_title' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-[#050506]/90 md:bg-[#050506]/80 md:backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-[clamp(1rem,2.2vw,1.5rem)]">
        <div className="flex items-center justify-between h-[clamp(3.75rem,5.4vw,5rem)]">
          {/* Logo */}
          <a href="#hero" className="inline-flex items-center gap-2.5 leading-none">
            <img src="/logo-mark.svg" alt="PG logo" width="65" height="65" className="h-11 w-11 rounded-md" />
            <span className="mt-1 text-[9px] font-mono-display text-white/45 tracking-[0.08em]">
              SYSTEM_ONLINE // IN DEVELOPMENT
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="stagger-links hidden md:flex items-center gap-[clamp(1rem,1.9vw,2rem)] animate-fade-in-up">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-cursor-preview={`Go To ${item.label.replace(/_/g, " ")}`}
                className="nav-link-animated relative inline-block text-xs font-mono-display text-white/50 hover:text-white transition-colors tracking-wider before:absolute before:-inset-x-2 before:-inset-y-2 before:content-['']"
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/blog"
              data-cursor-preview="Go To Blog Page"
              className="button-glow-hover inline-flex items-center bg-white text-black text-xs font-bold tracking-wider px-4 py-2 rounded-l-sm rounded-r-full border-2 border-white hover:bg-white/90 transition-colors"
            >
              GO TO BLOG PAGE
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white/50 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden border-t border-white/10 bg-[#050506]/95 backdrop-blur-xl transition-all duration-300 ease-out ${isMobileMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
            }`}
        >
          <div
            className={`flex flex-col items-center gap-4 text-center transition-all duration-300 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-2'
              }`}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-cursor-preview={`Go To ${item.label.replace(/_/g, " ")}`}
                className="relative inline-block py-2 text-sm font-mono-display text-white/50 transition-colors hover:text-white before:absolute before:-inset-x-2 before:-inset-y-2 before:content-['']"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/blog"
              data-cursor-preview="Go To Blog Page"
              className="inline-flex items-center justify-center bg-white text-black text-xs font-bold tracking-wider px-4 py-3 rounded-full border-2 border-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              GO TO BLOG PAGE
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
