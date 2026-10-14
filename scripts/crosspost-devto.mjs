#!/usr/bin/env node
// Publish a post to dev.to as a DRAFT with canonical_url pointing at this site.
// Usage: DEVTO_API_KEY=... node scripts/crosspost-devto.mjs src/content/posts/my-post.md [--dry-run]
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
import { parse } from 'yaml';
import { svgsToImages, flattenFigures } from '../src/lib/svg-images.mjs';

const SITE = 'https://david.lequin.dev';
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const file = args.find((a) => !a.startsWith('--'));

if (!file) {
  console.error('Usage: node scripts/crosspost-devto.mjs <post.md> [--dry-run]');
  process.exit(1);
}
const apiKey = process.env.DEVTO_API_KEY;
if (!apiKey && !dryRun) {
  console.error('Set DEVTO_API_KEY (dev.to → Settings → Extensions → Generate API key).');
  process.exit(1);
}

const raw = readFileSync(file, 'utf8');
const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
if (!match) {
  console.error('No frontmatter found.');
  process.exit(1);
}
const fm = parse(match[1]);
const slug = basename(file).replace(/\.mdx?$/, '');
const canonical = `${SITE}/blog/${slug}/`;

// Site-relative links and images must be absolute on dev.to.
// Inline <svg>/JS charts become the PNGs from render-svgs.mjs; site-relative src/href also made absolute.
const body = flattenFigures(svgsToImages(match[2].trim(), slug, SITE))
  .replace(/<script\b[\s\S]*?<\/script>\s*/g, '')
  .replace(/<div id="tip"><\/div>\s*/g, '')
  .replace(/(\]\()\/(?!\/)/g, `$1${SITE}/`)
  .replace(/(src=")\/(?!\/)/g, `$1${SITE}/`);

// dev.to allows max 4 tags, lowercase alphanumeric only.
const tags = (fm.tags ?? []).map((t) => String(t).toLowerCase().replace(/[^a-z0-9]/g, '')).filter(Boolean).slice(0, 4);

const article = {
  title: fm.title,
  body_markdown: body,
  published: false, // always a draft: review on dev.to before publishing
  canonical_url: canonical,
  description: fm.description,
  tags,
};

if (dryRun) {
  console.log(JSON.stringify({ ...article, body_markdown: `${body.slice(0, 200)}…` }, null, 2));
  process.exit(0);
}

const res = await fetch('https://dev.to/api/articles', {
  method: 'POST',
  headers: { 'api-key': apiKey, 'Content-Type': 'application/json', Accept: 'application/vnd.forem.api-v1+json' },
  body: JSON.stringify({ article }),
});
const data = await res.json().catch(() => ({}));
if (!res.ok) {
  console.error(`dev.to responded ${res.status}:`, JSON.stringify(data));
  process.exit(1);
}
console.log(`Draft created: ${data.url ?? 'https://dev.to/dashboard'}\nCanonical:     ${canonical}`);
