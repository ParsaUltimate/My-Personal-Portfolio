import { Globe, Github, Heart, Mail, Gamepad2, Linkedin, Palette, Send, ExternalLink } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';

export const Footer = () => {
  const { pathname } = useLocation();
  const currentYear = new Date().getFullYear();
  const onHomePage = pathname === '/';
  const getSectionHref = (id: string) => (onHomePage ? `#${id}` : `/#${id}`);

  const socialLinks = [
    { icon: Mail, href: 'mailto:contact@parsaghaei.dev', label: 'Email' },
    { icon: Github, href: 'https://github.com/ParsaUltimate', label: 'GitHub' },
    { icon: Gamepad2, href: 'https://parsaghaei.itch.io', label: 'Itch.io' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/parsaghaei', label: 'LinkedIn' },
    { icon: Palette, href: 'https://www.artstation.com', label: 'ArtStation' },
    { icon: FaXTwitter, href: 'https://x.com/ParsaUltimate', label: 'X' },
    { icon: Send, href: 'https://t.me/Parsa_Ultimate', label: 'Telegram' },
  ];

  return (
    <footer className="py-8 sm:py-10 md:py-12 border-t border-white/10 bg-[#050506]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-6 mb-6 sm:mb-8">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white mb-3 sm:mb-4">PARSA GHAEI</h3>
            <p className="text-white/40 text-xs sm:text-sm leading-relaxed">
              Aspiring Game Developer & Designer, documenting the journey.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={getSectionHref('hero')}
                  data-cursor-preview="Go To Home"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href={getSectionHref('projects_title')}
                  data-cursor-preview="Go To Projects"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href={getSectionHref('journey_title')}
                  data-cursor-preview="Go To Journey"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  Journey
                </a>
              </li>
              <li>
                <a
                  href={getSectionHref('about_title')}
                  data-cursor-preview="Go To About"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href={getSectionHref('contact_title')}
                  data-cursor-preview="Go To Contact"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href={getSectionHref('featured_blogs_title')}
                  data-cursor-preview="Go To Featured Blogs"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  Featured Blogs
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  data-cursor-preview="Go To Blog Page"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  Blog Page
                </a>
              </li>
              <li className="pt-2 mt-2 border-t border-white/10">
                <a
                  href="/downloads"
                  data-cursor-preview="Go To Downloads"
                  className="flex items-center gap-1.5 text-white/40 hover:text-white transition-colors"
                >
                  Downloads Page
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Side Projects</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://prompts.parsaghaei.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-preview="Open AI Prompt Library"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  AI Prompt Library
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-1.5">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target={link.href.startsWith('http') ? "_blank" : undefined}
                  rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  data-cursor-preview={`Open ${link.label}`}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all flex-shrink-0"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm font-mono-display">
            © {currentYear} PARSA GHAEI // ALL_RIGHTS_RESERVED
          </p>
          <p className="text-white/30 text-sm flex items-center gap-2">
            BUILT_WITH <Heart className="w-5 h-5" /> BY PARSA
          </p>
        </div>
      </div>
    </footer>
  );
};
