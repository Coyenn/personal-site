import { withAgentReadability } from "@vercel/agent-readability/next";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { canonicalUrl } from "@/app/metadata";

function isSkippedPath(pathname: string) {
  return (
    pathname.startsWith("/opengraph-image") ||
    pathname.startsWith("/twitter-image") ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/apple-icon")
  );
}

function pagePathname(pathname: string) {
  const withoutExtension = pathname.endsWith(".md") ? pathname.slice(0, -3) : pathname;

  return withoutExtension === "/index" || withoutExtension === "" ? "/" : withoutExtension;
}

function markdownApiPath(pathname: string) {
  const normalized = pagePathname(pathname);

  return `/api/markdown${normalized === "/" ? "" : normalized}`;
}

const handleMarkdown = withAgentReadability(
  {
    docsPrefix: "/",
    rewrite: (pathname) => markdownApiPath(pathname),
    canonicalUrl: (pathname) => canonicalUrl(pagePathname(pathname)),
  },
  (request) => {
    const { pathname } = request.nextUrl;

    if (!pathname.endsWith(".md")) {
      return NextResponse.next();
    }

    const url = request.nextUrl.clone();
    url.pathname = markdownApiPath(pathname);

    return NextResponse.rewrite(url);
  },
);

export function proxy(request: NextRequest, event: NextFetchEvent) {
  if (isSkippedPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  return handleMarkdown(request, event);
}

export const config = {
  matcher: ["/((?!_next|api|_vercel|.*\\..*).*)", "/:path*.md"],
};
