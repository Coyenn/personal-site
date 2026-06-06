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
import { MediaFrame } from '@/src/components/media-frame';
import { getBlurPlaceholderProps } from '@/src/lib/blur-placeholder';
import { fitMediaInRect } from '@/src/lib/fit-media-in-rect';

import 'yet-another-react-lightbox/styles.css';

function hasMediaDimensions(
  slide: SlideImage,
): slide is SlideImage & { width: number; height: number } {
  return (
    isImageSlide(slide) &&
    typeof slide.width === 'number' &&
    typeof slide.height === 'number'
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

  if (!hasMediaDimensions(slide)) return undefined;

  const cover = isImageFitCover(slide, imageFit);
  const fitted = fitMediaInRect(
    slide.width,
    slide.height,
    rect.width,
    rect.height,
    cover,
  );

  return (
    <MediaFrame
      width={slide.width}
      height={slide.height}
      fitted={fitted}
      style={{ pointerEvents: 'none' }}
    >
      <Image
        fill
        alt={slide.alt ?? ''}
        src={slide as StaticImageData}
        loading="eager"
        draggable={true}
        quality={100}
        {...getBlurPlaceholderProps(slide as StaticImageData)}
        className={cover ? 'object-cover' : 'object-contain'}
        style={{ cursor: click ? 'pointer' : undefined }}
        sizes={`${Math.ceil((fitted.width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </MediaFrame>
  );
}

export interface LightboxImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: StaticImageData | StaticImport | string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export default function LightboxImage(props: LightboxImageProps) {
  const [open, setOpen] = useState(false);
  const { loading = 'lazy', width, height, className, style, src, alt } = props;

  const slide: SlideImage = {
    src: typeof src === 'string' ? src : (src as StaticImageData).src,
    width,
    height,
    alt,
  };

  return (
    <Fragment>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[slide]}
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
      <MediaFrame width={width} height={height} className={className}>
        <Image
          src={src}
          alt={alt}
          fill
          loading={loading}
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          style={style}
          role="button"
          tabIndex={0}
          aria-label={alt}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setOpen(true);
          }}
          {...getBlurPlaceholderProps(src)}
        />
      </MediaFrame>
    </Fragment>
  );
}
