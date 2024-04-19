import configPromise from '@payload-config';
import type { PageSectionBlock } from '@payload-types';
import ImageBlockComponent from '@website/src/components/blocks/image-block-component';
import TextBlockComponent from '@website/src/components/blocks/text-block-component';
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
          default:
            return null;
        }
      })}
    </>
  );
}
