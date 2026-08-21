import {
  collapseTypogramCells,
  type TypogramCell,
  type TypogramSpan,
  type TypogramTone,
} from "@/app/components/diagrams/typogram";
import {
  LAST_VISIT_TILE_DEG,
  lastVisitTileLoaders,
} from "@/data/last-visit/tile-loaders";

import { countryName, type Visit } from "./visit";

export const LAST_VISIT_MAP_COLS = 80;
const ROWS = 18;
const PIXEL_W = LAST_VISIT_MAP_COLS * 2;
const PIXEL_H = ROWS * 4;
const LAT_HALF = 2.15;
const MAX_NEARBY = 4;
const CACHE_LIMIT = 32;
const LON_TILES = 360 / LAST_VISIT_TILE_DEG;
const LAT_TILES = 180 / LAST_VISIT_TILE_DEG;
const BRAILLE_DOTS = [
  [0x01, 0x08],
  [0x02, 0x10],
  [0x04, 0x20],
  [0x40, 0x80],
] as const;

type Place = {
  n: string;
  lat: number;
  lon: number;
  p: number;
};

type BBox = {
  west: number;
  east: number;
  south: number;
  north: number;
};

export type LastVisitMapView = {
  city: string;
  country: string;
  rows: TypogramSpan[][];
};

const renderCache = new Map<string, LastVisitMapView>();

function bboxFor(visit: Visit): BBox {
  const aspect = PIXEL_W / PIXEL_H;
  const cos = Math.max(0.2, Math.cos((visit.latitude * Math.PI) / 180));
  const lonHalf = (LAT_HALF * aspect) / cos;

  return {
    west: visit.longitude - lonHalf,
    east: visit.longitude + lonHalf,
    south: visit.latitude - LAT_HALF,
    north: visit.latitude + LAT_HALF,
  };
}

function tileKeysFor(box: BBox) {
  const keys = new Set<string>();
  const minX = Math.floor((box.west + 180) / LAST_VISIT_TILE_DEG);
  const maxX = Math.floor((box.east + 180) / LAST_VISIT_TILE_DEG);
  const minY = Math.max(0, Math.floor((box.south + 90) / LAST_VISIT_TILE_DEG));
  const maxY = Math.min(LAT_TILES - 1, Math.floor((box.north + 90) / LAST_VISIT_TILE_DEG));

  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      const wrappedX = ((x % LON_TILES) + LON_TILES) % LON_TILES;
      keys.add(`${wrappedX}_${y}`);
    }
  }

  return [...keys];
}

async function loadTiles(box: BBox) {
  const tiles = await Promise.all(
    tileKeysFor(box).map((key) => lastVisitTileLoaders[key]?.() ?? { lines: [], places: [] }),
  );

  return {
    lines: tiles.flatMap((tile) => tile.lines),
    places: tiles.flatMap((tile) => tile.places),
  };
}

function project(lon: number, lat: number, box: BBox) {
  return {
    x: Math.round(((lon - box.west) / (box.east - box.west)) * (PIXEL_W - 1)),
    y: Math.round(((box.north - lat) / (box.north - box.south)) * (PIXEL_H - 1)),
  };
}

function segmentCrosses(aLon: number, aLat: number, bLon: number, bLat: number, box: BBox) {
  if (aLon < box.west && bLon < box.west) {
    return false;
  }

  if (aLon > box.east && bLon > box.east) {
    return false;
  }

  if (aLat < box.south && bLat < box.south) {
    return false;
  }

  if (aLat > box.north && bLat > box.north) {
    return false;
  }

  return true;
}

function drawLine(pixels: Uint8Array, x0: number, y0: number, x1: number, y1: number) {
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  let x = x0;
  let y = y0;

  while (true) {
    if (x >= 0 && x < PIXEL_W && y >= 0 && y < PIXEL_H) {
      pixels[y * PIXEL_W + x] = 1;
    }

    if (x === x1 && y === y1) {
      break;
    }

    const doubled = err * 2;

    if (doubled > -dy) {
      err -= dy;
      x += sx;
    }

    if (doubled < dx) {
      err += dx;
      y += sy;
    }
  }
}

function rasterize(lines: number[][], box: BBox) {
  const pixels = new Uint8Array(PIXEL_W * PIXEL_H);

  for (const line of lines) {
    for (let index = 0; index + 3 < line.length; index += 2) {
      const aLon = line[index];
      const aLat = line[index + 1];
      const bLon = line[index + 2];
      const bLat = line[index + 3];

      if (!segmentCrosses(aLon, aLat, bLon, bLat, box)) {
        continue;
      }

      const from = project(aLon, aLat, box);
      const to = project(bLon, bLat, box);

      if (from.x === to.x && from.y === to.y) {
        if (from.x >= 0 && from.x < PIXEL_W && from.y >= 0 && from.y < PIXEL_H) {
          pixels[from.y * PIXEL_W + from.x] = 1;
        }
        continue;
      }

      drawLine(pixels, from.x, from.y, to.x, to.y);
    }
  }

  return pixels;
}

function brailleAt(pixels: Uint8Array, col: number, row: number) {
  const originX = col * 2;
  const originY = row * 4;
  let mask = 0;

  for (let dy = 0; dy < 4; dy += 1) {
    for (let dx = 0; dx < 2; dx += 1) {
      const x = originX + dx;
      const y = originY + dy;

      if (pixels[y * PIXEL_W + x]) {
        mask |= BRAILLE_DOTS[dy][dx];
      }
    }
  }

  return mask === 0 ? " " : String.fromCharCode(0x2800 + mask);
}

