import { PageLoadAnimationWrapper } from "@/components/page-load-animation";
import { ProjectContainer, ProjectItem } from "@/components/project";
import Link from "next/link";

export default function Craft() {
	return (
		<PageLoadAnimationWrapper className="flex flex-col my-16 md:my-24 lg:my-32 gap-y-10 md:gap-y-12">
			<section>
				<h1>Craft</h1>
			</section>
			<section>
				<p>
					<em>Crafting interfaces.</em> Building polished software and web
					experiences. Experimenting with magical details in user interfaces.
					Webmaster at Linear.
				</p>
			</section>
			<section className="flex flex-col gap-y-4 md:gap-y-6">
				<h2>Projects</h2>
				<ProjectContainer>
					<ProjectItem
						href="#"
						target="_blank"
						name="Pixel Pirates"
						position="Founder"
						summary="Game development studio"
					/>
					<ProjectItem
						href="#"
						target="_blank"
						name="BluBlox Development"
						position="Developer"
						summary="Game development studio"
					/>
					<ProjectItem
						href="#"
						target="_blank"
						name="Luminary Games"
						position="Co-Founder"
						summary="Game development studio"
					/>
					<ProjectItem
						href="#"
						target="_blank"
						name="Roblox Model Renderer "
						position="Creator"
						summary="3D model renderer for Roblox"
					/>
					<ProjectItem
						href="#"
						target="_blank"
						name="p"
						position="Creator"
						summary="Simple and tasteful project management"
					/>
					<ProjectItem
						href="#"
						target="_blank"
						name="Create T3 App"
						position="Contributor"
						summary="Popular full-stack project boilerplate"
					/>
				</ProjectContainer>
			</section>
			<section className="flex flex-col gap-y-4 md:gap-y-6">
				<h2>Now</h2>
				<p>
					Developing skill through doing, guiltlessly exploring passion and
					interests, imbuing quality. Mindful that <em>everything</em> around me
					is someone’s life work.
					<br />
					<br />
					All I want to do is build websites. Typography, motion design,
					copywriting, performance—the web is an endless medium of opportunity
					and creativity of which I’ve only scratched the surface.
				</p>
			</section>
			<section className="flex flex-col gap-y-4 md:gap-y-6">
				<h2>Get in touch</h2>
				<p>
					Reach me at{" "}
					<Link href="#" target="_blank">
						@Kojenia
					</Link>{" "}
					or email me at{" "}
					<Link href="mailto:t-ritter-mail@web.de" target="_blank">
						t-ritter-mail@web.de
					</Link>
				</p>
			</section>
		</PageLoadAnimationWrapper>
	);
}
