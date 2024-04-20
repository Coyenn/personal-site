import type { Block } from 'payload/types';

export const ImageBlock: Block = {
  slug: 'Image',
  interfaceName: 'ImageBlock',
  fields: [
    {
      name: 'image',
      relationTo: 'media',
      required: true,
      type: 'upload',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
  ],
};