function emptyRow() {
  return Array.from({ length: LAST_VISIT_MAP_COLS }, (): TypogramCell => ({
    ch: " ",
    tone: "muted",
    selectNone: true,
  }));
}

function clipLabel(text: string) {
  if (text.length <= LAST_VISIT_MAP_COLS) {
    return text;
  }

  return `${text.slice(0, Math.max(1, LAST_VISIT_MAP_COLS - 1))}…`;
}

function occupy(used: boolean[][], row: number, col: number, length: number) {
  for (let index = 0; index < length; index += 1) {
    used[row][col + index] = true;
  }
}

function fits(used: boolean[][], row: number, col: number, length: number) {
  if (row < 0 || row >= ROWS || col < 0 || col + length > LAST_VISIT_MAP_COLS) {
    return false;
  }

  for (let index = -1; index <= length; index += 1) {
    const next = col + index;

    if (next >= 0 && next < LAST_VISIT_MAP_COLS && used[row][next]) {
      return false;
    }
  }

  return true;
}

function writeLabel(
  grid: TypogramCell[][],
  used: boolean[][],
  row: number,
  col: number,
  text: string,
  tone: TypogramTone,
  pulse: boolean,
) {
  for (const [index, character] of Array.from(text).entries()) {
    grid[row][col + index] = {
      ch: character,
      tone,
      pulse,
      selectNone: false,
    };
  }

  occupy(used, row, col, text.length);
}

function placeLabel(
  grid: TypogramCell[][],
  used: boolean[][],
  row: number,
  col: number,
  text: string,
  tone: TypogramTone,
  pulse: boolean,
  required: boolean,
) {
  const label = clipLabel(text);
  const candidates = [
    col + 1,
    col - label.length,
    Math.max(0, Math.min(LAST_VISIT_MAP_COLS - label.length, col)),
  ];

  for (const start of candidates) {
    if (fits(used, row, start, label.length)) {
      writeLabel(grid, used, row, start, label, tone, pulse);
      return true;
    }
  }

  if (!required) {
    return false;
  }

  const start = Math.max(0, Math.min(LAST_VISIT_MAP_COLS - label.length, col));
  writeLabel(grid, used, row, start, label, tone, pulse);
  return true;
}

function nearbyPlaces(visit: Visit, box: BBox, places: Place[]) {
  const visitName = visit.city.toLowerCase();

  return places
    .filter((place) => {
      if (
        place.lon < box.west ||
        place.lon > box.east ||
        place.lat < box.south ||
        place.lat > box.north
      ) {
        return false;
      }

      if (place.n.toLowerCase() === visitName) {
        return false;
      }

      return Math.hypot(place.lat - visit.latitude, place.lon - visit.longitude) > 0.18;
    })
    .sort((left, right) => right.p - left.p);
}

function cacheKey(visit: Visit) {
  return `${visit.city}|${visit.country}|${visit.latitude.toFixed(2)}|${visit.longitude.toFixed(2)}`;
}

function cacheGet(key: string) {
  const hit = renderCache.get(key);

  if (!hit) {
    return undefined;
  }

  renderCache.delete(key);
  renderCache.set(key, hit);
  return hit;
}

function cacheSet(key: string, value: LastVisitMapView) {
  if (renderCache.has(key)) {
    renderCache.delete(key);
  }

  renderCache.set(key, value);

  if (renderCache.size > CACHE_LIMIT) {
    const oldest = renderCache.keys().next().value;

    if (oldest) {
      renderCache.delete(oldest);
    }
  }
}

function paintMap(visit: Visit, lines: number[][], places: Place[]): LastVisitMapView {
  const box = bboxFor(visit);
  const pixels = rasterize(lines, box);
  const grid = Array.from({ length: ROWS }, emptyRow);
  const used = Array.from({ length: ROWS }, () =>
    Array.from({ length: LAST_VISIT_MAP_COLS }, () => false),
  );

  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < LAST_VISIT_MAP_COLS; col += 1) {
      const character = brailleAt(pixels, col, row);

      if (character !== " ") {
        grid[row][col] = { ch: character, tone: "muted", selectNone: true };
      }
    }
  }

  const visitPoint = project(visit.longitude, visit.latitude, box);
  const visitCol = Math.max(0, Math.min(LAST_VISIT_MAP_COLS - 1, Math.floor(visitPoint.x / 2)));
  const visitRow = Math.max(0, Math.min(ROWS - 1, Math.floor(visitPoint.y / 4)));

  placeLabel(grid, used, visitRow, visitCol, visit.city, "taught", true, true);

  let placed = 0;

  for (const place of nearbyPlaces(visit, box, places)) {
    if (placed >= MAX_NEARBY) {
      break;
    }

    const point = project(place.lon, place.lat, box);
    const col = Math.floor(point.x / 2);
    const row = Math.floor(point.y / 4);

    if (placeLabel(grid, used, row, col, place.n, "label", false, false)) {
      placed += 1;
    }
  }

  return {
    city: visit.city,
    country: countryName(visit.country),
    rows: grid.map((cells) => collapseTypogramCells(cells)),
  };
}

export async function renderLastVisitMap(visit: Visit): Promise<LastVisitMapView> {
  const key = cacheKey(visit);
  const cached = cacheGet(key);

  if (cached) {
    return cached;
  }

  const { lines, places } = await loadTiles(bboxFor(visit));
  const rendered = paintMap(visit, lines, places);
  cacheSet(key, rendered);
  return rendered;
}
