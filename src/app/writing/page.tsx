import { getPosts } from "@/app/writing/posts";
import { PageLoadAnimationWrapper } from "@/components/page-load-animation";
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
		<PageLoadAnimationWrapper className="flex flex-col mt-16 md:mt-24 lg:mt-32 mb-32 gap-y-10 md:gap-y-12">
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
								<li>
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
