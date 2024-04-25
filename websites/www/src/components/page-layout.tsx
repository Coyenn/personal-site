import type { BlogPost, Page, Project } from '@payload-types';
import type { HeaderItemProps } from '@website/src/components/layout/header';
import BlogPostLayout from '@website/src/layouts/blog-post-layout';

import DefaultLayout from '@website/src/layouts/default-layout';
import ProjectLayout from '@website/src/layouts/project-layout';

export interface PageLayoutProps {
  page?: Page | Project | BlogPost;
  headerItems?: HeaderItemProps[];
  children?: React.ReactNode;
}

export default function PageLayout(props: PageLayoutProps) {
  const { page, children } = props;

  if (!page) return null;

  if ('authors' in page) {
    return (
      <BlogPostLayout
        blogPost={page}
        headerItems={props.headerItems}
        key={page?.id}
      >
        {children}
      </BlogPostLayout>
    );
  }

  if ('timeframe' in page) {
    return (
      <ProjectLayout
        project={page}
        headerItems={props.headerItems}
        key={page?.id}
      >
        {children}
      </ProjectLayout>
    );
  }

  if ('layout' in page) {
    switch (page?.layout) {
      case 'default':
        return (
          <DefaultLayout
            page={page}
            headerItems={props.headerItems}
            key={page?.id}
          >
            {children}
          </DefaultLayout>
        );
      default:
        return null;
    }
  }
}
