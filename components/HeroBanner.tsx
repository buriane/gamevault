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

  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [goNext]);

  if (games.length === 0) return null;

  const game = games[currentIndex];

  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="Featured games carousel"
      aria-roledescription="carousel"
      role="region"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Live region for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentIndex + 1} of {games.length}: {game.title}
      </div>

      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={game.screenshots[0]}
          alt=""
          fill
          priority
          className="object-cover transition-opacity duration-500"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-(--gradient-base) via-(--gradient-base-80) to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-(--gradient-base) via-transparent to-(--gradient-base-30)" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 py-20 md:py-32 flex flex-col justify-end min-h-[420px] md:min-h-[520px]">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-sky-500/20 text-sky-400 rounded-full border border-sky-500/30">
              Featured
            </span>
            {game.genres.slice(0, 3).map((genre) => (
              <span
                key={genre}
                className="px-2.5 py-1 text-xs font-medium bg-(--overlay-medium) text-(--text-secondary) rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            {game.title}
          </h2>

          <p className="text-(--text-secondary) text-sm md:text-base leading-relaxed mb-5 line-clamp-2">
            {game.description}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
              <span className="text-sm font-bold" aria-label={`Rating ${game.rating} dari 10`}>
                {game.rating}
              </span>
            </div>
            <span className="text-sm text-(--text-muted)" aria-hidden="true">|</span>
            <span className="text-sm font-semibold text-sky-400">
              {formatPrice(game.price)}
            </span>
          </div>

          <Link
            href={`/games/${game.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl hover:from-sky-400 hover:to-blue-500 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            aria-label={`View details for ${game.title}`}
          >
            View Details
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {/* Dots */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
            {games.map((g, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Go to slide ${index + 1}: ${g.title}`}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-sky-400"
                    : "w-4 bg-(--overlay-heavy) hover:bg-(--overlay-medium)"
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              className="p-2 rounded-lg bg-(--overlay-medium) hover:bg-(--overlay-heavy) transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={goNext}
              className="p-2 rounded-lg bg-(--overlay-medium) hover:bg-(--overlay-heavy) transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
