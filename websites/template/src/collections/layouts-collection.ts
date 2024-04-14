import { CollectionConfig } from "payload/types";

const layoutsCollection: CollectionConfig = {
  slug: 'layouts',
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'identifier',
      type: 'text',
    }
  ],
}

export default layoutsCollection