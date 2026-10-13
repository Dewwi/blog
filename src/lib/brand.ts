// Brand constants shared by CSS-free contexts (OG images, icons, manifest).
export const brand = {
  paper: '#f8f7f3',
  ink: '#15191d',
  accent: '#0f766e',
  muted: '#5d646c',
};

/** Geometric "D." monogram: no font dependency, so it renders identically everywhere. */
export const logoSvg = (size = 64, rounded = true) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64"><rect width="64" height="64" rx="${rounded ? 14 : 0}" fill="${brand.accent}"/><path fill="${brand.paper}" fill-rule="evenodd" d="M12 14H28A18 18 0 0 1 28 50H12ZM20 22V42H28A10 10 0 0 0 28 22Z"/><circle cx="53" cy="45" r="4" fill="${brand.paper}"/></svg>`;
