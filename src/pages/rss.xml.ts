import rss from '@astrojs/rss';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';
import type { APIContext } from 'astro';
import { config } from '../config';
import { getPosts, postUrl } from '../lib/posts';

const md = new MarkdownIt({ html: true, linkify: true });

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: config.title,
    description: config.bio,
    site: config.url,
    trailingSlash: true,
    xmlns: { atom: 'http://www.w3.org/2005/Atom', content: 'http://purl.org/rss/1.0/modules/content/' },
    customData: `<language>en-gb</language><atom:link href="${config.url}/rss.xml" rel="self" type="application/rss+xml"/><image><url>${config.url}/icons/icon-512.png</url><title>${config.title}</title><link>${config.url}/</link></image>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postUrl(post),
      categories: post.data.tags,
      author: `${config.email} (${config.name})`,
      // Full body, not an excerpt, with relative URLs made absolute for feed readers and importers.
      content: sanitizeHtml(md.render(post.body ?? '').replace(/(href|src)="\/(?!\/)/g, `$1="${config.url}/`), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'figure', 'figcaption', 'details', 'summary']),
        allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, img: ['src', 'alt', 'title', 'width', 'height'], '*': ['id'] },
      }),
    })),
  });
}
