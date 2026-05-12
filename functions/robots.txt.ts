export async function onRequest(context: any) {
  const hostname = new URL(context.request.url).hostname;
  
  let content: string;
  
  if (hostname === 'prompts.parsaghaei.dev') {
    content = `User-agent: *
Allow: /

Sitemap: https://prompts.parsaghaei.dev/sitemap.xml`;
  } else {
    content = `User-agent: *
Allow: /

Sitemap: https://parsaghaei.dev/sitemap.xml`;
  }
  
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
