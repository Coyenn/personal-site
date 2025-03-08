import { getPosts } from '@/src/app/writing/posts';
import ArrowUpLeftIcon from '@/src/components/icons/arrow-up-left-icon';
import { PageLoadAnimationWrapper } from '@/src/components/page-load-animation';
import BlogPostLD from '@/src/components/writing/blog-post-ld';
import FocusMode from '@/src/components/writing/focus-mode';
import { MDX } from '@/src/components/writing/mdx';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
    <>
      <FocusMode />
      <BlogPostLD post={post} />
      <PageLoadAnimationWrapper>
        <section>
          <h1 className="font-instrument-serif text-3xl md:text-4xl">
            <span>{post.metadata.title}</span>
            <br />
            <span className="text-muted-foreground contrast-more:text-foreground">
              {post.metadata.summary}
            </span>
          </h1>
          <Link
            href="/writing"
            className="exclude flex items-center text-muted-foreground contrast-more:text-foreground mt-4 w-fit hover:text-foreground"
          >
            <ArrowUpLeftIcon className="h-4 w-4 mr-1" aria-hidden="true" />
            All Posts
          </Link>
        </section>
        <section className="flex flex-col gap-y-6">
          <article className="prose animate-children mt-6 md:mt-8">
            <MDX source={post.content} />
          </article>
        </section>
      </PageLoadAnimationWrapper>
    </>
  );
}
