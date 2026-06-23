'use client';

import {
  animate,
  motion,
  type SpringOptions,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image, { type StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { MediaFrame } from '@/src/components/media-frame';
import { getBlurPlaceholderProps } from '@/src/lib/blur-placeholder';
import { cn } from '@/src/lib/utils';

export interface ZoomImageProps {
  src: StaticImageData | StaticImport | string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: 'lazy' | 'eager';
}

const MAX_DRAG = 150;

const springConfig: SpringOptions = {
  stiffness: 2000,
  damping: 320,
};

function clampDrag(offset: number) {
  return Math.min(MAX_DRAG, Math.max(-MAX_DRAG / 4, offset));
}

export default function ZoomImage(props: ZoomImageProps) {
  const { loading = 'lazy', width, height, className, src, alt } = props;

  const [backdropOpacity, setBackdropOpacity] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [shadowSize, setShadowSize] = useState(0);

  const x = useMotionValue(0);
  const springX = useSpring(x, springConfig);
  const dragButtonSize = useTransform(
    springX,
    [-MAX_DRAG, 0, MAX_DRAG],
    [0.5, 1, 1.5],
  );
  const backgroundOpacity = useTransform(
    springX,
    [-MAX_DRAG, 0, MAX_DRAG],
    [0, 0, 0.75],
  );
  const zoomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDragging) {
      document.documentElement.style.setProperty(
        'cursor',
        'grabbing',
        'important',
      );
    } else {
      document.documentElement.style.cursor = 'auto';
    }
  }, [isDragging]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Not needed
  useEffect(() => {
    const updateZoom = (latest: number) => {
      const zoomLayer = zoomRef.current;

      if (zoomLayer) {
        const newScale = 1 + latest / 500;
        zoomLayer.style.transform = `scale(${newScale})`;
        setShadowSize((newScale - 1) * 15);
      }

      setBackdropOpacity(backgroundOpacity.get());
    };

    updateZoom(springX.get());
    const unsubscribe = springX.on('change', updateZoom);

    return () => {
      unsubscribe();
      x.set(0);
      setBackdropOpacity(0);
      setShadowSize(0);
    };
  }, []);

  const resetZoom = () => animate(x, 0, springConfig);

  return (
    <>
      <div
        className="bg-background fixed inset-0 w-full h-full z-9 pointer-events-none scale-blur-fix"
        style={{ opacity: backdropOpacity }}
      />
      <div className="relative z-10">
        <MediaFrame
          width={width}
          height={height}
          clip={false}
          className="md:w-[870px] md:max-w-none md:ml-[-60px] md:mr-[-60px]"
        >
          <div
            ref={zoomRef}
            className={cn(
              'relative h-full w-full origin-center overflow-hidden',
              'rounded-lg border border-foreground/10 bg-muted-foreground/10',
              isDragging && 'shadow-muted dark:shadow-black',
              className,
            )}
            style={{
              boxShadow: `0 ${shadowSize * 3}px ${shadowSize * 10}px ${shadowSize}px rgba(0, 0, 0, 0.25)`,
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              tabIndex={0}
              aria-label={alt}
              loading={loading}
              draggable={false}
              sizes="(min-width: 1024px) 50vw, 100vw"
              {...getBlurPlaceholderProps(src)}
            />
          </div>
        </MediaFrame>
        <div className="hidden lg:block absolute right-0 md:right-[-140px] top-1/2 -translate-y-1/2 w-7 h-14">
          <motion.button
            type="button"
            className="block absolute group w-full h-full touch-none cursor-grab focus:outline-none"
            drag="x"
            dragConstraints={{ left: -MAX_DRAG / 4, right: MAX_DRAG }}
            dragElastic={0}
            dragMomentum={false}
            whileDrag={{ cursor: 'grabbing' }}
            onDragStart={() => {
              setIsDragging(true);
            }}
            onDrag={(_, { offset }) => {
              x.set(clampDrag(offset.x));
            }}
            onDragEnd={() => {
              setIsDragging(false);
              resetZoom();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (x.get() !== MAX_DRAG) {
                  animate(x, MAX_DRAG, springConfig);
                } else {
                  resetZoom();
                }
              }
            }}
            aria-expanded={isDragging}
            style={{ x: springX, scale: dragButtonSize }}
          >
            <div
              className={cn(
                'w-1 h-11 bg-foreground transition-opacity group-focus-visible:outline group-focus-visible:opacity-100 group-focus-visible:bg-background opacity-50 group-hover:opacity-70 contrast-more:opacity-100 rounded-3xl contrast-more:bg-neutral-900',
                isDragging && 'opacity-70',
              )}
            />
            <span className="sr-only" draggable={false}>
              Drag or press Enter to zoom in on the image
            </span>
          </motion.button>
        </div>
      </div>
    </>
  );
}
