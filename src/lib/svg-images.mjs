// Feeds and cross-posts can't carry inline <svg> (sanitised away, or drawn by JS at runtime).
// scripts/render-svgs.mjs screenshots every <svg> in a post to public/posts/<slug>/svg-N.png, N = order of
// appearance in the markdown. This swaps each <svg> in a post body for an absolute <img> to that PNG.
import { existsSync } from 'node:fs';

const SVG = /<svg\b[\s\S]*?<\/svg>/g;

export const svgImagePath = (slug, n) => `public/posts/${slug}/svg-${n}.png`;

export function svgsToImages(body, slug, site) {
  let n = 0;
  return body.replace(SVG, (svg, offset) => {
    n++;
    if (!existsSync(svgImagePath(slug, n))) return ''; // not rendered yet: drop, as before
    // aria-label for the hand-drawn figures; the chart's <h3> title for JS-drawn charts
    const heading = [...body.slice(0, offset).matchAll(/<h3>([\s\S]*?)<\/h3>/g)].pop()?.[1] ?? '';
    const alt = (svg.match(/aria-label="([^"]*)"/) ?? [])[1] ?? heading.replace(/<[^>]+>/g, '');
    return `<img src="${site}/posts/${slug}/svg-${n}.png" alt="${alt.replace(/"/g, '&quot;')}" />`;
  });
}

/** Unwrap `<div><img><p>caption</p></div>` so importers see plain paragraphs. */
export const flattenFigures = (html) =>
  html.replace(/<div>\s*(<img\b[^>]*>)\s*<p>([\s\S]*?)<\/p>\s*<\/div>/g, '<p>$1</p><p><em>$2</em></p>');
