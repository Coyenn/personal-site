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

function isWebKitEngine(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  return /AppleWebKit/.test(ua) && !/Chrom(e|ium)|Edg\/|OPR\/|Android/.test(ua);
}

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
  lastDx: number;
  lastDy: number;
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
    video.setAttribute('preload', 'metadata');
    video.load();
  }
}

function replaceCloneVideosWithStillFrames(
  clone: HTMLElement,
  liveVideos: HTMLVideoElement[],
): () => void {
  const cloneVideos = Array.from(clone.querySelectorAll('video'));
  const cleanupFns: (() => void)[] = [];

  for (let i = 0; i < cloneVideos.length; i++) {
    const cloneVideo = cloneVideos[i];
    const live = liveVideos[i];
    if (!(live instanceof HTMLVideoElement)) continue;

    const img = document.createElement('img');
    img.alt = '';
    img.className = cloneVideo.className;
    img.dataset.videoStill = 'true';

    const capture = () => {
      if (live.videoWidth === 0 || live.videoHeight === 0) return;
      const canvas = document.createElement('canvas');
      canvas.width = live.videoWidth;
      canvas.height = live.videoHeight;
      canvas.getContext('2d')?.drawImage(live, 0, 0);
      img.src = canvas.toDataURL('image/jpeg', 0.7);
    };

    if (live.readyState >= 2) {
      capture();
    } else {
      live.addEventListener('loadeddata', capture, { once: true });
      cleanupFns.push(() => live.removeEventListener('loadeddata', capture));
    }

    cloneVideo.parentNode?.replaceChild(img, cloneVideo);
  }

  return () => {
    for (const fn of cleanupFns) fn();
  };
}

