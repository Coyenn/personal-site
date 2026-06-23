'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { markInitialLoadComplete } from '@/src/lib/intro-animation';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function IntroAnimationGate() {
  const pathname = usePathname();
  const isInitialRender = useRef(true);

  useIsomorphicLayoutEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    document.documentElement.dataset.navigated = 'true';
  }, [pathname]);

  useEffect(() => {
    markInitialLoadComplete();
  }, []);

  return null;
}
