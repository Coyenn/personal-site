import type { Metadata } from "next";

import { PageIntro } from "./components/page-intro";

export const metadata: Metadata = {
  title: "Page not found",
  description: "What you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <>
      <PageIntro.Frame>
        <PageIntro.Title>Page not found</PageIntro.Title>
        <PageIntro.Subtitle>What you're looking for doesn't exist.</PageIntro.Subtitle>
      </PageIntro.Frame>
    </>
  );
}
