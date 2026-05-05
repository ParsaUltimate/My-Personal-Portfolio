import { useEffect, useState } from 'react';
import { Github, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scrollToHashTarget } from '@/lib/scroll';

export const Hero = () => {
  const [text, setText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    const fullName = 'Parsa Ghaei';
    let index = 0;
    let intervalId: number | null = null;

    setText('');
    setIsTypingDone(false);

    const startDelay = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        if (document.hidden) {
          return;
        }

        if (index <= fullName.length) {
          setText(fullName.slice(0, index));
          index++;
        } else {
          setIsTypingDone(true);
          if (intervalId !== null) {
            window.clearInterval(intervalId);
          }
        }
      }, 95);
    }, 850);

    return () => {
      window.clearTimeout(startDelay);
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <section className="hero-cinematic relative min-h-[100svh] flex items-center bg-[#050506] overflow-hidden">
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />
      <div className="pointer-events-none absolute -top-14 left-[12%] h-44 w-44 rounded-full bg-white/10 blur-3xl animate-parallax hidden md:block" />
      <div className="pointer-events-none absolute bottom-20 right-[10%] h-40 w-40 rounded-full bg-white/5 blur-3xl animate-parallax animation-delay-2000 hidden md:block" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 max-[430px]:px-4 pt-20 max-[430px]:pt-16 pb-8 md:pt-24 md:pb-10">
        {/* Mobile/Tablet Image - Above Name */}
        <div className="lg:hidden w-full max-w-[17rem] sm:max-w-[22rem] mx-auto mb-4 sm:mb-6">
          <img
            src="/Untitled-1@2x.webp"
            alt="Parsa portrait"
            width="704"
            height="880"
            className="w-full h-auto object-contain opacity-90"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-end">
          <div className="min-h-0 md:min-h-[62svh] lg:min-h-[70svh] flex flex-col justify-end space-y-3 max-[430px]:space-y-2 sm:space-y-4 md:space-y-5">

          {/* Name with Brutalist Style */}
          <div className="space-y-1 sm:space-y-2">
            <h1 className="title-glow-loop animate-text-reveal text-[clamp(2rem,11vw,4.3rem)] max-[430px]:text-[clamp(1.72rem,10.6vw,2.25rem)] md:text-[clamp(2.52rem,9vw,6.48rem)] lg:text-[clamp(3.96rem,7.02vw,7.38rem)] font-black leading-[0.88] max-[430px]:leading-[0.94] md:leading-[0.84] tracking-tighter text-white brutalist-text lg:whitespace-nowrap">
              {text}
              {!isTypingDone && <span className="animate-pulse">|</span>}
            </h1>
            <div className="h-px w-full bg-white/10" />
          </div>

          {/* Subtitle */}
          <div className="space-y-2 sm:space-y-3">
            <div className="space-y-1.5 md:space-y-2">
              <p className="text-sm md:text-base text-white/45 font-mono-display tracking-wide">
                Eager to become a
              </p>
              <h2 className="text-[clamp(1.35rem,6.3vw,2.2rem)] max-[430px]:text-[clamp(1.16rem,5.4vw,1.52rem)] md:text-5xl font-bold text-white/90 leading-tight">
                Game Developer
                <span className="text-white/40 mx-3">/</span>
                Designer
              </h2>
            </div>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg max-[430px]:text-[12px] text-white/50 max-w-2xl leading-relaxed max-[430px]:leading-5 sm:leading-6 md:leading-7 text-left md:text-justify line-clamp-4 sm:line-clamp-none">
              Hi, I'm Parsa — a 16-year-old game developer studying computer science in
              technical high school, currently learning Unity and C#. I enjoy building
              gameplay mechanics, experimenting with new ideas, documenting my journey
              in game development, and learning about the video game industry.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 max-[430px]:gap-2 sm:gap-3">
            <Button
              size="lg"
              data-cursor-preview="View Projects"
              className="button-glow-hover w-full sm:w-auto justify-center bg-white text-black hover:bg-white/90 font-bold px-6 max-[430px]:px-4 py-4 max-[430px]:py-3.5 md:px-8 md:py-6 text-base max-[430px]:text-sm md:text-lg rounded-sm border-2 border-white transition-all hover:scale-105"
              onClick={() => scrollToHashTarget('#projects_title')}
            >
              View Projects
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              data-cursor-preview="Go To Contact"
              className="button-glow-hover w-full sm:w-auto justify-center border-2 border-white/20 text-white hover:bg-white/5 font-bold px-6 max-[430px]:px-4 py-4 max-[430px]:py-3.5 md:px-8 md:py-6 text-base max-[430px]:text-sm md:text-lg rounded-sm transition-all"
              onClick={() => scrollToHashTarget('#contact_title')}
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact
            </Button>
          </div>

          {/* Social */}
          <a
            href="https://github.com/ParsaUltimate"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-preview="Open GitHub"
            className="inline-flex items-center gap-3 text-sm text-white/40 hover:text-white transition-colors font-mono-display"
          >
            <Github className="w-4 h-4" />
            @ParsaUltimate
          </a>
          </div>
          
          {/* Desktop Image */}
          <div className="relative hidden lg:flex min-h-[70svh] items-end justify-end">
            <div className="relative h-[70svh] min-h-[34rem] w-full max-w-[42rem]">
              
              
              <div className="absolute bottom-[-12%] right-[2%] z-20 flex h-[114%] w-[94%] items-end justify-end">
                <img
                  src="/Untitled-1@2x.webp"
                  alt="Parsa portrait"
                  width="704"
                  height="880"
                  className="hero-portrait-image h-full w-full object-contain object-bottom"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-float-soft hidden sm:block">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono-display text-white/30 tracking-widest">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>
    </section>
  );
};
