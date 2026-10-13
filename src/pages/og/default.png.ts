import { renderOg } from '../../lib/og';
import { config } from '../../config';

export const GET = async () =>
  new Response(await renderOg({ title: config.tagline, kicker: 'Notes from the production side of AI agents', footer: 'Building with Claude · London' }), {
    headers: { 'Content-Type': 'image/png' },
  });
