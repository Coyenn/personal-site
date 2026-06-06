'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import {
  type DisplacementMap,
  generateDisplacementMap,
} from '@/src/lib/liquid-glass';
import { cn } from '@/src/lib/utils';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export interface LiquidGlassProps {
  scale?: number;
  blur?: number;
  chroma?: number;
  bezel?: number;
  curvature?: number;
  scrollResponse?: boolean;
  refractionTargetSelector?: string;
  className?: string;
}

interface VideoPair {
  clip: HTMLVideoElement;
  live: HTMLVideoElement;
}

interface StickyPair {
  clip: HTMLElement;
  live: HTMLElement;
}

function isStickyElement(el: HTMLElement): boolean {
  if (el.classList.contains('sticky')) return true;
  return el.isConnected && getComputedStyle(el).position === 'sticky';
}

function findStickyElements(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>('*')).filter(
    isStickyElement,
  );
}

function wrapStickyElementsForSync(root: HTMLElement) {
  for (const el of findStickyElements(root)) {
    const wrapper = document.createElement('div');
    wrapper.dataset.stickySync = 'true';
    wrapper.style.pointerEvents = 'none';
    el.parentNode?.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }
}

function sanitizeClone(root: HTMLElement) {
  root.setAttribute('aria-hidden', 'true');
  root.setAttribute('inert', '');
  root.style.pointerEvents = 'none';

  for (const el of root.querySelectorAll('[id]')) el.removeAttribute('id');
  for (const el of root.querySelectorAll('script,iframe,canvas')) el.remove();

  for (const video of root.querySelectorAll('video')) {
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.removeAttribute('autoplay');
    video.setAttribute('preload', 'auto');
    video.load();
  }
}

