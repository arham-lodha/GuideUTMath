// Canonical section + question definitions.
//
// This file is the source of truth for:
//   - the ordered list of sections in the sidebar nav,
//   - the URL slug of each section (used in /sections/<slug>/...),
//   - the mapping from URL slug to on-disk folder name (e.g. 06-grad-school),
//   - for structured-response sections, the ordered list of questions, their
//     ids (used as keys in response frontmatter and as /by-question/<id>/ slugs),
//     and their prompts (rendered as headings on the site).
//
// To add a new section: append an entry here, create the folder under
// /sections, and — if it's a structured-response section — list its questions
// with ids matching what contributors will use in their response frontmatter.

export type Question = {
  /** Stable slug used in URLs and as the key in response frontmatter. */
  id: string;
  /** Full prompt text, rendered as a heading on question pages. */
  prompt: string;
  /** Soft word limit from the section README, shown as guidance. */
  wordLimit?: number;
};

export type SectionKind = 'structured' | 'synthesized' | 'essays' | 'prose';

export type SectionDef = {
  /** URL slug, e.g. 'grad-school'. */
  slug: string;
  /** On-disk folder name under /sections, e.g. '06-grad-school'. */
  folder: string;
  /** Human-readable title shown in nav and page headings. */
  title: string;
  /** Short one-line description for the section index. */
  blurb?: string;
  /** Determines which page templates render this section. */
  kind: SectionKind;
  /** Only populated for kind === 'structured'. */
  questions?: Question[];
};

// Only grad-school is fully fleshed out as the worked example. Other sections
// are listed so the sidebar nav is complete, but they won't render the
// structured-response views until questions are added here.
export const sections: SectionDef[] = [
  {
    slug: 'intro',
    folder: '01-intro',
    title: 'Intro & paths',
    kind: 'prose',
  },
  {
    slug: 'classes',
    folder: '02-classes',
    title: 'Classes',
    kind: 'synthesized',
  },
  {
    slug: 'professors',
    folder: '03-professors',
    title: 'Professors',
    kind: 'synthesized',
  },
  {
    slug: 'research',
    folder: '04-research',
    title: 'Research & REUs',
    kind: 'structured',
    // questions: [...] — fill in when the section is wired up.
  },
  {
    slug: 'study-abroad',
    folder: '05-study-abroad',
    title: 'Study abroad',
    kind: 'essays',
  },
  {
    slug: 'grad-school',
    folder: '06-grad-school',
    title: 'Applying to graduate school in math',
    blurb: 'How several contributors thought through the math PhD application process — where they agreed, where they disagreed, what they would do differently.',
    kind: 'structured',
    questions: [
      {
        id: 'list-building',
        prompt: 'Where did you apply, and roughly how did you build the list?',
        wordLimit: 250,
      },
      {
        id: 'letters',
        prompt: 'Who wrote your letters, how did you pick them, and when did you ask?',
        wordLimit: 250,
      },
      {
        id: 'sop',
        prompt: 'What was the core argument of your statement of purpose?',
        wordLimit: 300,
      },
      {
        id: 'gre',
        prompt: 'GRE and Math GRE: what did you do, and would you do it again?',
        wordLimit: 150,
      },
      {
        id: 'interviews',
        prompt: 'Interviews and visits: what were they actually like?',
        wordLimit: 200,
      },
      {
        id: 'decision',
        prompt: 'How did you make your final decision?',
        wordLimit: 250,
      },
      {
        id: 'mistakes',
        prompt: 'What did you get wrong or waste time on?',
        wordLimit: 200,
      },
      {
        id: 'advice-to-self',
        prompt: "One thing you'd tell yourself in September of senior year.",
        wordLimit: 100,
      },
    ],
  },
  {
    slug: 'fellowships',
    folder: '07-fellowships',
    title: 'Fellowships (NSF GRFP, etc.)',
    kind: 'structured',
  },
  {
    slug: 'other-paths',
    folder: '08-other-paths',
    title: 'Other paths',
    kind: 'essays',
  },
  {
    slug: 'honors-programs',
    folder: '09-honors-programs',
    title: "Honors programs & Dean's Scholars",
    kind: 'synthesized',
  },
  {
    slug: 'real-talk',
    folder: '10-real-talk',
    title: 'Real talk',
    kind: 'essays',
  },
];

export function getSection(slug: string): SectionDef | undefined {
  return sections.find((s) => s.slug === slug);
}

export function getSectionByFolder(folder: string): SectionDef | undefined {
  return sections.find((s) => s.folder === folder);
}

export function getStructuredSections(): SectionDef[] {
  return sections.filter(
    (s): s is SectionDef & { questions: Question[] } =>
      s.kind === 'structured' && Array.isArray(s.questions) && s.questions.length > 0,
  );
}
