'use client';

import { useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { type ReactNode, useState } from 'react';
import { RoughNotation } from 'react-rough-notation';
import { PageLoadAnimationWrapper } from '@/src/components/page-load-animation';
import { cn } from '@/src/lib/utils';

const CIRCLE_COLOR = '#be123c';
const BIRTHDAY = new Date('2004-06-05');
const GLYPH_CLASS =
  'mr-[0.2em] inline-block size-[0.85em] fill-current align-[-0.1em]';
const IMAGE_CLASS =
  'mr-[0.2em] inline-block size-[0.85em] select-none rounded-[0.25em] object-contain align-[-0.1em]';

export function Intro({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col text-pretty text-center fl-text-2xl/4xl leading-[1.5] text-foreground">
      <PageLoadAnimationWrapper baseDelay={120} step={70}>
        {children}
      </PageLoadAnimationWrapper>
    </div>
  );
}

export function Faded({ children }: { children: ReactNode }) {
  return <span className="text-muted-foreground">{children}</span>;
}

function Circle({
  show = false,
  children,
}: {
  show?: boolean;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <RoughNotation
      type="circle"
      color={CIRCLE_COLOR}
      strokeWidth={2}
      padding={12}
      show={show}
      animate={!reduceMotion}
      animationDuration={250}
    >
      {children}
    </RoughNotation>
  );
}

export function Emphasis({ children }: { children: ReactNode }) {
  return <Circle show>{children}</Circle>;
}

function Glyph({
  viewBox,
  children,
}: {
  viewBox: string;
  children: ReactNode;
}) {
  return (
    <svg viewBox={viewBox} aria-hidden="true" className={GLYPH_CLASS}>
      {children}
    </svg>
  );
}

export function GitHubMark() {
  return (
    <Glyph viewBox="0 0 16 16">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </Glyph>
  );
}

export function XMark() {
  return (
    <Glyph viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </Glyph>
  );
}

export function InlineImage({
  src,
  light,
  dark,
}: {
  src?: string;
  light?: string;
  dark?: string;
}) {
  if (src) {
    // biome-ignore lint/performance/noImgElement: tiny inline icon, not a layout image
    return <img src={src} alt="" aria-hidden="true" className={IMAGE_CLASS} />;
  }

  return (
    <>
      {/* biome-ignore lint/performance/noImgElement: tiny inline icon, not a layout image */}
      <img
        src={light}
        alt=""
        aria-hidden="true"
        className={cn(IMAGE_CLASS, 'dark:hidden')}
      />
      {/* biome-ignore lint/performance/noImgElement: tiny inline icon, not a layout image */}
      <img
        src={dark}
        alt=""
        aria-hidden="true"
        className={cn(IMAGE_CLASS, 'hidden dark:inline-block')}
      />
    </>
  );
}

export function Mention({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const [active, setActive] = useState(false);
  const external = href.startsWith('http') || href.startsWith('mailto:');

  return (
    <Circle show={active}>
      <Link
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        className="mention-link whitespace-nowrap hover:text-foreground"
        onPointerEnter={(event) => {
          if (event.pointerType !== 'touch') setActive(true);
        }}
        onPointerLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      >
        {children}
      </Link>
    </Circle>
  );
}

export function Age() {
  const today = new Date();
  let years = today.getFullYear() - BIRTHDAY.getFullYear();
  const beforeBirthday =
    today.getMonth() < BIRTHDAY.getMonth() ||
    (today.getMonth() === BIRTHDAY.getMonth() &&
      today.getDate() < BIRTHDAY.getDate());
  if (beforeBirthday) years--;

  return <span suppressHydrationWarning>{years}</span>;
}
