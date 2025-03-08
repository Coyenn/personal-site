import NextImage, { type ImageProps as NextImageProps } from 'next/image';

export interface DefaultImageProps extends NextImageProps {}

export default function DefaultImage(props: DefaultImageProps) {
  return <NextImage draggable={false} {...props} />;
}
