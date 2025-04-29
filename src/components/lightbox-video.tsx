'use client';

import { cn } from '@/src/lib/utils';
import { Fragment, useState } from 'react';
import Lightbox, {
  useLightboxProps,
  useLightboxState,
} from 'yet-another-react-lightbox';

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

  return (
    <div
      style={{
        position: 'relative',
        pointerEvents: 'none',
        width: rect.width,
        height: rect.height,
      }}
    >
      <video
        autoPlay
        playsInline
        muted
        loop
        style={{
          width: 'min-content',
          height: '100%',
          objectPosition: 'center',
          objectFit: 'contain',
          cursor: click ? 'pointer' : undefined,
          pointerEvents: 'auto',
          marginInline: 'auto',
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
    </div>
  );
}

export interface LightboxVideoProps
  extends Omit<JSX.IntrinsicElements['video'], 'src'> {
  src: string;
  type: string;
  className?: string;
}

export default function LightboxVideo(props: LightboxVideoProps) {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[
          {
            src: props.src,
            width: Number(props.width),
            height: Number(props.height),
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
      <video
        className={cn(
          'bg-background w-auto h-auto max-w-full max-h-full',
          props.className,
        )}
        role="button"
        tabIndex={0}
        aria-label={props['aria-label'] || 'Video'}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setOpen(true);
        }}
        preload="none"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={props.src} type={props.type} />
        Your browser does not support the video tag.
      </video>
    </Fragment>
  );
}
