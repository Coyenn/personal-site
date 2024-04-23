'use client';

import { type Variants, motion } from 'framer-motion';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';

import FloatingTooltip from '@website/src/components/common/floating-tooltip';
import { cn } from '@website/src/utilities/cn';

const itemVariants = {
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      type: 'spring',
    },
  },
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
} satisfies Variants;

export interface Project {
  title: string;
  href?: string;
  image: StaticImageData;
  external?: boolean;
  timeframe: string;
}

export interface ProjectGridProps {
  projects: Project[];
}

function ProjectItem(props: Project) {
  return (
    <motion.div
      variants={itemVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-200px' }}
    >
      <div className='relative overflow-hidden'>
        <Link
          href={props.href ?? ''}
          className={cn(
            'group',
            !props.href && 'pointer-events-none cursor-default',
          )}
          target={props.external ? '_blank' : '_self'}
        >
          <span className='sr-only'>Project &quot;{props.title}&quot;</span>
          <FloatingTooltip text={props.href ? props.title : 'Coming Soon'}>
            <div className='relative flex aspect-[16/14] flex-col items-center justify-center bg-gray6 transition-all duration-300 group-hover:bg-gray5'>
              <Image
                className='absolute h-full w-full object-cover transition-all duration-300 group-hover:scale-[102%] dark:opacity-90'
                src={props.image}
                alt={props.title}
                width={600}
                quality={90}
                height={600}
                loading='eager'
                placeholder='blur'
                sizes='(min-width: 768px) 50vw, 100vw'
              />
            </div>
          </FloatingTooltip>
        </Link>
      </div>
      <h3 className='mb-10 mt-2 flex justify-between sm:hidden text-gray1'>
        <span>{props.title}</span>
        <span>{props.timeframe}</span>
      </h3>
    </motion.div>
  );
}

export default function ProjectGrid(props: ProjectGridProps) {
  const { projects } = props;
  const firstItem = projects[0];
  const secondItem = projects[1];

  if (!firstItem || !secondItem) return null;

  return (
    <div className='my-10 sm:my-16 md:my-24 lg:my-36 xl:gap-18 grid grid-cols-1 gap-12 sm:grid-cols-2 md:lg:gap-16 lg:gap-24 xl:gap-36'>
      <div className='xl:gap-18 grid gap-12 sm:mb-20 md:mb-32 md:lg:gap-16 lg:gap-24 xl:gap-36'>
        <ProjectItem
          title={firstItem.title}
          href={firstItem.href}
          image={firstItem.image}
          external={firstItem.external}
          timeframe={firstItem.timeframe}
        />
      </div>
      <div className='xl:gap-18 grid gap-12 sm:mt-20 md:mt-32 md:lg:gap-16 lg:gap-24 xl:gap-36'>
        <ProjectItem
          title={secondItem.title}
          href={secondItem.href}
          image={secondItem.image}
          external={secondItem.external}
          timeframe={secondItem.timeframe}
        />
      </div>
    </div>
  );
}
