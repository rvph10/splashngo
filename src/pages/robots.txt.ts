import type { APIRoute } from 'astro';
import { site as settings } from '../data/site';

// The client test link must not be indexed.
export const GET: APIRoute = ({ site }) =>
  new Response(
    settings.preview
      ? 'User-agent: *\nDisallow: /\n'
      : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site)}\n`,
  );
