import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import type { StaticImageData } from 'next/image';
import DefaultImage, {
  type DefaultImageProps,
} from '@/src/components/image/default-image';
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
    Omit<LightboxImageProps, keyof BaseImageProps> {
  variant: 'lightbox';
}

export interface ImageZoomProps
  extends BaseImageProps,
    Omit<ZoomImageProps, keyof BaseImageProps> {
  variant: 'zoom';
}

export type ImageProps =
  | ImageDefaultProps
  | ImageLightboxProps
  | ImageZoomProps;

export function Image(props: ImageProps) {
  const { variant = 'default', ...rest } = props;

  switch (variant) {
    case 'lightbox':
      return <LightboxImage {...rest} />;
    case 'zoom':
      return <ZoomImage {...rest} />;
    default:
      return <DefaultImage {...rest} />;
  }
}
