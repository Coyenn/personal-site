'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import { useEffect, useState } from 'react';
import { default as ReactClock } from 'react-clock';

export default function Clock() {
  const [value, setValue] = useState(new Date(0));

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <ReactClock
            value={value}
            size={30}
            hourHandWidth={1}
            minuteHandWidth={1}
          />
        </Tooltip.Trigger>
        <Tooltip.Content className='tooltip-content' sideOffset={10}>
          <span className='sr-only'>It is currently</span>
          {value.toLocaleTimeString()}
        </Tooltip.Content>
      </Tooltip.Root>
    </div>
  );
}
