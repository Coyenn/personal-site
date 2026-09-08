// Each mark uses the same six-pixel stroke, independent of font metrics.
const paths = {
  "-": "M1 8H7",
  "|": "M4 5V11",
  "+": "M1 8H7M4 5V11",
  ">": "M1 5L7 8L1 11",
  "<": "M7 5L1 8L7 11",
  "^": "M1 11L4 5L7 11",
  v: "M1 5L4 11L7 5",
} as const;

export type AsciiMark = keyof typeof paths;

export function isAsciiMark(character: string): character is AsciiMark {
  return Object.hasOwn(paths, character);
}

export function AsciiGlyph({ character }: { character: AsciiMark }) {
  return (
    <svg
      aria-hidden="true"
      className="block h-4 w-2 shrink-0 select-none"
      data-ascii-mark={character}
      viewBox="0 0 8 16"
      fill="none"
    >
      <path d={paths[character]} stroke="currentColor" strokeWidth="1" strokeLinecap="butt" />
    </svg>
  );
}
