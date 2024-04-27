import type { BlogPost, Media } from '@payload-types';
import TextButton from '@website/src/components/common/text-button';
import PageIntro from '@website/src/components/layout/page-intro';
import PageSection from '@website/src/components/layout/page-section';
import CodeHighlight from '@website/src/components/media/code-hightlight';
import Image from '@website/src/components/media/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

export interface BlogPostLayoutProps {
  blogPost?: BlogPost;
  children?: ReactNode;
}

export default function BlogPostLayout(props: BlogPostLayoutProps) {
  const { blogPost, children } = props;

  return (
    <>
      <title>Tim Ritter - {blogPost?.title}</title>
      <PageIntro
        title={
          <>
            <div className='mb-3 sm:mb-4 md:mb-5'>
              <div className='text-2xl text-gray1 md:text-3xl'>
                {blogPost?.title}
              </div>
              <span className='text-xs text-gray3'>
                <time dateTime={blogPost?.date}>
                  {new Date(
                    blogPost?.updatedAt ?? new Date(),
                  ).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </time>{' '}
                · {Math.ceil((blogPost?.content?.length ?? 0) / 100)} min. read
              </span>
            </div>
            <div className='flex justify-center gap-8'>
              {blogPost?.authors?.map((author, authorIndex) => {
                return (
                  <Link
                    className='link-effect -m-1 flex flex-row items-center gap-2 p-1'
                    target='_blank'
                    key={author.name}
                    href={author.link ?? ''}
                  >
                    <Image
                      src={(author.image as Media)?.url ?? ''}
                      alt={`Profile picture of ${author.name}`}
                      width={32}
                      height={32}
                      loading='eager'
                      className='mr-1 inline-block rounded-full border border-gray5 dark:border-gray6'
                    />
                    <p className='text-sm text-gray1'>{author.name}</p>
                  </Link>
                );
              })}
            </div>
          </>
        }
      />
      {blogPost?.image && (
        <PageSection className='!py-0' size='lg'>
          <Image
            src={(blogPost?.image as Media)?.url ?? ''}
            alt={(blogPost?.image as Media)?.alt ?? ''}
            width={1920}
            height={1080}
            loading='eager'
            lightbox
            quality={90}
            className='h-auto w-full border border-gray5 bg-gray6'
          />
        </PageSection>
      )}
      <article>
        <CodeHighlight>{children}</CodeHighlight>
      </article>
      <PageSection
        size='xs'
        containerClassName='flex justify-center mb-4 sm:mb-6 lg:mb-8'
      >
        <TextButton href='/writing'>
          <span
            className='inline-block text-lg transition-transform group-hover:rotate-[-20deg] sm:text-xl'
            aria-hidden
          >
            ⤺
          </span>
          <span>Go back</span>
        </TextButton>
      </PageSection>
    </>
  );
}
