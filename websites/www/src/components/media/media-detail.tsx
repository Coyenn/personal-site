import type { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import FadeIn from '@website/src/components/common/fade-in';
import Spinner from '@website/src/components/common/spinner';
import Image from '@website/src/components/media/image';
import { cn } from '@website/src/utilities/cn';

export interface MediaDetailItemProps {
  title: string;
  description?: string;
  link?: string;
  target?: string;
  tags?: string[];
  image?: StaticImageData;
  video?: string;
  showPlaceholderImage?: boolean;
}

export interface MediaDetailProps extends MediaDetailItemProps {
  similar?: MediaDetailItemProps[];
  open: boolean;
  onClose: () => void;
  onSimilarClick?: (item: MediaDetailItemProps) => void;
}

const MediaDetail = (props: MediaDetailProps) => {
  const {
    title,
    description,
    link,
    target,
    image,
    video,
    similar,
    onSimilarClick,
    open = false,
    showPlaceholderImage = false,
    tags,
  } = props;
  const [contentIsLoading, setContentIsLoading] = useState(true);

  function enableScrollingOnBody() {
    document.body.style.overflow = 'auto';
  }

  useEffect(() => {
    // Dispatch onClose when the user presses the escape key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        props.onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setContentIsLoading(true);
  }, [image, video]);

  return (
    <>
      {open && (
        <div className='fixed inset-0 z-50 h-full w-full overflow-y-auto bg-background lg:flex lg:overflow-hidden'>
          <div className='mt-10 flex w-full items-center justify-center p-12 lg:mt-0'>
            <button
              onClick={props.onClose}
              className='absolute left-6 top-6 text-gray1 lg:left-8 lg:top-8 link-effect h-8 w-7 flex items-center justify-center'
              type='button'
            >
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
              >
                <path
                  d='M18 6L6 18'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='square'
                  strokeLinejoin='round'
                />
                <path
                  d='M6 6L18 18'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='square'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
            <FadeIn runAnimation={!contentIsLoading}>
              {image ? (
                <Image
                  src={image}
                  alt={title}
                  width={1400}
                  quality={100}
                  loading='eager'
                  placeholder={showPlaceholderImage ? 'blur' : 'empty'}
                  className={cn(
                    'max-h-[80vh] w-auto max-w-[90vw] object-contain lg:max-w-full xl:max-w-[60vw]',
                    contentIsLoading ? 'hidden' : 'border border-gray6',
                  )}
                  sizes='100vw'
                  onLoad={() => {
                    setTimeout(() => {
                      setContentIsLoading(false);
                    }, 10);
                  }}
                />
              ) : (
                <video
                  className={cn(
                    'max-h-[80vh] w-auto max-w-[90vw] object-contain lg:max-w-full xl:max-w-[50vw]',
                    contentIsLoading ? 'hidden' : 'border border-gray6',
                  )}
                  onLoadedData={() => {
                    setTimeout(() => {
                      setContentIsLoading(false);
                    }, 10);
                  }}
                  autoPlay
                  loop
                  muted
                  playsInline
                  src={video}
                />
              )}
            </FadeIn>
            {contentIsLoading && (
              <div className='flex items-center justify-center'>
                <Spinner
                  spinnerProps={{
                    className: 'h-8 w-8 fill-gray1 text-gray6',
                  }}
                />
              </div>
            )}
          </div>
          <div className='border-t border-gray6 p-6 text-gray1 lg:w-[450px] lg:overflow-y-auto lg:border-l lg:border-t-0 lg:p-8'>
            <FadeIn>
              <div className='flex flex-col gap-8 lg:gap-14'>
                <div className='flex flex-col gap-3 lg:gap-4'>
                  <h1>{title}</h1>
                  <p className='text-gray3'>{description}</p>
                  {link && (
                    <Link
                      href={link}
                      target={target}
                      scroll={false}
                      className='hover:underline'
                      onClick={enableScrollingOnBody}
                    >
                      {link.startsWith('/') ? `tim-ritter.com${link}` : link}
                    </Link>
                  )}
                  {tags && (
                    <div className='flex flex-wrap gap-2'>
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className='rounded bg-gray6 px-2 py-1 text-xs text-gray2'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {similar && (
                  <div className='flex flex-col gap-3 lg:gap-4'>
                    <h2>You may also like</h2>
                    <div className='flex flex-col gap-2'>
                      {similar.map((similarItem) => (
                        <button
                          key={similarItem.title}
                          onClick={() => onSimilarClick?.(similarItem)}
                          className='w-full rounded-lg bg-gray6 px-4 py-3 text-xs text-gray2 transition-colors hover:bg-gray5 hover:text-gray1 dark:text-gray3 dark:hover:text-gray2'
                          type='button'
                        >
                          {similarItem.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      )}
    </>
  );
};

export default MediaDetail;
