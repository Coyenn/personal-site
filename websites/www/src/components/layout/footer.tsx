'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import Clock from '@website/src/components/common/clock';
import Container from '@website/src/components/layout/container';
import PageSection from '@website/src/components/layout/page-section';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [currentMotivatingPhrase, setCurrentMotivatingPhrase] = useState('');

  useEffect(() => {
    const motivatingPhrases = [
      'Just drink more coffee.',
      'Keep calm and drink coffee.',
      'Keep calm.',
      'Just keep calm.',
      'Consistency is key.',
    ];

    setCurrentMotivatingPhrase(
      motivatingPhrases[Math.floor(Math.random() * motivatingPhrases.length)] ??
        '',
    );
  }, []);

  const links = [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Writing',
      href: '/writing',
    },
    {
      title: 'Craft',
      href: '/craft',
    },
    {
      title: 'Inspiration',
      href: '/inspiration',
    },
    {
      title: 'E-Mail',
      href: 'mailto:t-ritter-mail@web.de',
    },
    {
      title: 'GitHub',
      href: 'https://github.com/coyenn',
      target: '_blank',
    },
    {
      title: 'Twitter',
      href: 'https://twitter.com/Kojenia',
      target: '_blank',
    },
    {
      title: 'CV',
      href: 'https://read.cv/timritter',
      target: '_blank',
    },
  ];

  return (
    <footer className='border-t border-gray5 dark:border-gray6 text-gray1'>
      <PageSection className='mx-auto text-sm text-gray2'>
        <Container>
          <div className='grid grid-cols-1 sm:grid-cols-2'>
            <div className='hidden flex-col justify-between sm:flex'>
              <Clock />
              <p>{currentYear}</p>
            </div>
            <div className='grid grid-cols-2 gap-3 sm:ml-8 sm:gap-4 md:ml-12'>
              {links.map((link) => (
                <p key={link.title}>
                  <Link
                    className='link-effect'
                    href={link.href}
                    target={link.target}
                    key={link.title}
                  >
                    {link.title}
                  </Link>
                </p>
              ))}
              <div className='col-span-2 mt-6 flex justify-between sm:mt-8 md:mt-12'>
                <p className='sm:hidden'>{currentYear}</p>
                <div className='flex items-center justify-center gap-2'>
                  <p className='mt-1 font-serif italic'>
                    {currentMotivatingPhrase}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </PageSection>
    </footer>
  );
}
