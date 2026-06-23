import type { Metadata } from 'next';
import { getPosts } from '@/src/app/writing/posts';
import { SiteContainer } from '@/src/components/layout/site-container';
import { PageHeading } from '@/src/components/page-heading';
import { PageLoadAnimationWrapper } from '@/src/components/page-load-animation';
import BlogPostList from '@/src/components/writing/blog-post-list';
import BlogPostRow from '@/src/components/writing/blog-post-row';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Deep dives into design and development.',
  openGraph: {
    title: 'Tim Ritter — Writing',
    description: 'Deep dives into design and development.',
    url: 'https://tim.cv',
    siteName: 'Tim Ritter',
    images: [
      {
        url: 'https://tim.cv/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Writing, Tim Ritter — Design Engineer.',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://tim.cv/writing',
  },
};

export default function Writing() {
  const topPosts = getPosts().slice(0, 3);
  const posts = getPosts();

  return (
    <SiteContainer>
      <SiteContainer.Content>
        <PageLoadAnimationWrapper>
          <section>
            <PageHeading title="Writing" />
          </section>
          <section className="animate-intro">
            <BlogPostRow
              className="hidden lg:block mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              items={topPosts.map((post) => ({
                image: {
                  src: post.metadata.image ?? '',
                  alt: post.metadata.title,
                  placeholder: post.metadata.placeholderImage ?? '',
                  width: 400,
                  height: 200,
                },
                href: `/writing/${post.slug}`,
              }))}
            />
            <BlogPostList posts={posts} />
          </section>
        </PageLoadAnimationWrapper>
      </SiteContainer.Content>
    </SiteContainer>
  );
}
