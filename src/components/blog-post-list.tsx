"use client";

import { useHighlightList } from "@/src/hooks/use-highlight-list";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { Fragment } from "react";

export interface BlogPostProps {
	posts: {
		slug: string;
		metadata: {
			title: string;
			summary: string;
		};
	}[];
}

export default function BlogPostList(props: BlogPostProps) {
	const { posts } = props;
	const highlightIndex = useHighlightList(
		(state) => state.currentHighlightIndex,
	);
	const setHighlightIndex = useHighlightList(
		(state) => state.setHighlightIndex,
	);

	return (
		<ul className="flex flex-col list-none group -mt-3">
			{posts.map((post, index) => (
				<Fragment key={post.slug}>
					<li
						className={`animate-intro motion-reduce:duration-0 motion-reduce:opacity-100 animation-delay-${index + 1}`}
						onMouseEnter={() => setHighlightIndex(index)}
						onMouseLeave={() => setHighlightIndex(-1)}
					>
						<Link
							className={cn(
								"block group-has-[.hightlight]:opacity-50 group-hover:opacity-50 motion-reduce:!opacity-100 py-6 hover:!opacity-100 transition-opacity duration-300 ease-in-out contrast-more:!opacity-100",
								index === highlightIndex && "hightlight !opacity-100",
							)}
							href={`/writing/${post.slug}`}
						>
							<h3 className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-4">
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
	);
}
