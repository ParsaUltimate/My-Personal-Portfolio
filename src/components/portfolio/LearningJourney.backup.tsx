import { CheckCircle2, Circle, Target } from 'lucide-react';

export const LearningJourney = () => {
  const stages = [
    {
      title: 'WHAT I KNOW',
      icon: CheckCircle2,
      items: [
        'Basic Unity fundamentals',
        'Basic C# fundamentals',
        'Gameplay scripting',
        'Basic Web Development',
        'Writing GDD and ER',
        'Version Control (Git & GitHub)',
        'Basic Linux',
        'Team Communication Tools (HacknPlan, Notion, Slack, Discord, MS Teams)',
        'IT Skill',
      ],
    },
    {
      title: 'CURRENTLY LEARNING',
      icon: Circle,
      items: [
        'Continuing Unity to master core game development concepts',
        'Basic Game feel & Design',
        'Basic Pixel Art',
        'Better understanding of the game industry and personal growth paths',
      ],
    },
    {
      title: 'NEXT GOALS',
      icon: Target,
      items: [
        'Advanced learning of Unreal Engine and C++',
        'Learning basic 3D modeling, rigging, and animation with Blender',
      ],
    },
  ];

  return (
    <section id="journey" className="py-12 sm:py-16 md:py-[4.4rem] bg-[#050506]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 sm:mb-12 md:mb-16 pb-6 sm:pb-8 border-b border-white/10">
          <span id="journey_title" className="text-xs font-mono-display text-white/40 mb-4 block">002 // JOURNEY</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white brutalist-text">
            Learning
            <br />
            <span className="text-white/30">Path</span>
          </h2>
        </div>

        {/* Stages Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-px sm:bg-white/10 sm:border sm:border-white/10 mb-8 sm:mb-12 md:mb-16">
          {stages.map((stage, index) => (
            <div
              key={index}
              className="modern-card sheen-hover bg-[#050506] border border-white/10 sm:border-0 p-6 sm:p-8 hover:scale-[1.02] transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center">
                  <stage.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-mono-display tracking-wider">{stage.title}</h3>
              </div>

              <div className="space-y-6">
                {stage.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/50" />
                    <span className="text-sm text-white/60 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Vision Card */}
        <div
          className="modern-card border border-white/15 bg-[#070708] p-6 sm:p-8 md:p-12 relative overflow-hidden"
          style={{ animationDelay: '120ms' }}
        >
          <div className="future-orb-a absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_82%_76%,rgba(255,255,255,0.06),transparent_36%)]" />
          <div className="future-grid-pan absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:26px_26px]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:100%_6px]" />
          <div className="future-ring-a absolute -top-20 right-[4%] w-72 h-72 rounded-full border border-white/10" />
          <div className="future-ring-b absolute -bottom-20 left-[7%] w-64 h-64 rounded-full border border-white/10" />
          <div className="absolute top-[18%] left-[20%] h-px w-28 bg-white/25 rotate-[20deg]" />
          <div className="absolute top-[58%] left-[72%] h-px w-24 bg-white/20 -rotate-[24deg]" />
          <div className="future-node absolute top-[44%] left-[52%] h-2 w-2 rounded-full border border-white/65 bg-white/40" />
          <div className="future-node-strong absolute top-[22%] left-[66%] h-2.5 w-2.5 rounded-full border border-white/70 bg-white/90 shadow-[0_0_0_4px_rgba(255,255,255,0.09)]" />
          <div className="future-node absolute top-[72%] left-[32%] h-2.5 w-2.5 rounded-full border border-white/60 bg-transparent" />
          <div className="future-scan-beam absolute inset-x-0 top-0 h-20 pointer-events-none" />

          <div className="absolute top-3 left-3 w-10 h-10 border-t border-l border-white/20" />
          <div className="absolute top-3 right-3 w-10 h-10 border-t border-r border-white/20" />
          <div className="absolute bottom-3 left-3 w-10 h-10 border-b border-l border-white/20" />
          <div className="absolute bottom-3 right-3 w-10 h-10 border-b border-r border-white/20" />

          <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute top-0 right-0 w-28 h-28 border-r border-t border-white/10" />

          <span className="relative z-10 inline-block text-[10px] font-mono-display tracking-wider text-white/40 mb-3">
            002A // FUTURE_VISION
          </span>

          <div className="relative z-10 max-w-5xl md:-mt-1">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4">FUTURE VISION</h3>
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.04] px-2.5 py-1 text-[10px] tracking-[0.14em] font-mono-display text-white/70">VISION_NOTE</span>
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.02] px-2.5 py-1 text-[10px] tracking-[0.12em] font-mono-display text-white/55">4 BLOCKS</span>
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.02] px-2.5 py-1 text-[10px] tracking-[0.12em] font-mono-display text-white/55">~1 MIN READ</span>
              </div>

              <div className="relative pl-5 md:pl-6 space-y-5 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-px before:bg-gradient-to-b before:from-white/10 before:via-white/35 before:to-white/10">
                <div className="relative pl-9">
                  <span className="absolute left-0 top-0.5 h-6 w-6 rounded-full border border-white/20 bg-white/[0.03] text-[10px] font-mono-display text-white/60 flex items-center justify-center">01</span>
                  <p className="text-[15px] md:text-base leading-8 text-white/65 text-justify">
                    I aim to build my professional path in the <span className="text-white/90 font-medium">game industry</span>{' '}
                    in a way that allows me to reach the position of <span className="text-white/90 font-medium">Game Director</span>{' '}
                    by around the age of 35+ — a place where I can lead both the creative and technical vision of a project, guiding a team of artists, programmers, and designers to create cohesive interactive experiences.
                  </p>
                </div>

                <div className="relative pl-9">
                  <span className="absolute left-0 top-0.5 h-6 w-6 rounded-full border border-white/20 bg-white/[0.03] text-[10px] font-mono-display text-white/60 flex items-center justify-center">02</span>
                  <p className="text-[15px] md:text-base leading-8 text-white/65 text-justify">
                    To reach this goal, I’m focusing on deeply learning <span className="text-white/90 font-medium">gameplay system design</span>,{' '}
                    <span className="text-white/90 font-medium">player psychology</span>, technical development in <span className="text-white/90 font-medium">Unity</span>{' '}
                    and <span className="text-white/90 font-medium">C#</span> (and later <span className="text-white/90 font-medium">Unreal Engine</span>{' '}
                    and <span className="text-white/90 font-medium">C++</span>), and improving my understanding of{' '}
                    <span className="text-white/90 font-medium">narrative</span> and <span className="text-white/90 font-medium">worldbuilding</span>.
                  </p>
                </div>

                <div className="relative pl-9">
                  <span className="absolute left-0 top-0.5 h-6 w-6 rounded-full border border-white/20 bg-white/[0.03] text-[10px] font-mono-display text-white/60 flex items-center justify-center">03</span>
                  <p className="text-[15px] md:text-base leading-8 text-white/65 text-justify">
                    Throughout this journey, I plan to gain practical experience by creating prototypes, small projects, and collaborating with other developers and incubator groups.
                  </p>
                </div>

                <div className="relative pl-9">
                  <span className="absolute left-0 top-0.5 h-6 w-6 rounded-full border border-white/20 bg-white/[0.03] text-[10px] font-mono-display text-white/60 flex items-center justify-center">04</span>
                  <p className="text-[15px] md:text-base leading-8 text-white/65 text-justify">
                    My vision is to create games that not only entertain but also deliver deep worlds and impactful atmospheres — especially in{' '}
                    <span className="text-white/90 font-medium">cyberpunk</span>, <span className="text-white/90 font-medium">dystopian</span>, and{' '}
                    <span className="text-white/90 font-medium">post‑apocalyptic</span> style, where <span className="text-white/90 font-medium">technology</span>{' '}
                    and <span className="text-white/90 font-medium">humanity</span> intersect and meaningful psychological themes can be expressed.
                  </p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};
