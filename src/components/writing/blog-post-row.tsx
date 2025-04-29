'use client';

import { Image } from '@/src/components/image/image';
import { useHighlightList } from '@/src/hooks/use-highlight-list';
import { cn } from '@/src/lib/utils';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import slugify from 'slugify';

export interface BlogPostRowProps {
  className?: string;
  items: {
    image: {
      src: string;
      alt: string;
      placeholder: string;
      width: number;
      height: number;
    };
    href: string;
  }[];
}

export default function BlogPostRow(props: BlogPostRowProps) {
  const { items, className } = props;
  const highlightIndex = useHighlightList((state) => state.highlightIndex);
  const setHighlightIndex = useHighlightList(
    (state) => state.setHighlightIndex,
  );

  return (
    <div
      className={cn(
        'flex justify-center items-center relative h-[30vw] sm:h-[200px] md:-mx-10',
        className,
      )}
    >
      {items.map((item, index) => {
        const rotations = [-12, 6, -10];
        const scaleValue = useMotionValue(0.85);
        const scaleSpring = useSpring(scaleValue, {
          stiffness: 700,
          damping: 40,
        });
        const [isDragging, setIsDragging] = useState(false);

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

          return () => {
            document.documentElement.style.cursor = 'auto';
          };
        }, [isDragging]);

        // biome-ignore lint/correctness/useExhaustiveDependencies: Only run on highlightIndex change
        useEffect(() => {
          if (highlightIndex === index) {
            scaleSpring.set(1.05);
          } else {
            scaleSpring.set(1);
          }
        }, [highlightIndex]);

        return (
          <motion.div
            key={slugify(item.href)}
            className="w-[36%] z-[1] block absolute bg-black shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl sm:rounded-3xl"
            drag
            dragConstraints={{ left: 0, right: 0, bottom: 0, top: 0 }}
            dragElastic={0.5}
            dragTransition={{
              max: 50,
              bounceStiffness: 1000,
              bounceDamping: 50,
            }}
            style={{
              rotate: rotations[index % 3],
              scale: scaleSpring,
              left: `${index * 31}%`,
            }}
            onHoverStart={() => {
              scaleSpring.set(1.05);
              setHighlightIndex(index);
            }}
            onHoverEnd={() => {
              scaleSpring.set(1);
              setHighlightIndex(null);
            }}
            onMouseDown={() => {
              scaleSpring.set(0.95);
              setHighlightIndex(index);
            }}
            onMouseUp={() => {
              scaleSpring.set(1);
              setHighlightIndex(null);
            }}
            onDragStart={() => {
              scaleSpring.set(0.95);
              setHighlightIndex(index);
              setIsDragging(true);
            }}
            onDragEnd={() => {
              scaleSpring.set(1);
              setHighlightIndex(null);
              setIsDragging(false);
            }}
          >
            <Link
              href={item.href}
              draggable={false}
              className="relative rounded-xl sm:rounded-3xl block"
              style={{
                cursor: isDragging ? 'grabbing' : 'pointer',
              }}
            >
              <Image
                {...item.image}
                src={item.image.src}
                placeholder="blur"
                blurDataURL={item.image.placeholder}
                className="h-full w-full aspect-[16/11] object-cover rounded-xl sm:rounded-3xl"
              />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
