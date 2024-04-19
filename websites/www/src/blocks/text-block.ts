import type { Block } from 'payload/types';

export const TextBlock: Block = {
  slug: 'Text',
  interfaceName: 'TextBlock',
  fields: [
    {
      name: 'text',
      type: 'richText',
      required: true,
    },
  ],
};
