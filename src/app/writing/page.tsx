import { getPosts } from "@/src/app/writing/posts";
import { PageLoadAnimationWrapper } from "@/src/components/page-load-animation";
import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";

export const metadata: Metadata = {
	title: "Writing",
	description: "Posts about design and development.",
	openGraph: {
		title: "Tim Ritter — Writing",
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
		canonical: "https://tim-ritter.com/writing",
	},
};

export default function Writing() {
	const posts = getPosts();

	return (
		<PageLoadAnimationWrapper>
			<section>
				<h1 className="font-instrument-serif text-3xl md:text-4xl">Writing</h1>
			</section>
			<section>
				<ul className="flex flex-col list-none group -mt-3">
					{posts
						.sort((a, b) => {
							if (
								new Date(a.metadata.publishedAt) >
								new Date(b.metadata.publishedAt)
							)
								return -1;
							return 1;
						})
						.map((post, index) => (
							<Fragment key={post.slug}>
								<li
									className={`animate-intro motion-reduce:duration-0 motion-reduce:opacity-100 animation-delay-${index + 1}`}
								>
									<Link
										className="block group-hover:opacity-50 group-focus-within:opacity-50 py-6 hover:!opacity-100 focus:!opacity-100 transition-opacity duration-300 ease-in-out contrast-more:!opacity-100"
										href={`/writing/${post.slug}`}
									>
										<h3 className="flex justify-between items-center gap-4">
											<span>{post.metadata.title}</span>
											<span className="text-muted-foreground contrast-more:text-foreground">
												{post.metadata.summary}
											</span>
										</h3>
									</Link>
								</li>
								{index < posts.length - 1 && <hr />}
							</Fragment>
						))}
				</ul>
			</section>
		</PageLoadAnimationWrapper>
	);
}
