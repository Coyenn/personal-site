'use client';

import ListIcon from '@/src/components/icons/list-icon';
import SliderIcon from '@/src/components/icons/slider-icon';
import { Button } from '@/src/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/src/components/ui/tooltip';
import { useCraftMode } from '@/src/hooks/use-craft-mode';
import { cn } from '@/src/lib/utils';
import { AnimatePresence } from 'framer-motion';

export type CraftMode = 'slider' | 'list';

export interface CraftModeToggleProps {
  className?: string;
}

export default function CraftModeToggle(props: CraftModeToggleProps) {
  const { className } = props;
  const { mode, setMode } = useCraftMode();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className={cn('h-8 w-8', className)}
          variant={'secondary'}
          size={'icon'}
          onClick={() => setMode(mode === 'slider' ? 'list' : 'slider')}
        >
          <AnimatePresence mode="wait">
            {mode === 'slider' && (
              <ListIcon
                key="list"
                asMotion
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  filter: 'blur(1px)',
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px)',
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  filter: 'blur(1px)',
                }}
                transition={{ duration: 0.3 }}
                className="absolute"
              />
            )}
          </AnimatePresence>
          {mode === 'list' && (
            <AnimatePresence mode="wait">
              <SliderIcon
                key="slider"
                asMotion
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  filter: 'blur(1px)',
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px)',
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  filter: 'blur(1px)',
                }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          {mode === 'slider' ? 'Switch to list mode' : 'Switch to slider mode'}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
