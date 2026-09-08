"use client";

import {
  createTypogramCells,
  typogramBottomRow,
  typogramFramedRow,
  typogramTextRow,
  typogramTitleRow,
  writeTypogramCells,
  Typogram,
  TYPOGRAM_WIDTH,
  type TypogramTone,
} from "./typogram";
import { useTypogramTick } from "./typogram-tick";

// + - - - [ INTERRUPTING SPEECH ] - - - +
// |                                     |
// |  Speaking: "Name, edit"              |
// |          |                          |
// |          + - > New focus: Save       |
// |          |     Stop old speech       |
// |          |     Say "Save, button"    |
// |          |                          |
// |          + - > Escape                |
// |                Stop speech          |
// |                                     |
// + - - - - - - - - - - - - - - - - - - +
function branchRow(rail: string, label = "", tone: TypogramTone = "label", active = false) {
  const cells = createTypogramCells(TYPOGRAM_WIDTH - 2);
  writeTypogramCells(cells, 2, rail, "frame");
  if (active) {
    writeTypogramCells(cells, 14, "*", "taught");
  }
  writeTypogramCells(cells, 16, label, tone);
  return typogramFramedRow(cells);
}

// Each branch starts with speech playing, then walks through its own outcome.
const steps = ["speaking", "focus", "replace", "announce", "speaking", "escape", "stop"] as const;

export function SpeechInterruptionDiagram() {
  const { reducedMotion, tick } = useTypogramTick(1000);
  const active = steps[tick % steps.length];
  const tone = (step: (typeof steps)[number]): TypogramTone =>
    reducedMotion ? "label" : active === step ? "taught" : "muted";
  const isActive = (step: (typeof steps)[number]) => !reducedMotion && active === step;
  const lines = [
    typogramTitleRow("INTERRUPTING SPEECH", TYPOGRAM_WIDTH),
    typogramTextRow(),
    typogramTextRow('Speaking: "Name, edit"', reducedMotion ? "taught" : tone("speaking")),
    branchRow("        |"),
    branchRow("        + - >", "New focus: Save", tone("focus"), isActive("focus")),
    branchRow("        |", "Stop old speech", tone("replace"), isActive("replace")),
    branchRow("        |", 'Say "Save, button"', tone("announce"), isActive("announce")),
    branchRow("        |"),
    branchRow("        + - >", "Escape", tone("escape"), isActive("escape")),
    branchRow("", "Stop speech", tone("stop"), isActive("stop")),
    typogramTextRow(),
    typogramBottomRow(TYPOGRAM_WIDTH),
  ];

  return (
    <Typogram.Frame explanation="A new focus replaces the current announcement. Escape stops speech without starting another announcement.">
      <Typogram.Grid>
        {lines.map((spans, index) => (
          <Typogram.Line key={index} spans={spans} />
        ))}
      </Typogram.Grid>
    </Typogram.Frame>
  );
}
