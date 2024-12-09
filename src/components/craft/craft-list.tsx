'use client';

import LightboxImage from '@/src/components/lightbox';
import craft from '@/src/data/craft';
import { cn } from '@/src/lib/utils';
import { useMemo, useRef, useState } from 'react';
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
      {craftGroups.map((group) => (
        <li
          key={`group-${slugify(group[0].date)}`}
          className={cn('relative flex flex-col')}
        >
          <div className="z-10 sticky top-12 mb-3  rounded-full transform -translate-x-1/2 left-1/2 w-max">
            <p className="border bg-white border-muted-foreground/10 backdrop-blur-md dark:border-muted-foreground/5 dark:bg-muted/80 text-foreground px-4 py-1 rounded-full animate-intro animation-delay-1">
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
                    `animation-delay-${overallItemIndex + 2}`,
                  )}
                  key={`${item.date}-${slugify(item.title)}`}
                >
                  {/* biome-ignore lint/a11y/useKeyWithClickEvents: onClick is needed */}
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
                      <LightboxImage
                        loading={index < 3 ? 'eager' : 'lazy'}
                        alt={item.title}
                        className="rounded-lg border border-muted-foreground/10"
                        height={item.image.height}
                        src={item.image}
                        width={item.image.width}
                      />
                    )}
                    <div
                      className={cn(
                        'animate-intro',
                        `animation-delay-${overallItemIndex + 2}`,
                      )}
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
