export async function onRequest(context: any) {
  const hostname = new URL(context.request.url).hostname;
  
  let content: string;
  
  if (hostname === 'prompts.parsaghaei.dev') {
    content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://prompts.parsaghaei.dev/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
  } else {
    content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://parsaghaei.dev/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
  }
  
  return new Response(content, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
