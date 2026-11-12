import { getCollection, type CollectionEntry } from 'astro:content';
import site from '../site.config';

export type PostData = CollectionEntry<'posts'>['data'] & { title: string };

export interface Post {
  path: string; // URL path, e.g. "study/biology/cell-basics"
  folderPath: string; // e.g. "study/biology" ('' for top level)
  entry: CollectionEntry<'posts'>;
  data: PostData;
  minutes: number; // reading time
}

export interface Folder {
  path: string;
  name: string;
  icon?: string;
  description?: string;
  order: number;
  folders: Folder[];
  posts: Post[];
  count: number; // posts in this folder and everything inside it
}

let cache: Promise<Folder> | undefined;
export function getTree() {
  return (cache ??= build());
}

function prettify(name: string) {
  return name.replace(/[-_]+/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
}

async function build(): Promise<Folder> {
  const entries = await getCollection('posts', (e) => import.meta.env.DEV || !e.data.draft);
  const root: Folder = { path: '', name: 'Home', order: 0, folders: [], posts: [], count: 0 };

  for (const entry of entries) {
    const slugParts = entry.id.split('/');
    // Original folder names (with capitals/spaces) from the file path, for display.
    const rel = (entry.filePath ?? '').replace(/\\/g, '/').split('content/posts/').pop() ?? '';
    const nameParts = rel.split('/').slice(0, -1);
    const folderSlugs = slugParts.slice(0, -1);

    let node = root;
    folderSlugs.forEach((slug, i) => {
      const path = folderSlugs.slice(0, i + 1).join('/');
      let child = node.folders.find((f) => f.path === path);
      if (!child) {
        const cfg = site.folders[path] ?? {};
        child = {
          path,
          name: cfg.name ?? prettify(nameParts[i] ?? slug),
          icon: cfg.icon,
          description: cfg.description,
          order: cfg.order ?? 999,
          folders: [],
          posts: [],
          count: 0,
        };
        node.folders.push(child);
      }
      node = child;
    });

    const fileName = (rel.split('/').pop() ?? entry.id).replace(/\.md$/i, '');
    const data = { ...entry.data, title: entry.data.title || prettify(fileName) };
    const words = (entry.body ?? '').split(/\s+/).filter(Boolean).length;
    node.posts.push({
      path: entry.id,
      folderPath: folderSlugs.join('/'),
      entry,
      data,
      minutes: Math.max(1, Math.round(words / 200)),
    });
  }

  finish(root);
  return root;
}

// Newest first; posts without a date go last, in alphabetical order.
export function byDate(a: Post, b: Post) {
  return (b.data.date?.valueOf() ?? -Infinity) - (a.data.date?.valueOf() ?? -Infinity) || a.data.title.localeCompare(b.data.title);
}

function finish(folder: Folder): number {
  folder.posts.sort(byDate);
  folder.folders.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
  folder.count = folder.posts.length + folder.folders.reduce((n, f) => n + finish(f), 0);
  return folder.count;
}

export function allFolders(folder: Folder): Folder[] {
  return folder.folders.flatMap((f) => [f, ...allFolders(f)]);
}

export function allPosts(folder: Folder): Post[] {
  return [...folder.posts, ...folder.folders.flatMap(allPosts)].sort(byDate);
}

export function findFolder(root: Folder, path: string): Folder | undefined {
  if (!path) return root;
  return allFolders(root).find((f) => f.path === path);
}

// The chain of folders from the top down to `path`, for breadcrumbs.
export function trail(root: Folder, path: string): Folder[] {
  const parts = path ? path.split('/') : [];
  return parts
    .map((_, i) => findFolder(root, parts.slice(0, i + 1).join('/')))
    .filter((f): f is Folder => Boolean(f));
}

export function formatDate(d: Date) {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}

export function isImage(icon?: string) {
  return !!icon && /^(\/|https?:|data:)/.test(icon);
}

export function tagSlug(tag: string) {
  return tag.toLowerCase().trim().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
}

export function allTags(root: Folder) {
  const map = new Map<string, { name: string; slug: string; posts: Post[] }>();
  for (const p of allPosts(root)) {
    for (const name of p.data.tags) {
      const slug = tagSlug(name);
      if (!slug) continue;
      if (!map.has(slug)) map.set(slug, { name, slug, posts: [] });
      map.get(slug)!.posts.push(p);
    }
  }
  return [...map.values()].sort((a, b) => b.posts.length - a.posts.length || a.name.localeCompare(b.name));
}
