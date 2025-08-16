// components/common/ImageCarousel.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function ImageCarousel({
  images = [],
  className = '',
  autoPlay = true,
  intervalMs = 3500,
  showIndicators = true,
  showArrows = true,
  rounded = 'rounded-lg',
  height = 'h-[30vh]', // <- NEW: control height (Tailwind class)
}) {
  const slides = useMemo(
    () =>
      images
        .filter(Boolean)
        .map((img) => (typeof img === 'string' ? { src: img, alt: '' } : img)),
    [images]
  );

  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const len = slides.length;

  useEffect(() => {
    if (!autoPlay || len <= 1) return;
    timerRef.current = setInterval(
      () => setIndex((i) => (i + 1) % len),
      intervalMs
    );
    return () => clearInterval(timerRef.current);
  }, [autoPlay, intervalMs, len]);

  if (len === 0) {
    return (
      <div
        className={`relative w-full ${height} bg-gray-100 ${rounded} flex items-center justify-center ${className}`}
      >
        <span className="text-gray-400 text-sm">No images</span>
      </div>
    );
  }

  const goto = (i) => setIndex((i + len) % len);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Track */}
      <div className={`relative overflow-hidden ${height} ${rounded}`}>
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div key={i} className="min-w-full h-full relative">
              <img
                src={s.src}
                alt={s.alt || `Slide ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/countries/_default.jpg';
                }}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      {showIndicators && len > 1 && (
        <div className="absolute z-10 flex -translate-x-1/2 bottom-3 left-1/2 space-x-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goto(i)}
              className={`w-3 h-3 rounded-full border border-white/70 ${i === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Arrows */}
      {showArrows && len > 1 && (
        <>
          <button
            type="button"
            onClick={() => goto(index - 1)}
            className="absolute top-1/2 left-2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/40 hover:bg-white/70 focus:outline-none"
            aria-label="Previous slide"
          >
            <svg
              className="w-5 h-5 text-gray-800"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goto(index + 1)}
            className="absolute top-1/2 right-2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/40 hover:bg-white/70 focus:outline-none"
            aria-label="Next slide"
          >
            <svg
              className="w-5 h-5 text-gray-800"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
