// Draws a little tree as SVG. `progress` goes from 0 (a seed) to 1 (fully grown);
// past 1 it starts to blossom, up to 2 (covered in flowers).
// Every session gets its own `seed`, so no two trees look the same.

export type Species = 'oak' | 'pine' | 'cherry' | 'birch' | 'maple' | 'cactus';

type Segment = { x1: number; y1: number; x2: number; y2: number; w: number; b0: number; b1: number };
type Dot = { x: number; y: number; r: number; b: number; shade: number };
type Mark = { x: number; y: number; dx: number; b: number };
type Shape = { segments: Segment[]; leaves: Dot[]; blossoms: Dot[]; marks: Mark[] };

const STYLE: Record<string, { trunk: number; spread: number; leaf: number; ratio: number; leaves: string[]; bloom: string; bloomCenter: string; wood: string }> = {
  oak: { trunk: 34, spread: 0.5, leaf: 6, ratio: 0.66, leaves: ['t-l1', 't-l2', 't-l3'], bloom: 't-bloom', bloomCenter: 't-bloom-c', wood: 't-wood' },
  cherry: { trunk: 32, spread: 0.6, leaf: 6, ratio: 0.66, leaves: ['t-c1', 't-c2', 't-c3'], bloom: 't-bloom-w', bloomCenter: 't-bloom-c', wood: 't-wood-dark' },
  maple: { trunk: 33, spread: 0.55, leaf: 6.5, ratio: 0.66, leaves: ['t-m1', 't-m2', 't-m3'], bloom: 't-bloom-gold', bloomCenter: 't-m2', wood: 't-wood' },
  birch: { trunk: 37, spread: 0.36, leaf: 4.5, ratio: 0.68, leaves: ['t-b1', 't-b2', 't-b3'], bloom: 't-catkin', bloomCenter: 't-b3', wood: 't-birch' },
};

const cache = new Map<string, Shape>();

