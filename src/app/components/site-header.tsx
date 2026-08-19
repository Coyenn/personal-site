"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, use, type ReactNode } from "react";

type SiteHeaderContextValue = {
  pathname: string;
};

type SiteHeaderLinkProps = {
  children: ReactNode;
  href: string;
};

const SiteHeaderContext = createContext<SiteHeaderContextValue | null>(null);

const siteHeaderLinkClassName = "text-secondary-foreground hover:fancy-underline inline-block";

function useSiteHeader() {
  const context = use(SiteHeaderContext);

  if (!context) {
    throw new Error("SiteHeader subcomponents must be rendered inside SiteHeader.");
  }

  return context;
}

function SiteHeaderFrame({ children }: { children: ReactNode }) {
  return (
    <header className="flex w-full flex-col items-start justify-start gap-3">{children}</header>
  );
}

function SiteHeaderNavigation({ children }: { children: ReactNode }) {
  return (
    <nav className="flex flex-wrap justify-start -mx-4" aria-label="Primary navigation">
      {children}
    </nav>
  );
}

function SiteHeaderBracket({
  children,
  state,
  className,
}: {
  children: ReactNode;
  state: "visible" | "reserved";
  className?: string;
}) {
  return (
    <span
      className={cn(state === "reserved" ? "invisible" : "text-secondary select-none", className)}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

function SiteHeaderLinkFrame({
  bracketState,
  children,
}: {
  bracketState: "visible" | "reserved";
  children: ReactNode;
}) {
  return (
    <span>
      <SiteHeaderBracket className="mr-2" state={bracketState}>
        [
      </SiteHeaderBracket>
      {children}
      <SiteHeaderBracket className="ml-2" state={bracketState}>
        ]
      </SiteHeaderBracket>
    </span>
  );
}

function isCurrentPath(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

function SiteHeaderLink({ children, href }: SiteHeaderLinkProps) {
  const { pathname } = useSiteHeader();
  const isCurrent = isCurrentPath(pathname, href);

  return (
    <SiteHeaderLinkFrame bracketState={isCurrent ? "visible" : "reserved"}>
      <Link
        className={siteHeaderLinkClassName}
        href={href}
        aria-current={isCurrent ? "page" : undefined}
      >
        {children}
      </Link>
    </SiteHeaderLinkFrame>
  );
}

function SiteHeaderExternalLink({ children, href }: SiteHeaderLinkProps) {
  return (
    <SiteHeaderLinkFrame bracketState="reserved">
      <a className={siteHeaderLinkClassName} href={href}>
        {children}
      </a>
    </SiteHeaderLinkFrame>
  );
}

function SiteHeaderRoot() {
  const pathname = usePathname();

  return (
    <SiteHeaderContext value={{ pathname }}>
      <SiteHeaderFrame>
        <SiteHeaderNavigation>
          <SiteHeaderLink href="/">Home</SiteHeaderLink>
          <SiteHeaderLink href="/projects">Projects</SiteHeaderLink>
          <SiteHeaderLink href="/craft">Craft</SiteHeaderLink>
          <SiteHeaderLink href="/writing">Writing</SiteHeaderLink>
        </SiteHeaderNavigation>
      </SiteHeaderFrame>
    </SiteHeaderContext>
  );
}

export const SiteHeader = Object.assign(SiteHeaderRoot, {
  Bracket: SiteHeaderBracket,
  ExternalLink: SiteHeaderExternalLink,
  Frame: SiteHeaderFrame,
  Link: SiteHeaderLink,
  LinkFrame: SiteHeaderLinkFrame,
  Navigation: SiteHeaderNavigation,
});
