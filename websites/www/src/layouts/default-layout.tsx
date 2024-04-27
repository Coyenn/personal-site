import type { Page } from '@payload-types';
import PageIntro from '@website/src/components/layout/page-intro';
import type { ReactNode } from 'react';

export interface DefaultLayoutProps {
  page?: Page;
  children?: ReactNode;
}

export default function DefaultLayout(props: DefaultLayoutProps) {
  const { page, children } = props;
  const intro = page?.intro;

  return (
    <>
      {intro && <PageIntro title={intro} />}
      {children}
    </>
  );
}
