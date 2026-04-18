// @ts-check
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Deployment URL config.
// Default is a GitHub Pages project site at <user>.github.io/GuideUTMath/.
// To switch to a custom domain, set SITE_URL and SITE_BASE env vars (or edit the
// defaults here) — e.g. SITE_URL=https://utmathguide.org SITE_BASE=/.
const SITE_URL = process.env.SITE_URL ?? 'https://example.github.io';
const SITE_BASE = process.env.SITE_BASE ?? '/GuideUTMath/';

export default defineConfig({
  site: SITE_URL,
  base: SITE_BASE,
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  build: {
    format: 'directory',
  },
});
