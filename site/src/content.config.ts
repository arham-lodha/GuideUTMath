import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Content lives at the repo root, one directory above site/. The `base` option
// on Astro's glob loader is a filesystem path relative to the project root
// (i.e. site/), so `../` reaches the repo root.
//
// We override `generateId` on every collection so the entry IDs stay
// predictable and readable (e.g. 'arham-lodha', '06-grad-school',
// '06-grad-school/arham-lodha') — useful for getEntry() lookups in pages.

// Contributor bios: contributors/*.md at the repo root.
// _template.md is excluded (it's the copy-me stub for new contributors).
// Placeholder files (e.g. _placeholder-example.md) are intentionally loaded
// so the site has something to render during scaffolding — the UI flags
// them with a "placeholder" banner so readers can't mistake them for real bios.
const contributors = defineCollection({
  loader: glob({
    pattern: ['*.md', '!_template.md'],
    base: '../contributors',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    name: z.string(),
    pronouns: z.string().optional(),
    graduated: z.string().optional(),
    now: z.string().optional(),
    interests: z.string().optional(),
    asks: z.array(z.string()).optional(),
    contact: z.string().optional(),
    lastUpdated: z.string().optional(),
    // Marks a file as a clearly-labeled placeholder — used by the UI to show
    // a banner so readers never mistake scaffolding for real content.
    placeholder: z.boolean().optional(),
  }),
});

// Structured responses: sections/<section-folder>/responses/*.md.
// ID format: '<section-folder>/<contributor-slug>', e.g.
// '06-grad-school/arham-lodha' — keeps section and contributor visible.
const responses = defineCollection({
  loader: glob({
    pattern: '*/responses/*.md',
    base: '../sections',
    generateId: ({ entry }) => {
      // entry looks like '06-grad-school/responses/arham-lodha.md'
      const parts = entry.replace(/\.md$/, '').split('/');
      // parts = ['06-grad-school', 'responses', 'arham-lodha']
      return `${parts[0]}/${parts[2]}`;
    },
  }),
  schema: z.object({
    // Slug of the contributor (matches contributors/<slug>.md).
    contributor: z.string(),
    // Section slug (matches a slug in src/data/sections.ts).
    section: z.string(),
    // Free-form date string shown to readers, e.g. "April 2026".
    date: z.string(),
    // Answers keyed by question id. Each value is a markdown string that will
    // be rendered at build time via marked + KaTeX.
    answers: z.record(z.string(), z.string()),
    placeholder: z.boolean().optional(),
  }),
});

// Section READMEs: the overview page for each section.
// ID = section folder name, e.g. '06-grad-school'.
const sectionDocs = defineCollection({
  loader: glob({
    pattern: '*/README.md',
    base: '../sections',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    title: z.string().optional(),
  }),
});

// Individual-essay files: any .md file directly inside a section folder that
// isn't a README. Excludes READMEs and anything inside responses/.
// ID format: '<section-folder>/<filename>'.
const essays = defineCollection({
  loader: glob({
    pattern: ['*/*.md', '!*/README.md', '!*/responses/*.md'],
    base: '../sections',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string().optional(),
    contributor: z.string().optional(),
    date: z.string().optional(),
    placeholder: z.boolean().optional(),
  }),
});

// Top-level repo docs: README, CONTRIBUTING, STEWARDSHIP.
// IDs preserve the original casing for readability: 'README', 'CONTRIBUTING', 'STEWARDSHIP'.
const docs = defineCollection({
  loader: glob({
    pattern: '{README,CONTRIBUTING,STEWARDSHIP}.md',
    base: '..',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string().optional(),
  }),
});

export const collections = { contributors, responses, sectionDocs, essays, docs };
