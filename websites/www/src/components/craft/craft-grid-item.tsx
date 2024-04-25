'use client';

import type { ReactNode } from 'react';

import { MasonryItem } from '@website/src/components/layout/masonry';

interface CraftGridItemProps {
  children: ReactNode;
  onClick?: () => void;
}

function CraftGridItem(props: CraftGridItemProps) {
  const { children, onClick } = props;

  return (
    <div className='mb-2 md:m-2'>
      <MasonryItem>
        <button
          className='block h-full w-full relative overflow-hidden'
          onClick={onClick}
          type='button'
        >
          <div
            className='flex flex-col items-center hover:scale-[102%] transition-transform duration-300'
            aria-hidden
          >
            {children}
          </div>
        </button>
      </MasonryItem>
    </div>
  );
}

export default CraftGridItem;
