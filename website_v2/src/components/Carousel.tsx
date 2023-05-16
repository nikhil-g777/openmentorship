import { useEffect, useState } from "react";

// Types
type Props = {
  heading?: string;
  children: React.ReactNode;
  childrenLength: number;
};

const Carousel = ({ heading, children, childrenLength }: Props) => {
  const [current, setCurrent] = useState<number>(0);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);

  // Handle Next
  const next = () =>
    setCurrent((current) => (current === childrenLength - 1 ? 0 : current + 1));
  // Handle Previous
  const prev = () =>
    setCurrent((current) => (current === 0 ? childrenLength - 1 : current - 1));

  // Touch Start Event Handler
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  // Touch Move Event Handler
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    // Return if no swap occurs
    const touchDown = touchPosition;
    if (touchDown === null) {
      return;
    }

    // Next or Prev based on swap direction
    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      next();
    }
    if (diff < -5) {
      prev();
    }

    // Reset Touch positon after swap
    setTouchPosition(null);
  };

  // Auto Slide
  useEffect(() => {
    const slider = setInterval(next, 3000);
    return () => clearInterval(slider);
  });

  return (
    <div className="w-full px-4 overflow-hidden relative">
      {heading ? <h2 className="text-xl font-semibold sm:text-sub_heading px-4 pt-[10%] sm:pt-[5%]">{heading}</h2> : null}
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {children}
      </div>
      {/* Next & Previous Buttons */}
      <div className="">
        <button
          onClick={prev}
          className="btn btn-ghost btn-circle btn-sm btn-active absolute left-0 top-2/4"
        >
          ❮
        </button>
        <button
          onClick={next}
          className="btn btn-ghost btn-circle btn-sm btn-active absolute right-0 top-2/4"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Carousel;
