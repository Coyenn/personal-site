import { cn } from "@/lib/utils";
import Link from "next/link";
import type { HTMLAttributes } from "react";

export interface PropjectItemProps extends HTMLAttributes<HTMLLIElement> {
	href: string;
	name: string;
	year: string;
	summary: string;
}

export interface ProjectContainerProps
	extends HTMLAttributes<HTMLUListElement> {
	children: React.ReactNode;
}

export function ProjectItem(props: PropjectItemProps) {
	const { href, name, year, summary, className, ...rest } = props;

	return (
		<li className={cn("flex flex-col relative gap-y-1", className)} {...rest}>
			<h3>
				<Link
					href={href}
					className="after:absolute after:inset-0 after:w-full after:h-full"
				>
					{name}
				</Link>
			</h3>
			<div
				className="flex gap-x-1 text-muted-foreground contrast-more:text-foreground text-sm"
				id={`${name}-project-description`}
			>
				<p>
					{year}
					<span aria-hidden="true"> &middot; </span>
					{summary}
				</p>
			</div>
		</li>
	);
}

export function ProjectContainer(props: ProjectContainerProps) {
	const { children, className, ...rest } = props;

	return (
		<ul
			className={cn("grid grid-cols-1 sm:grid-cols-2 gap-4", className)}
			{...rest}
		>
			{children}
		</ul>
	);
}
