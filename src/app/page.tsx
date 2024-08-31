import { PageLoadAnimationWrapper } from "@/components/page-load-animation";
import { ProjectContainer, ProjectItem } from "@/components/project";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

export default function Home() {
	return (
		<PageLoadAnimationWrapper className="flex flex-col mt-16 md:mt-24 lg:mt-32 mb-32 gap-y-10 md:gap-y-12">
			<section>
				<h1 className="font-instrument-serif text-3xl md:text-4xl">
					<span>Tim Ritter</span>
					<br />
					<Tooltip>
						<TooltipTrigger tabIndex={0}>
							<span className="text-muted-foreground contrast-more:text-foreground cursor-help">
								Design Engineer
							</span>
						</TooltipTrigger>
						<TooltipContent aria-hidden="true">
							<p className="font-sans">
								Blurring the boundaries between design{" "}
								<span className="font-ovo">&</span> engineering
							</p>
						</TooltipContent>
					</Tooltip>
				</h1>
			</section>
			<section>
				<p>
					<em>Crafting interfaces</em> with meticulous attention to detail.
					Diving deep into technical intricacies. Currently pushing pixels at{" "}
					<Link href="https://next-motion.de" target="_blank">
						next.motion
					</Link>{" "}
				</p>
			</section>
			<section className="flex flex-col gap-y-6">
				<h2 id="projects">Projects</h2>
				<ProjectContainer aria-labelledby="projects">
					<ProjectItem
						href="https://www.roblox.com/groups/34260095"
						target="_blank"
						name="Pixel Pirates"
						position="Founder"
						summary="Game development studio"
					/>
					<ProjectItem
						href="https://create.t3.gg"
						target="_blank"
						name="Create T3 App"
						position="Contributor"
						summary="Popular full-stack project boilerplate"
					/>
					<ProjectItem
						href="https://github.com/Coyenn/roblox-model-renderer"
						target="_blank"
						name="Roblox Model Renderer "
						position="Creator"
						summary="3D model renderer for Roblox"
					/>
					<ProjectItem
						href="https://github.com/RevisionOrg/p"
						target="_blank"
						name="p"
						position="Creator"
						summary="Simple and tasteful project management"
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
				</ProjectContainer>
			</section>
			<section className="flex flex-col gap-y-6">
				<h2>Now</h2>
				<p>
					Developing skill through doing, guiltlessly exploring passion and
					interests, imbuing quality. Mindful that <em>everything</em> around me
					is someone’s life work.
					<span aria-hidden="true" className="select-none">
						<br />
						<br />
					</span>
					All I want to do is build websites. Typography, motion design,
					copywriting, performance—the web is an endless medium of opportunity
					and creativity of which I’ve only scratched the surface.
				</p>
			</section>
			<section className="flex flex-col gap-y-6">
				<h2>Get in touch</h2>
				<p>
					Reach me at{" "}
					<Link href="https://x.com/Kojenia" target="_blank">
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
