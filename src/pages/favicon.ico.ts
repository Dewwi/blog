import { ico } from '../lib/icons';
export const GET = () => new Response(ico(), { headers: { 'Content-Type': 'image/x-icon' } });
