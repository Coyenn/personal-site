'use client';

import { getPlaceholderImage } from '@/src/actions/get-placeholder-image';
import { cn } from '@/src/lib/utils';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image, { type StaticImageData } from 'next/image';
import { Fragment, useState, useEffect } from 'react';
import Lightbox, {
  isImageFitCover,
  isImageSlide,
  type SlideImage,
  useLightboxProps,
  useLightboxState,
} from 'yet-another-react-lightbox';

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
  const [css, setCss] = useState<React.CSSProperties | null>(null);

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isNextJsImage(slide)) return undefined;

  useEffect(() => {
    const fetchPlaceholder = async () => {
      try {
        if (slide.src) {
          const placeholderCss = await getPlaceholderImage(slide.src);
          // Ensure we're setting a valid CSS object
          if (typeof placeholderCss === 'object') {
            setCss(placeholderCss as React.CSSProperties);
          }
        }
      } catch (error) {
        console.error('Error fetching placeholder:', error);
      }
    };

    fetchPlaceholder();
  }, [slide.src]);

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
    <div style={{ position: 'relative', width, height, overflow: 'hidden' }}>
      {css && (
        <div
          className="absolute inset-0 w-full h-full transform scale-110 filter blur-lg z-[-1]"
          style={css}
        />
      )}
      <Image
        fill
        alt={slide.alt ?? ''}
        src={slide as StaticImageData}
        loading="eager"
        draggable={true}
        quality={100}
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
  extends Omit<JSX.IntrinsicElements['img'], 'src'> {
  src: StaticImageData | StaticImport | string;
  alt: string;
  height?: number | `${number}`;
  width?: number | `${number}`;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export default function LightboxImage(props: LightboxImageProps) {
  const [open, setOpen] = useState(false);
  const [css, setCss] = useState<React.CSSProperties | null>(null);
  const { loading = 'lazy' } = props;

  useEffect(() => {
    const fetchPlaceholder = async () => {
      try {
        if (props.src) {
          const placeholderCss = await getPlaceholderImage(props.src as string);
          // Ensure we're setting a valid CSS object
          if (typeof placeholderCss === 'object') {
            setCss(placeholderCss as React.CSSProperties);
          }
        }
      } catch (error) {
        console.error('Error fetching placeholder:', error);
      }
    };

    fetchPlaceholder();
  }, [props.src]);

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
      <div className="relative overflow-hidden">
        {css && (
          <div
            className="absolute inset-0 w-full h-full transform scale-110 filter blur-lg z-[-1]"
            style={css}
          />
        )}
        <Image
          {...props}
          className={cn(props.className, 'bg-background')}
          role="button"
          tabIndex={0}
          aria-label={props.alt}
          aria-haspopup="dialog"
          aria-expanded={open}
          loading={loading}
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onClick={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setOpen(true);
          }}
        />
      </div>
    </Fragment>
  );
}
