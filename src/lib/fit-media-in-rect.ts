export function fitMediaInRect(
  mediaWidth: number,
  mediaHeight: number,
  rectWidth: number,
  rectHeight: number,
  cover = false,
): { width: number; height: number } {
  if (cover) {
    return { width: rectWidth, height: rectHeight };
  }

  return {
    width: Math.round(
      Math.min(rectWidth, (rectHeight / mediaHeight) * mediaWidth),
    ),
    height: Math.round(
      Math.min(rectHeight, (rectWidth / mediaWidth) * mediaHeight),
    ),
  };
}
