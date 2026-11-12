import { getTree, allPosts, findFolder } from '../lib/tree';
import { plain } from '../lib/plain';

// A small index of every post, used by the search box.
export async function GET() {
  const tree = await getTree();
  const items = allPosts(tree).map((p) => ({
    t: p.data.title,
    p: p.path,
    f: p.folderPath ? findFolder(tree, p.folderPath)?.name ?? '' : '',
    d: p.data.description ?? '',
    g: p.data.tags,
    x: plain(p.entry.body ?? ''),
  }));
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json' } });
}
