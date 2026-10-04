import { HairlineFigure } from "./hairline-figure";

export function VimMotionsFigure() {
  return (
    <HairlineFigure
      explanation="A small editor with four keys: h, j, k, and l. Pressing one moves the block cursor left, down, up, or right, the same Vim motions in Zed as before."
      name="hjkl"
      rest="hjkl"
      title="VIM MODE"
    />
  );
}
