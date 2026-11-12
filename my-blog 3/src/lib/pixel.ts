// Turns a tree drawing into chunky pixel art, right in the browser.
import { TREE_COLORS } from './focus-tree';

// the tree colors, plus a soil shadow so trunks meet the ground cleanly
const colors = [...Object.values(TREE_COLORS).flatMap((c) => [c.fill, c.stroke]), '#a8927c', '#b9a68f'];
const palette = [...new Set(colors.filter(Boolean) as string[])].map((hex) => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
]);
const cache = new Map<string, string>();

/** Returns an image (as a data URL) `artWidth` pixels wide, snapped to the tree colors. */
export async function pixelate(svg: string, artWidth: number): Promise<string> {
  const w = Math.max(8, Math.round(artWidth));
  const key = `${w}|${svg}`;
  if (cache.has(key)) return cache.get(key)!;
  const img = new Image();
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  await img.decode();
  const h = Math.round((w * 156) / 180);
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h);
  const d = data.data;
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] < 110) { d[i + 3] = 0; continue; }
    // snap to the nearest tree color, so every pixel is a clean, solid color
    const r = d[i], g = d[i + 1], b = d[i + 2];
    let best = palette[0], dist = Infinity;
    for (const p of palette) {
      const dd = (p[0] - r) ** 2 + (p[1] - g) ** 2 + (p[2] - b) ** 2;
      if (dd < dist) { dist = dd; best = p; }
    }
    d[i] = best[0]; d[i + 1] = best[1]; d[i + 2] = best[2]; d[i + 3] = 255;
  }
  ctx.putImageData(data, 0, 0);
  const url = canvas.toDataURL();
  cache.set(key, url);
  return url;
}

/** Swap the tree drawing inside `el` for a pixel version. One art pixel = `px` screen pixels. */
export async function pixelateInto(el: HTMLElement, svg: string, px = 3) {
  let width = el.clientWidth;
  if (!width || !el.firstElementChild) el.innerHTML = svg; // something to show while the pixel version is made
  for (let tries = 0; !width && tries < 10; tries++) {
    // …and if it isn't on screen yet (say, a window that's just opening), wait a moment
    await new Promise((r) => requestAnimationFrame(r));
    width = el.clientWidth;
  }
  if (!width) return;
  try {
    const url = await pixelate(svg, width / px);
    const label = svg.match(/aria-label="([^"]*)"/)?.[1] ?? '';
    el.innerHTML = `<img class="pixel-tree" src="${url}" alt="${label}">`;
  } catch {
    el.innerHTML = svg;
  }
}

/** Pixelate every element marked data-pixel-tree on the page. */
export function pixelatePage(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-pixel-tree]').forEach((el) => {
    const svg = el.querySelector('svg')?.outerHTML;
    if (svg) pixelateInto(el, svg, Number(el.dataset.pixelTree) || 3).then(() => el.classList.add('pixel-ready'));
  });
}
