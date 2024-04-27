import type { Block } from 'payload/types';

export const ImageSliderBlock: Block = {
  slug: 'ImageSlider',
  interfaceName: 'ImageSliderBlock',
  labels: {
    plural: 'Image Sliders',
    singular: 'Image Slider',
  },
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
