'use client';

import * as animationData from '@website/public/videos/showreel/showreel.json';
import { useScrollScale } from '@website/src/components/hooks/use-scroll-scale';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

const itemVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: 'spring',
    },
  },
  hidden: {
    opacity: 0,
    y: 20,
  },
};

export default function ShowReel() {
  const { scale, showReelEndRef } = useScrollScale({
    scaleKeyframes: [0.85, 1],
  });

  return (
    <motion.div
      variants={itemVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      className='relative w-full h-full aspect-[2.13/1] cursor-default'
      style={{
        scale,
      }}
    >
      <Lottie
        style={{
          cursor: 'default',
        }}
        animationData={animationData}
        loop={true}
        autoPlay={true}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice',
        }}
      />
      <span ref={showReelEndRef} />
    </motion.div>
  );
}
