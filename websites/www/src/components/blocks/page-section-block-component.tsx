import type { PageSectionBlock as PageSectionBlockType } from '@payload-types';
import PageSection from '@website/src/components/layout/page-section';
import { PageSectionContent } from '@website/src/components/page-section-content';
import type React from 'react';

export default function PageSectionBlockComponent(props: PageSectionBlockType) {
  const { content, disableContainer, disablePadding, size } = props;

  return (
    <PageSection
      size={size}
      disablePadding={disablePadding ?? false}
      disableContainer={disableContainer ?? false}
    >
      <PageSectionContent content={content} />
    </PageSection>
  );
}
