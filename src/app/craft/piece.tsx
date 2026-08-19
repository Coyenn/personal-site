import { cn } from "@/lib/utils";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import { CraftVideo } from "../components/craft/craft-video";
import { Listing } from "../components/listing";
import { isCraftVideo, type CraftImageItem, type CraftItem, type CraftVideoItem } from "./items";

const craftMediaWidthClassName =
  "col-span-full w-[min(600px,calc(100vw-3rem))] max-w-[600px] md:w-[min(600px,calc(100vw-5rem))]";

function mediaCaption(item: CraftItem) {
  if (item.description) {
    return `${item.title}. ${item.description}`;
  }

  return `${item.title}. ${item.tags.join(", ")}.`;
}

function CraftMediaFrame({
  caption,
  children,
  className,
  style,
}: {
  caption: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <figure className={cn(craftMediaWidthClassName, className)} style={style}>
      <figcaption className="sr-only">{caption}</figcaption>
      {children}
    </figure>
  );
}

function CraftStill({ item, loading }: { item: CraftImageItem; loading?: "eager" | "lazy" }) {
  return (
    <CraftMediaFrame caption={mediaCaption(item)}>
      <Image
        alt={item.title}
        className="h-auto w-full"
        height={item.media.height}
        loading={loading}
        preload={loading === "eager"}
        sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 768px) calc(100vw - 5rem), 600px"
        src={item.media.src}
        width={item.media.width}
      />
    </CraftMediaFrame>
  );
}

function CraftLoop({ item }: { item: CraftVideoItem }) {
  return (
    <CraftMediaFrame
      caption={mediaCaption(item)}
      className="relative"
      style={{ aspectRatio: `${item.media.width} / ${item.media.height}` }}
    >
      <CraftVideo
        height={item.media.height}
        src={item.media.src}
        title={item.title}
        width={item.media.width}
      />
    </CraftMediaFrame>
  );
}

function CraftPieceMedia({ item, loading }: { item: CraftItem; loading?: "eager" | "lazy" }) {
  if (isCraftVideo(item)) {
    return <CraftLoop item={item} />;
  }

  return <CraftStill item={item} loading={loading} />;
}

function CraftPieceHeading({ item }: { item: CraftItem }) {
  return (
    <>
      <Listing.Marker />
      <Listing.Content>
        <Listing.Title>{item.title}</Listing.Title>
      </Listing.Content>
    </>
  );
}

export function CraftListingItem({
  item,
  loading,
}: {
  item: CraftItem;
  loading?: "eager" | "lazy";
}) {
  return (
    <Listing.Item
      className="grid-cols-[12px_minmax(0,1fr)] items-start gap-x-3 gap-y-3"
      id={item.slug}
    >
      <CraftPieceMedia item={item} loading={loading} />
      {item.href ? (
        <Listing.ExternalLink className="hover:fancy-underline" href={item.href}>
          <CraftPieceHeading item={item} />
        </Listing.ExternalLink>
      ) : (
        <CraftPieceHeading item={item} />
      )}
    </Listing.Item>
  );
}
