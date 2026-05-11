"use client";

import { useState, useMemo } from "react";
import GameCard from "@/components/GameCard";
import FilterBar from "@/components/FilterBar";
import { getAllGames, getAllGenres, getAllPlatforms, getYearRange } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Library } from "lucide-react";

const ITEMS_PER_PAGE = 12;

export default function GamesPage() {
  const allGames = getAllGames();
  const genres = getAllGenres();
  const platforms = getAllPlatforms();
  const yearRange = getYearRange();

  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedYearRange, setSelectedYearRange] = useState(yearRange);
  const [sortBy, setSortBy] = useState("rating-desc");
  const [currentPage, setCurrentPage] = useState(1);

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
    setCurrentPage(1);
  };

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleYearRangeChange = (range: { min: number; max: number }) => {
    setSelectedYearRange(range);
    setCurrentPage(1);
  };

  const filteredGames = useMemo(() => {
    let games = [...allGames];

    // Search filter
    if (search.trim()) {
      const query = search.toLowerCase();
      games = games.filter((game) =>
        game.title.toLowerCase().includes(query)
      );
    }

    // Genre filter
    if (selectedGenres.length > 0) {
      games = games.filter((game) =>
        selectedGenres.some((genre) => game.genres.includes(genre))
      );
    }

    // Platform filter
    if (selectedPlatforms.length > 0) {
      games = games.filter((game) =>
        selectedPlatforms.some((platform) => game.platforms.includes(platform))
      );
    }

    // Year range filter
    games = games.filter((game) => {
      const year = new Date(game.releaseDate).getFullYear();
      return year >= selectedYearRange.min && year <= selectedYearRange.max;
    });

    // Sort
    const [field, direction] = sortBy.split("-");
    games.sort((a, b) => {
      let comparison = 0;
      switch (field) {
        case "rating":
          comparison = a.rating - b.rating;
          break;
        case "date":
          comparison =
            new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
          break;
        case "price":
          comparison = a.price - b.price;
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
      }
      return direction === "desc" ? -comparison : comparison;
    });

    return games;
  }, [allGames, search, selectedGenres, selectedPlatforms, selectedYearRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20">
            <Library className="w-5 h-5 text-sky-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Katalog Game
          </h1>
        </div>
        <p className="text-gray-400 text-sm mt-1">
          Temukan game favoritmu dari koleksi lengkap kami
        </p>
      </div>

      {/* Filters */}
      <FilterBar
        search={search}
        onSearchChange={handleSearchChange}
        genres={genres}
        selectedGenres={selectedGenres}
        onGenreToggle={handleGenreToggle}
        platforms={platforms}
        selectedPlatforms={selectedPlatforms}
        onPlatformToggle={handlePlatformToggle}
        yearRange={yearRange}
        selectedYearRange={selectedYearRange}
        onYearRangeChange={handleYearRangeChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        totalResults={filteredGames.length}
      />

      {/* Game Grid */}
      {paginatedGames.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
          {paginatedGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
            <span className="text-3xl">🎮</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Tidak ada game ditemukan</h3>
          <p className="text-sm text-gray-400 max-w-sm">
            Coba ubah kata kunci pencarian atau filter yang kamu gunakan.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-[#1b2838] border border-white/10 text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
                page === currentPage
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                  : "bg-[#1b2838] border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-[#1b2838] border border-white/10 text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}