// Draws a garden as HTML: one tree per focus session, plus animals wandering about.
// Used for your own garden (built with the site) and for friends' gardens (built in the browser).
import { treeSvg } from './focus-tree';
import { SPECIES, growth, type Session } from './garden';
import { spriteSvg, type AllColors } from './sprites';

type SceneAnimal = { sprite: string; name: string; flies?: boolean };

// small, repeatable "randomness" so a garden looks the same on every visit
const jitter = (n: number, k: number) => {
  const x = Math.sin(n * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
};
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const speciesName = (id: string) => SPECIES.find((s) => s.id === id)?.name ?? 'Tree';
const date = (iso: string) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

export function gardenSceneHtml(o: { sessions: Session[]; animals: readonly SceneAnimal[]; colors?: AllColors; limit?: number; pixel?: boolean; empty?: string }) {
  const shown = [...o.sessions].sort((a, b) => a.id.localeCompare(b.id)).slice(o.limit ? -o.limit : 0);
  const PER_ROW = 7, ROW = 62, TOP = 104;
  const rows = Math.max(1, Math.ceil(shown.length / PER_ROW));
  const height = TOP + (rows - 1) * ROW + 54;
  const parts: string[] = [];

  if (!shown.length) parts.push(`<p class="garden-empty">${esc(o.empty ?? 'Nothing growing yet. Start a focus session in the Journal app, and your first tree grows here.')}</p>`);
  shown.forEach((s, i) => {
    const row = Math.floor(i / PER_ROW), col = i % PER_ROW;
    const g = growth(s);
    const size = 66 + 56 * Math.min(1, g);
    const x = Math.min(93, Math.max(7, ((col + 0.5 + (row % 2 ? 0.45 : 0)) / (PER_ROW + 0.5)) * 100 + (jitter(i, 1) - 0.5) * 5));
    const y = TOP + row * ROW + (jitter(i, 2) - 0.5) * 10;
    const label = `${speciesName(s.species)}, ${s.minutes} min on ${date(s.id)}`;
    parts.push(
      `<div class="g-tree" style="left:${x.toFixed(2)}%;top:${(y - size * 0.83).toFixed(0)}px;width:${size.toFixed(0)}px;z-index:${row + 1}" title="${esc(label)}"${o.pixel ? ' data-pixel-tree="3"' : ''}>${treeSvg(g, s.seed, { species: s.species, label, inline: o.pixel })}</div>`,
    );
  });
  o.animals.forEach((a, i) => {
    const lane = Math.floor(jitter(i, 3) * rows);
    const y = a.flies ? 8 + jitter(i, 4) * 34 : TOP + lane * ROW + 4 + jitter(i, 5) * 16;
    const from = 4 + jitter(i, 6) * 40;
    const to = Math.min(94, from + 25 + jitter(i, 7) * 40);
    const dur = 14 + jitter(i, 8) * 16;
    const delay = -jitter(i, 9) * dur;
    parts.push(
      `<span class="g-animal${a.flies ? ' flies' : ''}" style="--from:${from.toFixed(1)}%;--to:${to.toFixed(1)}%;--dur:${dur.toFixed(1)}s;--delay:${delay.toFixed(1)}s;top:${y.toFixed(0)}px;z-index:${a.flies ? 99 : lane + 1}" title="${esc(a.name)}"><span class="g-flip"><span class="g-hop">${spriteSvg(a.sprite, 2.5, a.name, o.colors?.[a.sprite])}</span></span></span>`,
    );
  });
  return { html: parts.join(''), height, label: `A garden with ${shown.length} trees and ${o.animals.length} animals` };
}
