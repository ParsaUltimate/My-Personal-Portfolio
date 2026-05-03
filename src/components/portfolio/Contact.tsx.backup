import { Mail, Github, Gamepad2, Linkedin, Palette, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Contact = () => {
  const contacts = [
    { icon: Mail, label: 'Email', handle: 'Get In Touch', href: 'mailto:contact@parsaghaei.dev' },
    { icon: Github, label: 'GitHub', handle: 'Open Profile', href: 'https://github.com/Dark-px' },
    { icon: Gamepad2, label: 'Itch.io', handle: 'Play Games', href: 'https://parsaghaei.itch.io' },
    { icon: Linkedin, label: 'LinkedIn', handle: 'Connect', href: 'https://www.linkedin.com/in/parsaghaei' },
    { icon: Palette, label: 'ArtStation', handle: 'View Portfolio', href: 'https://www.artstation.com' },
    { icon: Send, label: 'Telegram', handle: 'Send Message', href: 'https://t.me' },
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

        {/* Contact Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-px sm:bg-white/10 sm:border sm:border-white/10 mb-8 sm:mb-12 md:mb-16">
          {contacts.map((contact, index) => {
            const opensInNewTab = contact.href.startsWith('http');

            return (
              <a
                key={index}
                href={contact.href}
                target={opensInNewTab ? "_blank" : undefined}
                rel={opensInNewTab ? "noopener noreferrer" : undefined}
                data-cursor-preview={`Open ${contact.label}`}
                className="modern-card sheen-hover group bg-[#050506] border border-white/10 sm:border-0 p-6 sm:p-8 hover:bg-white/[0.02] transition-all duration-500 hover:scale-[1.02]"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="w-14 h-14 border border-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <contact.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{contact.label}</h3>
                <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
                  {contact.handle}
                </p>
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="border border-white/10 p-8 sm:p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 border border-white/20 flex items-center justify-center mx-auto mb-8">
              <Send className="w-8 h-8 text-white" />
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">
              Let's Create
              <br />
              <span className="text-white/30">Together</span>
            </h3>

            <p className="text-base sm:text-lg text-white/50 leading-relaxed mb-6 sm:mb-8 md:mb-10">
              Whether you want to collaborate on a game, discuss development, or just chat about
              the industry — I'm always excited to connect.
            </p>

            <Button
              size="default"
              data-cursor-preview="Send Email"
              className="button-glow-hover bg-white text-black hover:bg-white/90 font-bold px-8 sm:px-12 py-4 sm:py-6 md:py-8 text-base sm:text-lg md:text-xl rounded-sm border-2 border-white transition-all hover:scale-105"
              onClick={() => (window.location.href = 'mailto:contact@parsaghaei.dev')}
            >
              Send Message
              <Send className="w-6 h-6 ml-3" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
