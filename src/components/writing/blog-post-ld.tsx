import type { BlogPost } from '@/src/app/writing/posts';

export interface BlogPostLDProps {
  post: BlogPost;
}

export default function BlogPostLD(props: BlogPostLDProps) {
  const { post } = props;

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Needed in this case
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.metadata.title,
          datePublished: post.metadata.publishedAt,
          dateModified: post.metadata.publishedAt,
          description: post.metadata.summary,
          image: post.metadata.image
            ? `https://tim.cv${post.metadata.image}`
            : `/og?title=${encodeURIComponent(post.metadata.title)}`,
          url: `https://tim.cv/writing/${post.slug}`,
          author: { '@type': 'Person', name: 'Tim Ritter' },
        }),
      }}
    />
  );
}
