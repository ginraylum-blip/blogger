// Turns markdown into plain text (for search and short previews).
export function plain(md: string, max = 5000) {
  return (md ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[\[([^\]|]*\|)?([^\]]*)\]\]/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~|]+/g, ' ')
    .replace(/^\s*[-+]\s+/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

/** A short preview that ends on a whole word. */
export function excerpt(md: string, length = 220) {
  const text = plain(md, length + 40);
  if (text.length <= length) return text;
  return text.slice(0, text.lastIndexOf(' ', length)).replace(/[,.;:!?-]$/, '') + '…';
}
