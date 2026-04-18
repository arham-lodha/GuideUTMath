# Site

This directory contains the Astro build of the guide. The human-authored content lives at the repo root (`../README.md`, `../CONTRIBUTING.md`, `../STEWARDSHIP.md`, `../sections/`, `../contributors/`); the site reads from there via Astro's `glob` content loader.

## Running locally

```sh
cd site
npm install
npm run dev
```

Then open <http://localhost:4321/GuideUTMath/>. The trailing slash matters.

To build a production bundle:

```sh
npm run build       # outputs to site/dist
npm run preview     # serves dist/ locally
```

If the repo name on GitHub is something other than `GuideUTMath`, either the CI job (`.github/workflows/deploy.yml`) picks that up automatically from `github.event.repository.name`, or you can override locally with:

```sh
SITE_URL=https://example.com SITE_BASE=/ npm run dev
```

## Adding a new contributor response

The worked example is the grad-school section. The pattern generalizes to any `kind: 'structured'` section declared in `src/data/sections.ts`.

1. Make sure the contributor has a bio file at `../contributors/<slug>.md` (copy `../contributors/_template.md`). The slug is the filename without the `.md`.
2. Copy the response template from the section's README (e.g. `../sections/06-grad-school/README.md`) into a new file at `../sections/<section-folder>/responses/<slug>.md`.
3. Fill in the `answers:` map in the frontmatter. Keys must match the question ids declared in `src/data/sections.ts` for that section — if a key isn't in the map, that answer is silently skipped on the per-question view, and the per-contributor view shows "No answer provided."
4. Commit. On push to `main`, GitHub Actions rebuilds and deploys.

No site code changes are needed to add a contributor. The site picks up the new file automatically.

## Adding a new section

1. Create the folder under `../sections/XX-your-section/` with a `README.md`.
2. Add an entry to `sections` in `src/data/sections.ts`:
   - `slug`: the URL slug (no numeric prefix)
   - `folder`: the on-disk folder name (with numeric prefix)
   - `title`, `blurb`
   - `kind`: one of `'structured' | 'synthesized' | 'essays' | 'prose'`
   - For structured sections: `questions: [{ id, prompt, wordLimit? }, …]`
3. For structured sections, add the copy-me response template to the section's README so contributors know the question ids to use.

## How deployment works

`.github/workflows/deploy.yml` runs on every push to `main`:

1. `npm ci` in `site/`
2. `npm run build`, with `SITE_URL` and `SITE_BASE` derived from the GitHub repo so the build knows its own deployed URL
3. Uploads `site/dist` as a Pages artifact
4. Deploys via the official `actions/deploy-pages` action

You need to enable GitHub Pages for the repo once: Settings → Pages → Source → "GitHub Actions". After that, every push to `main` deploys.

### Moving to a custom domain

In `.github/workflows/deploy.yml`, set `SITE_URL` and `SITE_BASE` explicitly:

```yaml
env:
  SITE_URL: https://your-domain.example
  SITE_BASE: /
```

Add a `site/public/CNAME` file containing just the domain, configure the DNS A/CNAME records per the [GitHub Pages custom domain docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site), and redeploy.

## Directory map

```
site/
  astro.config.mjs           site, base, markdown plugins
  package.json
  src/
    content.config.ts        content collection schemas
    data/sections.ts         canonical section + question definitions
    lib/
      markdown.ts            marked + KaTeX for rendering frontmatter answers
      nav.ts                 sidebar nav data
    layouts/BaseLayout.astro
    components/
      Sidebar.astro
      ThemeToggle.astro
      ResponseCard.astro
      Prose.astro
    pages/
      index.astro                  → /
      contributing.astro           → /contributing/
      stewardship.astro            → /stewardship/
      contributors/
        index.astro                → /contributors/
        [slug].astro               → /contributors/<slug>/
      sections/
        index.astro                → /sections/
        [section]/
          index.astro              → /sections/<section>/
          by-contributor/
            [contributor].astro    → /sections/<section>/by-contributor/<slug>/
          by-question/
            [question].astro       → /sections/<section>/by-question/<q-id>/
    styles/global.css
  public/favicon.svg
```

Don't Panic.
