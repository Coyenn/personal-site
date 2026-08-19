---
name: technical-typograms
description: >-
  Create technical typograms: framed, monospace, character-grid diagrams for
  nested geometry, tables, flows, architecture, state machines, memory layouts,
  and similar. Use when the user asks for a typogram, ASCII diagram, technical
  diagram, animated diagram, or an illustrated figure in the site's ASCII style.
---

# Technical Typograms

Draw the picture on a character grid. Do not generate Mermaid or D2 and convert
it. [Typograms](https://google.github.io/typograms/) are typographic (WYSIWYG).
[D2 ASCII](https://d2lang.com/blog/ascii/) is the opposite trade-off: semantic
source, no styles, no motion. Kinds come from Typograms genres and the
[ASCII Diagrams](https://asciidiagrams.github.io/) encoding catalog.

Follow [ascii-design](../ascii-design/SKILL.md) for page, color, accessibility,
and motion. This skill covers the diagram only.

For the character set and kind catalog, see [primitives.md](primitives.md).
For north-star drafts, see [examples.md](examples.md).

## North star

One framed figure. Generous air. One claim.

- Outer frame: `+` corners, spaced `-` and `|` edges. No CSS border, outline,
  ring, or shadow.
- Title sits in the top edge as `[ TITLE ]`, primary color.
- Structure and labels are foreground or secondary. Primary marks only the
  title and the thing being taught (corners, bars, the active row).
- Labels live on the grid. Numbers right-align. A formula or caption may sit
  under the picture, still inside the frame.
- Keep pages unframed. Reserve this box for the diagram.

## Workflow

1. Write the claim in one line. That line is `[ TITLE ]`.
2. Pick a kind from [primitives.md](primitives.md).
3. Draft the whole figure as aligned plain text first. If the grid is wrong
   on paper, the implementation will be wrong.
4. Implement the draft. Do not invent a second layout in CSS.
5. Add a textual explanation. Animate only if motion explains the claim.

## Implement

On this site, a typogram is semantic HTML styled like a terminal figure.

- Use `<figure>`. Put the meaning in a visible caption or an `sr-only` paragraph.
- Render the grid with `whitespace-pre` or a character-cell CSS grid. Keep
  columns aligned. Horizontal overflow may scroll; do not wrap mid-glyph.
- Decorative glyphs: `select-none`, `aria-hidden`, secondary color. Prefer SVG
  when a mark is purely visual and has a Unicode look (`+`, `→`, `█`).
- Meaningful labels stay in the accessibility tree as real text.
- Site rules still apply: `12px` type, no CSS framing, existing tokens only.
- Put reusable pieces next to `src/app/components/diagrams/`. Prefer explicit
  variants over boolean diagram modes.

For comments or markdown, emit the same aligned draft. Unicode box-drawing is
fine there; this site prefers `+ - |` for frames.

## Animate

Read [ascii-design](../ascii-design/SKILL.md) and obey it.

- Animate only when it explains the claim.
- Never translate or reposition. The grid stays still.
- Allowed motion: swap characters, change opacity, change color token.
- Honor `prefers-reduced-motion`: show the final still frame, no interval.
- Never put meaning only in motion, color, a pseudo-element, or a canvas.

Recipes:

| Claim              | Motion                                                            |
| ------------------ | ----------------------------------------------------------------- |
| A path or protocol | Walk the arrow by swapping `-` `=` `>` along the line             |
| A table of cost    | Count digits up; mark the active row with primary or full opacity |
| Nested geometry    | Pulse the corner glyphs (`╭╮╰╯` or `+`)                           |
| A process          | Type the next label; leave completed labels still                 |
| A state machine    | Swap the active marker (`*` `o` `●`); dim the rest                |
| Loading or wait    | Cycle a short spinner (`\| / - \\`) or bar (`[    ]` → `[====]`)  |

Match `src/app/components/diagrams/signal-diagram.tsx`: tick state on an
interval, derive the visible frame from the tick, stop under reduced motion.

## Do not

- Do not use CSS boxes as the frame.
- Do not author in Mermaid or D2.
- Do not crowd the grid or decorate for texture.
- Do not add CRT, blink, or fake terminal chrome.
