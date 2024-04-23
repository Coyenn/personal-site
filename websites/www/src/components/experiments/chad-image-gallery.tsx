'use client';

import useDebouncedValue from '@website/src/components/hooks/use-debounced-value';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface ChadImageGalleryImage {
  src: string;
  alt: string;
}

export default function ChadImageGallery() {
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const [currentButton, setCurrentButton] = useState<string>('');
  const [debouncedCurrentButton, setDebouncedCurrentButton] = useDebouncedValue(
    currentButton,
    100,
  );
  const images: ChadImageGalleryImage[] = [
    {
      src: '/images/experiments/chad-image-gallery/2.png',
      alt: 'Chad Image Gallery 1',
    },
    {
      src: '/images/experiments/chad-image-gallery/3.png',
      alt: 'Chad Image Gallery 2',
    },
    {
      src: '/images/experiments/chad-image-gallery/2.png',
      alt: 'Chad Image Gallery 3',
    },
    {
      src: '/images/experiments/chad-image-gallery/3.png',
      alt: 'Chad Image Gallery 4',
    },
    {
      src: '/images/experiments/chad-image-gallery/2.png',
      alt: 'Chad Image Gallery 1',
    },
    {
      src: '/images/experiments/chad-image-gallery/3.png',
      alt: 'Chad Image Gallery 2',
    },
    {
      src: '/images/experiments/chad-image-gallery/2.png',
      alt: 'Chad Image Gallery 3',
    },
    {
      src: '/images/experiments/chad-image-gallery/3.png',
      alt: 'Chad Image Gallery 4',
    },
  ];

  useEffect(() => {
    const buttonContainer = buttonContainerRef.current;
    const buttons = buttonContainer?.querySelectorAll('button');

    buttons?.forEach((button, index) => {
      if (currentButton === '') {
        button.classList.remove('basis-[2.5%]', 'basis-[95%]');
        button.ariaCurrent = 'false';

        const image = button.querySelector('img');

        if (image) {
          image.classList.remove('opacity-30');
        }

        return;
      }

      const isCurrent = currentButton === index.toString();
      const image = button.querySelector('img');

      if (isCurrent) {
        button.classList.remove('basis-[2.5%]');
        button.classList.add('basis-[95%]');
        button.ariaCurrent = 'true';

        if (image) {
          image.classList.remove('opacity-30');
        }
      } else {
        button.classList.remove('basis-[95%]');
        button.classList.add('basis-[2.5%]');
        button.ariaCurrent = 'false';

        if (image) {
          image.classList.add('opacity-30');
        }
      }
    });
  }, [debouncedCurrentButton]);

  return (
    <div
      className='group flex aspect-[16/8.35] overflow-hidden'
      ref={buttonContainerRef}
    >
      {images.map((image) => (
        <button
          key={images.indexOf(image)}
          className='relative basis-[100%] overflow-hidden bg-gray6 transition-all duration-500'
          onMouseEnter={() =>
            setCurrentButton(images.indexOf(image).toString())
          }
          onMouseLeave={() => setCurrentButton('')}
          type='button'
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={1920}
            height={1080}
            className='h-full w-full object-cover transition-all duration-500'
          />
        </button>
      ))}
    </div>
  );
}
