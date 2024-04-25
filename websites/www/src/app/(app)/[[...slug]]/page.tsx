import PageContent from '@website/src/components/page-content';
import PageLayout from '@website/src/components/page-layout';
import getHeaderItems from '@website/src/utilities/get-header-items';
import getPageData from '@website/src/utilities/get-page-data';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug?: string;
  };
}

export default async function Page(props: PageProps) {
  const page = await getPageData(props.params.slug || '/');
  const headerItems = await getHeaderItems();

  if (!page) return notFound();

  return (
    <PageLayout page={page} headerItems={headerItems}>
      <PageContent content={page?.content} />
    </PageLayout>
  );
}
