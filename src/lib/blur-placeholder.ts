import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import type { StaticImageData } from 'next/image';

type BlurPlaceholderProps =
  | { placeholder: 'blur'; blurDataURL: string }
  | { placeholder: 'blur' };

export function getBlurPlaceholderProps(
  src: StaticImageData | StaticImport | string,
): BlurPlaceholderProps {
  if (typeof src === 'object' && src !== null && 'blurDataURL' in src) {
    const blurDataURL = src.blurDataURL;

    if (blurDataURL) {
      return { placeholder: 'blur', blurDataURL };
    }
  }

  if (typeof src === 'string') {
    return {
      placeholder: 'blur',
      blurDataURL: `/_next/image?url=${encodeURIComponent(src)}&w=16&q=1`,
    };
  }

  return { placeholder: 'blur' };
}
