import type { Page } from '@payload-types';

import PageSectionBlockComponent from '@website/src/components/blocks/page-section-block-component';

export interface PageContentProps {
  content?: Page['content'];
}

export default function PageContent(props: PageContentProps) {
  const { content } = props;

  return (
    <>
      {content?.map((block) => {
        return <PageSectionBlockComponent {...block} key={block.id} />;
      })}
    </>
  );
}
