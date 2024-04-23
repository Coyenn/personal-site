import Container, {
  type ContainerProps,
} from '@website/src/components/layout/container';
import { cn } from '@website/src/utilities/cn';
import type React from 'react';

interface PageSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  size?: ContainerProps['size'];
  disablePadding?: boolean;
  disableContainer?: boolean;
}

function PageSection(props: PageSectionProps) {
  const {
    children,
    className,
    containerClassName,
    size: maxWidth = 'default',
    disablePadding = false,
    disableContainer = false,
    ...restProps
  } = props;

  return (
    <section
      className={cn(
        disablePadding ? '' : 'mx-auto py-8 md:py-10 lg:py-12',
        className,
      )}
      {...restProps}
    >
      {!disableContainer ? (
        <Container size={maxWidth} className={cn(containerClassName)}>
          {children}
        </Container>
      ) : (
        children
      )}
    </section>
  );
}

export default PageSection;
