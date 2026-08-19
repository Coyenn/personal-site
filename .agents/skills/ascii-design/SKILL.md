---
name: ascii-design
description: Design accessible, minimal websites that visually resemble ASCII and Unicode layouts while using normal HTML and CSS. Use when creating text-inspired interfaces, wireframes, or animated character diagrams.
---

# ASCII Design

- Keep the design minimal; preserve the user's existing identity and headings.
- Use normal responsive CSS: grid, flexbox, padding, margins, gaps, and breakpoints.
- Keep the whole layout left-top-aligned with the same small X/Y padding; use a narrow max-width.
- Apply the same alignment and spacing rules to landmarks such as headers, navs, and footers.
- Use ASCII and Unicode as tasteful visual material: small dividers, arrows, markers, diagrams, and aligned details.
- Examples: `→ read`, `↳ note`, `· status`, `… loading`, `⌁ signal`, and `┌─┐` diagram corners.
- Visual decorative elements should be non-selectable. If possible, use SVG graphics even if the graphic appears as a unicode character.
- Visual decorative elements should be secondary color so they are visually distinct from normal text.
- Keep text decoration sparse, intentional, and balanced by whitespace.
- Use an intentional spacing rhythm suited to text composition; prefer repeated units over arbitrary gaps.
- Choose one casing language for UI labels and keep it consistent, apart from proper nouns.
- Use primary-colored text selectively when it improves hierarchy or emphasis; keep it tasteful.
- Give every page at least one purposeful primary-colored element so the interface does not feel flat.
- Prefer contextual underline treatments, including pixelated or varied underline styles, when they fit.
- Keep normal pages unframed; reserve ASCII boxes for diagrams or illustrations.
- Use semantic HTML: landmarks, heading hierarchy, lists, links, buttons, articles, dates, captions, and skip links.
- Never put meaningful content only in CSS, pseudo-elements, canvas, or animation.
- Give diagrams a textual explanation and respect `prefers-reduced-motion`.
- Animate only when it explains content; periodically swap Unicode characters for loading bars, spinners, or state changes, and vary opacity for pulses or glows. Never directly move elements with translation or position animation.
- Prefer a custom, theme-based focus outline; do not use borders, rings, or shadows for page framing.
