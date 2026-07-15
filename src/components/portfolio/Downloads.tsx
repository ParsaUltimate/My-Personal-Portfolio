import { Download, FileArchive } from 'lucide-react';
import { downloads } from '@/data/downloads';

export const Downloads = () => {
  if (downloads.length === 0) {
    return null;
  }

  return (
    <section id="downloads" className="py-12 sm:py-16 md:py-[4.4rem] bg-[#050506]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 sm:gap-0 mb-12 sm:mb-20 pb-8 sm:pb-12 border-b border-white/10 relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
          <div className="relative z-10">
            <span id="downloads_title" className="text-sm font-mono-display text-white/40 mb-6 block tracking-widest uppercase">
              SYSTEM_SECURE_DOWNLOADS // 006
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] leading-[0.9] font-black text-white brutalist-text tracking-tighter">
              ASSETS
              <br />
              <span className="text-white/20">& ARCHIVES</span>
            </h1>
          </div>
          <div className="sm:text-right relative z-10 mt-6 sm:mt-0">
            <p className="text-base sm:text-lg text-white/50 max-w-sm font-light leading-relaxed">
              Direct access to project source codes, early prototypes, and other development resources.
            </p>
            <div className="mt-6 flex sm:justify-end gap-2">
              <span className="px-3 py-1.5 bg-white/5 border border-white/10 text-[10px] text-white/60 font-mono-display uppercase tracking-widest backdrop-blur-sm">
                {downloads.length} FILES AVAILABLE
              </span>
            </div>
          </div>
        </div>

        {/* Downloads Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-px sm:bg-white/10 sm:border sm:border-white/10">
          {downloads.map((item, index) => (
            <div
              key={item.id}
              className="modern-card sheen-hover group bg-[#050506] border border-white/10 sm:border-0 p-6 sm:p-8 hover:bg-white/[0.02] transition-all duration-500 hover:scale-[1.02]"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              {/* Icon / Type */}
              <div className="mb-8 overflow-hidden border border-white/10 bg-black/40 h-48 flex items-center justify-center relative group-hover:border-white/20 transition-all duration-500 group-hover:bg-black/20">
                 <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                 <FileArchive className="w-16 h-16 text-white/20 group-hover:text-white group-hover:scale-110 transition-all duration-500 relative z-10 drop-shadow-2xl" />
              </div>

              {/* Number */}
              <span className="text-xs font-mono-display text-white/30 mb-6 block">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Status/Size */}
              <div className="flex items-center gap-3 mb-6">
                <span className="px-2 py-1 bg-white/5 border border-white/10 text-[10px] font-mono-display text-white/60 tracking-widest uppercase">
                  {item.fileType}
                </span>
                <span className="text-[10px] font-mono-display text-white/40 tracking-wider uppercase">
                  {item.size}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-black text-white mb-2 group-hover:text-white/80 transition-colors">
                {item.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-white/60 leading-relaxed mb-8 h-10 line-clamp-2">
                {item.description}
              </p>

              {/* Action Button */}
              <a
                href={`/download/${item.fileId}`}
                className="inline-flex items-center gap-3 mb-6 text-sm font-bold text-white/70 hover:text-white transition-colors group/btn"
                download
              >
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:border-white group-hover/btn:bg-white group-hover/btn:text-black transition-all">
                  <Download className="w-4 h-4" />
                </div>
                Download File
              </a>

              {/* Bottom */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                <span className="text-xs text-white/30">Secure Download</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
