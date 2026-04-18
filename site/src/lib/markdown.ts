// Small wrapper around `marked` + `marked-katex-extension` for rendering
// markdown strings that live inside frontmatter (e.g. contributor answers).
//
// Astro's built-in markdown pipeline only runs on the body of .md files, so
// frontmatter strings need their own renderer. We keep the config minimal:
// GFM on, KaTeX on, nothing fancy.

import { Marked } from 'marked';
import markedKatex from 'marked-katex-extension';

const marked = new Marked({
  gfm: true,
  breaks: false,
});

marked.use(
  markedKatex({
    throwOnError: false,
    nonStandard: true,
  }),
);

/** Render a markdown string to HTML (with KaTeX for $...$ and $$...$$). */
export function renderMarkdown(src: string): string {
  if (!src) return '';
  return marked.parse(src) as string;
}
