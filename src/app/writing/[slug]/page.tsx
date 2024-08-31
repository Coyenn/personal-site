import { getPosts } from "@/app/writing/posts";
import { MDX } from "@/components/mdx";
import { PageLoadAnimationWrapper } from "@/components/page-load-animation";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { FC } from "react";

export const generateStaticParams = async () => {
	const posts = getPosts();
	return posts.map((post) => ({ slug: post.slug }));
};

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
	const post = getPosts().find((post) => post.slug === params.slug);
	if (!post) return;

	const {
		title,
		publishedAt: publishedTime,
		summary: description,
		image,
	} = post.metadata;
	const ogImage = image
		? image
		: `https://harshsingh.xyz/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "article",
			publishedTime,
			url: `https://harshsingh.xyz/writing/${post.slug}`,
			images: [{ url: ogImage }],
			author: "Harsh Singh",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImage],
		},
		alternates: { canonical: `https://harshsingh.xyz/writing/${post.slug}` },
	};
};

export default (({ params }) => {
	const post = getPosts().find((post) => post.slug === params.slug);
	if (!post) notFound();

	return (
		<section>
			<script
				type="application/ld+json"
				suppressHydrationWarning
				// biome-ignore lint/security/noDangerouslySetInnerHtml: Needed in this case
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BlogPosting",
						headline: post.metadata.title,
						datePublished: post.metadata.publishedAt,
						dateModified: post.metadata.publishedAt,
						description: post.metadata.summary,
						image: post.metadata.image
							? `https://harshsingh.xyz${post.metadata.image}`
							: `/og?title=${encodeURIComponent(post.metadata.title)}`,
						url: `https://harshsingh.xyz/writing/${post.slug}`,
						author: { "@type": "Person", name: "Harsh Singh" },
					}),
				}}
			/>
			<PageLoadAnimationWrapper className="flex flex-col mt-16 md:mt-24 lg:mt-32 mb-32 gap-y-10 md:gap-y-12">
				<section>
					<h1 className="font-instrument-serif text-3xl md:text-4xl">
						<span>{post.metadata.title}</span>
						<br />
						<span className="text-muted-foreground contrast-more:text-foreground">
							{post.metadata.summary}
						</span>
					</h1>
					<Link
						href="/writing"
						className="exclude flex items-center text-muted-foreground contrast-more:text-foreground mt-4"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="h-4 w-4 mr-1"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
							/>
						</svg>
						All Posts
					</Link>
				</section>
				<section className="flex flex-col gap-y-6">
					<article className="prose animate-children">
						<MDX source={post.content} />
					</article>
				</section>
			</PageLoadAnimationWrapper>
		</section>
	);
}) as FC<{ params: { slug: string } }>;
