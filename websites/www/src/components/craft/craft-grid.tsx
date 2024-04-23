'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import { useEffect, useState } from 'react';

import CraftGridItem, {
  type Craft,
} from '@website/src/components/craft/craft-grid-item';
import MasonryGrid from '@website/src/components/layout/masonry';
import Image from '@website/src/components/media/image';
import MediaDetail from '@website/src/components/media/media-detail';
import slugify from '@website/src/utilities/slugify';

export interface CraftGridProps {
  craft: Craft[];
}

export default function CraftGrid(props: CraftGridProps) {
  const { craft } = props;
  const [detailIsOpen, setDetailIsOpen] = useState(false);
  const [currentDetail, setCurrentDetail] = useState<Craft>();
  const [similar, setSimilar] = useState<Craft[]>(craft);
  const [columns, setColumns] = useState(3);
  const craftPath = '/craft';

  function findCurrentDetailBySlug(slug: string) {
    return craft.find((item) => slugify(item.title) === slug);
  }

  function removeScrollingOnBody() {
    document.body.style.overflow = 'hidden';
  }

  function addScrollingOnBody() {
    document.body.style.overflow = 'auto';
  }

  // Find 0-5 items that have atleast one tag in common with the current detail
  function getSimilarToCurrentDetail() {
    const currentDetailTags = currentDetail?.tags;
    const similar: Craft[] = [];

    // Add 3 related items that have atleast one tag in common with the current detail
    if (currentDetailTags) {
      for (let i = 0; i < craft.length; i++) {
        const item = craft[i];
        const itemTags = item?.tags;

        if (itemTags) {
          for (let j = 0; j < itemTags.length; j++) {
            const tag = itemTags[j];

            if (!tag) return;

            if (currentDetailTags.includes(tag) && item !== currentDetail) {
              similar.push(item);
              break;
            }
          }
        }

        if (similar.length >= 3) {
          break;
        }
      }
    }

    // If there are less than 5 similar items, add random items until there are 5
    if (similar.length < 5) {
      const randomItems = craft
        .filter((item) => !similar.includes(item))
        .filter((item) => item !== currentDetail)
        .sort(() => 0.5 - Math.random())
        .slice(0, 5 - similar.length);

      similar.push(...randomItems);
    }

    // Mix the order of the similar items
    similar.sort(() => 0.5 - Math.random());

    return similar;
  }

  // On load, check if the url id is the same as the current slug and open the detail
  useEffect(() => {
    const initialDetail = findCurrentDetailBySlug(
      window.location.hash.replace('#', ''),
    );

    if (!detailIsOpen && !currentDetail && initialDetail) {
      setTimeout(() => {
        setDetailIsOpen(true);
        setCurrentDetail(initialDetail);
        removeScrollingOnBody();
      }, 300);
    }
  }, []);

  function onOpen(item: Craft) {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}${craftPath}#${slugify(item.title)}`;

    window.history.pushState({}, '', url);
    setDetailIsOpen(true);
    setCurrentDetail(item);
    removeScrollingOnBody();
  }

  function onClose() {
    const baseUrl = window.location.origin;

    window.history.pushState({}, '', `${baseUrl}${craftPath}`);
    setDetailIsOpen(false);
    setCurrentDetail(undefined);
    addScrollingOnBody();
  }

  return (
    <>
      {currentDetail && (
        <MediaDetail
          onClose={onClose}
          open={detailIsOpen}
          similar={getSimilarToCurrentDetail()}
          onSimilarClick={(item) => onOpen(item as Craft)}
          {...currentDetail}
        />
      )}
      <div className='mx-auto mb-4 flex w-full items-center justify-between md:px-2'>
        <input
          type='text'
          placeholder='Find by name, tag, or date...'
          className='w-full placeholder-gray2 text-sm bg-gray6 px-3 py-2 text-gray1 md:max-w-72 h-10'
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            const filtered = craft.filter((item) => {
              const title = item.title.toLowerCase();
              const tags = item.tags?.join(' ').toLowerCase();
              const description = item.description?.toLowerCase();
              const date = item.date?.toLowerCase();

              return (
                title.includes(value) ||
                tags?.includes(value) ||
                description?.includes(value) ||
                date?.includes(value)
              );
            });

            setSimilar(filtered);
          }}
        />
        <div className='hidden h-full items-center justify-center xl:flex gap-4 relative'>
          <div className='bg-gray6 w-full flex justify-center items-center h-10 px-4'>
            <input
              type='range'
              min='2'
              max='5'
              value={columns}
              className='range-slider cursor-pointer'
              onChange={(e) => setColumns(Number.parseInt(e.target.value))}
            />
          </div>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                className='h-10 w-10 aspect-square flex justify-center items-center text-sm text-gray1 transition-colors hover:bg-gray5 bg-gray6 dark:border-black group'
                onClick={() => setColumns(3)}
                type='button'
              >
                <svg
                  className='w-5 h-5 transition-transform duration-300 group-hover:scale-110'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM8.29289 8.2928C8.68342 7.90228 9.31658 7.90228 9.70711 8.2928L12 10.5857L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289C16.0976 8.68341 16.0976 9.31658 15.7071 9.7071L13.4143 12L15.7071 14.2928C16.0976 14.6833 16.0976 15.3165 15.7071 15.707C15.3166 16.0975 14.6834 16.0975 14.2929 15.707L12 13.4142L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L10.5858 12L8.29289 9.70701C7.90237 9.31649 7.90237 8.68332 8.29289 8.2928Z'
                    fill='currentColor'
                  />
                </svg>
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content className='tooltip-content' sideOffset={10}>
              Reset Columns
            </Tooltip.Content>
          </Tooltip.Root>
        </div>
      </div>
      <MasonryGrid cols={columns}>
        {similar.map((item, index) => (
          <CraftGridItem
            key={index}
            {...item}
            onClick={() => onOpen(item)}
            itemsVertical={columns > 4}
          >
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                width={columns > 4 ? 300 : 400}
                quality={90}
                loading={index < 3 ? 'eager' : 'lazy'}
                placeholder={item.showPlaceholderImage ? 'blur' : 'empty'}
                className='w-full bg-gray5 text-gray1'
              />
            ) : (
              <video
                className='w-full bg-gray5'
                autoPlay
                loop
                muted
                playsInline
                src={item.video}
              />
            )}
          </CraftGridItem>
        ))}
      </MasonryGrid>
    </>
  );
}
