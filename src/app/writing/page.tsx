import { getPosts } from "@/app/writing/posts";
import { PageLoadAnimationWrapper } from "@/components/page-load-animation";
import Link from "next/link";
import { Fragment } from "react";

export default function Home() {
	const posts = getPosts();

	return (
		<PageLoadAnimationWrapper className="flex flex-col mt-16 md:mt-24 lg:mt-32 mb-32 gap-y-10 md:gap-y-12">
			<section>
				<h1 className="font-instrument-serif text-3xl md:text-4xl">Writing</h1>
			</section>
			<section>
				<ul className="flex flex-col gap-y-6 list-none">
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
										className="exclude group"
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
