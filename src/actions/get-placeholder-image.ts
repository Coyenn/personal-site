'use server';

import { getPlaiceholder } from 'plaiceholder';

export async function getPlaceholderImage(src: string) {
  try {
    // For local images, we need to use a different approach
    let fullSrc = src;
    if (src.startsWith('/')) {
      // For local images, we need to use the full URL
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tim.cv';
      fullSrc = `${baseUrl}${src}`;
    }

    const buffer = await fetch(fullSrc).then(async (res) =>
      Buffer.from(await res.arrayBuffer()),
    );

    const { css } = await getPlaiceholder(buffer, { size: 10 });

    return css;
  } catch (error) {
    console.error('Error generating placeholder:', error);
    // Return a default blur data URL if there's an error
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAJJXIDTjwAAAABJRU5ErkJggg==';
  }
}
