import { lineText, prepare, solve } from "@kitlangton/justice";
import type { ComponentProps } from "react";

type JustifiedParagraphProps = Omit<ComponentProps<"p">, "children"> & { text: string };

// Akkurat Mono's printable glyphs have a 620-unit advance in a 1000-unit em.
// The site's base font size is 14px and its desktop text column is 480px.
const glyphAdvance = (620 / 1000) * 14;
const desktopColumnWidth = 480;
const graphemes = new Intl.Segmenter("en", { granularity: "grapheme" });

export function JustifiedParagraph({ text, ...props }: JustifiedParagraphProps) {
  const prepared = prepare(
    text,
    (fragment) => Array.from(graphemes.segment(fragment)).length * glyphAdvance,
  );
  const { lines } = solve(prepared, desktopColumnWidth);

  return (
    <p {...props}>
      <span className="block text-justify md:sr-only md:select-none">{text}</span>
      <span className="hidden md:block" aria-hidden="true">
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
