"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { DashFill, PlusMark } from "../ascii-glyph";
import { HL } from "./kernel";

type Readout = { textContent: string | null };

type FigureSpec = {
  name: string;
  range: [number, number, number];
  mount: (
    host: { stage: HTMLElement; svg: SVGSVGElement; read: Readout },
    value: number,
  ) => { destroy: () => void };
};

// The figures are written for the hairline-create bench, which provides `HL` and
// `hairline()` as globals. Providing the same two here keeps every figure a file
// the skill can still build and check as it is.
Object.assign(globalThis, { HL, hairline: (spec: FigureSpec) => spec });

const figures = {
  dedupe: () => import("./figures/dedupe.js"),
  focus: () => import("./figures/focus.js"),
  hjkl: () => import("./figures/hjkl.js"),
  interrupt: () => import("./figures/interrupt.js"),
  points: () => import("./figures/points.js"),
  spindle: () => import("./figures/spindle.js"),
} satisfies Record<string, () => Promise<{ default: FigureSpec }>>;

export type HairlineFigureName = keyof typeof figures;

const SVG_NS = "http://www.w3.org/2000/svg";

/** A label set into a rule: the words select and truncate, the brackets do neither. */
function RuleLabel({ children, className }: { children: ReactNode; className: string }) {
  return (
    <span className={cn("flex min-w-0 whitespace-pre", className)}>
      <span className="select-none">{" [ "}</span>
      <span className="truncate">{children}</span>
      <span className="select-none">{" ] "}</span>
    </span>
  );
}

/** One side of the frame: a bar on every 20px row, as tall as the stage beside it. */
function SideRule() {
  return <span className="ascii-bars w-2 shrink-0 text-secondary" aria-hidden="true" />;
}

export function HairlineFigure({
  className,
  explanation,
  name,
  rest,
  title,
}: {
  className?: string;
  explanation: string;
  name: HairlineFigureName;
  rest: string;
  title: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [readout, setReadout] = useState("rest");

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) {
      return;
    }

    let cancelled = false;
    let destroy: (() => void) | undefined;

    void figures[name]().then(({ default: spec }) => {
      if (cancelled) {
        return;
      }

      HL.inject(document);
      stage.setAttribute("data-hairline", spec.name);
      const svg = document.createElementNS(SVG_NS, "svg");
      svg.setAttribute("viewBox", "0 0 400 320");
      stage.append(svg);

      let text: string | null = null;
      const read: Readout = {
        get textContent() {
          return text;
        },
        set textContent(value) {
          text = value ?? "";
          setReadout(text);
        },
      };
      const figure = spec.mount({ stage, svg, read }, spec.range[1]);

      destroy = () => {
        figure.destroy();
        svg.remove();
      };
    });

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, [name]);

  // The frame is laid out by CSS alone (see .hairline-interior), so it is the right
  // size from the first paint at any width.
  const atRest = readout === "rest";

  return (
    <figure className={cn("my-6", className)}>
      <div aria-hidden="true">
        <div className="flex h-5 min-w-0 items-center">
          <PlusMark />
          <DashFill />
          <RuleLabel className="text-primary">{title}</RuleLabel>
          <DashFill />
          <PlusMark />
        </div>
        <div className="flex">
          <SideRule />
          <div className="hairline @container min-w-0 flex-1">
            <div className="hairline-interior">
              <div ref={stageRef} className="hairline-stage" />
            </div>
          </div>
          <SideRule />
        </div>
        <div className="flex h-5 min-w-0 items-center">
          <PlusMark />
          <DashFill />
          <RuleLabel className={atRest ? "text-foreground" : "text-primary"}>
            {atRest ? rest : readout}
          </RuleLabel>
          <DashFill className="w-8 flex-none" />
          <PlusMark />
        </div>
      </div>
      <figcaption className="sr-only">{explanation}</figcaption>
    </figure>
  );
}
