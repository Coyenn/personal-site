import type { PageProps } from "@/.next/types/app/page";
import { getPosts } from "@/src/app/writing/posts";
import FocusMode from "@/src/components/focus-mode";
import { MDX } from "@/src/components/mdx";
import { PageLoadAnimationWrapper } from "@/src/components/page-load-animation";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import "@/src/app/writing/[slug]/post.css";

export const generateStaticParams = async () => {
	const posts = getPosts();

	return posts.map((post) => ({ slug: post.slug }));
};

export async function generateMetadata(
	props: PageProps,
): Promise<Metadata | undefined> {
	const { params } = props;
	const { slug } = await params;
	const post = getPosts().find((post) => post.slug === slug);

	if (!post) return;

	const {
		title,
		publishedAt: publishedTime,
		summary: description,
		image,
	} = post.metadata;
	const ogImage = image ? image : "https://tim-ritter.com/og-image.png";

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "article",
			publishedTime,
			url: `https://tim-ritter.com/writing/${post.slug}`,
			images: [{ url: ogImage }],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImage],
		},
		alternates: { canonical: `https://tim-ritter.com/writing/${post.slug}` },
	};
}

export default async function Page(props: PageProps) {
	const { params } = props;
	const { slug } = await params;
	const post = getPosts().find((post) => post.slug === slug);

	if (!post) notFound();

	return (
		<section>
			<FocusMode />
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
							? `https://tim-ritter.com${post.metadata.image}`
							: `/og?title=${encodeURIComponent(post.metadata.title)}`,
						url: `https://tim-ritter.com/writing/${post.slug}`,
						author: { "@type": "Person", name: "Harsh Singh" },
					}),
				}}
			/>
			<PageLoadAnimationWrapper>
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
						className="exclude flex items-center text-muted-foreground contrast-more:text-foreground mt-4 w-fit"
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4 mr-1"
							aria-hidden="true"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M16.0001 6C16.0001 5.44772 15.5524 5 15.0001 5L6.00009 5C5.44781 5 5.00009 5.44772 5.00009 6L5.00009 15C5.00009 15.5523 5.44781 16 6.00009 16C6.55238 16 7.00009 15.5523 7.00009 15V8.41421L16.293 17.7071C16.6835 18.0976 17.3167 18.0976 17.7072 17.7071C18.0977 17.3166 18.0977 16.6834 17.7072 16.2929L8.41431 7L15.0001 7C15.5524 7 16.0001 6.55228 16.0001 6Z"
								fill="currentColor"
							/>
						</svg>
						All Posts
					</Link>
				</section>
				<section className="flex flex-col gap-y-6">
					<article className="prose animate-children mt-12 md:mt-16 lg:mt-20">
						<MDX source={post.content} />
					</article>
				</section>
			</PageLoadAnimationWrapper>
		</section>
	);
}
