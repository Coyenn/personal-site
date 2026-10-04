import { HairlineFigure } from "./hairline-figure";

export function AriaFocusFigure() {
  return (
    <HairlineFigure
      className="mt-12 mb-0"
      explanation="A dialog with Name and Last name fields and Cancel and Save buttons. The control with focus lifts out of the form, and Aria announces its name and type, such as Save, button."
      name="focus"
      rest="Save, button"
      title="ARIA"
    />
  );
}

export function SameRuntimeIdFigure() {
  return (
    <HairlineFigure
      explanation="Six focus events with runtime IDs A, A, A, B, B, A. Events that repeat the previous ID are skipped. Events 1, 4, and 6 change the ID, so Aria speaks them."
      name="dedupe"
      rest="A A A B B A"
      title="IGNORING DUPLICATES"
    />
  );
}

export function SpeechInterruptionFigure() {
  return (
    <HairlineFigure
      explanation="Aria is speaking Name, edit. Tab moves focus, which replaces it with Save, button. Escape stops speech without starting another announcement."
      name="interrupt"
      rest="Name, edit"
      title="INTERRUPTING SPEECH"
    />
  );
}
