import { SlugField } from '@repo/custom-fields';
import type { CollectionConfig } from 'payload/types';

const craftItemsCollection: CollectionConfig = {
  slug: 'craft-items',
  admin: {
    useAsTitle: 'title',
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
      required: false,
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
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
      required: false,
    },
    ...SlugField({
      name: 'slug',
    }),
  ],
};

export default craftItemsCollection;
