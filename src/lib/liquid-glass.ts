export interface DisplacementMapOptions {
  width: number;
  height: number;
  radius: number;
  bezel?: number;
  curvature?: number;
  dpr?: number;
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
  } = options;

  if (width <= 0 || height <= 0 || typeof document === 'undefined') {
    return null;
  }

  const w = Math.max(1, Math.round(width * dpr));
  const h = Math.max(1, Math.round(height * dpr));

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const image = ctx.createImageData(w, h);
  const data = image.data;

  const halfW = w / 2;
  const halfH = h / 2;
  const cornerRadius = Math.min(radius * dpr, halfW, halfH);
  const band = Math.max(1, bezel * Math.min(halfW, halfH));
  const eps = Math.max(1, dpr);

  const sdf = (px: number, py: number) =>
    roundedRectSdf(px, py, halfW, halfH, cornerRadius);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = x - halfW + 0.5;
      const py = y - halfH + 0.5;

      const d = sdf(px, py);
      const i = (y * w + x) * 4;

      if (d >= 0) {
        data[i] = 128;
        data[i + 1] = 128;
        data[i + 2] = 128;
        data[i + 3] = 255;
        continue;
      }

      const proximity = Math.max(0, 1 + d / band);
      const profile = proximity ** curvature;

      let nx = sdf(px + eps, py) - sdf(px - eps, py);
      let ny = sdf(px, py + eps) - sdf(px, py - eps);
      const len = Math.hypot(nx, ny) || 1;
      nx /= len;
      ny /= len;

      const dispX = -nx * profile;
      const dispY = -ny * profile;

      data[i] = Math.round(128 + dispX * 127);
      data[i + 1] = Math.round(128 + dispY * 127);
      data[i + 2] = 128;
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(image, 0, 0);

  return { dataUrl: canvas.toDataURL(), width, height };
}
