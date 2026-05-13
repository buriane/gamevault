import HeroBanner from "@/components/HeroBanner";
import GameCard from "@/components/GameCard";
import PageTransition from "@/components/PageTransition";
import { getFeaturedGames, getAllGames } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const featured = getFeaturedGames();
  const allGames = getAllGames();

  return (
    <PageTransition>
      {/* Hero Banner */}
      <HeroBanner games={featured} />

      {/* All Games Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Semua Game
            </h2>
            <p className="text-(--text-muted) text-sm mt-1">
              Jelajahi koleksi game terbaik kami
            </p>
          </div>
          <Link
            href="/games"
            className="flex items-center gap-1.5 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors group"
          >
            Lihat Semua
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {allGames.slice(0, 10).map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
