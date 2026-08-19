"use client";

import { useEffect, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type TypogramTone = "frame" | "title" | "label" | "taught" | "muted";

export type TypogramSpan = {
  text: string;
  tone: TypogramTone;
  pulse?: boolean;
  selectNone?: boolean;
};

export type TypogramIcon = {
  column: number;
  node: ReactNode;
  tone: TypogramTone;
  pulse?: boolean;
};

export type TypogramCell = {
  ch: string;
  tone: TypogramTone;
  pulse?: boolean;
  selectNone?: boolean;
};

const toneClassName: Record<TypogramTone, string> = {
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
  const label = `[ ${title} ]`;
  const inner = width - 2;
  const leftover = inner - label.length;

  if (leftover < 2) {
    throw new Error(`typogram title too long for width ${width}`);
  }

  let left = Math.floor(leftover / 2);
  let right = leftover - left;

  if (left % 2 === 0 && left > 0) {
    left -= 1;
    right += 1;
  }

  return [
    { text: `+${dashFill(left)}`, tone: "frame" },
    { text: label, tone: "title" },
    { text: `${dashFill(right)}+`, tone: "frame" },
  ];
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

export function useTypogramTick(intervalMs: number) {
  const [tick, setTick] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReducedMotion(media.matches);
    };

    apply();
    media.addEventListener("change", apply);

    return () => {
      media.removeEventListener("change", apply);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setTick((current) => current + 1);
    }, intervalMs);

    return () => {
      window.clearInterval(interval);
    };
  }, [intervalMs, reducedMotion]);

  return { reducedMotion, tick };
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
    <figure className={cn("my-6 max-w-full", className)}>
      <figcaption className="sr-only">{explanation}</figcaption>
      <div className="max-w-full overflow-x-auto pb-3 scrollbar-thin" aria-hidden="true">
        {children}
      </div>
    </figure>
  );
}

function TypogramGrid({ children }: { children: ReactNode }) {
  return <pre className="m-0 whitespace-pre leading-5">{children}</pre>;
}

function TypogramLine({ icons = [], spans }: { icons?: TypogramIcon[]; spans: TypogramSpan[] }) {
  const iconByColumn = new Map(icons.map((icon) => [icon.column, icon]));
  const spanOffsets = spans.map((_, spanIndex) =>
    spans.slice(0, spanIndex).reduce((offset, span) => offset + span.text.length, 0),
  );

  return (
    <div>
      {spans.flatMap((span, spanIndex) =>
        Array.from(span.text).map((character, characterIndex) => {
          const currentColumn = spanOffsets[spanIndex] + characterIndex;
          const icon = iconByColumn.get(currentColumn);
          const className = cn(
            toneClassName[icon?.tone ?? span.tone],
            (icon?.pulse ?? span.pulse) && "animate-[marker-pulse_2200ms_ease-in-out_infinite]",
            icon && "inline-block h-[1em] w-[1ch] align-[-0.15em]",
            span.selectNone && "select-none",
          );

          return (
            <span key={`${spanIndex}-${characterIndex}`} className={className}>
              {icon?.node ?? character}
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
