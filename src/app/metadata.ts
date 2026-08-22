import type { Metadata } from "next";

export const siteUrl = "https://tim.cv";
export const siteName = "Tim Ritter";
export const siteTitle = "Tim Ritter · Design Engineer";
export const siteDescription =
  "Tim Ritter is a designer, engineer, and game developer building things from curiosity.";

export function canonicalUrl(pathname: string) {
  if (pathname === "/") {
    return `${siteUrl}/`;
  }

  return new URL(pathname, siteUrl).href;
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName,
    title: siteTitle,
    description: siteDescription,
  },
};
