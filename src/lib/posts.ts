import { getCollection, type CollectionEntry } from 'astro:content';
import { config } from '../config';

export type Post = CollectionEntry<'posts'>;

/** Published posts, newest first. Drafts are visible in `astro dev` only. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const postUrl = (post: Post) => `${config.url}/blog/${post.id}/`;

export const slugifyTag = (tag: string) =>
  tag.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function readingTime(body = ''): number {
  const words = body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function tagCounts(posts: Post[]): Map<string, { label: string; count: number }> {
  const map = new Map<string, { label: string; count: number }>();
  for (const p of posts) {
    for (const t of p.data.tags) {
      const slug = slugifyTag(t);
      const cur = map.get(slug) ?? { label: t, count: 0 };
      cur.count++;
      map.set(slug, cur);
    }
  }
  return map;
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
