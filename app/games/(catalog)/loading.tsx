import GameCardSkeleton from "@/components/GameCardSkeleton";
import { Library } from "lucide-react";

export default function GamesLoading() {
  return (
    <section className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 animate-in">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20">
            <Library className="w-5 h-5 text-sky-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Katalog Game
          </h1>
        </div>
        <div className="h-4 w-64 bg-(--overlay-medium) rounded mt-2 animate-pulse" />
      </div>

      {/* Filter bar skeleton */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 h-12 bg-(--bg-card) border border-(--border-default) rounded-xl animate-pulse" />
          <div className="w-full sm:w-48 h-12 bg-(--bg-card) border border-(--border-default) rounded-xl animate-pulse" />
          <div className="w-24 h-12 bg-(--bg-card) border border-(--border-default) rounded-xl animate-pulse" />
        </div>
        <div className="h-4 w-32 bg-(--overlay-light) rounded animate-pulse" />
      </div>

      {/* Game grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <GameCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
