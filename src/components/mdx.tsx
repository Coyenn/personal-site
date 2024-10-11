import LightboxImage from "@/src/components/lightbox";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import type { ImageProps } from "next/image";
import Link from "next/link";
import {
	type AnchorHTMLAttributes,
	type DetailedHTMLProps,
	type FC,
	type ReactNode,
	createElement,
} from "react";
import slugify from "slugify";
import { highlight } from "sugar-high";
import CopyCode from "./copy-code";

const CustomLink = ((props) => {
	if (props.href?.startsWith("/"))
		return (
			<Link href={props.href} {...props}>
				{props.children}
			</Link>
		);

	if (props.href?.startsWith("#")) return <a {...props} />;
	return <a target="_blank" rel="noopener noreferrer" {...props} />;
}) as FC<
	DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
>;

const Img = ((props) => {
	return (
		<LightboxImage
			className="rounded-lg"
			alt={props.alt}
			src={props.src}
			width={props.width}
			height={props.height}
		/>
	);
}) as FC<ImageProps>;

const Code = (({ children, ...props }) => {
	const codeHTML = highlight(children as string);

	return (
		<>
			<CopyCode code={children as string} />
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: Needed in this case */}
			<code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
		</>
	);
}) as FC<{ children: ReactNode }>;

const createHeading = (level: number) => {
	const Heading = ({ children }: { children: ReactNode }) => {
		const slug = slugify(children as string);

		return createElement(
			`h${level}`,
			{ id: slug },
			[
				createElement("a", {
					href: `#${slug}`,
					key: `link-${slug}`,
					className: "anchor",
				}),
			],
			children,
		);
	};

	Heading.displayName = `Heading${level}`;
	return Heading;
};

const components = {
	h2: createHeading(2),
	h3: createHeading(3),
	h4: createHeading(4),
	Image: Img,
	a: CustomLink,
	code: Code,
};

export function MDX(props: MDXRemoteProps) {
	return (
		<MDXRemote
			{...props}
			// biome-ignore lint/suspicious/noExplicitAny: We need to cast to any here
			components={{ ...components, ...((props.components || {}) as any) }}
		/>
	);
}
