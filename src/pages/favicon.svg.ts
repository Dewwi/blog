import { logoSvg } from '../lib/brand';
export const GET = () => new Response(logoSvg(64), { headers: { 'Content-Type': 'image/svg+xml' } });
