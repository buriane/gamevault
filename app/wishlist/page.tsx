"use client";

import { useWishlist } from "@/context/WishlistContext";
import { getAllGames, formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2, Star, Gamepad2 } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const allGames = getAllGames();

  const wishlistGames = allGames.filter((game) =>
    wishlist.includes(game.slug)
  );

  return (
    <section className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-pink-500/10 border border-pink-500/20">
            <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Wishlist Saya
          </h1>
        </div>
        <p className="text-gray-400 text-sm">
          {wishlistGames.length > 0
            ? `${wishlistGames.length} game tersimpan di wishlist`
            : "Belum ada game di wishlist"}
        </p>
      </div>

      {/* Wishlist items */}
      {wishlistGames.length > 0 ? (
        <div className="space-y-4">
          {wishlistGames.map((game) => (
            <div
              key={game.id}
              className="flex items-center gap-4 md:gap-6 p-4 bg-[#1b2838] border border-white/5 rounded-2xl hover:border-white/10 transition-all group"
            >
              {/* Cover */}
              <Link
                href={`/games/${game.slug}`}
                className="shrink-0 relative w-16 h-20 md:w-20 md:h-28 rounded-xl overflow-hidden"
              >
                <Image
                  src={game.coverImage}
                  alt={game.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="80px"
                />
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/games/${game.slug}`}
                  className="font-bold text-sm md:text-base hover:text-sky-400 transition-colors line-clamp-1"
                >
                  {game.title}
                </Link>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  {game.genres.slice(0, 2).map((genre) => (
                    <span
                      key={genre}
                      className="px-2 py-0.5 text-[10px] font-medium bg-white/5 text-gray-400 rounded"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold">{game.rating}</span>
                  </div>
                  <span className="text-xs font-semibold text-sky-400">
                    {formatPrice(game.price)}
                  </span>
                </div>
              </div>

              {/* Remove button */}
              <button
                onClick={() => removeFromWishlist(game.slug)}
                className="shrink-0 p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30 transition-all"
                aria-label={`Remove ${game.title} from wishlist`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/5">
            <Gamepad2 className="w-10 h-10 text-gray-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Wishlist Kosong</h3>
          <p className="text-sm text-gray-400 max-w-sm mb-6">
            Kamu belum menambahkan game apapun ke wishlist. Jelajahi katalog dan
            temukan game favoritmu!
          </p>
          <Link
            href="/games"
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl hover:from-sky-400 hover:to-blue-500 transition-all shadow-lg shadow-blue-500/25"
          >
            Jelajahi Game
          </Link>
        </div>
      )}
    </section>
  );
}