import { defineConfig } from 'astro/config';
import site from './src/site.config.ts';
import remarkRefs from './src/lib/remark-refs.mjs';

export default defineConfig({
  site: site.url,
  trailingSlash: 'ignore',
  markdown: {
    remarkPlugins: [remarkRefs],
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
