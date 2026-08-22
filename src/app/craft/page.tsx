import type { Metadata } from "next";

import { Listing } from "../components/listing";
import { PageIntro } from "../components/page-intro";
import { craftDescription, craftTitle, getCraftItems } from "./items";
import { CraftListingItem } from "./piece";

export const metadata: Metadata = {
  title: craftTitle,
  description: craftDescription,
  alternates: {
    types: {
      "text/markdown": "/craft.md",
    },
  },
};

export default function CraftPage() {
  const items = getCraftItems();

  return (
    <>
      <PageIntro.Frame>
        <PageIntro.Title>{craftTitle}</PageIntro.Title>
      </PageIntro.Frame>
      <p>{craftDescription}</p>

      <Listing.Frame className="mt-12 gap-12">
        {items.map((entry, index) => (
          <CraftListingItem item={entry} key={entry.slug} loading={index < 3 ? "eager" : "lazy"} />
        ))}
      </Listing.Frame>
    </>
  );
}
