'use client';

import { Button } from '@/src/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/src/components/ui/tooltip';
import { useCraftMode } from '@/src/hooks/use-craft-mode';
import { cn } from '@/src/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

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
          className={cn(className, 'h-8 w-8')}
          variant={'primary'}
          size={'icon'}
          onClick={() => setMode(mode === 'slider' ? 'list' : 'slider')}
        >
          <AnimatePresence mode="wait">
            {mode === 'slider' && (
              <motion.svg
                key="list"
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
                width="24"
                height="24"
                className="absolute"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>List Mode</title>
                <path
                  d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4Z"
                  fill="currentColor"
                />
                <path
                  d="M3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12Z"
                  fill="currentColor"
                />
                <path
                  d="M3 18C3 17.4477 3.44772 17 4 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18Z"
                  fill="currentColor"
                />
              </motion.svg>
            )}
          </AnimatePresence>
          {mode === 'list' && (
            <AnimatePresence mode="wait">
              <motion.svg
                key="slider"
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
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Slider Mode</title>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.1615 3H13.8385C14.3657 2.99998 14.8205 2.99997 15.195 3.03057C15.5904 3.06287 15.9836 3.13419 16.362 3.32698C16.9265 3.6146 17.3854 4.07354 17.673 4.63803C17.8658 5.01641 17.9371 5.40963 17.9694 5.80497C18 6.17955 18 6.63432 18 7.16148V16.8385C18 17.3657 18 17.8205 17.9694 18.195C17.9371 18.5904 17.8658 18.9836 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.9836 20.8658 15.5904 20.9371 15.195 20.9694C14.8205 21 14.3657 21 13.8386 21H10.1614C9.63429 21 9.17954 21 8.80497 20.9694C8.40963 20.9371 8.01641 20.8658 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6.13419 18.9836 6.06287 18.5904 6.03057 18.195C5.99997 17.8205 5.99998 17.3657 6 16.8385V7.16146C5.99998 6.63431 5.99997 6.17955 6.03057 5.80497C6.06287 5.40963 6.13419 5.01641 6.32698 4.63803C6.6146 4.07354 7.07354 3.6146 7.63803 3.32698C8.01641 3.13419 8.40963 3.06287 8.80497 3.03057C9.17954 2.99997 9.63431 2.99998 10.1615 3ZM3 5C3.55228 5 4 5.44772 4 6V18C4 18.5523 3.55228 19 3 19C2.44772 19 2 18.5523 2 18V6C2 5.44772 2.44772 5 3 5ZM21 5C21.5523 5 22 5.44772 22 6V18C22 18.5523 21.5523 19 21 19C20.4477 19 20 18.5523 20 18V6C20 5.44772 20.4477 5 21 5Z"
                  fill="currentColor"
                />
              </motion.svg>
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
