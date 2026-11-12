# My Notebook
 
A personal blog where **folders are sections**. Put a post in a folder and it shows up in
that section, with a file-tree menu on the side so you can browse everything.

```
src/content/posts/
├── study/                 → "Study notes"
│   ├── biology/
│   │   ├── cell-basics.md
│   │   └── cell-sketch.png   ← pictures can sit right next to the post
│   └── math/
└── random/                → "Random thoughts"
    └── late-night/
```

---

## One-time setup (about 15 minutes)

### 1. Put it on GitHub
1. Make a free account at github.com, then click **New repository**. Give it a name, leave everything else empty, click **Create**.
2. On the next page, click **uploading an existing file**, and drag in everything from inside the `my-blog` folder.
   *(Your computer may hide the files starting with a dot, like `.gitignore` and `.pages.yml`. Turn on "show hidden files" so you can drag those in too.)*
3. Click **Commit changes**.

### 2. Put it online with Vercel
1. Go to vercel.com and sign in with GitHub.
2. Click **Add New → Project**, choose your repository, click **Deploy**. No settings to change.
3. In a minute you get an address like `my-blog.vercel.app`. That's your site.

From now on, **every change saved to GitHub goes live by itself**, usually within a minute.

### 3. Use your own domain
1. Buy a domain (Vercel sells them, or use Namecheap, Cloudflare, Porkbun…).
2. In Vercel: your project → **Settings → Domains** → type your domain → **Add**.
3. If you bought it somewhere else, Vercel shows you one or two records to copy into that site's DNS settings. HTTPS is set up for you.
4. Put your domain in **Profile & look** (see below), in the "website address" box.

### 4. Set your Journal password (recommended)
This lets you sign in to the Journal app with a password instead of pasting GitHub keys into your phone.
The GitHub key stays hidden on Vercel's side.

