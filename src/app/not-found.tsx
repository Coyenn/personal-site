import { PageLoadAnimationWrapper } from "@/components/page-load-animation";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "404",
	description: "Whatever you're looking for, it ain't here.",
};

export default function Colophon() {
	return (
		<PageLoadAnimationWrapper className="flex flex-col mt-16 md:mt-24 lg:mt-32 mb-32 gap-y-10 md:gap-y-12">
			<section>
				<h1 className="font-instrument-serif text-3xl md:text-4xl">
					<span>Page</span>
					<br />
					<span className="text-muted-foreground contrast-more:text-foreground cursor-help">
						Not Found
					</span>
				</h1>
			</section>
			<section>
				<p>
					The page you're looking for doesn't exist.{" "}
					<Link href="/">Go home</Link>.
				</p>
			</section>
		</PageLoadAnimationWrapper>
	);
}
