import {
  default as NextImage,
  type ImageProps as NextImageProps,
} from 'next/image';

import Caption from '@website/src/components/common/caption';
import LightBox from '@website/src/components/common/lightbox';
import { cn } from '@website/src/utilities/cn';

export interface ImageProps extends NextImageProps {
  caption?: string;
  lightbox?: boolean;
  lightboxClassName?: string;
}

export default function Image({
  caption,
  lightbox,
  lightboxClassName,
  className,
  ...props
}: ImageProps) {
  if (lightbox)
    return (
      <>
        <LightBox
          className={lightboxClassName}
          caption={caption}
          src={props.src}
        >
          <NextImage className={cn(className, 'drag-none')} {...props} />
        </LightBox>
        {caption && (
          <div
            className={cn(
              'mx-auto flex max-w-lg justify-center px-6',
              className,
            )}
          >
            <Caption>{caption}</Caption>
          </div>
        )}
      </>
    );

  return (
    <>
      <NextImage className={cn(className, 'drag-none')} {...props} />
      {caption && (
        <div className='mx-auto flex max-w-lg justify-center px-6'>
          <Caption>{caption}</Caption>
        </div>
      )}
    </>
  );
}
