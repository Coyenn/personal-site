import { ImageBlock } from '@website/src/blocks/image-block';
import { TextBlock } from '@website/src/blocks/text-block';
import type { Block } from 'payload/types';

export const PageSectionBlock: Block = {
  slug: 'PageSection',
  interfaceName: 'PageSectionBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'content',
      type: 'blocks',
      minRows: 0,
      maxRows: 99,
      blocks: [ImageBlock, TextBlock],
    },
  ],
};
