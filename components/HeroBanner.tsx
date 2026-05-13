"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { type Game, formatPrice } from "@/lib/utils";

interface HeroBannerProps {
  games: Game[];
}

export default function HeroBanner({ games }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning]
  );

  const goNext = useCallback(() => {
    goTo((currentIndex + 1) % games.length);
  }, [currentIndex, games.length, goTo]);

  const goPrev = useCallback(() => {
    goTo((currentIndex - 1 + games.length) % games.length);
  }, [currentIndex, games.length, goTo]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    },
    [goPrev, goNext]
  );

  // Swipe handlers
  const onTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setTouchEnd(null);
    if ('touches' in e) {
      setTouchStart(e.targetTouches[0].clientX);
    } else {
      setTouchStart((e as React.MouseEvent).clientX);
    }
  };

  const onTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!touchStart) return;
    if ('touches' in e) {
      setTouchEnd(e.targetTouches[0].clientX);
    } else {
      setTouchEnd((e as React.MouseEvent).clientX);
    }
  };

  const onTouchEnd = () => {
    if (!touchStart) return;

    if (touchEnd !== null) {
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;
      
      if (isLeftSwipe) {
        goNext();
      } else if (isRightSwipe) {
        goPrev();
      }
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    const timer = setInterval(goNext, 3500);
    return () => clearInterval(timer);
  }, [goNext]);

  if (games.length === 0) return null;

  const dragOffset = touchStart !== null && touchEnd !== null ? touchEnd - touchStart : 0;
  const trackStyle = {
    transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
    transitionDuration: touchStart !== null ? "0ms" : "500ms",
  };

  return (
    <section
      className="relative w-full overflow-hidden touch-pan-y select-none cursor-grab active:cursor-grabbing"
      aria-label="Featured games carousel"
      aria-roledescription="carousel"
      role="region"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onTouchStart}
      onMouseMove={onTouchMove}
      onMouseUp={onTouchEnd}
      onMouseLeave={onTouchEnd}
    >
      {/* Live region for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentIndex + 1} of {games.length}: {games[currentIndex]?.title}
      </div>

      {/* Background Track */}
      <div 
        className="absolute inset-0 flex transition-transform ease-out will-change-transform" 
        aria-hidden="true"
        style={trackStyle}
      >
        {games.map((g, index) => (
          <div key={`bg-${index}`} className="w-full relative h-full shrink-0">
            <Image
              src={g.screenshots[0]}
              alt=""
              fill
              loading={index === 0 ? "eager" : "lazy"}
              draggable={false}
              className="object-cover pointer-events-none"
              sizes="(max-width: 768px) 100vw, 100vw"
            />
          </div>
        ))}
      </div>
      
      {/* Static Overlays */}
      <div className="absolute inset-0 bg-linear-to-r from-(--gradient-base) via-(--gradient-base-80) to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-t from-(--gradient-base) via-transparent to-(--gradient-base-30) pointer-events-none" />

      {/* Content Container */}
      <div className="relative py-12 sm:py-20 md:py-32 flex flex-col justify-end min-h-[320px] sm:min-h-[420px] md:min-h-[520px]">
        
        {/* Content Track */}
        <div 
          className="flex transition-transform ease-out will-change-transform w-full"
          style={trackStyle}
        >
          {games.map((g, index) => (
            <div key={`content-${index}`} className="w-full shrink-0">
              <div className="container mx-auto px-4 sm:px-6">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-sky-500/20 text-sky-400 rounded-full border border-sky-500/30">
                      Featured
                    </span>
                    {g.genres.slice(0, 2).map((genre) => (
                      <span
                        key={genre}
                        className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-(--overlay-medium) text-(--text-secondary) rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mb-2 sm:mb-4 leading-tight">
                    {g.title}
                  </h2>

                  <p className="text-(--text-secondary) text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-5 line-clamp-2">
                    {g.description}
                  </p>

                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                      <span className="text-xs sm:text-sm font-bold" aria-label={`Rating ${g.rating} dari 10`}>
                        {g.rating}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-(--text-muted)" aria-hidden="true">|</span>
                    <span className="text-xs sm:text-sm font-semibold text-sky-400">
                      {formatPrice(g.price)}
                    </span>
                  </div>

                  <Link
                    href={`/games/${g.slug}`}
                    className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm bg-linear-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl hover:from-sky-400 hover:to-blue-500 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                    aria-label={`View details for ${g.title}`}
                  >
                    View Details
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="container mx-auto px-4 sm:px-6 mt-6 sm:mt-8">
          <div className="flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center gap-1.5 sm:gap-2" role="tablist" aria-label="Slides">
              {games.map((g, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Go to slide ${index + 1}: ${g.title}`}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-6 sm:w-8 bg-sky-400"
                      : "w-3 sm:w-4 bg-(--overlay-heavy) hover:bg-(--overlay-medium)"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={goPrev}
                className="p-1.5 sm:p-2 rounded-lg bg-(--overlay-medium) hover:bg-(--overlay-heavy) transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              </button>
              <button
                onClick={goNext}
                className="p-1.5 sm:p-2 rounded-lg bg-(--overlay-medium) hover:bg-(--overlay-heavy) transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
