import type { CollectionConfig } from 'payload/types';

const usersCollection: CollectionConfig = {
  slug: 'users',
  auth: true,
  access: {
    delete: () => false,
    update: () => false,
  },
  fields: [],
};

export default usersCollection;
