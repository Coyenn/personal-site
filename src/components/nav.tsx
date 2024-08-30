"use client";

import Link from "next/link";
import {
	type CSSProperties,
	type FocusEvent,
	type PointerEvent,
	useEffect,
	useRef,
	useState,
} from "react";
import useTabs, { type Tab } from "@/hooks/use-tabs";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface NavLinksProps {
	selectedTabIndex: number;
	tabs: Tab[];
}

function NavLinks(props: NavLinksProps) {
	const { selectedTabIndex, tabs } = props;
	const [buttonRefs, setButtonRefs] = useState<Array<HTMLAnchorElement | null>>(
		[],
	);

	useEffect(() => {
		setButtonRefs((prev) => prev.slice(0, tabs.length));
	}, [tabs.length]);

	const [hoveredTabIndex, setHoveredTabIndex] = useState<number | null>(null);
	const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);

	const ref = useRef<HTMLElement>(null);
	const rect = ref.current?.getBoundingClientRect();
	const selectedRect = buttonRefs[selectedTabIndex]?.getBoundingClientRect();

	const isInitialRender = useRef(true);

	const onLeaveTabs = () => {
		setHoveredTabIndex(null);
	};

	const onEnterTab = (
		e: PointerEvent<HTMLAnchorElement> | FocusEvent<HTMLAnchorElement>,
		i: number,
	) => {
		if (!e.target || !(e.target instanceof HTMLAnchorElement)) return;

		setHoveredTabIndex(i);
		setHoveredRect(e.target.getBoundingClientRect());
	};

	const hoverStyles: CSSProperties = {
		opacity: 0,
		transform: "translateY(20px)",
	};

	if (rect && hoveredRect) {
		hoverStyles.transform =
			hoveredTabIndex === null
				? `translate3d(${hoveredRect.left - rect.left}px,20px,0px)`
				: `translate3d(${hoveredRect.left - rect.left}px,0px,0px)`;
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
						"exclude px-2 sm:px-3.5 py-1 text-sm transition-colors",
						hoveredTabIndex === index || selectedTabIndex === index
							? "text-background"
							: "text-muted/40",
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
				className="pointer-events-none absolute left-0 top-0 rounded-full bg-muted/25"
				style={hoverStyles}
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute bottom-0 left-0 -mb-1.5 flex justify-center rounded-full"
				style={selectStyles}
				aria-hidden
			>
				<div className="h-0.5 w-0.5 rounded-full bg-background" />
			</div>
		</nav>
	);
}

function Nav() {
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
		<div className="w-full flex justify-center">
			<div className="animate-intro animation-delay-4 opacity-0 fixed bottom-0 z-50 mb-8 flex items-center rounded-full border-2 border-muted-foreground/50 bg-foreground/80 px-2 sm:px-3.5 pb-2.5 pt-2 text-background backdrop-blur-sm shadow-xl">
				<NavLinks {...css.tabProps} selectedTabIndex={selected} />
				<div className="ml-1 mr-3 sm:ml-3 sm:mr-5 h-0.5 w-0.5 rounded-full bg-muted/40" />
				<a
					href="mailto:t-ritter-mail@web.de"
					rel="noreferrer"
					target="_blank"
					className="rounded-full bg-muted/25 px-3.5 py-1.5 text-sm transition-colors hover:bg-muted/30 active:bg-muted/40"
				>
					Contact
				</a>
			</div>
		</div>
	);
}

export default Nav;
