// ─────────────────────────────────────────────────────────────
//  YOUR GARDEN
//  Seeds unlock as your total focus time grows.
//  Animals unlock in five different ways (see "Animals" below).
//  Change the numbers or names here if you like. Each animal's pixel
//  drawing, and which parts can be recoloured, is in src/lib/sprites.ts.
// ─────────────────────────────────────────────────────────────

export const SPECIES = [
  { id: 'oak', name: 'Oak', hours: 0 },
  { id: 'pine', name: 'Pine', hours: 0 },
  { id: 'cherry', name: 'Cherry blossom', hours: 0 },
  { id: 'birch', name: 'Birch', hours: 1 },
  { id: 'maple', name: 'Maple', hours: 3 },
  { id: 'cactus', name: 'Cactus', hours: 6 },
] as const;

// ── Animals ──
// Each animal moves in when ONE number reaches its goal:
//   posts:  posts on your site
//   hours:  total focused writing time, in hours
//   trees:  focus sessions finished (each one is a tree)
//   words:  words across all your posts
//   streak: your longest run of days in a row with a post or a focus session
export type Kind = 'posts' | 'hours' | 'trees' | 'words' | 'streak';
export type Animal = { sprite: string; emoji: string; name: string; kind: Kind; goal: number; flies?: boolean };

export const ANIMALS: Animal[] = [
  // posts
  { sprite: 'bunny', emoji: '🐇', name: 'Bunny', kind: 'posts', goal: 1 },
  { sprite: 'squirrel', emoji: '🐿️', name: 'Squirrel', kind: 'posts', goal: 3 },
  { sprite: 'hedgehog', emoji: '🦔', name: 'Hedgehog', kind: 'posts', goal: 5 },
  { sprite: 'fox', emoji: '🦊', name: 'Fox', kind: 'posts', goal: 8 },
  { sprite: 'owl', emoji: '🦉', name: 'Owl', kind: 'posts', goal: 12, flies: true },
  { sprite: 'deer', emoji: '🦌', name: 'Deer', kind: 'posts', goal: 16 },
  { sprite: 'turtle', emoji: '🐢', name: 'Turtle', kind: 'posts', goal: 20 },
  { sprite: 'raccoon', emoji: '🦝', name: 'Raccoon', kind: 'posts', goal: 30 },
  { sprite: 'bear', emoji: '🐻', name: 'Bear', kind: 'posts', goal: 40 },
  { sprite: 'peacock', emoji: '🦚', name: 'Peacock', kind: 'posts', goal: 50 },
  { sprite: 'unicorn', emoji: '🦄', name: 'Unicorn', kind: 'posts', goal: 75 },
  { sprite: 'dragon', emoji: '🐉', name: 'Dragon', kind: 'posts', goal: 100, flies: true },
  // focus hours
  { sprite: 'frog', emoji: '🐸', name: 'Frog', kind: 'hours', goal: 1 },
  { sprite: 'cat', emoji: '🐈', name: 'Cat', kind: 'hours', goal: 3 },
  { sprite: 'capybara', emoji: '🍊', name: 'Capybara', kind: 'hours', goal: 6 },
  { sprite: 'sloth', emoji: '🦥', name: 'Sloth', kind: 'hours', goal: 12 },
  { sprite: 'panda', emoji: '🐼', name: 'Panda', kind: 'hours', goal: 25 },
  { sprite: 'elephant', emoji: '🐘', name: 'Elephant', kind: 'hours', goal: 50 },
  // trees
  { sprite: 'butterfly', emoji: '🦋', name: 'Butterfly', kind: 'trees', goal: 3, flies: true },
  { sprite: 'goose', emoji: '🪿', name: 'Goose', kind: 'trees', goal: 10 },
  { sprite: 'giraffe', emoji: '🦒', name: 'Giraffe', kind: 'trees', goal: 25 },
  { sprite: 'llama', emoji: '🦙', name: 'Llama', kind: 'trees', goal: 50 },
  // words
  { sprite: 'penguin', emoji: '🐧', name: 'Penguin', kind: 'words', goal: 1000 },
  { sprite: 'pig', emoji: '🐷', name: 'Pig', kind: 'words', goal: 5000 },
  { sprite: 'monkey', emoji: '🐒', name: 'Monkey', kind: 'words', goal: 10000 },
  { sprite: 'crocodile', emoji: '🐊', name: 'Crocodile', kind: 'words', goal: 25000 },
  // streaks
  { sprite: 'axolotl', emoji: '🩷', name: 'Axolotl', kind: 'streak', goal: 3 },
  { sprite: 'zebra', emoji: '🦓', name: 'Zebra', kind: 'streak', goal: 7 },
  { sprite: 'flamingo', emoji: '🦩', name: 'Flamingo', kind: 'streak', goal: 14 },
  { sprite: 'lion', emoji: '🦁', name: 'Lion', kind: 'streak', goal: 30 },
];

