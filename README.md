# david.lequin.dev

Source for my personal blog: [david.lequin.dev](https://david.lequin.dev). Built with [Astro](https://astro.build), deployed to GitHub Pages.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
```

## Write a post

Copy `templates/post-template.md` to `src/content/posts/<slug>.md`, fill in the frontmatter (`title`, `description`, `date`, `tags`, `draft`) and set `draft: false` to publish.

## Configure

Personal settings (name, bio, links, email, Buttondown username, analytics) are in `src/config.ts`.

## Deploy

Pushing to `main` builds and deploys via GitHub Actions. One-time setup: Settings → Pages → Source: **GitHub Actions**, set the custom domain, enforce HTTPS.

DNS: `CNAME david → dewwi.github.io`.

## Cross-post to dev.to

```bash
DEVTO_API_KEY=... node scripts/crosspost-devto.mjs src/content/posts/<slug>.md
```

Creates a draft with the canonical URL pointing at this site.

### Inline SVGs and charts in RSS / dev.to

Feeds and importers can't use inline `<svg>` or JS-drawn charts, so those are swapped for pre-rendered PNGs. After adding or changing an SVG/chart in a post:

```bash
npm run build && npm run render-svgs -- <slug>   # writes public/posts/<slug>/svg-N.png (N = order in the post)
```

Commit the PNGs. Without them the RSS feed and crosspost script drop the SVG, as before.

## Newsletter drafts

When a new non-draft post is pushed to `main`, the workflow creates a **draft** email in Buttondown (it never sends). Add a `BUTTONDOWN_API_KEY` repository secret (Settings → Secrets and variables → Actions); without it the step is skipped. Review and send the draft from the Buttondown dashboard.
