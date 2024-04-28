import PageContent from '@website/src/components/page-content';
import PageLayout from '@website/src/components/page-layout';
import getPageData from '@website/src/utilities/get-page-data';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug?: string | string[];
  };
}

function getPageSlug(slug?: string | string[]) {
  let pageSlug = '/';

  if (typeof slug === 'string' && slug !== 'index') {
    pageSlug = pageSlug + slug;
  }

  if (Array.isArray(slug)) {
    pageSlug = pageSlug + slug.join('/');
  }

  return pageSlug;
}

export default async function Page(props: PageProps) {
  const page = await getPageData(getPageSlug(props.params.slug));

  if (!page) return notFound();

  return (
    <PageLayout page={page}>
      <PageContent content={page?.content} />
    </PageLayout>
  );
}
