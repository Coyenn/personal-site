import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPosts } from '@/src/app/writing/posts';
import ArrowUpLeftIcon from '@/src/components/icons/arrow-up-left-icon';
import { SiteContainer } from '@/src/components/layout/site-container';
import { PageHeading } from '@/src/components/page-heading';
import { PageLoadAnimationWrapper } from '@/src/components/page-load-animation';
import BlogPostLD from '@/src/components/writing/blog-post-ld';
import FocusMode from '@/src/components/writing/focus-mode';
import { MDX } from '@/src/components/writing/mdx';

import '@/src/app/writing/[slug]/post.css';

export const generateStaticParams = async () => {
  const posts = getPosts();

  return posts.map((post) => ({ slug: post.slug }));
};

export async function generateMetadata(
  props: PageProps,
): Promise<Metadata | undefined> {
  const { params } = props;
  const { slug } = await params;
  const post = getPosts().find((post) => post.slug === slug);

  if (!post) return;

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image ? image : 'https://tim.cv/og-image.png';

  return {
    metadataBase: new URL('https://tim.cv/'),
    title,
    description,
    openGraph: {
      title: `${title} — Tim Ritter`,
      description,
      type: 'article',
      publishedTime,
      url: `https://tim.cv/writing/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — Tim Ritter`,
      description,
      images: [ogImage],
    },
    alternates: { canonical: `https://tim.cv/writing/${post.slug}` },
  };
}

export interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page(props: PageProps) {
  const { params } = props;
  const { slug } = await params;
  const post = getPosts().find((post) => post.slug === slug);

  if (!post) notFound();

  return (
    <SiteContainer>
      <SiteContainer.Left>
        <Link
          href="/writing"
          className="exclude flex w-fit items-center text-muted-foreground contrast-more:text-foreground hover:text-foreground animate-intro motion-reduce:duration-0 motion-reduce:opacity-100 mb-8 min-[1100px]:sticky min-[1100px]:top-24 min-[1100px]:mt-[203px] min-[1100px]:mb-0 min-[1100px]:ml-auto min-[1100px]:mr-14"
          style={{ animationDelay: '300ms' }}
        >
          <ArrowUpLeftIcon className="size-5 mr-1" aria-hidden="true" />
          All Posts
        </Link>
      </SiteContainer.Left>
      <SiteContainer.Content>
        <FocusMode />
        <BlogPostLD post={post} />
        <article>
          <PageLoadAnimationWrapper>
            <section>
              <PageHeading
                title={post.metadata.title}
                subtitle={post.metadata.summary}
              />
            </section>
            <section className="flex flex-col gap-y-6">
              <div className="prose animate-children mt-16 md:mt-20">
                <MDX source={post.content} />
              </div>
            </section>
          </PageLoadAnimationWrapper>
        </article>
      </SiteContainer.Content>
    </SiteContainer>
  );
}
