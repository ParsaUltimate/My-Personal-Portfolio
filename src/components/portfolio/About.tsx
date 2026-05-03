import { ExternalLink } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-[4.4rem] bg-[#050506]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 sm:mb-12 md:mb-16 pb-6 sm:pb-8 border-b border-white/10">
          <span id="about_title" className="text-xs font-mono-display text-white/40 mb-4 block">003 // ABOUT</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white brutalist-text">
            About
            <br />
            <span className="text-white/30">Me</span>
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12 md:mb-16">
          <div className="md:col-span-3 space-y-4 sm:space-y-6 flex-1">
            <div className="border border-white/10 p-6 sm:p-8 md:p-10">
              <div className="space-y-6 text-lg text-white/70 leading-relaxed">
                <p>
                  Hi, I’m Parsa — an aspiring game developer who started his journey with curiosity
                  about computers and software, and is now pursuing the world of game development and
                  game design.
                </p>
                <p>
                  As a computer student, I’m currently focused entirely on learning{' '}
                  <span className="text-white font-semibold">Unity</span> and{' '}
                  <span className="text-white font-semibold">C#</span> to turn my ideas into interactive experiences.
                </p>
                <p>
                  Alongside my solo learning, I'm actively working within team environments and collaborating on small game projects.
                </p>
                <p>
                  I'm also currently involved in the{' '}
                  <a 
                    href="https://uicvgame.ui.ac.ir/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-cursor-preview="Visit the Entertainment Industry Growth Center website"
                    className="text-white font-semibold hover:text-white/70 transition-colors inline-flex items-center gap-1"
                  >
                    Entertainment Industry Growth Center at the University of Isfahan
                    <ExternalLink className="w-4 h-4" />
                  </a>, where I work under the guidance of a{' '}
                  <a 
                    href="https://amiralishahi.ir" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-cursor-preview="Go to my mentor, Amir Alishahi's website"
                    className="text-white font-semibold hover:text-white/70 transition-colors inline-flex items-center gap-1"
                  >
                    mentor
                    <ExternalLink className="w-4 h-4" />
                  </a>{' '}
                  and gain hands‑on experience with teamwork, documentation, and structured development workflows.
                </p>
                <p>
                  My current skills revolve around prototyping gameplay mechanics and analyzing gameplay systems, story, lore, and more. I don't just want to make games — I love understanding how the gears of a game work together to create enjoyable player experiences.
                </p>
                <p>
                  I'm fascinated by dystopian narratives, <span className="text-white font-semibold">cyberpunk</span> atmospheres, and <span className="text-white font-semibold">post-apocalyptic</span> worlds where technology and humanity collide. I’m also interested in creating games that explore culture, emotions, and deeper human and psychological themes — meaningful questions about society, technology, and the human condition.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 space-y-6">
            <div className="border border-white/10 p-6 max-w-xs">
              <h3 className="text-sm font-mono-display tracking-wider text-white/40 mb-6">QUICK_FACTS</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-8 pb-4 border-b border-white/5">
                  <span className="text-white/50">Age</span>
                  <span className="text-white font-bold">16</span>
                </div>
                <div className="flex items-center gap-8 pb-4 border-b border-white/5">
                  <span className="text-white/50">Education</span>
                  <span className="text-white">Tech High</span>
                </div>
                <div className="flex items-center gap-8 pb-4 border-b border-white/5">
                  <span className="text-white/50">Focus</span>
                  <span className="text-white">Unity & C#</span>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-white/50">Dream</span>
                  <span className="text-white">Game Director</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
