import { cn } from "@/src/lib/utils";
import {
	Children,
	Fragment,
	type ReactNode,
	cloneElement,
	isValidElement,
} from "react";

export interface PageLoadAnimationWrapperProps {
	children?: ReactNode;
}

export function PageLoadAnimationWrapper(props: PageLoadAnimationWrapperProps) {
	const { children } = props;

	return (
		<Fragment>
			{Children.map(children, (child, index) => {
				if (isValidElement(child)) {
					return cloneElement(child, {
						// @ts-expect-error className should always be there
						className: cn(
							child.props.className,
							`animate-intro motion-reduce:duration-0 motion-reduce:opacity-100 animation-delay-${index + 1}`,
						),
					});
				}
				return child;
			})}
		</Fragment>
	);
}
