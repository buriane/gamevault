"use client";

import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { useState } from "react";

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  genres: string[];
  selectedGenres: string[];
  onGenreToggle: (genre: string) => void;
  platforms: string[];
  selectedPlatforms: string[];
  onPlatformToggle: (platform: string) => void;
  yearRange: { min: number; max: number };
  selectedYearRange: { min: number; max: number };
  onYearRangeChange: (range: { min: number; max: number }) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  totalResults: number;
}

const SORT_OPTIONS = [
  { value: "rating-desc", label: "Rating Tertinggi" },
  { value: "date-desc", label: "Terbaru" },
  { value: "price-asc", label: "Harga Terendah" },
  { value: "price-desc", label: "Harga Tertinggi" },
  { value: "title-asc", label: "A - Z" },
  { value: "title-desc", label: "Z - A" },
];

export default function FilterBar({
  search,
  onSearchChange,
  genres,
  selectedGenres,
  onGenreToggle,
  platforms,
  selectedPlatforms,
  onPlatformToggle,
  yearRange,
  selectedYearRange,
  onYearRangeChange,
  sortBy,
  onSortChange,
  totalResults,
}: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  const activeFilterCount =
    selectedGenres.length +
    selectedPlatforms.length +
    (selectedYearRange.min !== yearRange.min || selectedYearRange.max !== yearRange.max ? 1 : 0);

  const clearAll = () => {
    onSearchChange("");
    selectedGenres.forEach((g) => onGenreToggle(g));
    selectedPlatforms.forEach((p) => onPlatformToggle(p));
    onYearRangeChange(yearRange);
  };

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari game..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#1b2838] border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 transition-all"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-white/10 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-gray-400" />
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none w-full sm:w-48 pl-4 pr-10 py-3 bg-[#1b2838] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500/50 transition-all cursor-pointer"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Filter toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
            showFilters || activeFilterCount > 0
              ? "bg-sky-500/10 border-sky-500/30 text-sky-400"
              : "bg-[#1b2838] border-white/10 text-gray-400 hover:text-white hover:border-white/20"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filter</span>
          {activeFilterCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-500 text-white text-[10px] font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="p-5 bg-[#1b2838] border border-white/10 rounded-2xl space-y-5 animate-in fade-in slide-in-from-top-2">
          {/* Genres */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Genre
            </h4>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => onGenreToggle(genre)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedGenres.includes(genre)
                      ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                      : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Platform
            </h4>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <button
                  key={platform}
                  onClick={() => onPlatformToggle(platform)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedPlatforms.includes(platform)
                      ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                      : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          {/* Year Range */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Tahun Rilis
            </h4>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={yearRange.min}
                max={yearRange.max}
                value={selectedYearRange.min}
                onChange={(e) =>
                  onYearRangeChange({
                    ...selectedYearRange,
                    min: Number(e.target.value),
                  })
                }
                className="w-24 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-sky-500/50 transition-all"
              />
              <span className="text-gray-500 text-sm">—</span>
              <input
                type="number"
                min={yearRange.min}
                max={yearRange.max}
                value={selectedYearRange.max}
                onChange={(e) =>
                  onYearRangeChange({
                    ...selectedYearRange,
                    max: Number(e.target.value),
                  })
                }
                className="w-24 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-sky-500/50 transition-all"
              />
            </div>
          </div>

          {/* Clear */}
          {activeFilterCount > 0 && (
            <button
              onClick={clearAll}
              className="text-xs text-sky-400 hover:text-sky-300 font-medium transition-colors"
            >
              Reset semua filter
            </button>
          )}
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-gray-500">
        Menampilkan <span className="text-white font-semibold">{totalResults}</span> game
      </p>
    </div>
  );
}
