'use client';

import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image, { type StaticImageData } from 'next/image';
import { Fragment, useState } from 'react';
import Lightbox, {
  isImageFitCover,
  isImageSlide,
  type SlideImage,
  useLightboxProps,
  useLightboxState,
} from 'yet-another-react-lightbox';
import { cn } from '@/src/lib/utils';

import 'yet-another-react-lightbox/styles.css';

// biome-ignore lint/suspicious/noExplicitAny: Needed
function isNextJsImage(slide: any) {
  return (
    isImageSlide(slide) &&
    typeof slide?.width === 'number' &&
    typeof slide?.height === 'number'
  );
}

export interface NextJsImageProps {
  slide: SlideImage;
  offset: number;
  rect: { width: number; height: number };
}

export function NextJsImage({ slide, offset, rect }: NextJsImageProps) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isNextJsImage(slide)) return undefined;

  const width = !cover
    ? Math.round(
        Math.min(
          rect.width,
          (rect.height / (slide.height ?? 0)) * (slide.width ?? 0),
        ),
      )
    : rect.width;

  const height = !cover
    ? Math.round(
        Math.min(
          rect.height,
          (rect.width / (slide.width ?? 0)) * (slide.height ?? 0),
        ),
      )
    : rect.height;

  return (
    <div style={{ position: 'relative', width, height }}>
      <Image
        fill
        alt={slide.alt ?? ''}
        src={slide as StaticImageData}
        loading="eager"
        draggable={true}
        quality={100}
        placeholder={'blur'}
        blurDataURL={`/_next/image?url=${slide}&w=16&q=1`}
        style={{
          objectFit: cover ? 'cover' : 'contain',
          cursor: click ? 'pointer' : undefined,
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </div>
  );
}

export interface LightboxImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: StaticImageData | StaticImport | string;
  alt: string;
  height?: number | `${number}`;
  width?: number | `${number}`;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export default function LightboxImage(props: LightboxImageProps) {
  const [open, setOpen] = useState(false);
  const { loading = 'lazy' } = props;

  return (
    <Fragment>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[
          // @ts-expect-error: Needed
          typeof props.src === 'string'
            ? {
                src: props.src,
              }
            : props.src,
        ]}
        carousel={{ finite: true, padding: '5%' }}
        controller={{
          closeOnBackdropClick: true,
        }}
        noScroll={{
          disabled: true,
        }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
          slide: NextJsImage,
        }}
      />
      <Image
        {...props}
        className={cn('bg-background', props.className)}
        role="button"
        tabIndex={0}
        aria-label={props.alt}
        aria-haspopup="dialog"
        aria-expanded={open}
        loading={loading}
        quality={100}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        placeholder={'blur'}
        blurDataURL={`/_next/image?url=${props.src}&w=16&q=1`}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setOpen(true);
        }}
      />
    </Fragment>
  );
}
