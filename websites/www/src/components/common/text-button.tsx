import { cn } from '@website/src/utilities/cn';
import Link from 'next/link';

export interface TextButtonProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children?: React.ReactNode;
}

export default function TextButton(props: TextButtonProps) {
  const { href = '/', children, ...restProps } = props;

  return (
    <Link
      href={href}
      className={cn(
        'link-effect group flex w-fit items-center gap-1 text-gray1',
      )}
      {...restProps}
    >
      {children}
    </Link>
  );
}
