# david.lequin.dev

Personal technical blog. Astro 5, static, deployed to GitHub Pages. This site is the canonical home of everything; other platforms only redistribute it.

## Settings

Everything personal (name, URL, bio, links, email, Buttondown username, analytics toggle) lives in [`src/config.ts`](src/config.ts). Before launch, change the placeholders: `email` and `buttondown.username`.

## Writing and previewing a post

```bash
npm install
cp templates/post-template.md src/content/posts/my-post-slug.md   # filename = URL slug
npm run dev                                                         # http://localhost:4321
```

Frontmatter: `title`, `description`, `date`, `updated` (optional), `tags`, `draft`. Drafts (`draft: true`) show in `npm run dev` (marked DRAFT) and are excluded from production builds, RSS and the sitemap. Set `draft: false` to publish.

Every post automatically gets a social card (`/og/<slug>.png`), JSON-LD (`BlogPosting`, breadcrumbs), a table of contents (3+ headings) and prev/next links. `npm run build` then `npm run preview` to check the production output.

## Deploying

Every push to `main` runs `.github/workflows/deploy.yml` (build, then `upload-pages-artifact` and `deploy-pages`).

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Set DNS (below), then **Settings → Pages → Custom domain**: `david.lequin.dev`, Save. `public/CNAME` already contains it.
3. Once the certificate is issued (can take up to ~1 hour), tick **Enforce HTTPS**.

## DNS

At your DNS provider for `lequin.dev`:

| Type  | Name    | Value                |
|-------|---------|----------------------|
| CNAME | `david` | `dewwi.github.io.`   |

Optional but recommended: verify the domain with GitHub (Account **Settings → Pages → Add a domain**) and add the `_github-pages-challenge-Dewwi` TXT record it gives you, which prevents domain takeover.

### Redirecting bare `lequin.dev` → `david.lequin.dev`

GitHub Pages cannot do this itself (a repo serves one custom domain). `.dev` is HSTS-preloaded, so the redirect must also work over HTTPS. Easiest free route is Cloudflare (use it as DNS for the domain, or just for this):

1. Add a **proxied** (orange cloud) record: `A`, name `@`, value `192.0.2.1` (placeholder; never reached). Add `AAAA` `@` `100::` if you want IPv6.
2. **Rules → Redirect Rules → Create**: if hostname equals `lequin.dev` (also `www.lequin.dev`), then *Dynamic* redirect to `concat("https://david.lequin.dev", http.request.uri.path)`, status **301**, preserve query string.
3. Keep the `david` CNAME **DNS only** (grey cloud) so GitHub can issue its certificate.

If you'd rather not use Cloudflare, use a registrar's "URL forwarding (301)" feature, but check it serves a valid HTTPS certificate on the bare domain, otherwise browsers will refuse it.

## Newsletter (Buttondown)

1. Create an account at buttondown.com and set your username in `src/config.ts` (`buttondown.username`).
2. **RSS-to-email**: Buttondown → Settings → Automations → *RSS to email* → feed URL `https://david.lequin.dev/rss.xml`. Choose draft mode at first so you review each email before it sends.

## Cross-posting

The canonical URL must point at this site everywhere, so search engines credit david.lequin.dev.

**dev.to, script:** create an API key (dev.to → Settings → Extensions), then

```bash
export DEVTO_API_KEY=...
node scripts/crosspost-devto.mjs src/content/posts/my-post.md            # creates a DRAFT
node scripts/crosspost-devto.mjs src/content/posts/my-post.md --dry-run  # preview the payload
```

Review the draft on dev.to and publish it there. Do this *after* the post is live on your site.

**dev.to, RSS import:** Settings → Extensions → *Publishing to DEV from RSS* → `https://david.lequin.dev/rss.xml`. Imports arrive as drafts with the canonical URL set automatically.

## SEO and sharing

Built in: canonical on every page (always the production domain), Open Graph and Twitter large-image cards, 1200×630 PNG social cards (default + per post), JSON-LD (`Person`, `WebSite`, `Blog`, `BlogPosting`, `BreadcrumbList`, `ProfilePage`, `ContactPage`), `rel="me"` identity links, RSS autodiscovery, sitemap (`/sitemap-index.xml`), `robots.txt`, favicon set (`.ico`, SVG, Apple touch, Android/maskable) and web manifest, light/dark `theme-color`.

After launch: add `https://david.lequin.dev/` as a **Domain/URL-prefix property in Google Search Console** and submit `sitemap-index.xml`; do the same in Bing Webmaster Tools. Validate cards with the LinkedIn Post Inspector and a Rich Results Test.

## Analytics

GoatCounter, off by default. Create a site at goatcounter.com, then in `src/config.ts` set `analytics.goatcounter.enabled: true` and `code` to your site code.

## Commands

| Command           | Action                         |
|-------------------|--------------------------------|
| `npm run dev`     | Dev server on `localhost:4321` |
| `npm run build`   | Production build to `dist/`    |
| `npm run preview` | Serve the production build     |
