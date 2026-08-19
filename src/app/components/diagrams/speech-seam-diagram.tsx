"use client";

import {
  createTypogramCells,
  typogramBottomRow,
  typogramFramedRow,
  typogramTitleRow,
  writeTypogramCells,
  Typogram,
  type TypogramCell,
  type TypogramSpan,
  type TypogramTone,
} from "./typogram";
import { useTypogramTick } from "./typogram-tick";

const WIDTH = 45;
const INNER = WIDTH - 2;
const TITLE = "THE SPEECH SEAM";
const TICK_MS = 250;
const TICKS_PER_STATE = 4;

const states = ["idle", "speaking", "interrupting"] as const;

type SpeechState = (typeof states)[number];

const IDLE_MARK = 2;
const IDLE_NAME = 4;
const SPEAK_ARROW = 9;
const SPEAKING_MARK = 24;
const SPEAKING_NAME = 26;
const IDLE_PIPE = 6;
const SPEAKING_PIPE = 29;
const STOP_RAIL = 6;
const FOCUS_LABEL = 23;
const ESCAPE_LABEL = 31;
const CAPTION_COLUMN = 2;

function blankInner() {
  return createTypogramCells(INNER);
}

function put(cells: TypogramCell[], column: number, text: string, tone: TypogramTone) {
  writeTypogramCells(cells, column, text, tone);
}

function nameTone(state: SpeechState, active: SpeechState): TypogramTone {
  return state === active ? "taught" : "muted";
}

function marker(active: boolean) {
  return active ? "* " : "  ";
}

function emptyRow() {
  return typogramFramedRow(blankInner());
}

function statesRow(active: SpeechState) {
  const cells = blankInner();

  put(cells, IDLE_MARK, marker(active === "idle"), active === "idle" ? "taught" : "frame");
  put(cells, IDLE_NAME, "idle", nameTone("idle", active));
  put(cells, SPEAK_ARROW, "----", "frame");
  put(cells, SPEAK_ARROW + 4, "speak", "muted");
  put(cells, SPEAK_ARROW + 9, "---->", "frame");
  put(
    cells,
    SPEAKING_MARK,
    marker(active === "speaking"),
    active === "speaking" ? "taught" : "frame",
  );
  put(cells, SPEAKING_NAME, "speaking", nameTone("speaking", active));

  return typogramFramedRow(cells);
}

function caretsRow() {
  const cells = blankInner();
  put(cells, IDLE_PIPE, "^", "frame");
  put(cells, SPEAKING_PIPE, "|", "frame");
  return typogramFramedRow(cells);
}

function conditionsRow() {
  const cells = blankInner();
  put(cells, IDLE_PIPE, "|", "frame");
  put(cells, FOCUS_LABEL, "focus", "muted");
  put(cells, SPEAKING_PIPE, "|", "frame");
  put(cells, ESCAPE_LABEL, "Escape", "muted");
  return typogramFramedRow(cells);
}

function arrowsDownRow() {
  const cells = blankInner();
  put(cells, IDLE_PIPE, "|", "frame");
  put(cells, SPEAKING_PIPE, "v", "frame");
  return typogramFramedRow(cells);
}

function interruptingRow(active: SpeechState) {
  const cells = blankInner();

  put(cells, STOP_RAIL, "+", "frame");
  put(cells, STOP_RAIL + 1, "-----", "frame");
  put(cells, STOP_RAIL + 7, "stop", "muted");
  put(cells, STOP_RAIL + 12, "-----", "frame");
  put(
    cells,
    SPEAKING_MARK,
    marker(active === "interrupting"),
    active === "interrupting" ? "taught" : "frame",
  );
  put(cells, SPEAKING_NAME, "interrupting", nameTone("interrupting", active));

  return typogramFramedRow(cells);
}

function captionRow() {
  const cells = blankInner();
  put(cells, CAPTION_COLUMN, "a new focus can land mid-sentence", "label");
  return typogramFramedRow(cells);
}

function diagramRows(tick: number, still: boolean): TypogramSpan[][] {
  const active: SpeechState = still
    ? "speaking"
    : states[Math.floor(tick / TICKS_PER_STATE) % states.length];

  return [
    typogramTitleRow(TITLE, WIDTH),
    emptyRow(),
    statesRow(active),
    caretsRow(),
    conditionsRow(),
    arrowsDownRow(),
    interruptingRow(active),
    emptyRow(),
    captionRow(),
    emptyRow(),
    typogramBottomRow(WIDTH),
  ];
}

export function SpeechSeamDiagram() {
  const { reducedMotion, tick } = useTypogramTick(TICK_MS);
  const lines = diagramRows(tick, reducedMotion);

  return (
    <Typogram.Frame explanation="Speech starts idle, moves to speaking, then interrupting when focus changes or Escape is pressed, and returns to idle. A new focus can land while a sentence is still being read.">
      <Typogram.Grid>
        {lines.map((spans, index) => (
          <Typogram.Line key={index} spans={spans} />
        ))}
      </Typogram.Grid>
    </Typogram.Frame>
  );
}
