import { Calendar, ExternalLink, Newspaper } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchMediumPosts,
  getPostExcerpt,
  getFeaturedPosts,
  MEDIUM_CONFIG,
} from "@/lib/medium";

export const FeaturedBlogs = () => {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["medium-posts", MEDIUM_CONFIG.username],
    queryFn: () => fetchMediumPosts(MEDIUM_CONFIG.username),
    staleTime: 1000 * 60 * 15,
  });

  const featuredPosts = getFeaturedPosts(posts);

  return (
    <section id="featured_blogs" className="py-12 sm:py-16 md:py-[3.3rem] bg-[#050506]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-12 md:mb-14 pb-6 sm:pb-8 border-b border-white/10 flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6">
          <div>
          <span id="featured_blogs_title" className="text-xs font-mono-display text-white/40 mb-4 block">
            001A // FEATURED_BLOGS
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white brutalist-text">
            Top
            <br />
            <span className="text-white/35">Writings</span>
          </h2>
          <p className="text-white/50 text-xs sm:text-sm md:text-base mt-4 sm:mt-6 max-w-2xl">
            Three curated posts from Medium. You can choose them by updating{" "}
            <code className="text-white/80">MEDIUM_CONFIG.featuredPostLinks</code>.
          </p>
          </div>
          <a
            href="/blog"
            data-cursor-preview="Go To Blog Page"
            className="button-glow-hover inline-flex items-center justify-center bg-white text-black font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-sm border-2 border-white hover:bg-white/90 transition-all"
          >
            SEE MORE
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-px sm:bg-white/10 sm:border sm:border-white/10">
          {(isLoading ? [0, 1, 2] : featuredPosts).map((post, index) => (
            <article
              key={typeof post === "number" ? post : post.link}
              className="modern-card sheen-hover bg-[#050506] border border-white/10 sm:border-0 p-6 sm:p-8 transition-all duration-500 hover:scale-[1.02]"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              {typeof post === "number" ? (
                <div className="space-y-5">
                  <div className="h-3 w-20 bg-white/10 rounded animate-pulse" />
                  <div className="h-7 w-4/5 bg-white/10 rounded animate-pulse" />
                  <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                  <div className="h-4 w-11/12 bg-white/5 rounded animate-pulse" />
                </div>
              ) : (
                <>
                  {post.thumbnail && (
                    <div className="mb-6 overflow-hidden border border-white/10 bg-black/30">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        width="400"
                        height="160"
                        className="card-media-zoom h-40 w-full object-cover opacity-90"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-mono-display tracking-wider text-white/40">
                      FEATURED
                    </span>
                    <Newspaper className="w-4 h-4 text-white/35" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-sm text-white/55 mb-7 line-clamp-4 leading-relaxed">
                    {getPostExcerpt(post.content, 160)}
                  </p>

                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/35 text-xs">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.pubDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-preview="Read On Medium"
                      className="text-white/50 hover:text-white text-sm inline-flex items-center gap-1 transition-colors"
                    >
                      Read On Medium
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
