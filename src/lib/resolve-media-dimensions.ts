import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import type { StaticImageData } from 'next/image';

function isStaticImageData(
  src: StaticImageData | StaticImport | string,
): src is StaticImageData {
  return (
    typeof src === 'object' &&
    src !== null &&
    'width' in src &&
    'height' in src &&
    typeof src.width === 'number' &&
    typeof src.height === 'number'
  );
}

export function resolveMediaDimensions(
  src: StaticImageData | StaticImport | string,
  width?: number | `${number}`,
  height?: number | `${number}`,
): { width: number; height: number } {
  if (isStaticImageData(src)) {
    return { width: src.width, height: src.height };
  }

  if (width != null && height != null) {
    return { width: Number(width), height: Number(height) };
  }

  throw new Error('Media requires width and height when src is a URL string.');
}
