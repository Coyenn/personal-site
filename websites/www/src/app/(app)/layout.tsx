import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter, Newsreader } from 'next/font/google';
import type React from 'react';

import ColorScheme from '@website/src/components/accessibility/color-scheme';
import JumpToContent from '@website/src/components/accessibility/jump-to-content';
import FloatingTooltipListener from '@website/src/components/common/floating-tooltip-listener';
import PageTransition from '@website/src/components/common/page-transition';
import Footer from '@website/src/components/layout/footer';
import Header from '@website/src/components/layout/header';
import TooltipProvider from '@website/src/components/providers/tooltip-provider';

import '@website/src/styles/globals.scss';

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['italic'],
  display: 'swap',
  variable: '--font-newsreader',
  preload: true,
});

const inter = Inter({
  subsets: ['latin'],
  style: 'normal',
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Tim Ritter — Frontend Developer',
  description: "I'm a frontend developer based in Leipzig, Germany.",
  openGraph: {
    title: 'Tim Ritter — Frontend Developer',
    description: "I'm a frontend developer based in Leipzig, Germany.",
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        alt: 'Tim Ritter — Frontend Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: '/twitter-image.png',
        alt: 'Tim Ritter — Frontend Developer',
      },
    ],
    creator: '@Kojenia',
  },
};

function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <html lang='en' className={`${newsreader.variable} ${inter.variable}`}>
      <body className='bg-background'>
        <main id='content' className='bg-background antialiased min-h-screen'>
          <TooltipProvider>
            <PageTransition />
            <ColorScheme />
            <JumpToContent />
            <Header />
            {children}
            <FloatingTooltipListener />
            <Footer />
          </TooltipProvider>
        </main>
        <Analytics />
      </body>
    </html>
  );
}

export default Layout;