function random(seed: number) {
  let s = seed >>> 0 || 1;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function build(seed: number, kind: string): Shape {
  const key = `${kind}:${seed}`;
  if (cache.has(key)) return cache.get(key)!;
  const st = STYLE[kind] ?? STYLE.oak;
  const r = random(seed);
  const segments: Segment[] = [];
  const leaves: Dot[] = [];
  const blossoms: Dot[] = [];
  const marks: Mark[] = [];
  const DEPTH = 5;
  const STEP = 0.13;

  function branch(x: number, y: number, angle: number, len: number, w: number, depth: number, b0: number) {
    const x2 = x + Math.cos(angle) * len;
    const y2 = y - Math.sin(angle) * len;
    const b1 = b0 + STEP + 0.04;
    segments.push({ x1: x, y1: y, x2, y2, w, b0, b1 });
    if (kind === 'birch' && w > 3) {
      for (let k = 0; k < 3; k++) {
        const t = 0.15 + r() * 0.7;
        marks.push({ x: x + (x2 - x) * t, y: y + (y2 - y) * t, dx: w * 0.45, b: b1 });
      }
    }
    if (depth <= 3 && depth > 0 && r() < 0.8) {
      leaves.push({ x: x2 + (r() - 0.5) * 8, y: y2 - r() * 6, r: st.leaf * 0.7 + r() * 3, b: b1 + 0.01, shade: r() });
    }
    if (depth === 0) {
      for (let i = 0; i < 3; i++) {
        leaves.push({ x: x2 + (r() - 0.5) * 16, y: y2 + (r() - 0.6) * 14, r: st.leaf + r() * 6, b: 0.5 + r() * 0.42, shade: r() });
      }
      if (r() < 0.8) blossoms.push({ x: x2 + (r() - 0.5) * 18, y: y2 + (r() - 0.6) * 16, r: 2.6 + r() * 1.6, b: 1 + r() * 0.95, shade: r() });
      return;
    }
    const n = depth >= 4 ? 2 : r() < 0.35 ? 3 : 2;
    for (let i = 0; i < n; i++) {
      const spread = st.spread + r() * 0.3;
      const a = angle + (i - (n - 1) / 2) * spread + (r() - 0.5) * 0.3;
      branch(x2, y2, a, len * (st.ratio + r() * 0.1), w * 0.66, depth - 1, b0 + STEP);
    }
  }

  branch(100, 172, Math.PI / 2 + (r() - 0.5) * 0.08, st.trunk, kind === 'birch' ? 7 : 9, DEPTH, 0.02);
  const shape = { segments, leaves, blossoms, marks };
  cache.set(key, shape);
  return shape;
}

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const f1 = (n: number) => n.toFixed(1);

function sprout(p: number, parts: string[]) {
  if (p >= 0.06) return;
  parts.push(`<ellipse cx="100" cy="168" rx="5" ry="3.6" class="t-seed"/>`);
  if (p > 0.015) {
    const h = ((p - 0.015) / 0.045) * 10;
    parts.push(`<path d="M100 168 q-1 ${f1(-h / 2)} 0 ${f1(-h)}" class="t-wood" stroke-width="2" fill="none"/>`);
    parts.push(`<ellipse cx="103" cy="${f1(168 - h)}" rx="${f1(h / 3)}" ry="${f1(h / 6)}" class="t-l1"/>`);
  }
}

function branchy(p: number, seed: number, kind: string, parts: string[]) {
  const st = STYLE[kind] ?? STYLE.oak;
  const { segments, leaves, blossoms, marks } = build(seed, kind);
  for (const s of segments) {
    if (p <= s.b0) continue;
    const t = clamp((p - s.b0) / (s.b1 - s.b0));
    const w = Math.max(1.2, s.w * (0.45 + 0.55 * clamp(p / 0.9)));
    parts.push(`<line x1="${f1(s.x1)}" y1="${f1(s.y1)}" x2="${f1(s.x1 + (s.x2 - s.x1) * t)}" y2="${f1(s.y1 + (s.y2 - s.y1) * t)}" stroke-width="${f1(w)}" class="${st.wood}"/>`);
  }
  for (const m of marks) {
    if (p <= m.b) continue;
    parts.push(`<line x1="${f1(m.x - m.dx)}" y1="${f1(m.y)}" x2="${f1(m.x + m.dx * 0.3)}" y2="${f1(m.y)}" stroke-width="1.3" class="t-birch-mark"/>`);
  }
  for (const l of leaves) {
    if (p <= l.b) continue;
    const k = clamp((p - l.b) / 0.12);
    const cls = st.leaves[l.shade < 0.33 ? 0 : l.shade < 0.66 ? 1 : 2];
    parts.push(`<circle cx="${f1(l.x)}" cy="${f1(l.y)}" r="${f1(l.r * k)}" class="t-leaf ${cls}"/>`);
  }
  for (const b of blossoms) {
    if (p <= b.b) continue;
    const k = clamp((p - b.b) / 0.08);
    parts.push(`<circle cx="${f1(b.x)}" cy="${f1(b.y)}" r="${f1(b.r * k)}" class="${st.bloom}"/>`);
    parts.push(`<circle cx="${f1(b.x)}" cy="${f1(b.y)}" r="${f1(b.r * k * 0.35)}" class="${st.bloomCenter}"/>`);
  }
}

function pine(p: number, seed: number, parts: string[]) {
  const r = random(seed);
  const trunkH = 112 * clamp(p / 0.85);
  if (trunkH > 0) parts.push(`<line x1="100" y1="172" x2="100" y2="${f1(172 - trunkH)}" stroke-width="${f1(3 + 4 * clamp(p))}" class="t-wood"/>`);
  const tiers = 6;
  const cones: string[] = [];
  for (let i = 0; i < tiers; i++) {
    const birth = 0.12 + i * 0.12;
    if (p <= birth) continue;
    const k = clamp((p - birth) / 0.18);
    const baseY = 160 - i * 17;
    const half = (40 - i * 5.5) * k + (r() - 0.5) * 2;
    const h = (34 - i * 2) * k;
    parts.push(`<polygon points="${f1(100 - half)},${f1(baseY)} ${f1(100 + half)},${f1(baseY)} 100,${f1(baseY - h)}" class="${i % 2 ? 't-p2' : 't-p1'}"/>`);
    for (let c = 0; c < 2; c++) {
      const cb = 1 + r() * 0.9;
      const cx = 100 + (r() - 0.5) * half * 1.4;
      if (p > cb) cones.push(`<ellipse cx="${f1(cx)}" cy="${f1(baseY - 3)}" rx="2.2" ry="3.4" class="t-cone"/>`);
    }
  }
  parts.push(...cones);
}

function cactus(p: number, seed: number, parts: string[]) {
  const r = random(seed);
  const h = 98 * clamp(p / 0.8);
  if (h <= 0) return;
  const top = 172 - h;
  const arms: [number, number, number, number][] = []; // side, attach y, out, birth
  arms.push([-1, 172 - 42 - r() * 10, 18 + r() * 4, 0.42]);
  arms.push([1, 172 - 60 - r() * 10, 18 + r() * 4, 0.6]);
  for (const [side, y, out, birth] of arms) {
    if (p <= birth || 172 - y > h) continue;
    const k = clamp((p - birth) / 0.2);
    const x = 100 + side * out;
    parts.push(`<path d="M100 ${f1(y)} H${f1(x)} V${f1(y - 32 * k)}" class="t-cactus" stroke-width="11" fill="none"/>`);
  }
  parts.push(`<line x1="100" y1="172" x2="100" y2="${f1(top)}" class="t-cactus" stroke-width="${f1(10 + 10 * clamp(p))}"/>`);
  parts.push(`<line x1="96" y1="168" x2="96" y2="${f1(top + 6)}" class="t-cactus-rib" stroke-width="1.2"/>`);
  parts.push(`<line x1="104" y1="168" x2="104" y2="${f1(top + 6)}" class="t-cactus-rib" stroke-width="1.2"/>`);
  if (p > 1) {
    const tips: [number, number][] = [[100, top - 4]];
    for (const [side, y, out] of arms) tips.push([100 + side * out, y - 36]);
    const count = Math.ceil((p - 1) * 6);
    for (let i = 0; i < count; i++) {
      const [x, y] = tips[i % tips.length];
      const dx = (r() - 0.5) * 8;
      parts.push(`<circle cx="${f1(x + dx)}" cy="${f1(y + r() * 3)}" r="3.4" class="t-flower"/>`, `<circle cx="${f1(x + dx)}" cy="${f1(y + r() * 3)}" r="1.2" class="t-bloom-c"/>`);
    }
  }
}

// The same colors as src/styles/trees.css, for drawing trees as pixel art.
export const TREE_COLORS: Record<string, { fill?: string; stroke?: string }> = {
  't-soil': { fill: '#d9cbb8' }, 't-seed': { fill: '#8a6a4f' },
  't-wood': { stroke: '#7a5a43' }, 't-wood-dark': { stroke: '#5a3d2e' }, 't-birch': { stroke: '#ebe7de' }, 't-birch-mark': { stroke: '#3b3532' },
  't-l1': { fill: '#5f9e5a' }, 't-l2': { fill: '#76b26a' }, 't-l3': { fill: '#4a8a55' },
  't-c1': { fill: '#f4b6c8' }, 't-c2': { fill: '#f8cfdb' }, 't-c3': { fill: '#ec9db5' },
  't-m1': { fill: '#e0702a' }, 't-m2': { fill: '#c9452a' }, 't-m3': { fill: '#f0a43a' },
  't-b1': { fill: '#9ccc65' }, 't-b2': { fill: '#b8db7e' }, 't-b3': { fill: '#82b44c' },
  't-p1': { fill: '#2f6b4f' }, 't-p2': { fill: '#3c8461' }, 't-cone': { fill: '#8a5a3b' },
  't-cactus': { stroke: '#5c9a5a' }, 't-cactus-rib': { stroke: '#457c44' },
  't-bloom': { fill: '#f6c6d6' }, 't-bloom-w': { fill: '#ffffff' }, 't-bloom-gold': { fill: '#f7d36b' },
  't-bloom-c': { fill: '#f5d76e' }, 't-catkin': { fill: '#c7b46a' }, 't-flower': { fill: '#ef6f8e' },
};

// Put the colors right on the shapes (needed to turn the drawing into pixels).
function inlineColors(svg: string) {
  return svg.replace(/class="([^"]+)"/g, (m, cls: string) => {
    let attrs = '';
    for (const c of cls.split(' ')) {
      const col = TREE_COLORS[c];
      if (col?.fill) attrs += ` fill="${col.fill}"`;
      if (col?.stroke) attrs += ` stroke="${col.stroke}" stroke-linecap="round"`;
    }
    return `${m}${attrs}`;
  });
}

export function treeSvg(progress: number, seed: number, opts: { label?: string; species?: string; inline?: boolean } = {}) {
  const p = Math.max(0, Math.min(2, progress));
  const kind = opts.species ?? 'oak';
  const parts: string[] = [`<ellipse cx="100" cy="174" rx="58" ry="9" class="t-soil"/>`];
  sprout(p, parts);
  if (kind === 'pine') pine(p, seed, parts);
  else if (kind === 'cactus') cactus(p, seed, parts);
  else branchy(p, seed, kind, parts);
  const label = opts.label ?? 'A growing tree';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 28 180 156" class="tree-svg" role="img" aria-label="${label}"><title>${label}</title>${parts.join('')}</svg>`;
  return opts.inline ? inlineColors(svg) : svg;
}
