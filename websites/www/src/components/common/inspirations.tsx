import Link from 'next/link';

import FloatingTooltip from '@website/src/components/common/floating-tooltip';
import MasonryGrid from '@website/src/components/layout/masonry';
import { MasonryItem } from '@website/src/components/layout/masonry';
import Image from '@website/src/components/media/image';
import type { InspirationItem, Media } from '@payload-types';

interface InspirationsProps {
  items: InspirationItem[];
}

function InspirationItemComponent(props: InspirationItem) {
  const { image, title, link } = props;
  // Replace https:// and www and trailing slash
  const displayLink = link
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '');

  return (
    <MasonryItem>
      <FloatingTooltip text='View'>
        <Link href={link} target={'_blank'} className='block p-2'>
          <div className='flex w-full flex-col gap-4 transition-all duration-300 group relative'>
            <div
              className='flex flex-col gap-2 aspect-[4/3] justify-center items-center bg-gray6 p-4'
              aria-hidden
            >
              <Image
                src={(image as Media)?.url ?? ''}
                alt={(image as Media)?.alt ?? ''}
                width={800}
                height={450}
                loading='lazy'
                quality={90}
                className='w-full bg-gray5 border border-gray5'
              />
            </div>
            <div className='flex items-center justify-between gap-4 absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 mx-4 mb-2 translate-y-2 group-hover:translate-y-0 transition-all duration-200'>
              <p className='text-gray1' aria-hidden>
                {title}
              </p>
              <p className='text-gray2' aria-hidden>
                {displayLink}
              </p>
            </div>
          </div>
        </Link>
      </FloatingTooltip>
    </MasonryItem>
  );
}

export default function Inspirations(props: InspirationsProps) {
  const { items } = props;

  return (
    <MasonryGrid>
      {items.map((item, index) => (
        <InspirationItemComponent key={index} {...item} />
      ))}
    </MasonryGrid>
  );
}
