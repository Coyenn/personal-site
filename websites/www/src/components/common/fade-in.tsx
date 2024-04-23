'use client';

import { motion } from 'framer-motion';
import type React from 'react';

interface FadeInProps {
  children: React.ReactNode;
  runAnimation?: boolean;
}

export default function FadeIn(props: FadeInProps) {
  const { children, runAnimation = true } = props;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={runAnimation ? { opacity: 1 } : undefined}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
