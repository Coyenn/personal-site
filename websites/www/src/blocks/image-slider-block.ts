import type { Block } from 'payload/types';

export const ImageSliderBlock: Block = {
  slug: 'ImageSlider',
  interfaceName: 'ImageSliderBlock',
  fields: [
    {
      name: 'images',
      type: 'array',
      minRows: 1,
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
    },
  ],
};
