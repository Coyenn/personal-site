import { CollectionConfig } from "payload/types";

const mediaCollection: CollectionConfig = {
  slug: 'media',
  upload: true,
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
}

export default mediaCollection