export const KINDS: { kind: Kind; title: string; how: string }[] = [
  { kind: 'posts', title: 'For posting', how: 'Move in as your posts pile up.' },
  { kind: 'hours', title: 'For focus time', how: 'Move in as your focused writing hours grow.' },
  { kind: 'trees', title: 'For trees', how: 'Move in as you finish focus sessions.' },
  { kind: 'words', title: 'For words', how: 'Move in as you write more words in your posts.' },
  { kind: 'streak', title: 'For streaks', how: 'Move in when you write several days in a row (a post or a focus session counts).' },
];

export type Session = {
  id: string; // when it ended, as an ISO date
  species: string;
  seed: number;
  goal: number; // minutes
  minutes: number;
  words: number;
  sample?: boolean; // the example trees that come with the site
};

/** The numbers animals are unlocked by. */
export type Progress = { posts: number; hours: number; trees: number; words: number; streak: number };

const dayKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/** Longest run of days in a row with a post or a focus session. `postDays` are YYYY-MM-DD. */
export function bestStreak(postDays: string[], sessionIds: string[]) {
  const days = [...new Set([...postDays, ...sessionIds.map((id) => dayKey(new Date(id)))])].sort();
  let best = 0, run = 0, prev = 0;
  for (const d of days) {
    const t = Date.UTC(+d.slice(0, 4), +d.slice(5, 7) - 1, +d.slice(8, 10)) / 86_400_000;
    run = t - prev === 1 ? run + 1 : 1;
    prev = t;
    best = Math.max(best, run);
  }
  return best;
}

/** Work out the numbers from posts and focus sessions (sample trees don't count). */
export function progress(o: { posts: number; words: number; postDays: string[]; sessions: { id: string; minutes: number; sample?: boolean }[] }): Progress {
  const real = o.sessions.filter((s) => !s.sample);
  return {
    posts: o.posts,
    words: o.words,
    trees: real.length,
    hours: real.reduce((n, s) => n + s.minutes, 0) / 60,
    streak: bestStreak(o.postDays, real.map((s) => s.id)),
  };
}

export const unlocked = (a: Animal, p: Progress) => p[a.kind] >= a.goal;
export const unlockedAnimals = (p: Progress) => ANIMALS.filter((a) => unlocked(a, p));
/** The closest animal to moving in, with how far is left. */
export function nextAnimal(p: Progress) {
  const left = ANIMALS.filter((a) => !unlocked(a, p)).map((a) => ({ a, share: p[a.kind] / a.goal }));
  left.sort((x, y) => y.share - x.share);
  return left[0]?.a;
}

/** "12 posts", "3 hours", "7 days in a row"… */
export function goalText(a: Animal) {
  const n = a.goal;
  const plural = (w: string) => `${n.toLocaleString('en-US')} ${w}${n === 1 ? '' : 's'}`;
  return { posts: plural('post'), hours: `${n} hour${n === 1 ? '' : 's'} of focus`, trees: plural('tree'), words: plural('word'), streak: `${n} days in a row` }[a.kind];
}
/** "4 more posts", "1.5 more hours"… */
export function leftText(a: Animal, p: Progress) {
  const left = a.goal - p[a.kind];
  if (a.kind === 'hours') return `${hoursText(Math.ceil(left * 60))} more focus`;
  const n = Math.ceil(left);
  const w = { posts: 'post', trees: 'tree', words: 'word', streak: 'day', hours: '' }[a.kind];
  return a.kind === 'streak' ? `a ${a.goal}-day streak` : `${n.toLocaleString('en-US')} more ${w}${n === 1 ? '' : 's'}`;
}

export const totalMinutes = (sessions: Session[]) => sessions.reduce((n, s) => n + s.minutes, 0);
export const growth = (s: Session) => Math.min(2, s.minutes / s.goal);

export function hoursText(min: number) {
  if (min < 60) return `${min} min`;
  const h = min / 60;
  return `${h < 10 ? h.toFixed(1).replace(/\.0$/, '') : Math.round(h)} hour${h === 1 ? '' : 's'}`;
}

/** Count words in a post's text (ignores pictures, links' addresses and code fences). */
export function countWords(md: string) {
  const text = md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[\[[^\]]*\]\]/g, ' ');
  return (text.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? []).length;
}
