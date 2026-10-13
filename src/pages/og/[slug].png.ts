import type { APIRoute, GetStaticPaths } from 'astro';
import { getPosts, formatDate } from '../../lib/posts';
import { renderOg } from '../../lib/og';

export const getStaticPaths: GetStaticPaths = async () =>
  (await getPosts()).map((post) => ({ params: { slug: post.id }, props: { post } }));

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: Awaited<ReturnType<typeof getPosts>>[number] };
  const png = await renderOg({
    title: post.data.title,
    kicker: [formatDate(post.data.date), post.data.tags[0]].filter(Boolean).join('  ·  '),
  });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
