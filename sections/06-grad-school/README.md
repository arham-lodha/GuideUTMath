# Applying to graduate school in math

**Format:** structured responses (same questions, individual voice, attributed), with a short synthesized timeline up front.

This is likely the most-read section of the guide. The point is not to give one answer to the question "how do you apply to math PhD programs" but to let a reader see how six or seven different people who all ended up at strong programs actually thought through the process — including where they disagree.

## What goes here

- Timeline and logistics (synthesized)
- Building the school list
- Letters of recommendation
- The statement of purpose / personal statement
- The GRE and the math subject GRE (current status — check this every year)
- Interviews, visits, and decisions
- What didn't work, what you'd do differently

## Format

The steward drafts the synthesized timeline at the top. Everything else is structured responses — each contributor answers the questions below, and the section presents all responses for easy comparison.

## Contributor questions

Copy this into `responses/<your-slug>.md` (same slug as your file in `/contributors`). Answer in the `answers:` map in the frontmatter — each answer is markdown, so formatting, links, and math (`$x^2$`) all work. Word counts are soft but real — answers much longer than this tend not to get read.

```yaml
---
contributor: your-slug              # matches contributors/<your-slug>.md
section: grad-school
date: "Month Year"
answers:
  list-building: |
    Where did you apply, and roughly how did you build the list? (~250 words)

    How many schools, what was the logic? Reach/fit/safety framing, or by
    advisor, or by geography, or something else? What did you wish you'd known
    when building it?

  letters: |
    Who wrote your letters, how did you pick them, and when did you ask? (~250 words)

    You don't have to name them. Focus on the reasoning and the timing.

  sop: |
    What was the core argument of your statement of purpose? (~300 words)

    In one sentence, what was the claim your statement was making about you?
    How did you structure it? How many drafts? Who read it?

  gre: |
    GRE and Math GRE: what did you do, and would you do it again? (~150 words)

    Which programs required / recommended / didn't want which test, how much
    you studied, how it went. This changes fast — date your answer clearly.

  interviews: |
    Interviews and visits: what were they actually like? (~200 words)

    Who interviewed you, what did they ask, what did you ask them, what
    visits did you go on, what did you notice?

  decision: |
    How did you make your final decision? (~250 words)

    Between offers, or between the programs you got into. What did you weigh?
    What almost tipped it the other way? If you turned down a "bigger name"
    program, why?

  mistakes: |
    What did you get wrong or waste time on? (~200 words)

  advice-to-self: |
    One thing you'd tell yourself in September of senior year. (~100 words)
---
```

The question ids (`list-building`, `letters`, `sop`, …) are stable identifiers the site uses to assemble the per-question view. Don't rename them; if you want to add to a question, just write more in that block. Each `|` lets you write multi-line markdown while keeping it valid YAML.
