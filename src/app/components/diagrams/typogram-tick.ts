"use client";

import { useEffect, useState } from "react";

export function useTypogramTick(intervalMs: number) {
  const [tick, setTick] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReducedMotion(media.matches);
    };

    apply();
    media.addEventListener("change", apply);

    return () => {
      media.removeEventListener("change", apply);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setTick((current) => current + 1);
    }, intervalMs);

    return () => {
      window.clearInterval(interval);
    };
  }, [intervalMs, reducedMotion]);

  return { reducedMotion, tick };
}
