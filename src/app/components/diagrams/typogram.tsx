import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { AsciiGlyph, isAsciiMark } from "./ascii-glyph";

export const TYPOGRAM_WIDTH = 39;

export type TypogramTone = "frame" | "title" | "label" | "taught" | "muted";

export type TypogramSpan = {
  text: string;
  tone: TypogramTone;
  pulse?: boolean;
  selectNone?: boolean;
};

export type TypogramCell = {
  ch: string;
  tone: TypogramTone;
  pulse?: boolean;
  selectNone?: boolean;
};

export const typogramToneClassName: Record<TypogramTone, string> = {
  frame: "select-none text-secondary",
  title: "select-none text-primary",
  label: "text-foreground",
  taught: "text-primary",
  muted: "text-secondary",
};

function dashFill(length: number) {
  return Array.from({ length }, (_, index) => (index % 2 === 0 ? " " : "-")).join("");
}

export function createTypogramCells(width: number): TypogramCell[] {
  return Array.from({ length: width }, () => ({ ch: " ", tone: "frame" }));
}

export function writeTypogramCells(
  cells: TypogramCell[],
  column: number,
  text: string,
  tone: TypogramTone,
  pulse = false,
  selectNone = false,
) {
  if (column < 0 || column + text.length > cells.length) {
    throw new Error(`typogram write out of bounds: col ${column} text "${text}"`);
  }

  for (const [index, character] of Array.from(text).entries()) {
    cells[column + index] = { ch: character, tone, pulse, selectNone };
  }
}

export function collapseTypogramCells(cells: TypogramCell[]): TypogramSpan[] {
  const spans: TypogramSpan[] = [];

  for (const cell of cells) {
    const last = spans.at(-1);

    if (
      last &&
      last.tone === cell.tone &&
      Boolean(last.pulse) === Boolean(cell.pulse) &&
      Boolean(last.selectNone) === Boolean(cell.selectNone)
    ) {
      last.text += cell.ch;
      continue;
    }

    spans.push({
      text: cell.ch,
      tone: cell.tone,
      pulse: cell.pulse,
      selectNone: cell.selectNone,
    });
  }

  return spans;
}

export function typogramTitleRow(title: string, width: number): TypogramSpan[] {
  const label = ` [ ${title} ] `;
  if (label.length > width - 4) {
    throw new Error(`typogram title too long for width ${width}`);
  }
  const cells = createTypogramCells(width);
  writeTypogramCells(cells, 0, `+${dashFill(width - 2)}+`, "frame");
  writeTypogramCells(cells, Math.floor((width - label.length) / 2), label, "title");
  return collapseTypogramCells(cells);
}

export function typogramBottomRow(width: number): TypogramSpan[] {
  return [{ text: `+${dashFill(width - 2)}+`, tone: "frame" }];
}

export function typogramFramedRow(inner: TypogramCell[]): TypogramSpan[] {
  return [
    { text: "|", tone: "frame" },
    ...collapseTypogramCells(inner),
    { text: "|", tone: "frame" },
  ];
}

export function typogramTextRow(text = "", tone: TypogramTone = "label"): TypogramSpan[] {
  const cells = createTypogramCells(TYPOGRAM_WIDTH - 2);
  writeTypogramCells(cells, 2, text, tone);
  return typogramFramedRow(cells);
}

function TypogramFrame({
  children,
  className,
  explanation,
}: {
  children: ReactNode;
  className?: string;
  explanation: string;
}) {
  return (
    <figure className={cn("typogram my-6 max-w-full", className)}>
      <div className="max-w-full overflow-x-auto scrollbar-thin" aria-hidden="true">
        {children}
      </div>
      <figcaption className="sr-only">{explanation}</figcaption>
    </figure>
  );
}

function TypogramGrid({ children }: { children: ReactNode }) {
  return <div className="w-max font-mono whitespace-pre leading-5">{children}</div>;
}

function TypogramLine({ spans }: { spans: TypogramSpan[] }) {
  return (
    <div className="flex h-5" data-typogram-row="">
      {spans.flatMap((span, spanIndex) =>
        Array.from(span.text).map((character, characterIndex) => {
          const isMark = span.tone === "frame" && isAsciiMark(character);
          const className = cn(
            "inline-flex h-5 w-[10px] shrink-0 items-center justify-center",
            typogramToneClassName[span.tone],
            span.pulse && "animate-[marker-pulse_2200ms_ease-in-out_infinite]",
            span.selectNone && "select-none",
          );

          return (
            <span key={`${spanIndex}-${characterIndex}`} className={className}>
              {isMark ? <AsciiGlyph character={character} /> : character}
            </span>
          );
        }),
      )}
    </div>
  );
}

export const Typogram = {
  Frame: TypogramFrame,
  Grid: TypogramGrid,
  Line: TypogramLine,
};
