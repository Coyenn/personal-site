export interface DisplacementMapOptions {
  width: number;
  height: number;
  radius: number;
  bezel?: number;
  curvature?: number;
  dpr?: number;
  pad?: number;
}

function roundedRectSdf(
  px: number,
  py: number,
  halfWidth: number,
  halfHeight: number,
  radius: number,
): number {
  const qx = Math.abs(px) - (halfWidth - radius);
  const qy = Math.abs(py) - (halfHeight - radius);
  const outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0));
  return Math.min(Math.max(qx, qy), 0) + outside - radius;
}

export interface DisplacementMap {
  dataUrl: string;
  width: number;
  height: number;
}

export function generateDisplacementMap(
  options: DisplacementMapOptions,
): DisplacementMap | null {
  const {
    width,
    height,
    radius,
    bezel = 0.45,
    curvature = 1.6,
    dpr = 1,
    pad = 0,
  } = options;

  if (width <= 0 || height <= 0 || typeof document === 'undefined') {
    return null;
  }

  const w = Math.max(1, Math.round((width + pad * 2) * dpr));
  const h = Math.max(1, Math.round((height + pad * 2) * dpr));

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const image = ctx.createImageData(w, h);
  const data = image.data;

  data.fill(128);
  for (let i = 3; i < data.length; i += 4) data[i] = 255;

  const innerW = Math.round(width * dpr);
  const innerH = Math.round(height * dpr);
  const halfW = innerW / 2;
  const halfH = innerH / 2;
  const cornerRadius = Math.min(radius * dpr, halfW, halfH);
  const band = Math.max(1, bezel * Math.min(halfW, halfH));
  const eps = Math.max(1, dpr);

  const cx = w / 2;
  const cy = h / 2;

  const sdf = (px: number, py: number) =>
    roundedRectSdf(px, py, halfW, halfH, cornerRadius);

  const halfRows = Math.ceil(h / 2);
  const halfCols = Math.ceil(w / 2);

  for (let y = 0; y < halfRows; y++) {
    for (let x = 0; x < halfCols; x++) {
      const px = x - cx + 0.5;
      const py = y - cy + 0.5;

      const d = sdf(px, py);

      const proximity = Math.max(0, 1 + d / band);
      const profile = proximity ** curvature;

      let nx = sdf(px + eps, py) - sdf(px - eps, py);
      let ny = sdf(px, py + eps) - sdf(px, py - eps);
      const len = Math.hypot(nx, ny) || 1;
      nx /= len;
      ny /= len;

      const dispX = -nx * profile;
      const dispY = -ny * profile;

      const r = Math.round(128 + dispX * 127);
      const g = Math.round(128 + dispY * 127);

      const yMirror = h - 1 - y;
      const xMirror = w - 1 - x;

      const i0 = (y * w + x) * 4;
      data[i0] = r;
      data[i0 + 1] = g;

      const i1 = (y * w + xMirror) * 4;
      data[i1] = 256 - r;
      data[i1 + 1] = g;

      const i2 = (yMirror * w + x) * 4;
      data[i2] = r;
      data[i2 + 1] = 256 - g;

      const i3 = (yMirror * w + xMirror) * 4;
      data[i3] = 256 - r;
      data[i3 + 1] = 256 - g;
    }
  }

  ctx.putImageData(image, 0, 0);

  return {
    dataUrl: canvas.toDataURL(),
    width: width + pad * 2,
    height: height + pad * 2,
  };
}
