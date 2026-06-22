import {
  Children,
  type CSSProperties,
  cloneElement,
  Fragment,
  type HTMLAttributes,
  isValidElement,
  type ReactNode,
} from 'react';
import { cn } from '@/src/lib/utils';

export interface PageLoadAnimationWrapperProps {
  children?: ReactNode;
}

export function PageLoadAnimationWrapper(props: PageLoadAnimationWrapperProps) {
  const { children } = props;

  return (
    <Fragment>
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            className: cn(
              'animate-intro motion-reduce:duration-0 motion-reduce:opacity-100',
              (child.props as { className?: string })?.className,
            ),
            style: {
              ...(child.props as { style?: CSSProperties })?.style,
              animationDelay: `${(index + 2) * 150}ms`,
            },
          } as HTMLAttributes<HTMLElement>);
        }
        return child;
      })}
    </Fragment>
  );
}
