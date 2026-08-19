"use client";

import { useEffect, useState } from "react";

const nodes = ["question", "build", "share"] as const;
const ticksPerNode = 2;

export function SignalDiagram() {
  const [animationTick, setAnimationTick] = useState(2);
  const activeIndex = Math.floor(animationTick / ticksPerNode) % nodes.length;

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setAnimationTick((current) => current + 1);
    }, 250);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <figure className="mt-12 max-w-full">
      <p className="sr-only">
        The diagram shows a repeating loop: day job, question, build, and share. The active stage
        changes over time without moving any elements.
      </p>
      <div className="flex max-w-full gap-3 overflow-x-auto pb-3 scrollbar-thin" aria-hidden="true">
        {nodes.map((node, index) => (
          <div key={node} className="flex shrink-0 items-center gap-3 whitespace-nowrap">
            <svg
              viewBox="0 0 12 12"
              className={`size-3 shrink-0 text-primary ${
                index === activeIndex
                  ? "animate-[marker-pulse_2200ms_ease-in-out_infinite] opacity-100"
                  : "opacity-70"
              }`}
              aria-hidden="true"
            >
              <circle cx="6" cy="6" r="3.5" fill="currentColor" />
            </svg>
            <span>{node}</span>
            {index < nodes.length - 1 ? (
              <svg
                viewBox="0 0 12 12"
                className="ml-1 size-3 shrink-0 text-secondary"
                aria-hidden="true"
              >
                <polygon points="4 2.5 9.5 6 4 9.5" fill="currentColor" />
              </svg>
            ) : null}
          </div>
        ))}
      </div>
    </figure>
  );
}
