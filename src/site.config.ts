// ─────────────────────────────────────────────────────────────
//  YOUR SITE SETTINGS
//  Everything that makes the site feel like yours lives here.
//  Images, icons and fonts go in the /public folder; refer to
//  them below starting with a slash, e.g. '/images/me.jpg'.
// ─────────────────────────────────────────────────────────────

import profile from './data/profile.json';

const site = {
  // Your name, bio, profile picture, background picture, tab icon and links
  // live in src/data/profile.json, so you can also change them from Pages CMS
  // in your browser (see README). Edit that file for:
  //   title, author, bio, url, profileImage, favicon, background, links
  ...profile,
  // fallbacks, in case something in profile.json is left empty
  profileImage: profile.profileImage || '/images/profile.svg',
  favicon: profile.favicon || '📓',
  links: (profile.links ?? []).filter((l) => l && l.url),
  // 'public' = your stats can appear on friends' leaderboards and search engines can list your site.
  // 'private' = your stats stay hidden and search engines are asked not to list your site.
  visibility: (profile as { visibility?: string }).visibility === 'private' ? 'private' : 'public',
  background: {
    image: profile.background?.image || '',
    panelOpacity: profile.background?.panelOpacity ?? 0.88,
    blur: profile.background?.blur ?? 6,
  },

  // ── Fonts ────────────────────────────────────────────────
  // Step 1: list every font you want to use and give each a short nickname.
  //   Google Fonts:  { family: 'Lora', google: true }
  //   Your own file: { family: 'My Font', file: '/fonts/my-font.woff2' }
  //                  (put the file in public/fonts/; .woff2, .woff, .ttf, .otf all work)
  //   On the computer already: { family: 'Georgia' }
  //   fallback: what to show while it loads: 'serif', 'sans-serif', 'monospace' or 'cursive'
  // Every font listed here gets loaded, so delete ones you stop using.
  fontLibrary: {
    literata: {
      family: 'Literata',
      google: 'Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;1,7..72,400',
      fallback: 'serif',
    },
    grotesk: { family: 'Familjen Grotesk', google: 'Familjen+Grotesk:wght@500;700', fallback: 'sans-serif' },
    mono: { family: 'JetBrains Mono', google: 'JetBrains+Mono:wght@400;600', fallback: 'monospace' },
    handwriting: { family: 'Caveat', google: 'Caveat:wght@400;600', fallback: 'cursive' },
    // myfont: { family: 'My Font', file: '/fonts/my-font.woff2', fallback: 'sans-serif' },
  } as Record<string, { family: string; google?: boolean | string; file?: string; fallback?: string }>,

  // Step 2: choose which nickname is used where.
  fonts: {
    body: 'literata', // post text
    heading: 'grotesk', // titles and headings
    ui: 'grotesk', // sidebar, dates, menus, buttons
    code: 'mono', // code blocks
  },

  // Sizes, in pixels.
  text: {
    size: 17, // normal post text
    lineHeight: 1.7, // space between lines (1.5 = tight, 1.9 = airy)
    headingScale: 1.25, // how much bigger each heading level is (1.2 subtle → 1.5 dramatic)
    sidebarSize: 15, // sidebar menu text
    readerControls: true, // show A− / A+ buttons on posts so readers can resize text
  },

  // You can also give a folder or a single post its own font and size.
  //   In `folders` below:      'random/late-night': { font: 'handwriting', fontSize: 22 }
  //   At the top of a post:    font: handwriting
  //                            headingFont: grotesk
  //                            fontSize: 20
  // And inside any post, wrap words to switch font just there:
  //   <span class="font-handwriting">like this</span>

  // Colors for light mode and dark mode (the site follows the visitor's setting).
  colors: {
    light: {
      paper: '#EEF1F4', // page background
      ink: '#1C2430', // text
      accent: '#3346A8', // links and highlights
      highlight: '#F5E27A', // the highlighter mark on the page you're reading
    },
    dark: {
      paper: '#161B23',
      ink: '#E3E7EE',
      accent: '#9AAAFF',
      highlight: '#6B5D1C',
    },
  },

  // ── Journal app (yoursite.com/write) ─────────────────────
  // Fill these in once and the app on your phone only needs your access key.
  journal: {
    github: {
      owner: '', // your GitHub username, e.g. 'janedoe'
      repo: '', // your blog's repository name, e.g. 'my-blog'
      branch: 'main',
    },
    defaultFolder: 'journal', // where new entries go unless you pick another folder
    defaultPrivate: false, // true = new entries start as "only me" drafts
  },

  // ── Garden (yoursite.com/garden) ─────────────────────────
  // Trees from your focus sessions and the animals you unlock by posting.
  // Seeds and animals themselves are listed in src/lib/garden.ts.
  garden: {
    title: 'My garden',
    showOnHome: true, // show a small preview on the home page
    pixelTrees: true, // draw trees as chunky pixel art (false = smooth drawings)
  },

  // Optional: nicer names, icons, descriptions and ordering for your folders.
  // Keys are the folder path inside src/content/posts/ (lowercase, spaces become dashes).
  // Icons can be emoji or image paths. Folders not listed here still show up automatically.
  folders: {
    study: {
      name: 'Study notes',
      icon: '📚',
      description: 'Notes from whatever I’m learning right now.',
      order: 1,
    },
    'study/biology': { name: 'Biology', icon: '🧬' },
    'study/math': { name: 'Math', icon: '📐' },
    random: {
      name: 'Random thoughts',
      icon: '💭',
      description: 'Anything else on my mind.',
      order: 2,
    },
    journal: { name: 'Journal', icon: '📔', description: 'Written on the go.', order: 3 },
    'random/late-night': { name: 'Late-night ideas', icon: '🌙', font: 'handwriting', fontSize: 23 },
  } as Record<
    string,
    { name?: string; icon?: string; description?: string; order?: number; font?: string; headingFont?: string; fontSize?: number }
  >,
};

export default site;
