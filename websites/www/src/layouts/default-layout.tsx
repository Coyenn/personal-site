import type { Page } from '@payload-types';
import { PageSection } from '@website/src/components/blocks/page-section-block-component';

export interface DefaultLayoutProps {
  page?: Page;
  children?: React.ReactNode;
}

export default function DefaultLayout(props: DefaultLayoutProps) {
  const { page, children } = props;

  return (
    <>
      <title>{page?.title}</title>
      <PageSection className='my-2 sm:my-4 md:my-6 lg:my-8'>
        <h1 className='font-normal text-3xl'>{page?.title}</h1>
      </PageSection>
      {children}
    </>
  );
}
