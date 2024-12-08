import { getPosts } from '@/src/app/writing/posts';
import { PageLoadAnimationWrapper } from '@/src/components/page-load-animation';
import BlogPostList from '@/src/components/writing/blog-post-list';
import BlogPostRow from '@/src/components/writing/blog-post-row';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Deep dives into design and development.',
  openGraph: {
    title: 'Tim Ritter — Writing',
    description: 'Deep dives into design and development.',
    url: 'https://tim-ritter.com',
    siteName: 'Tim Ritter',
    images: [
      {
        url: 'https://tim-ritter.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Writing, Tim Ritter — Design Engineer.',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://tim-ritter.com/writing',
  },
};

export default function Writing() {
  const topPosts = getPosts().slice(0, 3);
  const posts = getPosts();

  return (
    <PageLoadAnimationWrapper>
      <section>
        <h1 className="font-instrument-serif text-3xl md:text-4xl">Writing</h1>
      </section>
      <section className="animate-intro animation-delay-2">
        <BlogPostRow
          className="hidden lg:block mb-6 sm:mb-8 md:mb-10 lg:mb-12"
          items={topPosts.map((post) => ({
            image: {
              src: post.metadata.image,
              alt: post.metadata.title,
              width: 400,
              height: 200,
            },
            href: `/writing/${post.slug}`,
          }))}
        />
        <BlogPostList posts={posts} />
      </section>
    </PageLoadAnimationWrapper>
  );
}
