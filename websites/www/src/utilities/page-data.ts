import configPromise from '@payload-config';
import { getPayload } from 'payload';

async function pageData(slug: string | string[]) {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: typeof slug === 'string' ? slug : `/${slug.join('/')}`,
      },
    },
  });

  return data.docs[0];
}

export default pageData;
