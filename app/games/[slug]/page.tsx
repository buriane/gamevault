import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, Calendar, Building2, Monitor, Tag } from "lucide-react";
import { getAllGames, getGameBySlug, formatPrice, formatDate } from "@/lib/utils";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import WishlistButton from "@/components/WishlistButton";
import PageTransition from "@/components/PageTransition";
import GameDetailContent from "./GameDetailContent";

export async function generateStaticParams() {
  const games = getAllGames();
  return games.map((game) => ({
    slug: game.slug,
  }));
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const game = getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  return (
    <GameDetailContent>
    <PageTransition>
    <section className="min-h-screen" aria-label={`${game.title} game details`}>
      {/* Hero background */}
      <div className="relative h-40 sm:h-64 md:h-80 overflow-hidden">
        <Image
          src={game.screenshots[0]}
          alt=""
          fill
          loading="eager"
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-(--gradient-base-60) to-(--gradient-base)" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 -mt-20 sm:-mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cover Image */}
          <div className="shrink-0 w-32 sm:w-48 md:w-64 mx-auto md:mx-0">
            <div className="relative aspect-3/4 rounded-2xl overflow-hidden border-2 border-(--border-default) shadow-2xl">
              <Image
                src={game.coverImage}
                alt={game.title}
                fill
                loading="eager"
                className="object-cover"
                sizes="256px"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 pt-2 sm:pt-4 md:pt-12">
            <Link
              href="/games"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors mb-3 sm:mb-4"
              aria-label="Back to game catalog"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Kembali ke Katalog
            </Link>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-2 sm:mb-3">
              {game.title}
            </h1>

            <p className="text-(--text-secondary) text-sm sm:text-base leading-relaxed mb-3 sm:mb-5">
              {game.description}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-1.5">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                <span className="text-lg font-bold">{game.rating}</span>
                <span className="text-sm text-(--text-muted)" aria-hidden="true">/ 10</span>
              </div>
              <span className="text-(--text-faint)" aria-hidden="true">|</span>
              <span className="text-xl font-bold text-sky-400">
                {formatPrice(game.price)}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <WishlistButton slug={game.slug} size="lg" showLabel />
            </div>
          </div>
        </div>

      <div className="container mx-auto px-4 sm:px-6">
        {/* Details grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Long description */}
            <div>
              <h2 className="text-xl font-bold mb-4">Tentang Game</h2>
              <div className="prose prose-invert prose-sm max-w-none">
                {game.longDescription.split("\n\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-(--text-secondary) leading-relaxed mb-4 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Screenshots */}
            <div>
              <h2 className="text-xl font-bold mb-4">Screenshot</h2>
              <ScreenshotGallery
                screenshots={game.screenshots}
                title={game.title}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info card */}
            <div className="bg-(--bg-card) border border-(--border-subtle) rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5">
              <h3 className="text-sm font-semibold text-(--text-muted) uppercase tracking-wider">
                Informasi Game
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building2 className="w-4 h-4 text-(--text-faint) mt-0.5" />
                  <div>
                    <p className="text-xs text-(--text-faint)">Developer</p>
                    <p className="text-sm font-medium">{game.developer}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="w-4 h-4 text-(--text-faint) mt-0.5" />
                  <div>
                    <p className="text-xs text-(--text-faint)">Publisher</p>
                    <p className="text-sm font-medium">{game.publisher}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-(--text-faint) mt-0.5" />
                  <div>
                    <p className="text-xs text-(--text-faint)">Tanggal Rilis</p>
                    <p className="text-sm font-medium">
                      {formatDate(game.releaseDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Monitor className="w-4 h-4 text-(--text-faint) mt-0.5" />
                  <div>
                    <p className="text-xs text-(--text-faint)">Platform</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {game.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="px-2 py-0.5 text-[11px] font-medium bg-(--overlay-light) text-(--text-secondary) rounded border border-(--border-subtle)"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Genres */}
            <div className="bg-(--bg-card) border border-(--border-subtle) rounded-2xl p-4 sm:p-6">
              <h3 className="text-sm font-semibold text-(--text-muted) uppercase tracking-wider mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Genre & Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {[...game.genres, ...game.tags].map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="px-3 py-1.5 text-xs font-medium bg-sky-500/10 text-sky-400 rounded-lg border border-sky-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-8 sm:h-16" />
    </section>
    </PageTransition>
    </GameDetailContent>
  );
}