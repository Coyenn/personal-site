'use client';

import Spinner from '@website/src/components/common/spinner';
import { cn } from '@website/src/utilities/cn';
import { AnimatePresence, motion } from 'framer-motion';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import type React from 'react';
import { useEffect, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

export interface LightBoxProps {
  children: React.ReactNode;
  src: string | StaticImport;
  caption?: string;
  className?: string;
}

export default function LightBox(props: LightBoxProps) {
  const { children, caption, className } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);

  const openLightBox = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <button
        type='button'
        className={cn(
          'flex h-full w-full items-center justify-center',
          className,
        )}
        onClick={openLightBox}
      >
        {children}
      </button>
      <AnimatePresence>
        {isOpen && (
          <TransformWrapper>
            <motion.button
              className={cn(
                'fixed inset-0 z-50 flex flex-col items-center justify-center',
              )}
            >
              <motion.button
                aria-label='Close Lightbox'
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='absolute right-0 top-0 z-[51] m-4 p-2 text-white'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 fill-current'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 8.586L3.707 2.293 2.293 3.707 8.586 10l-6.293 6.293 1.414 1.414L10 11.414l6.293 6.293 1.414-1.414L11.414 10l6.293-6.293-1.414-1.414L10 8.586z'
                    clipRule='evenodd'
                  />
                </svg>
              </motion.button>
              <motion.div
                onClick={() => setIsOpen(false)}
                aria-hidden={!isOpen}
                aria-label='Close Lightbox'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='absolute inset-0 bg-black bg-opacity-70 !opacity-100'
              />
              <div
                className='pointer-events-none absolute inset-0 flex items-center justify-center'
                aria-hidden
              >
                {showSpinner && (
                  <Spinner
                    spinnerProps={{
                      className: 'h-8 w-8 fill-gray6 text-gray1',
                    }}
                  />
                )}
              </div>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={imageLoaded ? { scale: 1 } : { scale: 0.9 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <TransformComponent wrapperClass='lightbox-wrapper'>
                  <Image
                    src={props.src}
                    alt={caption ?? ''}
                    quality={100}
                    width={1920}
                    height={1080}
                    onLoadingComplete={() => {
                      setImageLoaded(true);

                      setTimeout(() => {
                        setShowSpinner(false);
                      }, 100);
                    }}
                    className={cn(
                      'flex max-h-[80vh] w-full items-center justify-center px-2',
                      !imageLoaded && 'opacity-0',
                    )}
                  />
                </TransformComponent>
              </motion.div>
            </motion.button>
          </TransformWrapper>
        )}
      </AnimatePresence>
    </>
  );
}
