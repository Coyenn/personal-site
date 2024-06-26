import type { BlogPost } from '@payload-types';
import { SlugField } from '@repo/custom-fields';
import { PageSectionBlock } from '@website/src/blocks/page-section-block';
import { revalidateTag } from 'next/cache';
import type {
  CollectionAfterChangeHook,
  CollectionConfig,
} from 'payload/types';

// Invalidate cache
const afterChangeHook: CollectionAfterChangeHook = async ({ doc }) => {
  const pageSlug = (doc as BlogPost)?.slug ?? '';

  console.log('Invalidating cache for', pageSlug);

  revalidateTag(pageSlug);

  return doc;
};

const blogPostsCollection: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [afterChangeHook],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'image',
      relationTo: 'media',
      required: true,
      type: 'upload',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'authors',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          relationTo: 'media',
          required: true,
          type: 'upload',
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
      ],
    },
    ...SlugField({
      name: 'slug',
    }),
    {
      name: 'content',
      type: 'blocks',
      minRows: 0,
      maxRows: 99,
      blocks: [PageSectionBlock],
    },
  ],
};

export default blogPostsCollection;
