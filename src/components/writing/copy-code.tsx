'use client';

import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import ArrowIcon from '@/src/components/icons/arrow-icon';
import CopyIcon from '@/src/components/icons/copy-icon';

export interface CopyCodeProps {
  code: string;
}

export default function CopyCode(props: CopyCodeProps) {
  const [copied, setCopied] = useState(false);
  const { code } = props;

  return (
    <button
      type="button"
      className="absolute top-1 right-1 h-6 w-6 rounded border border-transparent hover:border-foreground/5 text-foreground/30 hover:text-foreground contrast-more:text-foreground bg-white dark:bg-muted transition-all"
      onClick={async () => {
        if (copied === true) return;

        setCopied(true);
        await navigator.clipboard.writeText(code);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }}
    >
      <span className="sr-only">
        {copied ? 'Copied to clipboard!' : 'Copy code'}
      </span>
      <AnimatePresence>
        {copied && (
          <CopyIcon
            className="w-4 h-4 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            asMotion
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            mode={'popLayout'}
            transition={{ duration: 0.3, delay: 0.1 }}
            fill="none"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!copied && (
          <ArrowIcon
            className="w-4 h-4 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            asMotion
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            mode={'popLayout'}
            transition={{ duration: 0.3, delay: 0.1 }}
            fill="none"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </button>
  );
}
