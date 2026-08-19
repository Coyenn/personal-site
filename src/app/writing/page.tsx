import type { Metadata } from "next";

import { Listing } from "../components/listing";
import { PageIntro } from "../components/page-intro";
import { getArticles } from "./articles";

export const metadata: Metadata = {
  title: "Writing",
  description: "Technical notes about interfaces, infrastructure, tools, and following curiosity.",
};

export default async function WritingPage() {
  const articles = await getArticles();

  return (
    <>
      <PageIntro.Frame>
        <PageIntro.Title>Writing</PageIntro.Title>
      </PageIntro.Frame>
      <p className="mt-6">
        Technical notes about interfaces, infrastructure, tools, and following curiosity.
      </p>

      <Listing.Frame className="mt-12">
        {articles.map((article) => (
          <Listing.Item
            className="grid-cols-[12px_minmax(0,1fr)] gap-x-3 hover:fancy-underline"
            key={article.slug}
          >
            <Listing.Link href={`/writing/${article.slug}`}>
              <Listing.Marker />
              <Listing.Content>
                <Listing.Title>{article.title}</Listing.Title>
                <Listing.Fill />
                <Listing.Description>
                  <Listing.Time dateTime={article.date}>{article.date}</Listing.Time>
                </Listing.Description>
              </Listing.Content>
            </Listing.Link>
          </Listing.Item>
        ))}
      </Listing.Frame>
    </>
  );
}
