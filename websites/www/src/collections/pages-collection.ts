import { SlugField } from '@repo/custom-fields';
import { PageSectionBlock } from '@website/src/blocks/page-section-block';
import type { CollectionConfig } from 'payload/types';

const pagesCollection: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    ...SlugField(
      {
        name: 'slug',
      },
      {},
    ),
    {
      name: 'layout',
      type: 'relationship',
      relationTo: 'layouts',
      required: true,
    },
    {
      name: 'content',
      type: 'blocks',
      minRows: 0,
      maxRows: 99,
      blocks: [PageSectionBlock],
    },
  ],
};

export default pagesCollection;
