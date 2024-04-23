'use client';

import { cn } from '@website/src/utilities/cn';
import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

export default function FloatingTooltipListener() {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const [mouseCoordinates, setMouseCoordinates] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    let tooltipsOnScreen: Element[] = [];

    function reindexTooltipsOnScreen() {
      const allTooltips = Array.from(
        document.querySelectorAll('[data-tooltip]'),
      );
      const tooltips = allTooltips.filter((tooltip) => {
        const tooltipRect = tooltip.getBoundingClientRect();
        const tooltipRectWidth = tooltipRect.right - tooltipRect.left;
        const tooltipRectHeight = tooltipRect.bottom - tooltipRect.top;

        return (
          tooltipRect.top + tooltipRectHeight >= 0 &&
          tooltipRect.left + tooltipRectWidth >= 0 &&
          tooltipRect.bottom - tooltipRectHeight <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          tooltipRect.right - tooltipRectWidth <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
      });

      tooltipsOnScreen = tooltips;
    }

    const handleMouseMove = (event: MouseEvent) => {
      // Loop through all the tooltips and check if the mouse is hovering over one of them.
      let tooltip: string | null = null;

      for (let i = 0; i < tooltipsOnScreen.length; i++) {
        const elementOnMouse = document.elementFromPoint(
          event.clientX,
          event.clientY,
        );

        // if element on mouse is part of the header or footer, don't show the tooltip
        if (
          elementOnMouse?.closest('header') ||
          elementOnMouse?.closest('footer')
        ) {
          setVisible(false);
          return;
        }

        const tooltipElement = tooltipsOnScreen[i];

        if (!tooltipElement) return;

        const tooltipElementRect = tooltipElement.getBoundingClientRect();
        const isMouseOverTooltip =
          event.clientX >= tooltipElementRect.left &&
          event.clientX <= tooltipElementRect.right &&
          event.clientY >= tooltipElementRect.top &&
          event.clientY <= tooltipElementRect.bottom;
        const dataTooltip = tooltipElement.getAttribute('data-tooltip');

        if (isMouseOverTooltip && dataTooltip) {
          tooltip = dataTooltip;
          break;
        }
      }

      const content = document.getElementById('content');
      // Prevent the tooltip from showing up when hovering the header or footer.
      // It's to prevent the tooltip from showing up when hovering the header or footer while a tooltip element is below the header or above the footer.
      const isChildOfContent = content?.contains(event.target as Node);

      if (
        tooltip &&
        isChildOfContent &&
        document.body.style.overflow !== 'hidden'
      ) {
        flushSync(() => {
          setText(tooltip ?? '');
          setMouseCoordinates({ x: event.clientX, y: event.clientY });
          setVisible(true);
        });
      } else {
        setVisible(false);
      }
    };

    const handleScroll = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    setInterval(reindexTooltipsOnScreen, 1);
    reindexTooltipsOnScreen();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        transform: `translate(${mouseCoordinates.x + 20}px, ${
          mouseCoordinates.y + 20
        }px)`,
        display: visible ? 'inline' : 'none',
      }}
      className={cn(
        'pointer-events-none fixed left-0 top-0 z-50 bg-gray1 px-3 py-1 text-gray6 opacity-0 md:opacity-100',
      )}
    >
      {text}
    </div>
  );
}
