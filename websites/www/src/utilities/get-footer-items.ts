import configPromise from '@payload-config';
import type { FooterItemProps } from '@website/src/components/layout/footer';
import { getPayload } from 'payload';

async function getFooterItems(): Promise<FooterItemProps[]> {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: 'pages',
    where: {
      'in-footer': {
        equals: true,
      },
    },
  });

  const pages = data.docs;

  return pages.map((page) => ({
    href: page.slug,
    title: page.title,
  })) as FooterItemProps[];
}

export default getFooterItems;
