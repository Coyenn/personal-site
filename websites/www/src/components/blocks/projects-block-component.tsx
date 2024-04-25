import type { Media } from '@payload-types';
import ProjectGrid from '@website/src/components/common/projects';
import type { Payload } from 'payload/types';

export default async function ProjectsBlockComponent(props: {
  payload: Payload;
}) {
  const projects = await props.payload.find({
    collection: 'projects',
    limit: 10,
  });

  return (
    <ProjectGrid
      projects={projects.docs.map((project) => ({
        title: project.title ?? '',
        image: (project.image as Media).url ?? '',
        timeframe: project.timeframe ?? '',
        href: project.slug?.startsWith('/')
          ? project.slug
          : `/${project.slug}` ?? '',
      }))}
    />
  );
}
