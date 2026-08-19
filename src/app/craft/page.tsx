import type { Metadata } from "next";

import { Listing } from "../components/listing";
import { PageIntro } from "../components/page-intro";
import { getCraftItems } from "./items";
import { CraftListingItem } from "./piece";

export const metadata: Metadata = {
  title: "Craft",
  description: "A gallery of my designs and experiments.",
};

export default function CraftPage() {
  const items = getCraftItems();

  return (
    <>
      <PageIntro.Frame>
        <PageIntro.Title>Craft</PageIntro.Title>
      </PageIntro.Frame>
      <p>A gallery of my designs and experiments.</p>

      <Listing.Frame className="mt-12 gap-12">
        {items.map((entry, index) => (
          <CraftListingItem item={entry} key={entry.slug} loading={index < 3 ? "eager" : "lazy"} />
        ))}
      </Listing.Frame>
    </>
  );
}
