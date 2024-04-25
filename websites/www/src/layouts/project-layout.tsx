import type { Project } from '@payload-types';
import Footer from '@website/src/components/layout/footer';
import Header, {
  type HeaderItemProps,
} from '@website/src/components/layout/header';
import PageIntro from '@website/src/components/layout/page-intro';
import type { ReactNode } from 'react';

export interface ProjectLayoutProps {
  project?: Project;
  headerItems?: HeaderItemProps[];
  children?: ReactNode;
}

export default function ProjectLayout(props: ProjectLayoutProps) {
  const { project, children, headerItems } = props;

  return (
    <>
      <title>Tim Ritter - {project?.title}</title>
      <Header items={headerItems ?? []} />
      <PageIntro title={project?.description} backButton backButtonHref='/' />
      {children}
      <Footer />
    </>
  );
}
