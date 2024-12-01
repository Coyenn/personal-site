'use client';

import { useHighlightList } from '@/src/hooks/use-highlight-list';
import { cn } from '@/src/lib/utils';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import slugify from 'slugify';

export interface BlogPostRowProps {
  className?: string;
  items: {
    image: {
      src?: string;
      alt: string;
      width: number;
      height: number;
    };
    href: string;
  }[];
}

export default function BlogPostRow(props: BlogPostRowProps) {
  const { items, className } = props;
  const [initialised, setInitialised] = useState(false);
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
        const rotationValue = useMotionValue(0);
        const rotationSpring = useSpring(0, {
          stiffness: 600,
          damping: 40,
        });
        const scaleValue = useMotionValue(0.85);
        const scaleSpring = useSpring(scaleValue, {
          stiffness: 400,
          damping: 20,
        });
        const opacityValue = useMotionValue(0);
        const opacitySpring = useSpring(opacityValue, {
          stiffness: 300,
          damping: 20,
        });
        const translateXValue = useMotionValue(0);
        const translateXSpring = useSpring(translateXValue, {
          stiffness: 300,
          damping: 20,
        });
        const [isDragging, setIsDragging] = useState(false);

        // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
        useEffect(() => {
          setTimeout(
            () => {
              scaleSpring.set(1);
              rotationSpring.set(rotations[index]);
              opacitySpring.set(1);
              setInitialised(true);
            },
            400 + index * 200,
          );

          return () => {
            rotationValue.destroy();
            scaleValue.destroy();
          };
        }, []);

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
          if (highlightIndex === null || initialised === false) {
            return;
          }

          if (highlightIndex === index) {
            rotationSpring.set(0);
            scaleSpring.set(1.05);
            translateXSpring.set(-30);
          } else {
            rotationSpring.set(rotations[index]);
            scaleSpring.set(1);
            translateXSpring.set(0);
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
              rotate: rotationSpring,
              scale: scaleSpring,
              left: `${index * 31}%`,
              opacity: opacitySpring,
              transform: `translateX(${translateXSpring}px)`,
            }}
            onHoverStart={() => {
              rotationSpring.set(0);
              scaleSpring.set(1.05);
              translateXSpring.set(-30);
              setHighlightIndex(index);
            }}
            onHoverEnd={() => {
              rotationSpring.set(rotations[index]);
              scaleSpring.set(1);
              translateXSpring.set(0);
              setHighlightIndex(null);
            }}
            onMouseDown={() => {
              rotationSpring.set(0);
              scaleSpring.set(0.95);
              setHighlightIndex(index);
            }}
            onMouseUp={() => {
              rotationSpring.set(rotations[index]);
              scaleSpring.set(1);
              setHighlightIndex(null);
            }}
            onDragStart={() => {
              rotationSpring.set(0);
              scaleSpring.set(0.95);
              setHighlightIndex(index);
              setIsDragging(true);
            }}
            onDragEnd={() => {
              rotationSpring.set(rotations[index]);
              scaleSpring.set(1);
              setHighlightIndex(null);
              setIsDragging(false);
            }}
          >
            <Link
              href={item.href}
              draggable={false}
              className="relative rounded-xl sm:rounded-3xl"
              style={{
                cursor: isDragging ? 'grabbing' : 'pointer',
              }}
            >
              <Image
                {...item.image}
                src={item.image.src ?? ''}
                quality={90}
                priority
                draggable={false}
                className="h-full w-full aspect-[16/11] object-cover rounded-xl sm:rounded-3xl"
              />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
