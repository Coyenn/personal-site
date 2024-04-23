'use client';

import Caption from '@website/src/components/common/caption';
import Draggable from '@website/src/components/utility/draggable';
import type React from 'react';

export interface SlideProps {
  children: React.ReactNode;
}

export interface SliderProps {
  children: React.ReactNode;
  caption?: string;
}

export function Slide(props: SlideProps) {
  const { children } = props;

  return (
    <div className='flex min-w-[80vw] object-cover sm:min-w-[75vw] md:min-w-[55vw] mb-10 sm:mb-12 md:mb-16 lg:mb-20 '>
      {children}
    </div>
  );
}

export default function Slider(props: SliderProps) {
  const { children, caption } = props;

  return (
    <div className='overflow-visible bg-transparent sm:pl-10 md:pl-16 lg:pl-20'>
      <Draggable className='flex gap-4 sm:gap-8 md:gap-12 lg:gap-16 custom-scrollbar relative mx-4 overflow-x-auto overflow-y-visible sm:mx-0'>
        {children}
      </Draggable>
      <Caption>{caption}</Caption>
    </div>
  );
}
