import { cn } from '@website/src/utilities/cn';
import type React from 'react';

export interface CaptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Caption({
  children,
  className,
  ...props
}: CaptionProps) {
  return (
    <p
      className={cn('my-4 text-center text-sm text-gray2', className)}
      {...props}
    >
      {children}
    </p>
  );
}
