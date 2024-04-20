import type { CollectionConfig } from 'payload/types';

const mediaCollection: CollectionConfig = {
  slug: 'media',
  upload: true,
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'copyright',
      type: 'text',
    },
    {
      name: 'caption',
      type: 'textarea',
    },
  ],
};

export default mediaCollection;
