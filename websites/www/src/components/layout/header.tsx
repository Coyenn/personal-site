'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import ProfilePictureImage from '@website/public/images/profile-picture.png';
import { motion } from 'framer-motion';
import { Squeeze as Hamburger } from 'hamburger-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Container from '@website/src/components/layout/container';
import PageSection from '@website/src/components/layout/page-section';
import { cn } from '@website/src/utilities/cn';

interface HeaderItemProps {
  href: string;
  title: string;
}

function HeaderDesktop() {
  const [borderOffset, setBorderOffset] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentPath = usePathname();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) {
        setBorderOffset(true);
      } else if (window.scrollY < 30) {
        setBorderOffset(false);
      }
    };
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });

    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  function isActivePath(path: string | null): boolean {
    if (!path || !currentPath) return false;
    if (path === '/') return currentPath === path;

    return currentPath.startsWith(path);
  }

  function HeaderItem(props: HeaderItemProps) {
    const { href, title } = props;
    const isActive = isActivePath(href);

    return (
      <li className={'flex justify-center px-0 text-sm sm:px-6 lg:px-9'}>
        <Link
          href={href}
          className={cn(
            'link-effect flex items-center justify-center gap-1 transition-all duration-300',
            isActive && borderOffset === false
              ? 'text-gray1'
              : 'text-gray3 hover:text-gray1',
            borderOffset === true && isActive ? 'group-hover:text-gray1' : '',
          )}
          aria-current={isActive ? 'page' : undefined}
        >
          {title}
        </Link>
      </li>
    );
  }

  function ProfilePicture() {
    return (
      <Tooltip.Root>
        <Link
          href='/'
          className={cn(
            'mr-auto block transition-opacity duration-300 group-hover:opacity-100',
            borderOffset === true ? 'opacity-50' : '',
          )}
        >
          <Tooltip.Trigger asChild>
            <Image
              src={ProfilePictureImage}
              alt='The profile picture of Tim Ritter, me!'
              height={40}
              width={40}
              className='aspect-square overflow-hidden rounded-full'
            />
          </Tooltip.Trigger>
        </Link>
        <Tooltip.Content
          className='tooltip-content'
          side='bottom'
          sideOffset={10}
        >
          That&apos;s me!
        </Tooltip.Content>
      </Tooltip.Root>
    );
  }

  return (
    <>
      <header
        className={cn(
          'group fixed top-0 z-50 w-full bg-background transition-[border,color,opacity,padding] duration-300',
          isLoaded === true ? 'opacity-100' : 'opacity-0',
          borderOffset === true ? 'py-4' : 'py-7 md:py-8 lg:py-8',
        )}
      >
        <nav className='mx-auto h-full'>
          <PageSection className='!py-0'>
            <Container>
              <ul
                className={cn(
                  'flex w-full items-center justify-center bg-transparent pb-0 text-gray1 opacity-100 transition-[height,opacity,color] duration-300 lg:justify-end',
                )}
              >
                <ProfilePicture />
                <HeaderItem href='/' title='Home' />
                <HeaderItem href='/writing' title='Writing' />
                <HeaderItem href='/inspiration' title='Inspiration' />
                <HeaderItem href='/craft' title='Craft' />
              </ul>
            </Container>
          </PageSection>
        </nav>
      </header>
      <div className='h-[110px] w-full' />
    </>
  );
}

function HeaderMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPath = usePathname();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)');
    const handleMediaQueryChange = (
      mq: MediaQueryListEvent | MediaQueryList,
    ) => {
      setIsMenuOpen(!mq.matches);
    };

    handleMediaQueryChange(mediaQuery);
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  const containerVariants = {
    open: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      opacity: 0,
      y: 50,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  function HeaderItem(props: HeaderItemProps) {
    const { href, title } = props;

    return (
      <motion.li
        className={'flex justify-center text-xl'}
        variants={itemVariants}
      >
        <Link
          href={href}
          className={'link-effect flex items-center justify-center'}
          aria-current={currentPath === href ? 'page' : undefined}
          onClick={() => setIsMenuOpen(false)}
        >
          {title}
        </Link>
      </motion.li>
    );
  }

  return (
    <header
      className={cn(
        'group sticky top-0 z-50 w-full bg-background',
        isLoaded === true ? 'transition-colors duration-300' : '',
      )}
    >
      <nav className='h-full'>
        <ul className='h-full px-3 py-2'>
          <div className='relative z-10 flex h-min items-center sm:hidden'>
            <Hamburger
              toggled={isMenuOpen}
              toggle={setIsMenuOpen}
              rounded={false}
              size={24}
            />
          </div>
          <PageSection className='!py-0'>
            <Container
              className={cn(
                'absolute inset-0 top-0 z-0 h-0 w-full flex flex-col items-center justify-center overflow-hidden bg-background text-gray1 transition-[height] duration-300',
                isMenuOpen && 'h-screen',
              )}
            >
              <motion.ul
                className='flex h-full w-full flex-col items-center justify-center gap-3'
                variants={containerVariants}
                initial='closed'
                animate={isMenuOpen ? 'open' : 'closed'}
              >
                <HeaderItem href='/' title='Home' />
                <HeaderItem href='/writing' title='Writing' />
                <HeaderItem href='/inspiration' title='Inspiration' />
                <HeaderItem href='/craft' title='Craft' />
              </motion.ul>
            </Container>
          </PageSection>
        </ul>
      </nav>
    </header>
  );
}

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)');
    const handleMediaQueryChange = (
      mq: MediaQueryListEvent | MediaQueryList,
    ) => {
      setIsMobile(mq.matches);
    };

    handleMediaQueryChange(mediaQuery);
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  if (isMobile) {
    return <HeaderMobile />;
  }

  return <HeaderDesktop />;
}
