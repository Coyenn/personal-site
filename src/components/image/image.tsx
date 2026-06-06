import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import type { StaticImageData } from 'next/image';
import DefaultImage, {
  type DefaultImageProps,
} from '@/src/components/image/default-image';
import { resolveMediaDimensions } from '@/src/lib/resolve-media-dimensions';
import LightboxImage, { type LightboxImageProps } from './lightbox-image';
import ZoomImage, { type ZoomImageProps } from './zoom-image';

export type ImageVariant = 'lightbox' | 'zoom' | 'default';

export interface BaseImageProps {
  src: StaticImageData | StaticImport | string;
  alt: string;
  height?: number | `${number}`;
  width?: number | `${number}`;
  className?: string;
}

export interface ImageDefaultProps
  extends BaseImageProps,
    Omit<DefaultImageProps, keyof BaseImageProps> {
  variant?: 'default';
}

export interface ImageLightboxProps
  extends BaseImageProps,
    Omit<LightboxImageProps, keyof BaseImageProps | 'width' | 'height'> {
  variant: 'lightbox';
}

export interface ImageZoomProps
  extends BaseImageProps,
    Omit<ZoomImageProps, keyof BaseImageProps | 'width' | 'height'> {
  variant: 'zoom';
}

export type ImageProps =
  | ImageDefaultProps
  | ImageLightboxProps
  | ImageZoomProps;

export function Image(props: ImageProps) {
  const { variant = 'default', ...rest } = props;

  switch (variant) {
    case 'lightbox': {
      const { width, height } = resolveMediaDimensions(
        rest.src,
        rest.width,
        rest.height,
      );
      return <LightboxImage {...rest} width={width} height={height} />;
    }
    case 'zoom': {
      const { width, height } = resolveMediaDimensions(
        rest.src,
        rest.width,
        rest.height,
      );
      return <ZoomImage {...rest} width={width} height={height} />;
    }
    default:
      return <DefaultImage {...rest} />;
  }
}
