import type { Project } from '@payload-types';
import PageIntro from '@website/src/components/layout/page-intro';
import type { ReactNode } from 'react';

export interface ProjectLayoutProps {
  project?: Project;
  children?: ReactNode;
}

export default function ProjectLayout(props: ProjectLayoutProps) {
  const { project, children } = props;

  return (
    <>
      <title>Tim Ritter - {project?.title}</title>
      <PageIntro title={project?.description} backButton backButtonHref='/' />
      {children}
    </>
  );
}