1. **Make a GitHub key for Vercel to use.** On GitHub, open
   [Settings → Developer settings → Fine-grained tokens → Generate new token](https://github.com/settings/personal-access-tokens/new).
   Name it "Journal (Vercel)", pick the longest expiration you're comfortable with, choose
   **Only select repositories** → your blog, and under **Repository permissions** set **Contents** to **Read and write**.
   Click **Generate token** and copy it.
2. **Add two settings in Vercel:** your project → **Settings → Environment Variables**:
   - `JOURNAL_PASSWORD`: the password you'll type in the app. **At least 12 characters.** A short sentence works well.
   - `GITHUB_TOKEN`: the key you just copied.
3. **Redeploy once:** **Deployments** → the newest one → **⋯ → Redeploy**. (Settings only take effect on the next deploy.)

That's it. In the Journal app, open **☰ → Sign in**, type your password, and you stay signed in on that phone for 90 days.

- **Changing your password** (or the GitHub key) signs out every phone. Just sign in again.
- **Wrong guesses** are slowed down, and after 5 in a row there's a 15-minute wait.
- **Files over about 3 MB** (big PDFs) can't be sent through password sign-in. Make them smaller, or upload them in Pages CMS.
- The password protects **writing**, not reading. Your site is still public (see "Keep your journal private" below).
- Prefer the old way? You can still connect with a GitHub access key under **☰ → Or connect with a GitHub access key instead**.

### 5. Turn on the in-browser editor (recommended)
1. Go to **app.pagescms.org** and sign in with GitHub.
2. Allow it access to your blog repository.
3. Open your repository. You'll see **Posts** and **Profile & look** in the menu.

That's it. You never need to touch code again unless you want to.

---

## Writing posts

### The easy way: in your browser (works on your phone too)
In Pages CMS, open **Posts**, go into a folder, click **Add an entry**, write, and click **Save**.
Your site updates about a minute later. Pictures can be dragged straight into the post.

- **New section:** click **Add folder** in Posts.
- **Hide a post while you work on it:** tick **Draft**.
- **Keep a post on top of the home page:** tick **Pin**.

### From your iPhone: the Journal app
Your site comes with a little journal app at **yourdomain.com/write**.

**Set it up once:**
1. On your iPhone, open **yourdomain.com/write** in **Safari**.
2. Tap the **Share** button, then **Add to Home Screen**. You now have a "Journal" app icon.
3. Open it, tap **☰ → Sign in**, and type the password you set in step 4 of the setup.
   (No password set up? Use "Or connect with a GitHub access key instead": the app explains how to make the key.)

**Then just write:** open the app, type, tap **Publish**. It's on your site about a minute later.

- Everything you type is saved on your phone as you go, even with no signal. Close the app any time and pick up where you left off.
- **📁** picks the folder (new entries go to "Journal" unless you choose another, and you can make new folders from here).
- **📎** attaches a file (like lecture slides) to show beside the entry. Write `[[p. 4]]` to point at a page.
- **📷** adds photos. They're shrunk automatically. A line like `![Photo](./photo-1.jpg)` marks where it goes, so you can move that line around.
- **🔒 Only me** saves it as a draft that won't appear on your site.
- Pressing return once starts a new line, just like a notebook.
- **☰** shows everything you've sent from your phone.

**🌱 Focus tree:** tap **Focus**, pick how long you want to write (10 minutes to an hour), and plant a tree.
- It only grows while you're typing. Stop for 30 seconds or switch apps and it pauses, then picks up again when you type.
- The bar at the top shows your time. Reach your goal and the tree is fully grown; keep going and it blossoms.
- Tap **End session** to plant it in **your forest**, along with how many minutes and words it took. Today's total and all-time total are shown there too.
- Posts you publish during a session show "🌳 Written in 18 focused min" on your site.

**🌱 Seeds:** pick what to grow before you start: oak, pine and cherry blossom from day one;
birch unlocks after 1 hour of total focus time, maple after 3 hours, cactus after 6.

### Your garden 🌳
Everything you grow ends up in **yourdomain.com/garden** (and a small preview on your home page):

- **Every focus session is a tree.** Its kind is the seed you picked, and longer sessions make bigger trees
  (past your goal they blossom).
- **30 animals move in, five different ways.** Locked ones show as silhouettes so you know what's coming,
  and the journal app tells you when a new one arrives.

  | Earned by | Animals |
  | --- | --- |
  | **Posting** | bunny (1 post), squirrel (3), hedgehog (5), fox (8), owl (12), deer (16), turtle (20), raccoon (30), bear (40), peacock (50), unicorn (75), dragon (100) |
  | **Focus time** | frog (1 hour), cat (3), capybara (6), sloth (12), panda (25), elephant (50) |
  | **Trees** (focus sessions finished) | butterfly (3), goose (10), giraffe (25), llama (50) |
  | **Words** in your posts | penguin (1,000), pig (5,000), monkey (10,000), crocodile (25,000) |
  | **Streaks** (days in a row with a post or focus session; your best run counts) | axolotl (3 days), zebra (7), flamingo (14), lion (30) |

- **Give your animals your own colours.** In the Journal app, open 🌱 **Focus** and tap any animal in "Your forest".
  Each part (fur, mane, stripes, spots…) gets its own colour, from the swatches or any colour you like.
  The shape always stays the same. Tap **Save colours** and your garden updates about a minute later.
- Your trees are saved to the garden **every time you publish**. To save them without publishing, open
  🌱 Focus and tap "Show these trees in my garden now".
- It comes with a few example trees so you can see how it looks. They disappear the first time your own
  trees are saved.
- Everything is drawn as **little pixel art**: the animals are hand-drawn 16×16 sprites, and the trees are
  turned into pixels automatically. Prefer smooth trees? Set `garden.pixelTrees: false` in `src/site.config.ts`.
- Want different animals or milestones? Edit the list in `src/lib/garden.ts` (each animal has a `kind`,
  like `'posts'` or `'streak'`, and a `goal`). Each animal's drawing is a small grid of letters in
  `src/lib/sprites.ts` (every letter is a color, `.` is empty), and `PARTS` there lists which letters can
  be recoloured and what they're called.
  Hide the home page preview with `garden.showOnHome: false` in `src/site.config.ts`.

> **Keep your journal private:** "Only me" entries don't show on your site, but they're still saved in your
> GitHub repository. If your repository is public, anyone could find them there. To be safe, make the
> repository **private** (GitHub → your repository → Settings → scroll to the bottom → Change visibility).
> Vercel works the same with private repositories.

### On your computer
You'll need [Node.js](https://nodejs.org) installed. In the `my-blog` folder:

```bash
npm install        # first time only
npm run new        # asks for a title and folder, then makes the file
npm run dev        # preview at http://localhost:4321, updates as you type
npm run publish    # sends your changes to GitHub, and the site updates
```

### What goes at the top of a post
Everything is optional. A file with only text in it works, and its title comes from the file name.

```markdown
---
title: My first post
date: 2026-11-12
description: One line about it, shown in lists and search
tags: [school, ideas]
icon: 🌱
pinned: true        # keep on the home page
draft: true         # hide from the live site
updated: 2026-11-20 # shows "Updated Nov 20"
---

Write here. **Bold**, *italic*, lists, tables, links and code all work.

![a photo](./photo.jpg)     ← picture in the same folder as the post
```

Pictures are automatically shrunk and only load when a reader scrolls to them, so big photos are fine.

### Notes beside a file (lecture slides, readings, recordings…)

Attach a file to a post and it shows up **right beside your writing**. On a phone it sits in a bar at the
bottom that slides up.

1. **Add the file.** Put it in the same folder as the post (or upload it in Pages CMS under
   "Files to show beside this post", or tap **📎 File** in the Journal app).
2. **List it at the top of the post:**
   ```markdown
   files: [lecture-5.pdf]
   ```
3. **Point at spots in it** anywhere in your writing:

   | You write | Readers see | What it does |
   | --- | --- | --- |
   | `[[p. 4]]` | ↗ p. 4 | jumps the first file to page 4 |
   | `[[slides.pdf p. 4]]` | ↗ slides · p. 4 | page 4 of a specific file |
   | `[[p. 4 \| the Krebs diagram]]` | ↗ the Krebs diagram | your own words on the link |
   | `[[code.py L12]]` | ↗ code · line 12 | highlights line 12 of a text or code file |
   | `[[talk.mp3 3:15]]` | ↗ talk · 3:15 | plays a recording from 3 min 15 s |

As readers scroll your notes, the file **follows along** to whatever you're talking about, and the
paragraph they're reading lights up. They can turn that off with the "Follow along" box.

**What can be shown:** PDFs, pictures, text and code files, audio and video. Word, PowerPoint and other files
get a download button instead. Tip: save slides as PDF (File → Export / Save as PDF) to see them page by page.

See "Cellular respiration, my notes on lecture 5" in Study notes → Biology for an example.

---

## 🏆 Friends

The **Friends** page has two tabs:

- **What's new:** your friends' latest posts in one timeline, with who wrote it, which folder, when, and a
  short preview. Posts you haven't seen yet are marked **New**, and the Friends link in your sidebar shows a
  little number when there's something new.
- **Leaderboard:** this week, this month or all time, ranked by **focus time**, **trees**, **posts** or
  **streak** (days in a row with a post or a focus session), with everyone's newest trees and latest animal.

At the top you see each friend and how you're connected:
**🤝 Friends** (you've both added each other), **Hasn't added you yet**, or **🔒 Private**.

**How it works:** everyone has their own copy of this site. Each site shares a small public summary at
`yoursite.com/stats.json`, including its newest posts, its stats and which friends it has added. Your Friends
page reads your friends' summaries.

**Inviting a friend:**
1. Send them `notebook-starter.zip` (a clean copy with no posts) and point them to the README's
   "One-time setup". It takes about 15 minutes.
2. Swap website addresses. The easiest way is the **Journal app → ☰ → Friends**: type their address,
   tap **Add**, and it checks that their site works and saves it for you. (Pages CMS → **Friends** works too.)
   They do the same with yours, and you'll both show 🤝.

**Visiting a friend's garden:** on the Friends page, tap **🌳 Visit garden** under a friend's name (or their row
of trees on the leaderboard). You'll see their trees and animals, in the colours they picked.
Friends whose site is on an older version show up without their colours until they update.

Their posts and numbers update whenever their site rebuilds, which happens every time they publish or save
their garden.

**Public or private:** in Pages CMS → **Profile & look**, choose **Public** or **Private**.
- **Public:** your numbers show on friends' leaderboards, and search engines may list your site.
- **Private:** your summary shares only your name, so your posts don't appear in friends' feeds and your stats
  don't appear on leaderboards. Search engines are also asked not to list your site.

Private keeps you out of friends' feeds and leaderboards, but your blog is still a website that anyone with the link can open.
If you need the whole site locked behind a password, Vercel offers password protection on its paid plans.
Otherwise, keep anything truly personal off the site (or in a private notes app).

---

## Making it yours

| What | Where |
| --- | --- |
| Name, bio, profile picture, background picture, tab icon, links | **Profile & look** in Pages CMS (or `src/data/profile.json`) |
| Folder names, icons, descriptions, order | `folders` in `src/site.config.ts` |
| Fonts, text sizes, colors | `src/site.config.ts` |
| Your own icon images | Upload them, then use the path, like `/images/star.png`, anywhere an icon goes |

Tip: with a busy background picture, set "how solid the reading panels are" closer to 1 so text stays easy to read.

### Fonts and sizes

**1. Add fonts to `fontLibrary`** and give each a nickname:

```ts
fontLibrary: {
  literata:    { family: 'Literata', google: true, fallback: 'serif' },        // Google Font
  myfont:      { family: 'My Font', file: '/fonts/my-font.woff2' },           // your own file in public/fonts/
}
```

**2. Choose where each one is used** with `fonts`: `body` (post text), `heading` (titles),
`ui` (sidebar, dates, buttons) and `code` (code blocks).

**3. Give a folder its own font and size** in `folders`:

```ts
'random/late-night': { name: 'Late-night ideas', font: 'handwriting', fontSize: 23 },
```

Every post in that folder (and folders inside it) uses it.

**4. Give one post its own font and size** at the top of the post:

```markdown
---
title: A poem I wrote
date: 2026-11-12
font: handwriting
headingFont: literata
fontSize: 22
---
```

**5. Switch font for just a few words** inside a post:

```html
<span class="font-handwriting">this part looks handwritten</span>
<span class="font-myfont" style="font-size: 1.5em">this part is bigger</span>
```

Readers also get **A− / A / A+** buttons on each post to resize the text for themselves
(turn off with `text.readerControls: false`).

---

## What your readers get

- **Search** in the sidebar. Press <kbd>/</kbd> on a keyboard to jump to it.
- **Light / dark / automatic** switch next to your name, remembered for next time.
- **A− / A+** buttons to resize post text.
- **"On this page"** list on longer posts, so they can jump to a heading.
- **Reading time**, **tags** (click one to see every post with it) and **Copy** buttons on code.
- A menu that folds away on phones.

---
 
## If something goes wrong

- **The site didn't update:** in Vercel, open your project → **Deployments**. A red one means the last change had a problem. Click it to see which file.
- **Most common cause:** something at the top of the last post you edited, like a missing `---` line or a date written as `12/11/2026` instead of `2026-11-12`. Fix it and save again.
- **A font doesn't show:** check its nickname in the post matches one in `fontLibrary` exactly.
- **The Journal app says your access key isn't working:** keys expire. Make a new one (same steps) and paste it in ☰.
- **"The GitHub key saved in Vercel isn't working":** the key in `GITHUB_TOKEN` has expired. Make a new one (setup step 4),
  replace it in Vercel's Environment Variables, and redeploy. You'll need to sign in again on your phone.
- **"Password sign-in isn't switched on":** `JOURNAL_PASSWORD` or `GITHUB_TOKEN` is missing in Vercel, or you haven't
  redeployed since adding them.
- **A file beside a post says "Can't find":** it has to be in the same folder as the post, with the name spelled exactly the same.
- **A picture doesn't show:** check the capital letters in the file name match exactly. `Photo.JPG` and `photo.jpg` are different online.
