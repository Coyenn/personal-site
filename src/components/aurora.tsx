import { cn } from '@/src/lib/utils';
import type React from 'react';

interface AuroraProps extends React.HTMLProps<HTMLDivElement> {
  gradientClassName?: string;
  gradient?: string;
}

export default function Aurora(props: AuroraProps) {
  const {
    className,
    gradient = '[--aurora:repeating-linear-gradient(100deg,#002C39_15%,#007A7F_10%,#015061_20%,#00E980_25%,#00FFBB_30%)]',
    gradientClassName,
    ...rest
  } = props;

  return (
    <div
      className={cn(
        'transition-bg print:hidden absolute left-0 right-0 bottom-0 -top-[20vh] overflow-hidden motion-reduce:!hidden animate-intro duration-1000 animation-delay-3 max-h-[50vh]',
        className,
      )}
      {...rest}
    >
      <div
        className={cn(
          `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            xl:[background-size:100%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[5px] invert dark:invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)]
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%]
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-0 dark:opacity-30 will-change-transform
						[mask-image:radial-gradient(ellipse_at_50%_0%,black_5%,var(--transparent)_70%)]
            mb-5 min-w-[400px] w-full left-1/2 -translate-x-1/2`,
          gradient,
          gradientClassName,
        )}
      />
    </div>
  );
}