export function LiquidGlass(props: LiquidGlassProps) {
  const {
    scale = 55,
    blur = 2,
    chroma = 0.5,
    bezel = 1,
    curvature = 2,
    scrollResponse = true,
    refractionTargetSelector = 'main',
    className,
  } = props;

  const pathname = usePathname();
  const filterId = useId().replace(/[:]/g, '');
  const pad = Math.ceil(blur * 3 + scale + chroma + 2);

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
  const [filterVersion, setFilterVersion] = useState(0);

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
      pad,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    if (generated) {
      setMap(generated);
      setFilterVersion((version) => version + 1);
    }
  }, [size, bezel, curvature, pad]);

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

    let cleanupFrames: (() => void) | undefined;
    if (isWebKitEngine()) {
      cleanupFrames = replaceCloneVideosWithStillFrames(clone, realVideos);
      videoPairsRef.current = [];
    } else {
      const cloneVideos = Array.from(clone.querySelectorAll('video'));
      videoPairsRef.current = cloneVideos
        .map((clip, index) => ({ clip, live: realVideos[index] }))
        .filter(
          (pair): pair is VideoPair => pair.live instanceof HTMLVideoElement,
        );
    }

    const realStickies = findStickyElements(target);
    const cloneStickies = findStickyElements(clone);
    stickyPairsRef.current = cloneStickies
      .map((clip, index) => ({
        clip,
        live: realStickies[index],
        lastDx: 0,
        lastDy: 0,
      }))
      .filter((pair): pair is StickyPair => pair.live instanceof HTMLElement);

    return () => {
      cleanupFrames?.();
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

    let motionQuery: MediaQueryList | null = null;
    let reduceMotion = false;
    const updateReduceMotion = () => {
      reduceMotion = motionQuery?.matches ?? false;
    };
    if (typeof window !== 'undefined') {
      motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      reduceMotion = motionQuery.matches;
      motionQuery.addEventListener('change', updateReduceMotion);
    }

    let dirty = true;
    let rafId: number | null = null;
    let idleFrames = 0;
    let velocity = 0;
    let lastScrollY = window.scrollY;
    let videoCheck = 0;
    const baseScales = [scale + chroma, scale, scale - chroma];

    const ensureLoop = () => {
      if (rafId === null) {
        idleFrames = 0;
        rafId = requestAnimationFrame(tick);
      }
    };

    const markDirty = () => {
      dirty = true;
      ensureLoop();
    };

    const syncStickies = () => {
      const updates: Array<{
        wrapper: HTMLElement;
        dx: number;
        dy: number;
        pair: StickyPair;
      }> = [];
      for (const pair of stickyPairsRef.current) {
        const { clip, live } = pair;
        if (!live.isConnected) continue;
        const w = clip.parentElement;
        if (!w?.dataset.stickySync) continue;

        const liveRect = live.getBoundingClientRect();
        const clipRect = clip.getBoundingClientRect();
        const dx = liveRect.left - (clipRect.left - pair.lastDx);
        const dy = liveRect.top - (clipRect.top - pair.lastDy);
        updates.push({ wrapper: w, dx, dy, pair });
      }

      for (const { wrapper, dx, dy, pair } of updates) {
        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
          wrapper.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
          pair.lastDx = dx;
          pair.lastDy = dy;
        } else if (pair.lastDx !== 0 || pair.lastDy !== 0) {
          wrapper.style.transform = '';
          pair.lastDx = 0;
          pair.lastDy = 0;
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

      if (dirty) {
        dirty = false;
        idleFrames = 0;

        if (target?.isConnected) {
          const targetRect = target.getBoundingClientRect();
          const dx = targetRect.left - wrapperRect.left + pad;
          const dy = targetRect.top - wrapperRect.top + pad;
          holder.style.width = `${targetRect.width}px`;
          holder.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
          syncStickies();
        }
      }

      videoCheck += 1;
      if (videoCheck >= 10) {
        videoCheck = 0;
        if (videoPairsRef.current.length > 0) syncVideos(wrapperRect);
      }

      if (scrollResponse && !reduceMotion) {
        const current = window.scrollY;
        const delta = Math.abs(current - lastScrollY);
        lastScrollY = current;

        if (delta > 0) {
          velocity += (delta - velocity) * 0.25;
        }
        velocity *= 0.9;

        const boost = Math.min(velocity * 0.6, scale * 0.9);
        const boostSignificant = boost > 0.1 || velocity > 0.05;

        if (boostSignificant) {
          dispNodesRef.current.forEach((node, index) => {
            node?.setAttribute('scale', String(baseScales[index] + boost));
          });
        } else if (velocity <= 0.05) {
          dispNodesRef.current.forEach((node, index) => {
            node?.setAttribute('scale', String(baseScales[index]));
          });
          velocity = 0;
        }
      }

      if (!dirty && velocity === 0) {
        idleFrames += 1;
      }

      if (idleFrames >= 5) {
        rafId = null;
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      dirty = true;
      ensureLoop();
    };

    const onResize = () => markDirty();

    const onVisibility = () => {
      if (document.hidden) {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      } else {
        markDirty();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    let mutationObs: MutationObserver | null = null;
    const target0 = targetElRef.current;
    if (target0) {
      mutationObs = new MutationObserver(markDirty);
      mutationObs.observe(target0, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: false,
      });
    }

    ensureLoop();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      motionQuery?.removeEventListener('change', updateReduceMotion);
      mutationObs?.disconnect();
    };
  }, [scrollResponse, scale, chroma, pad]);

  const supported =
    map !== null && size !== null && size.width > 0 && size.height > 0;
  const activeFilterId = `${filterId}-${filterVersion}`;
  const activeFilterUrl = `url(#${activeFilterId})`;

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
        className="absolute overflow-hidden"
        style={{
          top: -pad,
          left: -pad,
          right: -pad,
          bottom: -pad,
          filter: supported ? activeFilterUrl : undefined,
          WebkitFilter: supported ? activeFilterUrl : undefined,
          transform: 'translateZ(0)',
          willChange: 'filter',
        }}
      >
        <div
          ref={cloneHolderRef}
          className="absolute left-0 top-0 origin-top-left"
        />
      </div>
      <div className={cn('absolute inset-0 rounded-[inherit]', className)} />

      {supported ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          className="pointer-events-none absolute"
          width={size.width + pad * 2}
          height={size.height + pad * 2}
          viewBox={`0 0 ${size.width + pad * 2} ${size.height + pad * 2}`}
          style={{
            top: -pad,
            left: -pad,
            width: size.width + pad * 2,
            height: size.height + pad * 2,
            overflow: 'visible',
          }}
        >
          <title>Liquid glass refraction filter</title>
          <defs>
            <filter
              id={activeFilterId}
              filterUnits="userSpaceOnUse"
              primitiveUnits="userSpaceOnUse"
              x="0"
              y="0"
              width={size.width + pad * 2}
              height={size.height + pad * 2}
              colorInterpolationFilters="sRGB"
            >
              {/* Pad is baked into the displacement map (neutral 128,128,128 border),
                  so feImage covers the full filter region at (0,0). This removes the
                  feFlood+feComposite and avoids WebKit's feImage subregion bugs. */}
              <feImage
                href={map.dataUrl}
                xlinkHref={map.dataUrl}
                x="0"
                y="0"
                width={size.width + pad * 2}
                height={size.height + pad * 2}
                preserveAspectRatio="none"
                result="lens"
              />
              <feDisplacementMap
                ref={(el) => {
                  if (el) dispNodesRef.current[0] = el;
                }}
                in="SourceGraphic"
                in2="lens"
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
                in2="lens"
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
                in2="lens"
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
