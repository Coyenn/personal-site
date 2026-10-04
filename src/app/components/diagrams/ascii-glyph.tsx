import { cn } from "@/lib/utils";

// Each mark uses the same six-pixel stroke, independent of font metrics. For
// rules of any length, the ascii-dashes and ascii-bars utilities in globals.css
// repeat the same "-" and "|" strokes as a background.
const paths = {
  "|": "M4 5V11",
  "+": "M1 8H7M4 5V11",
} as const;

export function AsciiGlyph({ character }: { character: keyof typeof paths }) {
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

export function PlusMark() {
  return (
    <span className="shrink-0 text-secondary select-none" aria-hidden="true">
      <AsciiGlyph character="+" />
    </span>
  );
}

export function DashFill({ className }: { className?: string }) {
  return (
    <span
      className={cn("ascii-dashes h-4 min-w-6 flex-1 px-1 text-secondary", className)}
      aria-hidden="true"
    />
  );
}
