import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export interface UseScrollScaleProps {
  scaleKeyframes: number[];
}

export const useScrollScale = (props: UseScrollScaleProps) => {
  const { scaleKeyframes } = props;
  const { scrollY } = useScroll();
  const endRef = useRef<HTMLSpanElement>(null);
  const positionY = endRef.current?.getBoundingClientRect().top;
  const scrollYProgress = useTransform(scrollY, (value) => {
    const progress = (value - (positionY ?? 0)) / (window?.innerHeight / 2);

    return Math.min(Math.max(progress, 0), 1);
  });
  const scale = useTransform(scrollYProgress, [0, 1], scaleKeyframes);

  return {
    scale,
    showReelEndRef: endRef,
  };
};
