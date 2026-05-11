import gamesData from "@/data/games.json";

export interface Game {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  screenshots: string[];
  description: string;
  longDescription: string;
  genres: string[];
  platforms: string[];
  developer: string;
  publisher: string;
  releaseDate: string;
  rating: number;
  price: number;
  tags: string[];
  featured: boolean;
}

export function getAllGames(): Game[] {
  return gamesData as Game[];
}

export function getFeaturedGames(): Game[] {
  return getAllGames().filter((game) => game.featured);
}

export function getGameBySlug(slug: string): Game | undefined {
  return getAllGames().find((game) => game.slug === slug);
}

export function getAllGenres(): string[] {
  const genres = new Set<string>();
  getAllGames().forEach((game) => game.genres.forEach((g) => genres.add(g)));
  return Array.from(genres).sort();
}

export function getAllPlatforms(): string[] {
  const platforms = new Set<string>();
  getAllGames().forEach((game) =>
    game.platforms.forEach((p) => platforms.add(p))
  );
  return Array.from(platforms).sort();
}

export function getYearRange(): { min: number; max: number } {
  const years = getAllGames().map((game) =>
    new Date(game.releaseDate).getFullYear()
  );
  return { min: Math.min(...years), max: Math.max(...years) };
}

export function formatPrice(price: number): string {
  if (price === 0) return "Free";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
