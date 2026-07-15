import { downloads } from '../../src/data/downloads';

interface Env {
  PORTFOLIO_FILES: R2Bucket;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;
  const fileId = params.fileId as string;

  if (request.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // Find the file in our allowlist
  const downloadItem = downloads.find((item) => item.fileId === fileId);

  if (!downloadItem) {
    return new Response('File not found in allowlist', { status: 404 });
  }

  const objectKey = downloadItem.objectKey;

  try {
    // Return early if R2 bucket is not configured yet
    if (!env.PORTFOLIO_FILES) {
      return new Response('File downloads are temporarily unavailable (Storage not configured).', { status: 503 });
    }

    const object = await env.PORTFOLIO_FILES.get(objectKey);

    if (object === null) {
      return new Response('File not found in bucket', { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('Content-Disposition', `attachment; filename="${downloadItem.objectKey}"`);
    headers.set('Content-Length', object.size.toString());

    return new Response(object.body, {
      headers,
    });
  } catch (error) {
    console.error('Error fetching file from R2:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
