// Production server: Astro's Node handler plus caching and security headers.
import http from 'node:http';

// Use the standalone handler (pages + static files) without letting it start its own server.
process.env.ASTRO_NODE_AUTOSTART = 'disabled';
const { handler } = await import('./dist/server/entry.mjs');

const HOST = process.env.HOST ?? '0.0.0.0';
const PORT = Number(process.env.PORT ?? 4321);

const YEAR = 'public, max-age=31536000, immutable';
const WEEK = 'public, max-age=604800';

function cacheControl(path) {
  if (path.startsWith('/_astro/')) return YEAR; // hashed file names, safe forever
  if (/^\/(fonts|shapes|email)\//.test(path)) return WEEK;
  if (/\.(ico|png|svg|webp|jpg)$/.test(path)) return 'public, max-age=86400';
  return undefined; // HTML: revalidate (Astro default)
}

http
  .createServer((req, res) => {
    const path = (req.url ?? '/').split('?')[0];
    const cache = cacheControl(path);
    if (cache) res.setHeader('Cache-Control', cache);
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');
    handler(req, res);
  })
  .listen(PORT, HOST, () => console.log(`Splashngo listening on http://${HOST}:${PORT}`));
