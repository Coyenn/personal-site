import type { Block } from 'payload/types';

export const TextBlock: Block = {
  slug: 'Text',
  interfaceName: 'TextBlock',
  labels: {
    plural: 'Text',
    singular: 'Text',
  },
  fields: [
    {
      name: 'text',
      type: 'richText',
      required: true,
    },
  ],
};
