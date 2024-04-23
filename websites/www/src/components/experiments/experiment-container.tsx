import { cn } from '@website/src/utilities/cn';
import type { ReactNode } from 'react';

export interface ExperimentContainerProps {
  children?: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function ExperimentContainer(props: ExperimentContainerProps) {
  const { className, title, subtitle, children } = props;

  return (
    <div>
      <div
        className={cn(
          'flex h-full w-full items-center justify-center bg-gray6 p-4',
          className,
        )}
      >
        {children}
      </div>
      <div className='mt-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center sm:gap-4'>
        <p className='text-gray1'>{title}</p>
        <p className='text-gray2'>{subtitle}</p>
      </div>
    </div>
  );
}
