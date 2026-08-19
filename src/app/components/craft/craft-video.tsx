"use client";

import { useEffect, useRef } from "react";

import { craftVideoPosters } from "@/app/craft/video-posters";

type CraftVideoProps = {
  height: number;
  src: string;
  title: string;
  width: number;
};

export function CraftVideo({ height, src, title, width }: CraftVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      controls={false}
      height={height}
      loop
      muted
      playsInline
      poster={craftVideoPosters[src]}
      preload="metadata"
      title={title}
      width={width}
    >
      <source src={src} type="video/mp4" />
      Video of {title} is not supported in this browser.
    </video>
  );
}
