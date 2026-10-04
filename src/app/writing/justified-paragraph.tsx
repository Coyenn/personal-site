import { lineText, prepare, solve } from "@kitlangton/justice";
import type { ComponentProps } from "react";

import { columnWidth } from "@/lib/column";

type JustifiedParagraphProps = Omit<ComponentProps<"p">, "children"> & { text: string };

// Akkurat Mono's printable glyphs have a 620-unit advance in a 1000-unit em.
// The site's base font size is 14px. From the md breakpoint up, where the
// justified lines show, the text column is always columnWidth wide.
const glyphAdvance = (620 / 1000) * 14;
const graphemes = new Intl.Segmenter("en", { granularity: "grapheme" });

export function JustifiedParagraph({ text, ...props }: JustifiedParagraphProps) {
  const prepared = prepare(
    text,
    (fragment) => Array.from(graphemes.segment(fragment)).length * glyphAdvance,
  );
  const { lines } = solve(prepared, columnWidth);

  return (
    <p {...props}>
      {/* Narrower columns stay ragged: CSS justification opens wide gaps between monospace words. */}
      <span className="block md:sr-only md:select-none">{text}</span>
      {/* geometricPrecision keeps fractional advances; Chrome on Linux otherwise rounds each glyph to 9px and the lines overrun. */}
      <span className="hidden [text-rendering:geometricPrecision] md:block" aria-hidden="true">
        {lines.map((line, index) => (
          <span
            key={index}
            className="block whitespace-nowrap"
            style={{
              wordSpacing: `${line.wordSpacing}px`,
              letterSpacing: `${line.tracking}px`,
              marginLeft: `${-line.opening}px`,
            }}
          >
            {lineText(prepared, line)}
          </span>
        ))}
      </span>
    </p>
  );
}
