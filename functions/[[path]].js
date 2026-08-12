const SEO_BY_HOST = {
  "prompts.parsaghaei.dev": {
    title: "AI Prompt Library | Parsa Ghaei",
    description:
      "A curated AI Prompt Library by Parsa Ghaei with structured prompts for writing, research, visual design, and coding workflows.",
    keywords:
      "AI prompts, Prompt library, ChatGPT prompts, Claude prompts, Gemini prompts, Parsa Ghaei",
    canonical: "https://prompts.parsaghaei.dev/",
    ogTitle: "AI Prompt Library | Parsa Ghaei",
    ogDescription: "Structured prompts for writing, research, visual design, and coding workflows.",
    ogImage: "https://parsaghaei.dev/og-image.png",
    twitterTitle: "AI Prompt Library | Parsa Ghaei",
    twitterDescription: "Structured prompts for writing, research, visual design, and coding workflows.",
    twitterImage: "https://parsaghaei.dev/og-image.png",
  },
};

const DEFAULT_SEO = {
  title: "Parsa Ghaei | Eager to Become a Game Developer & Designer",
  description:
    "Hi, I'm Parsa — a 17-year-old game developer studying computer science in technical high school, currently learning Unity and C#.",
  keywords: "Game Developer, Game Designer, Unity, C#, Game Development, Portfolio, Parsa Ghaei",
  canonical: "https://parsaghaei.dev/",
  ogTitle: "Parsa Ghaei | Eager to Become a Game Developer & Designer",
  ogDescription:
    "Hi, I'm Parsa — a 17-year-old game developer studying computer science in technical high school, currently learning Unity and C#.",
  ogImage: "https://parsaghaei.dev/og-image.png",
  twitterTitle: "Parsa Ghaei | Eager to Become a Game Developer & Designer",
  twitterDescription:
    "Hi, I'm Parsa — a 17-year-old game developer studying computer science in technical high school, currently learning Unity and C#.",
  twitterImage: "https://parsaghaei.dev/og-image.png",
};

class ElementContentRewriter {
  constructor(content) {
    this.content = content;
  }

  element(element) {
    element.setInnerContent(this.content);
  }
}

class AttrRewriter {
  constructor(attribute, value) {
    this.attribute = attribute;
    this.value = value;
  }

  element(element) {
    element.setAttribute(this.attribute, this.value);
  }
}

export async function onRequest(context) {
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("text/html")) {
    return response;
  }

  try {
    const hostname = new URL(context.request.url).hostname.toLowerCase();
    const seo = SEO_BY_HOST[hostname] || DEFAULT_SEO;

    return new HTMLRewriter()
      .on("title", new ElementContentRewriter(seo.title))
      .on('meta[name="description"]', new AttrRewriter("content", seo.description))
      .on('meta[name="keywords"]', new AttrRewriter("content", seo.keywords))
      .on('link[rel="canonical"]', new AttrRewriter("href", seo.canonical))
      .on('meta[property="og:title"]', new AttrRewriter("content", seo.ogTitle))
      .on('meta[property="og:description"]', new AttrRewriter("content", seo.ogDescription))
      .on('meta[property="og:url"]', new AttrRewriter("content", seo.canonical))
      .on('meta[property="og:image"]', new AttrRewriter("content", seo.ogImage))
      .on('meta[name="twitter:title"]', new AttrRewriter("content", seo.twitterTitle))
      .on('meta[name="twitter:description"]', new AttrRewriter("content", seo.twitterDescription))
      .on('meta[name="twitter:image"]', new AttrRewriter("content", seo.twitterImage))
      .transform(response);
  } catch (error) {
    // Never break page rendering because of SEO rewrite issues.
    return response;
  }
}
