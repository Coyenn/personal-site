import type { Metadata } from "next";
import { Suspense } from "react";

import { Age } from "./components/age";
import { LastVisitMap, LastVisitMapFallback } from "./components/diagrams/last-visit-map";
import { PageIntro } from "./components/page-intro";

export const metadata: Metadata = {
  title: {
    absolute: "Tim Ritter · Design Engineer",
  },
  description:
    "Tim Ritter is a designer, engineer, and game developer building things from curiosity.",
};

export default async function Home() {
  return (
    <div>
      <main className="m-0 w-full">
        <section aria-labelledby="home-title">
          <PageIntro.Frame>
            <PageIntro.Title id="home-title">Tim Ritter</PageIntro.Title>
            <PageIntro.Subtitle>Design Engineer</PageIntro.Subtitle>
          </PageIntro.Frame>

          <div className="grid gap-3">
            <p>
              I&apos;m a <Age />
              -year-old designer, engineer &amp; game developer. My passion is to create beautiful
              software. I work on ERP systems that power the German housing market and develop video
              games played by hundreds of millions.
            </p>
          </div>
        </section>

        <Suspense fallback={<LastVisitMapFallback />}>
          <LastVisitMap />
        </Suspense>
      </main>
    </div>
  );
}
