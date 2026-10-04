// The tones and runs of cells the last-visit map is drawn with.
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
