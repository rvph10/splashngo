// @ts-check
import { defineConfig, envField } from 'astro/config';
import { loadEnv } from 'vite';
import node from '@astrojs/node';

// SITE_URL: public address of this build (canonical URLs, sitemap, e-mail images).
// Use the preview address for the client test link, the final domain in production.
const { SITE_URL = 'https://www.splashngo.be' } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

export default defineConfig({
  site: SITE_URL,
  // Clean URLs without trailing slash: /contact, /services/vitres.
  trailingSlash: 'never',
  build: { format: 'directory' },

  // Pages are static; only the contact page and its form action run on the Node server.
  // server.mjs wraps the handler to add caching and security headers.
  adapter: node({ mode: 'standalone' }),

  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret' }),
      // Sender on a domain verified in Resend, e.g. "Splashngo <devis@splashngo.be>"
      CONTACT_FROM_EMAIL: envField.string({ context: 'server', access: 'secret' }),
      // Business inbox (Zoho) that receives the requests
      CONTACT_TO_EMAIL: envField.string({ context: 'server', access: 'secret' }),
      // true on the client test link: noindex everywhere and robots.txt blocks crawlers
      PUBLIC_PREVIEW: envField.boolean({ context: 'client', access: 'public', default: false }),
      // Self-hosted Umami: the script is only added when both are set
      PUBLIC_UMAMI_SRC: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_UMAMI_WEBSITE_ID: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },
});
