import type { Project } from '@payload-types';
import { SlugField } from '@repo/custom-fields';
import { PageSectionBlock } from '@website/src/blocks/page-section-block';
import { revalidateTag } from 'next/cache';
import type {
  CollectionAfterChangeHook,
  CollectionConfig,
} from 'payload/types';

// Invalidate cache
const afterChangeHook: CollectionAfterChangeHook = async ({ doc }) => {
  const pageSlug = (doc as Project)?.slug ?? '';

  console.log('Invalidating cache for', pageSlug);

  revalidateTag(pageSlug);

  return doc;
};

const projectsCollection: CollectionConfig = {
  slug: 'projects',
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
      name: 'description',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'timeframe',
      type: 'text',
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

export default projectsCollection;
