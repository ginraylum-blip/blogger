// Run with: npm run new
// Asks a couple of questions, then creates a new post file for you.
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { readdirSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = 'src/content/posts';
const rl = createInterface({ input: stdin, output: stdout });

function folders(dir, list = []) {
  for (const d of readdirSync(dir, { withFileTypes: true })) {
    if (d.isDirectory() && !d.name.startsWith('.')) {
      const full = join(dir, d.name);
      list.push(relative(ROOT, full).replace(/\\/g, '/'));
      folders(full, list);
    }
  }
  return list;
}

const slugify = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'untitled';

try {
  console.log('\n✏️  New post\n');
  let title = '';
  while (!title) title = (await rl.question('Title: ')).trim();

  const list = folders(ROOT);
  console.log('\nWhich folder?');
  list.forEach((f, i) => console.log(`  ${String(i + 1).padStart(2)}. ${f}`));
  console.log('   0. Top level (no folder)');
  console.log('   Or type a new folder name, like  study/chemistry\n');
  const answer = (await rl.question('Folder: ')).trim();

  let folder = '';
  if (/^\d+$/.test(answer)) folder = Number(answer) === 0 ? '' : list[Number(answer) - 1] ?? '';
  else if (answer) folder = answer.split('/').map(slugify).join('/');

  const dir = join(ROOT, folder);
  mkdirSync(dir, { recursive: true });
  let file = join(dir, `${slugify(title)}.md`);
  for (let n = 2; existsSync(file); n++) file = join(dir, `${slugify(title)}-${n}.md`);

  const today = new Date().toISOString().slice(0, 10);
  writeFileSync(
    file,
    `---\ntitle: ${JSON.stringify(title)}\ndate: ${today}\ndescription: ""\ntags: []\n---\n\nStart writing here.\n`,
  );
  console.log(`\n✅ Created ${file.replace(/\\/g, '/')}\n   Open it, write, save. If "npm run dev" is running, it shows up right away.\n`);
} finally {
  rl.close();
}
