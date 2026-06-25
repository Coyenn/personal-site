import { execFileSync } from 'node:child_process';
import { readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const VIDEO_DIR = join(process.cwd(), 'public/videos/craft');
const PUBLIC_PREFIX = '/videos/craft';
const OUT_FILE = join(process.cwd(), 'src/data/craft-video-posters.ts');

function posterDataURL(file: string): string {
  const png = execFileSync(
    'ffmpeg',
    [
      '-i',
      join(VIDEO_DIR, file),
      '-frames:v',
      '1',
      '-vf',
      'scale=8:-1,scale=96:-1:flags=bicubic,gblur=sigma=11',
      '-f',
      'image2pipe',
      '-vcodec',
      'png',
      'pipe:1',
    ],
    { maxBuffer: 64 * 1024 * 1024 },
  );

  return `data:image/png;base64,${png.toString('base64')}`;
}

const posters: Record<string, string> = {};
for (const file of readdirSync(VIDEO_DIR).sort()) {
  if (!file.endsWith('.mp4')) continue;
  posters[`${PUBLIC_PREFIX}/${file}`] = posterDataURL(file);
}

const body = Object.entries(posters)
  .map(([key, value]) => `  '${key}': '${value}',`)
  .join('\n');

writeFileSync(
  OUT_FILE,
  `export const craftVideoPosters: Record<string, string> = {\n${body}\n};\n`,
);

execFileSync('bunx', ['biome', 'check', '--write', OUT_FILE], {
  stdio: 'ignore',
});

console.log(`Wrote ${Object.keys(posters).length} posters to ${OUT_FILE}`);
