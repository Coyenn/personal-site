'use client';

import ArrowLeftIcon from '@/src/components/icons/arrow-left-icon';
import ArrowRightIcon from '@/src/components/icons/arrow-right-icon';
import { Image } from '@/src/components/image/image';
import LightboxVideo from '@/src/components/lightbox-video';
import { Button } from '@/src/components/ui/button';
import craft from '@/src/data/craft';
import { AnimatePresence, motion } from 'framer-motion';
import { wrap } from 'popmotion';
import { useEffect, useState } from 'react';

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    };
  },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function CraftSlider() {
  const [[page, direction], setPage] = useState([0, 0]);
  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, craft.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: Skill issue
  useEffect(() => {
    // Listen for arrow left and right key presses
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        paginate(-1);
      } else if (event.key === 'ArrowRight') {
        paginate(1);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [page]);

  return (
    <div className="animate-intro animation-delay-1">
      <div className="mb-3 rounded-full bg-white dark:bg-background w-max mx-auto">
        <p className="border bg-white border-muted-foreground/10 dark:border-muted-foreground/5 dark:bg-muted/80 text-foreground px-4 py-1 rounded-full">
          {craft[imageIndex].date}
        </p>
      </div>
      <div className="inset-0 w-100 h-[50vh] rounded-lg relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            className="absolute w-full h-full inset-0 flex justify-center items-center max-h-[80vh] lg:max-h-[60vh]"
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 500, damping: 50 },
              opacity: { duration: 0.4 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            {craft[imageIndex].image && (
              <Image
                variant="lightbox"
                src={craft[imageIndex].image}
                alt={craft[imageIndex].title}
                height={craft[imageIndex].image.height}
                width={craft[imageIndex].image.width}
                className="object-contain rounded-lg w-auto h-auto max-w-full max-h-full border-muted-foreground/10"
              />
            )}
            {craft[imageIndex].video && (
              <LightboxVideo
                className="rounded-lg border border-muted-foreground/10 w-full h-auto"
                src={craft[imageIndex].video}
                type="video/mp4"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <Button
        variant="secondary"
        size="icon"
        onClick={() => paginate(-1)}
        className="hidden md:flex absolute top-[50%] -left-12 z-10 transform"
      >
        <ArrowLeftIcon />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={() => paginate(1)}
        className="hidden md:flex absolute top-[50%] -right-12 z-10 transform"
      >
        <ArrowRightIcon />
      </Button>
    </div>
  );
}
