import { cn } from "@/lib/utils";
import {
	Children,
	cloneElement,
	type HTMLAttributes,
	isValidElement,
	type ReactNode,
} from "react";

export interface PageLoadAnimationWrapperProps
	extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children?: ReactNode;
}

export function PageLoadAnimationWrapper(props: PageLoadAnimationWrapperProps) {
	const { className, children, ...rest } = props;

	return (
		<main className={className} {...rest}>
			{Children.map(children, (child, index) => {
				if (isValidElement(child)) {
					return cloneElement(child, {
						// @ts-expect-error className should always be there
						className: cn(
							child.props.className,
							`animate-intro opacity-0 animation-delay-${index + 1}`,
						),
					});
				}
				return child;
			})}
		</main>
	);
}
