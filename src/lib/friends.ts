// Fetches your friends' /stats.json summaries (in the browser), with a short cache
// so moving between pages doesn't fetch everything again.
import { progress } from './garden';

export type Latest = { t: string; p: string; d: string; f: string; x: string; min: number; fm: number; icon: string };
export type Stats = {
  version?: number; private?: boolean; name?: string; title?: string; bio?: string; avatar?: string; builtAt?: string;
  postCount?: number; posts?: string[]; words?: number; colors?: Record<string, Record<string, string>>; friends?: string[]; latest?: Latest[];
  sessions?: { d: string; m: number; w?: number; s: string; seed: number; g: number }[];
};
export type Person = { url: string; host: string; self: boolean; stats?: Stats; error?: string };

export const host = (u: string) => u.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '').toLowerCase();
export const cleanUrl = (u: string) => `https://${host(u)}`;

async function load(url: string, self: boolean): Promise<Person> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  const h = self ? host(location.host) : host(url);
  try {
    const res = await fetch(`${self ? '' : url}/stats.json`, { cache: 'no-store', signal: ctrl.signal });
    if (!res.ok) throw new Error(res.status === 404 ? 'needs the newest version of the site' : `error ${res.status}`);
    return { url, host: h, self, stats: await res.json() };
  } catch (e) {
    return { url, host: h, self, error: (e as Error).name === 'AbortError' ? 'didn’t answer' : (e as Error).message || 'couldn’t be reached' };
  } finally {
    clearTimeout(timer);
  }
}

/** You first, then each friend. Cached for `maxAgeMin` minutes in this browser tab. */
export async function loadPeople(friendUrls: string[], maxAgeMin = 10): Promise<Person[]> {
  const key = 'friends-cache:' + friendUrls.map(host).sort().join(',');
  try {
    const cached = JSON.parse(sessionStorage.getItem(key) ?? 'null');
    if (cached && Date.now() - cached.at < maxAgeMin * 60_000) return cached.people;
  } catch {}
  const people = await Promise.all([load(location.origin, true), ...friendUrls.map((u) => load(cleanUrl(u), false))]);
  try { sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), people })); } catch {}
  return people;
}

/** How you and a friend are connected. */
export function connection(me: string, them: Person, myFriends: string[]) {
  const iAdded = myFriends.map(host).includes(them.host);
  const theyAdded = (them.stats?.friends ?? []).map(host).includes(host(me));
  return iAdded && theyAdded ? 'mutual' : iAdded ? 'waiting' : theyAdded ? 'added-you' : 'none';
}

/** Everything your friends posted, newest first. */
export function feed(people: Person[]) {
  return people
    .filter((p) => !p.self && p.stats && !p.stats.private)
    .flatMap((p) => (p.stats!.latest ?? []).map((post) => ({ person: p, post })))
    .sort((a, b) => b.post.d.localeCompare(a.post.d));
}

// "New" means posted after you last opened the Friends page.
export const lastSeen = () => {
  try { return localStorage.getItem('friends-seen') ?? ''; } catch { return ''; }
};
export const markSeen = () => {
  try { localStorage.setItem('friends-seen', new Date().toISOString()); } catch {}
};

/** A friend's garden numbers, worked out from their summary. */
export const statsProgress = (s: Stats) =>
  progress({
    posts: s.postCount ?? (s.posts ?? []).length,
    words: s.words ?? 0,
    postDays: s.posts ?? [],
    sessions: (s.sessions ?? []).map((x) => ({ id: x.d, minutes: x.m })),
  });
export const statsSessions = (s: Stats) =>
  (s.sessions ?? []).map((x) => ({ id: x.d, species: x.s, seed: x.seed, goal: x.g, minutes: x.m, words: x.w ?? 0 }));
