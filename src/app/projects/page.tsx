import type { Metadata } from "next";

import { Listing } from "../components/listing";
import { PageIntro } from "../components/page-intro";
import { projects, projectsDescription, projectsTitle } from "./items";

export const metadata: Metadata = {
  title: projectsTitle,
  description: projectsDescription,
  alternates: {
    types: {
      "text/markdown": "/projects.md",
    },
  },
};

export default function ProjectsPage() {
  return (
    <>
      <PageIntro.Frame>
        <PageIntro.Title>{projectsTitle}</PageIntro.Title>
      </PageIntro.Frame>
      <p>{projectsDescription}</p>

      <Listing.Frame className="mt-12">
        {projects.map((project) => (
          <Listing.Item
            className="grid-cols-[12px_minmax(0,1fr)] gap-x-3 hover:fancy-underline"
            key={project.name}
          >
            <Listing.ExternalLink href={project.href}>
              <Listing.Marker />
              <Listing.Content>
                <Listing.Title>{project.name}</Listing.Title>
                <Listing.Fill />
                <Listing.Description>{project.description}</Listing.Description>
              </Listing.Content>
            </Listing.ExternalLink>
          </Listing.Item>
        ))}
      </Listing.Frame>
    </>
  );
}
