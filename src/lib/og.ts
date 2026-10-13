import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { config } from '../config';
import { brand, logoSvg } from './brand';

const font = (f: string) => readFileSync(`node_modules/@fontsource/${f}`);
const fonts = [
  { name: 'Fraunces', data: font('fraunces/files/fraunces-latin-700-normal.woff'), weight: 700 as const, style: 'normal' as const },
  { name: 'Fraunces', data: font('fraunces/files/fraunces-latin-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
  { name: 'Mono', data: font('jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
];

const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({
  type,
  props: { style: { display: 'flex', ...style }, children },
});

/** 1200x630 social card. `title` is large; pass `kicker` for the small line above it. */
export async function renderOg(opts: { title: string; kicker?: string; footer?: string }): Promise<Buffer> {
  const logo = `data:image/svg+xml;base64,${Buffer.from(logoSvg(72)).toString('base64')}`;
  const long = opts.title.length > 60;
  const body = h('div', {
    flex: 1, height: 502, flexDirection: 'column', justifyContent: 'space-between',
    padding: '64px 72px', paddingRight: 72,
  }, [
    h('div', { alignItems: 'center', justifyContent: 'space-between' }, [
      h('div', { alignItems: 'center', gap: 20 }, [
        { type: 'img', props: { src: logo, width: 72, height: 72 } },
        h('div', { fontSize: 34, fontWeight: 700 }, config.name),
      ]),
      h('div', { fontFamily: 'Mono', fontSize: 26, color: brand.muted }, new URL(config.url).host),
    ]),
    h('div', { flexDirection: 'column', gap: 24 }, [
      opts.kicker ? h('div', { fontFamily: 'Mono', fontSize: 28, color: brand.accent }, opts.kicker) : h('div', {}, ''),
      h('div', { fontSize: long ? 64 : 84, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5 }, opts.title),
    ]),
    h('div', { fontSize: 32, color: brand.muted }, opts.footer ?? ''),
  ]);
  const tree = h('div', { width: 1200, height: 630, background: brand.paper, color: brand.ink, fontFamily: 'Fraunces' }, [
    h('div', { width: 20, height: 630, background: brand.accent }),
    body,
  ]);
  const svg = await satori(tree as never, { width: 1200, height: 630, fonts });
  return Buffer.from(new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng());
}
