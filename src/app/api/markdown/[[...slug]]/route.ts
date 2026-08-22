import { applyMarkdownHeaders, createNotFoundResponse } from "@vercel/agent-readability";

import { siteUrl } from "@/app/metadata";
import { markdownForPathname } from "@/lib/markdown/page-markdown";

type MarkdownRouteProps = {
  params: Promise<{ slug?: string[] }>;
};

export async function GET(_request: Request, { params }: MarkdownRouteProps) {
  const { slug = [] } = await params;
  const pathname = slug.length === 0 ? "/" : `/${slug.join("/")}`;
  const page = await markdownForPathname(pathname);

  if (!page.found) {
    return createNotFoundResponse(pathname, {
      sitemapUrl: "/sitemap.xml",
      indexUrl: "/llms.txt",
      exampleUrl: "/writing",
      baseUrl: siteUrl,
    });
  }

  const headers = new Headers({
    "Content-Type": "text/markdown; charset=utf-8",
  });
  applyMarkdownHeaders(headers, { canonicalUrl: page.canonicalUrl });

  return new Response(page.body, {
    status: 200,
    headers,
  });
}
