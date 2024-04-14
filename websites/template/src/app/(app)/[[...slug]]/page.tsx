import PageContent from '@website/src/components/page-content'
import PageLayout from '@website/src/components/page-layout'
import pageData from '@website/src/utilities/page-data'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug?: string
  }
}

export default async function Page(props: PageProps) {
  const page = await pageData(props.params.slug || '/')

  if (!page) return notFound()

  return (
    <PageLayout page={page} />
  )
}
