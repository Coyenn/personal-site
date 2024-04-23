'use client';

import { motion } from 'framer-motion';
import type { ReactElement, ReactNode } from 'react';
import {
  ResponsiveMasonry,
  default as VendorMasonryGrid,
} from 'react-responsive-masonry';

export interface MasonryGridProps {
  // biome-ignore lint/suspicious/noExplicitAny: VendorMasonryGrid is dumb
  children: any;
  cols?: number;
}

export interface MasonryItemProps {
  children: ReactNode;
}

export function MasonryItem(props: MasonryItemProps) {
  const { children } = props;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default function MasonryGrid(props: MasonryGridProps) {
  const { children, cols = 3 } = props;
  const breakpoints = {
    350: 1,
    750: 2,
    1100: cols,
  };

  return (
    <ResponsiveMasonry columnsCountBreakPoints={breakpoints}>
      <VendorMasonryGrid gutter='0'>{children}</VendorMasonryGrid>
    </ResponsiveMasonry>
  );
}
