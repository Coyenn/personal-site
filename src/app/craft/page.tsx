import { PageLoadAnimationWrapper } from "@/src/components/page-load-animation";
import craft from "@/src/data/craft";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import slugify from "slugify";

export const metadata: Metadata = {
	title: "Craft",
	description: "Posts about design and development.",
	openGraph: {
		title: "Tim Ritter — Craft",
		description: "Posts about design and development.",
		url: "https://tim-ritter.com",
		siteName: "Tim Ritter",
		images: [
			{
				url: "https://tim-ritter.com/og-image.png",
				width: 1200,
				height: 630,
				alt: "",
			},
		],
		locale: "en-US",
		type: "website",
	},
	alternates: {
		canonical: "https://tim-ritter.com/craft",
	},
};

export default function Craft() {
	return (
		<PageLoadAnimationWrapper>
			<section>
				<h1 className="font-instrument-serif text-3xl md:text-4xl">
					<span>Craft</span>
					<br />
					<span className="text-muted-foreground contrast-more:text-foreground cursor-help">
						Designs <span className="font-ovo">&</span> Experiments
					</span>
				</h1>
			</section>
			<section>
				<ul className="flex flex-col list-none group -mt-3">
					{craft.map((item, index) => (
						<div
							className={`animate-intro motion-reduce:duration-0 motion-reduce:opacity-100 animation-delay-${index + 1}`}
							key={slugify(item.title)}
						>
							<Link
								className="block group-hover:opacity-50 group-focus-within:opacity-50 py-6 hover:!opacity-100 focus:!opacity-100 transition-opacity duration-300 ease-in-out contrast-more:!opacity-100"
								href={item.link ?? "#"}
							>
								{item.image && (
									<Image
										alt={item.title}
										className="rounded-lg"
										height={item.image.height}
										layout="responsive"
										src={item.image.src}
										width={item.image.width}
									/>
								)}
								<h3 className="flex justify-between items-center gap-4 mt-6">
									<span>{item.title}</span>
								</h3>
							</Link>
							{index < craft.length - 1 && <hr />}
						</div>
					))}
				</ul>
			</section>
		</PageLoadAnimationWrapper>
	);
}
