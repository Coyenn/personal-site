import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { memoize } from 'nextjs-better-unstable-cache';

// Notice the use of memoize to ensure that the payload is only fetched periodically
const getPageData = memoize(
  async (slug: string) => {
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
  },
  {
    // Enable persistance between requests, default true
    persist: true,

    // Invalidation period, default Infinity
    duration: 3600, // 1 hour

    // For next's revalidateTags() purposes.
    revalidateTags: (slug) => ['pages', slug],

    // Extra cache identifier to make cache unique from others
    additionalCacheKey: ['pages'],

    // Enable logs to see timer or whether it triggers ODR or BR
    log: ['dedupe', 'datacache', 'verbose'],
  },
);

export default getPageData;
