import type React from 'react';
import { useRef, useState } from 'react';

interface DraggableProps {
  className?: string;
  children: React.ReactNode;
}

const Draggable: React.FC<DraggableProps> = ({
  className: rootClass = '',
  children,
}) => {
  const ourRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const mouseCoords = useRef({
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });

  const isOnTouchDevice = () => {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore
      navigator.msMaxTouchPoints > 0
    );
  };

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isOnTouchDevice()) return;

    if (!ourRef.current) return;

    e.preventDefault();

    const slider = ourRef.current;
    const startX = e.pageX - slider.offsetLeft;
    const startY = e.pageY - slider.offsetTop;
    const scrollLeft = slider.scrollLeft;
    const scrollTop = slider.scrollTop;

    mouseCoords.current = { startX, startY, scrollLeft, scrollTop };
    setIsMouseDown(true);
    document.body.style.cursor = 'grabbing';
  };

  const handleDragEnd = () => {
    setIsMouseDown(false);
    if (!ourRef.current) return;
    document.body.style.cursor = 'default';
  };

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown || !ourRef.current) return;
    e.preventDefault();

    const slider = ourRef.current;
    const x = e.pageX - slider.offsetLeft;
    const walkX = (x - mouseCoords.current.startX) * 1.5;
    const newScrollLeft = mouseCoords.current.scrollLeft - walkX;

    slider.scrollLeft = newScrollLeft;
  };

  return (
    <div
      ref={ourRef}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseMove={handleDrag}
      onMouseLeave={handleDragEnd}
      className={`${rootClass}`}
    >
      {children}
    </div>
  );
};

export default Draggable;
