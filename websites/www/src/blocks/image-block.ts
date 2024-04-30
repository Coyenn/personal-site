import type { Block } from 'payload/types';

export const ImageBlock: Block = {
  slug: 'Image',
  interfaceName: 'ImageBlock',
  labels: {
    plural: 'Images',
    singular: 'Image',
  },
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
    {
      name: 'lightbox',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
};
