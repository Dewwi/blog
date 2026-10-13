import { renderOg } from '../../lib/og';
import { config } from '../../config';

export const GET = async () =>
  new Response(await renderOg({ title: config.name, kicker: config.role }), {
    headers: { 'Content-Type': 'image/png' },
  });
