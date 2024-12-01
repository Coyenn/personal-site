'use client';

import LightboxImage from '@/src/components/lightbox';
import craft from '@/src/data/craft';
import { predictRenderedImageHeight } from '@/src/lib/predict-rendered-image-height';
import { cn } from '@/src/lib/utils';
import { useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import slugify from 'slugify';

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
      {craftGroups.map((group, groupIndex) => (
        <li
          key={`group-${slugify(group[0].date)}`}
          className={cn(
            'relative flex flex-col',
            `${groupIndex < 3 ? 'animate-intro' : ''}`,
            `animation-delay-${groupIndex + 1}`,
          )}
        >
          <div className="z-10 sticky top-12 mb-3  rounded-full transform -translate-x-1/2 left-1/2 w-max">
            <p className="border bg-white border-muted-foreground/10 backdrop-blur-md dark:border-muted-foreground/5 dark:bg-muted/80 text-foreground px-4 py-1 rounded-full">
              {group[0].date}
            </p>
          </div>
          <ul className="flex flex-col list-none">
            {group.map((item, index) => {
              const { ref, inView } = useInView({
                threshold: 0,
              });

              return (
                <li
                  className={
                    'motion-reduce:duration-0 motion-reduce:opacity-100'
                  }
                  key={`${item.date}-${slugify(item.title)}`}
                  ref={ref}
                >
                  <button
                    type="button"
                    className={cn(
                      'block w-full outline-none pb-6 md:hover:!opacity-100 transition-opacity duration-300 motion-reduce:!opacity-100 ease-in-out contrast-more:!opacity-100',
                      hovering !== null &&
                        hovering !==
                          `${slugify(item.date)}-${slugify(item.title)}` &&
                        'md:opacity-50',
                    )}
                    aria-label={item.title}
                    tabIndex={inView ? -1 : 0}
                    aria-hidden={inView ? 'true' : 'false'}
                    onMouseEnter={() =>
                      setHovering(
                        `${slugify(item.date)}-${slugify(item.title)}`,
                      )
                    }
                    onMouseLeave={() => setHovering(null)}
                    onClick={() => setHovering(null)}
                  >
                    {item.image &&
                      (inView ? (
                        <LightboxImage
                          loading={index < 3 ? 'eager' : 'lazy'}
                          alt={item.title}
                          className="rounded-lg border border-muted-foreground/10"
                          height={item.image.height}
                          src={item.image}
                          width={item.image.width}
                        />
                      ) : (
                        <div
                          aria-label={item.title}
                          className="rounded-lg border bg-muted-foreground/10 w-full"
                          style={{
                            height:
                              !inView && item.image
                                ? predictRenderedImageHeight(
                                    item.image,
                                    containerRef.current?.offsetWidth ?? 0,
                                  )
                                : 'auto',
                          }}
                        />
                      ))}
                    <h3 className="flex justify-between items-center gap-4 mb-4 mt-2 md:mb-6 sm:mt-3">
                      <span>{item.title}</span>
                    </h3>
                  </button>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}
