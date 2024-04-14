import { Page } from "@payload-types";
import PageContent from "@website/src/components/page-content";
import { PageSection } from "@website/src/components/blocks/page-section-block-component";

export interface DefaultLayoutProps {
  page?: Page;
}

export default function DefaultLayout(props: DefaultLayoutProps) {
  const { page } = props;

  return (
    <>
      <title>{page?.title}</title>
      <PageSection className="my-2 sm:my-4 md:my-6 lg:my-8">
        <h1 className="font-normal text-3xl">{page?.title}</h1>
      </PageSection>
      <PageContent content={page?.content} />
    </>
  )
}