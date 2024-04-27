import type { Block } from 'payload/types';

export const ToolsBlock: Block = {
  slug: 'Tools',
  interfaceName: 'ToolsBlock',
  labels: {
    plural: 'Tools',
    singular: 'Tools',
  },
  fields: [
    {
      name: 'tools',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};
