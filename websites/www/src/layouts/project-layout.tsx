import type { Project } from '@payload-types';
import TextButton from '@website/src/components/common/text-button';
import PageIntro from '@website/src/components/layout/page-intro';
import PageSection from '@website/src/components/layout/page-section';
import type { ReactNode } from 'react';
import parse from 'html-react-parser';

export interface ProjectLayoutProps {
  project?: Project;
  children?: ReactNode;
}

export default function ProjectLayout(props: ProjectLayoutProps) {
  const { project, children } = props;

  return (
    <>
      <PageIntro
        title={parse(project?.description ?? '')}
        backButton
        backButtonHref='/'
      />
      {children}
      <PageSection size='xs' containerClassName='flex justify-center py-10'>
        <TextButton>
          <span
            className='inline-block text-lg transition-transform group-hover:rotate-[-20deg] sm:text-xl'
            aria-hidden
          >
            ⤺
          </span>
          <span>Go back</span>
        </TextButton>
      </PageSection>
    </>
  );
}
