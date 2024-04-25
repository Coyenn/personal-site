import configPromise from '@payload-config';
import type { HeaderItemProps } from '@website/src/components/layout/header';
import { getPayload } from 'payload';

async function getFooterItems(): Promise<HeaderItemProps[]> {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: 'pages',
    where: {
      'in-header': {
        equals: true,
      },
    },
  });

  const pages = data.docs;

  return pages.map((page) => ({
    href: page.slug,
    title: page.title,
  })) as HeaderItemProps[];
}

export default getFooterItems;
