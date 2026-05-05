import { Mail, Github, Gamepad2, Linkedin, Palette, ExternalLink } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';

export const Contact = () => {
  const contacts = [
    { icon: Mail, label: 'Email', handle: 'Get In Touch', href: 'mailto:contact@parsaghaei.dev' },
    { icon: Github, label: 'GitHub', handle: 'Open Profile', href: 'https://github.com/ParsaUltimate' },
    { icon: Gamepad2, label: 'Itch.io', handle: 'Play Games', href: 'https://parsaghaei.itch.io' },
    { icon: Linkedin, label: 'LinkedIn', handle: 'Connect', href: 'https://www.linkedin.com/in/parsaghaei' },
    { icon: Palette, label: 'ArtStation', handle: 'View Portfolio', href: 'https://www.artstation.com' },
    { icon: FaXTwitter, label: 'X', handle: 'Follow', href: 'https://x.com/ParsaUltimate' },
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-[4.4rem] bg-[#050506]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 sm:mb-12 md:mb-16 pb-6 sm:pb-8 border-b border-white/10">
          <span id="contact_title" className="text-xs font-mono-display text-white/40 mb-4 block">004 // CONTACT</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white brutalist-text">
            Get In
            <br />
            <span className="text-white/30">Touch</span>
          </h2>
        </div>

        {/* Minimal Contact Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8 sm:mb-12 md:mb-16">
          {contacts.map((contact, index) => {
            const opensInNewTab = contact.href.startsWith('http');

            return (
              <a
                key={index}
                href={contact.href}
                target={opensInNewTab ? "_blank" : undefined}
                rel={opensInNewTab ? "noopener noreferrer" : undefined}
                data-cursor-preview={`Open ${contact.label}`}
                className="group relative aspect-square border border-white/10 md:hover:border-white/30 transition-all duration-300 overflow-hidden"
              >
                {/* Hover background */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
                
                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-4 sm:p-6">
                  <contact.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white/60 md:group-hover:text-white md:group-hover:scale-110 transition-all duration-300" />
                  <span className="mt-3 sm:mt-4 text-xs sm:text-sm font-mono-display text-white/40 group-hover:text-white/80 transition-colors duration-300 text-center">
                    {contact.label}
                  </span>
                  
                  {/* External Link Icon - Always visible on mobile, hover on desktop */}
                  {opensInNewTab && (
                    <ExternalLink className="absolute top-2 right-2 w-3 h-3 sm:w-4 sm:h-4 text-white/30 md:opacity-0 md:group-hover:opacity-100 md:group-hover:text-white transition-all duration-300" />
                  )}
                </div>
                
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/0 group-hover:border-white/60 transition-all duration-300" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/0 group-hover:border-white/60 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/0 group-hover:border-white/60 transition-all duration-300" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/0 group-hover:border-white/60 transition-all duration-300" />
              </a>
            );
          })}
        </div>

        {/* Simple CTA */}
        <div className="text-center border-t border-white/10 pt-8 sm:pt-12">
          <p className="text-sm sm:text-base text-white/85 leading-relaxed mb-6 max-w-2xl mx-auto">
            Whether you want to collaborate on a game, discuss development, or just chat about
            the industry — I'm always excited to connect.
          </p>
          <a 
            href="mailto:contact@parsaghaei.dev"
            className="inline-block text-xl sm:text-2xl md:text-3xl font-black hover:opacity-80 transition-opacity"
          >
            <span className="text-white">Contact</span>
            <span className="text-white/40">@parsaghaei.dev</span>
          </a>
        </div>
      </div>
    </section>
  );
};
