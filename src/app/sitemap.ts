import type { MetadataRoute } from "next";

import { getArticles } from "@/app/writing/articles";
import { canonicalUrl } from "@/app/metadata";

const pages = ["/", "/projects", "/craft", "/writing"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();

  return [
    ...pages.map((pathname) => ({ url: canonicalUrl(pathname) })),
    ...articles.map((article) => ({
      url: canonicalUrl(`/writing/${article.slug}`),
      lastModified: new Date(article.date),
    })),
  ];
}
