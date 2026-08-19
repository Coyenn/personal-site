declare module "*.mdx" {
  import type { Element, MDXProps } from "mdx/types";
  import type { ComponentType } from "react";

  export const metadata: {
    date: string;
    lead: string;
    title: string;
  };

  export const Hero: ComponentType | undefined;

  export default function MDXContent(props: MDXProps): Element;
}
