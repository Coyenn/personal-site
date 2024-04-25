import configPromise from '@payload-config';
import { getPayload } from 'payload';

async function getPageData(slug: string | string[]) {
  const payload = await getPayload({
    config: configPromise,
  });

  const page = (
    await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: typeof slug === 'string' ? slug : `/${slug.join('/')}`,
        },
      },
    })
  ).docs[0];

  const project = (
    await payload.find({
      collection: 'projects',
      where: {
        slug: {
          equals: typeof slug === 'string' ? slug : `/${slug.join('/')}`,
        },
      },
    })
  ).docs[0];

  const blogPost = (
    await payload.find({
      collection: 'blog-posts',
      where: {
        slug: {
          equals: typeof slug === 'string' ? slug : `/${slug.join('/')}`,
        },
      },
    })
  ).docs[0];

  return page ?? project ?? blogPost;
}

export default getPageData;
