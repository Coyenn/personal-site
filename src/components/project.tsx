import { cn } from "@/lib/utils";
import Link from "next/link";
import type { HTMLAttributes } from "react";

export interface PropjectItemProps extends HTMLAttributes<HTMLLIElement> {
	href: string;
	target?: string;
	name: string;
	position: string;
	summary: string;
}

export interface ProjectContainerProps
	extends HTMLAttributes<HTMLUListElement> {
	children: React.ReactNode;
}

export function ProjectItem(props: PropjectItemProps) {
	const { href, target, name, position, summary, className, ...rest } = props;

	return (
		<li className={cn("flex flex-col relative gap-y-1", className)} {...rest}>
			<Link href={href} target={target} className="w-fit">
				{name}
			</Link>
			<div className="flex gap-x-1 text-muted-foreground contrast-more:text-foreground">
				<p>
					{position}
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
			className={cn(
				"grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6",
				className,
			)}
			{...rest}
		>
			{children}
		</ul>
	);
}
