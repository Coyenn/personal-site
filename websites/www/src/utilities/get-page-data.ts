import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { cache } from 'react';

// Notice the use of cache to ensure that the payload is only fetched once
const getPageData = cache(async (slug: string) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const page = (
    await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
    })
  ).docs[0];

  const project = (
    await payload.find({
      collection: 'projects',
      where: {
        slug: {
          equals: slug,
        },
      },
    })
  ).docs[0];

  const blogPost = (
    await payload.find({
      collection: 'blog-posts',
      where: {
        slug: {
          equals: slug,
        },
      },
    })
  ).docs[0];

  return page ?? project ?? blogPost;
});

export default getPageData;
