'use client';

import * as Tooltip from '@radix-ui/react-tooltip';

export interface TooltipProviderProps {
  children: React.ReactNode;
}

export default function TooltipProvider(props: TooltipProviderProps) {
  const { children } = props;

  return <Tooltip.Provider delayDuration={300}>{children}</Tooltip.Provider>;
}
