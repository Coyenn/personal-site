import Aurora from '@/src/components/aurora';
import { PageLoadAnimationWrapper } from '@/src/components/page-load-animation';
import { ProjectContainer, ProjectItem } from '@/src/components/project';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Aurora />
      <PageLoadAnimationWrapper>
        <section>
          <h1 className="font-instrument-serif text-3xl md:text-4xl">
            <span aria-hidden="true">Tim Ritter</span>
            <br />
            <span className="text-muted-foreground contrast-more:text-foreground">
              Design Engineer
            </span>
          </h1>
        </section>
        <section>
          <p>
            <em>Creating web experiences</em> with meticulous attention to
            detail. Diving deep into technical intricacies. Currently pushing
            pixels at{' '}
            <Link href="https://next-motion.de" target="_blank">
              next.motion
            </Link>{' '}
          </p>
        </section>
        <section className="flex flex-col gap-y-6">
          <h2 id="projects">Projects</h2>
          <ProjectContainer aria-labelledby="projects">
            <ProjectItem
              href="https://create.t3.gg"
              target="_blank"
              name="Create T3 App"
              position="Contributor"
              summary="Popular full-stack project boilerplate"
            />
            <ProjectItem
              href="https://www.roblox.com/groups/32385121"
              target="_blank"
              name="Luminary Games"
              position="Co-Founder"
              summary="Game development studio"
            />
            <ProjectItem
              href="https://www.roblox.com/groups/5560533"
              target="_blank"
              name="BluBlox Development"
              position="Developer"
              summary="Game development studio"
            />
            <ProjectItem
              href="https://github.com/RevisionOrg/p"
              target="_blank"
              name="p"
              position="Creator"
              summary="Tasteful project management"
            />
            <ProjectItem
              href="https://www.roblox.com/groups/34260095"
              target="_blank"
              name="Pixel Pirates"
              position="Founder"
              summary="Game development studio"
            />
            <ProjectItem
              href="https://github.com/Coyenn/roblox-model-renderer"
              target="_blank"
              name="Roblox Model Renderer "
              position="Creator"
              summary="3D model renderer for Roblox"
            />
          </ProjectContainer>
        </section>
        <section className="flex flex-col gap-y-6">
          <h2>Now</h2>
          <p>
            Spending my time dabbling in all kinds of technologies. Learning
            about declarative programming with{' '}
            <Link href={'https://nixos.org/'} target="_blank">
              Nix
            </Link>
            , developing next-gen video games on{' '}
            <Link href="https://roblox.com" target="_blank">
              Roblox
            </Link>
            , and building my very own homelab using{' '}
            <Link href="https://k3s.io" target="_blank">
              K3s
            </Link>
            .
            <span aria-hidden="true" className="select-none">
              <br />
              <br />
            </span>
            Blurring the lines between design & engineering.
            <span aria-hidden="true" className="select-none">
              <br />
              <br />
            </span>
            From typography and motion design to copywriting and illustration,
            the web offers endless opportunities for creativity, and I've only
            just begun to explore it.
          </p>
        </section>
        <section className="flex flex-col gap-y-6">
          <h2>Get in touch</h2>
          <p>
            Message me{' '}
            <Link href="https://x.com/Kojenia" target="_blank">
              @Kojenia
            </Link>{' '}
            or send me an email at{' '}
            <Link href="mailto:hi@tim.cv" target="_blank">
              hi@tim.cv
            </Link>
          </p>
        </section>
      </PageLoadAnimationWrapper>
    </>
  );
}
