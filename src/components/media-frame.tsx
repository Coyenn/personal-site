import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/src/lib/utils';

export interface MediaFrameProps {
  width: number;
  height: number;
  className?: string;
  children: ReactNode;
  /** Fixed display size for lightbox slides. Defaults to fluid width + aspect-ratio. */
  fitted?: { width: number; height: number };
  style?: CSSProperties;
  /** Clip children to the frame border radius. Disable while zooming so scale isn't cut off. */
  clip?: boolean;
}

export function MediaFrame({
  width,
  height,
  className,
  children,
  fitted,
  style,
  clip = true,
}: MediaFrameProps) {
  const frameStyle: CSSProperties = fitted
    ? { width: fitted.width, height: fitted.height, ...style }
    : { aspectRatio: `${width} / ${height}`, ...style };

  return (
    <div
      className={cn(
        'relative',
        fitted ? undefined : 'w-full',
        clip && 'overflow-hidden',
        className,
      )}
      style={frameStyle}
    >
      {children}
    </div>
  );
}
