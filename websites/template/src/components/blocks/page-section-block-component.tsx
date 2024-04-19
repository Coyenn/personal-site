import type { PageSectionBlock as PageSectionBlockType } from '@payload-types';
import { PageSectionContent } from '@website/src/components/page-section-content';
import classNames from 'classnames';

export interface PageSectionProps {
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageSection(props: PageSectionProps) {
  const { title, children, className } = props;

  return (
    <section className={classNames(className, 'container')}>
      <h3>{title}</h3>
      {children}
    </section>
  );
}

export default function PageSectionBlockComponent(props: PageSectionBlockType) {
  const { title, content } = props;

  return (
    <PageSection title={title?.toString()}>
      <PageSectionContent content={content} />
    </PageSection>
  );
}
