'use client';

import { useAnimate } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const variants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,
  },
};

export default function PageTransition() {
  const [scope, animate] = useAnimate();
  const pathname = usePathname();

  useEffect(() => {
    animate(scope.current, variants.initial, {
      duration: 0,
    });
    setTimeout(() => {
      animate(scope.current, variants.animate, {
        duration: 0.3,
      });
    }, 100);
  }, [pathname]);

  return (
    <div
      className='fixed inset-0 w-full h-full bg-background z-[1] pointer-events-none'
      ref={scope}
      aria-hidden
    />
  );
}
