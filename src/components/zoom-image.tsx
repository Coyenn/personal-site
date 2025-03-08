'use client';

import { getPlaceholderImage } from '@/src/actions/get-placeholder-image';
import { cn } from '@/src/lib/utils';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image, { type StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';

export interface ZoomImageProps {
  src: StaticImageData | StaticImport | string;
  alt: string;
  height?: number | `${number}`;
  width?: number | `${number}`;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export default function ZoomImage(props: ZoomImageProps) {
  const { loading = 'lazy' } = props;
  const [css, setCss] = useState<React.CSSProperties | null>(null);
  const [backdropOpacity, setBackdropOpacity] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const MAX_DRAG = 150;
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 2000, damping: 320 });
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
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const fetchPlaceholder = async () => {
      try {
        if (typeof props.src === 'string') {
          const placeholderCss = await getPlaceholderImage(props.src);
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
    springX.on('change', (latest) => {
      const image = imageRef.current;

      if (image) {
        const newScale = 1 + latest / 400;
        image.style.transform = `scale(${newScale})`;
      }

      setBackdropOpacity(backgroundOpacity.get());
    });

    return () => {
      x.set(0);
      setBackdropOpacity(0);
    };
  }, []);

  return (
    <>
      <div
        className="bg-background fixed inset-0 w-full h-full z-[9] pointer-events-none scale-blur-fix"
        style={{ opacity: backdropOpacity }}
      />
      <div className="relative z-10">
        <div className="relative" style={{ overflow: 'hidden' }}>
          {css && (
            <div
              className="absolute inset-0 w-full h-full transform scale-110 filter blur-lg z-[-1]"
              style={css}
            />
          )}
          <Image
            {...props}
            className={cn(
              props.className,
              'bg-muted-foreground/10 z-10',
              isDragging &&
                'shadow-2xl shadow-muted dark:shadow-black transition-shadow',
            )}
            tabIndex={0}
            aria-label={props.alt}
            loading={loading}
            draggable={false}
            sizes="(min-width: 1024px) 50vw, 100vw"
            ref={imageRef}
          />
        </div>
        <div className="hidden lg:block absolute right-0 md:right-[-110px] top-1/2 -translate-y-1/2 w-7 h-14">
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
            onDragEnd={() => {
              setIsDragging(false);
              x.set(0);
              springX.set(0);
            }}
            // On Enter key press, set the x value to the max drag value
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (x.get() !== MAX_DRAG) {
                  x.set(MAX_DRAG);
                } else {
                  x.set(0);
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
