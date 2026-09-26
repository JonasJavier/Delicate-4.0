import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Link previews (WhatsApp, Facebook, X) only accept absolute image URLs, so
// the public site URL is written into index.html at build time.
function siteUrlPlugin(siteUrl) {
  return {
    name: 'delicate-site-url',
    transformIndexHtml(html) {
      const withUrl = html.replaceAll('%SITE_URL%', siteUrl);
      if (!siteUrl) return withUrl;
      return {
        html: withUrl,
        tags: [
          { tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: `${siteUrl}/` }, injectTo: 'head' },
        ],
      };
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '..', 'VITE_');
  const railwayDomain = process.env.RAILWAY_PUBLIC_DOMAIN;
  const siteUrl = (env.VITE_SITE_URL || (railwayDomain ? `https://${railwayDomain}` : '')).replace(/\/+$/, '');

  return {
    envDir: '..',
    plugins: [react(), siteUrlPlugin(siteUrl)],
    server: {
      host: '127.0.0.1',
      port: 5173,
      strictPort: true,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
        },
        '/media': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
        },
      },
    },
    preview: {
      host: '127.0.0.1',
      port: 4173,
    },
  };
});