export function LiquidGlass(props: LiquidGlassProps) {
  const {
    scale = 55,
    blur = 4,
    chroma = 1,
    bezel = 0.9,
    curvature = 1.8,
    scrollResponse = true,
    refractionTargetSelector = 'main',
    className,
  } = props;

  const pathname = usePathname();
  const filterId = useId().replace(/[:]/g, '');

  const wrapperRef = useRef<HTMLDivElement>(null);
  const cloneHolderRef = useRef<HTMLDivElement>(null);
  const targetElRef = useRef<HTMLElement | null>(null);
  const videoPairsRef = useRef<VideoPair[]>([]);
  const stickyPairsRef = useRef<StickyPair[]>([]);
  const dispNodesRef = useRef<SVGFEDisplacementMapElement[]>([]);

  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  );
  const [map, setMap] = useState<DisplacementMap | null>(null);

  useIsomorphicLayoutEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);
      if (width <= 0 || height <= 0) return;
      setSize((prev) =>
        prev?.width === width && prev?.height === height
          ? prev
          : { width, height },
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!size) return;
    const generated = generateDisplacementMap({
      width: size.width,
      height: size.height,
      radius: size.height / 2,
      bezel,
      curvature,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    if (generated) setMap(generated);
  }, [size, bezel, curvature]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname re-clones on navigation
  useEffect(() => {
    const holder = cloneHolderRef.current;
    if (!holder) return;

    const target = document.querySelector<HTMLElement>(
      refractionTargetSelector,
    );
    if (!target) return;
    targetElRef.current = target;

    const clone = document.createElement('div');
    clone.className = target.className;
    clone.style.margin = '0';
    clone.style.width = '100%';
    for (const child of Array.from(target.children)) {
      clone.appendChild(child.cloneNode(true));
    }
    sanitizeClone(clone);
    wrapStickyElementsForSync(clone);
    holder.replaceChildren(clone);

    const realVideos = Array.from(target.querySelectorAll('video'));
    const cloneVideos = Array.from(clone.querySelectorAll('video'));
    videoPairsRef.current = cloneVideos
      .map((clip, index) => ({ clip, live: realVideos[index] }))
      .filter(
        (pair): pair is VideoPair => pair.live instanceof HTMLVideoElement,
      );

    const realStickies = findStickyElements(target);
    const cloneStickies = findStickyElements(clone);
    stickyPairsRef.current = cloneStickies
      .map((clip, index) => ({ clip, live: realStickies[index] }))
      .filter((pair): pair is StickyPair => pair.live instanceof HTMLElement);

    return () => {
      for (const { clip } of videoPairsRef.current) clip.pause();
      videoPairsRef.current = [];
      stickyPairsRef.current = [];
      holder.replaceChildren();
      targetElRef.current = null;
    };
  }, [refractionTargetSelector, pathname]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const holder = cloneHolderRef.current;
    if (!wrapper || !holder) return;

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let lastScrollY = window.scrollY;
    let velocity = 0;
    let frame = 0;
    let videoCheck = 0;
    const channelOffsets = [chroma, 0, -chroma];

    const syncStickies = () => {
      for (const { clip, live } of stickyPairsRef.current) {
        if (!live.isConnected) continue;
        const wrapper = clip.parentElement;
        if (!wrapper?.dataset.stickySync) continue;

        const liveRect = live.getBoundingClientRect();
        const clipRect = clip.getBoundingClientRect();
        const dx = liveRect.left - clipRect.left;
        const dy = liveRect.top - clipRect.top;

        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
          wrapper.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
        } else {
          wrapper.style.transform = '';
        }
      }
    };

    const syncVideos = (lensRect: DOMRect) => {
      for (const { clip, live } of videoPairsRef.current) {
        const r = clip.getBoundingClientRect();
        const overlaps =
          r.bottom > lensRect.top &&
          r.top < lensRect.bottom &&
          r.right > lensRect.left &&
          r.left < lensRect.right;

        if (overlaps) {
          if (Math.abs(clip.currentTime - live.currentTime) > 0.12) {
            clip.currentTime = live.currentTime;
          }
          if (clip.paused) clip.play().catch(() => {});
        } else if (!clip.paused) {
          clip.pause();
        }
      }
    };

    const tick = () => {
      const target = targetElRef.current;
      const wrapperRect = wrapper.getBoundingClientRect();
      if (target?.isConnected) {
        const targetRect = target.getBoundingClientRect();
        const dx = targetRect.left - wrapperRect.left;
        const dy = targetRect.top - wrapperRect.top;
        holder.style.width = `${targetRect.width}px`;
        holder.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
        syncStickies();
      }

      videoCheck += 1;
      if (videoCheck >= 10) {
        videoCheck = 0;
        if (videoPairsRef.current.length > 0) syncVideos(wrapperRect);
      }

      if (scrollResponse && !reduceMotion) {
        const current = window.scrollY;
        velocity += (Math.abs(current - lastScrollY) - velocity) * 0.25;
        velocity *= 0.9;
        lastScrollY = current;
        const boost = Math.min(velocity * 0.6, scale * 0.9);
        dispNodesRef.current.forEach((node, index) => {
          node?.setAttribute(
            'scale',
            String(scale + boost + channelOffsets[index]),
          );
        });
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [scrollResponse, scale, chroma]);

  const supported =
    map !== null && size !== null && size.width > 0 && size.height > 0;

  const pad = Math.ceil(blur * 3 + scale + chroma + 2);

  dispNodesRef.current = [];

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]"
    >
      <div
        className="absolute inset-[1.5px] rounded-[inherit]"
        style={{ backgroundColor: 'hsl(var(--background))' }}
      />
      <div
        className="absolute inset-0"
        style={{ filter: supported ? `url(#${filterId})` : undefined }}
      >
        <div
          ref={cloneHolderRef}
          className="absolute left-0 top-0 origin-top-left"
          style={{ willChange: 'transform' }}
        />
      </div>
      <div className={cn('absolute inset-0 rounded-[inherit]', className)} />

      {supported ? (
        <svg
          aria-hidden
          className="absolute size-0"
          width="0"
          height="0"
          style={{ position: 'absolute' }}
        >
          <title>Liquid glass refraction filter</title>
          <defs>
            <filter
              id={filterId}
              filterUnits="userSpaceOnUse"
              primitiveUnits="userSpaceOnUse"
              x={-pad}
              y={-pad}
              width={size.width + pad * 2}
              height={size.height + pad * 2}
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodColor="rgb(128,128,128)" result="neutral" />
              <feImage
                href={map.dataUrl}
                x="0"
                y="0"
                width={size.width}
                height={size.height}
                preserveAspectRatio="none"
                result="lens"
              />
              <feComposite
                in="lens"
                in2="neutral"
                operator="over"
                result="map"
              />
              <feDisplacementMap
                ref={(el) => {
                  if (el) dispNodesRef.current[0] = el;
                }}
                in="SourceGraphic"
                in2="map"
                scale={scale + chroma}
                xChannelSelector="R"
                yChannelSelector="G"
                result="dispR"
              />
              <feColorMatrix
                in="dispR"
                type="matrix"
                values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                result="red"
              />
              <feDisplacementMap
                ref={(el) => {
                  if (el) dispNodesRef.current[1] = el;
                }}
                in="SourceGraphic"
                in2="map"
                scale={scale}
                xChannelSelector="R"
                yChannelSelector="G"
                result="dispG"
              />
              <feColorMatrix
                in="dispG"
                type="matrix"
                values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
                result="green"
              />
              <feDisplacementMap
                ref={(el) => {
                  if (el) dispNodesRef.current[2] = el;
                }}
                in="SourceGraphic"
                in2="map"
                scale={scale - chroma}
                xChannelSelector="R"
                yChannelSelector="G"
                result="dispB"
              />
              <feColorMatrix
                in="dispB"
                type="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
                result="blue"
              />
              <feComposite
                in="red"
                in2="green"
                operator="arithmetic"
                k1="0"
                k2="1"
                k3="1"
                k4="0"
                result="rg"
              />
              <feComposite
                in="rg"
                in2="blue"
                operator="arithmetic"
                k1="0"
                k2="1"
                k3="1"
                k4="0"
                result="rgb"
              />
              <feGaussianBlur in="rgb" stdDeviation={blur} />
            </filter>
          </defs>
        </svg>
      ) : null}
    </div>
  );
}
