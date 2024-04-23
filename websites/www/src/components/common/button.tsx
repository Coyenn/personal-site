import { cn } from '@website/src/utilities/cn';
import Link from 'next/link';
import type React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
  href?: string;
  disabled?: boolean;
}

function ButtonBase(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'medium',
    href,
    className = '',
    children,
    loading,
    disabled,
    ...rest
  } = props;

  const variantClasses = {
    primary:
      'bg-gray1 dark:bg-gray1 dark:text-gray6 dark:hover:bg-gray2 text-white hover:bg-zinc-800 border-b-2 border-black dark:border-gray6',
    secondary:
      'bg-background text-gray1 hover:bg-gray6 border border-gray4 dark:border-gray6 dark:hover:bg-gray6 border-t-gray6',
    tertiary: 'bg-transparent text-zinc-700 hover:bg-zinc-100',
  };
  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base',
  };
  const loadingClasses = {
    primary: 'bg-zinc-700 text-transparent',
    secondary: 'bg-white text-transparent',
    tertiary: 'bg-transparent text-zinc-700',
  };
  const disabledClasses = {
    primary: 'bg-zinc-300 text-white hover:bg-zinc-700',
    secondary: 'bg-zinc-300 text-zinc-700 hover:bg-zinc-100',
    tertiary: 'bg-transparent text-zinc-300 hover:bg-zinc-100',
  };

  return (
    <button
      className={cn(
        'flex items-center justify-center rounded shadow-sm transition-all duration-300',
        sizeClasses[size],
        variantClasses[variant],
        loading && loadingClasses[variant],
        disabled && disabledClasses[variant],
        className,
      )}
      {...rest}
    >
      {loading && (
        <svg
          aria-hidden='true'
          role='status'
          className='mr-2 inline h-4 w-4 animate-spin text-gray-200'
          viewBox='0 0 100 101'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
            className='fill-zinc-700 stroke-zinc-700'
            strokeWidth='3'
          />
          <path
            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328
                37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
            className='fill-white stroke-white'
            strokeWidth='3'
          />
        </svg>
      )}
      {children}
    </button>
  );
}

function ButtonWithLink(props: ButtonProps) {
  const { href = '', ...rest } = props;

  return (
    <Link href={href} className='block w-full'>
      <ButtonBase {...rest} />
    </Link>
  );
}

function ButtonWithoutLink(props: ButtonProps) {
  const { ...rest } = props;

  return <ButtonBase {...rest} />;
}

export default function Button(props: ButtonProps) {
  const { href, ...rest } = props;

  if (href) {
    return <ButtonWithLink {...props} />;
  }

  return <ButtonWithoutLink {...rest} />;
}
