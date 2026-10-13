import { Resvg } from '@resvg/resvg-js';
import { logoSvg } from './brand';

export const png = (size: number, opts: { rounded?: boolean } = {}) =>
  Buffer.from(new Resvg(logoSvg(size, opts.rounded ?? true), { fitTo: { mode: 'width', value: size } }).render().asPng());

/** Single-image ICO (PNG-compressed entries, supported everywhere modern). */
export function ico(sizes = [16, 32, 48]): Buffer {
  const images = sizes.map((s) => png(s));
  const head = Buffer.alloc(6 + 16 * images.length);
  head.writeUInt16LE(1, 2);
  head.writeUInt16LE(images.length, 4);
  let offset = head.length;
  images.forEach((img, i) => {
    const o = 6 + i * 16;
    head.writeUInt8(sizes[i] % 256, o);
    head.writeUInt8(sizes[i] % 256, o + 1);
    head.writeUInt16LE(1, o + 4);
    head.writeUInt16LE(32, o + 6);
    head.writeUInt32LE(img.length, o + 8);
    head.writeUInt32LE(offset, o + 12);
    offset += img.length;
  });
  return Buffer.concat([head, ...images]);
}
