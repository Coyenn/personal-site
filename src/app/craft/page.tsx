import CraftItems from '@/src/components/craft/craft-items';
import { PageLoadAnimationWrapper } from '@/src/components/page-load-animation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Craft',
  description: 'A gallery of my designs and experiments.',
  openGraph: {
    title: 'Tim Ritter — Craft',
    description: 'A gallery of my designs and experiments.',
    url: 'https://tim.cv',
    siteName: 'Tim Ritter',
    images: [
      {
        url: 'https://tim.cv/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Craft, Tim Ritter — Design Engineer.',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://tim.cv/craft',
  },
};

export default function Craft() {
  return (
    <PageLoadAnimationWrapper>
      <section>
        <h1 className="font-instrument-serif text-3xl md:text-4xl">
          <span>Craft</span>
          <br />
          <span className="text-muted-foreground contrast-more:text-foreground">
            Designs <span className="font-ovo">&</span> Experiments
          </span>
        </h1>
      </section>
      <CraftItems />
    </PageLoadAnimationWrapper>
  );
}
