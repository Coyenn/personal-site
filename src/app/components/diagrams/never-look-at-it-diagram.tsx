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
  type TypogramIcon,
  type TypogramSpan,
  type TypogramTone,
} from "./typogram";

const WIDTH = 52;
const INNER = WIDTH - 2;
const TITLE = "ARIA";
const TICK_MS = 120;
const TICKS_PER_FOCUS = 26;
const WIN_L = 3;
const WIN_R = 46;
const PAD = 3;
const CONTENT_L = WIN_L + PAD;
const CONTENT_R = WIN_R - PAD;
const SPEECH_WIDTH = 17;
const CANCEL_ICON_COLUMN = CONTENT_L;
const CANCEL_LABEL_COLUMN = CONTENT_L + 2;
const SAVE_LABEL = "Save";
const SAVE_LABEL_COLUMN = CONTENT_R - SAVE_LABEL.length + 1;
const SAVE_ICON_COLUMN = SAVE_LABEL_COLUMN - 2;

const focuses = [
  { id: "name", speech: '"Name, edit"' },
  { id: "lastName", speech: '"Last name, edit"' },
  { id: "cancel", speech: '"Cancel, button"' },
  { id: "save", speech: '"Save, button"' },
] as const;

type FocusId = (typeof focuses)[number]["id"];
type DiagramRow = {
  icons?: TypogramIcon[];
  spans: TypogramSpan[];
};

const stillIndex = focuses.findIndex((focus) => focus.id === "save");

function row(spans: TypogramSpan[]): DiagramRow {
  return { spans };
}

function blankInner() {
  return createTypogramCells(INNER);
}

function put(
  cells: TypogramCell[],
  column: number,
  text: string,
  tone: TypogramTone,
  pulse = false,
  selectNone = false,
) {
  writeTypogramCells(cells, column, text, tone, pulse, selectNone);
}

function emptyRow() {
  return typogramFramedRow(blankInner());
}

function windowRule() {
  const cells = blankInner();
  const rule = Array.from({ length: WIN_R - WIN_L - 1 }, (_, index) =>
    index % 2 === 0 ? " " : "-",
  ).join("");

  put(cells, WIN_L, "+", "frame");
  put(cells, WIN_L + 1, rule, "frame");
  put(cells, WIN_R, "+", "frame");

  return typogramFramedRow(cells);
}

function windowBlank() {
  const cells = blankInner();
  put(cells, WIN_L, "|", "frame");
  put(cells, WIN_R, "|", "frame");
  return typogramFramedRow(cells);
}

function controlTone(id: FocusId, active: FocusId): TypogramTone {
  return id === active ? "taught" : "muted";
}

function CancelIcon() {
  return (
    <svg className="size-full" viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="m2.5 2.5 7 7m0-7-7 7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg className="size-full" viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="m2.4 6.2 2.3 2.3 4.9-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function fieldRow(id: FocusId, label: string, active: FocusId, pulse: boolean) {
  const cells = blankInner();
  const tone = controlTone(id, active);
  const prefix = `${label}: `;
  const dotStart = CONTENT_L + prefix.length;
  const dots = ".".repeat(CONTENT_R - dotStart + 1);
  const mark = id === active && pulse;

  put(cells, WIN_L, "|", "frame");
  put(cells, WIN_R, "|", "frame");
  put(cells, CONTENT_L, prefix, tone, mark);
  put(cells, dotStart, dots, tone, mark, true);

  return typogramFramedRow(cells);
}

function buttonsRow(active: FocusId, pulse: boolean): DiagramRow {
  const cells = blankInner();
  const cancelTone = controlTone("cancel", active);
  const saveTone = controlTone("save", active);

  put(cells, WIN_L, "|", "frame");
  put(cells, WIN_R, "|", "frame");
  put(cells, CANCEL_ICON_COLUMN, " ", cancelTone, active === "cancel" && pulse);
  put(cells, CANCEL_LABEL_COLUMN, "Cancel", cancelTone);
  put(cells, SAVE_ICON_COLUMN, " ", saveTone, active === "save" && pulse);
  put(cells, SAVE_LABEL_COLUMN, SAVE_LABEL, saveTone);

  return {
    icons: [
      {
        column: CANCEL_ICON_COLUMN + 1,
        node: <CancelIcon />,
        pulse: active === "cancel" && pulse,
        tone: cancelTone,
      },
      {
        column: SAVE_ICON_COLUMN + 1,
        node: <SaveIcon />,
        pulse: active === "save" && pulse,
        tone: saveTone,
      },
    ],
    spans: typogramFramedRow(cells),
  };
}

function speechRow(speech: string) {
  const cells = blankInner();
  put(cells, CONTENT_L, `> ${speech}`.padEnd(SPEECH_WIDTH), "taught");
  return typogramFramedRow(cells);
}

function diagramRows(tick: number, still: boolean): DiagramRow[] {
  const activeIndex = still ? stillIndex : Math.floor(tick / TICKS_PER_FOCUS) % focuses.length;
  const typed = still ? SPEECH_WIDTH : tick % TICKS_PER_FOCUS;
  const focus = focuses[activeIndex];
  const speech = still ? focus.speech : focus.speech.slice(0, typed);
  const pulse = !still;

  return [
    row(typogramTitleRow(TITLE, WIDTH)),
    row(emptyRow()),
    row(windowRule()),
    row(windowBlank()),
    row(fieldRow("name", "Name", focus.id, pulse)),
    row(windowBlank()),
    row(fieldRow("lastName", "Last name", focus.id, pulse)),
    row(windowBlank()),
    buttonsRow(focus.id, pulse),
    row(windowBlank()),
    row(windowRule()),
    row(emptyRow()),
    row(speechRow(speech)),
    row(emptyRow()),
    row(typogramBottomRow(WIDTH)),
  ];
}

export function NeverLookAtItDiagram() {
  const { reducedMotion, tick } = useTypogramTick(TICK_MS);
  const lines = diagramRows(tick, reducedMotion);

  return (
    <Typogram.Frame
      className="mt-12 mb-0"
      explanation="A dialog titled Aria with Name and Last name fields drawn as dotted underlines, Cancel on the left marked with a multiply sign, and Save on the right marked with an arrow. Focus moves through those controls while a spoken line types each one."
    >
      <Typogram.Grid>
        {lines.map((spans, index) => (
          <Typogram.Line key={index} icons={spans.icons} spans={spans.spans} />
        ))}
      </Typogram.Grid>
    </Typogram.Frame>
  );
}
