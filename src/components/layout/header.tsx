'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { LiquidGlass } from '@/src/components/liquid-glass';
import useTabs, { type Tab } from '@/src/hooks/use-tabs';
import { glassVariantStyles } from '@/src/lib/glass-variants';
import { cn } from '@/src/lib/utils';

const NAV_TABS: Tab[] = [
  { title: 'Home', href: '/' },
  { title: 'Craft', href: '/craft' },
  { title: 'Writing', href: '/writing' },
];

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

  const onEnterTab = (index: number, target?: EventTarget) => {
    if (
      !target ||
      !buttonRefs[index] ||
      !ref.current ||
      !(target instanceof HTMLAnchorElement) ||
      !(target instanceof Element)
    )
      return;

    setHoveredTabIndex(index);
    setHoveredRect(target.getBoundingClientRect());
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
      'transform 250ms 0ms, opacity 250ms 0ms, width 250ms';
  }

  const selectStyles: CSSProperties = { opacity: 0 };
  if (rect && selectedRect) {
    selectStyles.width = selectedRect.width * 0.8;
    selectStyles.transform = `translateX(calc(${
      selectedRect.left - rect.left
    }px + 10%))`;
    selectStyles.opacity = 1;
    selectStyles.transition = isInitialRender.current
      ? 'opacity 150ms 150ms'
      : 'transform 150ms 0ms, opacity 150ms 150ms, width 150ms';

    isInitialRender.current = false;
  }

  return (
    <nav
      className="relative z-50 flex items-center"
      ref={ref}
      onPointerLeave={onLeaveTabs}
      aria-label="Main navigation"
    >
      {tabs.map((item, index) => (
        <Link
          key={`nav-item-${encodeURIComponent(item.title)}`}
          href={item.href}
          className={cn(
            'exclude px-3 sm:px-3.5 py-1 text-sm motion-safe:transition-colors',
            hoveredTabIndex === index || selectedTabIndex === index
              ? 'text-background dark:text-foreground'
              : 'text-background/60 dark:text-foreground/60 contrast-more:text-background contrast-more:dark:text-foreground',
          )}
          aria-current={selectedTabIndex === index ? 'page' : undefined}
          onPointerEnter={(e) => onEnterTab(index, e.target)}
          onMouseEnter={(e) => onEnterTab(index, e.target)}
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
  const [selected, setSelected] = useState<number>(0);
  const css = useTabs(NAV_TABS);

  useEffect(() => {
    const foundIndex = NAV_TABS.findIndex(
      (tab) =>
        (pathname.startsWith(tab.href) && tab.href !== '/') ||
        pathname === tab.href,
    );

    setSelected(foundIndex);
  }, [pathname]);

  return (
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: Needs to be a header tag
    <header
      className="w-full flex justify-center print:hidden"
      aria-label="Site Header"
    >
      <LiquidGlass
        bezel={5}
        refraction={100}
        rimOpacity={0}
        className={cn(
          'animate-intro motion-reduce:duration-0 motion-reduce:opacity-100 animation-delay-4 fixed bottom-0 z-50 mb-8 flex items-center rounded-full px-2 sm:px-3.5 pb-2.5 pt-2 text-background shadow-xl dark:text-foreground bg-foreground/40 dark:bg-muted/60 border-2 border-muted-foreground/5',
          glassVariantStyles['liquid-refract'],
        )}
      >
        <NavLinks {...css.tabProps} selectedTabIndex={selected} />
        <span
          className="hidden sm:block ml-1 mr-3 sm:ml-2 sm:mr-5 text-muted/40 dark:text-muted-foreground/40 font-ovo select-none contrast-more:text-background contrast-more:dark:text-foreground"
          aria-hidden="true"
        >
          &
        </span>
        <a
          href="mailto:hi@tim.cv"
          rel="noreferrer"
          target="_blank"
          className="text-background dark:text-foreground text-sm px-3.5 py-1.5 border border-black/5 rounded-full transition-colors duration-200 shadow-inner shadow-neutral-300/5 bg-muted/10 dark:bg-muted-foreground/10 hover:bg-muted/20 active:bg-muted/30 dark:hover:bg-muted-foreground/20 dark:active:bg-muted-foreground/30"
        >
          Contact
        </a>
      </LiquidGlass>
    </header>
  );
}

export default Header;
