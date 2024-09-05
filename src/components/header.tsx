"use client";

import useTabs, { type Tab } from "@/src/hooks/use-tabs";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	type CSSProperties,
	type FocusEvent,
	type PointerEvent,
	useEffect,
	useRef,
	useState,
} from "react";

export interface NavLinksProps {
	selectedTabIndex: number;
	tabs: Tab[];
}

function NavLinks(props: NavLinksProps) {
	const { selectedTabIndex, tabs } = props;
	const [buttonRefs, setButtonRefs] = useState<Array<HTMLAnchorElement | null>>(
		[],
	);

	const [hoveredTabIndex, setHoveredTabIndex] = useState<number | null>(null);
	const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);

	const ref = useRef<HTMLElement>(null);
	const rect = ref.current?.getBoundingClientRect();
	const selectedRect = buttonRefs[selectedTabIndex]?.getBoundingClientRect();
	const isInitialRender = useRef(true);

	useEffect(() => {
		setButtonRefs((prev) => prev.slice(0, tabs.length));
	}, [tabs.length]);

	const onLeaveTabs = () => {
		setHoveredTabIndex(null);
	};

	const onEnterTab = (
		e: PointerEvent<HTMLAnchorElement> | FocusEvent<HTMLAnchorElement>,
		i: number,
	) => {
		if (
			!e.target ||
			!buttonRefs[i] ||
			!ref.current ||
			!(e.target instanceof HTMLAnchorElement) ||
			!(e.target instanceof Element)
		)
			return;

		setHoveredTabIndex(i);
		setHoveredRect(e.target.getBoundingClientRect());
	};

	const hoverStyles: CSSProperties = {
		opacity: 0,
	};

	if (rect && hoveredRect) {
		hoverStyles.transform = `translate3d(${hoveredRect.left - rect.left}px,0px,0px)`;
		hoverStyles.width = hoveredRect.width;
		hoverStyles.height = hoveredRect.height;
		hoverStyles.opacity = hoveredTabIndex != null ? 1 : 0;
		hoverStyles.transition =
			"transform 250ms 0ms, opacity 250ms 0ms, width 250ms";
	}

	const selectStyles: CSSProperties = { opacity: 0 };
	if (rect && selectedRect) {
		selectStyles.width = selectedRect.width * 0.8;
		selectStyles.transform = `translateX(calc(${
			selectedRect.left - rect.left
		}px + 10%))`;
		selectStyles.opacity = 1;
		selectStyles.transition = isInitialRender.current
			? "opacity 150ms 150ms"
			: "transform 150ms 0ms, opacity 150ms 150ms, width 150ms";

		isInitialRender.current = false;
	}

	return (
		<nav
			className="relative z-50 flex items-center"
			ref={ref}
			onPointerLeave={onLeaveTabs}
		>
			{tabs.map((item, index) => (
				<Link
					key={`nav-item-${encodeURIComponent(item.title)}`}
					href={item.href}
					className={cn(
						"exclude px-2 sm:px-3.5 py-1 text-sm motion-safe:transition-colors",
						hoveredTabIndex === index || selectedTabIndex === index
							? "text-background dark:text-foreground"
							: "text-muted/40 dark:text-muted-foreground/70 contrast-more:text-background contrast-more:dark:text-foreground",
					)}
					aria-current={selectedTabIndex === index ? "page" : undefined}
					onPointerEnter={(e) => onEnterTab(e, index)}
					onFocus={(e) => onEnterTab(e, index)}
					ref={(el) => {
						buttonRefs[index] = el;
					}}
				>
					{item.title}
				</Link>
			))}
			<div
				className="pointer-events-none motion-reduce:hidden absolute left-0 top-0 rounded-full bg-muted/25 dark:bg-muted-foreground/25"
				style={hoverStyles}
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute bottom-0 left-0 -mb-1.5 flex justify-center rounded-full"
				style={selectStyles}
				aria-hidden
			>
				<div className="h-0.5 w-0.5 rounded-full bg-background dark:bg-foreground" />
			</div>
		</nav>
	);
}

function Header() {
	const pathname = usePathname();
	const tabs: Tab[] = [
		{
			title: "Home",
			href: "/",
		},
		{
			title: "Craft",
			href: "/craft",
		},
		{
			title: "Writing",
			href: "/writing",
		},
	];
	const [selected, setSelected] = useState<number>(0);
	const css = useTabs(tabs);

	useEffect(() => {
		const activeTab = tabs.findIndex((tab) => tab.href.includes(pathname));

		setSelected(activeTab);
	}, [pathname]);

	return (
		<header
			className="w-full flex justify-center print:hidden"
			aria-label="Site navigation"
		>
			<Link
				href={"#main"}
				className="absolute opacity-0 pointer-events-none top-0 left-0 focus:opacity-100 z-[51] px-4 py-2 bg-muted"
				tabIndex={0}
			>
				Jump To Content
			</Link>
			<div className="animate-intro motion-reduce:duration-0 motion-reduce:opacity-100 animation-delay-4 fixed bottom-0 z-50 mb-8 flex items-center rounded-full border-2 border-muted-foreground/50 bg-foreground/80 px-2 sm:px-3.5 pb-2.5 pt-2 text-background backdrop-blur-md shadow-xl dark:border-muted-foreground/5 dark:bg-muted/80 dark:text-foreground">
				<NavLinks {...css.tabProps} selectedTabIndex={selected} />
				<span
					className="ml-1 mr-3 sm:ml-2 sm:mr-5 text-muted/40 dark:text-muted-foreground/40 font-ovo select-none contrast-more:text-background contrast-more:dark:text-foreground"
					aria-hidden="true"
				>
					&
				</span>
				<a
					href="mailto:hello@tim-ritter.com"
					rel="noreferrer"
					target="_blank"
					className="group relative rounded-full px-3.5 py-1.5 transition-colors border border-black/5"
				>
					<span className="group-hover:opacity-70 motion-reduce:!hidden opacity-0 transition-opacity mask-gradient group-hover:animate-flip group-hover:before:animate-rotate absolute inset-0 h-[100%] w-[100%] overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
					<span className="absolute inset-[1px] bg-neutral-800 rounded-full" />
					<span className="absolute rounded-full inset-[1px] transition-colors duration-200 shadow-inner shadow-neutral-300/5 bg-muted/25 dark:bg-muted-foreground/25 group-hover:bg-muted/30 group-active:bg-muted/40 dark:group-hover:bg-muted-foreground/30 dark:group-active:bg-muted-foreground/40" />
					<span className="z-10 relative text-background dark:text-foreground text-sm">
						Contact
					</span>
				</a>
			</div>
		</header>
	);
}

export default Header;
