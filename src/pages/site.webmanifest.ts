import { config } from '../config';
import { brand } from '../lib/brand';

export const GET = () =>
  new Response(JSON.stringify({
    name: config.title,
    short_name: 'D. Lequin',
    description: config.bio,
    start_url: '/',
    display: 'browser',
    background_color: brand.paper,
    theme_color: brand.accent,
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }, null, 2), { headers: { 'Content-Type': 'application/manifest+json' } });
