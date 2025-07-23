import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLoadAnimationWrapper } from '@/src/components/page-load-animation';

export const metadata: Metadata = {
  title: '404',
  description: "Whatever you're looking for, it ain't here.",
};

export default function Colophon() {
  return (
    <PageLoadAnimationWrapper>
      <section>
        <h1 className="font-instrument-serif text-3xl md:text-4xl">
          <span>Page</span>
          <br />
          <span className="text-muted-foreground contrast-more:text-foreground">
            Not Found
          </span>
        </h1>
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
