'use client';

import Memoji from '@website/public/images/memoji.png';
import Spinner from '@website/src/components/common/spinner';
import { cn } from '@website/src/utilities/cn';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

enum DynamicIslandActivity {
  idle = 0,
  callActive = 1,
  timerActive = 2,
  loading = 3,
}

enum DynamicIslandState {
  inactive = 0,
  active = 1,
}

export default function DynamicIsland() {
  const [activity, setActivity] = useState(DynamicIslandActivity.idle);
  const [state, setState] = useState(DynamicIslandState.inactive);
  const [updateCycle, setUpdateCycle] = useState(0);
  const classesPerActivity = {
    [DynamicIslandActivity.idle]: '',
    [DynamicIslandActivity.callActive]: '',
    [DynamicIslandActivity.timerActive]: '',
  };
  const variantsPerActivity = {
    [DynamicIslandActivity.idle]: {
      width: '300px',
      height: '64px',
      borderRadius: '30px',
      marginTop: '0',
    },
    [DynamicIslandActivity.callActive]: {
      width: '350px',
      height: '80px',
      borderRadius: '60px',
      marginTop: '0',
    },
    [DynamicIslandActivity.timerActive]: {
      width: '300px',
      height: '64px',
      borderRadius: '30px',
      marginTop: '0',
    },
    [DynamicIslandActivity.loading]: {
      width: '300px',
      height: '64px',
      borderRadius: '30px',
      marginTop: '0',
    },
  };
  const variantsPerState = {
    [DynamicIslandState.inactive]: {
      width: '200px',
      height: '40px',
      borderRadius: '30px',
      marginTop: '0',
    },
    [DynamicIslandState.active]: {
      height: '64px',
      borderRadius: '30px',
      marginTop: '0',
    },
  };
  const itemVariants = {
    visible: {
      opacity: 1,
      scale: 1,
    },
    hidden: {
      opacity: 0,
      scale: 0.75,
    },
  };

  function update() {
    switch (updateCycle) {
      case 0:
        setUpdateCycle(1);
        setState(DynamicIslandState.active);
        setActivity(DynamicIslandActivity.timerActive);
        break;
      case 1:
        setUpdateCycle(2);
        setState(DynamicIslandState.active);
        setActivity(DynamicIslandActivity.callActive);
        break;
      case 2:
        setUpdateCycle(3);
        setState(DynamicIslandState.active);
        setActivity(DynamicIslandActivity.loading);
        break;
      case 3:
        setUpdateCycle(0);
        setState(DynamicIslandState.inactive);
        break;
    }
  }

  useEffect(() => {
    const updateInterval = setInterval(() => {
      update();
    }, 2000);

    return () => clearInterval(updateInterval);
  }, [updateCycle]);

  return (
    <motion.div
      className={cn(
        'flex items-center justify-between bg-black p-4 text-white',
        state === DynamicIslandState.active &&
          classesPerActivity[activity as never],
      )}
      variants={
        state === DynamicIslandState.active
          ? variantsPerActivity
          : variantsPerState
      }
      initial='idle'
      animate={
        state === DynamicIslandState.active
          ? activity.toString()
          : state.toString()
      }
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
        duration: 0.05,
      }}
    >
      <div>
        {state === DynamicIslandState.active && (
          <>
            {activity === DynamicIslandActivity.callActive && (
              <div className='flex items-center gap-2'>
                <div className='relative hidden aspect-square h-14 w-14 overflow-hidden rounded-full bg-white sm:block'>
                  <Image src={Memoji} alt='Memoji' className='p-1' />
                </div>
                <div className='flex-col items-center justify-center'>
                  <p className='text-xs text-zinc-500'>iPhone</p>
                  <p>Tim Ritter</p>
                </div>
              </div>
            )}
            {activity === DynamicIslandActivity.loading && <p>Loading...</p>}
            {activity === DynamicIslandActivity.timerActive && (
              <div className='relative -ml-2 aspect-square h-14 w-14 overflow-hidden rounded-full'>
                <svg
                  viewBox='0 0 315 315'
                  className='p-2'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'
                >
                  <circle
                    cx='157.5'
                    cy='157.5'
                    r='140'
                    stroke='#563F1F'
                    strokeWidth='35'
                  />
                  <rect
                    x='223.497'
                    y='66'
                    width='35'
                    height='70'
                    rx='17.5'
                    transform='rotate(45 223.497 66)'
                    fill='#F4B450'
                  />
                </svg>
              </div>
            )}
          </>
        )}
      </div>

      <div>
        <AnimatePresence>
          {state === DynamicIslandState.active && (
            <>
              {activity === DynamicIslandActivity.loading && (
                <motion.div
                  variants={itemVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    duration: 0.2,
                  }}
                  className='flex h-8 w-8 items-center justify-center'
                >
                  <Spinner
                    spinnerProps={{
                      className: 'w-full h-full fill-zinc-100 text-zinc-700',
                    }}
                  />
                </motion.div>
              )}
              {activity === DynamicIslandActivity.callActive && (
                <div className='flex gap-2'>
                  <motion.div
                    variants={itemVariants}
                    initial='hidden'
                    animate='visible'
                    exit='hidden'
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                      duration: 0.2,
                    }}
                    className='flex h-14 w-14 items-center justify-center'
                  >
                    <div className='flex h-full w-full items-center justify-center rounded-full bg-green-500 p-2 transition-colors hover:bg-green-600'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='30'
                        height='30'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='fill-current p-1 text-white'
                        aria-hidden='true'
                      >
                        <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
                      </svg>
                    </div>
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    initial='hidden'
                    animate='visible'
                    exit='hidden'
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                      duration: 0.2,
                    }}
                    className='flex h-14 w-14 items-center justify-center'
                  >
                    <div className='flex h-full w-full items-center justify-center rounded-full bg-red-500 p-2 transition-colors hover:bg-red-600'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='30'
                        height='30'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='fill-current p-1 text-white'
                        aria-hidden='true'
                      >
                        <path d='M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91' />
                        <line x1='22' x2='2' y1='2' y2='22' />
                      </svg>
                    </div>
                  </motion.div>
                </div>
              )}
              {activity === DynamicIslandActivity.timerActive && (
                <p className='pt-1 text-4xl font-light text-[#FDA00A]'>10:00</p>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
