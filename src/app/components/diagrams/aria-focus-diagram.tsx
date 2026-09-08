"use client";

import {
  createTypogramCells,
  typogramBottomRow,
  typogramFramedRow,
  typogramTitleRow,
  writeTypogramCells,
  Typogram,
  TYPOGRAM_WIDTH,
  type TypogramSpan,
} from "./typogram";
import { useTypogramTick } from "./typogram-tick";

// + - - - - - - [ ARIA ] - - - - - - - - +
// |                                     |
// |   Name:      ....................   |
// |                                     |
// |   Last name: ....................   |
// |                                     |
// |   [ Cancel ]             [ Save ]   |
// |                                     |
// |   Speech: "Save, button"            |
// |                                     |
// + - - - - - - - - - - - - - - - - - - +

const controls = [
  { speech: '"Name, edit"' },
  { speech: '"Last name, edit"' },
  { speech: '"Cancel, button"' },
  { speech: '"Save, button"' },
] as const;

const TICK_MS = 120;
const TICKS_PER_FOCUS = 26;

function formRow(text: string, control: number, active: number, pulse = false): TypogramSpan[] {
  const cells = createTypogramCells(TYPOGRAM_WIDTH - 2);
  writeTypogramCells(
    cells,
    3,
    text,
    control === active ? "taught" : "label",
    control === active && pulse,
  );
  return typogramFramedRow(cells);
}

export function AriaFocusDiagram() {
  const { reducedMotion, tick } = useTypogramTick(TICK_MS);
  const active = reducedMotion ? 3 : Math.floor(tick / TICKS_PER_FOCUS) % controls.length;
  const focus = controls[active];
  const speech = reducedMotion ? focus.speech : focus.speech.slice(0, tick % TICKS_PER_FOCUS);
  const buttons = createTypogramCells(TYPOGRAM_WIDTH - 2);
  writeTypogramCells(
    buttons,
    3,
    "[ Cancel ]",
    active === 2 ? "taught" : "label",
    active === 2 && !reducedMotion,
  );
  writeTypogramCells(
    buttons,
    26,
    "[ Save ]",
    active === 3 ? "taught" : "label",
    active === 3 && !reducedMotion,
  );
  const blank = typogramFramedRow(createTypogramCells(TYPOGRAM_WIDTH - 2));

  const lines = [
    typogramTitleRow("ARIA", TYPOGRAM_WIDTH),
    blank,
    formRow("Name:      ....................", 0, active, !reducedMotion),
    blank,
    formRow("Last name: ....................", 1, active, !reducedMotion),
    blank,
    typogramFramedRow(buttons),
    blank,
    formRow(`Speech: ${speech}`, active, active),
    blank,
    typogramBottomRow(TYPOGRAM_WIDTH),
  ];

  return (
    <Typogram.Frame
      className="mt-12 mb-0"
      explanation="Tab moves focus through Name, Last name, Cancel, and Save. Aria announces each control's name and type."
    >
      <Typogram.Grid>
        {lines.map((spans, index) => (
          <Typogram.Line key={index} spans={spans} />
        ))}
      </Typogram.Grid>
    </Typogram.Frame>
  );
}
