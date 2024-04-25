import ColorScheme from '@website/src/components/accessibility/color-scheme';
import Header from '@website/src/components/layout/header';
import TooltipProvider from '@website/src/components/providers/tooltip-provider';
import { Inter } from 'next/font/google';

import PageIntro from '@website/src/components/layout/page-intro';
import '@website/src/styles/globals.scss';
import { cn } from '@website/src/utilities/cn';

const inter = Inter({
  subsets: ['latin'],
  style: 'normal',
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export default function NotFound() {
  return (
    <main className={cn('h-screen bg-background', inter.className)}>
      <ColorScheme />
      <TooltipProvider>
        <Header />
        <div className='absolute inset-0 h-full flex items-center'>
          <PageIntro
            title={
              <>
                Sorry, the page you were looking
                <br />
                for could not be found.
              </>
            }
            backButton
          />
        </div>
      </TooltipProvider>
    </main>
  );
}
