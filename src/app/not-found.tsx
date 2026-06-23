import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeading } from '@/src/components/page-heading';
import { PageLoadAnimationWrapper } from '@/src/components/page-load-animation';

export const metadata: Metadata = {
  title: '404',
  description: "Whatever you're looking for, it ain't here.",
};

export default function Colophon() {
  return (
    <PageLoadAnimationWrapper>
      <section>
        <PageHeading title="Page" subtitle="Not Found" />
      </section>
      <section>
        <p>
          The page you're looking for doesn't exist.{' '}
          <Link href="/">Go home</Link>.
        </p>
      </section>
    </PageLoadAnimationWrapper>
  );
}
