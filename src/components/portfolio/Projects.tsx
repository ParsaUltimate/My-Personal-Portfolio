import { ExternalLink, Github, Play } from 'lucide-react';

export const Projects = () => {
  const projects = [
    {
      number: '01',
      title: 'FIRST GAME PROJECT',
      subtitle: '🚧 Currently in Development',
      description:
        'Currently in development. Follow my journey as I build my first playable prototype.',
      technologies: 'UNITY / C#',
      status: 'IN_DEVELOPMENT',
      media: '/coming-soon.png',
      actionLabel: 'Play',
      actionHref: 'https://parsaghaei.itch.io',
    },
    {
      number: '02',
      title: 'MECHANICS LAB',
      subtitle: 'Gameplay Experiments',
      description:
        'A sandbox for testing interaction ideas, movement feel, and core gameplay loops.',
      technologies: 'UNITY / C# / PROTOTYPING',
      status: 'PLANNING',
      media: '/coming-soon.png',
      actionLabel: 'GitHub',
      actionHref: 'https://github.com/ParsaUltimate',
    },
    {
      number: '03',
      title: 'NEXT PROJECT',
      subtitle: 'Concept Stage',
      description:
        'Preparing the next game concept while improving systems-driven design skills.',
      technologies: 'UNITY / C#',
      status: 'CONCEPT',
      media: '/coming-soon.png',
      actionLabel: 'GitHub',
      actionHref: 'https://github.com/ParsaUltimate',
    },
  ];

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-[4.4rem] bg-[#050506]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-0 mb-8 sm:mb-12 md:mb-16 pb-6 sm:pb-8 border-b border-white/10">
          <div>
            <span id="projects_title" className="text-xs font-mono-display text-white/40 mb-4 block">001 // PROJECTS</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white brutalist-text">
              Selected
              <br />
              <span className="text-white/30">Work</span>
            </h2>
          </div>
          <p className="text-sm sm:text-right text-white/50 max-w-xs sm:max-w-[14rem] md:max-w-xs">
            Games, experiments, and creative endeavors. Each project teaches something new.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-px sm:bg-white/10 sm:border sm:border-white/10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="modern-card sheen-hover group bg-[#050506] border border-white/10 sm:border-0 p-6 sm:p-8 hover:bg-white/[0.02] transition-all duration-500 hover:scale-[1.02]"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="mb-6 overflow-hidden border border-white/10 bg-black/30">
                <img
                  src={project.media}
                  alt={project.title}
                  width="400"
                  height="160"
                  className="card-media-zoom h-40 w-full object-cover object-center opacity-90"
                  loading="lazy"
                />
              </div>

              {/* Number */}
              <span className="text-xs font-mono-display text-white/30 mb-6 block">
                {project.number}
              </span>

              {/* Status */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                <span className="text-[10px] font-mono-display text-white/40 tracking-wider">
                  {project.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-black text-white mb-2 group-hover:text-white/80 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-white/40 mb-6">{project.subtitle}</p>

              {/* Description */}
              <p className="text-sm text-white/60 leading-relaxed mb-8">
                {project.description}
              </p>

              {/* Tech Stack */}
              <p className="text-[10px] font-mono-display text-white/30 mb-8">
                {project.technologies}
              </p>

              <a
                href={project.actionHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mb-6 text-xs font-bold text-white/70 hover:text-white transition-colors"
              >
                {project.actionLabel === 'GitHub' ? <Github className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {project.actionLabel}
              </a>

              {/* Bottom */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-white/30">View Details</span>
                <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-4 border border-white/10 rounded-sm animate-breathe">
            <span className="text-sm text-white/40">Follow the journey → </span>
            <a
              href="/blog#Devlog"
              data-cursor-preview="Open Devlog"
              className="text-sm font-bold text-white hover:text-white/70 transition-colors"
            >
              Read Development Blog
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
