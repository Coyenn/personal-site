import type { Metadata } from "next";

import { Listing } from "../components/listing";
import { PageIntro } from "../components/page-intro";

export const metadata: Metadata = {
  title: "Projects",
  description: "Over the years, I've contributed to a few projects I'm proud of.",
};

const projects = [
  {
    name: "Create T3 App",
    href: "https://create.t3.gg/",
    description: "The superior stack",
  },
  {
    name: "Iso",
    href: "https://github.com/Coyenn/iso",
    description: "Plug-and-play self-hosted dashboard",
  },
  {
    name: "Caramel",
    href: "https://www.roblox.com/communities/34260095/Play-Caramel#!/about",
    description: "Unreleased 2D cozy game",
  },
  {
    name: "Blu Cat Studios",
    href: "https://www.roblox.com/communities/16976426/Blu-Cat-Studios#!/about",
    description: "35 million plays",
  },
  {
    name: "BluBlox Development",
    href: "https://www.roblox.com/communities/5560533/BluBlox-Development#!/about",
    description: "17 million plays",
  },
  {
    name: "Luminary Games",
    href: "https://www.roblox.com/communities/32385121/Luminary-Games#!/about",
    description: "15 million plays",
  },
] as const;

export default function ProjectsPage() {
  return (
    <>
      <PageIntro.Frame>
        <PageIntro.Title>Projects</PageIntro.Title>
      </PageIntro.Frame>
      <p>Over the years, I've contributed to a few projects I'm proud of.</p>

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
