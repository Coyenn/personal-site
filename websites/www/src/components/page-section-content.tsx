import configPromise from '@payload-config';
import type { PageSectionBlock } from '@payload-types';
import BlogPostsBlockComponent from '@website/src/components/blocks/blog-posts-block-component';
import CraftBlockComponent from '@website/src/components/blocks/craft-block-component';
import ImageBlockComponent from '@website/src/components/blocks/image-block-component';
import ImageSliderBlockComponent from '@website/src/components/blocks/image-slider-block-component';
import InspirationsBlockComponent from '@website/src/components/blocks/inspirations-block-component';
import ProjectsBlockComponent from '@website/src/components/blocks/projects-block-component';
import ShowReelBlockComponent from '@website/src/components/blocks/show-reel-block-component';
import StatsBlockComponent from '@website/src/components/blocks/stats-block-component';
import TextBlockComponent from '@website/src/components/blocks/text-block-component';
import ToolsBlockComponent from '@website/src/components/blocks/tools-block-component';
import { getPayload } from 'payload';

export interface PageSectionContentProps {
  content?: PageSectionBlock['content'];
}

export async function PageSectionContent(props: PageSectionContentProps) {
  const { content } = props;
  const payload = await getPayload({
    config: configPromise,
  });

  return (
    <>
      {content?.map((block) => {
        switch (block.blockType) {
          case 'Image':
            return <ImageBlockComponent {...block} key={block.id} />;
          case 'Text':
            return (
              <TextBlockComponent {...block} payload={payload} key={block.id} />
            );
          case 'ShowReel':
            return <ShowReelBlockComponent key={block.id} />;
          case 'Projects':
            return <ProjectsBlockComponent payload={payload} key={block.id} />;
          case 'BlogPosts':
            return <BlogPostsBlockComponent key={block.id} payload={payload} />;
          case 'Inspirations':
            return (
              <InspirationsBlockComponent key={block.id} payload={payload} />
            );
          case 'Craft':
            return <CraftBlockComponent key={block.id} payload={payload} />;
          case 'ImageSlider':
            return <ImageSliderBlockComponent {...block} key={block.id} />;
          case 'Stats':
            return <StatsBlockComponent {...block} key={block.id} />;
          case 'Tools':
            return <ToolsBlockComponent {...block} key={block.id} />;
          default:
            return null;
        }
      })}
    </>
  );
}
