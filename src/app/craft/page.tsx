import type { Metadata } from 'next';
import CraftItems from '@/src/components/craft/craft-items';
import { SiteContainer } from '@/src/components/layout/site-container';
import { PageHeading } from '@/src/components/page-heading';
import { PageLoadAnimationWrapper } from '@/src/components/page-load-animation';

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
    <SiteContainer>
      <SiteContainer.Content>
        <PageLoadAnimationWrapper>
          <section>
            <PageHeading
              title="Craft"
              subtitle={
                <>
                  Designs <span className="font-ovo">&</span> Experiments
                </>
              }
            />
          </section>
          <CraftItems />
        </PageLoadAnimationWrapper>
      </SiteContainer.Content>
    </SiteContainer>
  );
}
