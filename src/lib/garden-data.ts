// Build-time helpers: your garden's numbers and animal colours, worked out from your posts.
import { getTree, allPosts } from './tree';
import { progress, countWords, type Session } from './garden';
import { cleanColors, type AllColors } from './sprites';
import garden from '../data/garden.json';
import colorsFile from '../data/animal-colors.json';

export const day = (d: Date) => d.toISOString().slice(0, 10);

export async function siteProgress() {
  const posts = allPosts(await getTree());
  const sessions = garden.sessions as Session[];
  return progress({
    posts: posts.length,
    words: posts.reduce((n, p) => n + countWords(p.entry.body ?? ''), 0),
    postDays: posts.filter((p) => p.data.date).map((p) => day(p.data.date!)),
    sessions,
  });
}

/** The colours you picked for your animals in the Journal app. */
export function animalColors(): AllColors {
  const raw = ((colorsFile as { colors?: AllColors }).colors ?? {}) as AllColors;
  const out: AllColors = {};
  for (const [name, c] of Object.entries(raw)) {
    const clean = cleanColors(name, c);
    if (Object.keys(clean).length) out[name] = clean;
  }
  return out;
}
