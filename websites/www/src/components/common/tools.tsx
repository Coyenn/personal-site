import Link from 'next/link';
import type React from 'react';

export interface ToolProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  description: string;
  href: string;
}

export interface ToolsProps {
  tools: ToolProps[];
}

export default function Tool({ name, description, href }: ToolProps) {
  return (
    <Link
      href={href}
      target='_blank'
      className='link-effect group relative p-2 transition-colors'
    >
      <h3 className='mb-1 text-lg text-gray1'>{name}</h3>
      <span className={'text-gray2'}>{description}</span>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='absolute right-2 top-2 text-gray3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100'
        aria-hidden='true'
      >
        <line x1='7' y1='17' x2='17' y2='7' />
        <polyline points='7 7 17 7 17 17' />
      </svg>
    </Link>
  );
}

export function Tools(props: ToolsProps) {
  const { tools } = props;

  return (
    <div className='grid grid-cols-2 gap-4 sm:gap-6'>
      {tools.map((tool, index) => (
        <Tool key={index} {...tool} />
      ))}
    </div>
  );
}
