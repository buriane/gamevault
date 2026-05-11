"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { type Game, formatPrice } from "@/lib/utils";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link
      href={`/games/${game.slug}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#1b2838] border border-white/5 hover:border-sky-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1"
    >
      {/* Cover Image */}
      <div className="relative aspect-3/4 overflow-hidden">
        <Image
          src={game.coverImage}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#1b2838] via-transparent to-transparent opacity-60" />
        
        {/* Rating badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-bold text-white">{game.rating}</span>
        </div>

        {/* Price badge */}
        <div className="absolute bottom-3 left-3">
          <span
            className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
              game.price === 0
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-black/60 text-white backdrop-blur-sm"
            }`}
          >
            {formatPrice(game.price)}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <h3 className="font-bold text-sm leading-tight line-clamp-2 group-hover:text-sky-400 transition-colors">
          {game.title}
        </h3>
        <div className="flex flex-wrap gap-1 mt-auto">
          {game.genres.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="px-2 py-0.5 text-[10px] font-medium bg-white/5 text-gray-400 rounded"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
