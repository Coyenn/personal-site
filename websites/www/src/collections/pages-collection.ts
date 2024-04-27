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
      admin: {
        position: 'sidebar',
      },
    },
    ...SlugField({
      name: 'slug',
    }),
    {
      name: 'layout',
      type: 'select',
      admin: {
        position: 'sidebar',
      },
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
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'in-footer',
      type: 'checkbox',
      label: 'Appears in footer',
      defaultValue: false,
      required: false,
      admin: {
        position: 'sidebar',
      },
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
