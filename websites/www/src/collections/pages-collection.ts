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
    {
      name: 'slug',
      type: 'text',
    },
    {
      name: 'layout',
      type: 'select',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
      ],
      defaultValue: 'default',
      required: true,
    },
    {
      name: 'in-header',
      type: 'checkbox',
      label: 'Appears in header',
      defaultValue: false,
      required: false,
    },
    {
      name: 'in-footer',
      type: 'checkbox',
      label: 'Appears in footer',
      defaultValue: false,
      required: false,
    },
    {
      name: 'intro',
      type: 'textarea',
      required: false,
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
