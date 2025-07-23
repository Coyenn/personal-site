import type { ImageProps } from 'next/image';
import Link from 'next/link';
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import {
  type AnchorHTMLAttributes,
  createElement,
  type DetailedHTMLProps,
  type FC,
  type ReactNode,
} from 'react';
import slugify from 'slugify';
import { highlight } from 'sugar-high';
import { Image } from '@/src/components/image/image';
import DownloadButton from '@/src/components/writing/download-button';
import CopyCode from './copy-code';

const CustomLink = ((props) => {
  if (props.href?.startsWith('/'))
    return (
      <Link href={props.href} {...props}>
        {props.children}
      </Link>
    );

  if (props.href?.startsWith('#')) return <a {...props} />;
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}) as FC<
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
>;

const Img = (props: ImageProps) => {
  return <Image variant="zoom" className="rounded-lg" {...props} />;
};

const Code = (({ children, ...props }) => {
  const codeHTML = highlight(children as string);
  const isMultiLine = (children as string).includes('\n');

  return (
    <>
      {isMultiLine && <CopyCode code={children as string} />}
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Needed in this case */}
      <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
    </>
  );
}) as FC<{ children: ReactNode }>;

const createHeading = (level: number) => {
  const Heading = ({ children }: { children: ReactNode }) => {
    const slug = slugify(children as string);

    return createElement(
      `h${level}`,
      { id: slug },
      [
        createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
          tabIndex: -1,
        }),
      ],
      children,
    );
  };

  Heading.displayName = `Heading${level}`;
  return Heading;
};

const components = {
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  Image: Img,
  a: CustomLink,
  code: Code,
  DownloadButton: DownloadButton,
};

export function MDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      // biome-ignore lint/suspicious/noExplicitAny: We need to cast to any here
      components={{ ...components, ...((props.components || {}) as any) }}
    />
  );
}
