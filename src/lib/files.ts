import type { Post } from './tree';
import { findRefs } from './remark-refs.mjs';

// Every file sitting next to your posts gets a web address when the site is built.
const urls = import.meta.glob(
  '/src/content/posts/**/*.{pdf,PDF,txt,csv,json,py,js,ts,java,c,cpp,h,html,css,sql,r,R,m,tex,mp3,m4a,wav,ogg,mp4,mov,MOV,webm,png,PNG,jpg,JPG,jpeg,JPEG,gif,webp,svg,docx,pptx,xlsx,doc,ppt,xls,key,pages,numbers,zip}',
  { query: '?url', import: 'default', eager: true },
) as Record<string, string>;

export type Kind = 'pdf' | 'image' | 'text' | 'audio' | 'video' | 'other';
export interface Attachment { name: string; url: string; kind: Kind; ext: string; missing?: boolean }

const KINDS: Record<string, Kind> = {
  pdf: 'pdf',
  png: 'image', jpg: 'image', jpeg: 'image', gif: 'image', webp: 'image', svg: 'image',
  txt: 'text', csv: 'text', json: 'text', py: 'text', js: 'text', ts: 'text', java: 'text', c: 'text', cpp: 'text',
  h: 'text', html: 'text', css: 'text', sql: 'text', r: 'text', m: 'text', tex: 'text', md: 'text',
  mp3: 'audio', m4a: 'audio', wav: 'audio', ogg: 'audio',
  mp4: 'video', mov: 'video', webm: 'video',
};

const extOf = (name: string) => (name.split('?')[0].split('.').pop() ?? '').toLowerCase();

/** The files to show beside a post: the ones listed in `files:` plus any mentioned with [[ ]]. */
export function attachmentsFor(post: Post): Attachment[] {
  const dir = '/' + (post.entry.filePath ?? '').replace(/\\/g, '/').replace(/[^/]+$/, '');
  const names = [...post.data.files, ...findRefs(post.entry.body).map((r: { file: string }) => r.file).filter(Boolean)];
  const seen = new Set<string>();
  const list: Attachment[] = [];

  for (const name of names) {
    if (seen.has(name)) continue;
    seen.add(name);
    const ext = extOf(name);
    let url: string | undefined;
    if (/^https?:\/\//.test(name) || name.startsWith('/')) url = name; // a link, or a file in /public
    else url = urls[dir + name] ?? urls[dir + name.replace(/^\.\//, '')];
    if (!url) console.warn(`[files] "${name}" is mentioned in ${post.entry.filePath} but isn't in the same folder.`);
    list.push({ name: name.split('/').pop()!, url: url ?? '', kind: KINDS[ext] ?? 'other', ext, missing: !url });
  }
  return list;
}
