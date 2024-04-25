import type { CollectionConfig } from 'payload/types';

const inspirationItemsCollection: CollectionConfig = {
  slug: 'inspiration-items',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'link',
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
  ],
};

export default inspirationItemsCollection;
