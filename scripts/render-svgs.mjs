#!/usr/bin/env node
// Screenshot every <svg> in each post to public/posts/<slug>/svg-N.png (light theme, 2x), so the RSS feed and
// dev.to cross-posts can use plain images. Run after `npm run build`; commit the PNGs.
// Usage: node scripts/render-svgs.mjs [slug ...]
import { createServer } from 'node:http';
import { readdirSync, readFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import { chromium } from 'playwright-core';

const POSTS = 'src/content/posts';
const only = process.argv.slice(2);
const slugs = readdirSync(POSTS)
  .filter((f) => /\.mdx?$/.test(f))
  .map((f) => f.replace(/\.mdx?$/, ''))
  .filter((s) => (only.length ? only.includes(s) : /<svg\b/.test(readFileSync(join(POSTS, `${s}.md`), 'utf8'))));

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff' };
const server = createServer((req, res) => {
  let p = join('dist', decodeURIComponent(req.url.split('?')[0]));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
  if (!existsSync(p)) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'Content-Type': types[extname(p)] ?? 'application/octet-stream' }).end(readFileSync(p));
}).listen(0);
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch({ channel: 'chrome' });
const ctx = await browser.newContext({ viewport: { width: 1000, height: 900 }, deviceScaleFactor: 2, colorScheme: 'light' });
for (const slug of slugs) {
  const page = await ctx.newPage();
  await page.goto(`${base}/blog/${slug}/`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500); // chart scripts draw after load
  const svgs = await page.locator('.prose svg').all();
  mkdirSync(`public/posts/${slug}`, { recursive: true });
  let n = 0;
  for (const svg of svgs) {
    n++;
    await svg.scrollIntoViewIfNeeded();
    await svg.screenshot({ path: `public/posts/${slug}/svg-${n}.png` });
  }
  console.log(`${slug}: ${n} svgs`);
  await page.close();
}
await browser.close();
server.close();
