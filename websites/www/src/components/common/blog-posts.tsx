import type { BlogPost, Media } from '@payload-types';
import FloatingTooltip from '@website/src/components/common/floating-tooltip';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface BlogPostPreviewProps extends BlogPost {
  loading?: 'eager' | 'lazy';
}

export interface BlogPostProps {
  items: BlogPostPreviewProps[];
}

function BlogPostPreview(props: BlogPostPreviewProps) {
  const { image, date, title, loading, slug, content } = props;
  const bodyLength = JSON.stringify(content).length;

  return (
    <FloatingTooltip text='View'>
      <Link
        href={slug ?? ''}
        className='link-effect flex h-full flex-col gap-3 sm:gap-4 md:gap-5 md:p-4 overflow-hidden'
      >
        {image && (
          <Image
            src={(image as Media)?.url ?? ''}
            alt={(image as Media)?.alt ?? ''}
            width={700}
            height={350}
            loading={loading ?? 'lazy'}
            quality={90}
            className={
              'h-auto w-full border border-gray5 bg-gray6 object-cover aspect-video'
            }
          />
        )}
        <div className='flex flex-col justify-center gap-3 md:gap-4'>
          <h3 className='text-lg text-gray1 sm:text-xl lg:text-xl'>{title}</h3>
          <p className='text-xs text-gray3'>
            <time dateTime={date}>
              {new Date(date).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })}
            </time>{' '}
            · {Math.ceil(((bodyLength ?? 0) - 10000) / 3000)} min. read
          </p>
        </div>
      </Link>
    </FloatingTooltip>
  );
}

export default function BlogPosts(props: BlogPostProps) {
  const { items } = props;

  return (
    <div className='grid gap-12 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:gap-12'>
      {items.map((post, postIndex) => (
        <React.Fragment key={post.title}>
          <BlogPostPreview
            key={post.title}
            loading={postIndex < 3 ? 'eager' : 'lazy'}
            {...post}
          />
        </React.Fragment>
      ))}
    </div>
  );
}
