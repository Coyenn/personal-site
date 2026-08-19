import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ListingItemProps = ComponentProps<"li">;

type ListingLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
};

const listingItemClassName = "grid items-baseline";
const listingLinkClassName = "col-span-full grid grid-cols-subgrid";
const listingFill = ".".repeat(120);

function ListingFrame({ className, ...props }: ComponentProps<"ul">) {
  return <ul className={cn("m-0 grid list-none gap-6 p-0 max-w-full", className)} {...props} />;
}

function ListingItem({ className, ...props }: ListingItemProps) {
  return <li className={cn(listingItemClassName, className)} {...props} />;
}

function ListingLink({ children, className, href }: ListingLinkProps) {
  return (
    <Link className={cn(listingLinkClassName, className)} href={href}>
      {children}
    </Link>
  );
}

function ListingExternalLink({ children, className, href }: ListingLinkProps) {
  return (
    <a className={cn(listingLinkClassName, className)} href={href} rel="noreferrer" target="_blank">
      {children}
    </a>
  );
}

function ListingMarker({
  children = "⇒",
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("text-secondary select-none", className)} aria-hidden="true">
      {children}
    </span>
  );
}

function ListingDot() {
  return <ListingMarker>·</ListingMarker>;
}

function ListingContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "flex min-w-0 items-baseline gap-x-1 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-0",
        className,
      )}
    >
      {children}
    </span>
  );
}

function ListingTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("shrink-0", className)}>{children}</span>;
}

function ListingFill({
  children = listingFill,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "min-w-3 flex-1 overflow-hidden text-secondary whitespace-nowrap select-none max-[640px]:hidden",
        className,
      )}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

function ListingDescription({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("shrink-0 text-secondary-foreground max-[640px]:shrink", className)}>
      {children}
    </span>
  );
}

function ListingTime({ className, ...props }: ComponentProps<"time">) {
  return <time className={cn("text-secondary-foreground", className)} {...props} />;
}

export const Listing = {
  Content: ListingContent,
  Description: ListingDescription,
  Dot: ListingDot,
  ExternalLink: ListingExternalLink,
  Fill: ListingFill,
  Frame: ListingFrame,
  Item: ListingItem,
  Link: ListingLink,
  Marker: ListingMarker,
  Time: ListingTime,
  Title: ListingTitle,
};
