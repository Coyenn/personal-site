'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import slugify from 'slugify';
import { Image } from '@/src/components/image/image';
import craft from '@/src/data/craft';
import { craftVideoPosters } from '@/src/data/craft-video-posters';
import { cn } from '@/src/lib/utils';

const loadedVideoSrcs = new Set<string>();

function CraftVideo({
  src,
  width,
  height,
  className,
}: {
  src: string;
  width: number;
  height: number;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: inViewRef, inView } = useInView({ rootMargin: '200px 0px' });
  const [showPoster] = useState(() => !loadedVideoSrcs.has(src));

  const setRefs = useCallback(
    (el: HTMLVideoElement | null) => {
      videoRef.current = el;
      inViewRef(el);
    },
    [inViewRef],
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) video.play().catch(() => {});
    else video.pause();
  }, [inView]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.readyState >= 2) {
      loadedVideoSrcs.add(src);
      return;
    }
    const mark = () => loadedVideoSrcs.add(src);
    video.addEventListener('loadeddata', mark, { once: true });
    return () => video.removeEventListener('loadeddata', mark);
  }, [src]);

  return (
    <video
      ref={setRefs}
      width={width}
      height={height}
      poster={showPoster ? craftVideoPosters[src] : undefined}
      style={{ aspectRatio: `${width} / ${height}` }}
      className={cn('h-auto w-full object-cover', className)}
      preload="metadata"
      loop
      muted
      playsInline
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

function groupItemsByDate() {
  const groups: Record<string, typeof craft> = {};

  for (const item of craft) {
    if (!groups[item.date]) {
      groups[item.date] = [];
    }
    groups[item.date].push(item);
  }

  return Object.values(groups);
}

export default function CraftList() {
  const containerRef = useRef<HTMLUListElement>(null);
  const craftGroups = useMemo(() => groupItemsByDate(), []);
  const [hovering, setHovering] = useState<string | null>(null);

  return (
    <ul className="flex flex-col list-none" ref={containerRef}>
      {craftGroups.map((group) => (
        <li
          key={`group-${slugify(group[0].date)}`}
          className={cn('relative flex flex-col')}
        >
          <div className="z-10 sticky top-12 mb-3 rounded-full transform -translate-x-1/2 left-1/2 w-max">
            <p
              className="border bg-white border-muted-foreground/10 backdrop-blur-md dark:border-muted-foreground/5 dark:bg-muted/80 text-foreground px-4 py-1 rounded-full animate-intro"
              style={{ animationDelay: '300ms' }}
            >
              {group[0].date}
            </p>
          </div>
          <ul className="flex flex-col list-none">
            {group.map((item, index) => {
              const overallItemIndex = craft.findIndex(
                (craftItem) => craftItem.title === item.title,
              );

              return (
                <li
                  className={cn(
                    'motion-reduce:duration-0 motion-reduce:opacity-100',
                    'animate-intro',
                  )}
                  style={{
                    animationDelay: `${(overallItemIndex + 3) * 150}ms`,
                  }}
                  key={`${item.date}-${slugify(item.title)}`}
                >
                  {/* biome-ignore lint/a11y/useKeyWithClickEvents: onClick is needed */}
                  {/* biome-ignore lint/a11y/noStaticElementInteractions: hover-only affordance; the image is the interactive control */}
                  <div
                    className={cn(
                      'block w-full outline-none pb-6 md:hover:!opacity-100 transition-opacity duration-300 motion-reduce:!opacity-100 ease-in-out contrast-more:!opacity-100',
                      hovering !== null &&
                        hovering !==
                          `${slugify(item.date)}-${slugify(item.title)}` &&
                        'md:opacity-50',
                    )}
                    onMouseEnter={() =>
                      setHovering(
                        `${slugify(item.date)}-${slugify(item.title)}`,
                      )
                    }
                    onMouseLeave={() => setHovering(null)}
                    onClick={() => setHovering(null)}
                  >
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        placeholder="blur"
                        loading={index < 3 ? 'eager' : 'lazy'}
                        className="h-auto w-full rounded-lg border border-muted-foreground/10"
                      />
                    )}
                    {item.video && (
                      <CraftVideo
                        src={item.video.src}
                        width={item.video.width}
                        height={item.video.height}
                        className="rounded-lg border border-muted-foreground/10"
                      />
                    )}
                    <div
                      className="animate-intro"
                      style={{
                        animationDelay: `${(overallItemIndex + 3) * 150}ms`,
                      }}
                    >
                      <h3 className="flex justify-between items-center gap-4 mb-4 mt-2 md:mb-6 sm:mt-3">
                        <span>{item.title}</span>
                      </h3>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}
