import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/src/lib/utils';

export interface MediaFrameProps {
  width: number;
  height: number;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
  clip?: boolean;
}

export function MediaFrame({
  width,
  height,
  className,
  children,
  style,
  clip = true,
}: MediaFrameProps) {
  return (
    <div
      className={cn('relative w-full', clip && 'overflow-hidden', className)}
      style={{ aspectRatio: `${width} / ${height}`, ...style }}
    >
      {children}
    </div>
  );
}
