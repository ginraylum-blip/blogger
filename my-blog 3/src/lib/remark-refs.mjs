// Turns [[ ... ]] in your posts into links to an attached file.
//
//   [[p. 4]]                      page 4 of the post's first file
//   [[lecture-3.pdf]]             open that file
//   [[lecture-3.pdf p. 4]]        page 4 of that file
//   [[code.py L12]]               line 12 of a text or code file
//   [[talk.mp3 3:15]]             3 minutes 15 seconds into audio or video
//   [[p. 4 | the Krebs cycle]]    choose the words that show up

const FILE = /^(\S+\.[A-Za-z0-9]{1,5})(?:\s+|$)/;

/** Reads what's inside [[ ]] and returns { file, page, line, time, label }. */
export function parseRef(inner) {
  let [spec, label] = inner.split('|').map((s) => s.trim());
  const out = { file: '', page: 0, line: 0, time: 0, label: label || '' };
  const fm = spec.match(FILE);
  if (fm) {
    out.file = fm[1];
    spec = spec.slice(fm[0].length).trim();
  }
  let m;
  if ((m = spec.match(/^(?:p\.?|pp?\.?|pages?)\s*(\d+)/i))) out.page = Number(m[1]);
  else if ((m = spec.match(/^(?:l|lines?)\s*(\d+)/i))) out.line = Number(m[1]);
  else if ((m = spec.match(/^(?:(\d+):)?(\d{1,2}):(\d{2})$/))) out.time = Number(m[1] || 0) * 3600 + Number(m[2]) * 60 + Number(m[3]);
  else if ((m = spec.match(/^(\d+)$/))) out.page = Number(m[1]);
  else if (spec && !out.file) return null; // not a reference, leave the text alone

  if (!out.label) {
    const where = out.page ? `p. ${out.page}` : out.line ? `line ${out.line}` : out.time ? fmtTime(out.time) : '';
    const name = out.file ? out.file.replace(/\.[^.]+$/, '') : '';
    out.label = [name, where].filter(Boolean).join(' · ') || out.file;
  }
  return out;
}

export function fmtTime(s) {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return (h ? `${h}:${String(m).padStart(2, '0')}` : `${m}`) + `:${String(sec).padStart(2, '0')}`;
}

/** All the [[ ]] references in a piece of text. */
export function findRefs(text) {
  return [...(text ?? '').matchAll(/\[\[([^\]\n]+)\]\]/g)].map((m) => parseRef(m[1])).filter(Boolean);
}

export default function remarkRefs() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      // join neighbouring text pieces first, so [[ and ]] are never split apart
      const merged = [];
      for (const child of node.children) {
        const prev = merged[merged.length - 1];
        if (child.type === 'text' && prev && prev.type === 'text') prev.value += child.value;
        else merged.push(child);
      }
      node.children = merged.flatMap((child) => {
        if (child.type !== 'text' || !child.value.includes('[[')) {
          if (child.type !== 'code' && child.type !== 'inlineCode') walk(child);
          return [child];
        }
        const parts = [];
        let last = 0;
        for (const m of child.value.matchAll(/\[\[([^\]\n]+)\]\]/g)) {
          const ref = parseRef(m[1]);
          if (!ref) continue;
          if (m.index > last) parts.push({ type: 'text', value: child.value.slice(last, m.index) });
          const loc = ref.page ? `#page=${ref.page}` : ref.line ? `#L${ref.line}` : ref.time ? `#t=${ref.time}` : '';
          parts.push({
            type: 'link',
            url: `${ref.file || '__first'}${loc}`,
            data: {
              hProperties: {
                className: ['ref'],
                'data-file': ref.file,
                'data-page': ref.page || undefined,
                'data-line': ref.line || undefined,
                'data-time': ref.time || undefined,
              },
            },
            children: [{ type: 'text', value: ref.label }],
          });
          last = m.index + m[0].length;
        }
        if (last < child.value.length) parts.push({ type: 'text', value: child.value.slice(last) });
        return parts;
      });
    };
    walk(tree);
  };
}
