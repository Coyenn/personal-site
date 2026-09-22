"use client";

import { lineText, prepare, solve, type Line, type Prepared } from "@kitlangton/justice";
import { useEffect, useRef, useState, type ComponentProps } from "react";

type JustifiedParagraphProps = Omit<ComponentProps<"p">, "children"> & { text: string };
type ComposedParagraph = { prepared: Prepared; lines: Line[] };

export function JustifiedParagraph({ text, ...props }: JustifiedParagraphProps) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const [composition, setComposition] = useState<ComposedParagraph | null>(null);

  useEffect(() => {
    const paragraph = paragraphRef.current;
    if (!paragraph) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;

    let prepared: Prepared | null = null;
    let width = 0;
    let active = true;

    function compose() {
      if (!prepared || width <= 0) return;
      const layout = solve(prepared, width);
      setComposition(layout.lines.length ? { prepared, lines: layout.lines } : null);
    }

    function measureFont() {
      if (!active || !paragraph || !context) return;
      const style = getComputedStyle(paragraph);
      context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      context.fontKerning = style.fontKerning as CanvasFontKerning;
      prepared = prepare(text, (fragment) => context.measureText(fragment).width);
      compose();
    }

    const observer = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      compose();
    });
    observer.observe(paragraph);
    measureFont();
    document.fonts.ready.then(measureFont);
    document.fonts.addEventListener("loadingdone", measureFont);

    return () => {
      active = false;
      observer.disconnect();
      document.fonts.removeEventListener("loadingdone", measureFont);
    };
  }, [text]);

  return (
    <p
      {...props}
      ref={paragraphRef}
      onCopy={(event) => {
        if (!composition) return;
        const selectedText = window.getSelection()?.toString().replace(/\s+/g, " ").trim();
        if (selectedText !== text.replace(/\s+/g, " ").trim()) return;
        event.clipboardData.setData("text/plain", text);
        event.preventDefault();
      }}
    >
      {composition ? (
        <>
          <span className="sr-only select-none">{text}</span>
          <span aria-hidden="true">
            {composition.lines.map((line, index) => (
              <span
                key={index}
                className="block whitespace-nowrap"
                style={{
                  wordSpacing: `${line.wordSpacing}px`,
                  letterSpacing: `${line.tracking}px`,
                  marginLeft: `${-line.opening}px`,
                }}
              >
                {lineText(composition.prepared, line)}
              </span>
            ))}
          </span>
        </>
      ) : (
        text
      )}
    </p>
  );
}
