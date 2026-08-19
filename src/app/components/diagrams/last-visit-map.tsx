import { cn } from "@/lib/utils";
import { LAST_VISIT_MAP_COLS, renderLastVisitMap } from "@/lib/last-visit/render";
import { getRequestVisit } from "@/lib/last-visit/visit";

import { typogramToneClassName } from "./typogram";

export async function LastVisitMap() {
  const visit = await getRequestVisit();
  const map = renderLastVisitMap(visit);

  return (
    <figure className="mt-12 w-[600px] max-w-full overflow-x-hidden text-[12px]">
      <div aria-hidden="true" className="flex justify-center">
        <div
          className="grid w-[600px] shrink-0 leading-5"
          style={{ gridTemplateColumns: `repeat(${LAST_VISIT_MAP_COLS}, minmax(0, 1fr))` }}
        >
          {map.rows.flatMap((spans, rowIndex) =>
            spans.flatMap((span, spanIndex) =>
              Array.from(span.text).map((character, characterIndex) => (
                <span
                  className={cn(
                    "overflow-hidden text-center whitespace-pre",
                    typogramToneClassName[span.tone],
                    span.pulse && "animate-[marker-pulse_2200ms_ease-in-out_infinite]",
                    span.selectNone && "select-none",
                  )}
                  key={`${rowIndex}-${spanIndex}-${characterIndex}`}
                >
                  {character}
                </span>
              )),
            ),
          )}
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
