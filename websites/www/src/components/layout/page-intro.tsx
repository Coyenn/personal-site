'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

import TextButton from '@website/src/components/common/text-button';
import Container from '@website/src/components/layout/container';
import PageSection from '@website/src/components/layout/page-section';

export interface PageIntroProps {
  title: ReactNode;
  backButton?: boolean;
  backButtonHref?: string;
  callToAction?: string;
  callToActionHref?: string;
}

export default function PageIntro(props: PageIntroProps) {
  const {
    backButton = false,
    backButtonHref,
    title,
    callToAction,
    callToActionHref,
  } = props;

  return (
    <PageSection>
      <Container className='flex min-h-[40vh] flex-col justify-center gap-3 md:gap-4'>
        <h1 className='max-w-[800px] text-xl text-gray1 sm:text-2xl lg:text-3xl text-center mx-auto text-balance'>
          {title}
        </h1>
        {callToAction && (
          <div className='mx-auto'>
            <Link
              href={callToActionHref ?? ''}
              className='link-effect group flex w-fit items-center gap-1 text-gray1'
            >
              {callToAction}
              <span
                className='inline-block transition-all group-hover:ml-1'
                aria-hidden='true'
              >
                ›
              </span>
            </Link>
          </div>
        )}
        {backButton && (
          <div className='mx-auto'>
            <TextButton href={backButtonHref}>
              <span
                className='inline-block text-lg transition-transform group-hover:rotate-[-20deg] sm:text-xl'
                aria-hidden
              >
                ⤺
              </span>
              <span>Go back</span>
            </TextButton>
          </div>
        )}
      </Container>
    </PageSection>
  );
}
