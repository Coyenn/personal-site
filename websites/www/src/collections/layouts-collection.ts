import type { CollectionConfig } from 'payload/types';

const layoutsCollection: CollectionConfig = {
  slug: 'layouts',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'identifier',
      type: 'text',
    },
  ],
};

export default layoutsCollection;
