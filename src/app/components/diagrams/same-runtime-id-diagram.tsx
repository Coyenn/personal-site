"use client";

import {
  typogramBottomRow,
  typogramTextRow,
  typogramTitleRow,
  Typogram,
  TYPOGRAM_WIDTH,
} from "./typogram";
import { useTypogramTick } from "./typogram-tick";

// + - - [ IGNORING DUPLICATES ] - - - - +
// |                                     |
// |  Event   Runtime ID   Speech         |
// |                                     |
// |      1   A            "Save"         |
// |      2   A            skip           |
// |      3   A            skip           |
// |      4   B            "Cancel"       |
// |                                     |
// + - - - - - - - - - - - - - - - - - - +
const events = [
  { id: "A", speech: '"Save"' },
  { id: "A", speech: "skip" },
  { id: "A", speech: "skip" },
  { id: "B", speech: '"Cancel"' },
] as const;

const TICK_MS = 250;
const TICKS_PER_EVENT = 10;

export function SameRuntimeIdDiagram() {
  const { reducedMotion, tick } = useTypogramTick(TICK_MS);
  const active = Math.floor(tick / TICKS_PER_EVENT) % events.length;
  const typed = tick % TICKS_PER_EVENT;
  const lines = [
    typogramTitleRow("IGNORING DUPLICATES", TYPOGRAM_WIDTH),
    typogramTextRow(),
    typogramTextRow("Event   Runtime ID   Speech"),
    typogramTextRow(),
    ...events.map((event, index) => {
      const speech =
        reducedMotion || index < active
          ? event.speech
          : index === active
            ? event.speech.slice(0, typed)
            : "";
      const marker = !reducedMotion && index === active ? "*" : " ";
      const tone = reducedMotion
        ? event.speech === "skip"
          ? "label"
          : "taught"
        : index === active
          ? "taught"
          : index < active
            ? "label"
            : "muted";

      return typogramTextRow(`${marker}   ${index + 1}   ${event.id}            ${speech}`, tone);
    }),
    typogramTextRow(),
    typogramBottomRow(TYPOGRAM_WIDTH),
  ];

  return (
    <Typogram.Frame explanation="Repeated events for Save (A) are skipped. When focus reaches Cancel (B), Aria speaks again.">
      <Typogram.Grid>
        {lines.map((spans, index) => (
          <Typogram.Line key={index} spans={spans} />
        ))}
      </Typogram.Grid>
    </Typogram.Frame>
  );
}
