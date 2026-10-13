import type { APIRoute, GetStaticPaths } from 'astro';
import { png } from '../../lib/icons';

const sizes: Record<string, { size: number; rounded: boolean }> = {
  'icon-192': { size: 192, rounded: true },
  'icon-512': { size: 512, rounded: true },
  'maskable-512': { size: 512, rounded: false }, // full-bleed for Android adaptive icons
  'apple-touch-icon': { size: 180, rounded: false }, // iOS applies its own rounding
};

export const getStaticPaths: GetStaticPaths = () => Object.keys(sizes).map((name) => ({ params: { name } }));

export const GET: APIRoute = ({ params }) => {
  const { size, rounded } = sizes[params.name!];
  return new Response(png(size, { rounded }), { headers: { 'Content-Type': 'image/png' } });
};
