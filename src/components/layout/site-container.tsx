import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/src/lib/utils';

interface SiteContainerSlotProps {
  children?: ReactNode;
  className?: string;
}

interface SiteContainerRootProps extends SiteContainerSlotProps {
  width?: number;
}

function SiteContainerRoot({
  children,
  className,
  width = 750,
}: SiteContainerRootProps) {
  return (
    <div
      style={{ '--site-col': `${width}px` } as CSSProperties}
      className={cn(
        'grid grid-cols-1 min-[1100px]:grid-cols-[minmax(0,1fr)_minmax(0,var(--site-col))_minmax(0,1fr)]',
        className,
      )}
    >
      {children}
    </div>
  );
}

function SiteContainerContent({ children, className }: SiteContainerSlotProps) {
  return (
    <div
      className={cn(
        'mx-auto flex w-full max-w-[var(--site-col)] flex-col gap-y-10 px-4 md:gap-y-12 min-[1100px]:col-start-2 min-[1100px]:row-start-1',
        className,
      )}
    >
      {children}
    </div>
  );
}

function SiteContainerLeft({ children, className }: SiteContainerSlotProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[var(--site-col)] px-4 min-[1100px]:col-start-1 min-[1100px]:row-start-1 min-[1100px]:mx-0 min-[1100px]:max-w-none min-[1100px]:px-0',
        className,
      )}
    >
      {children}
    </div>
  );
}

function SiteContainerRight({ children, className }: SiteContainerSlotProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[var(--site-col)] px-4 min-[1100px]:col-start-3 min-[1100px]:row-start-1 min-[1100px]:mx-0 min-[1100px]:max-w-none min-[1100px]:px-0',
        className,
      )}
    >
      {children}
    </div>
  );
}

export const SiteContainer = Object.assign(SiteContainerRoot, {
  Content: SiteContainerContent,
  Left: SiteContainerLeft,
  Right: SiteContainerRight,
});
