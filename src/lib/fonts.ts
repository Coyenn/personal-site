import { DM_Sans, Instrument_Serif, Newsreader, Ovo } from 'next/font/google';

export const inter = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-sans',
});

export const newsreader = Newsreader({
  subsets: ['latin'],
  style: 'italic',
  variable: '--font-serif',
});

export const ovo = Ovo({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-ovo',
});

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-instrument-serif',
});
