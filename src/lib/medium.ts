export type MediumPost = {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  categories: string[];
  thumbnail?: string;
};

const envFeaturedPostLinks = [
  import.meta.env.VITE_MEDIUM_FEATURED_POST_1,
  import.meta.env.VITE_MEDIUM_FEATURED_POST_2,
  import.meta.env.VITE_MEDIUM_FEATURED_POST_3,
]
  .map((link) => (typeof link === "string" ? link.trim() : ""))
  .filter((link): link is string => Boolean(link));

// Thumbnail overrides: map post URL (partial match) to a custom thumbnail image
const THUMBNAIL_OVERRIDES: Record<string, string> = {
  "why-i-believe-video-games-are-the-ultimate-form-of-art":
    "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*vSfixZ8Zz566jmFDGNr6Lg.png",
};

// select featured posts and username
export const MEDIUM_CONFIG = {
  username: (import.meta.env.VITE_MEDIUM_USERNAME || "parsaghaei").trim(),
  featuredPostLinks:
    envFeaturedPostLinks.length > 0
      ? envFeaturedPostLinks
      : [
          "https://medium.com/@yourusername/first-post-slug",
          "https://medium.com/@yourusername/second-post-slug",
          "https://medium.com/@yourusername/third-post-slug",
        ],
  featuredCount: 3,
  devlogTags: ["devlog", "development-log", "logbook", "journey"],
};

type Rss2JsonItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  content?: string;
  description?: string;
  categories?: string[];
  thumbnail?: string;
};

type Rss2JsonResponse = {
  status: "ok" | "error";
  items?: Rss2JsonItem[];
  message?: string;
};

const htmlToPlainText = (value: string) => {
  return value
    .replace(/<figure[^>]*>[\s\S]*?<\/figure>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
};

const extractFirstImageUrl = (value: string) => {
  if (!value) {
    return undefined;
  }
  const match = value.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (!match?.[1]) {
    return undefined;
  }
  const src = match[1].trim();
  return src.length > 0 ? src : undefined;
};

const getThumbnailOverride = (link: string): string | undefined => {
  for (const [slug, imageUrl] of Object.entries(THUMBNAIL_OVERRIDES)) {
    if (link.includes(slug)) {
      return imageUrl;
    }
  }
  return undefined;
};

const normalizePost = (item: Rss2JsonItem): MediumPost | null => {
  if (!item.title || !item.link || !item.pubDate) {
    return null;
  }
  const contentHtml = item.content || "";
  const descriptionHtml = item.description || "";
  const contentText = htmlToPlainText(contentHtml);
  const descriptionText = htmlToPlainText(descriptionHtml);
  const shouldUseDescription =
    contentText.length < 80 && descriptionText.length > contentText.length;
  const fallbackThumbnail =
    extractFirstImageUrl(contentHtml) || extractFirstImageUrl(descriptionHtml);
  const overrideThumbnail = getThumbnailOverride(item.link);
  return {
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    content: shouldUseDescription
      ? descriptionHtml
      : contentHtml || descriptionHtml,
    categories: (item.categories || []).map((category) =>
      category.toLowerCase().trim()
    ),
    thumbnail: overrideThumbnail || item.thumbnail || fallbackThumbnail,
  };
};

export const stripHtml = (value: string) => {
  return htmlToPlainText(value);
};

export const getPostExcerpt = (value: string, maxLength = 180) => {
  const plainText = stripHtml(value);
  if (!plainText) {
    return "Summary unavailable for this post.";
  }
  if (plainText.length <= maxLength) {
    return plainText;
  }
  return `${plainText.slice(0, maxLength).trimEnd()}...`;
};

export const isDevlogPost = (post: MediumPost) => {
  const normalizeTag = (value: string) =>
    value
      .toLowerCase()
      .replace(/^#/, "")
      .replace(/[\s_-]+/g, "")
      .trim();
  const normalizedTitle = normalizeTag(post.title);
  if (normalizedTitle.includes("devlog")) {
    return true;
  }
  const configuredDevlogTags = MEDIUM_CONFIG.devlogTags.map((tag) =>
    normalizeTag(tag)
  );
  const hasMatchingDevlogCategory = post.categories.some((category) => {
    const normalizedCategory = normalizeTag(category);
    return configuredDevlogTags.some(
      (devlogTag) =>
        normalizedCategory === devlogTag ||
        normalizedCategory.includes(devlogTag)
    );
  });
  if (hasMatchingDevlogCategory) {
    return true;
  }
  return post.link.toLowerCase().includes("devlog");
};

export const fetchMediumPosts = async (username: string) => {
  if (!username || username.trim() === "" || username === "yourusername") {
    throw new Error(
      "Medium username is not configured. Set VITE_MEDIUM_USERNAME in .env or MEDIUM_CONFIG.username in src/lib/medium.ts."
    );
  }
  const feedUrl = `https://medium.com/feed/@${username}`;
  const endpoint = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error("Failed to fetch Medium feed");
  }
  const data = (await response.json()) as Rss2JsonResponse;
  if (data.status !== "ok" || !data.items) {
    throw new Error(data.message || "Invalid Medium feed response");
  }
  return data.items
    .map(normalizePost)
    .filter((post): post is MediumPost => Boolean(post))
    .sort(
      (leftPost, rightPost) =>
        new Date(rightPost.pubDate).getTime() -
        new Date(leftPost.pubDate).getTime()
    );
};

export const getFeaturedPosts = (posts: MediumPost[]) => {
  const preferredPosts = MEDIUM_CONFIG.featuredPostLinks
    .map((link) => posts.find((post) => post.link === link))
    .filter((post): post is MediumPost => Boolean(post));
  if (preferredPosts.length >= MEDIUM_CONFIG.featuredCount) {
    return preferredPosts.slice(0, MEDIUM_CONFIG.featuredCount);
  }
  const fallbackPosts = posts.filter(
    (post) =>
      !isDevlogPost(post) &&
      !preferredPosts.some((p) => p.link === post.link)
  );
  return [...preferredPosts, ...fallbackPosts].slice(
    0,
    MEDIUM_CONFIG.featuredCount
  );
};
