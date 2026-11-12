import site from '../site.config';

const library = site.fontLibrary;
const defaultFallback = { body: 'serif', heading: 'sans-serif', ui: 'sans-serif', code: 'monospace' } as const;
const fallbackStacks: Record<string, string> = {
  serif: 'Georgia, "Times New Roman", serif',
  'sans-serif': 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  monospace: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
  cursive: '"Comic Sans MS", "Segoe Print", cursive',
};

// "literata" → '"Literata", Georgia, "Times New Roman", serif'
export function fontStack(nickname: string | undefined, fallback = 'serif'): string | undefined {
  if (!nickname) return undefined;
  const font = library[nickname];
  if (!font) {
    console.warn(`[fonts] "${nickname}" isn't in fontLibrary in src/site.config.ts. Using the default font instead.`);
    return undefined;
  }
  return `"${font.family}", ${fallbackStacks[font.fallback ?? fallback] ?? fallbackStacks.serif}`;
}

export function roleStack(role: keyof typeof site.fonts) {
  return fontStack(site.fonts[role], defaultFallback[role]) ?? fallbackStacks[defaultFallback[role]];
}

export function googleFontsHref() {
  const families = Object.values(library)
    .filter((f) => f.google)
    .map((f) => (typeof f.google === 'string' ? f.google : f.family.replace(/ /g, '+')));
  return families.length
    ? `https://fonts.googleapis.com/css2?${families.map((g) => `family=${g}`).join('&')}&display=swap`
    : '';
}

const formatOf = (file: string) =>
  ({ woff2: 'woff2', woff: 'woff', ttf: 'truetype', otf: 'opentype' })[file.split('.').pop()!.toLowerCase()] ??
  'woff2';

// @font-face rules for your own files, plus a .font-<nickname> class for each font
export function fontCss() {
  return Object.entries(library)
    .map(([nick, f]) => {
      const face = f.file
        ? `@font-face{font-family:"${f.family}";src:url("${f.file}") format("${formatOf(f.file)}");font-display:swap;}`
        : '';
      return `${face}.font-${nick}{font-family:${fontStack(nick, f.fallback)};}`;
    })
    .join('\n');
}

// Font settings for one post: the post's own settings win, then the nearest folder's.
export function postTypography(folderPath: string, data: { font?: string; headingFont?: string; fontSize?: number }) {
  const parts = folderPath ? folderPath.split('/') : [];
  const chain = parts.map((_, i) => site.folders[parts.slice(0, i + 1).join('/')] ?? {}).reverse();
  const pick = <K extends 'font' | 'headingFont' | 'fontSize'>(k: K) =>
    data[k] ?? chain.find((c) => c[k] !== undefined)?.[k];

  const vars: string[] = [];
  const body = fontStack(pick('font'));
  const heading = fontStack(pick('headingFont'), 'sans-serif');
  const size = pick('fontSize');
  if (body) vars.push(`--post-font:${body}`);
  if (heading) vars.push(`--post-heading-font:${heading}`);
  if (size) vars.push(`--post-size:${size}px`);
  return vars.join(';');
}
