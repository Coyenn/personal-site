'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';

export interface VideoPlayerProps {
  src: string;
}

interface VideoPlayerControlProps {
  playerRef: React.RefObject<HTMLVideoElement>;
}

function VideoPlayerControls(props: VideoPlayerControlProps) {
  const { playerRef } = props;
  const [initialPlay, setInitialPlay] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const duration = playerRef?.current?.duration || 0;
  const playButtonRef = React.useRef<HTMLButtonElement>(null);
  const pauseButtonRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (playerRef?.current) {
      playerRef.current.addEventListener('play', () => {
        setIsPlaying(true);
        setInitialPlay(true);
      });
      playerRef.current.addEventListener('pause', () => setIsPlaying(false));
      playerRef.current.addEventListener('timeupdate', () =>
        setTime(playerRef.current?.currentTime || 0),
      );
    }
  }, [playerRef]);

  return (
    <div className='absolute inset-x-0 bottom-0 flex w-full items-center justify-between bg-black px-2 py-1 text-white transition-all duration-300 ease-in-out group-hover:bottom-0 lg:-bottom-28'>
      <div className='relative h-5 w-5'>
        <AnimatePresence>
          {isPlaying && (
            <motion.button
              onClick={() => {
                playerRef?.current?.pause();
                playButtonRef?.current?.focus();
              }}
              initial={{ opacity: 0, scale: 0.75 }}
              ref={pauseButtonRef}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className='absolute inset-0 h-full w-full'
            >
              <p className='sr-only'>Pause</p>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                fill='currentColor'
                viewBox='0 0 16 16'
                aria-hidden='true'
              >
                <path d='M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z' />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!isPlaying && (
            <motion.button
              onClick={() => {
                playerRef?.current?.play();
                pauseButtonRef?.current?.focus();
              }}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              ref={playButtonRef}
              className='absolute inset-0 h-full w-full'
            >
              <p className='sr-only'>Play</p>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                fill='currentColor'
                viewBox='0 0 16 16'
                aria-hidden='true'
              >
                <path d='m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z' />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <button
        className='mx-6 flex w-full items-center sm:mx-8'
        type='button'
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const width = rect.width;
          const percentage = x / width;
          const time = percentage * duration;

          if (playerRef?.current) {
            playerRef.current.currentTime = time;
          }
        }}
      >
        <div className='h-1 w-full bg-gray1'>
          <motion.div
            className='h-1 bg-gray6'
            transition={{ type: 'spring', stiffness: 250, damping: 30 }}
            animate={{
              width: initialPlay ? `${(time / duration) * 100}%` : '0px',
            }}
          />
        </div>
      </button>
      <div className='flex items-center gap-2'>
        <button
          onClick={() => playerRef?.current?.requestFullscreen()}
          className='transition-all duration-200 ease-in-out hover:scale-105 active:scale-95'
          type='button'
        >
          <p className='sr-only'>Toggle Fullscreen</p>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
          >
            <path d='M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3' />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function VideoPlayer(props: VideoPlayerProps) {
  const { src } = props;
  const playerRef = React.useRef<HTMLVideoElement>(null);

  return (
    <div className='group relative overflow-hidden'>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
      <video
        className='h-full w-full object-cover'
        ref={playerRef}
        autoPlay={false}
        controls={false}
        preload='metadata'
        onClick={() => {
          if (playerRef?.current?.paused) {
            playerRef?.current?.play();
          } else {
            playerRef?.current?.pause();
          }
        }}
        onDoubleClick={() => playerRef?.current?.requestFullscreen()}
      >
        <source src={src} type='video/mp4' />
      </video>
      <VideoPlayerControls playerRef={playerRef} />
    </div>
  );
}
