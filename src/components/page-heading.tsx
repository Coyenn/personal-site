import type { ReactNode } from 'react';
import { cn } from '@/src/lib/utils';

interface PageHeadingProps {
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}

export function PageHeading({ title, subtitle, className }: PageHeadingProps) {
  return (
    <h1 className={cn('font-instrument-serif fl-text-3xl/5xl', className)}>
      {subtitle ? (
        <>
          <span>{title}</span>
          <br />
          <span className="text-muted-foreground contrast-more:text-foreground">
            {subtitle}
          </span>
        </>
      ) : (
        title
      )}
    </h1>
  );
}
