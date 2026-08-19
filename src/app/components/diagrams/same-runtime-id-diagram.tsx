"use client";

import {
  createTypogramCells,
  typogramBottomRow,
  typogramFramedRow,
  typogramTitleRow,
  useTypogramTick,
  writeTypogramCells,
  Typogram,
  type TypogramCell,
  type TypogramSpan,
  type TypogramTone,
} from "./typogram";

const WIDTH = 45;
const INNER = WIDTH - 2;
const TITLE = "SAME RUNTIME ID";
const TICK_MS = 250;
const TICKS_PER_ROW = 6;
const OUTCOME_WIDTH = 5;
const OUTCOME_COLUMN = 27;

const rows = [
  { id: "1", outcome: "speak" },
  { id: "2", outcome: "skip" },
  { id: "3", outcome: "skip" },
] as const;

function blankInner() {
  return createTypogramCells(INNER);
}

function put(cells: TypogramCell[], column: number, text: string, tone: TypogramTone) {
  writeTypogramCells(cells, column, text, tone);
}

function outcomeText(row: number, activeRow: number, typed: number, still: boolean) {
  const full = rows[row].outcome.padEnd(OUTCOME_WIDTH);

  if (still || row < activeRow) {
    return full;
  }

  if (row > activeRow) {
    return " ".repeat(OUTCOME_WIDTH);
  }

  return full.slice(0, typed).padEnd(OUTCOME_WIDTH);
}

function rowTone(row: number, activeRow: number, still: boolean): TypogramTone {
  if (still) {
    return row === 0 ? "taught" : "label";
  }

  if (row === activeRow) {
    return "taught";
  }

  if (row < activeRow) {
    return "label";
  }

  return "muted";
}

function eventRow(row: number, activeRow: number, typed: number, still: boolean) {
  const cells = blankInner();
  const tone = rowTone(row, activeRow, still);
  const marker = still ? (row === 0 ? "* " : "  ") : row === activeRow ? "* " : "  ";

  put(cells, 2, marker, marker.trim() === "*" ? "taught" : "frame");
  put(cells, 4, rows[row].id, tone);
  put(cells, 5, `  handle  A  "Save"   `, tone);
  put(cells, OUTCOME_COLUMN, outcomeText(row, activeRow, typed, still), tone);

  return typogramFramedRow(cells);
}

function captionRow() {
  const cells = blankInner();
  put(cells, 2, "prev.id == sender.id  ->  Ok(())", "label");
  return typogramFramedRow(cells);
}

function labelRow(text: string) {
  const cells = blankInner();
  put(cells, 2, text, "label");
  return typogramFramedRow(cells);
}

function emptyRow() {
  return typogramFramedRow(blankInner());
}

function diagramRows(tick: number, still: boolean): TypogramSpan[][] {
  const activeRow = still ? 0 : Math.floor(tick / TICKS_PER_ROW) % rows.length;
  const typed = still ? OUTCOME_WIDTH : tick % TICKS_PER_ROW;

  return [
    typogramTitleRow(TITLE, WIDTH),
    emptyRow(),
    labelRow("Tab"),
    emptyRow(),
    eventRow(0, activeRow, typed, still),
    eventRow(1, activeRow, typed, still),
    eventRow(2, activeRow, typed, still),
    emptyRow(),
    captionRow(),
    emptyRow(),
    typogramBottomRow(WIDTH),
  ];
}

export function SameRuntimeIdDiagram() {
  const { reducedMotion, tick } = useTypogramTick(TICK_MS);
  const lines = diagramRows(tick, reducedMotion);

  return (
    <Typogram.Frame explanation="One Tab key press can fire the focus handler three times for the same Save button. The first call is spoken. The second and third are skipped because the runtime id matches the previous element.">
      <Typogram.Grid>
        {lines.map((spans, index) => (
          <Typogram.Line key={index} spans={spans} />
        ))}
      </Typogram.Grid>
    </Typogram.Frame>
  );
}
