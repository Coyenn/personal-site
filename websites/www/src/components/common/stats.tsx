'use client';

import { cn } from '@website/src/utilities/cn';
import CountUp from 'react-countup';

export interface StatProps {
  name: string;
  value: number | string;
  suffix?: string;
  className?: string;
}

export interface StatsProps {
  stats: StatProps[];
}

export default function Stat(props: StatProps) {
  return (
    <div className={cn('flex w-fit flex-col items-center', props.className)}>
      <span className='mb-1 text-lg text-gray1 md:text-xl'>
        {typeof props.value === 'number' && (
          <CountUp
            end={props.value}
            suffix={props.suffix}
            duration={3}
            enableScrollSpy
          />
        )}
        {typeof props.value === 'string' && props.value}
      </span>
      <span className={'text-sm text-gray2'}>{props.name}</span>
    </div>
  );
}

export function Stats(props: StatsProps) {
  const { stats } = props;

  return (
    <div className='flex justify-between gap-8 sm:gap-4'>
      {stats.map((stat, index) => (
        <Stat key={index} {...stat} />
      ))}
    </div>
  );
}
