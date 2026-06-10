'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Lightbox, {
  useLightboxProps,
  useLightboxState,
} from 'yet-another-react-lightbox';
import { MediaFrame } from '@/src/components/media-frame';
import { fitMediaInRect } from '@/src/lib/fit-media-in-rect';

import 'yet-another-react-lightbox/styles.css';

export interface NextJsVideoProps {
  slide: {
    src: string;
    type?: string;
    width?: number;
    height?: number;
  };
  offset: number;
  rect: { width: number; height: number };
}

function NextJsVideo({ slide, offset, rect }: NextJsVideoProps) {
  const {
    on: { click },
  } = useLightboxProps();
  const { currentIndex } = useLightboxState();

  if (!slide.width || !slide.height) return undefined;

  const fitted = fitMediaInRect(
    slide.width,
    slide.height,
    rect.width,
    rect.height,
  );

  return (
    <MediaFrame
      width={slide.width}
      height={slide.height}
      fitted={fitted}
      style={{ pointerEvents: 'none' }}
    >
      <video
        autoPlay
        playsInline
        muted
        loop
        className="h-full w-full object-contain"
        style={{
          cursor: click ? 'pointer' : undefined,
          pointerEvents: 'auto',
        }}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter') click?.({ index: currentIndex });
        }}
      >
        <source src={slide.src} type={slide.type} />
        Your browser does not support the video tag.
      </video>
    </MediaFrame>
  );
}

export interface LightboxVideoProps
  extends Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src'> {
  src: string;
  type: string;
  width: number;
  height: number;
  className?: string;
}

export default function LightboxVideo(props: LightboxVideoProps) {
  const [open, setOpen] = useState(false);
  const { src, type, width, height, className, ...rest } = props;

  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: inViewRef, inView } = useInView({ rootMargin: '200px 0px' });

  const setRefs = (el: HTMLVideoElement | null) => {
    (videoRef as React.MutableRefObject<HTMLVideoElement | null>).current = el;
    inViewRef(el);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView && !open) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, open]);

  return (
    <Fragment>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[
          {
            src,
            width,
            height,
          },
        ]}
        carousel={{ finite: true, padding: '5%' }}
        controller={{
          closeOnBackdropClick: true,
        }}
        noScroll={{
          disabled: true,
        }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
          slide: NextJsVideo,
        }}
      />
      <MediaFrame width={width} height={height} className={className}>
        {/* biome-ignore lint/a11y/useSemanticElements: Needs to be a video tag */}
        <video
          ref={setRefs}
          className="h-full w-full object-cover [content-visibility:auto]"
          role="button"
          tabIndex={0}
          aria-label={rest['aria-label'] || 'Video'}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setOpen(true);
          }}
          preload="metadata"
          loop
          muted
          playsInline
        >
          <source src={src} type={type} />
          Your browser does not support the video tag.
        </video>
      </MediaFrame>
    </Fragment>
  );
}
