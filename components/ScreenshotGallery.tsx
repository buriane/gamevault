"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ScreenshotGalleryProps {
  screenshots: string[];
  title: string;
}

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  draggable?: boolean;
}

function ImageWithSkeleton({ src, alt, fill, className, sizes, draggable }: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <div className="absolute inset-0 bg-white/30 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        draggable={draggable}
        className={`${className || ""} transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        sizes={sizes}
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
}

export default function ScreenshotGallery({
  screenshots,
  title,
}: ScreenshotGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => {
    setLightboxIndex(null);
    setTouchStart(null);
    setTouchEnd(null);
  };

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setLightboxIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning]
  );

  const goNext = useCallback(() => {
    if (lightboxIndex !== null) {
      goTo((lightboxIndex + 1) % screenshots.length);
    }
  }, [lightboxIndex, screenshots.length, goTo]);

  const goPrev = useCallback(() => {
    if (lightboxIndex !== null) {
      goTo((lightboxIndex - 1 + screenshots.length) % screenshots.length);
    }
  }, [lightboxIndex, screenshots.length, goTo]);

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

  // Keyboard navigation for lightbox
  const handleLightboxKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    },
    [goNext, goPrev]
  );

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3" role="list" aria-label={`Screenshots of ${title}`}>
        {screenshots.map((src, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            role="listitem"
            aria-label={`Open screenshot ${index + 1} of ${screenshots.length}`}
            className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer border border-(--border-subtle) hover:border-sky-500/30 transition-all"
          >
            <ImageWithSkeleton
              src={src}
              alt={`${title} screenshot ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Klik untuk memperbesar gambar
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-100 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Screenshot ${lightboxIndex + 1} of ${screenshots.length} — ${title}`}
          onKeyDown={handleLightboxKeyDown}
          tabIndex={0}
          ref={(el) => el?.focus()}
        >
          <div
            className="relative w-full max-w-5xl aspect-video overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing rounded-xl"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onTouchStart}
            onMouseMove={onTouchMove}
            onMouseUp={onTouchEnd}
            onMouseLeave={onTouchEnd}
          >
            <div 
              className="flex h-full w-full transition-transform ease-out will-change-transform"
              style={{
                transform: `translateX(calc(-${(lightboxIndex || 0) * 100}% + ${
                  touchStart !== null && touchEnd !== null ? touchEnd - touchStart : 0
                }px))`,
                transitionDuration: touchStart !== null ? "0ms" : "500ms",
              }}
            >
              {screenshots.map((src, i) => (
                <div key={i} className="w-full h-full shrink-0 relative pointer-events-none">
                  <ImageWithSkeleton
                    src={src}
                    alt={`${title} screenshot ${i + 1}`}
                    fill
                    draggable={false}
                    className="object-contain pointer-events-none"
                    sizes="90vw"
                  />
                </div>
              ))}
            </div>
          </div>

          <div
            className="flex flex-col items-center gap-6 mt-6 sm:mt-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pagination & Arrows */}
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={goPrev}
                className="p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all active:scale-95 shadow-lg"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-2 sm:gap-2.5" role="tablist" aria-label="Screenshots">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goTo(index)}
                    role="tab"
                    aria-selected={index === lightboxIndex}
                    aria-label={`Go to screenshot ${index + 1}`}
                    className={`h-2 sm:h-2.5 rounded-full transition-all ${
                      index === lightboxIndex
                        ? "bg-sky-400 w-6 sm:w-8"
                        : "bg-white/30 hover:bg-white/50 w-2 sm:w-2.5"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={goNext}
                className="p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all active:scale-95 shadow-lg"
                aria-label="Next screenshot"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="p-3 sm:p-3.5 rounded-full bg-white/5 hover:bg-white/20 text-white/70 hover:text-white transition-all active:scale-95"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
