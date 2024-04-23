import { cn } from '@website/src/utilities/cn';

export interface ContainerProps {
  className?: string;
  children?: React.ReactNode;
  size?: 'default' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | 'full';
}

function Container(props: ContainerProps) {
  const { children, className = '', size = 'default' } = props;
  const sizeClasses = {
    default: 'max-w-[1000px]',
    xs: 'max-w-[650px]',
    sm: 'max-w-[800px]',
    lg: 'max-w-[1100px]',
    xl: 'max-w-[1500px]',
    '2xl': 'max-w-[2000px]',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8 relative',
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Container;
