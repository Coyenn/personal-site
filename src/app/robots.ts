import type { MetadataRoute } from "next";

import { canonicalUrl, siteUrl } from "@/app/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: canonicalUrl("/sitemap.xml"),
    host: new URL(siteUrl).host,
  };
}
