import type {
  ImageBlock as ImageBlockType,
  ImageSliderBlock,
  Media,
} from '@payload-types';
import Slider, { Slide } from '@website/src/components/common/slider';
import Image from 'next/image';

export default function ImageSliderBlockComponent(props: ImageSliderBlock) {
  const { images } = props;

  return (
    <Slider>
      {images?.map((image) => {
        const imageMedia = image.image as Media;

        return (
          <Slide key={image.id}>
            <div className='relative w-full-h-full'>
              <Image
                src={imageMedia.url ?? ''}
                alt={imageMedia.alt ?? 'No alt text provided'}
                width={imageMedia.width ?? 0}
                height={imageMedia.height ?? 0}
                className='object-cover'
              />
            </div>
          </Slide>
        );
      })}
    </Slider>
  );
}
