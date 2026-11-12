// A small public summary of your site, read by your friends' Friends pages:
// your writing stats, your newest posts, and who you've added as friends.
// Set "visibility" to "private" in Pages CMS (Profile & look) to share nothing but your name.
import site from '../site.config';
import garden from '../data/garden.json';
import friends from '../data/friends.json';
import { getTree, allPosts, findFolder } from '../lib/tree';
import { excerpt } from '../lib/plain';
import { countWords, type Session } from '../lib/garden';
import { animalColors } from '../lib/garden-data';

export async function GET() {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
  if (site.visibility === 'private') {
    return new Response(JSON.stringify({ version: 2, private: true, name: site.author }), { headers });
  }
  const tree = await getTree();
  const posts = allPosts(tree);
  const day = (d: Date) => d.toISOString().slice(0, 10);
  const host = (u: string) => u.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '').toLowerCase();
  const body = {
    version: 3,
    private: false,
    name: site.author,
    title: site.title,
    bio: site.bio,
    avatar: site.profileImage,
    builtAt: new Date().toISOString(),
    postCount: posts.length,
    words: posts.reduce((n, p) => n + countWords(p.entry.body ?? ''), 0),
    colors: animalColors(),
    posts: posts.filter((p) => p.data.date).map((p) => day(p.data.date!)),
    sessions: (garden.sessions as Session[])
      .filter((s) => !s.sample)
      .map((s) => ({ d: s.id, m: s.minutes, w: s.words, s: s.species, seed: s.seed, g: s.goal })),
    friends: (friends.friends as { url: string }[]).filter((f) => f?.url).map((f) => host(f.url)),
    latest: posts
      .filter((p) => p.data.date)
      .slice(0, 20)
      .map((p) => ({
        t: p.data.title,
        p: `/${p.path}/`,
        d: p.data.date!.toISOString(),
        f: p.folderPath ? findFolder(tree, p.folderPath)?.name ?? '' : '',
        x: p.data.description || excerpt(p.entry.body ?? ''),
        min: p.minutes,
        fm: p.data.focusMinutes ?? 0,
        icon: p.data.icon ?? '',
      })),
  };
  return new Response(JSON.stringify(body), { headers });
}
