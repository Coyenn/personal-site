import { cn } from "@/lib/utils";
import { renderLastVisitMap } from "@/lib/last-visit/render";
import { getRequestVisit } from "@/lib/last-visit/visit";

import { typogramToneClassName } from "./typogram";

export function LastVisitMapFallback() {
  return <div aria-hidden="true" className="mt-12 h-[392px] max-w-full" />;
}

export async function LastVisitMap() {
  const visit = await getRequestVisit();
  const map = await renderLastVisitMap(visit);

  return (
    <figure className="mt-12 w-[600px] max-w-full overflow-x-hidden text-[12px]">
      <div aria-hidden="true" className="flex justify-center">
        <div className="w-[600px] shrink-0 leading-5">
          {map.rows.map((spans, rowIndex) => (
            <div className="flex" key={rowIndex}>
              {spans.map((span, spanIndex) => (
                <span
                  className={cn(
                    "inline-block overflow-hidden whitespace-pre",
                    typogramToneClassName[span.tone],
                    span.pulse && "animate-[marker-pulse_2200ms_ease-in-out_infinite]",
                    span.selectNone && "select-none",
                  )}
                  key={`${rowIndex}-${spanIndex}`}
                  style={{ width: `${span.text.length}ch` }}
                >
                  {span.text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-center">
        Last visit: {map.city}, {map.country}
        <span className="sr-only">
          . A dotted outline map of the region around {map.city}, {map.country}, with nearby cities
          labeled. {map.city} is highlighted.
        </span>
      </figcaption>
    </figure>
  );
}
