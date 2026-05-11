"use client";

import { useState } from "react";
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

  const goNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % screenshots.length);
    }
  };

  const goPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + screenshots.length) % screenshots.length
      );
    }
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {screenshots.map((src, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer border border-white/5 hover:border-sky-500/30 transition-all"
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
          className="fixed inset-0 z-100 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-lightbox"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Previous screenshot"
          >
            <ChevronLeft className="w-6 h-6" />
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

          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Next screenshot"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === lightboxIndex
                    ? "bg-sky-400 w-6"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to screenshot ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
