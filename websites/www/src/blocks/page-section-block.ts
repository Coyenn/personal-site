import { BlogPostsBlock } from '@website/src/blocks/blog-posts-block';
import { CraftBlock } from '@website/src/blocks/craft-block';
import { ImageBlock } from '@website/src/blocks/image-block';
import { ImageSliderBlock } from '@website/src/blocks/image-slider-block';
import { InspirationsBlock } from '@website/src/blocks/inspirations-block';
import { ProjectsBlock } from '@website/src/blocks/projects-block';
import { ShowReelBlock } from '@website/src/blocks/show-reel-block';
import { StatsBlock } from '@website/src/blocks/stats-block';
import { TextBlock } from '@website/src/blocks/text-block';
import { ToolsBlock } from '@website/src/blocks/tools-block';
import type { Block } from 'payload/types';

export const PageSectionBlock: Block = {
  slug: 'PageSection',
  interfaceName: 'PageSectionBlock',
  labels: {
    plural: 'Page Sections',
    singular: 'Page Section',
  },
  fields: [
    {
      name: 'size',
      type: 'select',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Extra Small', value: 'xs' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'lg' },
        { label: 'Large', value: 'xl' },
        { label: 'Extra Large', value: '2xl' },
        { label: 'Full Width', value: 'full' },
      ],
      defaultValue: 'default',
      required: true,
    },
    {
      name: 'content',
      type: 'blocks',
      minRows: 0,
      maxRows: 99,
      blocks: [
        ImageBlock,
        TextBlock,
        ShowReelBlock,
        ProjectsBlock,
        BlogPostsBlock,
        InspirationsBlock,
        CraftBlock,
        ImageSliderBlock,
        StatsBlock,
        ToolsBlock,
      ],
    },
    {
      name: 'disablePadding',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'disableContainer',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
};
