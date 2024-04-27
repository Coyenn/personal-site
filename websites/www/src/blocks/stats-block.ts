import type { Block } from 'payload/types';

export const StatsBlock: Block = {
  slug: 'Stats',
  interfaceName: 'StatsBlock',
  fields: [
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};
