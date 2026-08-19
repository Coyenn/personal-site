import type { MDXComponents } from "mdx/types";
import { Children, isValidElement, type ComponentProps, type ReactNode } from "react";
import { lang } from "sugar-high/lang";

import { CodeSnippet } from "@/app/components/code-snippet";
import { Listing } from "@/app/components/listing";
import { cn } from "@/lib/utils";

function getCodeElement(children: ReactNode) {
  const child = Children.toArray(children)[0];
  if (!isValidElement<{ className?: string; children?: ReactNode }>(child)) {
    return undefined;
  }

  return child;
}

function Pre({ children }: ComponentProps<"pre">) {
  const codeElement = getCodeElement(children);
  if (!codeElement) {
    return <pre>{children}</pre>;
  }

  const language = lang(codeElement.props.className?.replace(/^language-/, "") ?? "");
  const code = String(codeElement.props.children ?? "");

  if (!language) {
    return <pre>{children}</pre>;
  }

  return (
    <CodeSnippet.Writing label={language} lang={language}>
      {code}
    </CodeSnippet.Writing>
  );
}

function Heading({ children, className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn("article-heading mt-12 mb-6 scroll-mt-6 text-secondary-foreground", className)}
      {...props}
    >
      {children}
    </h2>
  );
}

function ListItem({ children, ...props }: ComponentProps<"li">) {
  return (
    <li {...props}>
      <Listing.Dot /> {children}
    </li>
  );
}

const components = {
  h2: Heading,
  li: ListItem,
  pre: Pre,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
