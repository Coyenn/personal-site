import type { Metadata } from "next";
import { Suspense } from "react";

import { Age } from "./components/age";
import { LastVisitMap, LastVisitMapFallback } from "./components/diagrams/last-visit-map";
import { JsonLd } from "./components/json-ld";
import { homeIntroAfter, homeIntroBefore } from "./home";
import { siteDescription, siteName, siteTitle } from "./metadata";
import { PageIntro } from "./components/page-intro";
import { getSiteJsonLd, jobTitle } from "@/lib/schema/json-ld";

export const metadata: Metadata = {
  title: {
    absolute: siteTitle,
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
    types: {
      "text/markdown": "/index.md",
    },
  },
};

export default async function Home() {
  return (
    <>
      <JsonLd data={getSiteJsonLd()} />
      <section aria-labelledby="home-title">
        <PageIntro.Frame>
          <PageIntro.Title id="home-title">{siteName}</PageIntro.Title>
          <PageIntro.Subtitle>{jobTitle}</PageIntro.Subtitle>
        </PageIntro.Frame>

        <div className="grid gap-3">
          <p>
            {homeIntroBefore}
            <Age />
            {homeIntroAfter}
          </p>
        </div>
      </section>

      <Suspense fallback={<LastVisitMapFallback />}>
        <LastVisitMap />
      </Suspense>
    </>
  );
}
