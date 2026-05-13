"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ScreenshotGalleryProps {
  screenshots: string[];
  title: string;
}

export default function ScreenshotGallery({
  screenshots,
  title,
}: ScreenshotGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % screenshots.length);
    }
  }, [lightboxIndex, screenshots.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + screenshots.length) % screenshots.length,
      );
    }
  }, [lightboxIndex, screenshots.length]);

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
            <Image
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
          onClick={closeLightbox}
          onKeyDown={handleLightboxKeyDown}
          tabIndex={0}
          ref={(el) => el?.focus()}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>

          <div
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={screenshots[lightboxIndex]}
              alt={`${title} screenshot ${lightboxIndex + 1}`}
              fill
              className="object-contain rounded-xl"
              sizes="90vw"
            />
          </div>

          <div
            className="flex items-center gap-4 mt-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={goPrev}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Screenshots">
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setLightboxIndex(index)}
                  role="tab"
                  aria-selected={index === lightboxIndex}
                  aria-label={`Go to screenshot ${index + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    index === lightboxIndex
                      ? "bg-sky-400 w-6"
                      : "bg-white/30 hover:bg-white/50 w-2"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
