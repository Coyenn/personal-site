'use client';

import Link from 'next/link';
import { Fragment } from 'react';
import { useHighlightList } from '@/src/hooks/use-highlight-list';
import { cn } from '@/src/lib/utils';

export interface BlogPostProps {
  posts: {
    slug: string;
    metadata: {
      title: string;
      summary: string;
      publishedAt: string;
    };
  }[];
}

export default function BlogPostList(props: BlogPostProps) {
  const { posts } = props;
  const highlightIndex = useHighlightList((state) => state.highlightIndex);
  const setHighlightIndex = useHighlightList(
    (state) => state.setHighlightIndex,
  );

  return (
    <ul className="flex flex-col list-none group -mt-3">
      {posts.map((post, index) => (
        <Fragment key={post.slug}>
          <li
            className={`animate-intro motion-reduce:duration-0 motion-reduce:opacity-100 animation-delay-${index + 2}`}
            onMouseEnter={() => setHighlightIndex(index)}
            onMouseLeave={() => setHighlightIndex(-1)}
          >
            <article
              className={cn(
                'block relative group-has-[.hightlight]:opacity-50 group-hover:opacity-50 motion-reduce:!opacity-100 py-6 hover:!opacity-100 transition-opacity duration-300 ease-in-out contrast-more:!opacity-100',
                index === highlightIndex && 'hightlight !opacity-100',
              )}
            >
              <h3 className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-4">
                <Link
                  href={`/writing/${post.slug}`}
                  className="after:absolute after:inset-0 after:z-10"
                >
                  {post.metadata.title}
                </Link>
                <time
                  dateTime={post.metadata.publishedAt}
                  className="text-muted-foreground contrast-more:text-foreground"
                >
                  {new Date(post.metadata.publishedAt).toLocaleDateString(
                    'en-US',
                  )}
                </time>
              </h3>
            </article>
          </li>
          {index < posts.length - 1 && <hr />}
        </Fragment>
      ))}
    </ul>
  );
}
