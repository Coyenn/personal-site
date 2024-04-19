import type { Layout, Page } from '@payload-types';

import DefaultLayout from '@website/src/layouts/default-layout';

export interface PageContentProps {
  page?: Page;
}

export default function PageLayout(props: PageContentProps) {
  const { page } = props;
  const layout = page?.layout as Layout;

  switch (layout.identifier) {
    case 'default':
      return <DefaultLayout page={page} key={page?.id} />;
    default:
      return null;
  }
}
