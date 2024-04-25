import configPromise from '@payload-config';
import type { HeaderItemProps } from '@website/src/components/layout/header';
import { getPayload } from 'payload';

async function getHeaderItems(): Promise<HeaderItemProps[]> {
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

  const headerItems = pages.map((page) => ({
    href: page.slug,
    title: page.title,
  })) as HeaderItemProps[];

  headerItems.sort((a, b) => a.title.localeCompare(b.title));

  // if an item with the link / is in the items, move it to the top
  headerItems.forEach((item, index) => {
    if (item.href === '/') {
      headerItems.splice(index, 1);
      headerItems.unshift(item);
    }
  });

  return headerItems;
}

export default getHeaderItems;
