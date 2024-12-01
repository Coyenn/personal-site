import { PageLoadAnimationWrapper } from '@/src/components/page-load-animation';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Colophon',
  description:
    'Paying homage to the creators & tools that made this site possible.',
  openGraph: {
    title: 'Tim Ritter — Colophon',
    description:
      'Paying homage to the creators & tools that made this site possible.',
    url: 'https://tim-ritter.com',
    siteName: 'Tim Ritter',
    images: [
      {
        url: 'https://tim-ritter.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Colophon, Tim Ritter — Design Engineer.',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://tim-ritter.com/colophon',
  },
};

export default function Colophon() {
  return (
    <PageLoadAnimationWrapper>
      <section>
        <h1 className="font-instrument-serif text-3xl md:text-4xl">Colophon</h1>
      </section>
      <section>
        <p>
          Paying homage to the creators <span className="font-ovo">&</span>{' '}
          tools that made this site possible.
        </p>
      </section>
      <section className="flex flex-col gap-y-6">
        <h2>Tech stack</h2>
        <p>
          Built with{' '}
          <Link href="https://nextjs.org" target="_blank">
            Next.js
          </Link>
          ,{' '}
          <Link href="https://ui.shadcn.com" target="_blank">
            ShadCN/UI
          </Link>
          , and{' '}
          <Link href="https://tailwindcss.com" target="_blank">
            Tailwind CSS
          </Link>
          . Hosted on{' '}
          <Link href="https://vercel.com" target="_blank">
            Vercel
          </Link>
          . Source code available on{' '}
          <Link href="https://github.com/Coyenn/personal-site" target="_blank">
            GitHub
          </Link>
          .
        </p>
      </section>
      <section className="flex flex-col gap-y-6">
        <h2 id="inspiration">Inspiration</h2>
        <ul aria-labelledby="inspiration" className="grid grid-cols-1 gap-2">
          <li>
            <Link href="https://harshsingh.xyz/" target="_blank">
              harshsingh.xyz
            </Link>
          </li>
          <li>
            <Link href="https://paco.me/" target="_blank">
              paco.me
            </Link>
          </li>
          <li>
            <Link href="https://stallboerger.com/" target="_blank">
              stallboerger.com
            </Link>
          </li>
          <li>
            <Link href="https://rauno.me/" target="_blank">
              rauno.me
            </Link>
          </li>
          <li>
            <Link href="https://glenn.me/" target="_blank">
              glenn.me
            </Link>
          </li>
          <li>
            <Link href="https://oguzyagiz.com/" target="_blank">
              oguzyagiz.com
            </Link>
          </li>
          <li>
            <Link href="https://joebell.studio/" target="_blank">
              joebell.studio
            </Link>
          </li>
        </ul>
      </section>
      <section className="flex flex-col gap-y-6">
        <h2 id="fonts">Fonts</h2>
        <ul aria-labelledby="fonts" className="grid grid-cols-1 gap-2">
          <li>
            <Link
              href="https://fonts.google.com/specimen/DM+Sans"
              target="_blank"
            >
              DM Sans
            </Link>
          </li>
          <li>
            <Link
              href="https://fonts.google.com/specimen/Newsreader"
              target="_blank"
            >
              Newsreader
            </Link>
          </li>
          <li>
            <Link href="https://fonts.google.com/specimen/Ovo" target="_blank">
              Ovo
            </Link>
          </li>
          <li>
            <Link
              href="https://fonts.google.com/specimen/Instrument+Serif"
              target="_blank"
            >
              Instrument Serif
            </Link>
          </li>
        </ul>
      </section>
      <section className="flex flex-col gap-y-6">
        <h2 id="icons">Icons</h2>
        <ul aria-labelledby="icons" className="grid grid-cols-1 gap-2">
          <li>
            <Link href="https://icons.saman.design/" target="_blank">
              Saman Icons
            </Link>
          </li>
          <li>
            <Link href="https://heroicons.com/" target="_blank">
              Hero Icons
            </Link>
          </li>
          <li>
            <Link href="https://lucide.dev/" target="_blank">
              Lucide Icons
            </Link>
          </li>
        </ul>
      </section>
    </PageLoadAnimationWrapper>
  );
}
