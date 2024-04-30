import type { ImageBlock as ImageBlockType, Media } from '@payload-types';
import Image from '@website/src/components/media/image';

export default function ImageBlockComponent(props: ImageBlockType) {
  const image = props.image as Media;

  return (
    <Image
      src={image?.url ?? ''}
      alt={image?.alt ?? 'No alt text provided'}
      width={image?.width ?? 0}
      height={image?.height ?? 0}
      lightbox={props?.lightbox ?? false}
      caption={image?.caption ?? ''}
    />
  );
}
