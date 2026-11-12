import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Treat empty values ("" or blank) as "not set", so half-filled posts never break the site.
const blank = (v: unknown) => (v === '' || v === null ? undefined : v);
const optional = <T extends z.ZodTypeAny>(schema: T) => z.preprocess(blank, schema.optional());
const flag = z.preprocess(blank, z.boolean().default(false));

// Every .md file anywhere inside src/content/posts/ becomes a post.
// The folders you put them in become the sections of your site.
// Everything at the top of a post is optional: a file with just text in it works too.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: optional(z.string()), // if left out, the file name is used
    date: optional(z.coerce.date()),
    updated: optional(z.coerce.date()), // shows "Updated …" under the title
    description: optional(z.string()),
    tags: z.preprocess(
      (v) => (Array.isArray(v) ? v.filter(Boolean).map(String) : typeof v === 'string' && v ? v.split(',').map((t) => t.trim()) : []),
      z.array(z.string()),
    ),
    files: z.preprocess(
      (v) => (Array.isArray(v) ? v.filter(Boolean).map(String) : typeof v === 'string' && v ? [v] : []),
      z.array(z.string()),
    ), // files shown beside the post, e.g. [lecture-3.pdf]
    icon: optional(z.string()),
    pinned: flag, // keep at the top of the home page
    draft: flag, // hidden from the live site
    font: optional(z.string()), // a nickname from fontLibrary in site.config.ts
    headingFont: optional(z.string()),
    fontSize: optional(z.coerce.number()), // in pixels
    focusMinutes: optional(z.coerce.number()), // added by the journal app's focus tree
  }),
});

export const collections = { posts };
