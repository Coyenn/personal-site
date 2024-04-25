import type { Page } from '@payload-types';
import Footer from '@website/src/components/layout/footer';
import Header, {
  type HeaderItemProps,
} from '@website/src/components/layout/header';
import PageIntro from '@website/src/components/layout/page-intro';
import type { ReactNode } from 'react';

export interface DefaultLayoutProps {
  page?: Page;
  headerItems?: HeaderItemProps[];
  children?: ReactNode;
}

export default function DefaultLayout(props: DefaultLayoutProps) {
  const { page, children, headerItems } = props;
  const intro = page?.intro;

  return (
    <>
      <title>Tim Ritter - {page?.title}</title>
      <Header items={headerItems ?? []} />
      {intro && <PageIntro title={intro} />}
      {children}
      <Footer />
    </>
  );
}
